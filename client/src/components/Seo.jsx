import { useEffect } from 'react';
import { site } from '../config/site.js';

// React 19 hoists <title>, <meta> and <link> rendered anywhere into <head>,
// so each page simply renders <Seo title="..." description="..." />.
export default function Seo({ title, description, path = '' }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Software Engineer`;
  const url = `${site.url}${path}`;

  // index.html carries default tags for crawlers that don't run JavaScript.
  // Once a page renders its own, remove the defaults so there are no duplicates.
  useEffect(() => {
    document.querySelectorAll('head [data-default]').forEach((el) => el.remove());
  }, []);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
    </>
  );
}
