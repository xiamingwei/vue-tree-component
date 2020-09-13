<template>
    <div id="select-tree">
        <div class="select-tree">
            <div class="select-input-box">
                <input type="text" v-model="name" @focus="() => { this.isFocus = true }" class="select-input" required />
                <i v-if="clearable" class="i-font i-close close" @click="clear"></i>
            </div>
            <div class="select-area" v-show="isFocus">
                <s-tree :nodes="nodes" :options="options" :currentPath="currentPath"></s-tree>
            </div>
        </div>
    </div>
</template>

<script>
    import sTree from './s-tree.vue'
    import { on, off } from '@/common/dom.js'
    import commonIcon from '@/components/commonIcon'
    export default {
        name: 'selTree',
        components: {
            sTree,
            commonIcon
        },
        provide() {
            return {
                selectNode: this.selectNode
            }
        },
        props: {
            nodes: {
                type: Array,
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
            clearable: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                name: '',
                isFocus: false,
                currentPath: '',
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
            selectNode(node) {
                this.name = node[this.options.label]
                this.currentPath = node.path
                this.isFocus = false
                this.$emit('select-node', node)
            },
            triggerDrop(e) {
                // 获取点击元素父级所有元素,其有类名为select-tree即在组件内
                const COMPONENT_CLASSNAME = 'select-tree'
                let parents = Array.from($(e.target).parents())
                for (let parent of parents) {
                    if (parent.className === COMPONENT_CLASSNAME) {
                        return
                    }
                }
                this.isFocus = false
            },
            clear() {
                this.name = ''
                this.isFocus = false
                this.currentPath = ''
            }
        },
        watch: {
            nodes(val) {
                val = this.setPath(val)
            },
            isFocus(val) {
                if (val) {
                    on(document, 'click', this.triggerDrop)
                } else {
                    off(document, 'click', this.triggerDrop)
                }
            },
            name(val) {
                this.$emit('on-change', this.currentPath)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '~@/fonts/iconfont.css';
    .select-tree {
        position: relative;

        .select-input-box {
            position: relative;
            width: 200px;

            .select-input {
                display: inline-block;
                width: 100%;
                height: 32px;
                line-height: 1.5;
                padding: 4px 7px;
                font-size: 12px;
                border: 1px solid #dcdee2;
                border-radius: 4px;
                color: #515a6e;
                background-color: #fff;
                background-image: none;
                position: relative;
                cursor: text;
                transition: border .2s ease-in-out, background .2s ease-in-out, box-shadow .2s ease-in-out;
            }

            .close {
                display: none;
                position: absolute;
                cursor: pointer;
                right: 5px;
                top: 50%;
                transform: translate(0, -50%);
            }

            &:hover {
                .select-input:valid+.close {
                    display: block;
                }
            }
        }

        .select-area {
            position: absolute;
            width: inherit;
            min-width: 215px;
            max-height: 200px;
            overflow: auto;
            margin: 5px 0;
            padding: 5px 0;
            background-color: #fff;
            box-sizing: border-box;
            border-radius: 4px;
            box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
            z-index: 900;
        }
    }
</style>