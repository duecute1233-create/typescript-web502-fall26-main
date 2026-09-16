// Viết 1 hàm trả về chu vi và diện tích hình chữ nhật
function chuvihcn(chieudai: number, chieurong: number) {
  return (chieudai + chieurong) * 2;
}

console.log(chuvihcn(3, 4));

// Viết 1 hàm tính tổng nhiều số (không biết trước số lượng tham số), sử dụng rest parameter
function Tong(...numbers: number[]){
  let ketQua = 0;
  for (let number of numbers){
     ketQua+= number;

  }
  return ketQua;
}
console.log(Tong(1, 2, 3, 4, 5));
// Viết hàm trả về số lượng xuất hiện của 1 kí tự trong chuỗi
function dem (chuoi:string, kyTu:string){
  let count = 0;
  for (let char of chuoi){
    kyTu === char && count++
  }
  return count
}
console.log(dem("hello world", "l"));
// Viết hàm trả về boolean kiểm tra 1 số có phải số nguyên tố
function laSoNguyenTo(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
console.log(laSoNguyenTo(7));
console.log(laSoNguyenTo(10));
console.log(laSoNguyenTo(13));
  