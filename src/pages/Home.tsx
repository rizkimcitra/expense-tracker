import { AuthLayer, Loading } from '@/components'

import { useUser } from '@/hooks'

import { Suspense, lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ExpenseLists = lazy(() => import('@/components').then((m) => ({ default: m.ExpenseLists })))

const HomePage: React.FunctionComponent = () => {
  const { user } = useUser()

  if (!user) {
    return <Navigate to='/signin' replace />
  }

  return (
    <AuthLayer>
      <section className='pt-10'>
        <h1>Welcome back, {user.username}!</h1>
        <p className='mt-4 max-w-prose'>
          ExpenseApp can help you notes your income, outcome and manage your expense more easy.
        </p>
      </section>

      <section className='py-10'>
        <h2 className='mb-2.5'>💰My Expenses</h2>
        <p className='mb-4'>List of your expenses, to view all your expense, go to expense page</p>

        <Suspense fallback={<Loading />}>
          <ExpenseLists />
        </Suspense>
      </section>
    </AuthLayer>
  )
}

export default HomePage
