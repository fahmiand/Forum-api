const DeleteComment = require('../../Domains/comment/entities/DeleteComment')
class DeleteCommentUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    const { commentId, threadId, owner } = new DeleteComment(useCasePayload)
    await this._commentRepository.verifycomment(commentId)
    await this._commentRepository.verifyCommentOwner(commentId, owner)
    await this._commentRepository.verifyCommentAtThread(commentId, threadId)
    await this._commentRepository.deleteComment(commentId)
  }
}

module.exports = DeleteCommentUseCase
