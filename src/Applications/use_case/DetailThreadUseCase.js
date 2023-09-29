const DetailThread = require('../../Domains/thread/entities/DetailThread')

class DetailThreadUseCase {
  constructor ({ threadRepository }) {
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const detailThread = new DetailThread(useCasePayload)
    return this._threadRepository.getDetailThread(detailThread)
  }
}

module.exports = DetailThreadUseCase
