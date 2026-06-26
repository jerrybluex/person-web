import * as React from 'react';

/** Labelled form field — input, select, or textarea — sharp 2px, steel focus. */
export interface FieldProps extends React.InputHTMLAttributes<HTMLElement> {
  label: React.ReactNode;
  /** Which control to render. */
  as?: 'input' | 'select' | 'textarea';
  /** Options when `as="select"`. */
  options?: string[];
  /** Span the full width of a 2-col form. */
  wide?: boolean;
}
export function Field(props: FieldProps): JSX.Element;
