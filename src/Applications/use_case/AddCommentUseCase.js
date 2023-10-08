const AddComment = require('../../Domains/comment/entities/AddComment')

class AddCommentUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const addComment = new AddComment(useCasePayload)
    await this._commentRepository.verifyAvailableComment(addComment.id)
    return this._commentRepository.addComment(addComment)
  }
}

module.exports = AddCommentUseCase
