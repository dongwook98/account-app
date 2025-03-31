import { useSuspenseQuery } from '@tanstack/react-query'

import { getEventBanners } from '@/remote/banner'
import useAccount from '@/hooks/useAccount'

/**
 * 계좌 보유 여부에 따른 이벤트 배너 처리 훅
 * @returns
 */
export default function useEventBanners() {
  const { data: account } = useAccount()

  return useSuspenseQuery({
    queryKey: ['event-banners'],
    queryFn: () =>
      getEventBanners({
        hasAccount: account != null && account.status === 'DONE',
      }),
  })
}
