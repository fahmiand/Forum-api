const DetailThread = require('../../Domains/thread/entities/DetailThread')
const DetailComment = require('../../Domains/comment/entities/DetailComment')
class DetailThreadUseCase {
  constructor ({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository
    this._commentRepositorey = commentRepository
  }

  async execute (useCasePayload) {
    const threadId = useCasePayload
    await this._threadRepository.verifyAvailableThread(threadId)
    const thread = new DetailThread(threadId)
    const threadcomment = new DetailComment(threadId)
    const detailThread = await this._threadRepository.getDetailThread(thread)
    const comments = await this._commentRepositorey.getCommentByThreadById(threadcomment)

    return {
      ...detailThread,
      comments
    }
  }
}

module.exports = DetailThreadUseCase
