import axios from "axios";

const getCoinDTO = {
    transaction_date: "2024-10-29 13:27:46",
    type: "ask",
    units_traded: "0.0198",
    price: "98810000",
    total: "1956438",
}
export type IgetCoinDTO = typeof getCoinDTO

// getCoins 함수에서 반환 타입을 Promise<any[]>로 지정합니다.
export default async function getCoins(): Promise<IgetCoinDTO[]> {
    const response = await axios.get('https://api.bithumb.com/public/transaction_history/BTC_KRW');
    return response.data.data as IgetCoinDTO[];
}


  
//강사님이 내일 두 시에 강의 하신다는데 혹시 내일 문제는 자유시간을 푸나용?