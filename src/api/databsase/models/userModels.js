import mongoose from "mongoose";

const { Schema } = mongoose;

const UserModelSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false },
  providerId: { type: Number, required: true },
  providerType: { type: String, required: true },
});

UserModelSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

UserModelSchema.pre("update", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

UserModelSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: Date.now() } });
});

export default mongoose.model("user", UserModelSchema);
