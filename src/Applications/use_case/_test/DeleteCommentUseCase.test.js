const CommentRepository = require('../../../Domains/comment/CommentRepository')
const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const DeleteCommentUseCase = require('../DeleteCommentUseCase')

describe('deleteCommentUseCase', () => {
  it('should orchestrating the delete comment action correctly', async () => {
    const useCasePayload = {
      id: 'comment-123',
      thread: 'thread-h_123'
    }

    const { user } = 'user-123'

    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()

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
    expect(mockCommentRepository.verifyCommentOwner).toBeCalledWith(useCasePayload.id, user)
    expect(mockCommentRepository.verifyCommentAtThread).toBeCalledWith(useCasePayload.id, useCasePayload.thread)
    expect(mockCommentRepository.deleteComment).toBeCalledWith(useCasePayload.id)
  })
})
