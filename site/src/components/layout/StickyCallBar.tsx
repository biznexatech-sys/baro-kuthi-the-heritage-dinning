import { Button } from '@/components/ui/Button';

export type StickyCallBarProps = {
  phoneHref: string;
  whatsappHref: string;
  callLabel?: string;
  whatsappLabel?: string;
};

/** §9.3 — fixed to the bottom below 768px: Call (primary) | WhatsApp (secondary). The spacer stops it covering the footer. */
export function StickyCallBar({ phoneHref, whatsappHref, callLabel = 'Call', whatsappLabel = 'WhatsApp' }: StickyCallBarProps) {
  return (
    <>
      <div className="bk-callbar-spacer bk-mobile-only" aria-hidden="true" />
      <div className="bk-callbar bk-callbar--fixed bk-mobile-only" role="region" aria-label="Reserve by telephone or WhatsApp">
        <Button variant="primary" href={phoneHref} fullWidth>
          {callLabel}
        </Button>
        <Button variant="secondary" href={whatsappHref} target="_blank" rel="noopener" fullWidth>
          {whatsappLabel}
        </Button>
      </div>
    </>
  );
}
