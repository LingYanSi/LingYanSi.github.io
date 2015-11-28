<style lang="sass">
    h1{
        color: red ;
    }
</style>

<template>
    <div>
        <Banner></Banner>
        <Sidebar :list-store="listStore" :current.sync="listCurrent"></Sidebar>
        <Commit></Commit>
    </div>
</template>

<script lang="babel">
    import Sidebar from './side.vue'
    import Banner from './banner.vue'
    import Commit from './commit.vue'
    export default {
        data(){
            return {
                listStore: [
                            [
                                {name:'春江花月夜',tag:'嘿嘿'},
                                {name:'出塞曲',tag:'嘿嘿'},
                                {name:'兵车行',tag:'嘿嘿'},
                            ],
                            [
                                {name:'念去去',tag:'嘿嘿'},
                                {name:'千里烟波',tag:'嘿嘿'},
                            ],
                            [
                                {name:'都夜愿',tag:'嘿嘿'},
                                {name:'赛江南',tag:'嘿嘿'}
                            ]
                        ],
                listCurrent: 0 ,
            }
        },
        methods: {
            update(){
                this.$broadcast('parent-msg', this.listCurrent);
            }
        },
        events: {
            appendCommit( item ){
                this.listStore[this.listCurrent].push( item);
                this.update()
            },
            deleteChange( index1){
                // console.log( this.listStore[index] )
                this.listStore[this.listCurrent].splice(index1, 1);
                this.update()
            }
        },
        components:{
            Sidebar: Sidebar ,
            Banner: Banner ,
            Commit: Commit
        }
    }
</script>
