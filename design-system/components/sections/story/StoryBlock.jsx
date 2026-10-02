import React from 'react';
import { cx, useCompact } from '../../lib/helpers.js';
import { SectionHeading } from '../../ui/type/SectionHeading.jsx';
import { ArchImage } from '../../ui/frames/ArchImage.jsx';
import { TextLink } from '../../ui/actions/TextLink.jsx';

export function StoryBlock({ image, imageAlt, eyebrow, numeral, year, title, lead, children, quote, action, reverse = false, tone = 'light', layout = 'auto', className, style }) {
  const [ref, compact] = useCompact(layout);
  const t = tone === 'dark' ? 'dark' : 'light';
  const body = typeof children === 'string' ? <p>{children}</p> : children;
  return (
    <article ref={ref} className={cx('bk-story', 'bk-story--' + t, reverse && 'bk-story--reverse', compact && 'bk-compact', className)} style={style}>
      <div className="bk-story__media">
        <ArchImage src={image} alt={imageAlt} shape="arch" tone={t} parallax />
      </div>
      <div className="bk-story__text">
        {year && <p className="bk-story__year">{year}</p>}
        <SectionHeading eyebrow={eyebrow} numeral={numeral} title={title} lead={lead} tone={t} align="left" ornament={year ? false : undefined} />
        {body && <div className="bk-story__body">{body}</div>}
        {quote && <blockquote className="bk-story__quote">{quote}</blockquote>}
        {action && (
          <div className="bk-story__action"><TextLink tone={t} href={action.href} onClick={action.onClick}>{action.label}</TextLink></div>
        )}
      </div>
    </article>
  );
}
