 enum Rate {low = 'Thấp', medium = 'Trung bình', hight = 'Cao'}
const products:{name: string,
price: number,
sale: boolean,
rate: Rate
} =
{
    name: "Sample Product",
    price: 100,
    sale: true,
    rate: Rate.medium

}
console.log(products);

