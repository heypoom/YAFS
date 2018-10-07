export const merge = (a, b) => ({...a, ...b})

export const namespace = ns => action => {
  const name = `@${ns}/${toSnakeCase(action)}`

  return name.toUpperCase()
}

export function getNamespace(name) {
  return name.slice(1).split('/')[0].toLowerCase()
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toSnakeCase(str) {
  const upperChars = str.match(/([A-Z])/g)

  if (!upperChars) return str

  for (let i = 0, n = upperChars.length; i < n; i++) {
    const regex = new RegExp(upperChars[i])

    str = str.replace(regex, '_' + upperChars[i].toLowerCase())
  }

  if (str.slice(0, 1) === '_') {
    str = str.slice(1)
  }

  return str
}
