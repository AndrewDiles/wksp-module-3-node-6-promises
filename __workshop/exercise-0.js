// Exercise 0.1
// ------------
// Write a function testNum that takes a number as an argument and returns
// a Promise that tests if the value is less than or greater than the value 10.

// Exercise 1 is done...

// const compareToTen = (num) => {
//     myPromise = new Promise((resolve, reject) => {
//         if(num > 10) {
//             resolve(num + " is greater than 10, success!")
//         } else {
//             reject(num + " is less than 10, error!")
//         }
//     })
//     return myPromise;
// }

// Calling the Promise


// compareToTen(15)
//     .then(result => console.log(result))
//     .catch(error => console.log(error))

// compareToTen(8)
//     .then(result => console.log(result))
//     .catch(error => console.log(error))

    
// Exercise 0.2
// ------------
// Write two functions that use Promises that you can chain!
// The first function, makeAllCaps(), will take in an array of words and capitalize them,
// and then the second function, sortWords(), will sort the words in alphabetical order.
// If the array contains anything but strings, it should throw an error.




const arrayOfWords = ['cucumber', 'tomatos', 'avocado']
const complicatedArray = ['cucumber', 44, true]
  
const makeAllCaps = (array) => {
    myPromise = new Promise((resolve, reject) => {
        let fail = false;
        array.forEach((word, index) => {
            if (typeof word === "string"){
            array[index]= word.toUpperCase();
            }
            else fail = true;
        })
        // fail ? reject(array) : resolve(array);
        if (fail === true) reject(`${array} contains non-string elements.`);
        else resolve(array);
    })
    return myPromise;
}

const sortWords = (array) => {
    myPromise = new Promise((resolve, reject) => {
        let fail = false;
        array.forEach((word) => {
            if (typeof word != "string") fail = true;
        });
        if (fail === true) reject(array);
        else {
            array = array.sort();   //function(a,b){return a > b}  I was trying different sort functions and then it hit me that it will be alphabetical by default (presuming all upper or all lower case)
            console.log(array);
            resolve(`${array} is an array of strings in alphabetical order; and there was much rejoicing.   myeee yaa  mm`);
        }
    })
    return myPromise;   // spent about 20 minutes console logging before noticing I had ommited this line ~.~
} 

// Calling (testing)

makeAllCaps(arrayOfWords)
.then(sortWords)
.then((result) => console.log(result))
.catch(error => console.log(error))

makeAllCaps(complicatedArray)
.then(sortWords)
.then((result) => console.log(result))
.catch(error => console.log(error))