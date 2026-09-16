import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
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
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB!");
    
    const User = mongoose.model('User', userSchema);
    const Profile = mongoose.model('Profile', ProfileSchema);
    
    const email = 'demo@scheme-setu.com';
    const password = 'DemoPassword123!';
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword, role: 'admin' });
      await user.save();
      console.log("Demo user created in MongoDB!");
    } else {
      console.log("Demo user already exists in MongoDB!");
      user.role = 'admin';
      await user.save();
    }
    
    // Ensure profile exists
    let profile = await Profile.findOne({ userId: user._id });
    if (!profile) {
      profile = new Profile({
        userId: user._id,
        age: 25,
        state: 'Delhi',
        gender: 'Male',
        category: 'General',
        income: 'Below ₹1,00,000'
      });
      await profile.save();
      console.log("Demo profile created!");
    }
    
    console.log("\nYou can now login with:");
    console.log("Email:", email);
    console.log("Password:", password);
    
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
