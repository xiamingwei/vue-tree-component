<template>
    <tbody class="x-tbody">
        <tr v-for="(node, index) in nodes" :key="index">
            <td>
                <div class="td-content">
                    <span>{{node[options.label]}}</span>
                    <i class="i-font i-add operate-add" v-show="!node[options.recursion]" @click="addNode(node)"></i>
                </div>
            </td>
            <b-table v-if="node[options.recursion]" :nodes="node[options.recursion]" :options="options" :level="level + 1"></b-table>
        </tr>
    </tbody>
</template>

<script>
    export default {
        name: 'bTable',
        inject: ['addNode'],
        props: {
            nodes: {
                type: Array,
                default: () => []
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
                    }
                }
            }
        },
        mounted() {
            console.log(this.level)
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/fonts/iconfont.css';
    @borderColor: #ccc;
    @white: white;

    .x-tbody {
        margin-top: -10px;

        td {
            min-width: 100px;
            padding: 10px;
            border: 1px solid @borderColor;
            border-radius: 3px;
            background: @white;

            .td-content {
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
        }
        
        .operate-add {
            text-align: right;
            cursor: pointer;
        }
    }
</style>