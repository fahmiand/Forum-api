const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper')
const container = require('../../container')
const pool = require('../../database/postgres/pool')
const createServer = require('../createServer')
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper')
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper')
describe('HTTP server', () => {
  afterEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable()
    await ThreadsTableTestHelper.cleanTable()
    await UsersTableTestHelper.cleanTable()
  })
  afterAll(async () => {
    await pool.end()
  })
  describe('when POST /threads', () => {
    it('should response 201 and persisted thread', async () => {
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
      const requestPayload = {
        title: 'sebuah title',
        body: 'sebuah body'
      }

      const responseAuth = JSON.parse(authentication.payload)
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(201)
      expect(responseJson.status).toEqual('success')
      expect(responseJson.data.addedThread).toBeDefined()
    })

    it('should response 401 when request payload', async () => {
      const server = await createServer(container)

      // ? Arrange
      const requestPayload = {
        title: 'sebuah title',
        body: 'sebuah body',
        owner: 'user-123'
      }

      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(401)
      expect(responseJson.message).toBe('Missing authentication')
    })
  })

  describe('when GET /threads', () => {
    it('should response 404 when request payload not access', async () => {
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
      console.log(responseAuth.data.accessToken)
      const response = await server.inject({
        method: 'GET',
        url: '/threads/123',
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(404)
      expect(responseJson.message).toEqual('Not Found')
    })

    it('should response 200 ', async () => {
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
      const requestPayload = {
        title: 'sebuah title',
        body: 'sebuah body'
      }

      const responseAuth = JSON.parse(authentication.payload)
      const thread = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: { Authorization: `Bearer ${responseAuth.data.accessToken}` }
      })

      const responseThread = JSON.parse(thread.payload)
      console.log(responseThread)
      const response = await server.inject({
        method: 'GET',
        url: `/threads/${responseThread.data.addedThread.id}`
      })

      const responseJson = JSON.parse(response.payload)
      expect(response.statusCode).toEqual(200)
      expect(responseJson.message).toEqual('success')
    })
  })
})
