import React, { useState } from 'react'
import { useUpdateTransaction } from '../api/transaction'
import { ActionIcon, Button, Group, Modal, TextInput } from '@mantine/core'
import { IoCreateOutline } from 'react-icons/io5'
import { useParams } from 'react-router-dom'

type Props = {
  id: string
  title: string
}

const UpdateTransactionButton = ({ id, title }: Props) => {
  const [newTitle, setNewTitle] = useState(title)
  const [isOpened, setIsOpened] = useState(false)
  const params = useParams()
  const walletId = params.id as string

  const { mutateAsync, isLoading, error: apiError } = useUpdateTransaction()

  function handleModal() {
    setIsOpened((prev) => !prev)
  }

  async function handleUpdate() {
    await mutateAsync({ id, title: newTitle, walletId })

    if (!apiError) {
      setIsOpened(false)
    }
  }

  return (
    <>
      <ActionIcon size='xs' variant='transparent' onClick={handleModal}>
        <IoCreateOutline />
      </ActionIcon>

      {isOpened && (
        <Modal centered opened={isOpened} onClose={handleModal} title='Изменить операцию' zIndex={10000}>
          <TextInput
            withAsterisk
            label='Название'
            value={newTitle}
            onChange={(e) => setNewTitle(e.currentTarget.value)}
          />
          <Group position='right' mt='md'>
            <Button variant='subtle' onClick={handleModal}>
              Отмена
            </Button>
            <Button color='blue' onClick={handleUpdate} loading={isLoading}>
              Изменить
            </Button>
          </Group>
        </Modal>
      )}
    </>
  )
}

export default UpdateTransactionButton
