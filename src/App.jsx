import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/home'
import Servicios from './pages/servicios'
import Contacto from './pages/contacto'
import Footer from './components/footer'
import ScrollToTop from './components/scrollToTop'

function App() {
  const [count, setCount] = useState(0)



  return (
    <>



      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/servicios' element={<Servicios />} />
        <Route path='/contacto' element={<Contacto />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
