<template>
    <bin-tree :nodes="nodes" :options="options" @add-node="addNode" @remove-node="removeNode" @on-select="selectNode"></bin-tree>
</template>

<script>
    /**
     *  Api
     *      注意： 二叉节点key值根据二进制对应，例如第二层为：0 1 第三层所有节点为：00 01 10 11 ...
     *            若没有path, 则调用方法common/util/setPath去生成
     *  datas: 
     *      options: 配置项,  是一个对象, 包括如下
     *              label: 节点名, 默认为name
     *              recursion: 递归名, 默认为children
     *          
     *  methods: 
     *      @add-node: 点击某节点新增节点时, 返回参数为当前节点, 其下左子节点需要的路径, 其下右节点需要的路径, 自己按照场景组装
     *      @remove-node: 点击某节点删除节点时, 返回参数为当前节点父节点, 会删除另一个兄弟节点
     *      @select-node: 点击某节点, 返回参数为当前节点信息
     */
    import binTree from '@/components/binaryTree/bin-tree.vue'
    export default {
        name: 'binaryTree',
        components: {
            binTree
        },
        data() {
            return {
                options: {
                    label: 'name',
                    recursion: 'children',
                    expandLabel: 'expand'
                },
                nodes: []
            }
        },
        mounted() {
            setTimeout(() => {
                this.nodes = [{
                    name: '根',
                    children: [{
                        name: '子节点1',
                        children: [{
                            name: '孙节点1'
                        }, {
                            name: '孙节点2',
                            children: [{
                                name: '重孙节点1'
                            }, {
                                name: '重孙节点2'
                            }]
                        }]
                    }, {
                        name: '子节点2',
                        children: [{
                            name: '孙节点3',
                            children: [{
                                name: '重孙节点3'
                            }, {
                                name: '重孙节点4'
                            }]
                        }, {
                            name: '孙节点4'
                        }]
                    }]
                }]
            }, 100);
        },
        methods: {
            addNode(node, leftPath, rightPath) {
                node.children.push({
                    name: '新增节点1',
                    path: leftPath
                }, {
                    name: '新增节点2',
                    path: rightPath
                })
            },
            removeNode(parentNode) {
                console.log(parentNode)
            },
            selectNode(node) {
                console.log(node)
            }
        }

    }
</script>