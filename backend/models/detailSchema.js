import mongoose from "mongoose";

const Schema = mongoose.Schema;

const detailSchema = new Schema ({
    mobileNo: {
        type: String,
        minLength: [10, "no should have minimum 10 digits"],
        maxLength: [10, "no should have maximum 10 digits"],
        match: [/\d{10}/, "no should only have digits"]
    }

})

export default mongoose.model("Detail", detailSchema);