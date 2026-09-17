import { ShieldCheck, Smile, Store, Zap } from 'lucide-react';
import type { Feature } from '../types';

export const whyEasyFeatures: Feature[] = [
  {
    id: 'easy',
    title: 'เข้าใจง่าย',
    description: 'ไม่ใช้ศัพท์บัญชียาก ๆ คุยกับเราได้แบบสบาย ๆ',
    icon: Smile,
  },
  {
    id: 'fast',
    title: 'ตอบไว',
    description: 'มีเรื่องต้องตัดสินใจหรือสงสัย สอบถามเราได้',
    icon: Zap,
  },
  {
    id: 'transparent',
    title: 'โปร่งใส',
    description: 'แจ้งค่าบริการและขอบเขตงานอย่างชัดเจน',
    icon: ShieldCheck,
  },
  {
    id: 'online',
    title: 'เข้าใจธุรกิจออนไลน์',
    description: 'รองรับ E-Commerce TikTok Shop / Marketplace / SME',
    icon: Store,
  },
];
