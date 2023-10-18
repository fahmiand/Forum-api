const DetailComment = require('../DetailComment')

describe('detailComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {}

    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not did data type specification property', () => {
    const payload = {
      id: 123,
      username: true,
      date: 123,
      content: 123,
      is_delete: 'false'
    }

    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should detail detailComment object correctly ', () => {
    const payload = {
      id: 'comment-123',
      username: 'username',
      date: '2021-08-08T07:22:33.555Z',
      content: 'comment',
      is_delete: false
    }
    const payload2 = {
      id: 'comment-124',
      username: 'username',
      date: '2021-08-08T07:22:33.555Z',
      content: 'comment',
      is_delete: true
    }

    const detailComment = new DetailComment(payload)
    const detailComment2 = new DetailComment(payload2)
    const result = [
      detailComment,
      detailComment2
    ]

    expect(result).toEqual([
      {
        id: 'comment-123',
        username: 'username',
        date: '2021-08-08T07:22:33.555Z',
        content: 'comment',
        isDelete: false
      },
      {
        id: 'comment-124',
        username: 'username',
        date: '2021-08-08T07:22:33.555Z',
        content: '**komentar telah dihapus**',
        isDelete: true
      }
    ])
  })
})
