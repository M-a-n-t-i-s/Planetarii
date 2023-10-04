import mongoose from "mongoose";

const FactorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    index: {
        type: String,
        require: true
    },
    host: {
        type: String,
        require: true
    }
})
export default mongoose.model("Factory", FactorySchema)