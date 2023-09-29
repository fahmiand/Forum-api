const AddedThread = require('../AddedThread')

describe('a addedThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // ? Arrang
    const payload = {
      title: 'sebauh satu thread',
      body: 'satu body tread'
    }

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specofocation', () => {
    const payload = {
      id: 'asd',
      title: true,
      owner: 123
    }

    expect(() => new AddedThread(payload)).toThrowError('ADDED_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should createaddedThread object correctly', () => {
    // ? Arrange
    const payload = {
      id: 'thread-123',
      title: 'sebuah tread 1',
      owner: 'user-123'
    }

    // ? Action
    const addedThread = new AddedThread(payload)

    expect(addedThread.id).toEqual(payload.id)
    expect(addedThread.title).toEqual(payload.title)
    expect(addedThread.owner).toEqual(payload.owner)
  })
})
