import Vue from 'vue'
const useReactive = obj => Vue.observable(obj)
export default useReactive
