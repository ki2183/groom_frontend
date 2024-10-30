
import styled from "styled-components";
import getCoinsList, { CryptoData } from "../api/getCoinsList";
import { useQuery } from "@tanstack/react-query";
import CoinViewModal from "./modal";
import useModal from "../store/modalState";


const getCoins = async () => {
  try {
    const dto = await getCoinsList();
    return dto;
  } catch (err) {
    console.log("API error:", err);
    return [];
  }
}

const ViewCoins = () => {

  return (
    <Container>

      <CoinViewModal/>
      
      <Title>All coins</Title>

      <CoinsView/>

    </Container>
  )
}

const CoinsView = () => {
  const { data, isSuccess } = useQuery<CryptoData[]>({
    queryKey: ['coins'],
    queryFn: () => getCoins(),
  });

  if (!isSuccess) return <span>로딩중...</span>

  return (
    <Coins>
      {data && data?.length > 0 &&
        data.map((coin) => 
          <Coin {...coin}/>

        )}
    </Coins>
  );
};

const getColor = (price:number) => price >= 0 ? "#118e11" : "#ef1d1d"
const getCurPrice = (price:number) => price.toFixed(2)

const getChange24H = (price:number) => {
  return (price > 0 ? "+" : "-") + Math.abs(price) + "%"
}

const Coin = (props:CryptoData) => {
  const {id, name, symbol, quotes} = props
  
  const {price, market_cap_change_24h} = quotes.KRW

  const {openModal} = useModal()

  const OnClickHandler = () => openModal()

  return (
    <li key={id} onClick={OnClickHandler}>
      <div>
        <ImgFrame>
          <div>
            <img src={`https://cryptocurrencyliveprices.com/img/${id}.png`} alt="" />
          </div>
        </ImgFrame>

        <InfoFrame>
          <div className="fc">
              <Name>{name}</Name>
              <Symbol>{symbol}</Symbol>
          </div>

          <div className="fc">
              <CurPrice> ₩{getCurPrice(price)}</CurPrice>
              <Price24H fontColor={`${getColor(market_cap_change_24h)}`}>
                {getChange24H(market_cap_change_24h)}
              </Price24H>
          </div>
        </InfoFrame>
      </div>
      
    </li>
  )

}

const Container = styled.div`
  width: 80%;
  height: 100%;
  padding-top: 2.5rem;

  gap: 2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span `
  font-size: 1.5rem;
  font-family: "Roboto", sans-serif;
  letter-spacing: -1px;
  font-weight: 600;
`
const Coins = styled.ol`
  width: 100%;
  height: auto;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-auto-rows: 90px;
  gap: 16px;

  & > li {
    cursor: pointer;
    user-select: none;
    background-color: #80808029;
    border-radius: 8px;
    overflow: hidden;
    & > div {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 1px;
      
      display: grid;
      grid-template-columns: 90px auto;
    }
    &:hover{
      background-color: #80808012;
    }
  }
`

const ImgFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  & > div {
    width: 65%;
    height: 65%;
    border-radius: 100%;
    background-color: #80808036;

    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      width: 60%;
      height: 60%;
    }
  }
`

const InfoFrame = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 1.5rem;

    & > div:nth-child(1) {
      gap: 0.3rem;
    }
    & > div:nth-child(2) {
      gap: 0.3rem;
      align-items: flex-end;
    }
`
const Name = styled.span`
  font-size: 1.1rem;
  font-weight: 800;
`
const Symbol = styled.span`
  font-size: 0.8rem;
  color: gray;
  font-weight: 300;
`
const CurPrice = styled.span`
  font-size: 1.1rem;
  font-weight: 800;
`
const Price24H = styled.span<{ fontColor: string }>`
  color: ${(props) => props.fontColor};
  font-size: 0.8rem;
  font-weight: 500;
`;
  
export default ViewCoins;