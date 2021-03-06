import { createExpenseHistory, getExpenseHistory } from '@/services'
import * as atoms from '@/store'

import { CreateHistoryPayload } from 'expense-app'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

const useExpenseHistory = () => {
  const [expenseHistory, setExpenseHistory] = useAtom(atoms.historyListsAtom)
  const [expenseDetail] = useAtom(atoms.expenseAtom)
  const [isOpen, setIsOpen] = useAtom(atoms.createdHistoryModal)

  const openModal = useCallback(() => setIsOpen(true), [])
  const closeModal = useCallback(() => setIsOpen(false), [])

  const refreshExpenseHistory = useCallback(async () => {
    const response = await getExpenseHistory(expenseDetail?.history_id as string)
    if (!response) return null
    setExpenseHistory(response)
    return response
  }, [expenseDetail?.history_id])

  const addHistory = useCallback(
    async (payload: CreateHistoryPayload) =>
      await createExpenseHistory(payload, expenseDetail?.history_id as string),
    [expenseDetail?.history_id]
  )

  return {
    expenseHistory,
    isOpen,
    openModal,
    closeModal,
    addHistory,
    refreshExpenseHistory
  }
}

export default useExpenseHistory
