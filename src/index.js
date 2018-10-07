import Store from './core/store'
import Post from './feature/Post'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function main() {
  const store = new Store()

  store.use(Post)

  store.run(Post.fetch)
  await delay()

  store.run(Post.add('Hello'))
  store.run(Post.add('World'))
  store.run(Post.remove('Hello'))
  store.run(Post.removeAll)

  store.state.post.posts = ['Surprise!']
  store.run(Post.add('Nice'))
}

main()