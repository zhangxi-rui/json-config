<template>
  <div class="json_page">
    <div class="json_config">
      <el-tree
        :data="dataTree"
        :expand-on-click-node="false"
        :default-expand-all="true"
        :indent="40"
      >

        <span
          class='tree-node'
          slot-scope="{node,data}"
        >
          <span
            v-if="data.nodeType!=='add'"
            class='tree-node'
          >
            <span class="flexText">
              <p
                contenteditable="true"
                class="text-input"
                v-text="data.nodeKey"
                @input="handleInputKey(...arguments, node, data)"
              >
              </p>
              <span v-if="data.selectType==='string'"> : </span>
              <p
                contenteditable="true"
                class="text-input"
                v-text="data.nodeValue"
                @input="handleInputValue(...arguments, node, data)"
              ></p>
            </span>
            <span class="flex">
              <el-select
                v-model="data.selectType"
                size="mini"
                @change="dataTreeChange(node,data)"
                class="select-color"
              >
                <el-option
                  v-for="item in selectType"
                  :key="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div class="delete">
                <el-button
                  v-if="data.nodeType!=='root'"
                  size="mini"
                  class="danger"
                  @click="() => remove(node,data)"
                  title="删除"
                ><i class="zyb-icon-common-delete-o">
                  </i>
                </el-button>
              </div>
            </span>
          </span>
          <span
            v-if="data.nodeType==='add'"
            @mouseenter="handlerMouseEnter(...arguments,node,data)"
            @mouseleave="handlerMouseLeave(...arguments,node,data)"
          >
            <el-button
              v-if="data.nodeType!=='root'"
              size="mini"
              class="primary"
              @click="add(...arguments,node,data)"
              title="添加"
            ><i class="zyb-icon-common-plus"></i></el-button>

          </span>
        </span>

      </el-tree>
      <el-button
        @click="submitJson"
        type="primary"
        size="mini"
        class="submit-json"
      >生成json</el-button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
let id = 5
const dataTree = [
  {
    id: 1,
    nodeKey: 'itemObj',
    nodeValue: '',
    selectType: 'object',
    nodeType: 'root',
    children: [
      {
        id: 9,
        nodeKey: 'itemList1',
        nodeValue: '',
        selectType: 'array',
        parent: 'object',
        nodeType: 'child',
        children: [
          {
            id: 10,
            nodeKey: '0',
            nodeValue: 'value1',
            selectType: 'string',
            parent: 'array',
            nodeType: 'child'
          },
          { nodeType: 'add' }
        ]
      },
      // {
      //   id: 4,
      //   nodeKey: 'item2',
      //   nodeValue: 'value2',
      //   selectType: 'string',
      //   parent: 'object',
      //   nodeType: 'child'
      // },
      { nodeType: 'add' }
    ]
  }
]
let selectType = [
  {
    label: 'string',
    value: 'string'
  },
  {
    label: 'object',
    value: 'object'
  },
  {
    label: 'array',
    value: 'array'
  }
]

@Component
export default class JsonConfig extends Vue {
  dataTree = dataTree
  selectType = selectType
  jsonObj: any
  handleInputKey ($event: any, node: any, data: any) {
    // console.log($event.target.innerText)
    // console.log(data)
    data.nodeKey = $event.target.innerText
    // data.nodeValue = $event.target.innerText
  }
  handleInputValue ($event: any, node: any, data: any) {
    // console.log($event.target.innerText)
    // console.log(data)
    data.nodeValue = $event.target.innerText
    // data.nodeValue = $event.target.innerText
  }
  handlerMouseEnter (event: any, node: any, data: any) {
    // console.log('触发了enter')
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = 'yellow'
    // console.log(event.target.parentNode.parentNode.parentNode.parentNode.parentNode)
    // console.log(node)
  }
  handlerMouseLeave (event: any, node: any, data: any) {
    // console.log('触发了leave')

    event.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = ''
    // console.log(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.style)

    // console.log(node)
  }
  jsonArray (dataTree: any) {
    let jsonArray: any = []
    let array: any = []
    dataTree.children.forEach((data: any, index: number) => {
      if (index < dataTree.children.length - 1) {
        if (!data.children) {
          jsonArray.push(data.nodeValue)
        } else {
          jsonArray[data.nodeKey] = this.jsonCreate(data.children)
        }
      }
    })
    return jsonArray
  }
  jsonCreate (dataTree: any) {
    let jsonObject: any = {}
    console.log('本次循环的数组dataTree--->>>', dataTree)
    dataTree.forEach((value: any) => {
      if (value.selectType) {
        console.log('本次循环的value--->>', value)

        console.log('value.children--->>', value.children)
        if (value.selectType === 'object') {
          console.log('objjjjjjjjjjjjjj')
          jsonObject[value.nodeKey] = this.jsonCreate(value.children)
        } else if (value.selectType === 'array') {
          jsonObject[value.nodeKey] = this.jsonArray(value)
          /// ///////////////////////////////////////////////////////////////////////////
          // let array: any = []
          // jsonObject[value.nodeKey] = []
          // value.children.forEach((data: any, index: number) => {
          //   if (index < value.children.length - 1) {
          //     if (!data.children) {
          //       jsonObject[value.nodeKey].push(data.nodeValue)
          //       console.log('非嵌套数组--->>>', jsonObject[value.nodeKey])
          //     } else {
          //       jsonObject[value.nodeKey] = array.push(this.jsonCreate(data.children))
          //       console.log('嵌套数组--->>>', this.jsonCreate(data.children))
          //     }
          //     // array[array.length] = this.jsonCreate(value.children)
          //   }
          //   console.log('array--->>>', array)
          // })
          /// ////////////////////////////////////////////////////////////////////////////
          // jsonObject[value.nodeKey] = array
          // jsonObject[value.nodeKey].push(this.jsonCreate(value.children))
          // console.log('jsonObject[value.nodeKey]--->', jsonObject[value.nodeKey])
          // let jsonArray = []
          // jsonArray.push(this.jsonCreate(value.children))
          // jsonObject[value.nodeKey] = jsonArray
          // jsonObject[value.nodeKey].push(jsonArray)
        } else {
          // 递归终点，没有children
          if (value.parent === 'object') {
            jsonObject[value.nodeKey] = value.nodeValue
          } else {
            // jsonObject = []
            jsonObject = value.nodeValue
          }
          console.log('无children----->>', jsonObject)
          return jsonObject
        }
      } else {
        return jsonObject
      }
    })
    console.log('jsonObject---->>', jsonObject)
    return jsonObject
  }
  submitJson () {
    console.log('this.dataTree----->>', this.dataTree)
    if (!this.dataTree[0].children) {
      this.jsonObj = this.dataTree[0].nodeValue
    } else {
      let obj = this.jsonCreate(this.dataTree)
      this.jsonObj = obj[this.dataTree[0].nodeKey]
      // console.log(this.dataTree[0].children)
      // if (this.dataTree[0].selectType === 'object') {
      //   this.jsonObj = obj
      console.log('this.jsonObj----->>>', this.jsonObj)
      // } else {
      // console.log('length--->>', this.jsonObj)
      // obj = Object.assign(obj, { length: Object.keys(obj).length })
      // this.jsonObj = Array.from(obj)
      // }
    }
    // this.dataTree.forEach((value: any, index: any) => {
    //   console.log(value['children'])
    // })
    // console.log(this.jsonObj)
  }
  findItemIndex (node: any, data: any): any {
    const parent = node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex((d: any) => d.id === data.id)
    return { index, children }
  }
  remove (node: any, data: any) {
    const { index, children } = this.findItemIndex(node, data)
    children.splice(index, 1)
  }
  add (event: any, node: any, data: any) {
    // console.log('触发了CLICK')
    let newChildObject = { id: id++, nodeKey: 'key', nodeValue: 'value', selectType: 'string', parent: 'object', nodeType: 'child' }
    let newChildArray: object
    if (!node.parent.data.children) {
      this.$set(node.parent.data, 'children', [])
    }
    let index = node.parent.data.children.length - 1
    // let nodeAdd = node.parent.data.children.pop()
    if (node.parent.data.selectType === 'object') {
      // node.parent.data.children.push(newChildObject, { nodeType: 'add' })
      node.parent.data.children.splice(index, 0, newChildObject)
    } else {
      let arrayId = node.parent.data.children.length - 1
      newChildArray = { id: id++, nodeKey: arrayId, nodeValue: 'value', selectType: 'string', parent: 'array', nodeType: 'child' }
      node.parent.data.children.splice(index, 0, newChildArray)
      // node.parent.data.children.push(newChildArray, { nodeType: 'add' })
    }
  }
  dataTreeChange (node: any, data: any) {
    const { index, children } = this.findItemIndex(node, data)
    if (data.selectType === 'string') {
      children.splice(index, 1, { id: id++, nodeKey: 'key', nodeValue: '', selectType: 'string', parent: node.parent.data.selectType, nodeType: 'child' })
      // children[index].selectType = 'string'
    } else if (data.selectType === 'object') {
      // children.splice(index, 1, { id: id++, nodeKey: '', nodeValue: '', selectType: 'object', nodeType: 'child', children: [{ nodeType: 'add' }] })
      if (!data.children) {
        let key = data.nodeKey
        children.splice(index, 1, {
          id: id++,
          nodeKey: key,
          nodeValue: '',
          selectType: 'object',
          parent: node.parent.data.selectType,
          nodeType: 'child',
          children: [{ nodeType: 'add' }]
        })
      } else {
        // data.selectType = 'object'
        data.children.forEach((element: any) => {
          element.parent = 'object'
        })
      }
    } else {
      if (!data.children) {
        let key = data.nodeKey
        children.splice(index, 1, {
          id: id++,
          nodeKey: key,
          nodeValue: '',
          selectType: 'array',
          parent: node.parent.data.selectType,
          nodeType: 'child',
          children: [{ nodeType: 'add' }]
        })
      } else {
        data.children.forEach((element: any, index: number) => {
          element.nodeKey = index
          element.parent = 'array'
        })
      }
    }
  }
}
</script>

<style>
.json_page {
  background-color: white;
  padding: 30px;
}
.json_config {
  margin-left: 200px;
  width: 500px;
  padding: 10px;
  border: 1px solid black;
}
.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.json_config .line-input {
  width: 100%;
}
.json_config .text-input {
  display: inline-block;
  min-width: 10px;
}
.json_config .text-input:focus {
  background-color: #f0f1f5;
}
.json_config .el-select .el-input {
  width: 80px;
}
.json_config .el-select .el-input__inner {
  background-color: #afb0b3;
  color: white;
  border: 1px;
}
.json_config .el-select .el-input__inner:hover {
  background-color: #5392ff;
}
.json_config .danger {
  background-color: #afb0b3;
  border-color: #afb0b3;
  color: white;
}
.json_config .danger:hover {
  background: red;
  border-color: red;
}
.json_config .delete {
  display: inline-block;
  padding-left: 10px;
}
.json_config .primary {
  background-color: #afb0b3;
  border-color: #afb0b3;
  color: white;
}
.json_config .primary:hover {
  background: #42c57a;
  border-color: #42c57a;
}

.json_config .flex {
  display: flex;
  align-items: center;
  width: 150px;
  background-color: aquamarine;
  padding-left: 30px;
}
.json_config .flexText {
  display: flex;
  flex: 1;
}
.submit-json {
  margin-left: 400px;
  margin-top: 20px;
}
/* .flex-left {
  flex: 1;
  text-align: left;
}
.flex-right {
  flex: 1;
  text-align: right;
} */
</style>
