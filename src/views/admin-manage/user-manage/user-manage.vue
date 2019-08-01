<template>
  <div>
    <div>用户管理</div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{prop: 'nickname', order: 'descending'}"
    >
      <el-table-column type="singleSelection"></el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        width="100"
      ></el-table-column>
      <el-table-column
        sortable
        prop="gradeGroup"
        label="大组"
        width="100"
      ></el-table-column>
      <el-table-column
        sortable
        prop="courseName"
        label="课程名称"
      ></el-table-column>
      <el-table-column
        prop="labelInfo"
        label="动作标签"
        width="180"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text-primary"
            :data-row="scope.row"
          >编辑</el-button>
          <i class="split"></i>
          <el-button
            size="mini"
            type="text-primary"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import AdminManage from '@/api/admin-manage'
const tableData = [
  {
    nickname: '雪雯',
    gradeGroup: '小学',
    courseName: '【2018秋】初二英语尖端培优3班',
    labelInfo: '方法建议,解决问题'
  },
  {
    nickname: '青木',
    gradeGroup: '拉新',
    courseName: '【2018秋】高一化学尖端培优2班',
    labelInfo: '方法建议,解决问题'
  },
  {
    nickname: '闻岚',
    gradeGroup: '高中',
    courseName: '【2018秋】初二物理尖端培优6班（全国通用版）',
    labelInfo: '方法建议,发送资料'
  },
  {
    nickname: '由希',
    gradeGroup: '拉新',
    courseName: '【2018秋】中考物理强化提升2班（全国通用版',
    labelInfo: '方法建议,发送资料'
  },
  {
    nickname: '若曦',
    gradeGroup: '拉新',
    courseName: '【2018秋】【目标985】高考物理一轮长期2班',
    labelInfo: '方法建议,发送资料'
  }
]

@Component
export default class UserManage extends Vue {
  /** data */
  tableData = tableData
  /** hook */
  created () {
    this.getListData()
    this.getTerms()
  }
  /** methods */
  getListData () {
    AdminManage.getList().then(res => {
      console.log(res)
    })
  }
  getTerms () {
    AdminManage.getTerms().then(res => {
      console.log(res)
    })
  }
}
</script>
