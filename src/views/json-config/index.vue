<template>
  <div>
    <!-- <template-search
      :search-data='searchData'
      :operation-btns='operationBtns'
      @opeationEvent="handleOpeartion"
      @selectChange="change"
      ref="search"
    ></template-search> -->
    <div class="select-operate">
      <div class="select-module">
        <span>模块选择：</span>
        <el-select
          v-model="formKey"
          size="small"
          @change="change"
          placeholder="请选择模块"
        >
          <el-option
            v-for="item in options"
            :key="item.formId"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="btn">
        <el-button size="small" type="primary" @click="handleCreate">新建</el-button>
        <el-button size="small" type="primary" @click="handleChange">修改</el-button>
        <el-button size="small" type="primary" @click="handleSubmit">上传</el-button>
      </div>
    </div>
    <template-json
      ref="jsonConfig"
    ></template-json>
    <el-dialog
      title="新建模块"
      :visible.sync="isDialog"
      size="small"
      center
    >
      <el-form :model="formCreateData">
        <el-form-item
          label="formKey"
          size="medium"
        >
          <el-input
            v-model="formCreateData.formKey"
            size="medium"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="formName"
          size="medium"
        >
          <el-input
            v-model="formCreateData.formName"
            size="medium"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button
          @click="createModule"
          size="small"
          type="primary"
          v-if="isCreate"
        >新建</el-button>
        <el-button
          @click="changeModule"
          size="small"
          type="primary"
          v-if="!isCreate"
        >修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from 'vue-property-decorator'
import TemplateJson from './template-json.vue'
import TemplateSearch from '@/components/template-search.vue'
import { searchData, operationBtns } from './config'
import { getModules, getModuleConfig, createUpdate } from '@/api/modules-config'

interface CreateModuleData {
  formId?: number
  formKey?: string
  formName?: string
}

@Component({
  name: 'json-config',
  components: { TemplateJson, TemplateSearch }
})
export default class JsonConfig extends Vue {
  public searchData: any
  public operationBtns: any
  public systemId: string
  // public json: any
  public isDialog: boolean
  public formCreateData: CreateModuleData
  public options:Array<any>
  public formKey:any
  public isCreate: boolean
  @Ref('jsonConfig') jsonConfig: any
  @Ref('search') search:any

  constructor () {
    super()
    this.searchData = JSON.parse(JSON.stringify(searchData))
    this.operationBtns = operationBtns
    this.systemId = ''
    // this.json = ''
    this.isDialog = false
    this.formCreateData = {}
    this.options = []
    this.formKey = ''
    this.isCreate = true
  }
  // handleOpeartion (role: any, formData: any) {
  //   if (role === 'create') {
  //     this.handleCreate()
  //   }else{
  //     this.handleSubmit()
  //   }
  // }
  // 获取select的选择列表
  objForm () {
    let objMap = new Map()
    for (let i of this.options) {
      objMap.set(i.value, { formName: i.label, formId: i.formId })
    }
    return objMap
  }
  handleCreate () {
    this.formCreateData = {}
    this.isDialog = true
    this.isCreate = true
  }
  handleChange () {
    this.isDialog = true
    this.isCreate = false
    let objMap = this.objForm()
    this.formCreateData.formKey = this.formKey
    // this.formCreateData.formName = objForm[this.formKey]
    this.formCreateData.formName = objMap.get(this.formKey).formName
    this.formCreateData.formId = objMap.get(this.formKey).formId
    console.log('this.formCreateData---->>', this.formCreateData)
  }

  // 上传
  async handleSubmit () {
    let objMap = this.objForm()
    this.update(objMap.get(this.formKey).formId, this.formKey, objMap.get(this.formKey).formName)
  }
  mounted () {
    console.log('this---->>', this)
    this.init()
  }
  // 新建一个模块
  async createModule () {
    // console.log(this.formCreateData)
    let obj: any = {
      formConf: {
        searchData: [
          {
            label: '',
            prop: '',
            type: '',
            labelWidth: '',
            defaultValue: '',
            required: true,
            options: [
              {
                label: '',
                value: ''
              }
            ],
            placeholder: ''
          }
        ],
        operationBtns: [
          {
            role: '',
            text: '',
            url: '',
            needRequirement: false
          }
        ],
        searchTip: ''
      },
      renderConf: {
        tableItems: [
          {
            label: '',
            prop: '',
            width: ''
          }
        ]
      }
    }
    // console.log(obj)
    let res: any = await createUpdate({
      formKey: this.formCreateData.formKey,
      formName: this.formCreateData.formName,
      systemId: this.$route.meta.systemId,
      formConf: JSON.stringify(obj.formConf),
      renderConf: JSON.stringify(obj.renderConf)
    })
    if (res) {
      this.$message({
        message: '创建成功',
        center: true
      })
    } else {
      this.$message({
        message: '创建失败',
        center: true
      })
    }
    await this.getModules()
    // this.options.push({ label: this.formCreateData.formName, value: this.formCreateData.formKey })
    // this.searchData[0].options.push({label: this.formCreateData.formName, value: this.formCreateData.formKey })
    // console.log('this.search.formData-->>',this.search.formData)
    // this.search.formData.formKey = this.formCreateData.formKey
    this.formKey = this.formCreateData.formKey
    this.jsonConfig.json = JSON.stringify(obj, null, 4)
    this.jsonConfig.dataTreeCreate(obj)
    this.isDialog = false
    this.formCreateData = {}
    console.log('aaaaaa-->>', res)
    // if (!res.errNo) {
    //   this.isDialog = false
    //   console.log('1111111111111111')
    // }
  }
  // 修改模块名
  async changeModule () {
    console.log('this.formCreateData---->>', this.formCreateData)
    let res: any = await this.update(this.formCreateData.formId, this.formCreateData.formKey || '', this.formCreateData.formName || '')
    // this.update(this.formCreateData.formKey||'')
    await this.getModules()
    console.log('修改模块--->>', res)
    this.formKey = this.formCreateData.formKey
    this.isDialog = false
    this.formCreateData = {}
  }
  // 获取所有的模块
  async getModules () {
    this.options = []
    let res: any = await getModules({ systemId: this.$route.meta.systemId })
    console.log('获取所有的模块--->>', res)
    // this.searchData[0].options = []
    console.log('res.list--->', res.list)
    if (res) {
      res.list.forEach((val: any) => {
        // console.log('val', val)
        let obj = { label: val.formName, value: val.formKey, formId: val.formId }
        console.log('obj---->>', obj)
        // this.searchData[0].options.push(obj)
        this.options.push(obj)
      })
    } else {
      this.$message({
        message: '暂无模块',
        center: true
      })
    }
  }
  async update (formId: any, formKey: string, formName: string) {
    this.jsonConfig.submitJson()
    let obj = JSON.parse(this.jsonConfig.json)
    // console.log(obj)
    // let objMap = this.objForm()
    let dataObj = {
      // formkey: this.search.formData.formKey,
      formId: formId,
      formKey: formKey,
      formName: formName,
      systemId: this.$route.meta.systemId,
      formConf: JSON.stringify(obj.formConf),
      renderConf: JSON.stringify(obj.renderConf)
    }
    console.log('dataObj----->>', dataObj)
    let res: any = await createUpdate(dataObj)
  }
  async init () {
    // console.log('this.$route.meta.systemId--->', this.$route.meta.systemId);
    // (this.$refs.search as any).formData = {}
    console.log(this.jsonConfig)
    // this.search.formData = {formKey:''}
    this.formKey = ''
    // this.searchData = JSON.parse(JSON.stringify(searchData))
    await this.getModules()
    // console.log(this.searchData)
    this.jsonConfig.json = ''
    this.jsonConfig.dataTreeCreate({})
  }
  async change () {
    // let obj = { systemId: this.$route.meta.systemId, formKey: formData.formKey }
    // this.getModuleConfig(formData)
    let res: any = await getModuleConfig({ systemId: this.$route.meta.systemId, id: this.formKey })
    this.jsonConfig.json = JSON.stringify(res, null, 4)
    // console.log('this.jsonObj----->>', this.json)
    this.jsonConfig.dataTreeCreate(res)
  }
  // async getModuleConfig (formData: any) {
  //   let res: any = await getModuleConfig({ systemId: this.$route.meta.systemId, formKey: formData.formKey })
  //   this.jsonObj = res.data
  // }
  @Watch('$route')
  onRouteChange (to: any, from: any) {
    console.log('to---->>', to)
    this.init()
  }
}
</script>

<style>
.select-operate{
  display: flex;
  background-color: white;
  margin-bottom: 20px;
}
.select-module{
  display: inline-block;
  flex: 1;
  padding: 10px 50px;
}
.btn{
  display: inline-block;
  width: 300px;
  padding: 10px;
}
</style>
