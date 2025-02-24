import mongoose from "mongoose";

const HackathonSchema = new mongoose.Schema({
   // image:{type:String,required:true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    problemStatement: { type: String, required: true },
    teamSize: { type: Number, required: true },
    prizes: [{ type: String }],
    startDate: { type: Date, required: true }, 
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "Organizer" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Participant" }]
}, { timestamps: true });


const Hackathon = mongoose.model("Hackathon", HackathonSchema);
export default Hackathon;