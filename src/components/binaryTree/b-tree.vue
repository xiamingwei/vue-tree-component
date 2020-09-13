<template>
    <div id="binary-tree">
        <div class="nodes">
            <div v-for="node in nodes" :key="node.path" :class="nodeStyle">
                <div style="position: relative;">
                    <i class="i-font i-minus operation-icon-remove" v-show="!node[options.recursion]" @click="removeNode(parentNode)"></i>
                    <p class="node-name" @click="selectNode(node)">{{node[options.label]}}</p>
                    <i class="i-font i-add operation-icon-add" v-show="!node[options.recursion]" @click="addNode(node)"></i>
                </div>
                <div v-if="node[options.recursion] && node[options.recursion].length" class="node-line"></div>
                <div v-if="node[options.recursion] && node[options.recursion].length">
                    <b-tree :nodes="node[options.recursion]" :parent-node="node" :level="level + 1" :options="options"></b-tree>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import commonIcon from '@/components/commonIcon'
    export default {
        name: 'bTree',
        inject: ['addNode', 'removeNode', 'selectNode'],
        components: {
            commonIcon
        },
        props: {
            nodes: {
                type: Array,
            },
            parentNode: {
                type: Object,
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
                        recursion: 'children'
                    }
                }
            }
        },
        computed: {
            nodeStyle() {
                return this.level > 1 ? 'node' : 'root'
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/fonts/iconfont.css';

    #binary-tree {

        .nodes {
            position: relative;
            display: flex;
            margin-top: 19px;

            .operation-icon-add {
                font-size: 18px;
                position: absolute;
                top: 50%;
                cursor: pointer;
            }

            .operation-icon-remove {
                .operation-icon-add();
                left: -20px;
            }

            .root {
                position: relative;
                text-align: center;
            }

            .node {
                position: relative;
                padding: 0 25px;
                min-height: 120px;

                &::before {
                    position: absolute;
                    left: 50%;
                    content: '';
                    height: 20px;
                    border: 1px solid #ccc;
                    box-sizing: border-box !important;
                }

                &:first-child::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 50%;
                    border: 1px solid #ccc;
                    box-sizing: border-box !important;
                }

                &:last-child::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    border: 1px solid #ccc;
                    box-sizing: border-box !important;
                }

                &:not(:first-child):not(:last-child)::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    border: 1px solid #ccc;
                    box-sizing: border-box !important;
                }

                &:first-child:last-child::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 0;
                    box-sizing: border-box !important;
                }


            }

            .node-line {
                &::after {
                    content: '';
                    position: absolute;
                    height: 20px;
                    border: 1px solid #ccc;
                    box-sizing: border-box !important;
                }
            }

            .node-name {
                display: inline-block;
                padding: 10px 25px;
                margin-top: 20px;
                text-align: center;
                line-height: 30px;
                color: white;
                background: #70869A;
                white-space: nowrap;
                border-radius: 5px;
            }
        }
    }
</style>