import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import PostService from '../services/PostService';

const serviceController = new PostService();

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await serviceController.create(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error: any) {
    next(error);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  const { postId } = req.params;

  try {
    const post = await serviceController.findById(postId);
    res.status(StatusCodes.OK).json({ post });
  } catch (error) {
    next(error);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await serviceController.getAll();
    res.status(StatusCodes.OK).json({ posts });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  const { postId } = req.params;
  const { body, title } = req.body;

  try {
    const result = await serviceController.update(postId, {
      body,
      title,
    });

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  const { postId } = req.params;

  try {
    await serviceController.remove(postId);
    res.sendStatus(StatusCodes.OK);
  } catch (error) {
    next(error);
  }
}
