import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  age: Number,
  gender: String,
  state: String,
  category: String,
  income: String,
  occupation: String,
  education: String,
  degree: String,
  isDisabled: Boolean,
  isMinority: Boolean,
  isBPL: Boolean,
});

async function seed() {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is required in your environment variables');
    }

    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        'Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in the environment. Demo credentials are no longer hardcoded.'
      );
    }
    if (password.length < 8) {
      throw new Error('SEED_ADMIN_PASSWORD must be at least 8 characters');
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB!');

    const User = mongoose.model('User', userSchema);
    const Profile = mongoose.model('Profile', ProfileSchema);

    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
      });
      await user.save();
      console.log('Admin user created.');
    } else {
      user.role = 'admin';
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      console.log('Existing user promoted to admin and password updated.');
    }

    let profile = await Profile.findOne({ userId: user._id });
    if (!profile) {
      profile = new Profile({
        userId: user._id,
        age: 25,
        state: 'Delhi',
        gender: 'Male',
        category: 'General',
        income: '100000',
      });
      await profile.save();
      console.log('Admin profile created.');
    }

    console.log('\nAdmin ready. Login with SEED_ADMIN_EMAIL (password not printed).');
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit(process.exitCode || 0);
  }
}

seed();
