import { Schema } from "mongoose";

export const SprintSchema = new Schema({
  name: {type: String, required: true, maxlength: 50},
  isOpen: {type: Boolean, default: false},
  weight: {type: Number, default: 0},
  projectId: {type: Schema.Types.ObjectId, required: true, ref: "Project"},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
}, { timestamps: true, toJSON: { virtuals: true }})

SprintSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  ref: "Project",
  justOne: true
})

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

SprintSchema.virtual('tasks', {
  localField: '_id',
  foreignField: 'sprintId',
  ref: 'Task',
  justOne: false
})

