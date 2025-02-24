import mongoose from "mongoose";
const registrationSchema = new mongoose.Schema({
    hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon", required: true },
    teamName: { type: String, required: true, unique: true },
    teamLead: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    teamMembers: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
      },
    ],
    isRegisterd: {type: Boolean, default: false},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  });
  
  export const Registration = mongoose.model("Registration", registrationSchema);
  