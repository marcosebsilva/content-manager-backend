import chaiHttp from 'chai-http';
import PostModel from '../models/PostModel';
import app from '../api/app';
import chai, { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

describe("Post route", () => {
  describe("When creating a new post", () => {
    it("It is possible to create a post valid body", async() => {
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
  });
});