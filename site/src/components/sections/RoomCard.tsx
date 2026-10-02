import type { Action } from '@/lib/content';
import { ArchImage } from '@/components/ui/ArchImage';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { TextLink } from '@/components/ui/TextLink';

export type RoomCardProps = {
  name: string;
  eyebrow?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  action?: Action;
};

/** §9.10 — arched 3:4 image, Cinzel name, eyebrow line (SEATS 40 · BEST AT DUSK), one sentence, text link. */
export function RoomCard({ name, eyebrow, description, image, imageAlt, action }: RoomCardProps) {
  return (
    <article className="bk-room">
      <ArchImage src={image} alt={imageAlt} shape="arch" />
      <div className="bk-room__body">
        <h3 className="bk-room__name">{name}</h3>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {description && <p className="bk-room__desc">{description}</p>}
        {action && <TextLink href={action.href}>{action.label}</TextLink>}
      </div>
    </article>
  );
}
