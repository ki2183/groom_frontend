import { atom, useRecoilState } from 'recoil';
import { CryptoData } from '../api/getCoinsList';
import { DropResult } from 'react-beautiful-dnd';

const InterestState = atom<CryptoData[]>({
  key: 'interestState',
  default: []
})

const Check = new Set()

export default function useInterestDtoState() {
    const [interestState, setInterestState] = useRecoilState(InterestState)
    

    const addInterestCoin = (dto:CryptoData) => {
        if (Check.has(dto.id)) return

        Check.add(dto.id)
        setInterestState(prev => [...prev, dto])

    }
    
    const delInterestCoin = (idx:number) => {
        if (!interestState[idx]) return 
        Check.delete(interestState[idx].id)
        setInterestState(prev => prev.filter((_, i) => i !== idx))
    }

    const onDND = (result:DropResult) => {
        const { source, destination } = result

        if (!destination) return

        // 리스트 내에서 아이템을 교환
        const reorderedItems = Array.from(interestState);

        [reorderedItems[source.index], reorderedItems[destination.index]] = [reorderedItems[destination.index], reorderedItems[source.index]]
        
        setInterestState(reorderedItems)

    }

    return {
        onDND,
        interestState,
        addInterestCoin,
        delInterestCoin,
    }
}


