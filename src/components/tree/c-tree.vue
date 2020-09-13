<template>
    <div id="s-c-tree">
        <div class="nodes">
            <div v-for="node in nodes" :key="node.path" :class="nodeStyle">
                <p class="node-name">{{node[options.label]}}</p>
                <div v-if="(node[options.recursion] && node[options.recursion].length)" class="node-line"></div>
                <i class="i-font i-add operate-icon lazy-add" v-show="lazy && !(node[options.recursion] && node[options.recursion].length) && !node.loading && !node.notShowAdd" @click="loadingNode(node)"></i>
                <i class="i-font i-loading operate-icon lazy-add icon-load" v-show="node.loading"></i>
                <div v-if="node[options.recursion] && node[options.recursion].length">
                    <i class="i-font i-ios-add operate-icon expand-operation" v-show="node[options.expandLabel]" @click="expand(node)"></i>
                    <i class="i-font i-ios-minus operate-icon shrink-operation" v-show="!node[options.expandLabel]" @click="expand(node)"></i>
                </div>
                <div v-if="node[options.recursion] && node[options.recursion].length" v-show="node[options.expandLabel]">
                    <c-tree :nodes="node[options.recursion]" :level="level + 1" :options="options" :lazy="lazy"></c-tree>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'cTree',
        inject: ['expand', 'loadingNode'],
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
            onExpand: {
                type: Function
            },
            lazy: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            nodeStyle() {
                return this.level > 1 ? 'node' : 'root'
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '~@/fonts/iconfont.css';
    @lineColor: #ccc;

    #s-c-tree {

        .nodes {
            position: relative;
            display: flex;
            margin-top: 19px;
            min-height: 200px;

            .root {
                position: relative;
                text-align: center;
            }

            .node {
                position: relative;
                padding: 0 15px;
                margin-top: 8px;

                &::before {
                    position: absolute;
                    left: 50%;
                    content: '';
                    height: 20px;
                    border: 1px solid @lineColor;
                    box-sizing: border-box !important;
                }

                &:first-child::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 50%;
                    border: 1px solid @lineColor;
                    box-sizing: border-box !important;
                }

                &:last-child::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    border: 1px solid @lineColor;
                    box-sizing: border-box !important;
                }

                &:not(:first-child):not(:last-child)::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    border: 1px solid @lineColor;
                    box-sizing: border-box !important;
                }

                &:first-child:last-child::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 0;
                }
            }

            .node-line {

                &::after {
                    content: '';
                    position: absolute;
                    height: 5px;
                    border: 1px solid @lineColor;
                    box-sizing: border-box !important;
                }
            }

            .expand-operation {
                position: absolute;
                left: 50%;
                margin-left: -7px;
                margin-top: 4px;
                cursor: pointer;

                &::after {
                    content: '';
                    position: absolute;
                    margin-top: 15px;
                    margin-left: -9px;
                    height: 8px;
                    border: 1px solid @lineColor;
                }
            }

            .shrink-operation {
                position: absolute;
                left: 50%;
                margin-left: -7px;
                margin-top: 4px;
                cursor: pointer;
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

            .lazy-add {
                position: absolute;
                margin-top: 35px;
                margin-left: 2px;
                cursor: pointer;
            }

            .operate-icon {
                color: black;
                font-size: 16px;
            }
        }

        .icon-load {
            animation: ani-demo-spin 1s linear infinite;
        }

        @keyframes ani-demo-spin {
            from {
                transform: rotate(0deg);
            }

            50% {
                transform: rotate(180deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
    }
</style>