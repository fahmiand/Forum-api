const DetailComment = require('../DetailComment')

describe('detailComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = ''

    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not did data type specification property', () => {
    const payload = 123

    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should detail detailComment object correctly ', () => {
    const payload = 'comment-123'

    const { detailComment } = new DetailComment(payload)

    expect(detailComment).toEqual(payload.comment)
  })
})
