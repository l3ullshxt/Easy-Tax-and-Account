import { vatStatusOptions } from '../data/leadForm';
import { pricingPlans } from '../data/pricing';
import { services } from '../data/services';
import type { LeadFormValues, LeadMode } from '../types';

/**
 * URL ของ Google Apps Script Web app — ตั้งค่าในไฟล์ .env.local
 *   VITE_LEAD_FORM_ENDPOINT=https://script.google.com/macros/s/xxxx/exec
 * (ดูขั้นตอนใน README.md หัวข้อ "เชื่อมฟอร์มกับ Google Sheets")
 */
const endpoint = import.meta.env.VITE_LEAD_FORM_ENDPOINT?.trim();

interface SubmitMeta {
  mode: LeadMode;
  /** ค่าจากช่อง honeypot (ผู้ใช้จริงจะไม่เห็นช่องนี้) */
  honeypot?: string;
}

/** แปลง id ต่าง ๆ ให้เป็นข้อความที่อ่านง่ายใน Google Sheets */
function toPayload(values: LeadFormValues, meta: SubmitMeta) {
  return {
    mode: meta.mode === 'consult' ? 'ปรึกษาฟรี' : 'ขอใบเสนอราคา',
    name: values.name.trim(),
    businessName: values.businessName.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    lineId: values.lineId.trim(),
    businessType: values.businessType,
    documentVolume: values.documentVolume,
    vatStatus: vatStatusOptions.find((option) => option.value === values.vatStatus)?.label ?? '',
    services: values.services.map((id) => services.find((service) => service.id === id)?.title ?? id).join(', '),
    plan: pricingPlans.find((plan) => plan.id === values.plan)?.name ?? '',
    details: values.details.trim(),
    pageUrl: window.location.href,
    website: meta.honeypot ?? '',
  };
}

export async function submitLead(values: LeadFormValues, meta: SubmitMeta) {
  const payload = toPayload(values, meta);

  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.warn('[Lead form] ยังไม่ได้ตั้งค่า VITE_LEAD_FORM_ENDPOINT — จำลองการส่งข้อมูล:', payload);
      await new Promise((resolve) => setTimeout(resolve, 900));
      return;
    }
    // บน production ถ้าไม่ได้ตั้งค่า ให้แจ้ง error แทนการบอกว่าส่งสำเร็จ (ข้อมูลลูกค้าจะได้ไม่หายเงียบ ๆ)
    throw new Error('VITE_LEAD_FORM_ENDPOINT is not configured');
  }

  // ใช้ text/plain เพื่อไม่ให้ browser ส่ง preflight (Apps Script ไม่รองรับ OPTIONS)
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(`Submit failed: HTTP ${response.status}`);

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!result?.ok) throw new Error(`Submit failed: ${result?.error ?? 'invalid response'}`);
}
