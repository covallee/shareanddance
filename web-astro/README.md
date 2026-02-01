# Share the Music and Dance - Web (Astro)

This is the Astro-based frontend for the Share the Music and Dance project.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment file and add your Sanity credentials:

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your Sanity project ID and dataset:
   ```
   PUBLIC_SANITY_PROJECT_ID=your_project_id
   PUBLIC_SANITY_DATASET=production
   ```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Card.astro          # Individual track card
│   ├── Cards.astro         # Track cards grid
│   ├── Header.astro        # Site header with social links
│   ├── PortableText.astro  # Wrapper for Portable Text
│   └── PortableTextRenderer.tsx  # React component for Portable Text
├── layouts/
│   └── Layout.astro        # Main layout with head, meta, global styles
├── lib/
│   └── sanity.ts           # Sanity client and queries
├── pages/
│   ├── 404.astro           # 404 error page
│   └── index.astro         # Home page
public/
└── favicon.png             # Site favicon
```

## Migration from Gatsby

This project was migrated from Gatsby 3 to Astro 5. Key changes:

- **Data fetching**: Replaced `gatsby-source-sanity` + GraphQL with `@sanity/client` + GROQ
- **Styling**: Replaced `styled-components` with scoped Astro styles
- **SEO**: Replaced `react-helmet` with Astro's native `<head>` support
- **Images**: Replaced `gatsby-plugin-image` with `@sanity/image-url`
- **Portable Text**: Replaced `@sanity/block-content-to-react` with `@portabletext/react` (React island)
