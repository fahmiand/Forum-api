exports.up = pgm => {
  pgm.addConstraint('comments', 'fk_comments.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) on DELETE CASCADE')
  pgm.addConstraint('threads', 'fk_threads.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) on DELETE CASCADE')
}

exports.down = pgm => {
  pgm.dropConstraint('comments', 'fk_comments.owner_users.id')
  pgm.dropConstraint('threads', 'fk_threads.owner_users.id')
}
