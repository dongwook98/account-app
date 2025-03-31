import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import { CHECK_STATUS } from '@/constants/credit'

interface useCreditCheckProps {
  onSuccess: (creditScore: number) => void
  onError: () => void
  enabled: boolean
}

export default function useCreditCheck({
  onSuccess,
  onError,
  enabled,
}: useCreditCheckProps) {
  const { data, isError, isSuccess } = useQuery({
    queryKey: ['useCreditCheck'],
    queryFn: () => getCheckStatus(),
    enabled,
    refetchInterval: 2000,
    staleTime: 0,
  })

  // 쿼리 성공시 실행
  useEffect(() => {
    if (isSuccess && data) {
      if (data === CHECK_STATUS.COMPLETE) {
        onSuccess(getCreditScore(200, 1000))
      }
    }
  }, [isSuccess, data])

  // 쿼리 실패시 실행
  useEffect(() => {
    if (isError) {
      onError()
      return
    }
  }, [data, isError])

  return { data }
}

function getCheckStatus() {
  const values = [
    CHECK_STATUS.READY,
    CHECK_STATUS.PROGRESS,
    CHECK_STATUS.COMPLETE,
    CHECK_STATUS.REJECT,
  ]

  const status = values[Math.floor(Math.floor(Math.random() * values.length))]

  if (status === CHECK_STATUS.REJECT) {
    throw new Error('신용점수 조회에 실패했습니다.')
  }

  return status
}

// ex. 200 ~ 1000점
function getCreditScore(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
