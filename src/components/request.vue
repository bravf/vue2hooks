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
      el-button(
        type='primary',
        @click='() => { writeQState.state.type = "add"; writeSwitch.on(); }'
      ) 新增

    el-card
      el-table(v-loading='listReq.state.loading', :data='listReq.state.data')
        el-table-column(prop='id', label='ID')
        el-table-column(prop='name', label='Name')
        el-table-column(label='操作', width='80', align='center')
          template(v-slot='scope')
            el-button(@click='updateClick(scope.row)') 编辑

  el-dialog(
    :visible.sync='writeSwitch.state.value',
    :title='writeQState.state.type === "add" ? "新增" : "编辑"',
    @closed='() => { this.$refs.writeForm.resetFields(); }'
  )
    el-form(label-position='left', :model='writeQState.state', ref='writeForm')
      el-form-item(label='姓名', prop='name', :rules='[{ required: true }]')
        el-input(v-model='writeQState.state.name')

    .footer(slot='footer')
      el-button(
        v-if='writeQState.state.type === "add"',
        type='primary',
        @click='writeConfirmClick',
        v-loading='addReq.state.loading'
      ) 新增
      el-button(
        v-else,
        type='primary',
        @click='writeConfirmClick',
        v-loading='updateReq.state.loading'
      ) 编辑
</template>
<script>
import * as hooks from '../index.js'
const testPromise = (testData, timeout) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(testData)
    }, timeout || 500)
  })
export default {
  name: 'Request',
  data() {
    // search
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
          parse: value => parseInt(value),
        },
        status: {
          parse: value => parseInt(value),
        },
      },

      onSearch: () => {
        listReq.run()
      },
      vm: this,
    })

    // 编辑新增
    const writeQState = hooks.useQuickState({
      name: '',
      id: '',
      type: 'add',
    })
    const writeSwitch = hooks.useSwitch()
    const addReq = hooks.useRequest(this.add, {
      defaultParams: () => {
        const params = writeQState.clone()
        delete params['type']
        delete params['id']
        return params
      },
      onSuccess: () => {
        this.$message({ type: 'success', message: '新增成功' })
        writeSwitch.off()
      },
    })
    const updateReq = hooks.useRequest(this.update, {
      defaultParams: () => {
        const params = writeQState.clone()
        delete params['type']
        return params
      },
      onSuccess: () => {
        this.$message({ type: 'success', message: '更新成功' })
        writeSwitch.off()
      },
    })

    hooks.useEventOn(
      'hello',
      () => {
        console.log('hello emit')
      },
      this,
    )
    hooks.useEventOff('hello')
    hooks.useEventEmit('hello')

    hooks.useEventOnce('world', () => {
      console.log('world emit')
    })
    hooks.useEventEmit('world')

    return {
      searchQState,
      listReq,
      pageSearch,

      writeQState,
      writeSwitch,
      addReq,
      updateReq,
    }
  },
  methods: {
    updateClick(data) {
      this.writeQState.state.type = 'update'
      this.writeQState.assign(data)
      this.writeSwitch.on()
    },
    writeConfirmClick() {
      this.$refs.writeForm.validate(valid => {
        if (valid) {
          if (this.writeQState.state.type === 'add') {
            this.addReq.run()
          } else {
            this.updateReq.run()
          }
        }
      })
    },
    // request
    getList(params) {
      console.log('search-list:', JSON.stringify(params))
      const mockData = Array(10)
        .fill('')
        .map((i, j) => {
          return {
            id: j,
            name: '张三' + j,
          }
        })
      return testPromise(mockData)
    },
    add(params) {
      console.log('add:', JSON.stringify(params))
      return testPromise({ code: 0 })
    },
    update(params) {
      console.log('update:', JSON.stringify(params))
      return testPromise({ code: 0 })
    },
  },
}
</script>
