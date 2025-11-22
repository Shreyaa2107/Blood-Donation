require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const pwHash = await bcrypt.hash('shreya@21', 10);
    const u = new User({ username: 'shreya', passwordHash: pwHash });
    await u.save();
    console.log('Admin created: admin / admin123');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
