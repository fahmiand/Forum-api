const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase')

class ThreadsHandler {
  constructor (container) {
    this._container = container

    this.postThreadHandler = this.postThreadHandler.bind(this)
  }

  async postThreadHandler (request, h) {
    const threadUseCase = this._container.getInstance(AddThreadUseCase.name)
    const { id: owner } = request.auth.credentials
    const payload = {
      title: request.payload.title,
      body: request.payload.body,
      owner
    }
    console.log(request.payload)
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

  // async detailThreadHandler (request, h) {
  //   const 
  // }
}

module.exports = ThreadsHandler
