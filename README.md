# Easy Tax & Account — Website

เว็บไซต์สำนักงานบัญชี **Easy Tax & Account** — "บัญชีไม่ยาก ถ้ามี Easy อยู่ข้าง ๆ"

React + TypeScript + Vite + Tailwind CSS v4 + Lucide React

## ติดตั้งและรัน

ต้องมี Node.js 20.19 ขึ้นไป (แนะนำ LTS)

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # build production ไปที่ dist/
npm run preview    # ดูผล build
```

## โครงสร้างโปรเจกต์

```
index.html                 SEO: title, meta, Open Graph, JSON-LD
public/
  favicon.svg
  robots.txt, sitemap.xml
  images/
    characters/            รูปพี่ Easy + น้อง Bee (placeholder SVG)
    articles/              รูปประกอบบทความ
    pricing-desk.svg
src/
  main.tsx, App.tsx
  config/site.ts           ⭐ ข้อมูลติดต่อ, LINE, โลโก้, path รูป
  data/                    ⭐ ข้อมูลที่แก้บ่อย (เป็น array)
    navigation.ts  hero.ts  stages.ts  services.ts
    pricing.ts  whyEasy.ts  articles.ts  leadForm.ts  footer.ts
  sections/                Hero, BusinessStages, Services, Pricing, WhyEasy, Articles, CTA
  components/              Navbar, MobileMenu, Footer, ServiceCard, PricingCard,
                           ArticleCard, LeadFormModal, FloatingLineButton
    ui/                    Button, Logo, Modal, Reveal, SectionHeading, SocialIcons
  context/LeadFormContext.tsx   เปิดฟอร์มขอใบเสนอราคาได้จากทุกที่
  hooks/                   useInView, useActiveSection, useScrolled
  styles/index.css         Design tokens (สี, ฟอนต์, เงา) + base styles
```

## จุดที่ต้องแก้ไขก่อนเปิดใช้งานจริง

| เรื่อง | ไฟล์ |
| --- | --- |
| **Logo** | ใส่ไฟล์ใน `public/images/` แล้วตั้ง `logo.src` (และ `logo.srcOnDark` สำหรับ footer) ใน `src/config/site.ts` — ถ้าไม่ตั้ง จะใช้โลโก้ตัวอักษรใน `src/components/ui/Logo.tsx` |
| **รูป Character** | แทนที่ `public/images/characters/easy-bee-hero.svg` (Hero) และ `easy-bee-cta.svg` (CTA) หรือเปลี่ยน path ที่ `images` ใน `src/config/site.ts` (รองรับ .png / .webp — แนะนำพื้นหลังโปร่งใส สัดส่วนประมาณ 700×520 และ 466×362) |
| **ข้อมูลติดต่อ** | `contact` ใน `src/config/site.ts` (LINE ID, เบอร์โทร, Email, Facebook, TikTok, เวลาทำการ) |
| **ราคา / แพ็กเกจ** | `src/data/pricing.ts` (ราคา, รายการ, หมายเหตุราคา) |
| **LINE** | `contact.lineUrl` ใน `src/config/site.ts` (ตอนนี้ `https://lin.ee/wkl0qUa`) — ใช้กับปุ่มลอย, CTA, เมนูมือถือ, footer, ฟอร์ม |
| **Form backend** | Google Sheets — ดูหัวข้อ "เชื่อมฟอร์มกับ Google Sheets" ด้านล่าง (โค้ดส่งข้อมูลอยู่ที่ `src/lib/submitLead.ts`) |
| **โดเมน / SEO** | ตอนนี้ใช้ `https://easy-tax-and-account.vercel.app` — ถ้าเปลี่ยนโดเมน ให้ค้นหาคำนี้แล้วแก้ใน `index.html` (canonical, og:url, og:image, JSON-LD), `public/robots.txt`, `public/sitemap.xml` |
| **บริการ / บทความ** | `src/data/services.ts`, `src/data/articles.ts` (`featured: true` = แสดงตั้งแต่แรก) |

## พฤติกรรมของปุ่มหลัก

- **ขอใบเสนอราคา / ขอราคา / คุยกับเรา / สอบถามบริการนี้** → เปิดฟอร์มขอใบเสนอราคา (เลือกแพ็กเกจ/บริการไว้ให้อัตโนมัติ)
- **ปรึกษาฟรี** → เปิดฟอร์มโหมดปรึกษา (มีลิงก์ทัก LINE ด้านบนฟอร์ม)
- **แอด LINE / ปุ่ม LINE ลอย** → เปิด LINE ในแท็บใหม่
- **ดูบริการทั้งหมด / ดูบทความทั้งหมด** → แสดงรายการเพิ่มเติม
- **อ่านต่อ** → เปิดบทความใน dialog (เปลี่ยนเป็นหน้าบทความจริงได้เมื่อมี CMS)

## เชื่อมฟอร์มกับ Google Sheets

ข้อมูลจากฟอร์ม "ขอใบเสนอราคา / ปรึกษาฟรี" จะถูกบันทึกลงแท็บ `Leads` ใน Google Sheet (หนึ่งแถวต่อหนึ่งคำขอ) และแจ้งเตือนทางอีเมลได้

1. สร้าง Google Sheet ใหม่ (เช่น "Easy — ลูกค้าสนใจ") และตั้ง **File > Settings > Time zone** เป็น `(GMT+07:00) Bangkok`
2. เมนู **Extensions > Apps Script** → ลบโค้ดเดิม แล้ววางโค้ดทั้งหมดจาก `google-apps-script/Code.gs` → กด Save
   - ถ้าต้องการอีเมลแจ้งเตือน ใส่อีเมลที่ `NOTIFY_EMAILS`
3. กด **Deploy > New deployment** → เลือกประเภท **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - กด Deploy → อนุญาตสิทธิ์ (Authorize access) ด้วยบัญชี Google ของสำนักงาน
4. คัดลอก **Web app URL** (ลงท้ายด้วย `/exec`) — เปิด URL นี้ใน browser ควรเห็น `{"ok":true,...}`
5. ในโปรเจกต์ คัดลอก `.env.example` เป็น `.env.local` แล้วใส่ URL:
   ```
   VITE_LEAD_FORM_ENDPOINT=https://script.google.com/macros/s/xxxx/exec
   ```
6. หยุดแล้วรัน `npm run dev` ใหม่ → ลองกรอกฟอร์ม → ตรวจว่ามีแถวใหม่ในแท็บ `Leads`
7. ตอนนำเว็บขึ้น hosting (Vercel / Netlify ฯลฯ) ให้ตั้ง Environment Variable `VITE_LEAD_FORM_ENDPOINT` ในหน้าตั้งค่าของ hosting แล้ว build ใหม่

หมายเหตุ
- ถ้าแก้ `Code.gs` ภายหลัง ต้อง **Deploy > Manage deployments > Edit (ไอคอนดินสอ) > Version: New version** URL จะยังเป็นอันเดิม
- ถ้าเพิ่ม/ย้ายคอลัมน์ใน `COLUMNS` สคริปต์จะเขียนหัวคอลัมน์ในชีตให้ตรงเองตอนมีคนกรอกฟอร์มครั้งถัดไป — ถ้าอยากซ่อมทันที เลือกฟังก์ชัน `setupHeaders` ใน Apps Script แล้วกด **Run** (ซ่อมเฉพาะหัวคอลัมน์ ไม่ย้ายข้อมูลแถวเก่า)
- ถ้ายังไม่ตั้งค่า URL: ตอน `npm run dev` ฟอร์มจะจำลองการส่ง (ข้อมูลไม่ถูกบันทึก) ส่วนเว็บที่ build แล้วจะแสดงข้อความ "ส่งข้อมูลไม่สำเร็จ" เพื่อไม่ให้ข้อมูลลูกค้าหายโดยไม่มีใครรู้
- มีช่อง honeypot กันสแปมบอทพื้นฐาน และกันการแทรกสูตรลงชีต
