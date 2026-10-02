import type { ReactNode, CSSProperties, MouseEventHandler } from 'react';

export interface Course { numeral: string; name: string; note?: string; image?: string; imageAlt?: string; icon?: string | ReactNode }
export interface HeadingProps { eyebrow?: ReactNode; numeral?: string; title?: ReactNode; lead?: ReactNode }

/**
 * "The Course of a Rajbari Meal": a pinned terracotta-deep section where courses I–VIII enter one at a time as you scroll.
 * Copper progress line on the left with one dot per course (glow on the active one). Stack on mobile or reduced motion.
 */
export interface CourseScrollProps {
  courses?: Course[];
  heading?: HeadingProps;
  /** pinned: scroll-driven · stage: static, dots switch courses (mocks) · stack: vertical list · auto: pinned unless narrow / reduced motion */
  mode?: 'auto' | 'pinned' | 'stage' | 'stack';
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  layout?: 'auto' | 'desktop' | 'mobile';
  className?: string;
  style?: CSSProperties;
}
export declare function CourseScroll(props: CourseScrollProps): JSX.Element;
