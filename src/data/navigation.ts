import type { NavItem } from '../types';

/** href แบบ /#id ใช้ได้จากทุกหน้า (บนหน้าแรกจะถูกแปลงเป็น #id ให้เลื่อนในหน้าเดิม) */
export const navItems: NavItem[] = [
  { id: 'home', label: 'หน้าหลัก', href: '/#home' },
  { id: 'services', label: 'บริการ', href: '/#services' },
  { id: 'pricing', label: 'ราคา', href: '/#pricing' },
  { id: 'about', label: 'เกี่ยวกับเรา', href: '/#about' },
  { id: 'articles', label: 'บทความ', href: '/#articles' },
  { id: 'contact', label: 'ติดต่อเรา', href: '/#contact' },
];