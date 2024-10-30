import axios from "axios";

// 통화 정보 타입
type Quote = {
    price: number;                   // 현재 가격
    volume_24h: number;              // 24시간 거래량
    volume_24h_change_24h: number;   // 24시간 거래량 변화율 (%)
    market_cap: number;              // 시가총액
    market_cap_change_24h: number;   // 시가총액 변화율 (%)
  };
  
  // 암호화폐 데이터 타입
  export type CryptoData = {
    id: string;                      // 고유 ID
    name: string;                    // 암호화폐 이름
    symbol: string;                  // 심볼 (예: "BTC")
    rank: number;                    // 시장 순위
    first_data_at: string;           // 데이터 시작일 (ISO 문자열)
    last_updated: string;            // 마지막 업데이트 시간 (ISO 문자열)
    beta_value: number;              // 베타 값 (변동성 지표)
    max_supply: number;              // 최대 공급량
    total_supply: number;            // 총 공급량
    quotes: {
      KRW: Quote;                    // KRW 통화에 대한 정보 (여기에 다른 통화를 추가할 수도 있음)
    };
  };

export const coinTestDTO = {
    id: "btc-bitcoin",                    // 고유 ID
    name: "Bitcoin",                      // 이름
    symbol: "BTC",                        // 심볼
    rank: 1,                              // 순위
    first_data_at: "2010-07-17T00:00:00Z", // 데이터 시작일
    last_updated: "2024-10-29T08:33:35Z",  // 마지막 업데이트 시간
    beta_value: 0.958821,                 // 베타 값 (변동성 지표)
    max_supply: 21000000,                 // 최대 공급량
    total_supply: 19774659,               // 총 공급량
    quotes: {
      KRW: {
        price: 98565001.23,               // 가격 (KRW)
        volume_24h: 64776498491842.94,    // 24시간 거래량
        volume_24h_change_24h: 106.59,    // 24시간 거래량 변화율 (%)
        market_cap: 1949089288663081,     // 시가총액 (KRW)
        market_cap_change_24h: 4.61,      // 시가총액 변화율 (%)
      }
    }
  }

export default async function getCoinsList (): Promise<CryptoData[]>  {
    const res = await axios.get('https://api.coinpaprika.com/v1/tickers?quotes=KRW')

    if (!res.data || !Array.isArray(res.data)) throw new Error('API response is not an array')
      
    return res.data.slice(0,100)
}