// Base-aware internal URLs. Use for every internal href and asset path.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path = '/') => `${base}${path.startsWith('/') ? path : `/${path}`}`;
export const isProduction = process.env.SITE_MODE === 'production';
