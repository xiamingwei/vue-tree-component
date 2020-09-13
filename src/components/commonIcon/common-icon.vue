<template>
    <component :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"  />
</template>

<script>
    import iIcon from '@/components/icon'
    export default {
        name: 'CommonIcon',
        components: { iIcon },
        props: {
            type: {
                type: String,
                required: true
            },
            color: String,
            size: Number,
        },
        computed: {
            // 若用自定义图标, 在其前面加下划线作为标识符
            iconType() {
                return this.type.indexOf('_') === 0 ? 'iIcon' : 'Icon'
            },
            iconName() {
                return this.iconType === 'iIcon' ? this.getCustomIconName(this.type) : this.type
            },
            iconSize() {
                return this.size || (this.iconType === 'iIcon' ? 16 : undefined)
            },
            iconColor() {
                return this.color || ''
            }
        },
        methods: {
            getCustomIconName(iconName) {
                return iconName.slice(1)
            }
        },
    }
</script>