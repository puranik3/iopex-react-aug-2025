function sumAsync( x, y, cb ) {
    setTimeout(
        () => cb( x + y ),
        3000
    );
}

sumAsync( 1, 2, ( result1 ) => {
    console.log( 'result1 = ', result1 );

    sumAsync( result1, 3, ( result2 ) => {
        console.log( 'result2 = ', result2 );

        sumAsync( result2, 4, ( result3 ) => {
            console.log( 'result3 = ', result3 );
        });
    });
});