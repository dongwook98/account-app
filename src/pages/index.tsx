import dynamic from 'next/dynamic'

import Account from '@/components/home/Account'
import { BannerSkeleton } from '@components/home/EventBanners'
import { CreditScoreSkeleton } from '@components/home/CreditScore'
import { CardListSkeleton } from '@/components/home/CardList'
import Spacing from '@/components/shared/Spacing'
import { getSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { User } from '@/models/user'
import { getAccount } from '@/remote/account'

// dynamic = React.lazy + Suspense 합친거
const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  loading: () => <BannerSkeleton />,
  ssr: false,
})

const CreditScore = dynamic(() => import('@components/home/CreditScore'), {
  loading: () => <CreditScoreSkeleton />,
  ssr: false,
})

const CardList = dynamic(() => import('@components/home/CardList'), {
  loading: () => <CardListSkeleton />,
  ssr: false,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <Spacing size={8} backgroundColor="gray100" />
      <CardList />
    </>
  )
}

// 서버사이드에서 account 데이터 요청
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // ssr에서 인증 처리
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery({
      queryKey: ['account', (session.user as User)?.id],
      queryFn: () => getAccount((session.user as User)?.id),
    })

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}
