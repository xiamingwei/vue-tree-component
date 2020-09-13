import { menus } from './menu.js'
import { deepClone } from '@/common/util.js'
import store from '@/store'

let route = []

// 通过菜单递归生成路由表
function generateRoutes(menus) {
    menus.map(menu => {
        let children = deepClone(menu.children)
        if(children) {
            route = route.concat(children)
        } else {
            generateRoutes(children)
        }
    })
}

generateRoutes(menus)
store.commit('setMenus', menus)

const routes = [{
    path: '/',
    component: () => import('@/views/Home.vue'),
    redirect: route[0].path,
    children: route
}]

export default routes