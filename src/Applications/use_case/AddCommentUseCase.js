const AddComment = require('../../Domains/comment/entities/AddComment')

class AddCommentUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const addComment = new AddComment(useCasePayload)
    const thread = useCasePayload.thread
    await this._threadRepository.verifyAvailableThread(thread)
    return this._commentRepository.addComment(addComment)
  }
}

module.exports = AddCommentUseCase
