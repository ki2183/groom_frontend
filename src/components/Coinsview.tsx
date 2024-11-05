import gsap from "gsap";
import { useEffect } from "react";
import styled from "styled-components";
import useModal from "../store/modalState";
import useModalDto from "../store/modalDto";
import NumberHook from "../hooks/numberHook";
import { useQuery } from "@tanstack/react-query";
import getCoinsList, { CryptoData } from "../api/getCoinsList";

//코인 데이터 가져오기
const getCoins = async () => {
  try {
    const dto = await getCoinsList();
    return dto;
  } catch (err) {
    console.log("API error:", err);
    return [];
  }
}

//반환하는 컴포넌트
const CoinsView = () => {
  return (
    <Coins>
      <CoinItems/>
    </Coins>
  )
}

export default CoinsView


//끌어올리기 Coins 리렌더 방지
export const CoinItems = () => {
  //데이터 캐싱
  const { data, isSuccess } = useQuery<CryptoData[]>({
    queryKey: ['coins'],
    queryFn: () => getCoins(),
  })


  useEffect(()=>{
    if (!isSuccess || data.length <= 0) return
    //간단한 데이터 업데이트 애니메이션
    gsap.from('.coinBox', {
      opacity:0,
      stagger:0.02,
      duration: 0.2,
    })

  },[data])

  if (!isSuccess) return <span>로딩중...</span>

  return (
    <>
      {data && data?.length > 0 &&
        data.map((coin, _) => <Coin key={_} {...coin}/>
      )}
    </>
  ) 
}

interface ICoin extends CryptoData{
  
}

//코인 컴포넌트
export const Coin = (props:ICoin) => {
  const {id, name, symbol, quotes } = props
  const {price, market_cap_change_24h} = quotes.KRW

  const {
    getCutPrice,
    getRateColor,
    getPriceDisplay,
    getformattedRate,
  } = NumberHook()
  const {openModal} = useModal()
  const {updateModalDTO} = useModalDto()

  const OnClickHandler = (e:React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    //현재 데이터 모달 데이터에 저장
    updateModalDTO(props)
    //모달 열기
    openModal()
  }

  //10000.1111 => 10000.11 => 10,000.11
  const ComputePrice = (price:number) => getPriceDisplay(Number(getCutPrice(price)))

  return (
    <li className="coinBox" key={id} onClick={OnClickHandler}>
      <div>
        <ImgFrame>
          <div><img src={`https://cryptocurrencyliveprices.com/img/${id}.png`} alt="" /></div>
        </ImgFrame>

        <InfoFrame>
          <div className="fc">
              <Name>{name}</Name>
              <Symbol>{symbol}</Symbol>
          </div>

          <div className="fc">
              <CurPrice> ₩{ComputePrice(price)}</CurPrice>
              <Price24H $fontColor={`${getRateColor(market_cap_change_24h)}`}>
                {getformattedRate(market_cap_change_24h)}
              </Price24H>
          </div>

        </InfoFrame>
      </div>
      
    </li>
  )

}


export const Coins = styled.ol`
  width: 100%;
  height: auto;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-auto-rows: 90px;
  gap: 16px;

  & > li {
    cursor: pointer;
    user-select: none;
    background-color: #80808029;
    border-radius: 8px;
    box-shadow: 1px 1px 1px #515151a6;
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
const Price24H = styled.span<{ $fontColor: string }>`
  color: ${(props) => props.$fontColor};
  font-size: 0.8rem;
  font-weight: 500;
`;
