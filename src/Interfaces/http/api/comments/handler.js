const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase')
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase')

class CommentsHandler {
  constructor (container) {
    this._container = container

    this.postCommentHandler = this.postCommentHandler.bind(this)
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this)
  }

  async postCommentHandler (request, h) {
    const commentUseCase = this._container.getInstance(AddCommentUseCase.name)
    const { id: owner } = request.auth.credentials
    const { id: thread } = request.params
    const payload = {
      thread,
      content: request.payload.content,
      owner
    }

    const addedComment = await commentUseCase.execute(payload)
    const response = h.response({
      status: 'success',
      data: {
        addedComment
      }
    })
    response.code(201)
    return response
  }

  async deleteCommentHandler (request, h) {
    const commentUseCase = this._container.getInstance(DeleteCommentUseCase.name)
    const { id: owner } = request.auth.credentials
    const { threadId, commentId } = request.params
    const payload = {
      commentId,
      threadId,
      owner
    }
    await commentUseCase.execute(payload)
    return {
      status: 'success'
    }
  }
}

module.exports = CommentsHandler
