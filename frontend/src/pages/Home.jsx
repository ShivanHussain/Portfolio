import Hero from "./miniComponents/Hero";
import Education from "./miniComponents/Education";
import Skills from "./miniComponents/Skills";
import About from "./miniComponents/About";
import Project from "./miniComponents/Projects";
import Contact from "./miniComponents/Contact";

const Home = () => (
  <main className="w-full max-w-6xl mx-auto px-6">
    <section className="min-h-screen flex items-center pt-20"><Hero /></section>
    <section id="about" className="py-24"><About /></section>
    <section className="py-24"><Education /></section>
    <section id="skills" className="py-24"><Skills /></section>
    <section id="projects" className="py-24"><Project /></section>
    <section id="contact" className="py-24"><Contact /></section>
  </main>
);
export default Home;
