class DeleteCommentUseCase {
  constructor ({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository
    this._threadRepository = threadRepository
  }

  async execute (useCasePayload) {
    await this._commentRepository.verifyCommentOwner(useCasePayload.id, useCasePayload.owner)
    await this._commentRepository.verifyCommentAtThread(useCasePayload.id, useCasePayload.thread)
    return await this._commentRepository.deleteComment(useCasePayload.id)
  }
}

module.exports = DeleteCommentUseCase
