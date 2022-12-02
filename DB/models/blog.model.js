import { Schema, model, Types } from 'mongoose'

const blogSchema = new Schema({
    video: { type: String},
    title: {
        type: String,
        required: true
    },
    description:String,
    createdBy: { type: Types.ObjectId, required: true, ref: 'User' },
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    unlike: [{ type: Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
    totalCount: { type: Number, default: 0 },
    pictures: Array
}, {
    timestamps: true
})

blogSchema.post('updateOne', { document: true, query: false },async() =>{
    console.log("updating");
    this.totalCount=this.likes.length-this.unlike.length
  });

export const blogModel = model('Blog',blogSchema)