import CreditScoreChart from '@shared/CreditScoreChart'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Link from 'next/link'
import Button from '../shared/Button'
import Text from '../shared/Text'
import Skeleton from '../shared/Skeleton'

export default function CreditScore() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text bold={true}>
            나의 신용도를 증명하고 <br />
            점수를 올리세요
          </Text>
          <Spacing size={8} />
          <Link href="/credit">
            <Button>내 신용점수 보러가기</Button>
          </Link>
        </Flex>
        <CreditScoreChart width={80} height={80} score={100} />
      </Flex>
    </div>
  )
}

export function CreditScoreSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Skeleton width={155} height={50} />
          <Spacing size={8} />
          <Skeleton width={155} height={31} />
        </Flex>
      </Flex>
    </div>
  )
}
