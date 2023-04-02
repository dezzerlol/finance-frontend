import ErrorText from '@/features/auth/components/ErrorText'
import { axios } from '@/lib/axios'
import { OperationType } from '@/types'
import { Button, Group, Modal, NumberInput, Stack, TextInput } from '@mantine/core'
import React, { useState } from 'react'

type Props = {
  walletId: string | undefined
  type: OperationType
}

const NewTransactionButton = ({ walletId, type }: Props) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState<any>(0)
  const [isOpened, setIsOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function handleModal() {
    setIsOpened((prev) => !prev)
  }

  async function handleAdd() {
    if (amount <= 0) {
      setError('Сумма не должна быть 0')
    }

    setError('')
    setIsLoading(true)

    try {
      await axios.post('/wallet/createTransaction', { walletId, operation_type: type, amount, title })
    } catch (error: any) {
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button onClick={handleModal}>Добавить новый</Button>

      <Modal opened={isOpened} onClose={handleModal} title='Добавить' zIndex={1000}>
        <Stack spacing='md'>
          <TextInput withAsterisk label='Название' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
          <NumberInput
            withAsterisk
            icon={'₽'}
            label='Сумма'
            hideControls
            value={amount || 0}
            onChange={(value) => setAmount(value)}
          />
          <Group position='right'>
            <Button onClick={handleModal} variant='subtle'>
              Отмена
            </Button>
            <Button onClick={handleAdd} loading={isLoading}>
              Добавить новый
            </Button>
            {error && <ErrorText>{error}</ErrorText>}
          </Group>
        </Stack>
      </Modal>
    </>
  )
}

export default NewTransactionButton
