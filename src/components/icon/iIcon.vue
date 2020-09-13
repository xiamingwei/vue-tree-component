<template>
    <i :class="`i-font i-${type}`" :style="styles"></i>
</template>

<script>
export default {
    name: 'iIcon',
    props: {
        type: {
            type: String,
            required: true
        },
        size: {
            type: Number,
            default: 16
        },
        color: {
            type: String
        }
    },
    computed: {
        styles() {
            return {
                fontSize: `${this.size}px`,
                color: this.color
            }
        }
    }
}
</script>
