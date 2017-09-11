exports.up = (knex, Promise) => {
  const createUsers = knex.schema.createTable('users', t => {
    t.increments('id').unsigned().primary()
    t.dateTime('created_at').notNull()
    t.dateTime('updated_at').nullable()
    t.dateTime('deleted_at').nullable()

    t.string('name').notNull()
    t.string('nickName').notNull()
    t.integer('age').notNull()
    t.string('gender').notNull()
    t.string('phone').notNull()
    t.string('email').notNull()
    t.string('address').notNull()
  })

  const createPost = knex.schema.createTable('posts', t => {
    t.increments('id').unsigned().primary()
    t.dateTime('created_at').notNull()
    t.dateTime('updated_at').nullable()
    t.dateTime('deleted_at').nullable()

    t.string('title').notNull()
    t.string('author').notNull()
    t.integer('comments').notNull()
    t.integer('views').notNull()
    t.string('categories').notNull()
    t.string('tags').notNull()
    t.string('visibility').notNull()
  })

  return Promise.all([createUsers, createPost])
}

exports.down = (knex, Promise) =>
  Promise.all([knex.schema.dropTable('users'), knex.schema.dropTable('posts')])
