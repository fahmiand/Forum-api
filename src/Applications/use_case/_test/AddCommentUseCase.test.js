const AddComment = require('../../../Domains/comment/entities/AddComment')
const AddedComment = require('../../../Domains/comment/entities/AddedComment')
const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const CommentRepository = require('../../../Domains/comment/CommentRepository')
const AddCommentUseCase = require('../AddCommentUseCase')

describe('AddCommentUseCase', () => {
  it('should return the comment property', async () => {
    const useCasePayload = {
      thread: 'thread-h_123',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      owner: 'user-123'
    }

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      thread: useCasePayload.thread,
      owner: useCasePayload.owner
    })

    /* creating depedenc of use case */
    const mockCommentRepository = new CommentRepository()
    const mockThreadRepository = new ThreadRepository()

    /** mocking needed function */
    mockThreadRepository.verifyAvailableThread = jest.fn(() => Promise.resolve());
    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedComment({
        id: 'comment-123',
        content: useCasePayload.content,
        owner: useCasePayload.owner
      })))

    /** creating use case instance */
    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    })

    const addedComment = await getCommentUseCase.execute(useCasePayload)
    expect(addedComment).toStrictEqual(mockAddedComment)
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload.thread)
    expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
      thread: useCasePayload.thread,
      content: useCasePayload.content,
      owner: useCasePayload.owner
    }))
  })
})
