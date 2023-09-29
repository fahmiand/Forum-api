const ThreadRepository = require('../ThreadRepository')

describe('ThreadRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // ? Arrange
    const threadeRepository = new ThreadRepository()

    // ? Action and Assert
    await expect(threadeRepository.addThread({})).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(threadeRepository.verifyAvailableThread('')).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
    await expect(threadeRepository.getDetailThread('')).rejects.toThrowError('THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  })
})
