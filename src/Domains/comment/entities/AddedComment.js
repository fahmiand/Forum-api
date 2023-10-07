class AddedComment {
  constructor (payload) {
    this._verifyPayload(payload)
    const { content, id, owner } = payload
    this.content = content
    this.id = id
    this.owner = owner
  }

  _verifyPayload ({ content, id, owner }) {
    if (!content || !id || !owner) {
      throw new Error('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof id !== 'string' || typeof owner !== 'string' || typeof content !== 'string') {
      throw new Error('ADDED_COMMENT.NOT_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = AddedComment
