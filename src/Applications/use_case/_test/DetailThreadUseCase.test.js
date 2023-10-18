const DetailThreadUseCase = require('../DetailThreadUseCase')
const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const CommentRepository = require('../../../Domains/comment/CommentRepository')

describe('DetailThreadUseCase', () => {
  it('should get return detail thread', async () => {
    const useCasePayload = 'thread-h_123'

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
      .mockImplementation(() => Promise.resolve([
        {
          id: 'comment-123',
          username: 'username',
          date: '2021-08-08T07:22:33.555Z',
          content: 'comment',
          is_delete: false
        },
        {
          id: 'comment-124',
          username: 'username',
          date: '2021-08-08T07:22:33.555Z',
          content: 'comment',
          is_delete: true
        }
      ]))

    const getDetailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository
    })

    const detailThread = await getDetailThreadUseCase.execute(useCasePayload)
    const resultCommbin = {
      id: 'thread-h_123',
      title: 'title',
      body: 'body',
      date: '2021-08-08T07:22:33.555Z',
      username: 'username',
      comments: [
        {
          id: 'comment-123',
          username: 'username',
          date: '2021-08-08T07:22:33.555Z',
          content: 'comment'
        },
        {
          id: 'comment-124',
          username: 'username',
          date: '2021-08-08T07:22:33.555Z',
          content: '**komentar telah dihapus**'
        }
      ]
    }
    expect(resultCommbin).toEqual(detailThread)
    expect(mockThreadRepository.verifyAvailableThread).toBeCalledWith(useCasePayload)
    expect(mockThreadRepository.getDetailThread).toBeCalledWith(useCasePayload)
    expect(mockCommentRepository.getCommentByThreadById).toBeCalledWith(useCasePayload)
  })
})
