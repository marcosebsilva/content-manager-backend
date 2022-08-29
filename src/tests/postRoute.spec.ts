import chaiHttp from 'chai-http';
import PostModel from '../models/PostModel';
import app from '../api/app';
import chai, { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';

chai.use(chaiHttp);

describe("Post route", () => {
  describe("1. When creating a new post", () => {
    it("it is possible to create a post with a valid request body", async() => {
      const validPost = {
        title: "Valid title",
        body: "Valid post"
      }

      const response = await chai.request(app)
        .post('/posts')
        .send(validPost);

      expect(response).to.have.status(StatusCodes.CREATED);
      expect(response.body).to.have.all.keys(
        "title",
        "_id",
        "body");
    });
    it("fails if the body quest is missing the title key", async() => {
      const postWithoutTitle = {
        body: "Valid post"
      }

      const response = await chai.request(app)
        .post('/posts')
        .send(postWithoutTitle);

      expect(response).to.have.status(StatusCodes.BAD_REQUEST);
      expect(response.body.errors).to.deep.include({
        key: "title",
        message: "Title is required."
      });
    });
    it("fails if the body request 'title' key has more than 100 characters", async() => {
      let bigString: string = "";

      while(bigString.length <= 100) {
        bigString += "a";
      }

      const postWithBigTitle = {
        title: bigString,
        body: "valid body"
      }

      const response = await chai.request(app)
        .post('/posts')
        .send(postWithBigTitle);


      expect(response).to.have.status(StatusCodes.BAD_REQUEST);
      expect(response.body.errors).to.deep.include({
        key: "title",
        message: "Max length allowed is 100."
      });
    });
  });
  describe("2. When retrieving a single post", () => {
    it("fails if the id passed is invalid", async () => {
      const response = await chai.request(app)
        .get('/posts/notvalidobjectid');

      expect(response).to.have.status(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(response.body).to.be.deep.equal({message: "Invalid id format."});
    });
    it("fails if the post passed is not found", async () => {
      const validId = new Types.ObjectId().toString();
      const response = await chai.request(app)
        .get(`/posts/${validId}`);

      expect(response).to.have.status(StatusCodes.NOT_FOUND);
      expect(response.body).to.be.deep.equal({message: "Post not found."});
    });
    it("it possible to find an existing post", async () => {
      const newPost = new PostModel({
        title: "new post",
        body: "new post"
      });

      const { _id: newPostObjectId } = await newPost.save();

      const response = await chai.request(app)
        .get(`/posts/${newPostObjectId}`);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.body.post).to.have.all.keys(
        "_id",
        "body",
        "created",
        "history",
        "lastUpdated",
        "title"
      );
    });
  });
});