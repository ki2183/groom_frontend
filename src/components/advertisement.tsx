import gsap from "gsap"
import styled from "styled-components"
import { useLayoutEffect, useRef } from "react"
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
export default function AdvertiseBanner() {

    const BoxRef = useRef<HTMLDivElement>(null)

    //렌더 다 되면 애니메이션 실행 
    //애니메이션은 렌더 전부 되고하는 것이 안전함 그래서 useLayoutEffect씀
    useLayoutEffect(()=>{
        if (!BoxRef.current) return
        const width = BoxRef.current.offsetWidth
        console.log(width,window.innerWidth* 0.8)
        const scrollAnimation = gsap.to(BoxRef.current, {
            x: -width + window.innerWidth * 0.8 +228,
            duration: 50,
            onComplete: () => {
                gsap.set(BoxRef.current, { scrollTo: { x: 0 } })
                scrollAnimation.restart()
            }
        })

    },[])

    return (
        <S.Container>
            <span>광고</span>
            <div>
                <div ref={BoxRef}>
                    <S.Card>광고 배너</S.Card>
                    <S.Card/>
                    <S.Card/>
                    <S.Card/>
                    <S.Card/>
                    <S.Card/>
                    <S.Card/>
                    <S.Card/>
                    <S.Card/>
                    <S.Card/>
                    <S.Card/>
                    <S.Card/>
                    
                </div>
            </div>
        </S.Container>
    )
}


const S = {
    Container:styled.div`
        width:95%;
        height: auto;
        border-radius: 8px;

        & > div {
            overflow: hidden;
            width:95vw;
        }

        &> div > div {
            width: auto;
            height: auto;
            
            display: inline-flex;
            grid-template-columns: 1fr;
            flex-wrap: nowrap;
            min-width: 0;
            gap: 1rem;
            margin: 1rem;
        }
    `,

    Card:styled.div`
        padding: 1rem;
        width: 228px;
        height: 300px;
        background-color: #474747;
        flex-shrink: 0;
        border-radius: 8px;
    `
}