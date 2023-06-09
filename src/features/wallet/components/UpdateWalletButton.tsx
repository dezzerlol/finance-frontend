import { ActionIcon, Button, Group, Modal, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { IoCreateOutline } from 'react-icons/io5'
import { useUpdateWallet } from '../api/wallet'

type Props = {
  id: string
  title: string
}

const UpdateWalletButton = ({ id, title }: Props) => {
  const [newTitle, setNewTitle] = useState(title)
  const [isOpened, setIsOpened] = useState(false)

  const { mutateAsync, isLoading, error: apiError } = useUpdateWallet()

  function handleModal() {
    setIsOpened((prev) => !prev)
  }

  async function handleUpdate() {
    await mutateAsync({ id, title: newTitle })

    if (!apiError) {
      setIsOpened(false)
    }
  }

  return (
    <>
      <ActionIcon variant='transparent' onClick={handleModal}>
        <IoCreateOutline color='gray' size='20px' />
      </ActionIcon>

      {isOpened && (
        <Modal centered opened={isOpened} onClose={handleModal} title='Изменить кошелек' zIndex={10000}>
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

export default UpdateWalletButton
