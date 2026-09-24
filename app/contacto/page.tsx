"use client";

import { RuleTitle } from "@/components/brand/Editorial";
import { ContactForm } from "@/components/contact/ContactForm";
import { SiteFrame } from "@/components/layout/SiteFrame";
import { useLanguage } from "@/hooks/useLanguage";
import { useSiteContent } from "@/hooks/useSiteContent";

export default function ContactPage() {
  const { locale, t } = useLanguage();
  const { content } = useSiteContent();
  const contact = content.contact;

  return (
    <SiteFrame>
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-20">
        <div className="flex flex-col gap-8">
          <RuleTitle
            eyebrow={locale === "es" ? "Contacto" : "Contact"}
            title={locale === "es" ? "Hablemos" : "Let’s talk"}
            folio="01"
            serif={
              locale === "es"
                ? "Contanos el tipo de obra. Respondemos desde el estudio."
                : "Tell us the kind of work. We reply from the studio."
            }
          />
          <dl className="flex flex-col gap-4 text-sm">
            {contact.email ? (
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-secondary">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </dd>
              </div>
            ) : null}
            {contact.phone ? (
              <div>
                <dt className="text-[11px] uppercase tracking-[0.18em] text-secondary">
                  {locale === "es" ? "Teléfono" : "Phone"}
                </dt>
                <dd className="mt-1">{contact.phone}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-secondary">
                {locale === "es" ? "Lugar" : "Place"}
              </dt>
              <dd className="mt-1">{t(contact.address)}</dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-secondary">
                {locale === "es" ? "Horario" : "Hours"}
              </dt>
              <dd className="mt-1">{t(contact.hours)}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </section>
    </SiteFrame>
  );
}
