import { Schema } from "mongoose";

export const TaskSchema = new Schema({
  name: {type: String, required: true},
  weight: {type: Number, required: true},
  isComplete: {type: Boolean, default: false},
  completedOn: {type: Date},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
  sprintId: {type: Schema.Types.ObjectId, required: true, ref: 'Sprint'},
  projectId: {type: Schema.Types.ObjectId, required: true, ref: 'Project'},
  assignedTo: {type: Schema.Types.ObjectId, ref: 'Assign'}
}, { timestamps: true, toJSON: { virtuals: true }})

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

TaskSchema.virtual('sprint', {
  localField: 'sprintId',
  foreignField: '_id',
  justOne: true,
  ref: 'Sprint'
})

TaskSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})

TaskSchema.virtual('assign', {
  localField: '_id',
  foreignField: 'taskId',
  ref: 'Assign'
})
