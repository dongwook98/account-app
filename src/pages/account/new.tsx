import { useState } from 'react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import withAuth from '@/hooks/withAuth'
import ProgressBar from '@shared/ProgressBar'
import FullPageLoader from '@shared/FullPageLoader'
import Terms from '@/components/account/Terms'
import useUser from '@/hooks/useUser'
import { createAccount, getAccount, getTerms, setTerms } from '@/remote/account'
import Form from '@/components/account/Form'
import { User } from '@models/user'
import { Account } from '@models/account'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

// STEP 0 = 약관동의
// STEP 1 = 계좌 개설 폼 페이지
// STEP 2 = 완료페이지
const LAST_STEP = 2

function AccountNewPage({ initialStep }: { initialStep: number }) {
  const [step, setStep] = useState(initialStep)
  const user = useUser()
  const navigate = useRouter()

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />

      {step === 0 ? (
        <Terms
          onNext={async (termIds) => {
            await setTerms({ userId: user?.id as string, termIds: termIds })

            setStep(step + 1)
          }}
        />
      ) : null}

      {step === 1 ? (
        <Form
          onNext={async (formValues) => {
            const newAccount = {
              ...formValues,
              accountNumber: Date.now(),
              balance: 0,
              status: 'DONE',
              userId: user?.id as string,
            } as Account

            await createAccount(newAccount)

            setStep(step + 1)
          }}
        />
      ) : null}

      {step === 2 ? (
        <>
          <FullPageLoader message="계좌개설 신청이 완료되었어요" />
          <FixedBottomButton
            label="확인"
            onClick={() => {
              navigate.push('/')
            }}
          />
        </>
      ) : null}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  const agreedTerms = await getTerms((session?.user as User).id)

  if (agreedTerms == null) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  const account = await getAccount((session?.user as User).id)

  if (account == null) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 2,
    },
  }
}

export default withAuth(AccountNewPage)
