/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL ของ Google Apps Script Web app สำหรับรับข้อมูลฟอร์ม */
  readonly VITE_LEAD_FORM_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
