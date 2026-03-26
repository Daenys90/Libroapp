import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueFire} from 'vuefire'
import { firebaseApp} from './firebase/firebase'

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

app.mount('#app')