import mongoose from "mongoose";

const { Schema } = mongoose;

const SearchKayModelSchema = new Schema({
  providerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  search: [
    {
      key: { type: String, required: true },
      count: { type: Number, required: true, default: 0 },
    },
  ],
});

SearchKayModelSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

SearchKayModelSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

SearchKayModelSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

export default mongoose.model("searchkey", SearchKayModelSchema);
