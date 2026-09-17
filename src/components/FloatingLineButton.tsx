import { siteConfig } from '../config/site';
import { useScrolled } from '../hooks/useScrolled';
import { cn } from '../lib/cn';
import { LineIcon } from './ui/SocialIcons';

/** ปุ่ม LINE ลอยมุมขวาล่าง — แสดงหลังเลื่อนผ่าน Hero เพื่อไม่บังปุ่ม CTA หลัก */
export function FloatingLineButton() {
  const visible = useScrolled(480);

  return (
    <a
      href={siteConfig.contact.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`แชทกับ Easy Tax & Account ทาง LINE ${siteConfig.contact.lineId} (เปิดในแท็บใหม่)`}
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={cn(
        'group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-2 rounded-full bg-line p-3 text-white shadow-[0_12px_28px_-10px_rgb(6_199_85/0.75)] ring-4 ring-white/90 transition duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgb(6_199_85/0.85)] sm:right-6 sm:bottom-6 sm:pr-5',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        '[--line-text:#06c755]',
      )}
    >
      <LineIcon className="size-8 shrink-0 text-white" />
      <span className="hidden text-[0.9375rem] font-bold text-brand-950 sm:inline">แชท LINE</span>
    </a>
  );
}
