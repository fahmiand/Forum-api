const DeleteComment = require('../DeleteComment')

describe('Delete Comment ecntities', () => {
  it('should throw error when payload not contain needed property', () => {
    // Arrange
    const payload = {
      commentId: 'comment-123',
      threadId: 'thread-123'
    }

    // Action and Assert
    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })
  it('should throw error when payload not meet data type specification', () => {
    // Arrange
    const payload = {
      commentId: 123,
      threadId: {},
      owner: []
    }

    // Action and Assert
    expect(() => new DeleteComment(payload)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })
  it('should create deleteComment object correctly', () => {
    // Arrange
    const payload = {
      commentId: 'comment-123',
      threadId: 'thread-123',
      owner: 'user-123'
    }
    // Action
    const { commentId, threadId, owner } = new DeleteComment(payload)
    // Assert
    expect(commentId).toEqual(payload.commentId)
    expect(threadId).toEqual(payload.threadId)
    expect(owner).toEqual(payload.owner)
  })
})
