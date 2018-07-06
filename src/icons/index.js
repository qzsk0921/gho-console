import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'
import generateIconsView from '@/view/svg-icons/generateIconView.js'// 只适用于views，测试用

Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const iconMap = requireAll(req)
console.log(iconMap, req)

generateIconsView.generate(iconMap) // 只适用于views，测试用
