import styled from "styled-components";
import CoinsView from "../components/Coinsview";
import CoinViewModal from "../components/coinModal";
import InterestModal from "../components/interestModal";

export default function CoinPage() {
    return (
        <Container>

            <CoinViewModal/>

            <Title>All coins</Title>

            <CoinsView/>

            <InterestModal/>
            
        </Container>
        
    )
}

const Container = styled.div`
  width: 80%;
  height: 100%;
  padding-top: 2.5rem;
  padding-bottom: 5rem;

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