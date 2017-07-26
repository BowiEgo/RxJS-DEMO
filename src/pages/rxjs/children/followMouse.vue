<template>
    <div class="page">
        <div class="container" ref="container">
            <ul class="ball-list" ref="balls">
                <li class="ball"></li>
                <li class="ball"></li>
                <li class="ball"></li>
                <li class="ball"></li>
                <li class="ball"></li>
                <li class="ball"></li>
            </ul>
        </div>
        <div class="legend">
            <img src="http://o9kkuebr4.bkt.clouddn.com/map.png"/>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import Rx from 'rxjs/Rx'

export default {
    name: 'followMouse',
    data() {
        return {
        }
    },

    created() {
    },

    mounted() {
        this.followMouse(this.$refs.balls.querySelectorAll('.ball'));
    },

    methods: {
        followMouse (DOMArr) {
            const delayTime = 300;
            const movePos = Rx.Observable.fromEvent(document, 'mousemove')
            .map(e => ({
                x: e.clientX,
                y: e.clientY
            }))

            DOMArr.forEach((item, index) => {
                movePos
                    .delay(delayTime * (Math.pow(0.65, index) + Math.cos(index / 4)))
                    .throttleTime(12)
                    .subscribe(pos => {
                        item.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
                    })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.ball {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
}
</style>
