import { createApp } from 'vue'
import { Quasar, Notify, Dialog } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'


// Import Quasar css
import 'quasar/src/css/index.sass'
import './style.css'

import App from './App.vue'

// Importa el router
import router from './router'


const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {
    Notify, // Agrega el plugin de Notificaciones para que funcione en tu formulario
    Dialog
  },
})

// Usa el router en tu aplicación
myApp.use(router)

myApp.mount('#app')