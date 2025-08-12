let message; // "any"

message = 1;
message = 'hello';
message = {
    name: 'John'
};

// primitive types
let name : string;
name = 'John';
// name = 123;

let quantity : number; // int and float
quantity = 10;
quantity = 1.5;

let isMonsoon : boolean;
isMonsoon = true; // or false

let employee : null; // we never use null type on its own
employee = null;
// employee = { // error since we cannot assign any other value except null
//     name: 'John'
// };