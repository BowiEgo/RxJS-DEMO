import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import loading from '../pages/loading'
import loadingTest from '../pages/loadingTest'
import particleText from '../pages/particleText'
import pie from '../pages/pie'
import dropText from '../pages/dropText'
import mouseArrow from '../pages/mouseArrow'
import rxjs from '../pages/rxjs/rxjs'
import drag from '../pages/rxjs/children/drag'
import followMouse from '../pages/rxjs/children/followMouse'
import changeNum from '../pages/rxjs/children/changeNum'
import sucClick from '../pages/rxjs/children/sucClick'
import pollingRequest from '../pages/rxjs/children/pollingRequest'
import enduringPress from '../pages/rxjs/children/enduringPress'
import userRefresh from '../pages/rxjs/children/userRefresh'
import finished from '../pages/rxjs/children/finished'
import perspectiveCard from '../pages/perspectiveCard'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },
    {
      path: '/loadingTest',
      name: 'loadingTest',
      component: loadingTest
    },
    {
      path: '/particleText',
      name: 'particleText',
      component: particleText
    },
    {
      path: '/pie',
      name: 'pie',
      component: pie
    },
    {
      path: '/dropText',
      name: 'dropText',
      component: dropText
    },
    {
      path: '/mouseArrow',
      name: 'mouseArrow',
      component: mouseArrow
    },
    {
      path: '/rxjs',
      name: 'rxjs',
      component: rxjs,
      children: [
        {
          name: 'drag',
          path: 'drag',
          component: drag
        },
        {
          name: 'followMouse',
          path: 'followMouse',
          component: followMouse
        },
        {
          name: 'changeNum',
          path: 'changeNum',
          component: changeNum
        },
        {
          name: 'sucClick',
          path: 'sucClick',
          component: sucClick
        },
        {
          name: 'pollingRequest',
          path: 'pollingRequest',
          component: pollingRequest
        },
        {
          name: 'enduringPress',
          path: 'enduringPress',
          component: enduringPress
        },
        {
          name: 'userRefresh',
          path: 'userRefresh',
          component: userRefresh
        },
        {
          name: 'finished',
          path: 'finished',
          component: finished
        }
      ]
    },
    {
      path: '/card',
      name: 'card',
      component: perspectiveCard
    }
  ]
})
