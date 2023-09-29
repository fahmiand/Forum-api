const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const ThreadRepository = require('../../Domains/thread/ThreadRepository')
const AddedThread = require('../../Domains/thread/entities/AddedThread')

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor (pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addThread (addThread) {
    const { title, body, owner } = addThread
    const id = `thread-${this._idGenerator()}`

    const createAt = new Date().toISOString()
    const updateAt = createAt

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title, owner',
      values: [id, title, body, owner, createAt, updateAt]
    }

    const result = await this._pool.query(query)

    return new AddedThread({ ...result.rows[0] })
  }

  async verifyAvailableThread (id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    if (result.rowCount === 0) {
      throw new NotFoundError('id tidak ditemukan!')
    }
  }

  async getDetailThread (id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id]
    }

    const result = await this._pool.query(query)

    return result.rows
  }
}

module.exports = ThreadRepositoryPostgres