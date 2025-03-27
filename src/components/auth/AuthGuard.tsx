import { useSession } from 'next-auth/react'

/**
 * 인증이 완료되었을때만 자식 컴포넌트 렌더링
 * @param param0
 * @returns
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession()

  if (status === 'loading') {
    return null
  }

  return <>{children}</>
}
