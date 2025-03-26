import dynamic from 'next/dynamic'

import Account from '@/components/home/Account'
import { BannerSkeleton } from '@components/home/EventBanners'
import { CreditScoreSkeleton } from '@components/home/CreditScore'
import { CardListSkeleton } from '@/components/home/CardList'
import Spacing from '@/components/shared/Spacing'

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
