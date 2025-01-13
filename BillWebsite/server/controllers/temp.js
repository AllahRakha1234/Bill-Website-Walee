const bcrypt = require('bcryptjs');

bcrypt.hash('admin1122', 10, (err, hash) => {
  if (err) throw err;
  console.log('Re-hashed password:', hash);
});
