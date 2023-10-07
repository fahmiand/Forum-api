class AddComment {
  constructor (payload) {
    this._verifyPayload(payload)
    const { thread, content, owner } = payload
    this.thread = thread
    this.content = content
    this.owner = owner
  }

  _verifyPayload ({ thread, content, owner }) {
    if (!thread | !content || !owner) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY')
    }

    if (typeof thread !== 'string' || typeof content !== 'string' || typeof owner !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION')
    }
  }
}

module.exports = AddComment
