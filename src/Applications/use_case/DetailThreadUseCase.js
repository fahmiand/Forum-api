const DetailThread = require('../../Domains/thread/entities/DetailThread')
const DetailComment = require('../../Domains/comment/entities/DetailComment')

class DetailThreadUseCase {
  constructor ({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository
    this._commentRepositorey = commentRepository
  }

  async execute (useCasePayload) {
    const thread = new DetailThread(useCasePayload)
    await this._threadRepository.verifyAvailableThread(thread)
    const detailThread = this._threadRepository.getDetailThread(thread)
    const detailComment = await this._commentRepositorey.getCommentThread(thread)
    detailThread.comment = new DetailComment({ comments: detailComment }).comment
    return {
      thread: detailThread
    }
  }
}

module.exports = DetailThreadUseCase
