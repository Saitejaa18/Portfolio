import './index.css'
import ThreeScene from './components/ThreeScene/ThreeScene'
import Loader from './components/Loader/Loader'
import Cursor from './components/Cursor/Cursor'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Certifications from './components/Certifications/Certifications'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Resume from './components/Resume/Resume'

function App() {
  return (
    <>
      <Loader />
      <Cursor />
      <ThreeScene />
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Resume />
    </>
  )
}

export default App
