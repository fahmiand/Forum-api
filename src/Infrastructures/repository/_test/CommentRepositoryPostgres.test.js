const CommentRepositoryPostgres = require('../CommentRepositoryPostgres')
const AddedComment = require('../../../Domains/comment/entities/AddedComment')
const AddComment = require('../../../Domains/comment/entities/AddComment')
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const pool = require('../../database/postgres/pool')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError')

describe('commentRepository', () => {
  afterEach(async () => {
    await UsersTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('verifyAvailableComment function', () => {
    it('should throw NotFoundError when comment not available ', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await expect(commentRepositoryPostgres.verifycomment('xxx')).rejects.toThrow(NotFoundError)
    })

    it('should not throw notFoundError when comment not available', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi',
        fullname: 'fahmi andrian'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'sebuah comment',
        owner: 'user-123',
        thread: 'thread-h_123'
      })

      await expect(commentRepositoryPostgres.verifycomment('comment-123')).resolves.not.toThrow(NotFoundError)
    })

    it('should throw Authorizationerror when comment not owner', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi',
        fullname: 'fahmi andrian'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'sebuah comment',
        owner: 'user-123',
        thread: 'thread-h_123'
      })

      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-986')).rejects.toThrowError(AuthorizationError)
    })

    it('should not throw AuthorizationError when comment not owner', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi',
        fullname: 'fahmi andrian'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        threadId: 'thread-h_123',
        owner: 'user-123'
      })

      await expect(commentRepositoryPostgres.verifycomment('comment-123')).resolves.not.toThrow(NotFoundError)
      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-123')).resolves.not.toThrow(AuthorizationError)
    })
  })

  describe('verifyCommentAtThread function', () => {
    it('should throw NotFoundError when comment not available', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await expect(commentRepositoryPostgres.verifyCommentAtThread('xxx', 'xxx')).rejects.toThrow(NotFoundError)
    })

    it('should throw not throw notFoundError when comment not available', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        owner: 'user-123',
        thread: 'thread-h_123'
      })
      await expect(commentRepositoryPostgres.verifyCommentAtThread('comment-123', 'thread-h_453')).rejects.toThrow(NotFoundError)
      await commentRepositoryPostgres.getCommentByThreadById('comment-123', 'thread-h_453')
    })

    it('should not throw NotFoundError when comment not owner', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({ id: 'user-123' })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        thread: 'thread-h_123',
        owner: 'user-123'
      })
      await expect(commentRepositoryPostgres.verifyCommentAtThread('comment-123', 'thread-h_123')).resolves.not.toThrowError(NotFoundError)
    })
  })

  describe('addComment function', () => {
    it('should persist add comment', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi',
        fullname: 'fahmi andrian'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      const addComment = new AddComment({
        thread: 'thread-h_123',
        owner: 'user-123',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
      })

      const fakeIdGenerator = () => '123'
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator)

      await commentRepositoryPostgres.addComment(addComment)

      const comment = await CommentsTableTestHelper.findCommentById('comment-123')
      expect(comment).toHaveLength(1)
    })
    it('should retrun added comments correctly', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi',
        fullname: 'fahmi andrian'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      const addComment = new AddComment({
        thread: 'thread-h_123',
        content: 'sebuah comment',
        owner: 'user-123'
      })

      const fakeIdGenerator = () => '123'
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator)

      const addedComment = await commentRepositoryPostgres.addComment(addComment)

      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        thread: 'thread-123',
        content: 'sebuah comment',
        owner: 'user-123'
      }))
    })
  })
  describe('deleteComment function', () => {
    it('should throw NotFoundError when comment not available', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await expect(commentRepositoryPostgres.verifycomment('comment-123')).rejects.toThrow(NotFoundError)
    })

    it('should not throw NotFoundError when comment available', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi',
        fullname: 'fahmi andrian'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        thread: 'thread-h_123',
        owner: 'user-123'
      })
      expect(commentRepositoryPostgres.verifycomment('comment-123')).resolves.not.toThrow(NotFoundError)
    })

    it('should throw AuthorizationError when comment not owner', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi',
        fullname: 'fahmi andrian'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        thread: 'thread-h_123',
        owner: 'user-123'
      })
      await expect(commentRepositoryPostgres.verifyCommentOwner('user-986')).rejects.toThrowError(AuthorizationError)
    })

    it('should not throw AuthorizationError when comment not owner', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi',
        fullname: 'fahmi andrian'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        thread: 'thread-h_123',
        owner: 'user-123'
      })
      await expect(commentRepositoryPostgres.verifycomment('comment-123')).resolves.not.toThrow(NotFoundError)
      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-123')).resolves.not.toThrow(AuthorizationError)
    })
    it('should delete comment from database', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi',
        fullname: 'fahmi andrian'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        content: 'sebuah comment',
        thread: 'thread-h_123',
        owner: 'user-123'
      })

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await commentRepositoryPostgres.deleteComment('comment-123')

      const comments = await commentRepositoryPostgres.getCommentByThreadById('thread-h_123')
      expect(comments).toHaveLength(1)
      expect(comments[0].is_delete).toEqual(true)
      expect(comments).toEqual([
        {
          id: 'comment-123',
          date: expect.any(String),
          content: 'sebuah comment',
          username: 'fahmi',
          is_delete: true
        }
      ])
    })
  })

  describe('getComment function', () => {
    it('should getComment form databse', async () => {
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {})
      await UsersTableTestHelper.addUser({ id: 'user-123' })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        owner: 'user-123'
      })
      await CommentsTableTestHelper.addComment({
        id: 'comment-123',
        owner: 'user-123',
        content: 'sebuah comment',
        thread: 'thread-h_123'
      })

      const result = await commentRepositoryPostgres.getCommentByThreadById('thread-h_123')
      expect(result).toEqual(
        [
          {
            id: 'comment-123',
            date: expect.any(String),
            content: 'sebuah comment',
            username: 'dicoding',
            is_delete: false
          }
        ])
    })
  })
})
