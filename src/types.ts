import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface BusinessStage {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: 'mint' | 'sun' | 'sage';
}

export interface Service {
  /** ใช้เป็น URL ของหน้าบริการ: /services/<id>/ */
  id: string;
  /** ชื่อสั้นในการ์ดหน้าแรก */
  title: string;
  /** คำอธิบายสั้นในการ์ดหน้าแรก */
  description: string;
  icon: LucideIcon;
  /** แสดงในหน้าแรกตั้งแต่ต้น (ที่เหลือจะแสดงเมื่อกด "ดูบริการทั้งหมด") */
  featured: boolean;

  /* ---------- เนื้อหาหน้าบริการ /services/<id>/ ---------- */
  /** หัวข้อ h1 ของหน้าบริการ (ใส่คำค้นที่ลูกค้าน่าจะพิมพ์หา) */
  pageTitle: string;
  /** คำอธิบายใต้ชื่อเว็บในผลค้นหา Google */
  metaDescription: string;
  /** ย่อหน้าเปิดของหน้าบริการ */
  intro: string[];
  /** สิ่งที่รวมอยู่ในบริการ */
  includes: string[];
  /** เหมาะกับใคร */
  forWho: string[];
  /** ขั้นตอนการทำงาน (ถ้ามี) */
  process?: { step: string; detail: string }[];
  /** id ของบทความที่เกี่ยวข้อง */
  relatedArticleIds: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  /** ข้อความเล็กหน้าราคา เช่น "เริ่มต้น" */
  pricePrefix?: string;
  price: string;
  unit: string;
  /** หมายเหตุใต้ราคา (ย้ำว่าราคาขึ้นกับรายละเอียดงาน) */
  priceNote: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
  badge?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

/**
 * เนื้อหาบทความ 1 ส่วน
 * - ข้อความธรรมดา = 1 ย่อหน้า
 * - { heading } = หัวข้อย่อย (h2)
 * - { list } = รายการแบบ bullet
 */
export type ArticleBlock =
  | string
  | { heading: string }
  | { list: string[] }
  /** ย่อหน้าที่มีลิงก์ท้ายข้อความ เช่น ลิงก์ไปบทความอื่น */
  | { link: { before?: string; label: string; href: string } }
  /** กล่องคำแนะนำจากทีม Easy */
  | { tip: string };

export interface Article {
  /** ใช้เป็น URL ของบทความ: /articles/<id>/ (ภาษาอังกฤษตัวเล็ก คั่นด้วย -) */
  id: string;
  title: string;
  category: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  /** คำโปรย — ใช้ในการ์ดบทความ และเป็น meta description ของหน้าบทความ */
  excerpt: string;
  content: ArticleBlock[];
  /** แสดงในหน้าแรก */
  featured: boolean;
  /** วันที่เผยแพร่ / แก้ไขล่าสุด (YYYY-MM-DD) */
  publishedAt: string;
  updatedAt: string;
}

export type LeadMode = 'quote' | 'consult';

export interface LeadFormValues {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  lineId: string;
  businessType: string;
  documentVolume: string;
  vatStatus: string;
  services: string[];
  plan: string;
  details: string;
  /** ยินยอมให้เก็บและใช้ข้อมูลเพื่อติดต่อกลับ (PDPA) */
  consent: boolean;
}

export interface LeadPreset {
  mode?: LeadMode;
  planId?: string;
  serviceId?: string;
}
