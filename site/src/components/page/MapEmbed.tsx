'use client';
import { useState } from 'react';
import { FrameDouble } from '@/components/ui/FrameDouble';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';

/** §10 Visit — click-to-load map: no Google request (or cookies) until the guest asks for it. */
export function MapEmbed({ src, address }: { src: string; address: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <FrameDouble fill="parchment-dark" padding={8} className="pg-map">
      {loaded ? (
        <iframe title="Map to Baro Kuthi" src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="pg-map__idle">
          <Eyebrow>Map · click to load</Eyebrow>
          <p className="pg-map__addr">{address}</p>
          <Button variant="secondary" onClick={() => setLoaded(true)}>
            Load the Map
          </Button>
        </div>
      )}
    </FrameDouble>
  );
}
