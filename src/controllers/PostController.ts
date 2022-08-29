import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValidObjectId } from 'mongoose';
import PostModel from '../models/PostModel';
import NotFoundError from '../errors/NotFoundError';
import BaseCrudController from './BaseCrudController';
import InvalidObjectIdError from '../errors/InvalidObjectIdError';

class PostController extends BaseCrudController {
  /** @override */
  public static async create(req: Request, res: Response, next: NextFunction) {
    const {
      body,
      title,
    } = req.body;

    const post = new PostModel({
      body,
      title,
    });

    try {
      const savedPost = await post.save();
      res.status(StatusCodes.CREATED).json({
        title: savedPost.title,
        _id: savedPost._id,
        body: savedPost.body,
      });
    } catch (error: any) {
      next(error);
    }
  }

  /** @override */
  public static async getOne(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;

    try {
      if (!isValidObjectId(postId)) throw new InvalidObjectIdError();

      const post = await PostModel.findById(postId);
      if (!post) throw new NotFoundError('Post not found.');

      res.status(StatusCodes.OK).json({ post });
    } catch (error) {
      next(error);
    }
  }

  /** @override */
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostModel.find({});

      res.status(StatusCodes.OK).json({ posts });
    } catch (error) {
      next(error);
    }
  }

  /** @override */
  public static async update(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { body: newBody, title: newTitle } = req.body;

    try {
      if (!isValidObjectId(postId)) throw new InvalidObjectIdError();
      const post = await PostModel.findById(postId);

      if (!post) throw new NotFoundError('Post not found.');

      await post.set({
        body: newBody,
        title: newTitle,
      });

      const updatedPost = await post.save();

      res.status(StatusCodes.OK).json({
        title: updatedPost.title,
        _id: updatedPost._id,
        body: updatedPost.body,
      });
    } catch (error) {
      next(error);
    }
  }

  /** @override */
  public static async delete(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;

    try {
      if (!isValidObjectId(postId)) throw new InvalidObjectIdError();
      const post = await PostModel.findById(postId);

      if (!post) throw new NotFoundError('Post not found.');

      await post.delete();
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}

export default PostController;
