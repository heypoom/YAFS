import {createFeature} from '../core/feature'

const request = () => Promise.resolve(['Wow', 'Cool'])

const state = {
  posts: []
}

const actions = {
  add: (state, post) => ({
    posts: [...state.posts, post],
  }),
  
  remove: (state, name) => ({
    posts: state.posts.filter(post => post !== name),
  }),
  
  removeAll: state => ({
    posts: []
  }),
  
  fetch: async state => {
    const posts = await request()
    
    return {posts}
  }
}


export default createFeature('post', {state, actions})
