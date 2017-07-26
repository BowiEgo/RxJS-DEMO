<template>
    <div class="page">
        <div class="container" ref="container">
            <button ref="sucBtn">连续点我</button>
            <p>{{count}}</p>
        </div>
        <div class="legend">
            <img src="http://o9kkuebr4.bkt.clouddn.com/filter.png"/>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import Rx from 'rxjs/Rx'

export default {
    name: 'sucClick',
    data() {
        return {
            count: 0,
        }
    },

    created() {
    },

    mounted() {
        this.sucClick();
    },

    methods: {
        sucClick () {
            const sucBtn = this.$refs.sucBtn;

            const sucClick = Rx.Observable.fromEvent(sucBtn, 'click')
                            .bufferTime(1000)
                            .filter(arr => {return arr.length >= 2});

            sucClick.subscribe({
                next: (value) => {
                    this.count ++;
                    console.log('success')
                },
                error: (err) => {console.error('Error: ' + err)},
                complete: () => {console.log('complete')}
            })
        }
    }
}
</script>

<style lang="scss" scoped>
button {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
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
p {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    box-sizing: border-box;
    color: #fff;
    font-size: 30px;
    font-weight: 800;
    vertical-align: middle;
    outline: none;
}
</style>
