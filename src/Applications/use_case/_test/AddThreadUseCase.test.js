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
      owner: 'user-123'
    }

    const mockAddedThread = new AddedThread({
      id: 'thread-123',
      title: UseCasePayload.title,
      body: UseCasePayload.body,
      owner: UseCasePayload.owner
    })

    /** creating depedenc of use case */
    const mockThreadRepository = new ThreadRepository()

    /** mocking needed function */

    mockThreadRepository.verifyAvailableThread = jest.fn()
      .mockImplementation(() => Promise.resolve())
    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(mockAddedThread))

    /** creating use case instance */
    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository
    })

    console.log(UseCasePayload)

    const addedThread = await getThreadUseCase.execute(UseCasePayload)

    expect(addedThread).toStrictEqual(mockAddedThread)
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread({
      title: UseCasePayload.title,
      body: UseCasePayload.body,
      owner: UseCasePayload.owner
    }))
  })
})
