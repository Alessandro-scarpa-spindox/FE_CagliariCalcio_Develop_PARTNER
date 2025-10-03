export function get(
  initialObject: Record<string, any>,
  keys: string[] | string,
  defaultVal?: any,
) {
  const currentKeys = Array.isArray(keys) ? keys : keys.split('.')
  const currentObject = initialObject[currentKeys[0]]
  if (currentObject && keys.length > 1) {
    return get(currentObject, currentKeys.slice(1))
  }
  return currentObject === undefined ? defaultVal : currentObject
}
