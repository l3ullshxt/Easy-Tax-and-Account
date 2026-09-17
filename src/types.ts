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
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** แสดงในหน้าแรกตั้งแต่ต้น (ที่เหลือจะแสดงเมื่อกด "ดูบริการทั้งหมด") */
  featured: boolean;
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

export interface Article {
  id: string;
  title: string;
  category: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  excerpt: string;
  content: string[];
  featured: boolean;
}

export type LeadMode = 'quote' | 'consult';

export interface LeadFormValues {
  name: string;
  businessName: string;
  phone: string;
  lineId: string;
  businessType: string;
  documentVolume: string;
  vatStatus: string;
  services: string[];
  plan: string;
  details: string;
}

export interface LeadPreset {
  mode?: LeadMode;
  planId?: string;
  serviceId?: string;
}
