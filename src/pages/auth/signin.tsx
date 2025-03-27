import {
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
  signIn,
} from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers/index'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'

function SigninPage({
  providers,
}: {
  providers: Record<LiteralUnion<BuiltInProviderType>, ClientSafeProvider>
}) {
  return (
    <div>
      <Spacing size={100} />
      <Flex direction="column" align="center">
        <Text bold={true}>
          Account app에 오신것을 환영합니다. 회원가입을 진행해보세요.
        </Text>
        <Spacing size={80} />
        <ul>
          {Object.values(providers).map((provider) => (
            <li key={provider.id}>
              <Button onClick={() => signIn(provider.id, { callbackUrl: '/' })}>
                {provider.name} LOGIN
              </Button>
            </li>
          ))}
        </ul>
      </Flex>
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  console.log('🚀 ~ getServerSideProps ~ providers:', providers)

  return {
    props: {
      providers,
    },
  }
}

export default SigninPage
