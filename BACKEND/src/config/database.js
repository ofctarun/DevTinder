import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect("mongodb+srv://ofc_tarun:12345@namastenode.7fvpwio.mongodb.net/Learning")
}
