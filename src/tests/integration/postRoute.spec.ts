import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
import app from '../../api/app';
import PostModel from '../../models/PostModel';

chai.use(chaiHttp);

describe('Post route', () => {
  describe('1.When creating a new post', () => {
    afterEach(async () => {
      await PostModel.deleteMany({});
    });
    it('it is possible to create a post with a valid request body', async () => {
      const validPost = {
        title: 'Valid title',
        body: 'Valid post',
      };

      const response = await chai.request(app)
        .post('/posts')
        .send(validPost);

      expect(response).to.have.status(StatusCodes.CREATED);
      expect(response.body).to.have.all.keys(
        'title',
        '_id',
        'body',
      );
    });
    it('fails if the body quest is missing the title key', async () => {
      const postWithoutTitle = {
        body: 'Valid post',
      };

      const response = await chai.request(app)
        .post('/posts')
        .send(postWithoutTitle);

      expect(response).to.have.status(StatusCodes.BAD_REQUEST);
      expect(response.body.errors).to.deep.include({
        key: 'title',
        message: 'Title is required.',
      });
    });
    it("fails if the body request 'title' key has more than 100 characters", async () => {
      let bigString: string = '';

      while (bigString.length <= 100) {
        bigString += 'a';
      }

      const postWithBigTitle = {
        title: bigString,
        body: 'valid body',
      };

      const response = await chai.request(app)
        .post('/posts')
        .send(postWithBigTitle);

      expect(response).to.have.status(StatusCodes.BAD_REQUEST);
      expect(response.body.errors).to.deep.include({
        key: 'title',
        message: 'Max length allowed is 100.',
      });
    });
  });
  describe('2.When retrieving a single post', () => {
    it('returns status UNPROCESSABLE_ENTITY if the id format is invalid', async () => {
      const response = await chai.request(app)
        .get('/posts/notvalidobjectid');

      expect(response).to.have.status(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(response.body).to.be.deep.equal({ message: 'Invalid id format.' });
    });
    it('returns status NOT_FOUND and the expected message if id is not found', async () => {
      const validId = new Types.ObjectId().toString();
      const response = await chai.request(app)
        .get(`/posts/${validId}`);

      expect(response).to.have.status(StatusCodes.NOT_FOUND);
      expect(response.body).to.be.deep.equal({ message: 'Post not found.' });
    });
    it('returns status OK and the expected object if post is found', async () => {
      const newPost = new PostModel({
        title: 'new post',
        body: 'new post',
      });

      const { _id: newPostObjectId } = await newPost.save();

      const response = await chai.request(app)
        .get(`/posts/${newPostObjectId}`);

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.body.post).to.have.all.keys(
        '_id',
        'body',
        'created',
        'history',
        'lastUpdated',
        'title',
      );
    });
  });
  describe('3.When updating a post', () => {
    let newPostObjectId: string;
    let titleInNewPostCreation: string;

    before(async () => {
      const newPost = new PostModel({
        title: 'new post',
        body: 'new post',
      });

      const { _id: id, title } = await newPost.save();
      newPostObjectId = id.toString();
      titleInNewPostCreation = title;
    });

    after(async () => {
      await PostModel.deleteMany({});
    });

    it('returns status UNPROCESSABLE_ENTITY if the id format is invalid', async () => {
      const response = await chai.request(app)
        .get('/posts/notvalidobjectid');

      expect(response).to.have.status(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(response.body).to.be.deep.equal({ message: 'Invalid id format.' });
    });
    it('returns status NOT_FOUND and the expected message if id is not found', async () => {
      const validId = new Types.ObjectId().toString();
      const response = await chai.request(app)
        .get(`/posts/${validId}`);

      expect(response).to.have.status(StatusCodes.NOT_FOUND);
      expect(response.body).to.be.deep.equal({ message: 'Post not found.' });
    });
    it('return status OK and the expected object if post is successfully updated', async () => {
      const newTitle = 'random title';

      const response = await chai.request(app)
        .patch(`/posts/${newPostObjectId}`)
        .send({ title: newTitle });

      expect(response).to.have.status(StatusCodes.OK);
      expect(response.body).to.deep.equal({
        title: newTitle,
        _id: newPostObjectId,
      });
    });
    it('contains the previous post inside the history', async () => {
      const response = await chai.request(app)
        .get(`/posts/${newPostObjectId}`);

      const oldTitleFromNewPost = response.body.post.history[0].title;
      expect(oldTitleFromNewPost).to.be.deep.equal(titleInNewPostCreation);
    });
  });
  describe('4.When deleting a post', async () => {
    it('returns status UNPROCESSABLE_ENTITY if the id format is invalid', async () => {
      const response = await chai.request(app)
        .get('/posts/notvalidobjectid');

      expect(response).to.have.status(StatusCodes.UNPROCESSABLE_ENTITY);
      expect(response.body).to.be.deep.equal({ message: 'Invalid id format.' });
    });
    it('returns status NOT_FOUND and the expected message if id is not found', async () => {
      const validId = new Types.ObjectId().toString();
      const response = await chai.request(app)
        .get(`/posts/${validId}`);

      expect(response).to.have.status(StatusCodes.NOT_FOUND);
      expect(response.body).to.be.deep.equal({ message: 'Post not found.' });
    });
    it('returns status OK if post is successfully deleted.', async () => {
      const validPost = {
        title: 'Valid title',
        body: 'Valid post',
      };

      const { body: { _id: createdPostId } } = await chai.request(app)
        .post('/posts')
        .send(validPost);

      const deletePostResponse = await chai.request(app)
        .delete(`/posts/${createdPostId}`);

      expect(deletePostResponse).to.have.status(StatusCodes.OK);
    });
  });
});
