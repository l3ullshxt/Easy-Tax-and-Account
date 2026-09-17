import { useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle, Send } from 'lucide-react';
import { navItems } from '../data/navigation';
import { siteConfig } from '../config/site';
import { cn } from '../lib/cn';
import { scrollToHash } from '../lib/scrollToHash';
import { Button, ButtonLink } from './ui/Button';
import { LineIcon } from './ui/SocialIcons';

interface MobileMenuProps {
  open: boolean;
  activeId: string;
  onClose: (restoreFocus?: boolean) => void;
  onConsult: () => void;
  onQuote: () => void;
}

export function MobileMenu({ open, activeId, onClose, onConsult, onQuote }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    // โฟกัสลิงก์แรกเมื่อเปิดเมนู
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a, button');
    firstLink?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(true);
        return;
      }
      // Focus trap แบบเบา ๆ ภายในเมนู
      if (event.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const toggle = document.querySelector<HTMLElement>('[aria-controls="mobile-menu"]');
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          toggle?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle?.focus();
        } else if (!event.shiftKey && document.activeElement === toggle) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <div className="lg:hidden">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => onClose()}
        className={cn(
          'fixed inset-x-0 bottom-0 top-[4.25rem] bg-brand-950/30 backdrop-blur-[2px] transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        className={cn(
          'absolute inset-x-0 top-full grid transition-[grid-template-rows,opacity] duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="max-h-[calc(100dvh-4.25rem)] overflow-y-auto rounded-b-[1.75rem] border-t border-brand-100 bg-white px-4 pb-6 pt-3 shadow-lift sm:px-6">
            <nav aria-label="เมนูมือถือ">
              <ul className="divide-y divide-brand-100/70">
                {navItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={(event) => {
                          event.preventDefault();
                          onClose();
                          scrollToHash(item.href);
                        }}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-2 py-3.5 text-[1.0625rem] font-medium transition-colors duration-200',
                          isActive ? 'text-brand-700' : 'text-ink hover:text-brand-700',
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className={cn('size-1.5 rounded-full', isActive ? 'bg-sun-400' : 'bg-transparent')}
                          />
                          {item.label}
                        </span>
                        <ArrowRight className="size-4 text-brand-300" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button size="lg" fullWidth onClick={onQuote}>
                <Send aria-hidden="true" />
                ขอใบเสนอราคา
              </Button>
              <Button size="lg" variant="secondary" fullWidth onClick={onConsult}>
                <MessageCircle aria-hidden="true" />
                ปรึกษาฟรี
              </Button>
            </div>
            <ButtonLink
              href={siteConfig.contact.lineUrl}
              external
              variant="ghost"
              size="md"
              fullWidth
              className="mt-2"
              onClick={() => onClose()}
            >
              <LineIcon className="text-line" />
              แอด LINE {siteConfig.contact.lineId}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
