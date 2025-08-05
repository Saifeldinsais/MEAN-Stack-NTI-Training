// // // let settings: {
// // //     [key: string]: string 
// // // } = {
// // //     x: "x", 
// // //     y: "y"
// // // }
// // // settings.u = "k"


// // type User = {
// //     name: string,
// //     age: number
// //     isAdmin?: boolean
// // }

// // let admin0: User = {
// //     name: "saif", 
// //     age: 20, 
// //     isAdmin: true
// // }

// // console.log(admin0);


// // interface User {
// //     name: string,
// //     age: number
// //     [key: string] : any
// // }
// // let user: User = {
// //     name: "saif",
// //     age: 20
// // }

// // interface Animal{
// //     name: string
// // }

// // interface Cat extends Animal{
// //     age: number
// // }

// // let cat1: Cat = {
// //     name: "mohsen",
// //     age: 1
// // }

// interface Person{
//     name: string,
//     greet(): void;
// }

// class Teacher implements Person{
//     name: string;

//     constructor(name: string){
//         this.name = name;
//     }

    
//     greet(): void{
//         console.log("i am a teacher")
//     }
// }



// function greet(name: string, age?: number): string {
//     return `hello ${name}`
// }

// console.log(greet("saif", 20))

let containerList: [number, ...number[]] = [10,20,40,44,35,37,21,25,30]

function findMinAvgMax(containerList: [number, ...number[]]){
    const min = Math.min(...containerList);
    const max = Math.max(...containerList);
}