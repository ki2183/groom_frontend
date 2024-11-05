import styled from "styled-components"

function Nav(){
    return (
        <Container>
            <Frame>
                <Title>Coin</Title>
                <Menu/>
            </Frame>
        </Container>
    )
}

export default Nav

interface menuType {
    name:string
} 

const Menu = () => {
    const menu:menuType[] = [
        {
            name:"거래소",

        },{
            name:"자산",

        },{
            name:"입출금",

        },
        
    ]

    return (
        <Menus>
            {
                menu.length > 0 && menu.map(({name}, _) => (
                    <li key={_}>
                        <button>{name}</button>
                    </li>
                ))
            }
 
        </Menus>
    )
}

const Container = styled.nav`
  width: 100vw;
  height:2.5rem;
  font-size: 1rem;
  position: fixed;
  z-index:5;
  background-color: #1a1a1a;
  border-bottom: 1px solid #4a7ea187;

`

const Frame = styled.div`
    width: 100%;
    height: 100%;
    max-width:1980px;
    margin-left:auto;
    margin-right:auto;
    padding: 0 1.5rem 0 1.5rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
`
const Title = styled.span `
    

  font-family: "Roboto", sans-serif;
  font-weight: 600;

`
const Menus = styled.ol`
    width: auto;
    height: 100%;
    /* padding: ; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    & > li {
        padding:0.3rem;
        font-size: 0.8rem;

        & > button {
            background-color: transparent;
            border: none;
            cursor: pointer;

            &:hover {
                color: #8a8a8a;

            }
        }

    }
`