import { axios } from '@/lib/axios'
import { ActionIcon, Button, Group, Input, Modal, Text, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { IoCreateOutline } from 'react-icons/io5'

const UpdateWalletButton = ({ id, title }: { id: string; title: string }) => {
  const [newTitle, setNewTitle] = useState(title)
  const [isOpened, setIsOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleModal() {
    setIsOpened((prev) => !prev)
  }

  async function handleUpdate(e: React.MouseEvent) {
    setIsLoading(true)
    try {
      await axios.post('/wallet/updateWallet', { walletId: id, title: newTitle })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setIsOpened(false)
    }
  }

  return (
    <>
      <ActionIcon variant='transparent' onClick={handleModal}>
        <IoCreateOutline color='gray' size='20px' />
      </ActionIcon>

      {isOpened && (
        <Modal opened={isOpened} onClose={handleModal} title='Изменить кошелек' zIndex={10000}>
          <TextInput label='Название' value={newTitle} onChange={(e) => setNewTitle(e.currentTarget.value)} />
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
