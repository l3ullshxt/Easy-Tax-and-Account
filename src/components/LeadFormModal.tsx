import { useId, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Check, LoaderCircle, Lock, Send } from 'lucide-react';
import { siteConfig } from '../config/site';
import { useLeadForm } from '../context/LeadFormContext';
import { businessTypeOptions, documentVolumeOptions, vatStatusOptions } from '../data/leadForm';
import { pricingPlans } from '../data/pricing';
import { services } from '../data/services';
import { cn } from '../lib/cn';
import { submitLead } from '../lib/submitLead';
import type { LeadFormValues } from '../types';
import { Button, ButtonLink } from './ui/Button';
import { Modal } from './ui/Modal';
import { LineIcon } from './ui/SocialIcons';

type Errors = Partial<Record<keyof LeadFormValues, string>>;

function validate(values: LeadFormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'กรุณากรอกชื่อ';
  const phone = values.phone.replace(/[\s-]/g, '');
  if (!phone) errors.phone = 'กรุณากรอกเบอร์โทร';
  else if (!/^(\+66|0)\d{8,9}$/.test(phone)) errors.phone = 'รูปแบบเบอร์โทรไม่ถูกต้อง เช่น 081-234-5678';
  if (!values.businessType) errors.businessType = 'กรุณาเลือกประเภทธุรกิจ';
  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-orange-700">
      {message}
    </p>
  );
}

function LeadForm() {
  const { preset, closeLeadForm } = useLeadForm();
  const uid = useId();
  const mode = preset.mode ?? 'quote';
  const isConsult = mode === 'consult';
  const selectedPlan = pricingPlans.find((plan) => plan.id === preset.planId);

  const [values, setValues] = useState<LeadFormValues>({
    name: '',
    businessName: '',
    phone: '',
    lineId: '',
    businessType: '',
    documentVolume: '',
    vatStatus: '',
    services: preset.serviceId ? [preset.serviceId] : [],
    plan: selectedPlan?.id ?? '',
    details: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const ids = useMemo(
    () => ({
      title: 'lead-form-title',
      name: `${uid}-name`,
      businessName: `${uid}-business-name`,
      phone: `${uid}-phone`,
      lineId: `${uid}-line`,
      businessType: `${uid}-business-type`,
      documentVolume: `${uid}-docs`,
      plan: `${uid}-plan`,
      details: `${uid}-details`,
    }),
    [uid],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LeadFormValues]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const toggleService = (serviceId: string) => {
    setValues((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as keyof typeof ids | undefined;
    if (firstError) {
      document.getElementById(ids[firstError])?.focus();
      return;
    }
    const honeypot = String(new FormData(event.currentTarget).get('website') ?? '');
    setStatus('submitting');
    try {
      await submitLead(values, { mode, honeypot });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="px-6 pb-10 pt-14 text-center sm:px-12 sm:pb-12" role="status" aria-live="polite">
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-brand-50 text-brand-600 ring-8 ring-brand-50/60">
          <Check className="size-10" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <h2 id={ids.title} className="mt-6 text-2xl font-bold text-brand-900 sm:text-3xl" tabIndex={-1}>
          ขอบคุณค่ะ 💚
        </h2>
        <p className="mt-2 text-lg text-ink-soft">ทีม Easy จะติดต่อกลับโดยเร็วที่สุด</p>
        <p className="mt-1 text-sm text-ink-muted">({siteConfig.contact.officeHours})</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.contact.lineUrl} external variant="secondary" size="lg">
            <LineIcon className="text-line" />
            แอด LINE คุยต่อได้ทันที
          </ButtonLink>
          <Button size="lg" onClick={closeLeadForm}>
            กลับสู่เว็บไซต์
          </Button>
        </div>
      </div>
    );
  }

  const inputProps = (field: keyof typeof ids & keyof LeadFormValues) => ({
    id: ids[field],
    name: field,
    value: values[field] as string,
    onChange: handleChange,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${ids[field]}-error` : undefined,
    className: 'field-input',
  });

  return (
    <div>
      <div className="rounded-t-[1.75rem] bg-gradient-to-br from-brand-50 via-cream-100 to-white px-6 pb-6 pt-8 sm:px-9 sm:pt-9">
        <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-brand-600">
          {isConsult ? 'Free Consultation' : 'Request a Quote'}
        </p>
        <h2 id={ids.title} className="mt-1.5 pr-10 text-2xl font-bold text-brand-900 sm:text-[1.75rem]">
          {isConsult ? 'ปรึกษาฟรี กับทีม Easy' : 'ขอใบเสนอราคา'}
        </h2>
        <p className="mt-2 text-[0.9375rem] text-ink-soft">
          {isConsult
            ? 'เล่าเรื่องธุรกิจของคุณให้เราฟังคร่าว ๆ ทีมงานจะติดต่อกลับเพื่อให้คำปรึกษาเบื้องต้นฟรี'
            : 'กรอกข้อมูลสั้น ๆ เพื่อให้เราประเมินค่าบริการที่เหมาะกับธุรกิจของคุณ'}
        </p>
        <a
          href={siteConfig.contact.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-brand-700 underline decoration-brand-300 underline-offset-4 hover:decoration-brand-600"
        >
          <LineIcon className="size-4 text-line" />
          หรือทักแชท LINE ได้ทันที
          <span className="sr-only">(เปิดในแท็บใหม่)</span>
        </a>
      </div>

      <form noValidate onSubmit={handleSubmit} className="relative px-6 pb-8 pt-6 sm:px-9 sm:pb-9">
        {/* Honeypot กันสแปมบอท — ซ่อนจากผู้ใช้จริงและ screen reader */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        <p className="mb-5 text-sm text-ink-muted">
          ช่องที่มีเครื่องหมาย <span className="font-bold text-orange-700">*</span> จำเป็นต้องกรอก
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={ids.name} className="field-label">
              ชื่อ <span className="text-orange-700" aria-hidden="true">*</span>
            </label>
            <input {...inputProps('name')} type="text" autoComplete="name" required placeholder="ชื่อ-นามสกุล" />
            <FieldError id={`${ids.name}-error`} message={errors.name} />
          </div>

          <div>
            <label htmlFor={ids.businessName} className="field-label">
              ชื่อธุรกิจ
            </label>
            <input {...inputProps('businessName')} type="text" autoComplete="organization" placeholder="ชื่อร้าน / บริษัท" />
          </div>

          <div>
            <label htmlFor={ids.phone} className="field-label">
              เบอร์โทร <span className="text-orange-700" aria-hidden="true">*</span>
            </label>
            <input {...inputProps('phone')} type="tel" inputMode="tel" autoComplete="tel" required placeholder="08X-XXX-XXXX" />
            <FieldError id={`${ids.phone}-error`} message={errors.phone} />
          </div>

          <div>
            <label htmlFor={ids.lineId} className="field-label">
              LINE ID
            </label>
            <input {...inputProps('lineId')} type="text" autoComplete="off" placeholder="เช่น @yourshop" />
          </div>

          <div>
            <label htmlFor={ids.businessType} className="field-label">
              ประเภทธุรกิจ <span className="text-orange-700" aria-hidden="true">*</span>
            </label>
            <select {...inputProps('businessType')} required>
              <option value="">เลือกประเภทธุรกิจ</option>
              {businessTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FieldError id={`${ids.businessType}-error`} message={errors.businessType} />
          </div>

          <div>
            <label htmlFor={ids.documentVolume} className="field-label">
              จำนวนเอกสารต่อเดือน
            </label>
            <select {...inputProps('documentVolume')}>
              <option value="">เลือกจำนวนโดยประมาณ</option>
              {documentVolumeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="mt-6">
          <legend className="field-label">สถานะ VAT</legend>
          <div className="flex flex-wrap gap-2.5">
            {vatStatusOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  'inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[0.9375rem] transition-colors duration-200 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500',
                  values.vatStatus === option.value
                    ? 'border-brand-600 bg-brand-50 font-semibold text-brand-800'
                    : 'border-[#cfdcd3] bg-white text-ink hover:border-brand-300',
                )}
              >
                <input
                  type="radio"
                  name="vatStatus"
                  value={option.value}
                  checked={values.vatStatus === option.value}
                  onChange={handleChange}
                  className="size-4 accent-brand-600"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="field-label">บริการที่สนใจ (เลือกได้มากกว่า 1)</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {services.map((service) => {
              const checked = values.services.includes(service.id);
              return (
                <label
                  key={service.id}
                  className={cn(
                    'flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[0.9375rem] transition-colors duration-200 has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500',
                    checked ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-[#cfdcd3] bg-white text-ink hover:border-brand-300',
                  )}
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={service.id}
                    checked={checked}
                    onChange={() => toggleService(service.id)}
                    className="size-4 shrink-0 accent-brand-600"
                  />
                  {service.title}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6">
          <label htmlFor={ids.plan} className="field-label">
            แพ็กเกจที่สนใจ
          </label>
          <select {...inputProps('plan')}>
            <option value="">ยังไม่แน่ใจ / ให้ทีมงานแนะนำ</option>
            {pricingPlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} — {plan.pricePrefix ? `${plan.pricePrefix} ` : ''}
                {plan.price} {plan.unit}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6">
          <label htmlFor={ids.details} className="field-label">
            รายละเอียดเพิ่มเติม
          </label>
          <textarea
            {...inputProps('details')}
            rows={4}
            placeholder="เช่น ขายของบน TikTok Shop ยอดขายประมาณเดือนละ... มีพนักงาน 2 คน อยากให้ช่วยดูเรื่อง..."
            className="field-input resize-y"
          />
        </div>

        {status === 'error' && (
          <p role="alert" className="mt-5 rounded-xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800">
            ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อเราทาง LINE
          </p>
        )}

        <Button type="submit" size="lg" fullWidth className="mt-7" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden="true" />
              กำลังส่งข้อมูล...
            </>
          ) : (
            <>
              <Send aria-hidden="true" />
              {isConsult ? 'ส่งข้อมูลเพื่อรับคำปรึกษา' : 'ส่งข้อมูลเพื่อขอใบเสนอราคา'}
            </>
          )}
        </Button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[0.8125rem] text-ink-muted">
          <Lock className="size-3.5" aria-hidden="true" />
          ข้อมูลของคุณจะใช้เพื่อติดต่อกลับเท่านั้น
        </p>
      </form>
    </div>
  );
}

export function LeadFormModal() {
  const { isOpen, closeLeadForm } = useLeadForm();
  return (
    <Modal open={isOpen} onClose={closeLeadForm} labelledBy="lead-form-title" closeLabel="ปิดฟอร์ม">
      <LeadForm />
    </Modal>
  );
}
