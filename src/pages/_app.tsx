import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import globalStyles from '@styles/globalStyles'
import Layout from '@shared/Layout'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const client = new QueryClient()

/**
 * 모든 컴포넌트들이 거치는 레이아웃 컴포넌트
 * @param param0
 * @returns
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Layout>
  )
}
