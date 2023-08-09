import '../styles/Home.scss'
import Header from '../components/Header/Header'
import ResultPage from './ResultPage'
import Footer from '../components/Footer/Footer'

const Home = () => {
    return (
        <div className="home-container">
            <Header />
            <ResultPage />
            <Footer />
        </div>
    )
}

export default Home
