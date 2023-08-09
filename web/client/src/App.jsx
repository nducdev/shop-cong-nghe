import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { publicRoutes } from './routes'
import Layout from './components/Layout/Layout'
import Missing from './page/Missing'
import DetailProduct from './page/DetailProduct'
import Checkout from './page/Checkout'
import User from './page/User'
import CategoryPage from './page/CategoryPage'

function App() {
    const auth = useSelector((state) => state.auth.login.currentUser)

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {publicRoutes.map((route, index) => {
                    const Page = route.component
                    return <Route key={index} path={route.path} element={<Page />} />
                })}
                {auth?.data && (
                    <>
                        <Route path="/checkout/:productID" element={<Checkout />} />
                        <Route path="/user/*" element={<User />} />
                    </>
                )}
                <Route path="/category/*" element={<CategoryPage />} />
                <Route path="/product-detail/:productID" element={<DetailProduct />} />
                <Route path="/notfound" element={<Missing />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    )
}

export default App
