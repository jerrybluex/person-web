import * as React from 'react';

/**
 * Standard section opener: eyebrow + medium-weight headline + optional lead.
 * @startingPoint section="Core" subtitle="Section heading block" viewport="700x220"
 */
export interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  /** `light` (default) or `dark` for inverted blocks. */
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  maxWidth?: number;
  style?: React.CSSProperties;
}
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
