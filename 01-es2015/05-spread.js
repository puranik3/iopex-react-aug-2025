// spread operator is used to merge multiple arrays, multiple objects into one
const arr1 = [ 1, 2, 3 ];
const arr2 = [ 4, "Five", 6 ];

const arr3 = [ ...arr1, 3.25, "Three and half", 3.75, ...arr2 ];

console.log( arr3 );

const johnPersonal = {
    name: "John",
    age: 32,
    spouse: "Jane",
    children: [
        "Jack",
        "Jill"
    ]
};

const johnOfficial = {
    name: "Jonathan",
    company: "iOpex",
    emails: [
        "john@gmail.com",
        "john@iopex.com"
    ]
};

const johnMasterDetails = {
    ...johnPersonal,
    ...johnOfficial
};

console.log( johnMasterDetails ); // name is "Jonathan" as johnPersonal is spread before johnOfficial