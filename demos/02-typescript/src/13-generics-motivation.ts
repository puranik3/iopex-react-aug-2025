// generics - classes, type, interface, function
// Generic avoid repetition
interface DetailedName {
    manufacturer: string,
    base: string
}

interface DetailedPrice {
    tax: number,
    base: number
}

interface Product {
    name: string,
    price: number
}

interface ProductDetailedName {
    name: DetailedName,
    price: number
}

interface ProductDetailedPrice {
    name: string,
    price: DetailedPrice
}

const pencil : Product = {
    name: 'Apsara Extra Dark',
    price: 5
};

const appleIPhone: ProductDetailedName = {
    name: {
        manufacturer: 'Apple',
        base: 'iPhone 16'
    },
    price: 75000
};

const heroPen: ProductDetailedPrice = {
    name: 'Hero Pen',
    price: {
        base: 80,
        tax: 20
    }
};