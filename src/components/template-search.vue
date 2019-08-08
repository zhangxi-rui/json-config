/*
 * @Author: Sun Yuanbo
 * @Date: 2019-03-08 15:39:39
 * @Last Modified by: Kong LiLi
 * @Last Modified time: 2019-06-03 20:15:20
 * @Description: 搜索模板页
 */
<template>
  <div class="template-search">
    <el-form
      :model="formData"
      :inline="inline"
      :rules="formRules"
      ref="searchForm"
      :class="{'search-form':true, 'search-form-inline': inline}"
    >
      <div
        v-for="(item, idx) in searchData"
        :key="idx"
        class="search-form-item"
      >
        <el-form-item
          v-if="!item.type"
          :label-width="item.labelWidth || '60px'"
          :prop="item.prop"
          class="searchItem"
          size="small"
          :label="item.label"
        >
          <el-input
            v-model="formData[item.prop]"
            size="small"
            :placeholder="item.placeholder"
          />
        </el-form-item>
        <el-form-item
          v-if="item.type === 'select'"
          :prop="item.prop"
          class="searchItem"
          size="small"
          :label-width="item.labelWidth || '60px'"
          :label="item.label"
        >
          <el-select
            v-model="formData[item.prop]"
            size="small"
            :disabled="item.disabled || false"
            :multiple="item.multiple"
            :clearable="item.clearable || false"
            @change="change(...arguments, item.prop, item)"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="({value, label, disabled}, i) in item.options"
              :key="i"
              :disabled="disabled || false"
              :label="label"
              :value="value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="item.type === 'daterange'"
          :prop="item.prop"
          size="small"
          class="searchItem"
          :label-width="item.labelWidth || '60px'"
          :label="item.label"
        >
          <el-date-picker
            v-model="formData[item.prop]"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
            size="small"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </div>
    </el-form>
    <div class="operate-btns">
      <div
        v-for="(item, idx) in operationBtns"
        :key="idx"
        class="btn"
      >
        <el-button
          size="small"
          :disabled="item.handler && !item.handler(formData, listLength,$refs['searchForm'])"
          :type="item.type || 'primary'"
          @click="handleBtnClicked(item.role)"
        >
          {{ item.text }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
@Component({
  name: 'template-search'
})
export default class TemplateSearch extends Vue {
  @Prop({ default: true }) inline?: boolean
  @Prop({ default: false }) isSelectChange?: boolean
  @Prop(Array) searchData!: Array<object>
  @Prop(Array) operationBtns?: Array<object>
  @Prop(Number) listLength?: number
  @Prop(Object) formRule?: object
  @Prop({ default: false }) isCustom?: boolean
  public formData: any
  public formRules: any
  constructor () {
    super()
    this.formData = {}
    this.formRules = this.formRule || {}
  }
  public created (): void {
    this.setDefault()

    this.searchData.forEach((item: any) => {
      if (item.type === 'select' && item.multiple) {
        if (item.defaultValue.indexOf(-1) > -1) {
          item.options.forEach((v: any) => {
            if (v.value !== -1) {
              v.disabled = true
            }
          })
        } else if (item.defaultValue.length > 0) {
          item.options.forEach((v: any) => {
            if (v.value === -1) {
              v.disabled = true
            }
          })
        }
      }
    })
  }

  get formDataJson () {
    return JSON.stringify(this.formData)
  }

  change (value: any, prop: string, item: any) {
    console.log(value)
    console.log(prop)
    console.log(item)
    console.log(this.formData)
    this.$emit('selectChange', value, this.formData)
    if (this.isSelectChange) {
      if (prop === 'businessType') {
        this.$emit('selectChange', value, this.formData)
      } else {
        let index = this.formData[prop].indexOf(-1)
        if (Array.isArray(this.formData[prop])) {
          // 如果选择全部就置为[-1]
          if (value[value.length - 1] === -1) {
            this.formData[prop] = [-1]
            // 如果之前选了全部又选其他的，就去除全部
          } else if (index !== -1) {
            this.formData[prop].splice(index, 1)
          }
        }
      }
    }
    if (this.isCustom && item.multiple) {
      if (value.indexOf(-1) > -1) {
        this.formData[prop] = [-1]
        item.options.forEach((v: any) => {
          if (v.value !== -1) {
            v.disabled = true
          } else {
            v.disabled = false
          }
        })
      } else if (value.length > 0) {
        item.options.forEach((v: any) => {
          if (v.value === -1) {
            v.disabled = true
          } else {
            v.disabled = false
          }
        })
      } else {
        item.options.forEach((v: any) => {
          v.disabled = false
        })
      }
    }
  }

  setDefault () {
    this.searchData.forEach((data: any) => {
      let defaultValue = data.defaultValue
      if (defaultValue !== undefined) {
        this.$set(this.formData, data.prop, defaultValue)
      } else {
        this.$set(this.formData, data.prop, '')
      }
    })
  }
  handleBtnClicked (role: string) {
    if (role === 'reset') {
      this.setDefault()
      return
    }
    this.$emit('opeationEvent', role, this.formData)
  }

  @Watch('formDataJson')
  onChildChanged (val: string, oldVal: string) {
    this.$emit('formDataChanged', JSON.parse(val), JSON.parse(oldVal))
  }
}
</script>
<style lang="scss">
.template-search .el-form-item__error {
  display: none;
}
.template-search .el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.template-search .el-form-item.is-success .el-input__inner {
  border-color: #e1e2e6;
}
</style>
<style lang="scss" scoped>
.search-form {
  background: #fff;
  padding: 16px;
  padding-top: 0;
  .searchItem {
    margin-top: 16px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  &-inline {
    display: flex;
    flex-wrap: wrap;
  }
  .search-form-item {
    margin-right: 10px;
  }
}
.operate-btns {
  background: #fff;
  padding: 16px 24px;
  margin: 16px 0;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  .btn {
    margin-right: 18px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
