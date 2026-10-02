import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface LinkItem { label: string; href: string }
export interface Phone { display: string; href: string }
export interface Action { label: string; href?: string; onClick?: MouseEventHandler }

/** One room of the house: arched 3:4 image, Cinzel name, eyebrow line ("Seats 40 · Best at dusk"), one sentence, text link. */
export interface RoomCardProps {
  image?: string;
  imageAlt?: string;
  name: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  action?: Action;
  className?: string;
  style?: CSSProperties;
}
export declare function RoomCard(props: RoomCardProps): JSX.Element;
