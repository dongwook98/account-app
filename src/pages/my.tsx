import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import withAuth from '@/hooks/withAuth'

import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import ListRow from '@shared/ListRow'
import Top from '@/components/shared/Top'
import useUser from '@/hooks/useUser'

function MyPage() {
  const navigate = useRouter()
  const user = useUser()
  console.log(user)

  return (
    <div>
      <Top
        title="마이페이지"
        subTitle="내 정보를 편리하게 확인하고 관리하세요."
      />
      <ListRow
        left={<div css={{ width: '100px' }}>이메일</div>}
        contents={<ListRow.Texts title={user?.email} />}
      />
      <ListRow
        left={<div css={{ width: '100px' }}>이름</div>}
        contents={<ListRow.Texts title={user?.name} />}
      />
      <ListRow
        left={<div css={{ width: '100px' }}>이미지</div>}
        contents={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user?.image}
            alt={user?.name}
            style={{ borderRadius: '100%' }}
            width={30}
            height={30}
          />
        }
      />

      <Flex justify="center">
        <Button size="large" onClick={() => signOut({ callbackUrl: '/' })}>
          로그아웃
        </Button>
      </Flex>

      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <ul>
        <ListRow
          contents={<ListRow.Texts title="약관" subTitle="약관목록 및 철회" />}
          withArrow={true}
          onClick={() => {
            navigate.push('/settings/terms')
          }}
        />
      </ul>
    </div>
  )
}

export default withAuth(MyPage)
