'use client';

import Image from 'next/image';
import { SectionWrapper } from '@/components/shared';
import { partnersContent } from '@/config/content';

export function Partners() {
    return (
        <SectionWrapper id="partners" background="white" className="!py-10 lg:!py-14">
            <div className="flex flex-col items-center gap-6">
                <p className="text-sm font-medium uppercase tracking-widest text-text-secondary">
                    {partnersContent.label}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
                    {partnersContent.logos.map((logo) => (
                        <div
                            key={logo.name}
                            className="flex items-center gap-3 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                        >
                            {logo.src ? (
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={logo.width ?? 180}
                                    height={logo.height ?? 48}
                                    className="h-10 w-auto object-contain lg:h-12"
                                />
                            ) : (
                                <span className="text-lg font-semibold text-text-primary lg:text-xl">
                                    {logo.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
