import { Schema } from "mongoose";

export const NoteSchema = new Schema({
  body: {type: String, required: true},
  taskId: {type: Schema.Types.ObjectId, required: true, ref: "Task"},
  projectId: {type: Schema.Types.ObjectId, required: true, ref: "Project"},
  creatorId: {type: Schema.Types.ObjectId, required: true, ref: "Account"}
}, { timestamps: true, toJSON: { virtuals: true }})

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})

NoteSchema.virtual('project', {
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
  ref: 'Project'
})

NoteSchema.virtual('task', {
  localField: 'taskId',
  foreignField: '_id',
  ref: "Task",
  justOne: true
})
