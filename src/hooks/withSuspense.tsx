import { Suspense, ComponentType, ReactNode } from 'react'

export default function withSuspense<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
  options: { fallback: ReactNode },
) {
  return function SuspendedComponent(props: Props) {
    return (
      <Suspense fallback={options.fallback}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <WrappedComponent {...(props as any)} />
      </Suspense>
    )
  }
}
