import { collection, getDocs, query, where } from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'
import { EventBanner } from '@/models/banner'

/**
 * - 계좌 유무(hasAccount)에 따라 다른 배너 쿼리하는 함수
 * @param param0
 * @returns
 */
export async function getEventBanners({ hasAccount }: { hasAccount: boolean }) {
  const eventBannerQuery = query(
    collection(store, COLLECTIONS.EVENT_BANNER),
    where('hasAccount', '==', hasAccount),
  )

  const snapshot = await getDocs(eventBannerQuery)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as EventBanner),
  }))
}
