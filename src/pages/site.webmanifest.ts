import type { APIRoute } from 'astro';
import { company } from '../content/site';
export const GET: APIRoute = () => {
  const b = import.meta.env.BASE_URL.replace(/\/$/, '');
  return new Response(JSON.stringify({
    name: company.name, short_name: 'Bell', start_url: `${b}/`, display: 'browser',
    background_color: '#FDF6EC', theme_color: '#16233B',
    icons: [{ src: `${b}/icon-192.png`, sizes: '192x192', type: 'image/png' }, { src: `${b}/icon-512.png`, sizes: '512x512', type: 'image/png' }],
  }, null, 2), { headers: { 'Content-Type': 'application/manifest+json' } });
};
