import dynamic from 'next/dynamic'

import Account from '@/components/home/Account'
import { BannerSkeleton } from '@components/home/EventBanners'

// dynamic = React.lazy + Suspense 합친거
const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  loading: () => <BannerSkeleton />,
  ssr: false,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
    </>
  )
}
