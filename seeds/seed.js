const user = {
  name: 'test',
  nickname: 'nickname',
  age: '32',
  gender: 'mail',
  phone: '13812341234',
  email: 'lurumm@epsiome.com',
  address: '新疆维吾尔自治区 喀什地区 塔什库尔干塔吉克自治县',
}

const post = {
  title:"title",
  author:"liu wei",
  categories:"dfv",
  tags:'bull',
  visibility:"can't touch me",
  comments:"3232fr2ff",
}

const users = new Array(100).fill(undefined).map((_, index) => ({
  ...user,
  created_at: Date.now(),
}))

const posts = new Array(100).fill(undefined).map((_, index) => ({
  ...post,
  created_at: Date.now(),
  comments:Math.random()*100 | 0,
  views:Math.random()*100 | 0,
}))

exports.seed = function (knex, Promise) {
  const initUsers = knex('users').del().then(() => {
    return knex('users').insert(users)
  })

  const initPosts = knex('posts').del().then(() => {
    return knex('posts').insert(posts)
  })

  return Promise.all([initUsers, initPosts])
}
