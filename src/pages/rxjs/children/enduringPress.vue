<template>
    <div class="page">
        <div class="container" ref="container">
            <button ref="sucBtn">长按我</button>
            <p>{{count}}</p>
        </div>
        <div class="legend">
            <img src="http://o9kkuebr4.bkt.clouddn.com/merge.png?imageView2/1/w/500/h/240"/>
            <img src="http://o9kkuebr4.bkt.clouddn.com/concatMap.png?imageView2/1/w/500/h/240"/>
            <img src="http://o9kkuebr4.bkt.clouddn.com/filter.png?imageView2/1/w/500/h/180"/>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import Rx from 'rxjs/Rx'

export default {
    name: 'enduringPress',
    data() {
        return {
            count: 0
        }
    },

    created() {
    },

    mounted() {
        this.enduringPress();
    },

    methods: {
        enduringPress () {
            const btn = this.$refs.sucBtn;
            let interval = Rx.Observable.interval();
            let mouseDown = Rx.Observable.fromEvent(btn, 'mousedown');
            let mouseUp = Rx.Observable.fromEvent(btn, 'mouseup');

            let touchStart = Rx.Observable.fromEvent(btn, 'touchstart');
            let touchEnd = Rx.Observable.fromEvent(btn, 'touchend');

            let clickDown = Rx.Observable.merge(mouseDown, touchStart);
            let clickUp = Rx.Observable.merge(mouseUp, touchEnd);

            let source = clickDown
                            .concatMap(ev => interval.takeUntil(clickUp))
                            .filter(x => {
                                return x === 300
                            });

            source.subscribe(e => {
                this.count ++;
                console.log('success!')
            });
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
