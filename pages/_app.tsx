import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../_layouts/default';
import { MdxComponentsProvider } from '../context/mdxContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MdxComponentsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MdxComponentsProvider>
  );
}

export default MyApp