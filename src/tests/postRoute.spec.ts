import chaiHttp from 'chai-http';
import PostModel from '../models/PostModel';
import app from '../api/app';
import chai, { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

describe("Post route", () => {
  describe("1.When using valid data", () => {
    it("1. It is possible to create a post and returns the expected object", async() => {
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
  })
});