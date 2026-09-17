import {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  ClipboardList,
  MessagesSquare,
  Receipt,
  ShoppingBag,
  Users,
} from 'lucide-react';
import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'monthly-bookkeeping',
    title: 'รับทำบัญชีรายเดือน',
    description: 'ดูแลบัญชีอย่างเป็นระบบ พร้อมรายงานสรุป',
    icon: ClipboardList,
    featured: true,
  },
  {
    id: 'tax-filing',
    title: 'ยื่นภาษี',
    description: 'ภาษีหัก ณ ที่จ่าย VAT และภาษีต่าง ๆ',
    icon: Receipt,
    featured: true,
  },
  {
    id: 'financial-statements',
    title: 'ปิดงบการเงิน',
    description: 'จัดทำงบการเงินและรายงานที่เกี่ยวข้อง',
    icon: BookOpenCheck,
    featured: true,
  },
  {
    id: 'company-registration',
    title: 'จดบริษัท / จดทะเบียนธุรกิจ',
    description: 'ให้คำปรึกษาและดำเนินการครบทุกขั้นตอน',
    icon: Building2,
    featured: true,
  },
  {
    id: 'consulting',
    title: 'ให้คำปรึกษาด้านบัญชี',
    description: 'วางแผนภาษี แก้ปัญหาบัญชี และให้คำปรึกษาธุรกิจ',
    icon: MessagesSquare,
    featured: true,
  },
  {
    id: 'ecommerce',
    title: 'บัญชีสำหรับร้านค้าออนไลน์',
    description: 'E-Commerce / Marketplace / TikTok Shop',
    icon: ShoppingBag,
    featured: true,
  },
  {
    id: 'payroll',
    title: 'ทำเงินเดือน & ประกันสังคม',
    description: 'คำนวณเงินเดือน ภาษีหัก ณ ที่จ่าย และนำส่งประกันสังคม',
    icon: Users,
    featured: false,
  },
  {
    id: 'audit-coordination',
    title: 'ประสานงานผู้สอบบัญชี',
    description: 'เตรียมเอกสารและประสานงานกับผู้สอบบัญชีให้ครบจบในที่เดียว',
    icon: BadgeCheck,
    featured: false,
  },
];
