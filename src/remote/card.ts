import { Card } from '@/models/card'
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'

export async function getCards(
  pageParam?: QueryDocumentSnapshot<Card | DocumentData>,
) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(15))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(15),
        )
  const cardSnapshot = await getDocs(cardQuery)
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

export async function getSearCards(keyword: string) {
  const searchQuery = query(
    collection(store, COLLECTIONS.CARD),
    where('name', '>=', keyword),
    where('name', '<=', keyword + '\uf8ff'),
  )

  const cardSnapshot = await getDocs(searchQuery)

  return cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))
}

export async function getCard(id: string) {
  const snapshot = await getDoc(doc(collection(store, COLLECTIONS.CARD), id))

  return {
    id: snapshot.id,
    ...(snapshot.data() as Card),
  }
}
