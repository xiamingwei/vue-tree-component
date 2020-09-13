<template>
    <div class="nodes">
        <div v-for="(node, index) in nodes" :key="node.path" :class="nodeStyle">
            <div class="node-table" @click="selectRow(node, parentNode)">
                <div v-for="(column, i) in columns" :key="i" class="one-node" :style="getWidth(column)">
                    <div :style="getMargin(i)">
                        <i v-show="node[options.recursion] && node[options.recursion].length && node[options.expandLabel] && i === 0" @click="expand(node)" class="i-font i-arrow-down expand-icon"></i>
                        <i v-show="node[options.recursion] && node[options.recursion].length && !node[options.expandLabel] && i === 0" @click="expand(node)" class="i-font i-arrow-right shrink-icon"></i>
                        <cell v-if="column.render" :row="node" :parent-node="parentNode" :index="index" :render="column.render"></cell>
                        <span v-else>{{node[column.key]}}</span>
                    </div>
                </div>
            </div>
            <div v-if="node[options.recursion] && node[options.recursion].length" v-show="node[options.expandLabel]">
                <v-tree-table :nodes="node[options.recursion]" :level="level + 1" :options="options" :columns="columns" :parent-node="node"></v-tree-table>
            </div>
        </div>
    </div>
</template>

<script>
    import commonIcon from '@/components/commonIcon'
    import cell from './cell.js'
    export default {
        name: 'vTreeTable',
        inject: ['selectRow'],
        components: {
            cell,
            commonIcon
        },
        props: {
            nodes: {
                type: Array,
            },
            level: {
                type: Number,
                default: 1
            },
            parentNode: {
                type: Object,
            },
            columns: {
                type: Array
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        recursion: 'children',
                        expandLabel: 'expand'
                    }
                }
            }
        },
        computed: {
            nodeStyle() {
                return this.level > 1 ? 'node' : 'root'
            },
            getWidth() {
                return function(column) {
                    let widthObj = {}
                    if (column.width) {
                        widthObj = { 'width': `${column.width}px` }
                    } else {
                        widthObj = { 'flex': 1 }
                    }

                    return widthObj
                }
            },
            getMargin() {
                return function(i) {
                    const marginObj = { 'margin-left': i === 0 ? `${this.level * 15}px` : '10px' }
                    return marginObj
                }
            }
        },
        methods: {
            expand(node) {
                node[this.options.expandLabel] = !node[this.options.expandLabel]
            },
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/fonts/iconfont.css';

    .nodes {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .root {
            position: relative;
        }

        .node {
            position: relative;
        }

        .node-table {
            display: flex;
            min-height: 40px;
            border-bottom: 1px solid #ccc;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;

            &:hover {
                background-color: #EBF7FF;
            }

            .one-node {
                padding-top: 10px;
                padding-left: 10px;
                cursor: pointer;
                text-align: left;

                &:not(:first-child) {
                    border-left: 1px solid #ccc;
                }

                .operation-icon {
                    position: absolute;
                    cursor: pointer;
                    margin-left: -14px;
                    margin-top: 4px;
                }

                .expand-icon {
                    .operation-icon();
                    font-size: 12px;
                }

                .shrink-icon {
                    .operation-icon();
                    font-size: 13px;
                }
            }

        }
    }
</style>