'use client';

import Image from 'next/image';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { teamContent } from '@/config/content';
import { cn } from '@/lib/utils';
import { Linkedin, User } from 'lucide-react';

export function Team() {
    return (
        <SectionWrapper id="team" background="gray">
            <h2 className="text-section-mobile lg:text-section-desktop text-text-primary mb-4 text-center">
                {teamContent.heading}
            </h2>
            <p className="text-base sm:text-lg text-text-secondary text-center max-w-2xl mx-auto mb-10 lg:mb-12">
                {teamContent.subheading}
            </p>

            <div className="grid gap-8 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
                {teamContent.members.map((member) => (
                    <div
                        key={member.id}
                        className="flex flex-col items-center text-center bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200"
                    >
                        {/* Avatar */}
                        <div className="relative h-28 w-28 rounded-full overflow-hidden bg-gray-100 mb-4">
                            {member.image ? (
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <User className="h-12 w-12 text-gray-300" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <h3 className="text-base font-semibold text-text-primary">{member.name}</h3>
                        <p className="text-sm text-primary font-medium mt-0.5">{member.title}</p>
                        <p className="text-xs text-text-secondary mt-1">{member.credential}</p>

                        {/* LinkedIn */}
                        {member.linkedin && (
                            <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 text-text-secondary hover:text-primary transition-colors"
                                aria-label={`${member.name} LinkedIn profile`}
                            >
                                <Linkedin className="h-5 w-5" />
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
