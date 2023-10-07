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
      await expect(commentRepositoryPostgres.verifyAvailableComment('xxx')).rejects.toThrow(NotFoundError)
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

      await expect(commentRepositoryPostgres.verifyAvailableComment('comment-123')).resolves.not.toThrow(NotFoundError)
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

      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-123')).resolves.not.toThrow(NotFoundError)
      await expect(commentRepositoryPostgres.verifyCommentOwner('comment-123', 'user-123')).resolves.not.toThrow(AuthorizationError)
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
})
