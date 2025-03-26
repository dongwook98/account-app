import Link from 'next/link'
import Image from 'next/image'
import { css } from '@emotion/react'
import { Swiper, SwiperSlide } from 'swiper/react'

import withSuspense from '@/hooks/withSuspense'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import useEventBanners from './hooks/useEventBanners'
import Skeleton from '../shared/Skeleton'

function EventBanners() {
  const { data } = useEventBanners()
  console.log('🚀 ~ EventBanners ~ data:', data)

  return (
    <div>
      <Swiper spaceBetween={8}>
        {data.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link href={banner.link}>
                <Flex
                  style={{ backgroundColor: banner.backgroundColor }}
                  justify="space-between"
                  css={bannerStyles}
                >
                  <Flex direction="column">
                    <Text bold>{banner.title}</Text>
                    <Text typography="t6">{banner.subTitle}</Text>
                  </Flex>
                  <Image src={banner.iconUrl} width={40} height={40} alt="" />
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default withSuspense(EventBanners, {
  fallback: <Skeleton width="100%" height={100} style={{ borderRadius: 8 }} />,
})

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`
