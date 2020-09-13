<template>
    <div>
        <vue-tree-table :nodes="nodes" :columns="columns" @select-row="selectRow"></vue-tree-table>
    </div>
</template>

<script>
    /**
     *  Api
     * 
     *  datas: 
     *      columns: [] 列名
     *              key值为必填的字段标识
     *              title值为列中文名
     *              支持render函数写法, 因为是针对树形表所以在params中返回的参数 有当前节点信息, 其父级信息, 当前节点在父级中的索引。 根节点父级为root
     * 
     *      options: 配置项,  是一个对象, 包括如下
     *              recursion: 递归名, 默认为children
     *              expandLabel: 展开标识符, 默认为expand
     *          
     *  methods: 
     *      @select-row: 点击某行, 返回当前行的信息, 第一个参数为当前行的信息, 第二个参数为其父节点便于删除的时候使用
     */
    import vueTreeTable from '@/components/treeTable/vue-tree-table.vue'
    export default {
        name: 'treeTable',
        components: {
            vueTreeTable
        },
        data() {
            return {
                nodes: [],
                columns: [{
                    title: '姓名',
                    key: 'name',
                }, {
                    title: '年龄',
                    key: 'age',
                }, {
                    title: '性别',
                    key: 'sex',
                }, {
                    title: '操作',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        // 新增需要注意设置成响应式属性
                                        if (!params.row.children) {
                                            this.$set(params.row, 'expand', true)
                                            this.$set(params.row, 'children', [])
                                        }

                                        params.row.children.push({
                                            name: '手动新增节点1',
                                            age: 22,
                                            sex: '女'
                                        })
                                    }
                                }
                            }, '新增'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        if (params.parentNode.children && params.parentNode.children.length) {
                                            params.parentNode.children.splice(params.index, 1)

                                            if (!params.parentNode.children.length) {
                                                delete params.parentNode.children
                                            }
                                        }
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }]
            }
        },
        mounted() {
            setTimeout(() => {
                this.nodes = [{
                    name: '根',
                    age: 21,
                    sex: '男',
                    expand: true,
                    children: [{
                        name: '孩子1',
                        age: 21,
                        sex: '男',
                        expand: true,
                        children: [{
                            name: '孙子1',
                            age: 21,
                            sex: '男',
                            expand: true,
                            children: [{
                                name: '祖孙12222222xxx',
                                age: 21,
                                sex: '男',
                            }, {
                                name: '祖孙2',
                                age: 21,
                                sex: '男',
                            }, {
                                name: '祖孙3',
                                age: 21,
                                sex: '男',
                            }, {
                                name: '祖孙3',
                                age: 21,
                                sex: '男',
                            }, {
                                name: '祖孙3',
                                age: 21,
                                sex: '男',
                            }, {
                                name: '祖孙3',
                                age: 21,
                                sex: '男',
                            }]
                        }]
                    }, {
                        name: '孩子2',
                        age: 21,
                        sex: '男',
                    }, {
                        name: '孩子3',
                        age: 21,
                        sex: '男',
                        expand: true,
                        children: [{
                            name: '孙子2',
                            age: 21,
                            sex: '男',
                            expand: true,
                            children: [{
                                name: '222',
                                age: 21,
                                sex: '男',
                            }]
                        }, {
                            name: '孙子3',
                            age: 21,
                            sex: '男',
                        }]
                    }, {
                        name: '孩子4',
                        age: 21,
                        sex: '男',
                    }]
                }]
            }, 100);
        },
        methods: {
            selectRow(row, parent) {
                console.log(row, parent)
            }
        }
    }
</script>