<template>
    <bin-table :nodes="nodes" :options="options"></bin-table>
</template>

<script>
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
        }
    }
</script>

<style lang="less" scoped>

</style>