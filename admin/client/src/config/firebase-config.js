import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyC2tIDdwe6xBwO9UDSvTliYaHy_8ib64wE',
    authDomain: 'web-fresh-food-a0b2c.firebaseapp.com',
    projectId: 'web-fresh-food-a0b2c',
    storageBucket: 'web-fresh-food-a0b2c.appspot.com',
    messagingSenderId: '956157708769',
    appId: '1:956157708769:web:251274fce77c3d77166aa0',
    measurementId: 'G-KGFZHN1H6N'
}

const app = initializeApp(firebaseConfig)
// export const auth = getAuth(app)

export const storage = getStorage(app)
