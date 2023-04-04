import ErrorText from '@/components/ErrorText'
import { OperationType } from '@/types'
import { Button, Group, Modal, NumberInput, Stack, TextInput } from '@mantine/core'
import { useState } from 'react'
import { useCreateTransaction } from '../api/transaction'

type Props = {
  walletId: string
  type: OperationType
}

const NewTransactionButton = ({ walletId, type }: Props) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [isOpened, setIsOpened] = useState(false)
  const [error, setError] = useState('')
  const { mutate, isLoading, error: apiError } = useCreateTransaction()

  function handleModal() {
    setIsOpened((prev) => !prev)
    setTitle('')
    setAmount(0)
  }

  async function handleAdd() {
    if (amount <= 0) {
      setError('Сумма не должна быть 0')
      return
    }
    setError('')

    mutate({ amount, operation_type: type, title, walletId })
  }

  return (
    <>
      <Button onClick={handleModal}>Добавить операцию</Button>

      {isOpened && (
        <Modal centered opened={isOpened} onClose={handleModal} title='Добавить операцию' zIndex={1000}>
          <Stack spacing='md'>
            <TextInput withAsterisk label='Название' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            <NumberInput
              withAsterisk
              icon={'₽'}
              label='Сумма'
              hideControls
              value={amount}
              onChange={(value) => setAmount(+value)}
            />
            <Group position='right'>
              <Button onClick={handleModal} variant='subtle'>
                Отмена
              </Button>
              <Button onClick={handleAdd} loading={isLoading}>
                Добавить
              </Button>
              {error && <ErrorText>{error}</ErrorText>}
              {apiError && <ErrorText>{apiError?.response?.data.message}</ErrorText>}
            </Group>
          </Stack>
        </Modal>
      )}
    </>
  )
}

export default NewTransactionButton
