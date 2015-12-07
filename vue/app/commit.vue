<style lang="sass">
    input,textarea,button{ outline:none; border:none; padding:0;  }
    input, textarea { border: 1px solid #eee ; padding: 0.5em; }
    #textarea{
        width:100%;
        height:5em;
        box-sizing:border-box;
        -webkit-box-sizing:border-box;
        -moz-box-sizing:border-box;
        -o-box-sizing:border-box;
        font-size:100%;
        -webkit-appearance: none;
    }
    #commit{
        font-size: 1em;
        margin: 4px ;
        /* button,input,textarea{  font: inherit; border:none; background: none ; } */
        textarea::placeholder{
            /* color: red; */ //font: inherit ;
        }
        input{  margin: 0.5em 0 ; display: block;}
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
        <textarea id="textarea" placeholder="用户名"
                 @change="change('commit' ,$event)"
                 v-model="commit">
        </textarea>
        <div>
            <button v-touch:tap="handleCommit">commit</button>
            <button v-touch:tap="handleCancel">cancel</button>
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
                console.log('commit:被touch了',{
                        name: this.username ,
                        tag: this.commit
                    })
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
