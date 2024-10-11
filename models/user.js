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