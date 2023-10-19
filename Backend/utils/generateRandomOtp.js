const crypto = require("crypto");

function generateRandom() {
  return crypto.randomUUID();
}
  
  // Generate a random 6-digit numerical OTP based on a hashed value of Date.now(
let i = 0;
const mySet = new Set();
const n = 10000000;
while(i < n)
{
    mySet.add(generateRandom());
    i++;
}

console.log(mySet.size / n);

// for(let item of mySet)
// {
//     console.log(item);
// }

  
// module.exports = generateRandom6DigitOTP;