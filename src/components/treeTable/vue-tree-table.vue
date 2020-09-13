<template>
    <div class="tree-table">
        <div class="columns">
            <div v-for="(column, index) in columns" :key="index" class="column" :style="getWidth(column)">
                {{column.title}}
            </div>
        </div>
        <v-tree-table :nodes="nodes" :columns="columns"></v-tree-table>
    </div>
</template>

<script>
    import vTreeTable from './v-tree-table.vue'
    export default {
        name: 'vueTreeTable',
        components: {
            vTreeTable
        },
        provide() {
            return {
                selectRow: this.selectRow
            }
        },
        props: {
            nodes: {
                type: Array,
            },
            columns: {
                type: Array
            }
        },
        computed: {
            getWidth() {
                return function(column) {
                    if (column.width) {
                        return { 'width': `${column.width}px` }
                    } else {
                        return { 'flex': 1 }
                    }
                }
            }
        },
        methods: {
            selectRow(node, parentNode) {
                this.$emit('select-row', node, parentNode)
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
            },
        },
        watch: {
            nodes(val) {
                val = this.setPath(val)
            }
        }
    }
</script>

<style lang="less" scoped>
    .tree-table {
        display: flex;
        flex-direction: column;
        overflow-x: auto;

        .columns {
            display: flex;
            border: 1px solid #ccc;

            .column {
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                white-space: nowrap;
                background: #f7f7f7;

                &:not(:first-child) {
                    border-left: 1px solid #ccc;
                }
            }
        }
    }
</style>