const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase')
const DetailThreadUseCase = require('../../../../Applications/use_case/DetailThreadUseCase')

class ThreadsHandler {
  constructor (container) {
    this._container = container

    this.postThreadHandler = this.postThreadHandler.bind(this)
    this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this)
  }

  async postThreadHandler (request, h) {
    const threadUseCase = this._container.getInstance(AddThreadUseCase.name)
    const { id: owner } = request.auth.credentials
    const payload = {
      title: request.payload.title,
      body: request.payload.body,
      owner
    }

    const addedThread = await threadUseCase.execute(payload)

    const response = h.response({
      status: 'success',
      data: {
        addedThread
      }
    })
    response.code(201)
    return response
  }

  async getThreadByIdHandler (request, h) {
    const threadUseCase = this._container.getInstance(DetailThreadUseCase.name)
    const { id } = request.params
    const thread = await threadUseCase.execute(id)
    return {
      status: 'success',
      data: {
        thread
      }
    }
  }
}

module.exports = ThreadsHandler
