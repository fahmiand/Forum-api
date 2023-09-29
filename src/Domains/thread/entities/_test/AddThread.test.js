const AddThread = require('../AddThread')

describe('a AddThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // ? Arrange
    const treadPayload = {
      title: 'abc',
      body: 'abc'
    }

    //! Action & Assert
    expect(() => new AddThread(treadPayload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY')
  })

  it('should throw error when payload did not meet data type specification', () => {
    // ? Arrange
    const payload = {
      title: 123,
      body: true,
      owner: 'user'
    }

    // ! Action & Assert
    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION')
  })

  it('should throw error when title contains more then 250 character', () => {
    const payload = {
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla animi repellendus, natus fuga est vero ipsam dignissimos, adipisci nihil officia expedita earum, enim quia pariatur architecto! Et harum, cumque, laudantium facilis veniam, consequatur autem libero assumenda earum facere ipsam dolor! Officiis dolore delectus ducimus quibusdam expedita fugiat itaque dicta consectetur?',
      body: 'Fahmi Andrian',
      owner: 'user-123'
    }

    expect(() => new AddThread(payload)).toThrowError('ADD_THREAD.TITLE_LIMIT_CHAR')
  })

  it('should create addThread object correctly', () => {
    // ? Arrange
    const payload = {
      title: 'sebuah tread',
      body: 'ini sebuah body',
      owner: 'user-123'
    }

    // ? Action
    const { title, body, owner } = new AddThread(payload)

    // ! Assert
    expect(title).toEqual(payload.title)
    expect(body).toEqual(payload.body)
    expect(owner).toEqual(payload.owner)
  })
})
