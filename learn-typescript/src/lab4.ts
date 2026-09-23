// //class
// class Student{
//     id: string;
//     name: string;
//     age: number;
//     constructor(id:string, name: string, age: number){
//         this.id = id
//         this.name = name
//         this.age = age
//     }
//     //method
//     showStudent(){
//         console.log(`ID: ${this.id}, Name: ${this.name}, Age: ${this.age}`);
//     }
// }
// const sv1 = new Student("ph3333", "Nguyen Duc", 20)
// sv1.showStudent()


// //interface
// interface Student{
//     id: string;
//     name: string;
//     age: number;
//     showStudent(): void;
// }
// const sv2: Student = {
//     id: "ph4444",
//     name: "Tran Van",
//     age: 21,
//     showStudent() {
//         console.log(`ID: ${this.id}, Name: ${this.name}, Age: ${this.age}`);
//     }
// };
// sv2.showStudent();


// //type
// type StudentType = {
//     id: string;
//     name: string;
//     age: number;
//     showStudent(): void;
// };
// const sv3: StudentType = {
//     id: "ph5555",
//     name: "Le Thi",
//     age: 22,
//     showStudent() {
//         console.log(`ID: ${this.id}, Name: ${this.name}, Age: ${this.age}`);
//     }
// };
// sv3.showStudent();

// bài tập

// Bài 1
// Tạo class Student gồm:
// id
// name
class Student {
    id: string;
    name: string;

    constructor(id: string, name:string){
        this.id = id
        this.name = name
    }
    // phương thức display()
    display() {
        console.log(`ID: ${this.id}, Name: ${this.name}`);
    }
}
const student = new Student("1", "Nguyễn Văn A");

student.display();

// Bài 2
// Tạo interface User
// id
// email
// phone (optional)
interface User {
    id:string;
    email:string;
    phone:string;
}
const user: User = {
  id: "1",
  email: "abc@gmail.com",
  phone: "0123456789"
};
// Bài 3
// Tạo type Product
// id
// name
// price
// Khai báo một object theo type trên.
type Product = {
  id: number;
  name: string;
  price: number;
};

const product: Product = {
  id: 1,
  name: "Áo thun",
  price: 100
};

console.log(product);