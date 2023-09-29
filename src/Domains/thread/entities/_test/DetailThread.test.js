const DetailThread = require('../DetailThread')

describe('detailThread entities', () => {
  it('should throw error when payload does not contain needed peroperty', () => {
    // ? Arrange
    const payload = {
      thread: ''
    }

    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  })

  it('should throw error when payloaad did not meet data type specification', () => {
    // ? Arrange
    const payload = {
      thread: 123
    }

    expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  })

  it('should create detailThread object correctly', () => {
    const payload = {
      thread: 'thread-123'
    }

    // ? Action
    const { thread } = new DetailThread(payload)

    // ! Assert
    expect(thread).toEqual(payload.thread)
  })
})
