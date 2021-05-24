import React from 'react'
import { objType } from './Types'

let GlobalExpand: Set<string> = new Set()
let Active: Set<string> = new Set()

const deepCopySet = (set: Set<string>): string[] => {
  return [...Array.from(set)]

  // return undefined
}
// type startNodeType= [] | string
// type objType = [
//   {
//     [key: string]: string | any[]
//   }
// ]
function connectedChildren (startNode: string, obj: objType) {
  const treeValues: string[] = []

  const preOrderHelper = (id: string) => {
    const node:
      | {
          [key: string]: any
        }
      | undefined = obj.find(el => el.id === id)

    //push value onto array FIRST
    if (node) {
      // node.id = 'fsdgsg'
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
  //   console.log("expanding node:", id);
  //   console.log("GlobalExpand:", GlobalExpand);
  GlobalExpand.add(id)
  Active.add(id)
  console.log('Active:', deepCopySet(Active))
  const matchObj = obj.find(el => el.id === id)
  //   console.log("matchId:", matchObj);
  if (matchObj) {
    const { children } = matchObj

    //   console.log("children:", children);
    if (children && children?.length > 0) {
      if (typeof children !== 'string') {
        children?.map(child => {
          //   console.log("expand", child);
          //   c;
          GlobalExpand.add(child)
          Active.delete(child)
        })
      }
    } else {
      // console.log("no folder");
    }
  }
  // console.log("-------------");
  //   GlobalExpand.map((each) => {
  //     Active.add(each);
  //   });
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
  // console.log("expanding node:", id);
  Active.delete(id)
  connectedChildren(id, obj).map(child => {
    // console.log("child:", child);
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
// const Server = () => {
//   const { data: obj } = useLoad();
//   console.log("data:", obj);

//   return { close, expand };
// };

export { close, expand }

// let GlobalExpand = [];
// const obj = [
//   {
//     id: "60a7bc1682f47e3a3c73bd8c",
//     name: "1",
//     children: ["60a7bc2982f47e3a3c73bd8d", "60a7bc3482f47e3a3c73bd8e"],
//   },
//   {
//     id: "60a7bc2982f47e3a3c73bd8d",
//     name: "2",
//     children: ["60a7bca782f47e3a3c73bd90", "60a7bcb282f47e3a3c73bd91"],
//   },
//   { id: "60a7bc3482f47e3a3c73bd8e", name: "3", children: [] },
//   {
//     id: "60a7bca782f47e3a3c73bd90",
//     name: "4",
//     children: ["60a7bcc682f47e3a3c73bd92"],
//   },
//   { id: "60a7bcb282f47e3a3c73bd91", name: "6", children: [] },
//   { id: "60a7bcc682f47e3a3c73bd92", name: "5", children: [] },
// ];
