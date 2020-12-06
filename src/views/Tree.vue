<template>
    <div class="c-tree">
        <forest-tree :nodes="nodes" :options="options" @on-expand="expand" :lazy="true" @loading-node="loadingNode"></forest-tree>
    </div>
</template>

<script>
    /**
     *  Api
     *    
     *  datas: 
     *      数据项: nodes
     *      lazy: 是否开启懒加载
     *      options: 配置项,  是一个对象, 包括如下
     *              label: 节点名, 默认为name
     *              recursion: 递归名, 默认为children
     *              expandLabel: 展开标识符, 默认为expand
     *   methods: 
     *      @on-expand: 展开/收缩时候的回调, 返回值为当前节点的信息
     *      @loading-node: 懒加载调用方法
     *    
     */
    import forestTree from '@/components/tree/forest-tree.vue'
    export default {
        name: 'tree',
        components: {
            forestTree
        },
        data() {
            return {
                options: {
                    label: 'name',
                    recursion: 'children',
                    expandLabel: 'expand'
                },
                nodes: [],
                loading: false
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
                                name: '祖孙12222222'
                            }, {
                                name: '祖孙2'
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
                                name: '祖孙7',
                                expand: true,
                                children: [{
                                    name: '重孙1',
                                    expand: true,
                                    children: [{
                                        name: '重重孙1'
                                    }, {
                                        name: '重重孙2'
                                    }]
                                }]
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
            expand(node) {
                console.log(node)
            },
            loadingNode(node) {
                node.loading = true
                setTimeout(() => {
                    node.children.push({
                        name: '动态加载节点1',
                        path: `${node.path}0`,
                    }, {
                        name: '动态加载节点2',
                        path: `${node.path}1`,
                    }, {
                        name: '动态加载节点3',
                        path: `${node.path}2`,
                    }, {
                        name: '动态加载节点4',
                        path: `${node.path}3`,
                    })
                    node.loading = false
                }, 1000)
                console.log(node)
            }
        }
    }
</script>

<style lang="less" scoped>
    .c-tree {
        display: flex;
    }
</style>