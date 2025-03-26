import { useSuspenseQuery } from '@tanstack/react-query'
import { getCards } from '@remote/card'

function useCards() {
  return useSuspenseQuery({
    queryKey: ['home-cards'],
    queryFn: () => getCards(),
  })
}

export default useCards
