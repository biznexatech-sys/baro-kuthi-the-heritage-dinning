import type { CSSProperties, ReactNode } from 'react';
import { cx } from '@/lib/utils';
import type { Action } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArchImage, type ImageShape } from '@/components/ui/ArchImage';
import { TextLink } from '@/components/ui/TextLink';

export type StoryBlockProps = {
  image?: string;
  imageAlt?: string;
  /** 'arch' (default), 'portrait' (3:4 rectangle) or 'landscape' (4:3 rectangle). */
  imageShape?: Extract<ImageShape, 'arch' | 'portrait' | 'landscape'>;
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
  /** Decorative watermark hung from the top of the section above the text column (e.g. the jhar-bati chandelier). */
  watermark?: string;
};

/** §9.7 "The Courtyard" — arched image (5 cols) + text (5 cols) with a 2-column offset, alternating sides. */
export function StoryBlock({ image, imageAlt, imageShape = 'arch', eyebrow, numeral, year, title, lead, children, quote, action, reverse = false, tone = 'light', headingAs = 'h2', watermark }: StoryBlockProps) {
  const body = typeof children === 'string' ? <p>{children}</p> : children;
  return (
    <article className={cx('bk-story', 'bk-story--' + tone, reverse && 'bk-story--reverse', watermark && 'bk-story--hung')} style={{ '--media-hpw': imageShape === 'landscape' ? '0.75' : '1.3333' } as CSSProperties}>
      {watermark && (
        <span className="bk-story__watermark" aria-hidden="true">
          <img src={watermark} alt="" width={520} height={811} loading="lazy" decoding="async" />
        </span>
      )}
      <div className="bk-story__media">
        <ArchImage src={image} alt={imageAlt} shape={imageShape} tone={tone} parallax />
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
