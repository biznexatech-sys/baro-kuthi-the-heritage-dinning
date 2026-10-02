import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface MenuItem { id?: string; name: string; price?: number | string; description?: string; speciality?: boolean }
export interface MenuPage { title: string; tab?: string; subtitle?: string; items: MenuItem[] }

/**
 * "The Two Tables": an open book — two facing pages (The Bengali Table | The Sahib's Table), double frame, parchment-dark, soft shadow.
 * Items: small-caps name · copper dotted leaders · price; italic description; ✦ House speciality. When narrow: two tabs with a page-turn.
 * Prices come from data (menu.json) — never hard-code them in components.
 */
export interface MenuBookProps {
  /** One page → single centred page; two → facing pages */
  pages?: MenuPage[];
  /** Items per page (e.g. 4 for the home-page preview) */
  limit?: number;
  currency?: string;
  defaultPage?: number;
  /** e.g. <TextLink>View the full menu</TextLink> */
  footer?: ReactNode;
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function MenuBook(props: MenuBookProps): JSX.Element;
