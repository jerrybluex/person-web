import * as React from 'react';

/** A capability line for the inverted dark block: index + label, nudges right on hover. */
export interface CapabilityRowProps {
  /** Index numeral, e.g. "01". */
  index?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function CapabilityRow(props: CapabilityRowProps): JSX.Element;
