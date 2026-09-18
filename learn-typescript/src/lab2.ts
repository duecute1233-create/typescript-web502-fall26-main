enum Rate {
  low = 'Thấp',
  medium = 'Trung bình',
  hight = 'Cao'
}

type Product = {
  name: string;
  price: number;
  sale: boolean;
  rate: Rate;
};

const listProducts: Product[] = [
  {
    name: "Sản phẩm 1",
    price: 10,
    sale: true,
    rate: Rate.hight
  },
  {
    name: "Sản phẩm 2",
    price: 5,
    sale: false,
    rate: Rate.medium
  },
  {
    name: "Sản phẩm 3",
    price: 8,
    sale: true,
    rate: Rate.low
  },
  {
    name: "Sản phẩm 4",
    price: 3,
    sale: false,
    rate: Rate.medium
  },
  {
    name: "Sản phẩm 5",
    price: 15,
    sale: true,
    rate: Rate.hight
  }
];

const addDescription = listProducts.map((product) => ({
  ...product,
  description: product.price > 5 ? 'Tốt' : 'Bình thường'
}));

console.log(addDescription);

// Viết hàm thêm mới 1 phần tử vào mảng listProducts có key = description, có giá trị = 'Tốt' nếu price > 5, 'Bình thường' nếu price <=5 (sử dụng map)
const newProducts  = listProducts.map((product) => ({
  ...product,
  description: product.price > 5 ? 'Tốt' : 'Bình thường'
}));
console.log(newProducts);

// Viết hàm hiển thị danh sách sản phẩm: (Tên sản phẩm, giá bán, trạng thái sale,Đánh giá) (Sử dụng forEach)
function showProducts(products: Product[]){
    products.forEach((product) => {
        console.log(
            'Tên:', product.name,
      '| Giá:', product.price,
      '| Sale:', product.sale,
      '| Đánh giá:', product.rate
        );
        
    });
}
console.log("Danh sách sản phẩm:");
showProducts(listProducts);

// Viết hàm tính tổng giá bán sản phẩm (sử dụng reduce)
function total(Products: Product[]){
    const total = Products.reduce((sum, product) => sum + product.price,0)
    return total;
}
console.log("Tổng giá bán sản phẩm:", total(listProducts));
// Viết hàm lọc những sản phẩm đang Sale và đánh giá từ Trung bình trở lên (Sử dụng filter)
function filterSaleAndMedium(products: Product[]){
    return products.filter(product => product.sale && (product.rate === Rate.medium || product.rate === Rate.hight));
}
console.log("Sản phẩm đang Sale và đánh giá từ Trung bình trở lên:", filterSaleAndMedium(listProducts));