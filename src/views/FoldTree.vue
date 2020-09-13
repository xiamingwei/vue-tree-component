<template>
    <div class="v-org-tree">
        <v-menu-tree :nodes="nodes" :options="options" @select-node="selectNode" @select-menu="selectMenu"></v-menu-tree>
    </div>
</template>

<script>
    /**
     *  Api
     *    
     *  datas: 
     *      isMenu: 是否显示右边菜单栏, 默认是
     *      options: 配置项,  是一个对象, 包括如下
     *              label: 节点名, 默认为name
     *              recursion: 递归名, 默认为children
     *              expandLabel: 节点展开表示符, 默认值为expand,
     *              menuList为菜单右键菜单操作项, 其value为操作key值, label为显示名称,
     *          
     *  methods: 
     *      @select-node: 点击某节点回调, 返回当前节点信息
     *      @select-menu: 点击某菜单项的选项, 返回 菜单的标识和当前节点信息
     */
    import vMenuTree from '@/components/foldTree/v-menu-tree.vue'
    import { setPath } from '@/common/util.js'
    export default {
        name: 'tree',
        components: {
            vMenuTree
        },
        data() {
            return {
                nodes: [],
                options: {
                    menuList: [{
                        label: '新增',
                        value: 'add'
                    }, {
                        label: '修改',
                        value: 'edit'
                    }, {
                        label: '删除',
                        value: 'delete'
                    }, {
                        label: '详情',
                        value: 'detail'
                    }],
                    recursion: 'children',
                    label: 'name',
                    expandLabel: 'expand',
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.nodes = [{
                    name: '根',
                    expand: true,
                    children: [{
                        name: '孩子1',
                        expand: true,
                        children: [{
                            name: '孙子1',
                            expand: true,
                            children: [{
                                name: '祖孙12222222111x'
                            }, {
                                name: '祖孙2x'
                            }, {
                                name: '祖孙3'
                            }, {
                                name: '祖孙4'
                            }, {
                                name: '祖孙5'
                            }, {
                                name: '祖孙6'
                            }]
                        }]
                    }, {
                        name: '孩子2'
                    }, {
                        name: '孩子3',
                        expand: true,
                        children: [{
                            name: '孙子2',
                            expand: true,
                            children: [{
                                name: '222'
                            }]
                        }, {
                            name: '孙子3'
                        }]
                    }, {
                        name: '孩子4'
                    }]
                }]
            }, 100)
        },
        methods: {
            // 第一个参数为选择菜单的信息， 第二个参数为当前要操作的节点
            selectMenu(menu, node) {
                console.log(menu, node)
            },
            selectNode(node) {
                console.log(node)
            }
        }
    }
</script>

<style lang="less" scoped>
    .v-org-tree {
        display: flex;
    }
</style>