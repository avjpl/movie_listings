import Head from 'next/head';

import Layout from './components/layout';
import { SearchForm } from './components/forms';

export default function Index() {
  return (
    <Layout>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Demo</h1>

        <SearchForm />
      </div>
    </Layout>
  );
}
