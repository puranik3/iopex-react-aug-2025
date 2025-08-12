// pulling out items from an array and storing it in a variable
const weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri'
];

// const mon = weekdays[0], tue = weekdays[1], fri = weekdays[4];
const [ mon, tue, , , fri ] = weekdays;
console.log( mon, tue, fri );

// pulling out properties from an object and storing it in a variable
const john = {
    name: 'John',
    age: 32,
    emails: [
        'john@gmail.com',
        'john@iopex.com'
    ],
    address: {
        city: 'Chennai',
        pinCode: 600100
    }
};

// const name = john.name, age = john.age, officialEmail = john.emails[1], city = john.address.city, pinCode = john.address.pinCode;
const {
    name,
    age,
    emails: [
        ,
        officialEmail
    ],
    address: {
        city : place, // assign city data member to create place variable
        pinCode
    }
} = john;

console.log( name, age, officialEmail, place, pinCode );