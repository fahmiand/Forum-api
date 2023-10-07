// TODO helper
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper')

// TODO database
const pool = require('../../database/postgres/pool')

// Todo server
const createServer = require('../createServer')
const container = require('../../container')

// todo error
const AuthenticationError = require('../../../Commons/exceptions/AuthenticationError')
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError')
const NotFoundError = require('../../../Commons/exceptions/NotFoundError')
const InvariantError = require('../../../Commons/exceptions/InvariantError')

describe('HTTP server', () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable()
    await CommentsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
  })

  afterAll(async () => {
    await pool.end()
  })

  describe('when POST /comments', () => {
    it('should response 400', async () => {
      const server = await createServer(container)

      // inject users baru
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'fahmi',
          password: 'secret',
          fullname: 'fahmiandrian'
        }
      })

      // inject barrer token
      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'fahmi',
          password: 'secret'
        }
      })
      const responseAuth = JSON.parse(authentication.payload)

      const payloadThread = {
        content: 123
      }

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-123/comments',
        payload: payloadThread,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })
      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(400)
      expect(responseJson.status).toEqual('fail')
      expect(responseJson.message).toEqual('tidak dapat membuat user baru karena tipe data tidak sesuai')
    })
    it('should response 404 NotFound', async () => {
      const server = await createServer(container)

      // inject users baru
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'fahmi',
          password: 'secret',
          fullname: 'fahmiandrian'
        }
      })

      // inject barrer token
      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'fahmi',
          password: 'secret'
        }
      })

      // ? Arrange
      const requestPayloadThread = {
        title: 'sebuah title',
        body: 'sebuah body'
      }

      const responseAuth = JSON.parse(authentication.payload)
      const thread = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayloadThread,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseThread = JSON.parse(thread.payload)
      const response = await server.inject({
        method: 'POST',
        url: '/threads/xxx/comments',
        payload: {
          content: 'sebuah comment'
        },
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })
      const responseJson = JSON.parse(response.payload)
      console.log(responseJson)
      expect(response.statusCode).toEqual(404)
      expect(responseJson.error).toEqual('fail')
      expect(responseJson.message).toEqual('thread tidak ada')
    })
    it('should response 403', async () => {

      expect(response.statusCode).toEqual(403)
      expect(responseJson.status).toEqual('fail')
      expect(responseJson.message).toEqual('gagal')
    })

    it('should response 201 and persisted comments', async () => {
      const server = await createServer(container)

      // inject users baru
      await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'fahmi',
          password: 'secret',
          fullname: 'fahmiandrian'
        }
      })

      // inject barrer token
      const authentication = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'fahmi',
          password: 'secret'
        }
      })

      // ? Arrange
      const requestPayloadThread = {
        title: 'sebuah title',
        body: 'sebuah body'
      }

      const responseAuth = JSON.parse(authentication.payload)
      const thread = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayloadThread,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseThread = JSON.parse(thread.payload)

      // ? Arrange
      const requestPayload = {
        content: 'Lorem ipsum dolor sit amet.'
      }

      const response = await server.inject({
        method: 'POST',
        url: `/threads/${responseThread.data.addedThread.id}/comments`,
        payload: requestPayload,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(201)
      expect(responseJson.status).toEqual('success')
      expect(responseJson.data.addedComment).toBeDefined()
    })
  })

  describe('when DELETE /comments', () => {

  })
})
