// + is overloaded in JS, Java
// 1 + 2 -> addition
// "hello" + "world" -> string concatenation

// ... - rest / spread (an overloaded operator)
// rest has 2 use cases - array and object destructuring (+1 more use cases which is not covered)

const weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri'
];

const [ mon, tue, ...otherDays ] = weekdays;
console.log( otherDays );

const john = {
    name: 'John',
    age: 32,
    emails: [
        'john@gmail.com',
        'john@iopex.com',
        'john@gmail.com',
        'john@microsoft.com',
    ],
    address: {
        city: 'Chennai',
        pinCode: 600100
    }
};

const {
    name,
    emails: [
        ,
        officialEmail,
        ...otherEmails
    ],
    ...otherDetails
} = john;
console.log( otherDetails, otherEmails );