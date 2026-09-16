export default function manifest() {
  return {
    name: 'DevCodeX — Modern Software Agency & 3D Web Engineering Studio',
    short_name: 'DevCodeX',
    description: 'DevCodeX builds high-performance Next.js web applications, interactive 3D WebGL experiences, AI automation systems, and enterprise digital solutions.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo4.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo4.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
