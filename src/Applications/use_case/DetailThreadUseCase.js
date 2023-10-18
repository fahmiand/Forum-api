const DetailThread = require('../../Domains/thread/entities/DetailThread')
const DetailComment = require('../../Domains/comment/entities/DetailComment')
class DetailThreadUseCase {
  constructor ({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository
    this._commentRepositorey = commentRepository
  }

  async execute (useCasePayload) {
    const id = useCasePayload
    const { thread } = new DetailThread(id)
    await this._threadRepository.verifyAvailableThread(thread)
    const detailThread = await this._threadRepository.getDetailThread(thread)
    let comments = await this._commentRepositorey.getCommentByThreadById(thread)
    comments = comments.map((comment) => {
      const { id, username, date, content } = new DetailComment(comment)
      return { id, username, date, content }
    })
    return {
      ...detailThread,
      comments
    }
  }
}

module.exports = DetailThreadUseCase
