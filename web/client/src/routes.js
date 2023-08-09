import Auth from './page/Auth'
import Home from './page/Home'

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Auth },
    { path: '/register', component: Auth }
]

// const privateRoutes = [
//     { path: '/', component: Home },
//     { path: '/message', component: Message },
//     { path: '/community', component: Community },
//     { path: '/marketplace', component: Marketplace },
//     { path: '/events', component: Events },
//     { path: '/watch', component: Watch }
// ]

export { publicRoutes }
