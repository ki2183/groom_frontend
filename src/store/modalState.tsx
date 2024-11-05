import { atom, useRecoilState } from 'recoil';

const modalState = atom({
  key: 'modalState',
  default: false,
})

export default function useModal() {
    const [ModalState, setModalState] = useRecoilState(modalState)

    const openModal = () => setModalState(true)
    
    const closeModal = () => setModalState(false)  

    return {
        openModal,
        closeModal,
        ModalState
    }
}


