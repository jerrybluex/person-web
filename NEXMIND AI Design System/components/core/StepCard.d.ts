import * as React from 'react';

/** A delivery-path step: top rule + steel number + title + optional description. */
export interface StepCardProps {
  number: React.ReactNode;
  title: React.ReactNode;
  body?: React.ReactNode;
  style?: React.CSSProperties;
}
export function StepCard(props: StepCardProps): JSX.Element;
