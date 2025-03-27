import { GetServerSidePropsContext } from 'next'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { isAfter, parseISO } from 'date-fns'

import { useAlertContext } from '@/contexts/AlertContext'
import { getEvent } from '@/remote/event'
import Preview from '@/components/event/Preview'
import { Event } from '@/models/event'

interface EventPageProps {
  initialEventData: Event
  id: string
}

export default function EventPage({ initialEventData, id }: EventPageProps) {
  const { open } = useAlertContext()
  const { data, isSuccess } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
    initialData: initialEventData,
  })

  useEffect(() => {
    if (isSuccess) {
      const 이벤트가종료되었는가 = isAfter(new Date(), parseISO(data.endDate))

      if (이벤트가종료되었는가) {
        open({
          title: `${data.title} 이벤트가 종료되었어요`,
          description: '다음에 더 좋은 이벤트로 찾아오겠습니다',
          onButtonClick: () => {
            window.history.back()
          },
        })
      }
    }
  }, [data.endDate, data.title, isSuccess, open])

  return <Preview data={data} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query

  const eventData = await getEvent(id as string)

  return {
    props: { id, initialEventData: eventData },
  }
}
