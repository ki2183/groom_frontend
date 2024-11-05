function NumberHook() {

    //ex) 100000000 => 100,000,000
    const getPriceDisplay = (price:number) => price.toLocaleString()

    //ex) 1000 => +1000
    const getformattedRate= (rate:number) => rate >= 0 ? "+"+ rate + "%" : "-"+ Math.abs(rate) + "%"
    
    //비율 증가율에 따른 색 리턴
    const getRateColor = (price:number) => price >= 0 ? "#118e11" : "#ef1d1d"

    //0.23123 => 0.23
    const getCutPrice = (price:number) => price.toFixed(2)

    //2024-10-29 13:27:46 => 2024년 10월 29일 오전 13시 27분
    const getDate = (dateString:string) => {
        const [year, month, day, h, min, _] = dateString.split(/\D+/).map(num => num.padStart(2, "0"))
        
        return `${year}년 ${month}월 ${day}일 오전 ${h}:${min}`

    }
    return {
        getDate,
        getCutPrice,
        getRateColor,
        getPriceDisplay,
        getformattedRate
    }
}

export default NumberHook