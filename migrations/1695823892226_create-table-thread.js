exports.up = pgm => {
  pgm.createTable('threads', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true
    },
    title: {
      type: 'TEXT',
      notNull: true
    },
    body: {
      type: 'TEXT',
      notNull: true
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    create_at: {
      type: 'TEXT',
      notNull: true
    },
    update_at: {
      type: 'TEXT',
      notNull: true
    }
  })
}

exports.down = pgm => {
  pgm.dropTable('threads')
}
