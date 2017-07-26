<template>
    <div>
        <!--<transition name="router-slid" mode="out-in">-->
        <div class="start" @click="$router.push('/rxjs')">Finished</div>
        <!--</transition>-->
    </div>
</template>

<script>
/*eslint-disable*/
import Rx from 'rxjs/Rx'

export default {
    name: 'finished',
    data() {
        return {
        }
    },

    created() {
    },

    mounted() {
    },

    methods: {
    }
}
</script>

<style lang="scss" scoped>
@mixin transition {
	-webkit-transition: all 0.3s ease;
	-moz-transition: all 0.3s ease;
	-o-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

@keyframes jumpin {
	0% {
		opacity: 0;
		-webkit-transform: scale(0);
		-moz-transform: scale(0);
		-o-transform: scale(0);
		transform: scale(0);
	}
	30% {
		// opacity: 1;
		-webkit-transform: scale(1.02);
		-moz-transform: scale(1.02);
		-o-transform: scale(1.02);
		transform: scale(1.02);
	}
	60% {
		// opacity: 1;
		-webkit-transform: scale(0.975);
		-moz-transform: scale(0.975);
		-o-transform: scale(0.975);
		transform: scale(0.975);
	}
	85% {
		// opacity: 1;
		-webkit-transform: scale(1.01);
		-moz-transform: scale(1.01);
		-o-transform: scale(1.01);
		transform: scale(1.01);
	}
	100% {
		opacity: 1;
		-webkit-transform: scale(1);
		-moz-transform: scale(1);
		-o-transform: scale(1);
		transform: scale(1);
	}
}

.start {
    @include transition;
    animation: jumpin 0.6s ease;
    transition-delay: 2s;
}

</style>
