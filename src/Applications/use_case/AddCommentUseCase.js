const AddComment = require('../../Domains/comment/entities/AddComment')

class AddCommentUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const addComment = new AddComment(useCasePayload)
    await this._threadRepository.verifyAvailableThread(addComment.thread)
    return this._commentRepository.addComment(addComment)
  }
}

module.exports = AddCommentUseCase
