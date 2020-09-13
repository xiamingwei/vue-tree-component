<template>
    <sel-tree :nodes="nodes" @select-node="selectNode" @on-change="change" :clearable="true"></sel-tree>
</template>

<script>
 /**
     *  Api
     *    
     *  datas: 
     *      options: 配置项,  是一个对象, 包括如下
     *              label: 节点名, 默认为name
     *              recursion: 递归名, 默认为children
     *              expandLabel: 节点展开表示符, 默认值为expand
     *      clearable: 是否显示清除图标
     *          
     *  methods: 
     *      @select-node: 点击某节点回调，返回当前节点信息
     *      @on-change: 每次变化时的回调, 返回变化的path值
     */
    import selTree from '@/components/selectTree/sel-tree.vue'
    export default {
        name: 'selectTree',
        components: {
            selTree
        },
        data() {
            return {
                nodes: []
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
                                name: '祖孙12222222啊啊'
                            }, {
                                name: '祖孙2'
                            }, {
                                name: '祖孙3'
                            }, {
                                name: '祖孙3'
                            }, {
                                name: '祖孙3'
                            }, {
                                name: '祖孙3'
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
            }, 100);
        },
        methods: {
            selectNode(node) {
                console.log(node)
            },
            change(path) {
                console.log('change', path)
            }
        }
    }
</script>