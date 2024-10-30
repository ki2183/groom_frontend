import { IgetCoinDTO } from './../api/getCoins';
import getCoins from '../api/getCoins'; 
import axios from 'axios';


//일단 mock을 설정해서 가상의 데이터 확인을 하는 것
jest.mock('axios') //axios를 쓸껀데
const mockedAxios = axios as jest.Mocked<typeof axios> //타입은 이거다

test('getCoinDto retur DTO of type Coin', async()=> {
    //가상 데이터
    const mockData: IgetCoinDTO[] = [
        {
          transaction_date: "2024-10-29 13:27:46",
          type: "ask",
          units_traded: "0.0198",
          price: "98810000",
          total: "1956438",
        },
      ];
    
      // axios의 모의 응답
      mockedAxios.get.mockResolvedValue({ data: { data: mockData } });
    
      // getCoins 함수 호출 모의 응답한 데이터가 들어옴
      const dto = await getCoins()

      expect(Array.isArray(dto)).toBe(true)

      dto.forEach(item => {
        expect(item).toMatchObject({
            transaction_date: expect.any(String),
            units_traded: expect.any(String),
            price: expect.any(String),
            total: expect.any(String),
            type: expect.any(String),

        })
      })
})



