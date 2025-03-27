import { GetServerSidePropsContext } from 'next'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import Image from 'next/image'

import { Card } from '@/models/card'
import { getCard } from '@/remote/card'
import Top from '@/components/shared/Top'
import ListRow from '@/components/shared/ListRow'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import dynamic from 'next/dynamic'

// FixedBottomButton 컴포넌트는 window.document로 접근해서 ssr 불가능
const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

interface CardDetailPageProps {
  initialCardData: Card
}

export default function CardDetailPage({
  initialCardData,
}: CardDetailPageProps) {
  const { id } = useParams()

  // initialData 사용해서 ssr로 불러온 데이터 사용하기
  const { data } = useQuery({
    queryKey: ['card', id],
    queryFn: () => getCard(id as string),
    initialData: initialCardData,
  })

  const { name, corpName, promotion, tags, benefit } = data
  const subTitle =
    promotion != null ? removeHtmlTags(promotion.title) : tags.join(',')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subTitle={subTitle} />

      <ul>
        {benefit.map((text, index) => (
          <motion.li
            key={text}
            initial={{ opacity: 0, translateX: -90 }}
            transition={{
              duration: 0.7,
              ease: 'easeInOut',
              delay: index * 0.3,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
          >
            <ListRow
              as="div"
              left={
                <Image
                  src="https://cdn4.iconfinder.com/data/icons/travello-basic-ui-1/64/Correct-512.png"
                  width={40}
                  height={40}
                  alt=""
                />
              }
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subTitle={text} />
              }
            />
          </motion.li>
        ))}
      </ul>

      {promotion != null ? (
        <Flex
          direction="column"
          style={{ marginTop: '80px', padding: '0 24px 80px 24px' }}
        >
          <Text bold={true}>유의사항</Text>
          <Text typography="t7">{removeHtmlTags(promotion.terms)}</Text>
        </Flex>
      ) : null}

      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={() => {
          // TODO
        }}
      />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context
  const cardId = query.id as string

  const card = await getCard(cardId)

  return {
    props: {
      initialCardData: card,
    },
  }
}

function removeHtmlTags(text: string) {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
}
