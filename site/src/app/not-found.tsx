import type { Metadata } from 'next';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { PageSection, Stack } from '@/components/page/PageSection';
import { Reservation } from '@/components/page/Reservation';

export const metadata: Metadata = { title: 'Page Not Found', robots: { index: false } };

/** Exported as out/404.html; .htaccess points Apache's ErrorDocument at it. */
export default function NotFound() {
  return (
    <div className="pg-page">
      <PageSection>
        <Stack>
          <SectionHeading size="h1" as="h1" eyebrow="Not Found" title="This Room Is Closed" lead="The page you were looking for is not part of the house. The host will be glad to direct you." />
          <div>
            <Button variant="secondary" href="/">
              Return to the House
            </Button>
          </div>
        </Stack>
      </PageSection>
      <Reservation />
    </div>
  );
}
