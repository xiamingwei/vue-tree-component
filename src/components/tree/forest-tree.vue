<template>
    <c-tree :nodes="nodes" :options="options" :lazy="lazy" class="s-forest-tree"></c-tree>
</template>

<script>
    import cTree from './c-tree.vue'
    export default {
        name: 'tree',
        provide() {
            return {
                expand: this.expand,
                loadingNode: this.loadingNode
            }
        },
        props: {
            options: {
                type: Object,
                default: () => {
                    return {
                        label: 'name',
                        recursion: 'children',
                        expandLabel: 'expand'
                    }
                }
            },
            nodes: {
                type: Array
            },
            lazy: {
                type: Boolean,
                default: false
            }
        },
        components: {
            cTree
        },
        methods: {
            expand(node) {
                node.expand = !node.expand
                this.$emit('on-expand', node)
            },
            loadingNode(node) {
                node.notShowAdd = true
                this.$set(node, 'children', [])
                this.$set(node, 'expand', true)
                this.$emit('loading-node', node)
            },
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
    .s-forest-tree {
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