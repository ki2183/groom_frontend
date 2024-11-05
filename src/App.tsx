import './App.css'
import Nav from './components/nav';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import CoinPage from './pages/CoinPage';
import GlobalStyles from './GlobalStyles';
import AdvertiseBanner from './components/advertisement';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

function App() {
  
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyles/>

        <Container>
          <Nav/>
          <AdvertiseBanner/>
          <CoinPage/>
        </Container>
        
      </RecoilRoot>
      </QueryClientProvider>
    </>
  )
}

export default App


/** CSS **/
//#region

//전체 프레임
const Container = styled.div`
  width: 100vw;
  height: auto;
  min-height: 100vh;
  background-color: #131313;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  & > *:nth-child(2) {
    margin-top: 5rem;
  }
`;





//#endregion