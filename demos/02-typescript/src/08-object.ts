type Person = {
    name: string,
    readonly age: number,
    spouse?: string // may or may not exist in the value assigned
};

let john : Person;

john = {
    name: 'John',
    age: 32,
    // spouse: 'Jane'
};

const jane : Person = {
    name: 'Jane',
    age: 28,
    spouse: 'John'
}

// john.age = 33; // error - age is readonly

// error -> jane is const
// jane = {
//     name: 'Janette',
//     age: 29
// }

jane.name = 'Janette';
// jane.age = 29; // error - age is readonly