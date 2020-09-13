<template>
    <div id="home">
        <header class="header">

        </header>
        <div class="main">
            <aside class="menus">
                <div v-for="(menu, index) in menus" :key="index">
                    <h2 class="title">{{menu.meta.title}}</h2>
                    <ul v-if="menu.children && menu.children.length">
                        <li v-for="(m, i) in menu.children" :key="`${index}-${i}`" @click="selectMenu(m.path)" :style="{ color: currentPath === m.path ? '#42b983' : ''}">{{m.meta.title}}</li>
                    </ul>
                </div>
            </aside>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import commonIcon from '@/components/commonIcon'
    export default {
        name: 'home',
        computed: {
            ...mapGetters([
                'menus'
            ])
        },
        components: {
            commonIcon
        },
        data() {
            return {
                currentPath: this.$route.path
            }
        },
        methods: {
            selectMenu(path) {
                this.$router.push(path)
                this.currentPath = path
            },
        }
    }
</script>

<style lang="less" scoped>
    #home {
        display: flex;
        flex-direction: column;
        height: 100%;

        .header {
            height: 50px;
        }

        .main {
            display: flex;
            flex: 1;

            .menus {
                width: 220px;
                height: 100%;

                .title {
                    margin-left: 10px;
                    font-weight: 600;
                    color: #273849;
                }

                ul {
                    padding-left: 20px;

                    li {
                        list-style: none;
                        font-size: 16px;
                        text-align: left;
                        padding: 5px;
                        cursor: pointer;
                        width: 100px;

                        &:hover {
                            color: #42b983;
                            text-decoration: underline;
                        }
                    }
                }
            }

            .content {
                flex: 1;
                min-width: 800px;
            }
        }
    }
</style>