import Skeleton from '@/components/shared/Skeleton'
import styled from '@emotion/styled'

import dynamic from 'next/dynamic'

// dynamic = React.lazy + Suspense 합친거
const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  loading: () => (
    <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />
  ),
  ssr: false,
})

export default function Home() {
  return (
    <Container>
      <EventBanners />
    </Container>
  )
}

const Container = styled.div``
