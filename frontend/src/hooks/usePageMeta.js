import { useEffect } from 'react';

// Updates the browser tab title and meta description for the current
// page. React apps render one index.html, so without this every page
// would show the same generic title/description to search engines.
export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Homefield Properties` : 'Homefield Properties';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    if (description) {
      meta.setAttribute('content', description);
    }
  }, [title, description]);
}