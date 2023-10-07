exports.up = pgm => {
  pgm.addConstraint('comments', 'fk_comments.thread_id_threads.id', 'FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE')
}

exports.down = pgm => {
  pgm.dropConstraint('comments', 'fk_comments.thread_id_threads.id')
}
