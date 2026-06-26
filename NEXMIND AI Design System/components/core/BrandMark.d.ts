import * as React from 'react';

/** The NEXMIND wordmark: solid slate square + letter-spaced name. */
export interface BrandMarkProps {
  name?: string;
  /** Square size in px. */
  size?: number;
  /** Mark + text color (use a light value on dark surfaces). */
  color?: string;
  style?: React.CSSProperties;
}
export function BrandMark(props: BrandMarkProps): JSX.Element;
