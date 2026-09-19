import { ArrowUp, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '../config/site';
import { footerAudienceLinks, footerServiceLinks } from '../data/footer';
import { Logo } from './ui/Logo';
import { FacebookIcon, LineIcon, TikTokIcon } from './ui/SocialIcons';

const { contact } = siteConfig;

const socialLinks = [
  { label: 'Facebook', href: contact.facebookUrl, icon: FacebookIcon },
  { label: 'LINE', href: contact.lineUrl, icon: LineIcon },
  { label: 'TikTok', href: contact.tiktokUrl, icon: TikTokIcon },
];

function FooterHeading({ id, children }: { id?: string; children: string }) {
  return (
    <h2 id={id} className="text-base font-bold text-sun-300">
      {children}
    </h2>
  );
}

const linkClass =
  'inline-flex items-center gap-2 rounded text-[0.9375rem] text-brand-100/85 transition-colors duration-200 hover:text-white';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-brand-950 text-brand-100">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-10 lg:py-20">
        <div className="col-span-2 lg:col-span-1">
          <a href="#home" className="inline-block rounded-lg" aria-label="Easy Tax & Account — กลับไปหน้าหลัก">
            <Logo tone="light" />
          </a>
          <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-brand-100/85">{siteConfig.description}</p>
          <ul className="mt-6 flex gap-3" aria-label="ช่องทางโซเชียลมีเดีย">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} ของ Easy Tax & Account (เปิดในแท็บใหม่)`}
                  className="grid size-11 place-items-center rounded-full bg-white/8 text-white ring-1 ring-inset ring-white/15 transition duration-200 hover:-translate-y-0.5 hover:bg-white/15 [--line-text:#0a2a1c]"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-services">
          <FooterHeading id="footer-services">บริการ</FooterHeading>
          <ul className="mt-4 space-y-2.5">
            {footerServiceLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-audience">
          <FooterHeading id="footer-audience">ผู้ใช้บริการ</FooterHeading>
          <ul className="mt-4 space-y-2.5">
            {footerAudienceLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-1">
          <FooterHeading>ติดต่อเรา</FooterHeading>
          <address className="mt-4 grid gap-2.5 not-italic sm:grid-cols-2 lg:grid-cols-1">
            <a href={contact.lineUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <LineIcon className="size-5 text-line" />
              LINE: {contact.lineId}
              <span className="sr-only">(เปิดในแท็บใหม่)</span>
            </a>
            <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <FacebookIcon className="size-5" />
              Facebook: {contact.facebookName}
              <span className="sr-only">(เปิดในแท็บใหม่)</span>
            </a>
            <a href={contact.tiktokUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <TikTokIcon className="size-5" />
              TikTok: {contact.tiktokName}
              <span className="sr-only">(เปิดในแท็บใหม่)</span>
            </a>
            <a href={contact.phoneHref} className={linkClass}>
              <Phone className="size-5" aria-hidden="true" />
              โทร {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`} className={linkClass}>
              <Mail className="size-5" aria-hidden="true" />
              {contact.email}
            </a>
            <p className="inline-flex items-center gap-2 text-[0.9375rem] text-brand-100/70">
              <Clock className="size-5" aria-hidden="true" />
              {contact.officeHours}
            </p>
            <p className="flex items-start gap-2 text-[0.9375rem] leading-relaxed text-brand-100/70 sm:col-span-2 lg:col-span-1">
              <MapPin className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              {contact.address}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 pb-24 pt-6 text-sm text-brand-100/70 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p>
            © {year} {siteConfig.name}. สงวนลิขสิทธิ์ · {contact.serviceArea}
          </p>
          <a href="#home" className="inline-flex items-center gap-1.5 self-start rounded transition-colors duration-200 hover:text-white">
            กลับขึ้นด้านบน
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
