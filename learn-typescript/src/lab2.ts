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