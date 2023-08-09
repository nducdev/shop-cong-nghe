import Home from './pages/home/Home'
import Login from './pages/login/Login'
import List from './pages/list/List'
import ListProduct from './pages/list/ListProduct'
import ListOrder from './pages/list/ListOrder'
import Single from './pages/single/Single'
import SingleProduct from './pages/single/SingleProduct'
import New from './pages/new/New'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { productInputs, userInputs } from './formSource'
import './style/dark.scss'
import { useContext } from 'react'
import { DarkModeContext } from './context/darkModeContext'
import { useSelector } from 'react-redux'
import Layout from './components/layout/Layout'
import CreateProduct from './components/product/CreateProduct'

function App() {
    const { darkMode } = useContext(DarkModeContext)
    const auth = useSelector((state) => state.auth.login.currentUser)

    return (
        <div className={darkMode ? 'app dark' : 'app'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={auth ? <Layout /> : <Login />}>
                        <>
                            <Route index element={<Home />} />
                            <Route path="users">
                                <Route index element={<List />} />
                                <Route path=":userId" element={<Single />} />
                                <Route
                                    path="new"
                                    element={<New inputs={userInputs} title="Add New User" />}
                                />
                            </Route>
                            <Route path="products">
                                <Route index element={<ListProduct />} />
                                <Route path=":productId" element={<SingleProduct />} />
                                <Route path="create-product" element={<CreateProduct />} />
                            </Route>
                            <Route path="orders">
                                <Route index element={<ListOrder />} />
                            </Route>
                            {/* <Route index element={<List />} />
                                <Route path=":productId" element={<Single />} />
                                <Route
                                    path="new"
                                    element={<New inputs={productInputs} title="Add New Product" />}
                                /> */}
                        </>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
