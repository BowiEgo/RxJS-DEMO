<template>
    <div class="page">
        <div class="container" ref="container">
            <div class="user">
                <ul class="user-list">
                    <li class="user-item" v-for="(item, idx) in userList">
                        <div class="avatar">
                            <img :src="item.avatar_url">
                        </div>
                        <div class="desc">
                            <p>{{item.login}}</p>
                            <button class="follow-btn">Follow</button>
                        </div>
                        <div class="close-btn" @click="removeUser(idx)">X</div>
                    </li>
                </ul>
            </div>
            <button class="refresh-btn" ref="refreshBtn">刷新用户</button>
        </div>
        <div class="legend">
            <img src="http://o9kkuebr4.bkt.clouddn.com/combineLatest.png"/>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import Rx from 'rxjs/Rx'
import Axios from 'axios'

export default {
    name: 'userRefresh',
    data() {
        return {
            userList: []
        }
    },

    created() {
    },

    mounted() {
        this.clickRefresh();
    },

    methods: {
        clickRefresh () {
            this.throttleTime =  Rx.Observable.interval(4000);

            this.clickStream = Rx.Observable.fromEvent(this.$refs.refreshBtn, 'click')
                                        .throttle(ev => this.throttleTime)
                                        // .throttleTime(4000)

            this.refreshStream = this.clickStream.map(() => {
                                    let randomOffset = Math.floor(Math.random() * 1200000);
                                    // console.log(randomOffset)
                                    return 'https://api.github.com/users?since=' + randomOffset;
                                })
                                .startWith('https://api.github.com/users');

            this.responseStream = this.refreshStream
                                    .flatMap(url => {
                                        // console.log(url)
                                        return Rx.Observable.fromPromise(Axios.get(url))
                                    })

            this.responseStream.subscribe(res => {
                this.userList = [];
                let idx = 0;
                for(let i = 0; i < 3; i++) {
                    idx = Math.floor(Math.random() * 30);
                    this.userList.push(res.data[idx]);
                }
            },
            err => {
                console.log(err)
            })
        },

        removeUser (idx) {
            let closeStream = Rx.Observable.of(idx);
            // let range = Rx.Observable.range(listUsers.data.length);

            let source = closeStream.combineLatest(this.responseStream, (click, listUsers) => {
                return listUsers.data[Math.floor(Math.random() * listUsers.data.length)];
            })
            .distinct()

            source.subscribe(x => {
                this.userList.splice(idx, 1, x)
            })

        }
    }
}
</script>

<style lang="scss" scoped>

button {
    background: linear-gradient(#fff, #ebf2f5);
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    font-size: 12px;
    padding: 4px 10px;
    margin-top: 2px;
    outline: none;
    cursor: pointer;
}

.user {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 170px;
    border: 4px solid #333;
    border-radius: 10px;
    overflow: hidden;
    .user-list {
        padding: 0;
        .user-item {
            position: relative;
            width: 100%;
            height: 70px;
            background: #fff;
            padding: 4px 10px;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-content: space-between;
            align-items: center;
            .avatar {
                width: 40px;
                height: 40px;
                img {
                    width: 100%;
                    border-radius: 10px;
                }
            }
            .desc {
                margin-left: 10px;
                margin-right: 10px;
                flex: 2;
                height: 46px;
                font-size: 12px;
                text-align: left;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .follow-btn {
                    background: linear-gradient(#fff, #ebf2f5);
                    border: 1px solid #dcdcdc;
                    border-radius: 4px;
                    font-size: 12px;
                    padding: 4px 10px;
                    margin-top: 2px;
                    outline: none;
                    cursor: pointer;
                }
            }
            .close-btn {
                flex: .3;
                width: 20px;
                height: 20px;
                margin-top: -30px;
                line-height: 20px;
                border-radius: 50%;
                font-size: 12px;
                color: #d8d8d8;
                cursor: pointer;
            }
        }
    }
}

.refresh-btn {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 30px;
    font-weight: 800;
    background: #fff;
    border: 4px solid #000;
    vertical-align: middle;
    outline: none;
    color: #295c73;
}
</style>
