import { Rocket, Sprout, TrendingUp } from 'lucide-react';
import type { BusinessStage } from '../types';

export const businessStages: BusinessStage[] = [
  {
    id: 'starting',
    step: '01',
    title: 'กำลังเริ่มธุรกิจ',
    description: 'จดบริษัท วางระบบบัญชี และวางแผนภาษีตั้งแต่วันแรก',
    icon: Sprout,
    tone: 'mint',
  },
  {
    id: 'growing',
    step: '02',
    title: 'ธุรกิจกำลังโต',
    description: 'ดูแลบัญชีรายเดือน ภาษี และเอกสารให้เป็นระบบ',
    icon: TrendingUp,
    tone: 'sun',
  },
  {
    id: 'scaling',
    step: '03',
    title: 'ธุรกิจพร้อมขยาย',
    description: 'วิเคราะห์ข้อมูลบัญชีและวางแผนภาษี เพื่อรองรับการเติบโต',
    icon: Rocket,
    tone: 'sage',
  },
];
