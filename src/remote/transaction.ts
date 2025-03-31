import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore'
import { store } from './firebase'
import { COLLECTIONS } from '@/constants/collection'
import {
  Transaction,
  TransactionFilterType,
  TransactionType,
} from '@/models/transaction'

export function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}

/**
 * 입출금내역 조회 함수
 * 페이지네이션 지원
 * 필터 지원
 * @param param0
 * @returns
 */
export async function getTransactions({
  pageParam,
  userId,
  filter = 'all',
}: {
  userId: string
  pageParam?: QueryDocumentSnapshot<TransactionType | DocumentData>
  filter?: TransactionFilterType
}) {
  const transactionQuery = generateQuery({ pageParam, userId, filter })

  const transactionSnapshot = await getDocs(transactionQuery)
  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]

  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return { items, lastVisible }
}

function generateQuery({
  filter,
  pageParam,
  userId,
}: {
  userId: string
  pageParam?: QueryDocumentSnapshot<TransactionType | DocumentData>
  filter?: TransactionFilterType
}) {
  const baseQuery = query(
    collection(store, COLLECTIONS.TRANSACTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(15),
  )

  if (filter !== 'all') {
    if (pageParam == null) {
      return query(baseQuery, where('type', '==', filter))
    }
    return query(baseQuery, startAfter(pageParam), where('type', '==', filter))
  } else {
    if (pageParam == null) {
      return baseQuery
    }

    return query(baseQuery, startAfter(pageParam))
  }
}
