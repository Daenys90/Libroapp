import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueFire} from 'vuefire'
import { firebaseApp} from './firebase/firebase'
import { getUserProfile, logout } from './services/authService'
import { auth } from './firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueFire, {
    firebaseApp,
    modules: [

    ]
})




onAuthStateChanged(auth, async (user) => {
    if(user) {
        store.commit('setUser', user)
        const profile = await getUserProfile(user.uid)
        if(profile) {
            store.commit('setUserProfile', profile)
            store.commit('setRol', profile.rol)
        }
    } else {
        store.commit('logout')
    }
})

app.mount('#app')