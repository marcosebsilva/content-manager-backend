import mongoose, { Document, Schema } from 'mongoose';

export interface IPost {
  title: string
  body: string
  history: IPostInHistory[]
}

/**
 *Represents the post in the history inside the database.
 *Should always be the whole {@link IPost} without the history array.
 */
interface IPostInHistory extends Omit<IPost, 'history'> {
  deprecatedTimestamp: Date
}

export interface IPostModel extends IPost, Document {
  lastUpdated: Date
  created: Date
}

/**
 * versionKey(__v) being set explicitly to allow the use of 'select' property
 * from mongoose to hide it from ordinary queries.
 */
const postSchema = new Schema<IPostModel>({
  title: {
    type: String,
    maxlength: [100, 'Max length allowed is 100.'],
    required: [true, 'Title is required.'],
  },
  body: {
    type: String,
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
  __v: {
    type: Number,
    select: false,
  },
  history: [{
    _id: false,
    title: { type: String },
    body: { type: String },
    deprecatedTimestamp: { type: Date, default: new Date() },
  }],
}, { timestamps: { createdAt: 'created', updatedAt: false } });

/** This hook is responsible for updating the
 * history if the document being saved is new.
 *
 * Async hooks does not need to call next().
 */
postSchema.pre('save', async function () {
  if (this.isNew) return;
  if (!this.isModified()) return;

  /**
    * Setting this explicitly allows lastUpdated key to be
    * exactly equal to deprecatedTimestamp date inside history.
    */
  const currentDate = new Date();
  this.lastUpdated = currentDate;

  const previousValue = await mongoose.models.Post.findOne(this._id);
  this.history.push({
    title: previousValue.title,
    body: previousValue.body,
    deprecatedTimestamp: currentDate,
  });
});

export default mongoose.model<IPostModel>('Post', postSchema);
