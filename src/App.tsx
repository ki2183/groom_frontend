import './App.css'
import Nav from './components/nav';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import ViewCoins from './components/viewCoins';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

function App() {
  
  return (
    <>
     <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <GlobalStyles/>
        <Container>
          <Nav/>

          <ViewCoins/>
        </Container>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
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
    margin-top: 3rem;
  }
`;





//#endregion