import gsap from "gsap"
import styled from "styled-components"
import useModal from "../store/modalState"
import useModalDto from "../store/modalDto"
import { CryptoData } from "../api/getCoinsList"
import { useEffect, useRef, useState } from "react"
import useInterestDtoState from "../store/interestDto"
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

function InterestModal () {

    const [modalOpen,setModalOpen] = useState<boolean>(false)

    const OnClickModalButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setModalOpen(!modalOpen)
    }

    return (
        <S.Container>
            <div>
                <S.OnOffButton onClick={OnClickModalButton}>
                    <img src="/hmm.webp" width="100%" height="100%"/>
                </S.OnOffButton>

                <MyInterestBoxes modalOpen={modalOpen}/>
    
            </div>
        </S.Container>
    )
}

export default InterestModal




interface IMyInterestBoxes {
    modalOpen: boolean
}
// 관심 아이템 모음
const MyInterestBoxes = (props:IMyInterestBoxes) => {
    const { modalOpen } = props
    const frameRef = useRef<HTMLDivElement | null>(null)
    // const [isDragging, setIsDragging] = useState(false);

    const {
        onDND,
        interestState,
    } = useInterestDtoState()

    //애니메이션 기준 우측 아래로 설정
    useEffect(()=>{
        if (!frameRef.current) return 
        
        gsap.set(frameRef.current, {transformOrigin: "right bottom"})
    },[])

    //모달 열면 애니메이션
    useEffect(()=>{
        if (!frameRef.current) return 
        
        gsap.to(frameRef.current, { scale:modalOpen ? 1 : 0, duration: 0.2 })
        
    },[modalOpen])

    return(
        <DragDropContext onDragEnd={onDND}

          >
            <Droppable droppableId="coins">
                {(provided) => (
                <S.MyInterest
                    ref={(el) => {
                    provided.innerRef(el);
                    frameRef.current = el;
                    }}
                    {...provided.droppableProps}
                >
                    {/* 아이템이 없을떄 */}
                    {interestState.length === 0 && <S.Title>Hmm... terestring</S.Title>}

                    {/* 아이템 있을때 */}
                    {interestState.length > 0 &&
                    interestState.map((item, idx) => (
                        <Draggable key={item.id} draggableId={item.id} index={idx}>
                            {(provided, snapshot) => {
                                
                                //gsap와 absolute 때문에 직접 위치 조정 필요했음...
                                const LEFT = 15.8
                                const offsetY = -446.8; 
                                const dragStyle = snapshot.isDragging
                                ? {
                                    ...(provided.draggableProps.style as any),
                                    left: `${LEFT}px`,
                                    top: (provided.draggableProps.style as any).top + offsetY || offsetY,
                                }
                                : provided.draggableProps.style

                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                        ...dragStyle,
                                        zIndex: snapshot.isDragging ? 1000 : 'auto',
                                        position: snapshot.isDragging ? 'fixed' : 'relative',
                                        width: snapshot.isDragging ? '280px' : '100%',
                                        
                                        }}
                                    >
                                        <InterestBox {...item} />
                                    </div>

                                )
                            }}
                        </Draggable>
                    ))}
                  
                {provided.placeholder}
                </S.MyInterest>
                )}
            </Droppable>
        </DragDropContext>
    )
} 

//관심 아이템 박스
const InterestBox = (props:CryptoData) => {
    const {
        id,
        name,
        symbol
    } = props

    const {openModal} = useModal()
    const {updateModalDTO} = useModalDto()
  
    //클릭하면 모달 열림
    const OnClickHandler = (e:React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()
      //현재 데이터 모달 데이터에 저장
      updateModalDTO(props)
      //모달 열기
      openModal()
    }

    return (
        <S.InterestBoxCompo className="interestBox" onClick={OnClickHandler}>
            <S.ImgFrame>
                <div><img src={`https://cryptocurrencyliveprices.com/img/${id}.png`} alt="" /></div>
            </S.ImgFrame>
            <S.InfoFrame>
                <span>
                    {name}
                </span>
                <span>
                    {symbol}
                </span>
            </S.InfoFrame>
        </S.InterestBoxCompo>
    )
}
const S = {
     Container: styled.div`
        position: fixed;
        height: 10px;
        bottom: 30px;
        right: 45px;
        width:10px;

        & > div {
            position: relative;
        }
    `,

     OnOffButton: styled.button`
        position: absolute;
        user-select: none;
        height: 60px;
        width: 60px;
        left: 50%;
        right: 50%;
        border: none;
        border-radius: 100%;
        background-color: transparent;
        transform: translate(-50%, -50%);
        cursor: pointer;
    `,
     Title: styled.span`
        font-size: 1.1rem;
        font-weight: 500;
        position: absolute;
        left: 1.5rem;
    `,

    MyInterest: styled.div`
        box-shadow: 1px 1px 1px #575757c2;
        background-color: #3b3b3b;
        position: absolute;
        overflow: visible; // 드래그 시 요소가 잘리지 않도록 설정
        border-radius: 8px;
        height: 400px;
        width: 280px;
        padding: 1rem;
        left: 50%;
        transform: translate(calc(-100% - 25px), calc(-100% - 25px)) scale(0,0);
        display: flex;
        flex-direction: column;
        align-items: center;
        /* gap: 0.6rem; */


        & > div {
            width: 100%;
            height: 60px;
            cursor: pointer;
            border-radius: 8px;
            margin-bottom: 0.6rem;
        } 

    `,
     InterestBoxCompo: styled.div`
            width: 280px;
            height: 60px;
            cursor: pointer;
            border-radius: 8px;
            background-color: #4c4c4c;
    
            display: grid;
            grid-template-columns: 60px auto;

            box-shadow: 1px 1px 1px #575757c2;
            user-select: none;
    `,

     ImgFrame: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        & > div {
            width: 65%;
            height: 65%;
            border-radius: 100%;
            background-color: #777575b4;

            display: flex;
            align-items: center;
            justify-content: center;

            & > img {
                width: 60%;
                height: 60%;
            }
        } 
    `,

     InfoFrame: styled.div `
        width: 100%;
        height: 100%;

        gap: 0.4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        & > span:nth-child(1) {
            font-size: 1.1rem;
            font-weight: 700;
        }

        & > span:nth-child(2) {
            font-size: 0.8rem;
            color:#b3b3b3;
        }
    `

}


// element.style {
    // z-index: 1000;
    // position: fixed;
    // width: 280px;
    // top: 462.708px;
    // left: 516.412px;
    // box-sizing: border-box;
    // height: 60px;
    // transition: transform 0.45s cubic-bezier(0.2, 1, 0.1, 1), opacity 0.45s cubic-bezier(0.2, 1, 0.1, 1);
    // pointer-events: none;
    // transform: translate(0px, 9.59494px) translate(-100vh, -10px);
// }
