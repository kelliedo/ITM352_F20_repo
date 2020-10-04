// Rewrite the program from Exercise 1 to stop when the square root of your age 
// (or the next integer higher, if this value is not an integer) is reached. 
// The program must calculate this stopping value—you can not hard-code it and you 
// can not assume that the square root of your age will be an integer.

age_count = 1; //start the age count 
age = 20;
while (age_count < Math.sqrt(age)) {
    console.log(`age ${age_count}`)
    age_count++;
}
console.log(`Kellie is ${age_count} years old`);