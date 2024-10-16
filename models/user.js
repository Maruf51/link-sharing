import mongoose, { models } from "mongoose"

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required']
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  image: {
    type: String,
    required: false,
    default: null
  },
  uid: {
    type: String,
    required: [true, 'UID is required']
  },
  links: {
    type: Array,
    required: false
  },
  saved: {
    type: [String],
    required: false,
    default: []
  },
  access: {
    type: String,
    default: 'public'
  }
}, {
  timestamps: true,
  versionKey: false
});

const User = models.User || mongoose.model('User', userSchema)

export default User;