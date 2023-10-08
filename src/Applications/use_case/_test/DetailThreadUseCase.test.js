const DetailThreaduseCase = require('../DetailThreadUseCase')
const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const CommentRepository = require('../../../Domains/comment/CommentRepository')

describe('DetailThreadUseCase', () => {
  it('should get return detail thread', async () => {
    const useCasePayload = {
      thread: 'thread-h_123'
    }

    // const expectedThread = {
    //   id: 'thread-h_123',
    //   title: 'sebuah thread',
    //   body: 'sebuah body thread',
    //   date: '2021-08-08 14.00',
    //   username: 'dicoding'
    // }

    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()

    mockThreadRepository.verifyAvailableThread = jest.fn(() => Promise.resolve())
    mockThreadRepository.getDetailThread = jest.fn()
      .mockImplementation(() => Promise.resolve('thread-h_123'))

    const detailThreadUseCase = new DetailThreaduseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    })

    const detailThread = await detailThreadUseCase.execute(useCasePayload)

    expect(mockThreadRepository.getDetailThread).toBeCalledWith(useCasePayload)
    expect(detailThread).toStrictEqual('thread-h_123')
  })
})
