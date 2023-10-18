const CommentRepository = require('../../../Domains/comment/CommentRepository')
const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const DeleteCommentUseCase = require('../DeleteCommentUseCase')

describe('deleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    const useCasePayload = {
      commentId: 'comment-123',
      threadId: 'thread-h_123',
      owner: 'user-123'
    }

    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()

    mockCommentRepository.verifycomment = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.verifyCommentOwner = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.verifyCommentAtThread = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve())

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    })

    await deleteCommentUseCase.execute(useCasePayload)
    expect(mockCommentRepository.verifycomment).toBeCalledWith(useCasePayload.commentId)
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(useCasePayload.commentId, useCasePayload.owner)
    expect(mockCommentRepository.verifyCommentAtThread).toBeCalledWith(useCasePayload.commentId, useCasePayload.threadId)
    expect(mockCommentRepository.deleteComment).toBeCalledWith(useCasePayload.commentId)
  })
})
