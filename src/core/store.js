import {getNamespace, capitalize} from './utils'

export default class Store {
  state = {}
  reducers = {}

  use(feature) {
    const {name, state, reducers} = feature

    this.state = {...this.state, [name]: state}
    this.reducers = {...this.reducers, ...reducers}
  }

  set(ns, state) {
    this.state[ns] = {
      ...this.state[ns],
      ...state
    }

    console.log('==>', capitalize(ns), this.state[ns], '\n')
  }

  run(action, ...args) {
    if (typeof action === 'function') {
      action = action(...args)
    }

    console.log('||>', action)

    const ns = getNamespace(action.type)
    const reducer = this.reducers[action.type]
    const prevState = this.state[ns]

    let {payload} = action

    if (!Array.isArray(payload)) {
      payload = [payload]
    }

    const state = reducer(prevState, ...payload)

    // Resolve Promises
    if (state instanceof Promise) {
      return state.then(state => this.set(ns, state))
    }
    
    this.set(ns, state)
  }
}