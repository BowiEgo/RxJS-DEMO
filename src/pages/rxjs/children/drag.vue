<template>
    <div class="page">
        <div class="container" ref="container">
            <div class="drag-el" ref="dragEl"></div>
        </div>
        <div class="legend">
            <img src="http://o9kkuebr4.bkt.clouddn.com/concatAll.png"/>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import Rx from 'rxjs/Rx'

export default {
    name: 'drag',
    data() {
        return {
        }
    },

    created() {
    },

    mounted() {
        this.drag(this.$refs.dragEl);
    },

    methods: {
        drag(el) {
            const dragEl = el;
            const widEl = dragEl.getBoundingClientRect().width;
            const heiEl = dragEl.getBoundingClientRect().height;
            const container = this.$refs.container;
            const containerRect = container.getBoundingClientRect()
            console.log(containerRect)

            const mouseDown = Rx.Observable.fromEvent(dragEl, 'mousedown');
            const mouseMove = Rx.Observable.fromEvent(dragEl, 'mousemove');
            const mouseUp = Rx.Observable.fromEvent(dragEl, 'mouseup');

            mouseDown
                .map(e => mouseMove.takeUntil(mouseUp))
                .concatAll()
                .withLatestFrom(mouseDown, (move, down) => {
                    return {
                        x: this.validValue(move.clientX - down.offsetX, containerRect.x + containerRect.width - widEl, containerRect.x),
                        y: this.validValue(move.clientY - down.offsetY, containerRect.y + containerRect.height - heiEl, containerRect.y)
                    }
                })
                .subscribe(pos => {
                    // console.log(`translate3d(${pos.x}, ${pos.y}, 0)`);
                    // dragEl.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
                    dragEl.style.left = pos.x - containerRect.x + 'px';
                    dragEl.style.top = pos.y - containerRect.y +'px';
                })

            mouseDown.subscribe(() => {
                dragEl.className = dragEl.className += ' float';
            })

            mouseUp.subscribe(() => {
                dragEl.className = dragEl.className.replace(' float', '');
            })

        },

        validValue(val, max, min) {
			return Math.min(Math.max(val, min), max)
		}
    }
}
</script>

<style lang="scss" scoped>
.drag-el {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 100px;
    left: 100px;
    background: #fff;
    cursor: all-scroll;
    transform: translate3d(0, 0, 0);
    -webkit-transition: box-shadow ease 0.3s;
    transition: box-shadow ease 0.3s;
}

.float {
	box-shadow: 0px 0px 18px 5px rgba(0, 0, 0, 0.3);
}
</style>
