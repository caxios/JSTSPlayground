import mongoose from "mongoose";

/**
 * Like in django, in order to use database we need model. And this modle is for
 * mongoose db.
 */

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  
  // User can have reference to multiple threads. 
  threads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },

  // Like 'threads' user can have reference to multiple communities.
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

// At very first time mongoose database won't have 'userSchema' data table, so
// mongoose.model("User", userSchema); this would be executed. After making very first table, then
// mongoose would able to call data table and store there. "userSchema" is named as "User", so we
// can access to 'userSchema'(data-table) like this -> mongoose.models.User
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
