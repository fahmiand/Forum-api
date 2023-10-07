const AddComment = require('../../Domains/comment/entities/AddComment')

class AddCommentUseCase {
  constructor ({ commentRepository }) {
    this._commentRepository = commentRepository
  }

  async execute (useCasePayload) {
    const addComment = new AddComment(useCasePayload)
    return this._commentRepository.addComment(addComment)
  }
}

module.exports = AddCommentUseCase
