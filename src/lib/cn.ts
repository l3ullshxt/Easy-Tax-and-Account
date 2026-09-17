/** รวม className แบบง่าย ๆ (ข้ามค่า falsy) */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}
