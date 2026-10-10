import { closing } from '@/config/content';
import { WaitlistForm } from '@/components/forms/WaitlistForm';
import { ContactForm } from '@/components/forms/ContactForm';

export function Closing() {
  return (
    <section id="contact" className="section rule-top bg-paper-2/60" data-rise>
      <div className="wrap grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">{closing.contact.eyebrow}</p>
            <h2 className="font-display text-h2 font-medium">{closing.contact.heading}</h2>
            <p className="prose-measure text-ink-2">{closing.contact.text}</p>
          </div>
          <ContactForm />
        </div>
        <div id="waitlist" className="flex flex-col gap-6 lg:pt-1">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">{closing.waitlist.eyebrow}</p>
            <h2 className="font-display text-h2 font-medium">{closing.waitlist.heading}</h2>
            <p className="prose-measure text-ink-2">{closing.waitlist.text}</p>
          </div>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
