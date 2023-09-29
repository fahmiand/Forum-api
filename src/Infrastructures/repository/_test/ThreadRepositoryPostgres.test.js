const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
// const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const pool = require('../../database/postgres/pool')
const AddThread = require('../../../Domains/thread/entities/AddThread')
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres')
const AddedThread = require('../../../Domains/thread/entities/AddedThread')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    // await UsersTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('addThread function', () => {
    it('should persist add tread', async () => {
      const addThread = new AddThread({
        title: 'thread title',
        body: 'thread body',
        owner: 'user-123'
      })

      const fakeIdGenerator = () => '1234'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

      await threadRepositoryPostgres.addThread(addThread)

      const thread = await ThreadsTableTestHelper.findThreadById('thread-1234')
      expect(thread).toHaveLength(1)
    })

    it('should return added thread correctly', async () => {
      const addThread = new AddThread({
        title: 'thread title',
        body: 'thread body',
        owner: 'user-123'
      })

      const fakeIdGenerator = () => '123'
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator)

      const addedThreade = await threadRepositoryPostgres.addThread(addThread)

      expect(addedThreade).toStrictEqual(new AddedThread({
        id: 'thread-123',
        title: 'thread title',
        body: 'thread body',
        owner: 'user-123'
      }))
    })
  })

  describe('verifyAvailability function', () => {
    it('should throw NotFoundError if thread not available', async () => {
      const threadRepositorypostgres = new ThreadRepositoryPostgres(pool, {})

      await expect(threadRepositorypostgres.verifyAvailableThread('adc')).rejects.toThrow(NotFoundError)
    })
  })
})
