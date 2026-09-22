import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLeadForm } from '../context/LeadFormContext';
import { Button, ButtonLink } from './ui/Button';
import { LineIcon } from './ui/SocialIcons';

interface ConsultBannerProps {
  title?: string;
  description?: string;
}

/** กล่องชวนปรึกษา ท้ายหน้าบทความ */
export function ConsultBanner({
  title = 'มีคำถามเรื่องบัญชีหรือภาษีของธุรกิจคุณ?',
  description = 'ปรึกษาทีม Easy Tax & Account ได้ฟรี อธิบายแบบเข้าใจง่าย ไม่ใช้ศัพท์ยาก',
}: ConsultBannerProps) {
  const { openLeadForm } = useLeadForm();
  return (
    <aside
      aria-label="ปรึกษาทีม Easy"
      className="on-dark relative overflow-hidden rounded-[1.75rem] bg-brand-800 px-6 py-8 text-center sm:px-10 md:text-left"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-700/60" />
      <div className="relative flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div>
          <p className="text-xl font-bold text-white sm:text-2xl">{title}</p>
          <p className="mt-2 text-brand-100">{description}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:shrink-0">
          <Button variant="sun" size="lg" onClick={() => openLeadForm({ mode: 'consult' })}>
            <MessageCircle aria-hidden="true" />
            ปรึกษาฟรี
          </Button>
          <ButtonLink href={siteConfig.contact.lineUrl} external variant="light" size="lg">
            <LineIcon className="text-line" />
            แอด LINE
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}
