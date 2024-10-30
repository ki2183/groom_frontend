import getCoinsList from '../api/getCoinsList';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('getCoinsList should return an array of CryptoData objects', async () => {
  const mockData = [
    {
      id: "btc-bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      rank: 1,
      first_data_at: "2010-07-17T00:00:00Z",
      last_updated: "2024-10-29T08:33:35Z",
      beta_value: 0.958821,
      max_supply: 21000000,
      total_supply: 19774659,
      quotes: {
        KRW: {
          price: 98565001.23,
          volume_24h: 64776498491842.94,
          volume_24h_change_24h: 106.59,
          market_cap: 1949089288663081,
          market_cap_change_24h: 4.61,
        },
      },
    },
  ];

  // axios 모의 데이터가 배열 형태로 반환되도록 설정
  mockedAxios.get.mockResolvedValue({ data: mockData });

  const data = await getCoinsList();
  expect(Array.isArray(data)).toBe(true);
  expect(data).toHaveLength(1);
});
