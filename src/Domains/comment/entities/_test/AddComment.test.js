const AddComment = require('../AddComment')

describe('AddComment entities', () => {
  it('should throw error when payload did not conatin needed property', () => {
    const payload = {
      thread: 'thread-123',
      owner: 'user-123'
    }

    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payloaddid not meet data type specification', () => {
    const payload = {
      thread: 'thread-123',
      content: true,
      owner: 123
    }

    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should create addComment object corretly', () => {
    const payload = {
      thread: 'thread-123',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      owner: 'user-123'
    }

    const { thread, content, owner } = new AddComment(payload)

    expect(thread).toEqual(payload.thread)
    expect(content).toEqual(payload.content)
    expect(owner).toEqual(payload.owner)
  })
})
