<template>
    <div id="root">
        <div class="card" ref="card">
            <img src="http://upload-images.jianshu.io/upload_images/3354589-12b80fdedc6fe94f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"></div>
        </div>
    </div>
</template>

<script>
import Rx from 'rxjs/Rx'
import utils from '../common/utils'

export default {
    name: 'card',
    data() {
        return {
            count: 0,
            inputVal: 0
        }
    },

    mounted() {
        this.observMouse()
    },

    methods: {
        observMouse() {
            let docEl = document.documentElement;
            let cardEl = this.$refs.card;

            let clientW = docEl.clientWidth;
            let clientH = docEl.clientHeight;

            let mouseMove$ = Rx.Observable.fromEvent(docEl, 'mousemove').map(e => {
                return {
                    x: e.clientX,
                    y: e.clientY
                }
            })

            function lerp(start, end) {
                var dx = end.x - start.x;
                var dy = end.y - start.y;

                return {
                    x: start.x + dx * 0.1,
                    y: start.y + dy * 0.1
                };
            }

            var animationFrame$ = Rx.Observable.interval(0, Rx.Scheduler.animationFrame);

            let smoothMove$ = animationFrame$.withLatestFrom(mouseMove$, (tick, move) => {
                return move;
            }).scan((x, y) => lerp(x, y));

            smoothMove$.subscribe(pos => {
                let rotX = pos.y / clientH * -50 + 25;
                let rotY = pos.x / clientW * 50 - 25;

                cardEl.style.cssText = `transform: rotateX(${rotX}deg) rotateY(${rotY}deg)`;
            })
        }
    }
}
</script>

<style lang="scss">

#app {
    height: 100%;
}

#root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    perspective: 200px;
}

.card {
    width: 20rem;
    height: 14rem;
    box-shadow: 0 10px 40px rgba(black, 0.3);
    transform-style: preserve-3d;
    img {
        width: 100%;
    }
    &:before, &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background: rgba(white, 0.2);
        filter: blur(1px);
    }
    &:before {
        transform: translateZ(1rem);
        $shadows: ();
        @for $i from 1 through 50 {
            $shadows: append($shadows, (random(16) + 1) * 1rem (random(12) + 1 ) * 1rem 0 white, comma);
        }
        box-shadow: $shadows;
    }
    &:after {
        width: 3px;
        height: 3px;
        transform: translateZ(2rem);
        $shadows: ();
        @for $i from 1 through 50 {
            $shadows: append($shadows, (random(16) + 1) * 1rem (random(12) + 1 ) * 1rem 0 white, comma);
        }
        box-shadow: $shadows;
    }
}

</style>
