import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { navItems } from '../data/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrolled } from '../hooks/useScrolled';
import { useLeadForm } from '../context/LeadFormContext';
import { cn } from '../lib/cn';
import { scrollToHash } from '../lib/scrollToHash';
import { Button } from './ui/Button';
import { Logo } from './ui/Logo';
import { MobileMenu } from './MobileMenu';

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolled();
  const { openLeadForm } = useLeadForm();
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // ปิดเมนูอัตโนมัติเมื่อขยายหน้าจอเป็น desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-white/85',
        scrolled || menuOpen ? 'shadow-header' : 'shadow-[0_1px_0_rgb(16_64_42/0.06)]',
      )}
    >
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-4 lg:h-[4.5rem]">
        <a href="#home" className="shrink-0 rounded-lg" aria-label="Easy Tax & Account — กลับไปหน้าหลัก" onClick={(event) => {
            if (!menuOpen) return;
            event.preventDefault();
            closeMenu();
            scrollToHash('#home');
          }}
        >
          <Logo />
        </a>

        <nav aria-label="เมนูหลัก" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative block rounded-full px-4 py-2 text-[0.9375rem] font-medium transition-colors duration-200',
                      'after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-center after:rounded-full after:bg-brand-600 after:transition-transform after:duration-300',
                      isActive
                        ? 'text-brand-800 after:scale-x-100'
                        : 'text-ink-soft after:scale-x-0 hover:text-brand-800 hover:after:scale-x-50',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button size="md" onClick={() => openLeadForm({ mode: 'consult' })}>
              <MessageCircle aria-hidden="true" />
              ปรึกษาฟรี
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-full text-brand-900 ring-1 ring-brand-100 transition duration-200 hover:bg-brand-50 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        activeId={active}
        onClose={closeMenu}
        onConsult={() => {
          closeMenu();
          openLeadForm({ mode: 'consult' });
        }}
        onQuote={() => {
          closeMenu();
          openLeadForm({ mode: 'quote' });
        }}
      />
    </header>
  );
}
