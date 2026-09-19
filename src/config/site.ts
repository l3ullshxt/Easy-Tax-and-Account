/**
 * ข้อมูลหลักของเว็บไซต์ — แก้ไขที่ไฟล์นี้ไฟล์เดียว
 * ------------------------------------------------------------
 * - ข้อมูลติดต่อ (LINE / โทรศัพท์ / Email / Social)
 * - โลโก้ (logo.src)
 * - รูป Character (images)
 */
export const siteConfig = {
  name: 'Easy Tax & Account',
  shortName: 'Easy',
  tagline: 'บัญชีไม่ยาก ถ้ามี Easy อยู่ข้าง ๆ',
  description: 'สำนักงานบัญชีสำหรับ SME และธุรกิจออนไลน์',

  /**
   * โลโก้: ถ้าใส่ path ของไฟล์ (เช่น '/images/logo.svg' หรือ '/images/logo.png')
   * เว็บจะใช้รูปนั้นแทนโลโก้แบบตัวอักษรใน src/components/ui/Logo.tsx
   * ใส่ logo สำหรับพื้นหลังเข้ม (footer) แยกได้ที่ srcOnDark
   */
  logo: {
    src: null as string | null,
    srcOnDark: null as string | null,
  },

  /** รูป Character พี่ Easy + น้อง Bee — วางไฟล์ใหม่ใน public/images/characters แล้วเปลี่ยน path */
  images: {
    heroCharacters: '/images/characters/easy-bee-hero.svg',
    ctaCharacters: '/images/characters/easy-bee-cta.svg',
    pricingDesk: '/images/pricing-desk.svg',
  },

  contact: {
    lineUrl: 'https://lin.ee/wkl0qUa',
    lineId: '@easytax.acc',
    phoneDisplay: '096-287-9968',
    phoneHref: 'tel:+66962879968',
    email: 'easytaxandacc@gmail.com',
    facebookName: 'Easy Tax and Account',
    facebookUrl: 'https://www.facebook.com/share/1Dq3sYN951/',
    tiktokName: 'Easy Tax and Account',
    tiktokUrl: 'https://www.tiktok.com/@easytaxandacc',
    address: '353/23 ซอยจรัญสนิทวงศ์ 32 แขวงศิริราช เขตบางกอกน้อย กรุงเทพมหานคร 10700',
    serviceArea: 'ดูแลลูกค้าออนไลน์ทั่วประเทศ',
    officeHours: 'จันทร์–ศุกร์ 09:00–18:00 น.',
  },
} as const;
