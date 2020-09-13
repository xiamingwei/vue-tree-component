<template>
    <div>
        <v-tree :nodes="nodes" :options="options" @get-mouse-pos="getMousePos"></v-tree>
        <right-menu v-if="isMenu" v-model="showRightMenu" :menu-list="options.menuList" :right-menu-pos="rightMenuPos"></right-menu>
    </div>
</template>

<script>
    import rightMenu from './right-menu.vue'
    import vTree from './v-tree.vue'
    import { on, off } from '@/common/dom.js'
    export default {
        name: 'v-menu-tree',
        props: {
            nodes: {
                type: Array,
                default: () => []
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        menuList: [],
                        recursion: 'children',
                        label: 'name',
                        expandLabel: 'expand',
                    }
                }
            },
            isMenu: {
                type: Boolean,
                default: true
            }
        },
        provide() {
            return {
                showOperateMenu: this.showOperateMenu,
                getMousePos: this.getMousePos,
                selectNode: this.selectNode,
                selectMenu: this.selectMenu
            }
        },
        components: {
            rightMenu,
            vTree,
        },
        data() {
            return {
                showRightMenu: false,
                currentNode: {},
                rightMenuPos: {
                    x: 0,
                    y: 0
                },
            }
        },
        methods: {
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
            hideMenu() {
                this.showRightMenu = false
            },
            showOperateMenu(node) {
                this.showRightMenu = true
                this.currentNode = node
            },
            triggerMenu(e) {
                // 如果点击的元素本身,则不隐藏menu
                const preventClass = 'right-menu-item'
                if (e.target.className === preventClass) {
                    return
                }

                this.hideMenu()
            },
            selectMenu(menu) {
                this.showRightMenu = false
                this.$emit('select-menu', menu, this.currentNode)
            },
            getMousePos(e) {
                const { clientX, clientY } = e
                this.rightMenuPos.x = clientX
                this.rightMenuPos.y = clientY
            },
            selectNode(node) {
                this.$emit('select-node', node)
            }
        },
        watch: {
            nodes(val) {
                val = this.setPath(val)
            },
            showRightMenu(val) {
                if (val) {
                    on(document, 'mousedown', this.triggerMenu)
                    on(document, 'mousewheel', this.triggerMenu)
                } else {
                    // 消失记得移除事件
                    off(document, 'mousedown', this.triggerMenu)
                    off(document, 'mousewheel', this.triggerMenu)
                }
            }
        }
    }
</script>

<style>

</style>