import { getExpense } from '@/services'
import { expenseListsAtom } from '@/store'

import useUser from './useUser'

import { useAtom } from 'jotai'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

const useExpense = () => {
  const { user } = useUser()
  const [expenseLists, setExpenseLists] = useAtom(expenseListsAtom)

  const refreshExpense = async () => {
    if (user) {
      const response = await getExpense(user?.id as string)
      if (response) {
        setExpenseLists(response)
      }
      return
    }
    toast.error('Could not refresh expense')
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (expenseLists.length === 0 && user?.id) {
        const response = await getExpense(user.id)
        if (response) {
          setExpenseLists(response)
          return
        }
        toast.error('Cannot get your expense')
      }
    })()
  }, [user])

  return {
    expenseLists: expenseLists.sort((a, b) =>
      new Date(a.created_at) < new Date(b.created_at)
        ? 1
        : new Date(a.created_at) > new Date(b.created_at)
        ? -1
        : 0
    ),
    refreshExpense
  }
}

export default useExpense
