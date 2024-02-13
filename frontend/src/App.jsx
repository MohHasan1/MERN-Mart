import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeContent from './contents/HomeContent';


const App = () => {
  return (
    <div>
      <Header/>

      <main className='py-3'>
        <Container>
          <HomeContent/>
        </Container>
      </main>

      <Footer/>
    </div>
  )
}

export default App
