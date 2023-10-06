import React from 'react'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'

// Імпорт-модулів,необхідних-для-зберігання-стейджу-між-перезавантаженнями
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

// Импорт редюсерів
import productsReducer from './reducers/productsReducers.js'

// Об'єднання редюсерів
// Сюди додавати редюсери які потрібні в LocalStorage
// Для виклику в файлі використовувати такий шлях " const list = useSelector(state => state.store.cart(name in store).cart(name in reducer))"

const storeReducers = combineReducers({
    // для прикладу додавати так: "cart: cartReducer,"
})

const persistedReducers = persistReducer(
    { key: 'root', storage },
    storeReducers,
)

// Сюди додавати звичайні редюсери
// Для виклику в файлі використовувати такий шлях  "const list = useSelector(state => state.cart(name in store).)"
const store = configureStore({
    reducer: {
        // для прикладу додавати так: "cart: cartReducer,"
        store: persistedReducers,
        products: productsReducer,
    },
})

const persistedStore = persistStore(store)

export default function Store(props) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistedStore}>{props.children}</PersistGate>
        </Provider>
    )
}

Store.propTypes = {
    children: PropTypes.node,
}