import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
}

export type ButtonAsButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: undefined;
    to?: undefined;
  };

export type ButtonAsLinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    href: string;
    to?: undefined;
  };

export type ButtonAsRouterLinkProps = BaseProps & {
  to: string;
  href?: undefined;
};

export type ButtonProps =
  | ButtonAsButtonProps
  | ButtonAsLinkProps
  | ButtonAsRouterLinkProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-on-brand font-semibold shadow-sm hover:bg-brand-hover focus-visible:ring-2 focus-visible:ring-focus',
  secondary:
    'bg-transparent text-default font-medium border-2 border-default hover:bg-section-alt focus-visible:ring-2 focus-visible:ring-focus',
  outline:
    'bg-surface text-default font-medium border border-subtle hover:bg-section-alt focus-visible:ring-2 focus-visible:ring-focus',
  ghost:
    'bg-transparent text-default font-medium hover:bg-section-alt focus-visible:ring-2 focus-visible:ring-focus',
  inverse:
    'bg-white text-default font-semibold hover:bg-mint-100 focus-visible:ring-2 focus-visible:ring-mint-100',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-[44px] px-4 py-2 text-sm',
  md: 'min-h-[44px] px-5 py-2.5 text-base',
  lg: 'min-h-[48px] px-6 py-3 text-lg',
};

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-lg transition-colors cursor-pointer text-center no-underline select-none disabled:opacity-50 disabled:pointer-events-none';

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...rest
  } = props;

  const combinedClass = `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={combinedClass}>
        {children}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const isExternal =
      props.href.startsWith('http') || props.href.startsWith('mailto:');
    return (
      <a
        href={props.href}
        className={combinedClass}
        target={isExternal && !props.href.startsWith('mailto:') ? '_blank' : undefined}
        rel={isExternal && !props.href.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        {isExternal && !props.href.startsWith('mailto:') && (
          <span className="sr-only"> (opens in new tab)</span>
        )}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={combinedClass}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
