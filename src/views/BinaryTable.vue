<template>
    <bin-table :nodes="nodes" :options="options" @onAddNode="addNode"></bin-table>
</template>

<script>
    /**
     *  Api
     *    
     *  datas: 
     *      options: 配置项,  是一个对象, 包括如下
     *              label: 节点名, 默认为name
     *              recursion: 递归名, 默认为children
     *          
     *  methods: 
     *      @onAddNode: 增加一个节点的回调
     */
    import BinTable from '@/components/binaryTable/bin-table.vue'
    export default {
        name: 'binaryTable',
        components: {
            BinTable
        },
        data() {
            return {
                options: {
                    label: 'name',
                    recursion: 'children',
                },
                nodes: [{
                    name: '父级',
                    children: [{
                        name: '儿子1',
                        children: [{
                            name: '孙子1'
                        }, {
                            name: '孙子2'
                        }]
                    }, {
                        name: '儿子2',
                        children: [{
                            name: '孙子3'
                        }, {
                            name: '孙子4'
                        }]
                    }]
                }]
            }
        },
        methods: {
            addNode(node) {
                console.log(node);
            }
        }
    }
</script>

<style lang="less" scoped>

</style>