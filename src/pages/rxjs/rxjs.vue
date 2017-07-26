<template>
    <div style="height: 100%;">
		<transition name="router-slid" mode="out-in">
			<div v-show="this.$router.currentRoute.fullPath === '/rxjs'" class="start" @click="start">{{text}}</div>
        </transition>
		<transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
		<div class="navigate" v-if="this.$router.currentRoute.fullPath !== '/rxjs' && this.$router.currentRoute.fullPath !== '/rxjs/finished'">
			<button class="nav-l" @click="prevPage">
				<div class="controls-arrow"></div>
			</button>
			<button class="nav-r" @click="nextPage">
				<div class="controls-arrow"></div>
			</button>
		</div>
        <!--<button @click="e => this.subject.next(e)">{{count}}</button>-->
    </div>
</template>

<script>
/*eslint-disable*/
import Rx from 'rxjs/Rx'

export default {
    name: 'rxjs',
    data() {
        return {
			routerIdx: 0,
			routerPath: ['drag', 'followMouse', 'changeNum', 'sucClick', 'pollingRequest', 'enduringPress', 'userRefresh'],
            count: 0,
            userList: [],
			text: 'START'
        }
    },

    watch: {
        count: function(val) {
            console.log(val)
        },
		nowPageIdx: function(val) {
			console.log('nowPageIdx', val	)
		}
    },

	computed: {
		nowPageIdx: function() {
			// console.log(this.$router.currentRoute.fullPath.replace('/rxjs/', ''))
			return this.routerPath.indexOf(this.$router.currentRoute.fullPath.replace('/rxjs/', ''))
		}
	},

    created () {
		this.routerIdx = this.nowPageIdx;
    },

    mounted () {
        // this.test();
        // this.testSubject();
    },
    methods: {
		start () {
			if(!this.finished) {
				this.routerIdx = 0;
				this.$router.push('rxjs/drag');
			} else {
				this.text = 'START'
				this.finished = false;
			}
		},

		prevPage () {
			this.routerIdx --;
			this.$router.go(-1);
			if(this.routerIdx === -1) {
				this.text = 'START'
				this.finished = false;
			}
		},

		nextPage () {
			console.log(this.routerIdx, this.routerPath.length)
			if(this.routerIdx < this.routerPath.length - 1) {
				this.routerIdx ++;
				this.$router.push(`/rxjs/${this.routerPath[this.routerIdx]}`)
			} else {
				this.routerIdx = -1;
				this.$router.push('/rxjs');
				this.finished = true;
				this.text = 'FINISHED'
			}
		},

        test () {
            // let source = Rx.Observable.interval(1000).take(3);
            // let source2 = Rx.Observable.of(3)
            // let source3 = Rx.Observable.of(4,5,6)
            // let example = source.concat(source2, source3).delay(500);


            // console.log(new Date(new Date().getTime() + 1000))
            // example.subscribe({
            //     next: (value) => { console.log(value); },
            //     error: (err) => { console.log('Error: ' + err); },
            //     complete: () => { console.log('complete'); }
            // });

            // -----------------------------------------

            function defineReactive (obj, key, val) {
                console.log(obj)
                console.log(key)
                console.log(val)
                Object.defineProperty(obj, key, {
                    get: function() {
                        // if(Dep.target) dep.addSub(Dep.target);
                        return key;
                    },
                    set: function(newVal) {
                        console.log('set!')
                        console.log('newVal: ', newVal)
                        if(newVal === val) return;
                        val = newVal;
                    }
                })
            }

            function observe (obj, vm) {
                Object.keys(obj).forEach(function (key) {
                    console.log(typeof key)
                    defineReactive(obj, key, obj[key]);
                })
            }

            function myVue(options){
                this.data = options.data;
                var data = this.data;
                
                //1 监听数据
                observe(data, this)
            }

            let bbVue = new myVue({data: {a: 1}});
            // console.log(bbVue)

            // setTimeout(() => {
                bbVue.data.a = 2;
            // }, 1000)

            // -----------------------------------------

            function Archiver() {
                var temperature = null;
                var archive = [];

                defineReactive(this, 'temperature', null);

                // Object.defineProperty(this, 'temperature', {
                //     get: function() {
                //         // console.log('get!');
                //         return temperature;
                //     },
                //     set: function(value) {
                //         // console.log('set!');
                //         temperature = value;
                //         // archive.push({ val: temperature });
                //     }
                // });

                // this.getArchive = function() { return archive; };
            }

            // var arc = new Archiver();
            // arc.temperature; // 'get!'
            // arc.temperature = 11;
            // arc.temperature = 13;
            // console.log(arc.getArchive()); // [{ val: 11 }, { val: 13 }]
            
        },

        testSubject () {
            let source = Rx.Observable.interval(1000)
                            .take(3)
                            .multicast(new Rx.Subject());

            let observerA = {
                next: value => console.log('A next: ' + value),
                error: error => console.log('A error' + error),
                complete: () => console.log('A complete!')
            };

            let observerB = {
                next: value => console.log('B next: ' + value),
                error: error => console.log('B error' + error),
                complete: () => console.log('B complete!')
            };

            source.subscribe(observerA);

            source.connect();

            setTimeout(() => {
                source.subscribe(observerB);
            }, 3000);

            // side-effect，平常有可能是呼叫 API 或其他 side effect
            let result = Rx.Observable.interval(1000)
                            .take(6)
                            .map(x => Math.random())
                            .share()
            
            let subA = result.subscribe(x => console.log('A: ' + x));
            let subB = result.subscribe(x => console.log('B: ' + x));
        },

        clickSubject () {
            this.subject = new Rx.Subject();

            this.subject
                .mapTo(1)
                .scan((origin, next) => origin + next)
                .subscribe(x => {
                    this.count = x
                })
        }
    }
}
</script>

<style lang="scss">
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}

.page {
    height: 100%;
}

.container {
	position: relative;
	width: 90%;
    height: 90%;
    margin: 4% auto 30px;
    background: #295c73;
}

.start {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 100px;
	color: tomato;
}

.navigate {
	position: relative;
	width: 14%;
	height: 60px;
	margin: 0 auto;
	button {
		position: absolute;
		padding: 0;
		background-color: transparent;
		border: 0;
		outline: 0;
		cursor: pointer;
		color: #e7ad52;
		transform: scale(0.9999);
		transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
		pointer-events: auto;
		font-size: inherit;
	}
	.nav-l {
    	left: 0;
	}
	.nav-r {
    	right: 0;
		.controls-arrow {
			transform: rotate(180deg)
		}
	}
}

.controls-arrow {
	position: relative;
    width: 3.6em;
    height: 3.6em;
	&::before, &::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 2.6em;
		height: 0.5em;
		border-radius: 0.25em;
		background-color: currentColor;
		transition: all 0.15s ease, background-color 0.8s ease;
		transform-origin: 0.2em 50%;
		will-change: transform;
	}
	&::before {
		transform: translateX(0.5em) translateY(1.55em) rotate(45deg);
	}
	&::after {
		transform: translateX(0.5em) translateY(1.55em) rotate(-45deg);
	}
}

html,body {
    height: 100%;
    background: #343334;
}

li {
    list-style: none;
}

.legend {
	width: 40%;
	position: absolute;
	top: 140%;
	left: 50%;
	transform: translate(-50%, 0);
	img {
		width: 100%;
	}
}

.drag-el {
    width: 100px;
    height: 100px;
    position: absolute;
    top: 100px;
    left: 100px;
    background: #fff;
    cursor: all-scroll;
    transform: translate3d(0,0,0);
    -webkit-transition: box-shadow ease 0.3s;
    transition: box-shadow ease 0.3s;
}

.float {
    box-shadow: 0px 0px 18px 5px rgba(0, 0, 0, 0.3);
}
</style>
