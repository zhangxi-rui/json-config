<template>
  <div>
    <template-search
      :search-data='searchData'
      :operation-btns='operationBtns'
      @opeationEvent="handleOpeartion"
      @selectChange="change"
    ></template-search>
    <template-json
      :json='json'
      ref="jsonConfig"
    ></template-json>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Ref } from 'vue-property-decorator'
import TemplateJson from './template-json.vue'
import TemplateSearch from '@/components/template-search.vue'
import { searchData, operationBtns } from './config'
import { getModules, getModuleConfig } from '@/api/modules-config'

@Component({
  name: 'json-config',
  components: { TemplateJson, TemplateSearch }
})
export default class JsonConfig extends Vue {
  public searchData: any
  public operationBtns: any
  public systemId: string
  public json: any
  public formData: any

  @Ref('jsonConfig') jsonConfig: any

  constructor () {
    super()
    this.searchData = JSON.parse(JSON.stringify(searchData))
    this.operationBtns = operationBtns
    this.systemId = ''
    this.json = ''
    this.formData = ''
  }
  handleOpeartion (role: any, formData: any) {}
  created () {
    this.init()
  }
  async init () {
    // console.log('this.$route.meta.systemId--->', this.$route.meta.systemId)
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
  }
  async change (value: any, formData: any) {
    // let obj = { systemId: this.$route.meta.systemId, formKey: formData.formKey }
    // this.getModuleConfig(formData)
    let res: any = await getModuleConfig({ systemId: this.$route.meta.systemId, formKey: formData.formKey })
    this.json = JSON.stringify(res)
    console.log('this.jsonObj----->>', this.json)

    this.jsonConfig.transformJson()
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
