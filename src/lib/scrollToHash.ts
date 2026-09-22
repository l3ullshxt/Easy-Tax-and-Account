/**
 * เลื่อนไปยัง section ตาม hash (เช่น "#pricing")
 * ใช้ตอนปิดเมนูมือถือ เพราะขณะเมนูเปิด หน้าเว็บถูกล็อก scroll ไว้
 */
export function scrollToHash(hash: string) {
  document.documentElement.classList.remove('menu-open');
  // รองรับทั้ง "#pricing" และ "/#pricing"
  const id = hash.slice(hash.indexOf('#') + 1);
  const target = document.getElementById(id);
  if (!target) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
  // ย้าย focus ไปยัง section ปลายทาง (สำหรับผู้ใช้ keyboard / screen reader)
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}
