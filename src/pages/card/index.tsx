import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import Badge from '@/components/shared/Badge'
import Input from '@/components/shared/Input'
import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'
import { getCards } from '@/remote/card'
import { Card } from '@/models/card'

export default function CardListPage() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({
      pageParam,
    }: {
      pageParam?: QueryDocumentSnapshot<Card | DocumentData>
    }) => {
      return getCards(pageParam)
    },
    initialPageParam: undefined,
    getNextPageParam: (snapshot) => snapshot.lastVisible,
  })

  const router = useRouter()

  const { ref, inView } = useInView()

  const cards = data?.pages.map(({ items }) => items).flat()

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetching])

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input
          onFocus={() => {
            router.push('/card/search')
          }}
        />
      </div>
      <ul>
        {cards?.map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
            }
            right={card.payback != null ? <Badge label={card.payback} /> : null}
            withArrow={true}
            onClick={() => {
              router.push(`/card/${card.id}`)
            }}
          />
        ))}
      </ul>
      {isFetching ? <div>로딩 중..</div> : null}
      <div ref={ref} style={{ height: '20px' }}></div>
    </div>
  )
}

export async function getServerSideProps() {
  console.log('getServerSideProps 실행')
  const queryClient = new QueryClient()

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cards'],
    queryFn: () => getCards(),
    initialPageParam: null,
  })

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}
