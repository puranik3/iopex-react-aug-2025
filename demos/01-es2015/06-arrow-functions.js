console.log( sum1( 12, 13 ) );

// function declaration
function sum1( x, y ) {
    const result = x + y;
    return result;
}

// console.log( sum2( 12, 13 ) ); // error

// expression syntax
var sum2 = function( x, y ) {
    const result = x + y;
    return result;
};

console.log( sum2( 12, 13 ) );

// --- ES2015 arrow function ---
var sum3 = ( x, y ) => {
    const result = x + y;
    return result;
};

console.log( sum3( 12, 13 ) );

// single line arrow function, the bracess and return keyword can be removed completely
var sum4 = ( x, y ) => x + y;

console.log( sum4( 12, 13 ) );

// single argument arrow function - the () around the argument can be removed
// var square = ( x ) => x * x;
var square = x => x * x;
console.log( square( 10 ) ); // 100