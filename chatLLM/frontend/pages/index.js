// pages/index.js

import Head from 'next/head';
import ChatGPT from '../components/ChatGPT';

export default function Home() {
  return (
    <div>
      <Head>
        <title>ChatGPT</title>
        <meta name="description" content="ChatGPT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ChatGPT />
      </main>
    </div>
  );
}
