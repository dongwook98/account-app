import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { getSearCards } from '@/remote/card'
import Badge from '@/components/shared/Badge'
import Input from '@/components/shared/Input'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import useDebounce from '@/hooks/useDebounce'

export default function SearchPage() {
  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword)

  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useRouter()

  const { data } = useQuery({
    queryKey: ['cards', debouncedKeyword],
    queryFn: () => getSearCards(debouncedKeyword),
    enabled: debouncedKeyword !== '',
  })

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  return (
    <div>
      <Top title="추천카드" subTitle="회원님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input ref={inputRef} value={keyword} onChange={handleKeyword} />
      </div>

      {keyword !== '' && data?.length === 0 ? (
        <div style={{ padding: 24 }}>
          <Text>찾으시는 카드가 없습니다</Text>
        </div>
      ) : (
        <ul>
          {data?.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow={true}
              onClick={() => {
                navigate.push(`/card/${card.id}`)
              }}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
