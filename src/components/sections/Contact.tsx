import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { ContactForm } from '@/components/forms/ContactForm';
import { contactContent } from '@/config/content';
import { contactInfo } from '@/config/contact';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { FadeIn, SlideIn } from '@/components/motion';

function EmailIcon() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function BuildingIcon() {
    return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
        </svg>
    );
}

function ExternalLinkIcon() {
    return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
    );
}

export function Contact() {
    return (
        <SectionWrapper id="contact" background="gray">
            <FadeIn>
                <h2 className={cn('text-section-mobile lg:text-section-desktop', 'text-text-primary', 'mb-4', 'text-center')}>
                    {contactContent.heading}
                </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
                <p className={cn('text-base sm:text-lg', 'text-text-secondary', 'text-center', 'max-w-2xl mx-auto', 'mb-10 lg:mb-12')}>
                    {contactContent.subheading}
                </p>
            </FadeIn>

            <div className={cn('grid gap-8 lg:gap-12', 'grid-cols-1 lg:grid-cols-2')}>
                {/* Left Column: Contact Form */}
                <SlideIn direction="left" delay={0.1}>
                    <div className="order-1">
                        <div className="rounded-xl bg-white p-6 sm:p-8 shadow-card">
                            <ContactForm />
                        </div>
                    </div>
                </SlideIn>

                {/* Right Column: Contact Information */}
                <SlideIn direction="right" delay={0.2}>
                    <div className="order-2">
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"><EmailIcon /></div>
                                <div>
                                    <h3 className="font-medium text-text-primary">Email</h3>
                                    <a href={`mailto:${contactInfo.email}`} className="text-primary hover:text-primary-dark transition-colors">{contactInfo.email}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"><PhoneIcon /></div>
                                <div>
                                    <h3 className="font-medium text-text-primary">Phone</h3>
                                    <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="text-primary hover:text-primary-dark transition-colors">{contactInfo.phone}</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"><LocationIcon /></div>
                                <div>
                                    <h3 className="font-medium text-text-primary">Address</h3>
                                    <address className="not-italic text-text-secondary">
                                        {contactInfo.address.street}<br />
                                        {contactInfo.address.building}<br />
                                        {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}
                                    </address>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"><ClockIcon /></div>
                                <div>
                                    <h3 className="font-medium text-text-primary">Office Hours</h3>
                                    <p className="text-text-secondary">{contactInfo.hours}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"><BuildingIcon /></div>
                                <div>
                                    <h3 className="font-medium text-text-primary">{contactInfo.institution.name}</h3>
                                    <p className="text-text-secondary">{contactInfo.institution.affiliations.join(' \u2022 ')}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border">
                                <a
                                    href={siteConfig.externalLinks.nezamiLabContact}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn('inline-flex items-center gap-2', 'text-primary hover:text-primary-dark', 'font-medium', 'transition-colors')}
                                >
                                    Visit Nezami Lab
                                    <ExternalLinkIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </SlideIn>
            </div>
        </SectionWrapper>
    );
}
