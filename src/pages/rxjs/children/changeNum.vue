<template>
    <div class="page">
        <div class="container" ref="container">
            <div class="input-container">
                <button ref="minusBtn">-</button>
                <input v-model="inputVal">
                <button ref="addBtn">+</button>
            </div>
        </div>
        <div class="legend">
            <img src="http://o9kkuebr4.bkt.clouddn.com/merge.png"/>
            <img src="http://o9kkuebr4.bkt.clouddn.com/scan.png"/>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import Rx from 'rxjs/Rx'

export default {
    name: 'changeNum',
    data() {
        return {
            inputVal: 0,
        }
    },

    created() {
    },

    mounted() {
        this.changeNum();
    },

    methods: {
        changeNum () {
            const addBtn = this.$refs.addBtn;
            const minusBtn = this.$refs.minusBtn;

            const addClick = Rx.Observable.fromEvent(addBtn, 'click').mapTo(1);
            const minusClick = Rx.Observable.fromEvent(minusBtn, 'click').mapTo(-1);

            const numState = Rx.Observable.empty()
                .startWith(0)
                .merge(addClick, minusClick)
                .scan((origin, next) => origin + next, 0)

            numState.subscribe({
                next: (value) => {this.inputVal = value},
                error: (err) => {console.error('Error: ' + err)},
                complete: () => {console.log('complete')}
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.input-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    input {
        width: 140px;
        height: 60px;
        padding: 0;
        box-sizing: border-box;
        border-radius: 5px;
        border: 4px solid #333;
        text-align: center;
        font-size: 30px;
        font-weight: 800;
        vertical-align: middle;
        outline: none;
    }
    button {
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        padding: 0;
        border-radius: 5px;
        font-size: 30px;
        font-weight: 800;
        background: #fff;
        border: 4px solid #333;
        vertical-align: middle;
        outline: none;
    }
}
</style>
