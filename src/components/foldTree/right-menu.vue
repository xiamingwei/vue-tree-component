<template>
    <div v-show="isVisible" class="right-menu" :style=" { left: `${rightMenuPos.x}px`, top: `${rightMenuPos.y}px` } ">
        <div v-for="(menu, index) in menuList" :key="index" @click="selectMenu(menu)" class="right-menu-item">{{menu.label}}</div>
    </div>
</template>

<script>
    import { deepClone } from '@/common/util.js'
    export default {
        name: 'rigthMenu',
        inject: ['selectMenu'],
        props: {
            value: {
                type: Boolean,
                default: false
            },
            rightMenuPos: {
                type: Object,
                default: () => {
                   return {
                       x: 0,
                       y: 0
                   }
                }
            },
            menuList: {
                type: Array,
                default: () => []
            },
        },
        data() {
            return {
                isVisible: this.value,
            }
        },
        watch: {
            value(val) {
                this.isVisible = val
            },
            isVisible(val) {
                this.$emit('input', val)
            }
        }
    }
</script>

<style lang="less" scoped>
    .right-menu {
        position: fixed;
        width: 80px;
        text-align: center;
        margin: 5px 0;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        z-index: 900;

        &-item {
            height: 25px;
            line-height: 25px;
            cursor: pointer;
            border-bottom: 1px solid #ccc;
        }
    }
</style>