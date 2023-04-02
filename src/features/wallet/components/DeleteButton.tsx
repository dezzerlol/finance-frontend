import ErrorText from '@/features/auth/components/ErrorText'
import { ActionIcon, Button, Group, Modal, Text } from '@mantine/core'
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

type Props = {
  modalTitle: string
  modalDescription: string
  handleDelete: () => Promise<void>
}

const DeleteButton = ({ modalTitle, modalDescription, handleDelete }: Props) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  function handleModal() {
    setIsOpened((prev) => !prev)
  }

  async function onDelete() {
    setIsLoading(true)
    try {
      await handleDelete()
      setIsOpened(false)
    } catch (error: any) {
      setError(error.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ActionIcon variant='transparent' onClick={handleModal} size='lg'>
        <IoClose color='gray' size='20px' />
      </ActionIcon>

      {isOpened && (
        <Modal opened={isOpened} onClose={handleModal} title={modalTitle} zIndex={10000}>
          <Text>{modalDescription}</Text>
          <Group mt='md' position='right'>
            {error && <ErrorText>{error}</ErrorText>}
            <Button variant='subtle' onClick={handleModal}>
              Отмена
            </Button>
            <Button color='red' onClick={onDelete} loading={isLoading}>
              Удалить
            </Button>
          </Group>
        </Modal>
      )}
    </>
  )
}

export default DeleteButton
