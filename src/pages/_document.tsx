import { Html, Head, Main, NextScript } from 'next/document'

/**
 * - 서버사이드에서만 렌더링, 기본 html 설정
 * @returns
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="root-portal"></div>
      </body>
    </Html>
  )
}
