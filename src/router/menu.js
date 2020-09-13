export let menus = [{
    name: 'treeComponent',
    meta: {
        title: '树形组件'
    },
    children: [{
        path: '/tree',
        name: 'tree',
        meta: {
            title: '展示树'
        },
        component: () => import('@/views/Tree.vue')
    }, {
        path: '/binaryTree',
        name: 'binaryTree',
        meta: {
            title: '动态二叉树'
        },
        component: () => import('@/views/BinaryTree.vue')
    }, {
        path: '/foldTree',
        name: 'foldTree',
        meta: {
            title: '折叠树'
        },
        component: () => import('@/views/FoldTree.vue')
    }, {
        path: '/selectTree',
        name: 'selectTree',
        meta: {
            title: '下拉选择树'
        },
        component: () => import('@/views/SelectTree.vue')
    }, {
        path: '/treeTable',
        name: 'treeTable',
        meta: {
            title: '树形表'
        },
        component: () => import('@/views/TreeTable.vue')
    }, {
        path: '/binaryTable',
        name: 'binaryTable',
        meta: {
            title: '动态二叉表'
        },
        component: () => import('@/views/BinaryTable.vue')
    }]
}]
