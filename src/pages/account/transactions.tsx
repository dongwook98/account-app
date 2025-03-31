import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { format, parseISO } from 'date-fns'

import useTransactions from '@/components/account/hooks/useTransactions'
import withAuth from '@/hooks/withAuth'
import { TransactionFilterType } from '@/models/transaction'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import addDelimiter from '@/utils/addDelimiter'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'

const FILTERS: Array<{ label: string; value: TransactionFilterType }> = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '입금',
    value: 'deposit',
  },
  {
    label: '출금',
    value: 'withdraw',
  },
]

function Transactions() {
  const [currentFilter, setCurrentFilter] =
    useState<TransactionFilterType>('all')

  const { data, hasNextPage, isFetching, fetchNextPage } = useTransactions({
    filter: currentFilter,
  })

  const { ref, inView } = useInView()

  const transactions = data?.pages.map(({ items }) => items).flat()

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isFetching])

  return (
    <div>
      <Flex as="ul" justify="flex-end" style={{ padding: 24, gap: '12px' }}>
        {FILTERS.map((filter) => (
          <li
            css={{
              backgroundColor: `${colors.white}`,
              border: `1px solid ${colors.blue}`,
              color: `${colors.blue}`,
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: `${colors.blue980}`,
                color: `${colors.white}`,
              },
            }}
            key={filter.value}
            onClick={() => {
              setCurrentFilter(filter.value)
            }}
          >
            {filter.label}
          </li>
        ))}
      </Flex>

      <ul>
        {transactions?.map((transaction) => {
          const 입금인가 = transaction.type === 'deposit'

          return (
            <ListRow
              key={transaction.id}
              contents={
                <ListRow.Texts
                  title={transaction.displayText}
                  subTitle={format(
                    parseISO(transaction.date),
                    'yyyy-MM-dd HH:mm:ss',
                  )}
                />
              }
              right={
                <Flex direction="column" align="flex-end">
                  <Text color={입금인가 ? 'blue' : 'red'} bold={true}>
                    {입금인가 ? '+' : '-'} {addDelimiter(transaction.amount)}원
                  </Text>
                  <Text>{addDelimiter(transaction.balance)}원</Text>
                </Flex>
              }
            />
          )
        })}
      </ul>
      {isFetching ? <div>로딩 중..</div> : null}
      <div ref={ref} style={{ height: '20px' }}></div>
    </div>
  )
}

export default withAuth(Transactions)
