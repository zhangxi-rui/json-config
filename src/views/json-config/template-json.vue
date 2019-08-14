<template>
  <div class="json_page">
    <div class="json_config">
      <el-tree
        :data="dataTree"
        :expand-on-click-node="false"
        :default-expand-all="true"
        :indent="20"
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
                :contenteditable="data.isEdit"
                class="text-input"
                v-text="data.nodeKey"
                @blur="handleInputKey(...arguments, node, data)"
              >
              </p>

              <span v-if="data.selectType==='string'||data.selectType==='auto'"> : </span>
              <span
                v-if="data.selectType==='object'"
                style="color:red;display:inline-block;padding-left:10px"
              > <span>{</span><span>{{data.children.length-1}}</span>}<span></span></span>
              <span
                v-if="data.selectType==='array'"
                style="color:red;display:inline-block;padding-left:10px"
              > <span>[</span><span>{{data.children.length-1}}</span>]<span></span></span>
              <p
                v-if="data.selectType==='string'||data.selectType==='auto'"
                contenteditable="true"
                class="text-input"
                :class="[data.textColor]"
                v-text="data.nodeValue"
                @blur="handleInputValue(...arguments, node, data)"
              ></p>
            </span>
            <span class="inner"></span>
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
              <div
                class="copy"
                @mouseenter="handlerMouseEnter(...arguments,node,data)"
                @mouseleave="handlerMouseLeave(...arguments,node,data)"
              >
                <el-button
                  v-if="data.nodeType!=='root'"
                  size="mini"
                  class="primary"
                  @click="() => copy(node,data)"
                  title="复制"
                ><i class="zyb-icon-common-note-o">
                  </i>
                </el-button>
              </div>
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

    </div>
    <div class="json_button">
      <el-button
        @click="transformJson"
        type="primary"
        size="mini"
        title="解析JSON"
      ><i class="zyb-icon-direction-arrow-up"></i></el-button>
      <el-button
        @click="submitJson"
        type="primary"
        size="mini"
        title="转成JSON"
      ><i class="zyb-icon-direction-arrow-down"></i></el-button>
    </div>
    <div class="json_show">
      <el-input
        type="textarea"
        :rows=14
        v-model="json"
      ></el-input>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
let id = 5
const res = {
  a: 1,
  b: {
    b1: 'b11111',
    b2: [1, '2bbb']
  },
  c: ['c1', ['c2111', 2, 'c2333'], { c4: '444', c5: '666' }, 'c3']
}
const dataTree = [
  {
    id: 1,
    nodeKey: 'object',
    nodeValue: '',
    selectType: 'object',
    nodeType: 'root',
    isEdit: false,
    textColor: '',
    children: [
      // {
      //   id: 9,
      //   nodeKey: 'itemList1',
      //   nodeValue: '',
      //   selectType: 'array',
      //   parent: 'object',
      //   nodeType: 'child',
      //   children: [
      //     {
      //       id: 10,
      //       nodeKey: '0',
      //       nodeValue: 'value1',
      //       selectType: 'string',
      //       parent: 'array',
      //       nodeType: 'child'
      //     },
      //     { nodeType: 'add' }
      //   ]
      // },
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
  },
  {
    label: 'auto',
    value: 'auto'
  }
]

@Component({
  name: 'template-json'
})
export default class TemplateJson extends Vue {
  dataTree = JSON.parse(JSON.stringify(dataTree))
  selectType = selectType
  jsonObj: any = ''
  json: any = ''
  // jsonObj: any = ''
  // @Prop(String) json: any
  // isEdit = true
  // jsonObj: any
  // 添加改变dataTree数据的对象
  dataTreeObj (nodeKey: string|number, nodeValue: string|number|boolean, selectType: string, nodeType: string, isEdit: boolean, textColor: string, parent?: string) {
    if (parent) {
      return {
        id: id++,
        nodeKey,
        nodeValue,
        selectType,
        parent,
        nodeType,
        isEdit,
        textColor
      }
    }
    return {
      id: id++,
      nodeKey,
      nodeValue,
      selectType,
      nodeType,
      isEdit,
      textColor
    }
  }
  // 绑定输入框与键盘输入数据的属性名
  handleInputKey ($event: any, node: any, data: any) {
    data.nodeKey = $event.target.innerText
  }
  // 绑定输入框与键盘输入数据的属性值，auto值的判断
  handleInputValue ($event: any, node: any, data: any) {
    console.log('$event.target.innerText---', $event.target.innerText)
    if (data.nodeType === 'string') {
      data.nodeValue = $event.target.innerText
      data.textColor = 'text-green'
    } else {
      let str = $event.target.innerText
      if (str === 'true') {
        data.nodeValue = true
        data.textColor = 'text-blue'
      } else if (str === 'false') {
        data.nodeValue = false
        data.textColor = 'text-blue'
      } else if (!isNaN(str)) {
        data.nodeValue = Number(str)
        data.textColor = 'text-yellow'
      } else {
        data.nodeValue = str
        data.textColor = 'text-green'
      }
    }
  }
  // 模拟hover，鼠标放到添加时高亮
  handlerMouseEnter (event: any, node: any, data: any) {
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = 'yellow'
  }
  // 模拟hover，鼠标移出添加时去除高亮
  handlerMouseLeave (event: any, node: any, data: any) {
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = ''
  }
  // json转dataTree
  objectOneLayer (res: any) {
    // console.log('res----->>>', res)
    let dataTreeChild: any = []
    let keyArray = Object.keys(res)
    keyArray.forEach((key: any) => {
      // console.log('类型--->>', Object.prototype.toString.call(res[key]))
      if (Object.prototype.toString.call(res[key]) === '[object Object]') {
        if (Object.prototype.toString.call(res) === '[object Object]') {
          dataTreeChild.push(
            Object.assign(
              this.dataTreeObj(key, '', 'object', 'child', true, '', 'object'),
              { children: this.objectOneLayer(res[key]) }
            )
          )
        } else {
          dataTreeChild.push(
            Object.assign(
              this.dataTreeObj(key, '', 'object', 'child', false, '', 'array'),
              { children: this.objectOneLayer(res[key]) }
            )
          )
        }
      } else if (Object.prototype.toString.call(res[key]) === '[object Array]') {
        if (Object.prototype.toString.call(res) === '[object Object]') {
          dataTreeChild.push(
            Object.assign(
              this.dataTreeObj(key, '', 'array', 'child', true, '', 'object'),
              { children: this.objectOneLayer(res[key]) }
            )
          )
          // dataTreeChild.push({
          //   id: id++,
          //   nodeKey: key,
          //   nodeValue: '',
          //   selectType: 'array',
          //   parent: 'object',
          //   nodeType: 'child',
          //   isEdit: true,
          //   children: this.objectOneLayer(res[key])
          // })
        } else {
          dataTreeChild.push(
            Object.assign(
              this.dataTreeObj(key, '', 'array', 'child', false, '', 'array'),
              { children: this.objectOneLayer(res[key]) }
            )
          )
        }
      } else {
        let textColor: string
        if (Object.prototype.toString.call(res[key]) === '[object String]') {
          textColor = 'text-green'
        } else if (Object.prototype.toString.call(res[key]) === '[object Boolean]') {
          textColor = 'text-blue'
        } else {
          textColor = 'text-yellow'
        }
        if (Object.prototype.toString.call(res) === '[object Object]') {
          console.log('父亲为object的nodekey与nodeValue:', key, res[key])
          dataTreeChild.push(
            this.dataTreeObj(key, res[key], 'auto', 'child', true, textColor, 'object')
          )
        } else {
          console.log('父亲为array的nodekey与nodeValue:', key, res[key])
          dataTreeChild.push(
            this.dataTreeObj(key, res[key], 'auto', 'child', false, textColor, 'array')
          )
        }
      }
    })
    dataTreeChild.push({ nodeType: 'add' })
    return dataTreeChild
  }
  dataTreeCreate (res: any) {
    this.dataTree = JSON.parse(JSON.stringify(dataTree))
    if (Object.prototype.toString.call(res) === '[object String]') {
      this.dataTree[0].nodeKey = 'string'
      this.dataTree[0].nodeValue = res
      this.dataTree[0].selectType = 'string'
      this.dataTree[0].textColor = 'text-green'
    } else if (Object.prototype.toString.call(res) === '[object Number]') {
      this.dataTree[0].nodeKey = 'auto'
      this.dataTree[0].nodeValue = res
      this.dataTree[0].selectType = 'auto'
      this.dataTree[0].textColor = 'text-yellow'
    } else if (Object.prototype.toString.call(res) === '[object Boolean]') {
      this.dataTree[0].nodeKey = 'auto'
      this.dataTree[0].nodeValue = res
      this.dataTree[0].selectType = 'auto'
      this.dataTree[0].textColor = 'text-blue'
    } else {
      if (Object.prototype.toString.call(res) === '[object Object]') {
        this.dataTree[0].nodeKey = 'object'
        this.dataTree[0].selectType = 'object'
        this.dataTree[0].children = this.objectOneLayer(res)
      } else {
        this.dataTree[0].nodeKey = 'array'
        this.dataTree[0].selectType = 'array'
        this.dataTree[0].children = this.objectOneLayer(res)
      }
    }
  }
  // 解析json的按钮
  transformJson () {
    try {
      this.json = JSON.stringify(JSON.parse(this.json), null, 4)
      this.jsonObj = JSON.parse(this.json)
      this.dataTreeCreate(this.jsonObj)
    } catch (e) {
      alert('json格式错误')
    }
  }
  mounted () {
    // this.dataTreeCreate(res)
  }

  // dataTree转json
  jsonArray (dataTree: any) {
    let jsonArray: any = []
    let array: any = []
    dataTree.children.forEach((data: any, index: number) => {
      if (index < dataTree.children.length - 1) {
        if (!data.children) {
          // console.log('我的父亲是array进的终点')
          if (data.selectType === 'number') {
            // console.log('parseInt(data.nodeValue).toString()--->>', parseInt(data.nodeValue).toString())
            console.log('data.nodeValue--->>', Object.prototype.toString.call(data.nodeValue))
            if (Object.prototype.toString.call(data.nodeValue) === '[object Number]') {
              jsonArray.push(data.nodeValue)
              // console.log('aaaaaaaa----', parseInt(data.nodeValue))
            } else {
              alert('number类型填写错误')
            }
          } else {
            jsonArray.push(data.nodeValue)
          }
          // jsonArray.push(data.nodeValue)
        } else {
          jsonArray[data.nodeKey] = this.jsonCreate([data])
        }
      }
    })
    return jsonArray
  }
  jsonCreate (dataTree: any) {
    let jsonObject: any = {}
    // console.log('本次循环的数组dataTree--->>>', dataTree)
    dataTree.forEach((value: any) => {
      if (value.selectType) {
        // console.log('本次循环的value--->>', value)

        // console.log('value.children--->>', value.children)
        if (value.selectType === 'object') {
          // console.log('objjjjjjjjjjjjjj')
          if (value.parent !== 'array') {
            jsonObject[value.nodeKey] = this.jsonCreate(value.children)
          } else {
            jsonObject = this.jsonCreate(value.children)
          }
        } else if (value.selectType === 'array') {
          if (value.parent !== 'array') {
            jsonObject[value.nodeKey] = this.jsonArray(value)
          } else {
            jsonObject = this.jsonArray(value)
          }
        } else {
          // 递归终点，没有children
          if (value.parent === 'object') {
            // console.log('我的父亲是object进的终点')
            // if (value.selectType === 'number') {
            //   console.log('parseInt(value.nodeValue).toString()--->>', parseInt(value.nodeValue).toString())
            //   console.log('value.nodeValue--->>', value.nodeValue)
            //   console.log(parseInt(value.nodeValue).toString() === value.nodeValue)
            //   if (Object.prototype.toString.call(value.nodeValue) === '[object Number]') {
            //     jsonObject[value.nodeKey] = value.nodeValue
            //     console.log('bbbbbbbbbb---', jsonObject[value.nodeKey])
            //   } else {
            //     alert('number类型填写错误')
            //   }
            // } else {
            jsonObject[value.nodeKey] = value.nodeValue
            // }
          } else {
            jsonObject = value.nodeValue
          }
          // console.log('无children----->>', jsonObject)
          return jsonObject
        }
      } else {
        return jsonObject
      }
    })
    // console.log('jsonObject---->>', jsonObject)
    return jsonObject
  }
  // 提交json的修改，提交按钮的事件
  submitJson () {
    // console.log('this.dataTree----->>', this.dataTree)
    if (!this.dataTree[0].children) {
      this.jsonObj = this.dataTree[0].nodeValue
    } else {
      let obj = this.jsonCreate(this.dataTree)
      this.jsonObj = obj[this.dataTree[0].nodeKey]
      // console.log('this.jsonObj----->>>', this.jsonObj)
    }
    console.log('this.jsonObj----->>>', this.jsonObj)
    this.json = JSON.stringify(this.jsonObj, null, 4)
    // console.log('this.json---->>', this.json)
  }
  // 下面均为样式中添加或修改数据结构类型的逻辑函数
  findItemIndex (node: any, data: any): any {
    const parent = node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex((d: any) => d.id === data.id)
    return { index, children }
  }
  // 移除节点
  remove (node: any, data: any) {
    const { index, children } = this.findItemIndex(node, data)
    children.splice(index, 1)
  }
  // 添加节点
  add (event: any, node: any, data: any) {
    let newChildArray: object
    if (!node.parent.data.children) {
      this.$set(node.parent.data, 'children', [])
    }
    let index = node.parent.data.children.length - 1
    // let nodeAdd = node.parent.data.children.pop()
    if (node.parent.data.selectType === 'object') {
      // node.parent.data.children.push(newChildObject, { nodeType: 'add' })
      node.parent.data.children.splice(index, 0, this.dataTreeObj('key', 'value', 'auto', 'child', true, 'text-green', 'object'))
    } else {
      let arrayId = node.parent.data.children.length - 1
      node.parent.data.children.splice(index, 0, this.dataTreeObj(arrayId, 'value', 'auto', 'child', false, 'text-green', 'array'))
      // node.parent.data.children.push(newChildArray, { nodeType: 'add' })
    }
  }
  // 复制节点
  copy (node: any, data: any) {
    console.log('复制类型---->>', data)
    const { index, children } = this.findItemIndex(node, data)
    // console.log('children---->>', children)
    // console.log('children.par---->>', node.parent)
    let obj = JSON.parse(JSON.stringify(data))
    obj.id = id++
    children.splice(index + 1, 0, obj)
    if (node.parent.data.selectType === 'array') {
      children.forEach((value: any, index: number) => {
        // console.log('index------>>>', index)
        if (value.nodeKey) {
          value.nodeKey = index
        }
      })
    }
  }
  // 改变节点类型
  dataTreeChange (node: any, data: any) {
    const { index, children } = this.findItemIndex(node, data)
    console.log('切换类型---->>', data)
    console.log('index---->>', index)
    // 改变类型为string
    if (data.selectType === 'string') {
      // 为根节点时，根节点变为string，key不可编辑
      if (!data.parent) {
        children.splice(index, 1, this.dataTreeObj('string', 'value', 'string', 'root', false, 'text-green'))
      } else {
        // 为子节点时，根节点变为string，key可编辑
        // 父节点类型为array时，nodekey不变，不可编辑
        let key = data.nodeKey
        let value = String(data.nodeValue)
        if (data.parent === 'array') {
          children.splice(index, 1, this.dataTreeObj(key, value, 'string', 'child', false, 'text-green', node.parent.data.selectType))
        } else {
          children.splice(index, 1, this.dataTreeObj(key, value, 'string', 'child', true, 'text-green', node.parent.data.selectType))
        }
      }
    } else if (data.selectType === 'auto') {
      if (!data.parent) {
        children.splice(index, 1, this.dataTreeObj('string', 'value', 'auto', 'root', false, 'text-green'))
      } else {
        // 为子节点时，根节点变为string，key可编辑
        let key = data.nodeKey
        let value: string|number|boolean
        let textColor: string
        if (data.nodeValue === 'true') {
          value = true
          textColor = 'text-blue'
        } else if (data.nodeValue === 'false') {
          value = false
          textColor = 'text-blue'
        } else if (!isNaN(data.nodeValue)) {
          value = Number(data.nodeValue)
          textColor = 'text-yellow'
        } else {
          value = data.nodeValue
          textColor = 'text-green'
        }
        if (data.parent === 'array') {
          children.splice(index, 1, this.dataTreeObj(key, value, 'auto', 'child', false, textColor, node.parent.data.selectType))
        } else {
          children.splice(index, 1, this.dataTreeObj(key, value, 'auto', 'child', true, textColor, node.parent.data.selectType))
        }
      }
    } else if (data.selectType === 'object') {
      let edit: boolean
      if (data.parent === 'array' || !data.parent) {
        edit = false
      } else {
        edit = true
      }
      // 原来无children，原类型为string
      if (!data.children) {
        // 操作节点为根节点
        if (!data.parent) {
          children.splice(index, 1, Object.assign(
            this.dataTreeObj('object', '', 'object', 'root', edit, ''),
            { children: [{ nodeType: 'add' }] }
          ))
        } else {
          let key = data.nodeKey
          children.splice(index, 1, Object.assign(
            this.dataTreeObj(key, '', 'object', 'child', edit, '', node.parent.data.selectType),
            { children: [{ nodeType: 'add' }] }
          ))
        }
      } else {
        if (!data.parent) {
          data.nodeKey = 'object'
        }
        data.isEdit = edit
        data.children.forEach((element: any) => {
          element.parent = 'object'
          element.isEdit = true
        })
      }
    } else {
    // 节点类型为array时，父节点若为array，节点的key不可编辑

      let edit: boolean
      console.log('children.parent--->>', data.parent)
      if (data.parent === 'array' || !data.parent) {
        edit = false
      } else {
        edit = true
      }
      if (!data.children) {
        if (!data.parent) {
          children.splice(index, 1, Object.assign(
            this.dataTreeObj('array', '', 'array', 'root', edit, ''),
            { children: [{ nodeType: 'add' }] }
          ))
        } else {
          let key = data.nodeKey
          children.splice(index, 1, Object.assign(
            this.dataTreeObj(key, '', 'array', 'child', edit, '', node.parent.data.selectType),
            { children: [{ nodeType: 'add' }] }
          ))
        }
      } else {
        if (!data.parent) {
          data.nodeKey = 'array'
        }
        data.isEdit = edit
        data.children.forEach((element: any, index: number) => {
          element.nodeKey = index
          element.parent = 'array'
          element.isEdit = false
        })
      }
    }
  }
}
</script>

<style>
.json_page {
  /* display: flex; */
  background-color: white;
  padding: 30px;
}
.json_button {
  /* width: 50px; */
  /* margin: 10px 0; */
  text-align: center;
}
.json_show {
  /* width: 40%; */
  margin: 10px;
}
.json_config {
  /* width: 55%; */
  margin-left: 20px;
  margin: 10px;
  border: 1px solid black;
  height: 500px;
  overflow: auto;
}
.tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.json_page .el-textarea__inner {
  border-color: black;
}

.json_page .el-tree-node__children {
  overflow: visible;
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
  width: 90px;
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
  margin-left: 10px;
}
.json_config .copy {
  display: inline-block;
  margin-left: 10px;
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
  width: 195px;
  background-color: aquamarine;
  padding-left: 5px;
}
.json_config .flexText {
  /* display: flex;
  flex: 1; */
  display: inline-block;
}
.json_config .inner {
  display: inline-block;
  min-width: 10px;
}
.submit-json {
  display: block;
}
.transform-json {
  display: block;
  padding-top: 20px;
}
.json_config .text-green {
  color: green;
}
.json_config .text-blue {
  color: blue;
}
.json_config .text-yellow {
  color: #F78502;
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
