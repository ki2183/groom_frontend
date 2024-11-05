import styled from "styled-components";
import useModal from "../store/modalState";
import useModalDto from "../store/modalDto";
import NumberHook from "../hooks/numberHook";
import useInterestState from "../store/interestDto";

function CoinViewModal() {
    const { ModalState, closeModal } = useModal()
    const { ModalDTOState } = useModalDto()
    const { addInterestCoin } = useInterestState()

    if (!ModalState || !ModalDTOState) return null

    const {
        getDate,
        getRateColor,
        getPriceDisplay,
        getformattedRate,
      } = NumberHook()

    const {
        name,
        symbol,
        quotes,
        
        max_supply,
        beta_value,
        last_updated,
        total_supply,
        first_data_at,
        
    } = ModalDTOState

    const {
        price,
        volume_24h,
        market_cap,
        market_cap_change_24h,
        volume_24h_change_24h,
    } = quotes.KRW

    const OnClickInterest = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault
        addInterestCoin(ModalDTOState)
        closeModal()
    }

    return (
        <Backdrop onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                
                <Title>{name} ({symbol}) Details</Title>
                <PriceContent>
                    <PriceBox>
                        <span>Current Price</span>
                        <span>₩{getPriceDisplay(price)}</span>
                        <span></span>
                    </PriceBox>
                    <PriceBox>
                        <span>Market Cap</span>
                        <span>₩{getPriceDisplay(market_cap)}</span>
                        <PercentSpan $fontColor={`${getRateColor(market_cap_change_24h)}`}>
                            {getformattedRate(market_cap_change_24h)}
                        </PercentSpan>
                    </PriceBox>
                </PriceContent>

                <PriceBox>
                        <span>24H volume</span>
                        <span>₩{getPriceDisplay(volume_24h)}</span>
                        <PercentSpan $fontColor={`${getRateColor(volume_24h_change_24h)}`}>
                            {getformattedRate(volume_24h_change_24h)}
                        </PercentSpan>
                        
                </PriceBox>

                <ETCContents>
                    <ETCBox>
                        <span>Rank</span>
                        <span>#1</span>
                    </ETCBox>
                    <ETCBox>
                        <span>Max Supply</span>
                        <span>{getPriceDisplay(max_supply)}</span>
                    </ETCBox>
                    <ETCBox>
                        <span>Beta Value</span>
                        <span>{beta_value}</span>
                    </ETCBox>
                    <ETCBox>
                        <span>Total Supply</span>
                        <span>{getPriceDisplay(total_supply)}</span>
                    </ETCBox>
                </ETCContents>

                <DateContents>
                    <Datebox>
                        <span>First Data At</span>
                        <span>{getDate(first_data_at)}</span>
                    </Datebox>
                    <Datebox>
                        <span>Last Updated</span>
                        <span>{getDate(last_updated)}</span>
                    </Datebox>
                </DateContents>

                <AddInterestingButton>
                    <button onClick={OnClickInterest}>Interesting</button>
                </AddInterestingButton>
            </ModalContent>
        </Backdrop>
    )
}

export default CoinViewModal;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 800px;
  padding: 2rem 2rem 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #151515;
  position: relative;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap:0.8rem;
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
`

const PriceContent = styled.div`
    width: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    gap: 0.8rem;
`


const PriceBox = styled.div`
    box-sizing: border-box;
    width: 100%;
    /* height: 40px; */
    padding: 1.2rem;
    background-color: #ffffff09;
    border-radius:8px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > span:nth-child(1){
        font-size: 0.9rem;
        color:gray;
        margin-bottom: 0.4rem;
    }
    & > span:nth-child(2){
        font-size:1.5rem;
        font-weight: 700;
    }   
`

const PercentSpan = styled.span<{$fontColor:string}>`
    font-size: 0.9rem;
    color:${(props)=>props.$fontColor};
`

const ETCContents = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`

const ETCBox = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 1.2rem;
    
    border-radius:8px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > span:nth-child(1){
        font-size: 0.9rem;
        color:gray;
        margin-bottom: 0.4rem;
    }
    & > span:nth-child(2){
        font-size:1rem;
    }

`
const DateContents = styled.div`
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
`
const Datebox = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 1.2rem;
    
    border-radius:8px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > span:nth-child(1){
        font-size: 0.9rem;
        color:gray;
        margin-bottom: 0.4rem;
    }
    & > span:nth-child(2){
        font-size:1rem;
    }
`

const AddInterestingButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    
    & > button {
        padding: 0.3rem 0.7rem 0.3rem 0.7rem;
        border-radius: 4px;
        border: none;
        font-size: 1rem;
        background-color: #2c2c2cc7;
        cursor: pointer;
        color: #e8e8e8;
    }
    & > button:hover {
        color: #b7b7b7;
    }
`