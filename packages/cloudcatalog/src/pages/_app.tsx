import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { AWSCatalogContextProvider, useCatalogConfig } from '@/hooks/CloudCatalog';
import '@/styles/globals.css';
import { OpenGraphConfig } from '@/types';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const {
    openGraph,
    title = 'CloudCatalog | Discover, Explore and Document your AWS Architecture',
    tagline = 'An open source tool powered by markdown to document your AWS Architecture.',
    homepageLink = 'https://cloudcatalog.dev/',
  } = useCatalogConfig();

  const { ogTitle = title, ogDescription = tagline, ogImage = 'https://cloudcatalog.dev/img/opengraph.png', ogUrl = homepageLink } = openGraph as OpenGraphConfig;

  //@ts-ignore
  return (
    <main className="h-full  min-h-screen">
      <AWSCatalogContextProvider>
        <Head>
          <title>{title}</title>

          <meta name="description" content={tagline} />
          <link rel="icon" href={`/favicon.ico`} />

          {ogUrl && ogUrl !== '' && <meta property="og:url" content={ogUrl} />}
          <meta property="og:type" content="website" />
          {ogTitle && <meta property="og:title" content={ogTitle} />}
          {ogDescription && <meta property="og:description" content={ogDescription} />}
          {ogImage && (
            <>
              <meta property="og:image" content={ogImage} />
              <meta property="og:image:alt" content={`${ogTitle} | ${ogDescription}`} />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="600" />
            </>
          )}
          <meta property="og:locale" content="en-GB" />
          <meta name="author" content="David Boyne" />
        </Head>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </AWSCatalogContextProvider>
    </main>
  );
}
