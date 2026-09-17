import { siteConfig } from '../../config/site';
import { cn } from '../../lib/cn';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * โลโก้ Easy Tax & Account
 * ------------------------------------------------------------
 * เปลี่ยนเป็นไฟล์โลโก้จริง: ตั้งค่า siteConfig.logo.src ใน src/config/site.ts
 * (ถ้าไม่ตั้งค่า จะแสดงโลโก้แบบตัวอักษรด้านล่าง)
 */
export function Logo({ tone = 'dark', className }: LogoProps) {
  const imageSrc = tone === 'light' ? (siteConfig.logo.srcOnDark ?? siteConfig.logo.src) : siteConfig.logo.src;

  if (imageSrc) {
    return <img src={imageSrc} alt={siteConfig.name} className={cn('h-11 w-auto', className)} />;
  }

  const isLight = tone === 'light';

  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span className="relative inline-flex items-start">
        <span
          className={cn(
            'font-script text-[2.1rem] font-bold leading-[0.8] tracking-tight',
            isLight ? 'text-white' : 'text-brand-700',
          )}
        >
          Easy
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="-mt-1 ml-0.5 h-4 w-4 text-sun-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        >
          <path d="M4 12 8 4M10 14l7-5M9 18h7" />
        </svg>
      </span>
      <span
        className={cn(
          'mt-1 pl-0.5 text-[0.7rem] font-semibold tracking-[0.02em]',
          isLight ? 'text-brand-100' : 'text-brand-900',
        )}
      >
        Tax &amp; Account
      </span>
    </span>
  );
}
