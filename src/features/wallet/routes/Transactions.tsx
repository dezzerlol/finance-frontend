import { OperationType } from '@/types'

export const Transactions = ({ type }: { type: OperationType }) => {
  return <div>TransactionsPage {type}</div>
}
