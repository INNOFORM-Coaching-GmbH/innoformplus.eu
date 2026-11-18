import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';
import s from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'text' | 'inverse';

type Common = {
  variant?: Variant;
  arrow?: boolean;
  loading?: boolean;
  full?: boolean;
  children: ReactNode;
  className?: string;
};

type AsLink = Common & { href: string; external?: boolean };
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function classes(variant: Variant, full?: boolean, extra?: string) {
  return [s.btn, s[variant], full ? s.full : '', extra ?? ''].join(' ').trim();
}

/** Einheitlicher Knopf: Primary (Magenta), Secondary (Rahmen Blau), Text-Link mit Pfeil, Inverse (auf dunklem Grund). */
export function Button(props: AsLink | AsButton) {
  const { variant = 'primary', arrow, loading, full, children, className } = props;
  const inhalt = (
    <>
      {loading && <Loader2 className={s.spin} size={18} strokeWidth={2} aria-hidden />}
      <span>{children}</span>
      {arrow && !loading && <ArrowRight className={s.arrow} size={18} strokeWidth={2} aria-hidden />}
    </>
  );
  if ('href' in props && props.href) {
    const { href, external } = props;
    return external ? (
      <a href={href} className={classes(variant, full, className)} rel="noopener">
        {inhalt}
      </a>
    ) : (
      <Link href={href} className={classes(variant, full, className)}>
        {inhalt}
      </Link>
    );
  }
  const { variant: _v, arrow: _a, loading: _l, full: _f, children: _c, className: _cl, type, disabled, ...rest } = props as AsButton;
  return (
    <button
      type={type ?? 'button'}
      className={classes(variant, full, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {inhalt}
    </button>
  );
}

export const PrimaryButton = (p: AsLink | AsButton) => <Button {...p} variant="primary" />;
export const SecondaryButton = (p: AsLink | AsButton) => <Button {...p} variant="secondary" />;
export const TextLink = (p: AsLink) => <Button arrow {...p} variant="text" />;
