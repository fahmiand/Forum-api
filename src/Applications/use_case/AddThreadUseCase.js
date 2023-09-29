const AddThread = require('../../Domains/thread/entities/AddThread')

class AddThreadUseCase {
  constructor ({ threadRepository }) {
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const addThread = new AddThread(useCasePayload)
    return this._threadRepository.addThread(addThread)
  }
}

module.exports = AddThreadUseCase
