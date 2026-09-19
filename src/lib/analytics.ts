/**
 * ส่ง event ไปยัง Google Analytics 4
 * ------------------------------------------------------------
 * ตัว gtag ถูกโหลดใน index.html — ถ้ายังโหลดไม่เสร็จ หรือผู้ใช้บล็อกสคริปต์ไว้
 * ฟังก์ชันนี้จะไม่ทำอะไรเลย (เว็บทำงานต่อได้ปกติ ไม่ error)
 */
declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params?: EventParams) {
  try {
    window.gtag?.('event', name, params);
  } catch {
    // สถิติพังไม่ควรทำให้เว็บพัง
  }
}
