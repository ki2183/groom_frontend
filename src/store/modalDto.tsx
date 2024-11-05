import { atom, useRecoilState } from 'recoil';
import { coinTestDTO, CryptoData } from '../api/getCoinsList';

const modalDtoState = atom<CryptoData>({
  key: 'modalDTOState',
  default: coinTestDTO
})

export default function useModalDto() {
    const [ModalDTOState, setModalDTOState] = useRecoilState(modalDtoState)

    const updateModalDTO = (dto:CryptoData) => {
        setModalDTOState(dto)
    }
    
    return {
        ModalDTOState,
        updateModalDTO
    }
}


