<style lang="sass">
    #textarea{
        display: block;
        height: 5em ;
        width: 100% ;
        padding: 0.5em;
        outline: 1px solid #888 ;
        margin: 0.5em 0 ;
    }
    #commit{
        margin: 10px ;
        button,input,textarea{ font-size:1em; border:none; background: none ; }
        input{ outline: 1px solid #888 ; margin: 0.5em 0 ; display: block; padding: 0.5em;}
        button{ padding: 0.5em 1em; color: #fff ;}
        button:nth-child(1){
            background: green ;
        }
        button:nth-child(2){
            margin-left: 2em ;
            background: rgb(247,105,105) ;
        }
    }
</style>

<template>
    <div id="commit">
        <!-- <div><input type="file" accept="image/*"></div> -->
        <input type="text" placeholder="用户名" @change="change('username' ,$event)" v-model="username">
        <textarea id="textarea" placeholder="您的评论"
                 @change="change('commit' ,$event)"
                 v-model="commit">
        </textarea>
        <div>
            <button @click="handleCommit">commit</button>
            <button @click="handleCancel">cancel</button>
        </div>
    </div>
</template>

<script lang="babel">
    export default{
        data(){
            return {
                commit: '',
                username: ''
            }
        },
        methods: {
            change(key, event){
                // console.log( event.target.value.trim())
                this[key] = event.target.value.trim() ;
            },
            handleCommit(){
                if( !this.commit || !this.username){
                    alert('评论或姓名不能为空')
                    return ;
                }
                this.$dispatch('appendCommit',  {
                        name: this.username ,
                        tag: this.commit
                    });
                this.handleCancel();
                // console.log( '用户名：',this.username, '评论：',this.commit )
            },
            handleCancel(){
                this.username = '' ;
                this.commit = '' ;
            }
        },
        events: {

        }
    }
</script>
