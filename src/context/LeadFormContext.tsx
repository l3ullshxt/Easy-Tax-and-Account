import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { LeadPreset } from '../types';

interface LeadFormContextValue {
  isOpen: boolean;
  preset: LeadPreset;
  openLeadForm: (preset?: LeadPreset) => void;
  closeLeadForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<LeadPreset>({});

  const openLeadForm = useCallback((next: LeadPreset = {}) => {
    setPreset({ mode: 'quote', ...next });
    setIsOpen(true);
  }, []);

  const closeLeadForm = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, preset, openLeadForm, closeLeadForm }),
    [isOpen, preset, openLeadForm, closeLeadForm],
  );

  return <LeadFormContext.Provider value={value}>{children}</LeadFormContext.Provider>;
}

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) throw new Error('useLeadForm must be used within LeadFormProvider');
  return ctx;
}
