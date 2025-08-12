let scoresDhoni : number[] = [];
scoresDhoni.push( 30 );
scoresDhoni.push( 40 );
scoresDhoni.push( 50 );

let cheques : number | string[] = [];

cheques.push( 'One thousand' );
cheques.push( 'Two thousand' );
// cheques.push( 2000 ); // error
cheques = 2000;

let cheques2 : (number | string)[] = [];

cheques2.push( 'One thousand' );
cheques2.push( 2000 );

let cheques3 : number[] | string[];
// cheques3 = [ 1000 ,  'Two thousand' ]; // error
cheques3 = [ 1000, 2000 ];
cheques3 = [ 'One thousand', 'Two thousand' ];