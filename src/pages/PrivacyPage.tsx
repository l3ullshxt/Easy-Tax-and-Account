import { siteConfig } from '../config/site';
import { Breadcrumb } from '../components/Breadcrumb';

const { contact } = siteConfig;

/**
 * นโยบายความเป็นส่วนตัว (PDPA)
 * ------------------------------------------------------------
 * แก้ไขข้อความได้ที่ไฟล์นี้ — ควรให้ผู้ที่ดูแลด้านกฎหมายของสำนักงานตรวจก่อนใช้งานจริง
 */
export function PrivacyPage() {
  return (
    <>
      <section aria-labelledby="privacy-title" className="bg-gradient-to-b from-cream-100 to-white pb-6 pt-8 sm:pt-12">
        <div className="container-page max-w-3xl">
          <Breadcrumb items={[{ label: 'หน้าแรก', href: '/' }, { label: 'นโยบายความเป็นส่วนตัว' }]} />
          <h1 id="privacy-title" className="mt-6 text-[1.875rem] font-bold tracking-tight text-brand-900 sm:text-4xl">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {siteConfig.name} ให้ความสำคัญกับข้อมูลส่วนบุคคลของคุณ หน้านี้อธิบายว่าเราเก็บข้อมูลอะไร เก็บไปทำอะไร
            และคุณมีสิทธิอะไรบ้าง ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
          </p>
          <p className="mt-2 text-sm text-ink-muted">ปรับปรุงล่าสุด: 29 กันยายน 2569</p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-page max-w-3xl space-y-8 text-[1.0625rem] leading-[1.9] text-ink">
          <div>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">1. ข้อมูลที่เราเก็บ</h2>
            <ul className="mt-3 space-y-2.5">
              {[
                'ข้อมูลที่คุณกรอกในแบบฟอร์มขอใบเสนอราคาหรือขอคำปรึกษา ได้แก่ ชื่อ ชื่อธุรกิจ เบอร์โทร อีเมล LINE ID ประเภทธุรกิจ จำนวนเอกสารต่อเดือน สถานะ VAT บริการที่สนใจ และรายละเอียดเพิ่มเติมที่คุณระบุ',
                'ข้อมูลการใช้งานเว็บไซต์แบบไม่ระบุตัวตนผ่าน Google Analytics เช่น หน้าที่เข้าชม ระยะเวลาที่อยู่ในหน้า ประเภทอุปกรณ์ และแหล่งที่มาของผู้เข้าชม',
                'ข้อมูลที่คุณส่งให้เราโดยตรงผ่านช่องทางติดต่ออื่น เช่น LINE อีเมล หรือโทรศัพท์',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] size-2 shrink-0 rounded-full bg-brand-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">2. วัตถุประสงค์ของการเก็บข้อมูล</h2>
            <p className="mt-3">
              เราใช้ข้อมูลของคุณเพื่อติดต่อกลับ จัดทำใบเสนอราคา ให้คำปรึกษาเบื้องต้น ให้บริการด้านบัญชีและภาษีตามที่ตกลงกัน
              และเพื่อปรับปรุงเว็บไซต์ให้ใช้งานง่ายขึ้น เราไม่นำข้อมูลของคุณไปขายหรือแลกเปลี่ยนกับบุคคลอื่น
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">3. การเก็บรักษาและผู้ให้บริการที่เกี่ยวข้อง</h2>
            <p className="mt-3">
              ข้อมูลจากแบบฟอร์มจะถูกบันทึกไว้ใน Google Workspace (Google Sheets และอีเมล) ของสำนักงาน
              ซึ่งเข้าถึงได้เฉพาะผู้ที่เกี่ยวข้องกับการให้บริการ เว็บไซต์นี้ใช้บริการของ Vercel สำหรับเผยแพร่เว็บไซต์
              และ Google Analytics สำหรับสถิติการเข้าชม ผู้ให้บริการเหล่านี้อาจประมวลผลข้อมูลในต่างประเทศตามนโยบายของแต่ละราย
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">4. ระยะเวลาการเก็บข้อมูล</h2>
            <p className="mt-3">
              เราเก็บข้อมูลผู้ที่ติดต่อเข้ามาไว้เท่าที่จำเป็นต่อการติดต่อและการให้บริการ
              สำหรับลูกค้าที่ใช้บริการแล้ว เราเก็บเอกสารและข้อมูลตามระยะเวลาที่กฎหมายบัญชีและภาษีกำหนด
              เมื่อพ้นความจำเป็นแล้วจะลบหรือทำให้ไม่สามารถระบุตัวบุคคลได้
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">5. คุกกี้และการวัดผล</h2>
            <p className="mt-3">
              เว็บไซต์ใช้คุกกี้ของ Google Analytics เพื่อเก็บสถิติการเข้าชมแบบภาพรวม คุณสามารถปิดหรือลบคุกกี้ได้จากการตั้งค่าเบราว์เซอร์
              โดยไม่กระทบต่อการใช้งานเว็บไซต์
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">6. สิทธิของเจ้าของข้อมูล</h2>
            <p className="mt-3">
              คุณมีสิทธิขอเข้าถึง ขอสำเนา ขอแก้ไขให้ถูกต้อง ขอลบ ขอให้ระงับการใช้ คัดค้านการประมวลผล
              หรือถอนความยินยอมเมื่อใดก็ได้ โดยติดต่อเราตามช่องทางด้านล่าง เราจะดำเนินการตามที่กฎหมายกำหนด
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">7. ติดต่อเรา</h2>
            <p className="mt-3">
              {siteConfig.name}
              <br />
              {contact.address}
              <br />
              โทร{' '}
              <a href={contact.phoneHref} className="font-semibold text-brand-700 underline underline-offset-4">
                {contact.phoneDisplay}
              </a>
              <br />
              อีเมล{' '}
              <a href={`mailto:${contact.email}`} className="font-semibold text-brand-700 underline underline-offset-4">
                {contact.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
