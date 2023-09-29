const DetailThreaduseCase = require('../DetailThreadUseCase')
const ThreadRepository = require('../../../Domains/thread/ThreadRepository')

describe('DetailThreadUseCase', () => {
  it('should get return detail thread', async () => {
    const useCasePayload = {
      thread: 'thread-123'
    }

    // const expectedThread = {
    //   id: 'thread-h_123',
    //   title: 'sebuah thread',
    //   body: 'sebuah body thread',
    //   date: '2021-08-08 14.00',
    //   username: 'dicoding'
    // }

    const mockThreadRepository = new ThreadRepository()

    mockThreadRepository.verifyAvailableThread = jest.fn(() => Promise.resolve())
    mockThreadRepository.getDetailThread = jest.fn()
      .mockImplementation(() => Promise.resolve('thread-123'))

    const detailThreadUseCase = new DetailThreaduseCase({
      threadRepository: mockThreadRepository
    })

    const detailThread = await detailThreadUseCase.execute(useCasePayload)

    expect(mockThreadRepository.getDetailThread).toBeCalledWith(useCasePayload)
    expect(detailThread).toStrictEqual('thread-123')
  })
})