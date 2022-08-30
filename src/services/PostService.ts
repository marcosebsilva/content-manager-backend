import { isValidObjectId } from 'mongoose';
import BaseModel from '../types/BaseService';
import InternalError from '../errors/InternalError';
import PostMongoose, { IPost } from '../models/PostModel';
import NotFoundError from '../errors/NotFoundError';
import InvalidIdFormatError from '../errors/InvalidIdFormatError';
import ValidationError from '../errors/ValidationError';

export default class PostService extends BaseModel<IPost> {
  private Model = PostMongoose;

  /** @override */
  public async create(obj: IPost): Promise<IPost | InternalError> {
    if (!obj.title) throw new ValidationError('Title is required.');

    if (obj.title.length > 100) throw new ValidationError('Title max length is 100.');
    const newPost = new this.Model(obj);

    try {
      await newPost.save();
    } catch (error: any) {
      console.log(error);
      throw InternalError;
    }

    return {
      _id: newPost.id,
      title: newPost.title,
      body: newPost.body,
      history: newPost.history,
      lastUpdated: newPost.lastUpdated,
      created: newPost.created,
    } as IPost;
  }

  /** @override */
  public async findOne(obj: Partial<IPost>): Promise<IPost | NotFoundError> {
    let post: IPost | null;
    try {
      post = await this.Model.findOne(obj);
    } catch (error: any) {
      throw InternalError;
    }

    if (!post) throw new NotFoundError();
    return post;
  }

  /** @override */
  public async findById(id: string): Promise<IPost | NotFoundError | InvalidIdFormatError> {
    let post: IPost | null;

    if (!isValidObjectId(id)) throw new InvalidIdFormatError();

    try {
      post = await this.Model.findById(id);
    } catch (error: any) {
      console.log(error);
      throw InternalError;
    }

    if (!post) throw new NotFoundError('Post not found.');

    return post!;
  }

  /** @override */
  public async getAll(): Promise<IPost[]> {
    try {
      const result = await this.Model.find({});
      return result;
    } catch {
      throw InternalError;
    }
  }

  /** @override */
  public async update(
    id: string,
    obj: Partial<IPost>,
  ): Promise<IPost | NotFoundError | InvalidIdFormatError> {
    let result: IPost | null;
    if (!isValidObjectId(id)) throw InvalidIdFormatError;

    const post = await this.Model.findById(id);

    if (!post) throw NotFoundError;

    if (obj.title) {
      post.title = obj.title;
    }

    if (obj.body) {
      post.body = obj.body;
    }

    try {
      result = await post.save();
    } catch (error: any) {
      console.log(error);
      throw InternalError;
    }

    return result!;
  }

  /** @override */
  public async remove(id: string): Promise<void | NotFoundError | InvalidIdFormatError> {
    if (!isValidObjectId(id)) throw InvalidIdFormatError;

    console.log(isValidObjectId);
    const post = this.Model.findById(id);
    if (!post) throw NotFoundError;

    try {
      await post.deleteOne();
    } catch (error: any) {
      console.log(error);
      throw InternalError;
    }
  }

  /** @override */
  public async find(obj: Partial<IPost>): Promise<IPost[]> {
    try {
      const post = await this.Model.find(obj);
      return post;
    } catch (error: any) {
      throw InternalError;
    }
  }
}
