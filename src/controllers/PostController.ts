import PostModel, { IPost } from "../models/PostModel";
import { Request, Response, NextFunction } from "express";
import NotFoundError from "../errors/NotFoundError";
import BaseCrudController from "./BaseCrudController";
import { StatusCodes } from 'http-status-codes';
import { isValidObjectId } from "mongoose";
import InvalidObjectIdError from "../errors/InvalidObjectIdError";

class PostController implements BaseCrudController<IPost> {
  /** @override */
  public async create(req: Request, res: Response, next: NextFunction) {
    const {
        body,
        title,
      } = req.body;

    const post = new PostModel({
      body,
      title
    });

    try {
      const { title, body, _id } = await post.save();
      res.status(StatusCodes.CREATED).json({ title, body, _id });
    } catch(error: any) {
      next(error);
    }
  }
  /** @override */
  public async getOne(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;

    try {
      if(!isValidObjectId(postId)) throw new InvalidObjectIdError();

      const post = await PostModel.findById(postId);
      if(!post) throw new NotFoundError("Post not found.");

      res.status(StatusCodes.OK).json({ post });
    } catch(error) {
      next(error);
    }
  }
  /** @override */
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostModel.find({});

    res.status(StatusCodes.OK).json({ posts });
    } catch(error) {
      next(error);
    }
  }
  /** @override */
  public async update(req: Request, res: Response, next: NextFunction) {
    const { postId }= req.params;
    const { body: newBody, title: newTitle } = req.body;

    try {
      if(!isValidObjectId(postId)) throw new InvalidObjectIdError();
      const post = await PostModel.findById(postId);
      
      if(!post) throw new NotFoundError("Post not found.");

      await post.set({
        body: newBody,
        title: newTitle
      });

      const { title, body, _id } = await post.save();

      res.status(StatusCodes.OK).json({title, _id, body});
    } catch(error) {
      next(error);
    }
  }
  /** @override */
  public async delete(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;

    try {
      if(!isValidObjectId(postId)) throw new InvalidObjectIdError();
      const post = await PostModel.findById(postId);

      if(!post) throw new NotFoundError("Post not found.");

      await post.delete();
      res.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  }
}

export default PostController;