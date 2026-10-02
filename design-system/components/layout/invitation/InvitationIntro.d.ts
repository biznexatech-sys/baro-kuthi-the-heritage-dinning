import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

/**
 * First-visit invitation: full-screen parchment, double-framed card (max 560px), copper wax seal that opens the shutters (900ms).
 * Remembered for 30 days in localStorage; never shown to bots or under reduced motion. "Skip" top-right.
 */
export interface InvitationIntroProps {
  /** Controlled: true forces it open (ignores memory), false hides it */
  open?: boolean;
  /** Called after the shutters finish opening (or immediately under reduced motion) */
  onEnter?: () => void;
  onSkip?: () => void;
  storageKey?: string;
  rememberDays?: number;
  /** Wax-seal crest artwork. Omitted → plain copper seal labelled "Enter" */
  seal?: string | ReactNode;
  /** shutter.svg used as the two panels' texture. Omitted → plain parchment panels with a copper seam */
  shutter?: string;
  /** absolute keeps it inside a positioned parent (mocks, cards) */
  position?: 'fixed' | 'absolute';
  className?: string;
  style?: CSSProperties;
}
export declare function InvitationIntro(props: InvitationIntroProps): JSX.Element | null;
