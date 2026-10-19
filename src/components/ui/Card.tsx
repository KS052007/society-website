import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export function Card({
  children,
  className = '',
  as: Component = 'div',
  ...rest
}: CardProps) {
  return (
    <Component
      className={`bg-surface border border-subtle shadow-card rounded-card transition-shadow hover:shadow-md ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
