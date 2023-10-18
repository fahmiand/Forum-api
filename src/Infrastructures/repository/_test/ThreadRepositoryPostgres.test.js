const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const pool = require('../../database/postgres/pool')
const AddThread = require('../../../Domains/thread/entities/AddThread')
const AddedThread = require('../../../Domains/thread/entities/AddedThread')
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('verifyAvailableThread function', () => {
    it('should throw NotFoundError when thread not available', async () => {
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

      await expect(threadRepositoryPostgres.verifyAvailableThread('xxx')).rejects.toThrow(NotFoundError)
    })

    it('should not throw InvarianError when thread available', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread_h-123',
        title: 'sebuah thread',
        body: 'sebuah thread',
        owner: 'user-123'
      })
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})

      await expect(threadRepositoryPostgres.verifyAvailableThread('thread_h-123')).resolves.not.toThrowError(NotFoundError)
    })
  })

  describe('addThread function', () => {
    it('should persist add tread', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi'
      })
      const addThread = new AddThread({
        title: 'thread title',
        body: 'thread body',
        owner: 'user-123'
      })

      const fakeIdGenerator = () => '1234'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

      await threadRepositoryPostgres.addThread(addThread)

      const thread = await ThreadsTableTestHelper.findThreadById('thread-h_1234')
      expect(thread).toHaveLength(1)
    })

    it('should return added thread correctly', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi',
        password: 'fahmi'
      })
      const addThread = new AddThread({
        title: 'thread title',
        body: 'thread body',
        owner: 'user-123'
      })

      const fakeIdGenerator = () => '123'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

      const addedThreade = await threadRepositoryPostgres.addThread(addThread)

      expect(addedThreade).toStrictEqual(new AddedThread({
        id: 'thread-h_123',
        title: 'thread title',
        body: 'thread body',
        owner: 'user-123'
      }))
    })
  })
  describe('GetThread function', () => {
    it('should return response 200', async () => {
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'fahmi'
      })
      await ThreadsTableTestHelper.addThread({
        id: 'thread-h_123',
        title: 'thread title',
        body: 'thread body',
        owner: 'user-123'
      })
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {})
      const result = await threadRepositoryPostgres.getDetailThread('thread-h_123')
      expect(result).toStrictEqual({
        id: 'thread-h_123',
        title: 'thread title',
        body: 'thread body',
        date: expect.any(String),
        username: 'fahmi'
      })
    })
  })
})
