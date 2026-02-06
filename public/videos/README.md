# Video Assets

This directory contains the video assets for the JEDeye demo section.

> ⚠️ **IMPORTANT:** The placeholder files in this directory need to be replaced with actual surgical video content before production deployment.

## Video Requirements

| Property | Value |
|----------|-------|
| Duration | ~50 seconds (exact match between both videos) |
| Frame Rate | 30fps (identical between both videos) |
| Resolution | 1280×720 (720p) |
| Aspect Ratio | 16:9 |
| Audio | None (removed) |

## Required Files

| File | Format | Description |
|------|--------|-------------|
| `surgical-original.webm` | WebM VP9 | Original surgical footage (primary) |
| `surgical-original.mp4` | MP4 H.264 | Original surgical footage (Safari fallback) |
| `surgical-segmentation.webm` | WebM VP9 | AI segmentation overlay (primary) |
| `surgical-segmentation.mp4` | MP4 H.264 | AI segmentation overlay (Safari fallback) |
| `demo-poster.jpg` | JPEG | Static poster frame for loading state |

## Target File Sizes

| File | Target Size |
|------|-------------|
| surgical-original.webm | 5-8 MB |
| surgical-original.mp4 | 8-12 MB |
| surgical-segmentation.webm | 5-8 MB |
| surgical-segmentation.mp4 | 8-12 MB |
| demo-poster.jpg | <100 KB |
| **Total** | **<50 MB** |

## FFmpeg Encoding Commands

### MP4 (H.264) — Safari Fallback

```bash
ffmpeg -i input.mp4 -c:v libx264 -profile:v high -level:v 4.1 \
  -b:v 2000k -maxrate 2500k -bufsize 5000k \
  -movflags +faststart -an -pix_fmt yuv420p \
  -vf "scale=1280:720" output.mp4
```

### WebM (VP9) — Primary Format

```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -b:v 1500k \
  -maxrate 2000k -bufsize 4000k -an \
  -vf "scale=1280:720" output.webm
```

### Poster Frame Extraction

```bash
ffmpeg -i input.mp4 -ss 00:00:05 -vframes 1 -q:v 2 demo-poster.jpg
```

## Browser Compatibility

| Browser | Video Format | Notes |
|---------|--------------|-------|
| Chrome 60+ | WebM (VP9) | Primary source |
| Firefox 53+ | WebM (VP9) | Primary source |
| Edge 79+ | WebM (VP9) | Primary source |
| Safari 14+ | MP4 (H.264) | Fallback source |
| iOS Safari 14+ | MP4 (H.264) | Requires `playsinline` attribute |

## Synchronization Requirements

Both videos (original and segmentation) MUST:
- Have identical duration to the millisecond
- Have identical frame rate (30fps)
- Start with matching content frames
- Loop seamlessly at the same point

The VideoComparisonSlider component uses a custom `useVideoSync` hook to maintain frame-accurate synchronization during playback.

## Placeholder Files

The current placeholder files are minimal/empty and will cause the demo to show an error state. Replace them with actual video content before deployment.

To test with real videos:
1. Encode your source videos using the FFmpeg commands above
2. Replace the placeholder files in this directory
3. Ensure both videos have matching duration and frame rate
4. Extract a poster frame at an interesting moment (around 5 seconds is typical)
