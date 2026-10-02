import React from 'react';
import { cx } from '../../lib/helpers.js';
import { ArchImage } from '../../ui/frames/ArchImage.jsx';
import { Eyebrow } from '../../ui/type/Eyebrow.jsx';
import { TextLink } from '../../ui/actions/TextLink.jsx';

export function RoomCard({ image, imageAlt, name, eyebrow, description, action, className, style }) {
  return (
    <article className={cx('bk-room', className)} style={style}>
      <ArchImage src={image} alt={imageAlt} shape="arch" />
      <div className="bk-room__body">
        <h3 className="bk-room__name">{name}</h3>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {description && <p className="bk-room__desc">{description}</p>}
        {action && <TextLink href={action.href} onClick={action.onClick}>{action.label}</TextLink>}
      </div>
    </article>
  );
}
