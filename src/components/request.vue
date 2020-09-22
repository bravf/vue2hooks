<style lang="sass" scoped>
.el-card
  margin: 10px
</style>
<template lang="pug">
.request
  h2 test useRequest

  .search
    el-card
      el-form(label-position='top', inline)
        el-form-item(label='时间区间')
          el-date-picker(v-model='searchQState.state.timespan', type='daterange')
        el-form-item(label='姓名')
          el-input(v-model='searchQState.state.name')
        el-form-item(label='性别')
          el-select(v-model='searchQState.state.gender')
            el-option(:value='0', label='男') 
            el-option(:value='1', label='女') 
        el-form-item(label='状态')
          el-radio-group(v-model='searchQState.state.status')
            el-radio(:label='0') Enable
            el-radio(:label='1') Disabled
      el-button(type='primary', @click='pageSearch.search()') 搜索
      el-button(type='primary', @click='pageSearch.reset()') 清空

    el-card
      el-table(v-loading='listReq.state.loading', :data='listReq.state.data')
        el-table-column(prop='id', label='ID')
        el-table-column(prop='name', label='Name')
</template>
<script>
import * as hooks from '../index.js'
export default {
  name: 'Request',
  data() {
    const searchQState = hooks.useQuickState({
      name: '',
      gender: '',
      status: '',
      timespan: [],
    })
    const listReq = hooks.useRequest(this.getList, {
      defaultParams: () => searchQState.state,
    })
    const pageSearch = hooks.usePageSearch({
      quickState: searchQState,
      format: {
        timespan: {
          stringify(value) {
            return +value[0] + '-' + +value[1]
          },
          parse(value) {
            const splitData = value.split('-')
            return [new Date(+splitData[0]), new Date(+splitData[1])]
          },
        },
        gender: {
          parse: (value) => parseInt(value),
        },
        status: {
          parse: (value) => parseInt(value),
        },
      },

      onSearch: () => {
        listReq.run()
      },
      vm: this,
    })
    return {
      searchQState,
      listReq,
      pageSearch,
    }
  },
  methods: {
    getList: (params) => {
      console.log(JSON.stringify(params))
      const mockData = Array(10)
        .fill('')
        .map((i, j) => {
          return {
            id: j,
            name: '张三' + j,
          }
        })
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockData)
        }, 1000)
      })
    },
  },
}
</script>
