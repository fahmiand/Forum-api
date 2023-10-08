exports.up = pgm => {
  pgm.addColumns('comments', {
    is_delete: {
      type: 'boolean',
      notNull: true,
      default: false
    }
  })
}

exports.down = pgm => {
  pgm.dropColumns('comments', 'is_delete')
}
