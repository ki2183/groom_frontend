import styled from "styled-components";
import useModal from "../store/modalState";

function CoinViewModal() {
    const { ModalState, closeModal } = useModal()

    if (!ModalState) return null

    return (
        <Backdrop onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                
                <Title>BitCoin (BTC) Details</Title>
                <PriceContent>

                    <PriceBox>
                        <span>Current Price</span>
                        <span>₩875050593</span>
                        <span></span>
                    </PriceBox>
                    <PriceBox>
                        <span>Market Cap</span>
                        <span>₩48790128492104</span>
                        <span>+4.61</span>
                    </PriceBox>
                </PriceContent>

                <PriceBox>
                        <span>Market Cap</span>
                        <span>₩48790128492104</span>
                        <span>+4.61</span>
                </PriceBox>

                <ETCContents>
                    <ETCBox>
                        <span>Rank</span>
                        <span>#1</span>
                    </ETCBox>
                    <ETCBox>
                        <span>Max Supply</span>
                        <span>21,000,000</span>
                    </ETCBox>
                    <ETCBox>
                        <span>Beta Value</span>
                        <span>0.958821</span>
                    </ETCBox>
                    <ETCBox>
                        <span>Total Supply</span>
                        <span>19,774,659</span>
                    </ETCBox>
                </ETCContents>

                <DateContents>
                    <Datebox>
                        <span>First Data At</span>
                        <span>2024년 7월 17일 오전 09:00</span>
                    </Datebox>
                    <Datebox>
                        <span>Last Updated</span>
                        <span>2024년 8월 24일 오전 09:00</span>
                    </Datebox>
                </DateContents>
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
    & > span:nth-child(3){
        font-size: 0.9rem;
        color: green;
    }
    
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