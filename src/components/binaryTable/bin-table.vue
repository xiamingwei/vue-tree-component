<template>
    <div id="x-binary-table">
        <table>
            <b-table :nodes="nodes" :options="options"></b-table>
        </table>
    </div>
</template>

<script>
    import bTable from './b-table'
    export default {
        name: 'bin-table',
        provide() {
            return {
                addNode: this.addNode
            }
        },
        props: {
            nodes: {
                type: Array,
                default: () => []
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
        components: {
            bTable
        },
        data() {
            return {

            }
        },
        methods: {
            addNode(node) {
                this.$set(node, 'children', [])
                node.children.push({
                    name: '1'
                }, {
                    name: '2'
                });

                this.$emit('onAddNode', node);
            }
        }
    }
</script>

<style lang="less" scoped>
    @borderColor: #ccc;
    #x-binary-table {
        overflow-x: auto;

        table {
            border-collapse: separate;
            border-spacing: 0;
            background: #f9f9f9;
            // border: 1px solid @borderColor;
        }
    }
</style>