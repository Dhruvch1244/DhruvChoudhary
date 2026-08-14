import { useEffect, useRef } from 'react';
import { profile } from '../data/content';

declare global {
  interface Window {
    twttr?: {
      widgets: { load: (el?: HTMLElement) => void };
    };
  }
}

const SCRIPT_ID = 'twitter-widgets-js';

export default function TwitterFeed() {
  const ref = useRef<HTMLDivElement>(null);

  // Theme is read once at mount -- the widget doesn't support live
  // re-theming without a full reload, so a later toggle won't flip it.
  const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function render() {
      if (window.twttr && el) window.twttr.widgets.load(el);
    }

    if (document.getElementById(SCRIPT_ID)) {
      render();
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = render;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="twitter-feed" ref={ref}>
      <a
        className="twitter-timeline"
        data-theme={theme}
        data-height="500"
        data-chrome="noheader nofooter noborders transparent"
        href={`https://twitter.com/${profile.twitterHandle.replace('@', '')}?ref_src=twsrc%5Etfw`}
      >
        Tweets by {profile.twitterHandle}
      </a>
    </div>
  );
}
