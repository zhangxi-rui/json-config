<template>
  <div>
    <template-search
      :search-data='searchData'
      :operation-btns='operationBtns'
      @opeationEvent="handleOpeartion"
      @selectChange="change"
      ref="search"
    ></template-search>
    <template-json
      :json='json'
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
        >新建</el-button>
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
  public json: any
  public isDialog: boolean
  public formCreateData: CreateModuleData
  @Ref('jsonConfig') jsonConfig: any
  @Ref('search') search:any

  constructor () {
    super()
    this.searchData = JSON.parse(JSON.stringify(searchData))
    this.operationBtns = operationBtns
    this.systemId = ''
    this.json = ''
    this.isDialog = false
    this.formCreateData = {}
  }
  handleOpeartion (role: any, formData: any) {
    if (role === 'create') {
      this.handleCreate()
    }else{
      this.handleSubmit()
    }
  }
  handleCreate () {
    this.isDialog = true
  }
  async handleSubmit(){
    let obj = JSON.parse(this.json)
    console.log(obj)
    let objForm:any = {}
    for(let i of this.searchData[0].options){
      objForm[i.value]=i.label
    }
    let res: any = await createUpdate({
      formkey: this.search.formData.formKey,
      formName: objForm[this.search.formData.formKey],
      systemId: this.$route.meta.systemId,
      formConf: obj.formConf,
      renderConf: obj.renderConf
    })
  }
  mounted () {
    console.log('this---->>', this)
    this.init()
  }
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
      formkey: this.formCreateData.formKey,
      formName: this.formCreateData.formName,
      systemId: this.$route.meta.systemId,
      formConf: obj.formConf,
      renderConf: obj.renderConf
    })
    this.searchData[0].options.push({label: this.formCreateData.formName, value: this.formCreateData.formKey })
    console.log('this.search.formData-->>',this.search.formData)
    this.search.formData.formKey = this.formCreateData.formKey
    this.json = JSON.stringify(obj, null, 4)
    this.jsonConfig.dataTreeCreate(obj)
    this.isDialog = false
    this.formCreateData = {}
    console.log('aaaaaa-->>', res)
    // if (!res.errNo) {
    //   this.isDialog = false
    //   console.log('1111111111111111')
    // }
  }

  async init () {
    // console.log('this.$route.meta.systemId--->', this.$route.meta.systemId);
    // (this.$refs.search as any).formData = {}
    this.search.formData = {formKey:''}
    this.searchData = JSON.parse(JSON.stringify(searchData))
    let res: any = await getModules({ systemId: this.$route.meta.systemId })
    this.searchData[0].options = []
    console.log('res.list--->', res.list)
    res.list.forEach((val: any) => {
      // console.log('val', val)
      let obj = { label: val.formName, value: val.formKey }
      console.log('obj---->>', obj)
      this.searchData[0].options.push(obj)
    })
    console.log(this.searchData)
    this.json = ''
    this.jsonConfig.dataTreeCreate({})
  }
  async change (value: any, formData: any) {
    // let obj = { systemId: this.$route.meta.systemId, formKey: formData.formKey }
    // this.getModuleConfig(formData)
    let res: any = await getModuleConfig({ systemId: this.$route.meta.systemId, formKey: formData.formKey })
    this.json = JSON.stringify(res, null, 4)
    console.log('this.jsonObj----->>', this.json)

    this.jsonConfig.dataTreeCreate(res)
  }
  // async getModuleConfig (formData: any) {
  //   let res: any = await getModuleConfig({ systemId: this.$route.meta.systemId, formKey: formData.formKey })
  //   this.jsonObj = res.data
  // }
  @Watch('$route')
  onRouteChange (to: any, from: any) {
    // console.log('to---->>', this.$route.meta.systemId)
    this.init()
  }
}
</script>
