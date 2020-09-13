<template>
    <div id="s-tree">
        <div class="nodes">
            <div v-for="node in nodes" :key="node.path" :class="nodeStyle">
                <div class="one-node">
                    <i v-show="node[options.recursion] && node[options.expandLabel]" @click="expand(node)" class="i-font i-arrow-down expand-icon"></i>
                    <i v-show="node[options.recursion] && !node[options.expandLabel]" @click="expand(node)" class="i-font i-arrow-right shrink-icon"></i>
                    <p :class="['node-name', currentPath === node.path ? 'seleced-node' : '']" @click="selectNode(node)">{{node[options.label]}}</p>
                </div>
                <div v-if="node[options.recursion] && node[options.recursion].length" v-show="node[options.expandLabel]">
                    <s-tree :nodes="node[options.recursion]" :level="level + 1" :options="options" :currentPath="currentPath"></s-tree>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sTree',
        inject: ['selectNode'],
        props: {
            nodes: {
                type: Array,
            },
            level: {
                type: Number,
                default: 1
            },
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
            currentPath: {
                type: String
            }
        },
        computed: {
            nodeStyle() {
                return this.level > 1 ? 'node' : 'root'
            }
        },
        methods: {
            expand(node) {
                node.expand = !node.expand
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/fonts/iconfont.css';
    #s-tree {

        .nodes {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 15px;

            .root {
                position: relative;
                padding: 3px 3px;
            }

            .node {
                position: relative;
                padding: 3px 3px;
            }

            .one-node {
                white-space: nowrap;
                cursor: pointer;
                text-align: left;

                .operation-icon {
                    position: absolute;
                    cursor: pointer;
                    left: -10px;
                    top: 8px;
                }

                .expand-icon {
                    .operation-icon();
                    font-size: 12px;
                }

                .shrink-icon {
                    .operation-icon();
                    font-size: 13px;
                }

                &:hover {
                    background: #e6f7ff;
                }

                .node-name {
                    padding: 1px 4px;
                }
            }

            .seleced-node {
                background: #bae7ff;
            }
        }
    }
</style>