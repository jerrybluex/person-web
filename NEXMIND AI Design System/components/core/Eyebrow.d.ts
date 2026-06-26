import * as React from 'react';

/** Letter-spaced steel kicker that opens a section. */
export interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** `steel` on light surfaces, `onDark` on inverted blocks. */
  tone?: 'steel' | 'onDark';
  children?: React.ReactNode;
}
export function Eyebrow(props: EyebrowProps): JSX.Element;
