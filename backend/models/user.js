import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

//hashing the password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); //this line is essential to prevent uncessary hashing

  try {
    const salt = await bcrypt.genSalt(10); // salt is a random string that is used to hash the password
    //this.password is the password field in the UserSchema
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
}; //UserSchema.methods.comparePassword means this is a method that compares a given password with the user's hashed password.
//method means it can be called on instances of the User model

const User = mongoose.model("User", UserSchema);
export default User;
