import mongoose from "mongoose";
const submissionSchema = new mongoose.Schema({
    hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon", required: true },
    registrationId: { type: mongoose.Schema.Types.ObjectId, ref: "Registration", required: true },
    projectDetails: {
      githubLink: { type: String, required: true },
      liveDemoLink: { type: String, required: true },
      multimediaAttachments: [{ type: String }], // URLs or paths to files
      description: { type: String, required: true },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  });
  
  export const Submission = mongoose.model("Submission", submissionSchema);
  