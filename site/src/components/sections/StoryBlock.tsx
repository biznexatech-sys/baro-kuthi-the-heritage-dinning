import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';
import type { Action } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArchImage } from '@/components/ui/ArchImage';
import { TextLink } from '@/components/ui/TextLink';

export type StoryBlockProps = {
  image?: string;
  imageAlt?: string;
  eyebrow?: string;
  numeral?: string;
  year?: string;
  title?: string;
  lead?: string;
  children?: ReactNode;
  quote?: string;
  action?: Action;
  reverse?: boolean;
  tone?: 'light' | 'dark';
  /** Heading level for the title — h2 for page sections, h3 when nested under another heading. */
  headingAs?: 'h2' | 'h3';
};

/** §9.7 "The Courtyard" — arched image (5 cols) + text (5 cols) with a 2-column offset, alternating sides. */
export function StoryBlock({ image, imageAlt, eyebrow, numeral, year, title, lead, children, quote, action, reverse = false, tone = 'light', headingAs = 'h2' }: StoryBlockProps) {
  const body = typeof children === 'string' ? <p>{children}</p> : children;
  return (
    <article className={cx('bk-story', 'bk-story--' + tone, reverse && 'bk-story--reverse')}>
      <div className="bk-story__media">
        <ArchImage src={image} alt={imageAlt} shape="arch" tone={tone} parallax />
      </div>
      <div className="bk-story__text">
        {year && <p className="bk-story__year">{year}</p>}
        <SectionHeading eyebrow={eyebrow} numeral={numeral} title={title} lead={lead} tone={tone} align="left" ornament={year ? false : undefined} as={headingAs} />
        {body && <div className="bk-story__body">{body}</div>}
        {quote && <blockquote className="bk-story__quote">{quote}</blockquote>}
        {action && (
          <div className="bk-story__action">
            <TextLink tone={tone} href={action.href}>
              {action.label}
            </TextLink>
          </div>
        )}
      </div>
    </article>
  );
}
