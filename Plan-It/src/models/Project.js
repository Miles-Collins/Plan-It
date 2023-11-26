import { Schema } from "mongoose";

export const ProjectSchema = new Schema({
  name: {type: String, required: true, maxlength: 25},
  description: {type: String, required: true, minlength: 5, maxlength: 500},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"}
}, { timestamps: true, toJSON: { virtuals: true }})

ProjectSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  ref: "Account",
  justOne: true
})

ProjectSchema.virtual("sprints", {
  localField: '_id',
  foreignField: 'projectId',
  ref: 'Sprint',
  justOne: false
})
