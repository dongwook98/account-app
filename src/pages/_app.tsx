import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import {
  QueryClientProvider,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'

import globalStyles from '@styles/globalStyles'
import Layout from '@shared/Layout'
import AuthGuard from '@/components/auth/AuthGuard'
import Navbar from '@/components/shared/Navbar'
import { AlertContextProvider } from '@/contexts/AlertContext'

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
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <AuthGuard>
              <AlertContextProvider>
                <Navbar />
                <Component {...pageProps} />
              </AlertContextProvider>
            </AuthGuard>
          </HydrationBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
