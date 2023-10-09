const DetailThread = require('../../Domains/thread/entities/DetailThread')
class DetailThreadUseCase {
  constructor ({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository
    this._commentRepositorey = commentRepository
  }

  async execute (useCasePayload) {
    const id = useCasePayload
    const thread = new DetailThread(id)
    await this._threadRepository.verifyAvailableThread(thread)
    const detailThread = await this._threadRepository.getDetailThread(thread)
    const comments = await this._commentRepositorey.getCommentByThreadById(thread)

    console.log(detailThread)
    return {
      ...detailThread,
      comments
    }
  }
}

module.exports = DetailThreadUseCase
