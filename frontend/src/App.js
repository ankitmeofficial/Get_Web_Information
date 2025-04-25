import React from 'react';
// import './App.css'; 
import Navbar from './components/Home/Navbar';
import URLInfoExtractor from './components/Home/URLInfoExtractor';
import Blogs from './components/Blogs/Blogs';
// import WordChanger from './components/zforcheck/WordChanger';
import Footer from './components/Footer/Footer';
import Contact from './components/Contact/Contact';
import SafetyTips from './components/SafetyTips/SafetyTips';


function App() {
  return (
    <div className="App">
      <Navbar/>

      <section id="home" className="section">
      <URLInfoExtractor />
      </section>

      <section id="blogs" className="section">
       <Blogs/>
      </section>


      <section id="videos" className="section">
        <SafetyTips/>
        </section>

      {/* <section id="latest-insights" className="section">
      Latest Insights Content
      </section>

      <section id="case-studies" className="section">Case Studies Content</section>
      <section id="services" className="section">Services Content</section>
      <section id="about-us" className="section">About Us Content</section> */}

      <section id="contact-us" className="section">
      <Contact/>
      </section>

      <Footer/>

    </div>
  );
}

export default App;
