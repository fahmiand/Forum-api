const DetailThread = require('../../Domains/thread/entities/DetailThread')

class DetailThreadUseCase {
  constructor ({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository
    this._commentRepositorey = commentRepository
  }

  async execute (useCasePayload) {
    const { threadId } = useCasePayload
    await this._threadRepository.verifyAvailableThread(threadId)
    const thread = new DetailThread(useCasePayload)
    const comments = await this._commentRepositorey.getCommentByThreadById(thread)

    return {
      ...thread,
      comments
    }
  }
}

module.exports = DetailThreadUseCase
