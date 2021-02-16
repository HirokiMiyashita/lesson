export default function primitiveSample(){
    let name:string = "宮下裕希"
    // name = 123
    console.log("primitiveSample1:",typeof name,name)
    let age:number = 20
    // age = "28"
    console.log("primitiveSample2:",typeof age,age)

    let isSingles:boolean = true
    console.log("primitiveSample2:",typeof isSingles,isSingles)

    const isOver20:boolean = age >= 21
    console.log("primitiveSample4:",typeof isOver20,isOver20)
}