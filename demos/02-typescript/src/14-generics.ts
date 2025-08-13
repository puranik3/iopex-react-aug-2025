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

interface Product<NameType = string, PriceType = number> {
    name: NameType,
    price: PriceType
}

type PLongName = Product<DetailedName>;

const pencil : Product = {
    name: 'Apsara Extra Dark',
    price: 5
};

const appleIPhone: PLongName = {
    name: {
        manufacturer: 'Apple',
        base: 'iPhone 16'
    },
    price: 75000
};

const heroPen: Product<string, DetailedPrice> = {
    name: 'Hero Pen',
    price: {
        base: 80,
        tax: 20
    }
};