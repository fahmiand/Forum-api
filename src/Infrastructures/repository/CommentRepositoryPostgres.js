const NotFoundError = require('../../Commons/exceptions/NotFoundError')
const CommentRepository = require('../../Domains/comment/CommentRepository')
const AddedComment = require('../../Domains/comment/entities/AddedComment')
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError')

class CommentRepositoryPostgres extends CommentRepository {
  constructor (pool, idGenerator) {
    super()
    this._pool = pool
    this._idGenerator = idGenerator
  }

  async addComment (addComment) {
    const { content, thread, owner } = addComment
    const id = `comment-${this._idGenerator()}`
    const createAt = new Date().toISOString()
    const updateAt = createAt

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5, $6) RETURNING id, content, owner',
      values: [id, thread, content, owner, createAt, updateAt]
    }

    const result = await this._pool.query(query)
    return new AddedComment(result.rows[0])
  }

  async verifycomment (commentId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new NotFoundError('id tidak ditemukan')
    }
  }

  async verifyCommentAtThread (commentId, threadId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1 AND thread_id = $2',
      values: [commentId, threadId]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new NotFoundError('id tidak ditemukan')
    }
  }

  async getCommentByThreadById (threadId) {
    const query = {
      text: `SELECT comments.id, users.username, comments.created_at as date, content, is_delete 
              FROM comments
              LEFT JOIN users ON users.id = comments.owner
              WHERE comments.thread_id = $1`,
      values: [threadId]
    }
    const result = await this._pool.query(query)
    return result.rows
  }

  async verifyCommentOwner (comment, owner) {
    const query = {
      text: 'SELECT content FROM comments WHERE id = $1 AND owner = $2 ',
      values: [comment, owner]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) {
      throw new AuthorizationError('anda tidak berhak mengakses ini')
    }
  }

  async deleteComment (id) {
    const query = {
      text: 'UPDATE comments SET is_delete = true WHERE id = $1',
      values: [id]
    }
    await this._pool.query(query)
  }
}

module.exports = CommentRepositoryPostgres
