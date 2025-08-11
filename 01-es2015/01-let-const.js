if ( true ) {
    var x = 1; // declared in if block but accessible outside also
    let y = 2; // declared in if block but NOT accessible outside - always use let, const
    const USDToINR = 86.5; // const variables should ALWAYS be assigned an iitial value

    // USDToINR++; // error - const variables cannot be changed
}

console.log( x ); // accessible outside the if block
// console.log( y ); // NOT accessible outside the if block - throws an error, and stops execution

console.log( 'last line' );

// non-primitives and const
const john = {
    name: 'John',
    age: 32
};

// error
// john = {
//     name: 'John',
//     age: 33
// };

john.age = 33; // allowed (properties of a const object are NOT const)

console.log( john );

const arr = [ 1, 2, 3 ];
// arr = [ 1, 2, 3, 4 ]; // error (arr is const) - assigning a new array is not allowed
arr[0] = 10;
console.log( arr ); // [ 10, 2, 3 ]
arr.push( 4 ); // ok
console.log( arr ); // [ 10, 2, 3, 4 ]