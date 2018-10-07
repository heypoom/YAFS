import {merge, namespace} from './utils'

export const Creator = type => (...payload) => ({type, payload})

export function createFeature(name, desc) {
  const {state, actions} = desc
  const ns = namespace(name)

  const reducers = Object.entries(actions)
    .map(([action, reducer]) => ({
      [ns(action)]: reducer
    }))
    .reduce(merge)

  const actionCreators = Object.keys(actions)
    .map(name => ({
      [name]: Creator(ns(name))
    }))
    .reduce(merge)

  return {name, state, reducers, ...actionCreators}
}
