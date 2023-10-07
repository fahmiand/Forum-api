const AddedComment = require('../AddedComment')

describe('addedComment entities', () => {
  it('should throw error when did not contin needed peorprty', () => {
    const payload = {
      thread: 'thread-123',
      owner: 'user-123'
    }

    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when did not data type specification', () => {
    const payload = {
      id: 'comment-123',
      owner: true,
      content: 123
    }

    expect(() => new AddedComment(payload)).toThrowError('ADDED_COMMENT.NOT_DATA_TYPE_SPECIFICATION')
  })

  it('should create addedComment object correctly', () => {
    const payload = {
      id: 'comment-123',
      owner: 'user-123',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    }

    const addedComment = new AddedComment(payload)

    expect(addedComment.id).toEqual(payload.id)
    expect(addedComment.owner).toEqual(payload.owner)
    expect(addedComment.content).toEqual(payload.content)
  })
})
