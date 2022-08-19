function getCanonicalUrl(siteBaseUrl: string, path: string): string {
  return (siteBaseUrl + (path === '/' ? '' : path)).split('?')[0];
}

export default getCanonicalUrl;
