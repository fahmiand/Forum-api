const AddThread = require('../../../Domains/thread/entities/AddThread')
const AddedThread = require('../../../Domains/thread/entities/AddedThread')
const ThreadRepository = require('../../../Domains/thread/ThreadRepository')
const AddThreadUseCase = require('../AddThreadUseCase')

describe('AddThreadUseCase', () => {
  it('should orchestrating the add thread action correctly', async () => {
    // ? Arrange
    const UseCasePayload = {
      title: 'a thread',
      body: 'thread body ini',
      owner: 'user-123',
      date: '2023-10-6'
    }

    const expectedAddedThread = new AddedThread({
      id: 'thread-h_123',
      title: UseCasePayload.title,
      owner: UseCasePayload.owner
    })

    /** creating depedenc of use case */
    const mockThreadRepository = new ThreadRepository()

    /** mocking needed function */
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(new AddedThread({
        id: 'thread-h_123',
        title: UseCasePayload.title,
        owner: UseCasePayload.owner
      })
      ))

    /** creating use case instance */
    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository
    })

    const addedThread = await getThreadUseCase.execute(UseCasePayload)

    expect(addedThread).toStrictEqual(expectedAddedThread)
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
      title: UseCasePayload.title,
      body: UseCasePayload.body,
      owner: UseCasePayload.owner,
      date: UseCasePayload.date
    }))
  })
})
