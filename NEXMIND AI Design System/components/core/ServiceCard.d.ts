import * as React from 'react';

/**
 * Service / capability card: index + Latin label + Chinese title + body.
 * @startingPoint section="Core" subtitle="Bordered service card" viewport="700x260"
 */
export interface ServiceCardProps {
  /** Index numeral, e.g. "01". */
  index?: React.ReactNode;
  /** Small uppercase Latin label, e.g. "Edge Hardware". */
  label?: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  style?: React.CSSProperties;
}
export function ServiceCard(props: ServiceCardProps): JSX.Element;
