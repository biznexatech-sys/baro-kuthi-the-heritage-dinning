import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

import type { RoomCardProps } from './RoomCard';

/**
 * "The Rooms of the House": RoomCards in four columns (two below 1100px); a horizontal swipe row with a copper progress line when narrow. Never auto-plays.
 */
export interface RoomRowProps {
  rooms?: RoomCardProps[];
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function RoomRow(props: RoomRowProps): JSX.Element;
