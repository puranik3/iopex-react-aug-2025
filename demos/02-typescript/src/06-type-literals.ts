const PI = 3.14;

// You can use a value as a type

let x : 1;
x = 1;
// x = 2; // error

let color : 'RED' | 'BLUE' | 'GREEN';

color = 'RED';
color = 'GREEN';
// color = 'YELLOW'; // error

type Rating = 1 | 2 | 3 | 4 | 5

// let rating : 1 | 2 | 3 | 4 | 5;
let rating : Rating;
rating = 2;
rating = 5;
// rating = 0; // error
// rating = 6; // error