import * as React from 'react';

/** A single figure in the hero stat strip: big value + small label. */
export interface StatBlockProps {
  value: React.ReactNode;
  label: React.ReactNode;
  style?: React.CSSProperties;
}
export function StatBlock(props: StatBlockProps): JSX.Element;
