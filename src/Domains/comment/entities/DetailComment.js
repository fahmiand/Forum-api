class DetailComment {
  constructor (payload) {
    this._verifyPayload(payload)
    const comment = payload
    this.comment = comment
  }

  _verifyPayload (comment) {
    if (!comment) {
      throw new Error('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof comment !== 'string') {
      throw new Error('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = DetailComment
