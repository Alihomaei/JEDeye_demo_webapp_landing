'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

/**
 * Interactive digital twin: the patient liver and gallbladder from the twin
 * pipeline plus two instrument models. Orbit to rotate the organs, drag an
 * instrument to move it. Loaded only when its tab is opened; the GLB is 0.55 MB.
 */
const MODEL = '/models/twin.glb';

type Status = 'loading' | 'ready' | 'error';

const ORGAN_MATERIALS: Record<string, THREE.MeshPhysicalMaterial> = {
  liver: new THREE.MeshPhysicalMaterial({ color: 0x7a2a30, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.35 }),
  gallbladder: new THREE.MeshPhysicalMaterial({ color: 0x5e8a46, roughness: 0.38, clearcoat: 0.7, clearcoatRoughness: 0.3 }),
};
const METAL = new THREE.MeshStandardMaterial({ color: 0xb8bcc2, metalness: 0.85, roughness: 0.32 });
const METAL_HOVER = new THREE.MeshStandardMaterial({ color: 0x3ba7b8, metalness: 0.6, roughness: 0.3, emissive: 0x0b3a40 });

/** Where each instrument tip rests (cm, scene frame) and how far sideways its shaft leans away from the viewer line. */
const INSTRUMENT_POSE: Record<string, { tip: [number, number, number]; lean: [number, number, number] }> = {
  grasper: { tip: [8.5, -8.5, -0.5], lean: [0.45, 0.1, 0] },
  hook: { tip: [3, -11.5, -0.5], lean: [-0.4, -0.15, 0] },
};

export default function TwinScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const resetRef = useRef<() => void>(() => undefined);
  const [status, setStatus] = useState<Status>('loading');
  const [hint, setHint] = useState('Drag to rotate · scroll to zoom · drag an instrument to move it');

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setStatus('error');
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 500);
    const TARGET = new THREE.Vector3(2, -1.5, -3); // between the gallbladder and the liver's lower edge
    const HOME = TARGET.clone().add(new THREE.Vector3(5, -8, 48));
    camera.position.copy(HOME);

    // Lighting: a soft sky/ground pair and a key light from the camera side.
    scene.add(new THREE.HemisphereLight(0xe8f0f5, 0x3a2a28, 1.1));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(20, -10, 60);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfe3ea, 0.6);
    rim.position.set(-30, 30, -40);
    scene.add(rim);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.08;
    orbit.minDistance = 12;
    orbit.maxDistance = 120;
    orbit.target.copy(TARGET);

    const organs = new THREE.Group();
    scene.add(organs);
    const instruments: THREE.Object3D[] = [];
    let drag: DragControls | null = null;
    const homePose = new Map<THREE.Object3D, { p: THREE.Vector3; q: THREE.Quaternion }>();

    const loader = new GLTFLoader();
    loader.load(
      MODEL,
      (gltf) => {
        const meshes: Record<string, THREE.Mesh> = {};
        gltf.scene.traverse((o) => {
          if ((o as THREE.Mesh).isMesh) meshes[o.name] = o as THREE.Mesh;
        });

        // Organs: centre them and turn CT LPS axes (x left, y posterior, z superior) into y up, z toward viewer.
        const box = new THREE.Box3();
        for (const n of ['liver', 'gallbladder']) {
          const m = meshes[n];
          if (!m) continue;
          m.geometry.computeVertexNormals();
          m.material = ORGAN_MATERIALS[n];
          organs.add(m);
          box.expandByObject(m);
        }
        const c = box.getCenter(new THREE.Vector3());
        organs.children.forEach((m) => m.position.sub(c));
        organs.rotation.x = -Math.PI / 2;

        // Instruments: shaft runs along +Y with the tip near the origin.
        const up = new THREE.Vector3(0, 1, 0);
        for (const n of ['grasper', 'hook']) {
          const m = meshes[n];
          const pose = INSTRUMENT_POSE[n];
          if (!m || !pose) continue;
          m.geometry.computeVertexNormals();
          m.material = METAL;
          const holder = new THREE.Group();
          holder.name = n;
          holder.add(m);
          holder.position.set(...pose.tip);
          // Shaft runs from the tip back toward the viewer, leaning sideways so the two tools do not overlap.
          const shaft = HOME.clone().sub(holder.position).normalize().add(new THREE.Vector3(...pose.lean)).normalize();
          holder.quaternion.setFromUnitVectors(up, shaft);
          homePose.set(holder, { p: holder.position.clone(), q: holder.quaternion.clone() });
          scene.add(holder);
          instruments.push(holder);
        }

        drag = new DragControls(instruments, camera, renderer.domElement);
        drag.transformGroup = true;
        drag.addEventListener('hoveron', (e) => {
          (e.object as THREE.Object3D).traverse((o) => {
            if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).material = METAL_HOVER;
          });
          renderer.domElement.style.cursor = 'grab';
        });
        drag.addEventListener('hoveroff', (e) => {
          (e.object as THREE.Object3D).traverse((o) => {
            if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).material = METAL;
          });
          renderer.domElement.style.cursor = '';
        });
        drag.addEventListener('dragstart', () => {
          orbit.enabled = false;
          renderer.domElement.style.cursor = 'grabbing';
          setHint('Moving instrument · release to drop');
        });
        drag.addEventListener('dragend', () => {
          orbit.enabled = true;
          renderer.domElement.style.cursor = 'grab';
          setHint('Drag to rotate · scroll to zoom · drag an instrument to move it');
        });

        setStatus('ready');
      },
      undefined,
      () => setStatus('error'),
    );

    resetRef.current = () => {
      camera.position.copy(HOME);
      orbit.target.copy(TARGET);
      organs.rotation.set(-Math.PI / 2, 0, 0);
      for (const [o, h] of homePose) {
        o.position.copy(h.p);
        o.quaternion.copy(h.q);
      }
    };

    const resize = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // Render only while on screen.
    let raf = 0;
    let visible = true;
    const loop = () => {
      raf = 0;
      if (!visible) return;
      orbit.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(host);
    raf = requestAnimationFrame(loop);

    return () => {
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      drag?.dispose();
      orbit.dispose();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.geometry.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="figure relative" style={{ aspectRatio: '16 / 10' }}>
      <div ref={hostRef} className="absolute inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full" aria-label="Interactive 3D twin: liver, gallbladder and two instruments" role="img" />
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-ink-2">Loading the twin…</div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-ink-2">
          This browser could not start 3D rendering. The clips in the other tabs show the same twin.
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-rule bg-paper/85 px-4 py-2 text-xs text-ink-2">
        <span>{hint}</span>
        <button type="button" onClick={() => resetRef.current()} className="pointer-events-auto rounded px-2 py-1 text-ink hover:bg-paper-2">
          Reset view
        </button>
      </div>
    </div>
  );
}
