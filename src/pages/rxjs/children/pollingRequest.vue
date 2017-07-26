<template>
    <div class="page">
        <div class="container" ref="container">
            <p>{{count}}</p>
        </div>
        <div class="legend">
            <img src="http://o9kkuebr4.bkt.clouddn.com/concatMap.png"/>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/
import Rx from 'rxjs/Rx'

export default {
    name: 'pollingRequest',
    data() {
        return {
            count: 0
        }
    },

    created() {
    },

    mounted() {
        this.pollingRequest();
    },

    methods: {
        pollingRequest () {
            function fetchData() {
                return fetch('https://jsonplaceholder.typicode.com/posts/1')
                    .then(res => {
                        console.log(res);
                    })
            }

            const source = Rx.Observable.interval(2000)
                            .concatMap(e => Rx.Observable.from(fetchData()))

            source.subscribe({
                next: (value) => { 
                    this.count ++;
                    console.log('next'); 
                },
                error: (err) => { console.log('Error: ' + err); },
                complete: () => { console.log('complete'); }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
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
