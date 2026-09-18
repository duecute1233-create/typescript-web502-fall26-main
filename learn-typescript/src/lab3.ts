// function
function sum(a:number ,b:number){
    return a+b
}
sum(3,4)


function talk(name: string):string{
    return "xin chao" + name
}

talk("ducnd")

// 1: Hàm tính điểm trung bình (Return type + Arrow Function)

// Yêu cầu
// Viết hàm averageScore
const averageScore = (...scores: number[]): number => {
  let total = 0;

  for (let score of scores) {
    total = total + score;
  }

  return total / scores.length;
};

console.log(averageScore(8, 9, 10));     // 9
console.log(averageScore(5, 6, 7, 8));   // 6.5
// Nhận vào nhiều điểm số (number)
// Trả về điểm trung bình (number)
// Sử dụng arrow function và rest parameter
// Ví dụ
// averageScore(8, 9, 10); // 9
// averageScore(5, 6, 7, 8); // 6.5
// Gợi ý
// (...scores: number[]) => number;
