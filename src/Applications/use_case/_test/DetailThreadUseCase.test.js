const DetailThreadUseCase = require('../DetailThreadUseCase')
const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const CommentRepository = require('../../../Domains/comment/CommentRepository')

describe('DetailThreadUseCase', () => {
  it('should get return detail thread', async () => {
    const useCasePayload = {
      id: 'thread-h_123'
    }

    const detailComment = [
      {
        id: 'comment-123',
        username: 'username',
        date: '2021-08-08T07:22:33.555Z',
        content: 'comment',
        isDelete: false
      }
    ]

    const expectedDetailThread = {
      id: 'thread-h_123',
      title: 'title',
      body: 'body',
      date: '2021-08-08T07:22:33.555Z',
      username: 'username'
    }

    const mockThreadRepository = new ThreadRepository()
    const mockCommentRepository = new CommentRepository()

    mockThreadRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockThreadRepository.getDetailThread = jest.fn()
      .mockImplementation(() => Promise.resolve({
        id: 'thread-h_123',
        title: 'title',
        body: 'body',
        date: '2021-08-08T07:22:33.555Z',
        username: 'username'
      }))
    mockCommentRepository.getCommentByThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(detailComment))

    const getDetailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    })

    const detailThread = await getDetailThreadUseCase.execute(useCasePayload)
    const resultCommbin = {
      ...expectedDetailThread,
      comments: detailComment
    }
    expect(resultCommbin).toEqual(detailThread)
  })
})
