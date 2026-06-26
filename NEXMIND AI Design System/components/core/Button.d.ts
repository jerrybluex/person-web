import * as React from 'react';

/**
 * NEXMIND primary action button — sharp 2px, medium-weight label.
 * @startingPoint section="Core" subtitle="Primary & ghost buttons" viewport="700x150"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Filled slate (primary) or hairline outline (ghost). */
  variant?: 'primary' | 'ghost';
  /** Control height. */
  size?: 'sm' | 'md' | 'lg';
  /** Render as a different element, e.g. 'a'. */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
