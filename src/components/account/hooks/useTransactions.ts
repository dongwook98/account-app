import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { getTransactions } from '@/remote/transaction'
import useUser from '@/hooks/useUser'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { TransactionFilterType, TransactionType } from '@/models/transaction'

function useTransactions({ filter }: { filter?: TransactionFilterType } = {}) {
  const user = useUser()

  return useSuspenseInfiniteQuery({
    queryKey: ['transactions', user?.id, filter],
    queryFn: ({
      pageParam,
    }: {
      pageParam?: QueryDocumentSnapshot<TransactionType | DocumentData>
    }) => getTransactions({ pageParam, userId: user?.id as string, filter }),
    initialPageParam: undefined,
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })
}

export default useTransactions
