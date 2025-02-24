import mongoose from "mongoose";

const organizerSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    hackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }]
}, { timestamps: true });

const Organizer = mongoose.model("Organizer", organizerSchema);
export default Organizer;