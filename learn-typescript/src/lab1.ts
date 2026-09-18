// 1. Hàm trả về chu vi và diện tích hình chữ nhật

function rectangle(length: number, width: number) {
  const perimeter = (length + width) * 2;
  const area = length * width;

  return {
    perimeter: perimeter,
    area: area
  };
}

console.log(rectangle(10, 5));


// 2. Hàm tính tổng nhiều số
// Dùng rest parameter (...)

function sum(...numbers: number[]) {
  let total = 0;

  for (let number of numbers) {
    total = total + number;
  }

  return total;
}

console.log(sum(1, 2, 3, 4, 5));


// 3. Hàm đếm số lần xuất hiện của một ký tự trong chuỗi

function countCharacter(text: string, character: string) {
  let count = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === character) {
      count++;
    }
  }

  return count;
}

console.log(countCharacter('hello', 'l'));


// 4. Hàm kiểm tra một số có phải số nguyên tố hay không

function isPrime(number: number): boolean {

  if (number < 2) {
    return false;
  }

  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(7));
console.log(isPrime(10));