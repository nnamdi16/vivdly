const bcrypt = require('bcrypt');

//Hashing algorithm is one way
//A Salt is a random string that is added before or after the password making resulting password different each time based on the Salt that is used.

//The higher the number the longer it will take to generate the salt, so the salt will be more harder and complex to break.

const run = async () => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('1234',salt);
  console.log(salt);
  console.log(hashed);
};

run();