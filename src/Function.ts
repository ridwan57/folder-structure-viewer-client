import { objType } from './Types'

let GlobalExpand: Set<string> = new Set()
let Active: Set<string> = new Set()

const deepCopySet = (set: Set<string>): string[] => {
  return [...Array.from(set)]
}

function connectedChildren (startNode: string, obj: objType) {
  const treeValues: string[] = []

  const preOrderHelper = (id: string) => {
    const node = obj.find(el => el.id === id)

    if (node) {
      treeValues.push(node.id)
    }
    //recursively call function on all node children
    if (node && node.children.length !== 0) {
      node?.children?.forEach((child: any) => {
        preOrderHelper(child)
      })
    }
    return true
  }
  preOrderHelper(startNode)
  return treeValues
}

function expand (
  id: string,
  obj: objType
): {
  globalArray: string[]
  activeArray: string[]
} {
  GlobalExpand.add(id)
  Active.add(id)
  console.log('Active:', deepCopySet(Active))
  const matchObj = obj.find(el => el.id === id)

  if (matchObj) {
    const { children } = matchObj

    if (children && children?.length > 0) {
      if (typeof children !== 'string') {
        children?.forEach(child => {
          GlobalExpand.add(child)
          Active.delete(child)
        })
      }
    } else {
    }
  }

  return {
    globalArray: deepCopySet(GlobalExpand),
    activeArray: deepCopySet(Active)
  }
}

function close (
  id: string,
  obj: objType,
  deleteNode = false
): {
  globalArray: string[]
  activeArray: string[]
} {
  Active.delete(id)
  connectedChildren(id, obj).forEach(child => {
    Active.delete(child)
    GlobalExpand.delete(child)
  })

  if (!deleteNode) GlobalExpand.add(id)
  else GlobalExpand.delete(id)

  return {
    globalArray: deepCopySet(GlobalExpand),
    activeArray: deepCopySet(Active)
  }
}

export { close, expand }
