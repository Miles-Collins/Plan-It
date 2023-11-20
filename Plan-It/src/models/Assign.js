import { Schema } from "mongoose";

export const AssignSchema = new Schema({
  taskId: {type: Schema.Types.ObjectId, ref: 'Task', required: true},
  creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
}, { timestamps: true, toJSON: { virtuals: true }})

AssignSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

AssignSchema.virtual('task', {
  localField: 'taskId',
  foreignField: '_id',
  ref: 'Task',
  justOne: true
})
