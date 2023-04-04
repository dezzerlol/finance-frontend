import ErrorText from '@/components/ErrorText'
import { Button, Group, Modal, TextInput } from '@mantine/core'
import { useState } from 'react'
import { useCreateWallet } from '../api/wallet'

const NewWalletButton = () => {
  const [isOpened, setIsOpened] = useState(false)
  const [title, setTitle] = useState('')

  const { mutateAsync, isLoading, error: apiError } = useCreateWallet()

  function handleModal() {
    setTitle('')
    setIsOpened((prev) => !prev)
  }

  async function handleCreate() {
    mutateAsync({ title })
    handleModal()
  }

  return (
    <>
      <Button onClick={handleModal}>Добавить новый</Button>

      {isOpened && (
        <Modal centered opened={isOpened} onClose={handleModal} title='Создать кошелек' zIndex={10000}>
          <TextInput withAsterisk label='Название' value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
          <Group position='right' mt='md'>
            <Button variant='subtle' onClick={handleModal}>
              Отмена
            </Button>
            <Button color='blue' onClick={handleCreate} loading={isLoading}>
              Создать
            </Button>
            {apiError && <ErrorText>{apiError?.response?.data.message}</ErrorText>}
          </Group>
        </Modal>
      )}
    </>
  )
}

export default NewWalletButton
