<template>
    <b-tree :nodes="nodes" :options="options" class="s-binary-tree"></b-tree>
</template>

<script>
    import bTree from './b-tree.vue'
    export default {
        name: 'binTree',
        provide() {
            return {
                addNode: this.addNode,
                removeNode: this.removeNode,
                selectNode: this.selectNode
            }
        },
        props: {
            nodes: {
                type: Array
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        label: 'name',
                        recursion: 'children'
                    }
                }
            }
        },
        components: {
            bTree
        },
        methods: {
            // 递归为树生成唯一path(key)值
            setPath(nodes, isRoot = true) {
                nodes.map(node => {
                    if (isRoot) {
                        // 设置根节点标识, 其余按二进制来
                        node.path = 'root'
                        isRoot = false
                    }

                    if (node.children) {
                        node.children.map((children, index) => {
                            let path = node.path === 'root' ? '' : node.path
                            children.path = `${path}${index}`
                        })
                        this.setPath(node.children, false)
                    }
                })

                return nodes
            },
            addNode(node) {
                this.$set(node, 'children', [])
                this.$emit('add-node', node, `${node.path}0`, `${node.path}1`)
            },
            removeNode(parentNode) {
                if (parentNode && parentNode.children) {
                    parentNode.children = []
                    delete parentNode.children
                }

                this.$emit('remove-node', parentNode)
            },
            selectNode(node) {
                this.$emit('on-select', node)
            }
        },
        watch: {
            nodes(val) {
                val = this.setPath(val)
            }
        }
    }
</script>

<style lang="less" scoped>
    .s-binary-tree {
        width: 100%;
        overflow-x: auto;
        font-size: 12px !important;
        margin: 0;
        padding: 0;
        font-family: "思源黑体 CN", "Open Sans", "微软雅黑", "microsoft yahei", "黑体", arial, sans-serif !important;
    }

    //  滑动条样式
    ::-webkit-scrollbar

    /*整体部分*/
        {
        width: 10px;
        height: 10px;
    }

    ::-webkit-scrollbar-track

    /*滑动轨道*/
        {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
        border-radius: 0px;
        background: rgba(0, 0, 0, 0.1);
    }

    ::-webkit-scrollbar-thumb

    /*滑块*/
        {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
        background: rgba(0, 0, 0, 0.1);
    }

    ::-webkit-scrollbar-thumb:hover

    /*滑块效果*/
        {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
        background: rgba(0, 0, 0, 0.3);
    }
</style>