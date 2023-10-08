const AddComment = require('../../../Domains/comment/entities/AddComment')
const AddedComment = require('../../../Domains/comment/entities/AddedComment')
const CommentRepository = require('../../../Domains/comment/CommentRepository')
const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const AddCommentUseCase = require('../AddCommentUseCase')

describe('AddCommentUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
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
    mockCommentRepository.verifyAvailableComment = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockCommentRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedComment))

    /** creating use case instance */
    const getCommentUseCase = new AddCommentUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository
    })

    const addedComment = await getCommentUseCase.execute(useCasePayload)
    expect(addedComment).toStrictEqual(mockAddedComment)
    expect(mockCommentRepository.addComment).toBeCalledWith(new AddComment({
      thread: useCasePayload.thread,
      content: useCasePayload.content,
      owner: useCasePayload.owner
    }))
  })
})
