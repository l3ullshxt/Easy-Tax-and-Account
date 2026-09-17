import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function LineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12 2.8C6.3 2.8 1.8 6.5 1.8 11c0 4.1 3.6 7.5 8.5 8.1.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5 1.1-.5 6-3.5 8.2-6 1.5-1.7 2.2-3.3 2.2-5.1 0-4.5-4.6-8.1-10.4-8.1Z" />
      <path
        fill="var(--line-text, #fff)"
        d="M5.9 13.4h2.2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H6.4V8.6c0-.3-.2-.5-.5-.5s-.5.2-.5.5v4.3c0 .3.2.5.5.5Zm3.6-4.8c-.3 0-.5.2-.5.5v4.3c0 .3.2.5.5.5s.5-.2.5-.5V9.1c0-.3-.2-.5-.5-.5Zm5 0c-.3 0-.5.2-.5.5v2.7l-2.2-3a.5.5 0 0 0-.9.3v4.3c0 .3.2.5.5.5s.5-.2.5-.5v-2.7l2.2 3c.1.1.2.2.4.2h.2c.2-.1.3-.3.3-.5V9.1c-.1-.3-.3-.5-.5-.5Zm3.6 1c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2.2c-.3 0-.5.2-.5.5v4.3c0 .3.2.5.5.5h2.2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-1.7v-1.2h1.7c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-1.7V9.6h1.7Z"
      />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M13.6 21.5v-8h2.7l.4-3.2h-3.1V8.3c0-.9.3-1.5 1.6-1.5h1.6V4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.7v3.2h2.7v8h3.2Z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M16.8 5.6a4.4 4.4 0 0 1-1.1-2.9h-3.2v12.6a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.5a5.9 5.9 0 1 0 5.1 5.8V9a7.6 7.6 0 0 0 4.4 1.4V7.2a4.4 4.4 0 0 1-3.3-1.6Z" />
    </svg>
  );
}
