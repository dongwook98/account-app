import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import globalStyles from '@styles/globalStyles'
import Layout from '@shared/Layout'

const queryClient = new QueryClient()

/**
 * 모든 컴포넌트들이 거치는 레이아웃 컴포넌트
 * @param param0
 * @returns
 */
export default function App({ Component, pageProps }: AppProps) {
  console.log('_app.tsx 실행')

  return (
    <Layout>
      <Global styles={globalStyles} />
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Layout>
  )
}
