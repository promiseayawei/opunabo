// app/page.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Users2, SlidersHorizontal } from "lucide-react";

// ...your Home component code

const carouselImages = [
  { src: "/carousel1.jpg", caption: "Customer Support, 24/7" },
  { src: "/carousel2.jpg", caption: "Empowering Operations" },
  { src: "/carousel3.jpg", caption: "Streamline Communications" },
  { src: "/carousel4.jpg", caption: "Build Smarter Processes" },
];

export default function Home() {
  const [clients, setClients] = useState(0);
  const [consultations, setConsultations] = useState(0);
  const [projects, setProjects] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
  const animateCount = (setter: React.Dispatch<React.SetStateAction<number>>, end: number) => {
    let count = 0;
    const step = Math.ceil(end / 40);
    const interval = setInterval(() => {
      count += step;
      if (count >= end) {
        setter(end);
        clearInterval(interval);
      } else {
        setter(count);
      }
    }, 50);
  };

  animateCount(setClients, 50);
  animateCount(setConsultations, 105);
  animateCount(setProjects, 75);

  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, 7000);
  return () => clearInterval(timer);
}, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX.current;
    if (delta > 50) {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    } else if (delta < -50) {
      setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }
  };

  return (
    <main className="bg-[#0d1117] text-white">
      <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="py-16 px-6 bg-[#0d1117] text-white"
>

      {/* Hero Carousel */}
      <section
        className="relative text-center py-32 px-6 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 w-full h-full z-0">
          {carouselImages.map((item, idx) => (
            <Image
              key={idx}
              src={item.src}
              alt={`Slide ${idx + 1}`}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover absolute transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/70 z-10" />
        </div>

        <motion.div
          className="relative z-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Bricore Empowers Your Business</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-300">
            Scalable, data-driven, and always on — we transform your operations from within.
          </p>
          <a
            href="/contact"
            className="bg-[#1f6feb] text-white px-6 py-3 rounded-full font-medium hover:bg-[#388bfd] transition duration-300"
          >
            Get Started
          </a>
          <div className="mt-4 text-sm text-gray-400 italic">
            {carouselImages[currentSlide].caption}
          </div>
        </motion.div>
      </section>
      </motion.section>

      {/* Stats Section */}
      <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="py-16 px-6 bg-[#0d1117] text-white"
>
      <section className="py-20 bg-[#161b22] text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Trusted Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto text-white">
            <div className="text-3xl font-bold"><h2>Clients</h2> {clients}+</div>
            <div className="text-3xl font-bold"><h2>Consultations</h2> {consultations}+</div>
            <div className="text-3xl font-bold"><h2>Projects</h2> {projects}+</div>
          </div>
        </motion.div>
      </section>
</motion.section>
      {/* Value Proposition */}
      <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="py-16 px-6 bg-[#0d1117] text-white"
>
      <section className="py-24 bg-[#0d1117] text-center">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-6">Why Bricore Works</h2>
          <p className="max-w-xl mx-auto text-gray-400 mb-12">
            We provide a future-ready ecosystem of tools, consulting, and automation to help your business grow and scale sustainably.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Scalability", desc: "We grow with your business — no matter the size." },
              { title: "Automation", desc: "Save time and reduce cost with our intelligent workflows." },
              { title: "Support", desc: "24/7 expert help across all solutions you deploy." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#161b22] p-6 rounded-lg hover:shadow-xl transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
</motion.section>

      {/* Services Section */}

      {/* Consultancy Section */}
      <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="py-16 px-6 bg-[#0d1117] text-white"
>
      <section className="py-20 bg-[#161b22]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/consulting.jpg"
              alt="Consultancy Services"
              width={600}
              height={400}
              className="rounded-lg shadow-xl object-cover w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-4">Expert Guidance for Smart Growth</h2>
            <p className="text-gray-400 mb-4">
              Our consulting team walks with you through strategy, process redesign, and solution delivery — turning challenges into opportunities.
            </p>
            <ul className="list-disc list-inside text-gray-300">
              <li>Process Automation</li>
              <li>Customer Experience Design</li>
              <li>Performance Metrics</li>
              <li>IT Advisory</li>
            </ul>
          </motion.div>
        </div>
      </section>
</motion.section>

      {/* Live Chat Section */}
      <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}      
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="py-16 px-6 bg-[#0d1117] text-white"
>
      {/* Features Summary */}
      <section className="py-20 bg-[#0d1117] text-center">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">What Sets Us Apart</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-[#161b22] shadow hover:shadow-xl transition">
              <ShieldCheck className="mx-auto mb-4 text-[#58a6ff]" size={32} />
              <h3 className="font-semibold text-xl mb-2">Reliability</h3>
              <p className="text-gray-400">Dependable tech with guaranteed uptime & security.</p>
            </div>
            <div className="p-6 rounded-lg bg-[#161b22] shadow hover:shadow-xl transition">
              <Users2 className="mx-auto mb-4 text-[#58a6ff]" size={32} />
              <h3 className="font-semibold text-xl mb-2">Top Talent</h3>
              <p className="text-gray-400">Work with experienced professionals, not bots.</p>
            </div>
            <div className="p-6 rounded-lg bg-[#161b22] shadow hover:shadow-xl transition">
              <SlidersHorizontal className="mx-auto mb-4 text-[#58a6ff]" size={32} />
              <h3 className="font-semibold text-xl mb-2">Customization</h3>
              <p className="text-gray-400">Solutions tailored exactly to your business needs.</p>
            </div>
          </div>
        </motion.div>
      </section>
</motion.section>

      {/* Live Chat Section */}

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
      <section className="py-20 bg-[#161b22] text-center">
        <h2 className="text-3xl font-bold mb-6">Client Testimonials</h2>
        <div className="grid sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {[
            {
              src: "/image1.png",
              name: "Marie Davis",
              quote: "Jennifer was a wonderful partner for our lead generation project. She was very responsive, open, and enthusiastic. Her work was fantastic, and we so appreciate her help. I'd recommend her to anyone looking for a great lead gen resource!",
            },
            {
              src: "/image2.jpg",
              name: "Emmanuel Adebayo",
              quote: "Their analytics helped us understand customer behavior better. Highly recommended.",
            },
            {
              src: "/queen-et ayawei.jpeg",
              name: "Queen-et Ayawei",
              quote: "The automation features are top-notch. We’ve saved countless hours.",
            },
          ].map(({ src, name, quote }, i) => (
            <motion.div
              key={i}
              className="bg-[#0d1117] p-6 rounded-lg shadow hover:shadow-2xl transform hover:-translate-y-1 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3 }}
            >
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#58a6ff] shadow-md relative">
                <Image src={src} alt={name} fill className="object-cover" />
              </div>
              <p className="italic text-sm text-gray-300">{`“${quote}”`}</p>
              <p className="mt-4 font-bold text-white">{`— ${name}`}</p>
            </motion.div>
          ))}
        </div>
      </section>
      </motion.section>

      {/* Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
      <section className="py-20 bg-[#0d1117] text-center">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Our strength lies in the diverse talents of our passionate professionals. Get to know the minds behind Bricore’s success.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-6">
            {[
              {
                name: "Jennifer Ogbole",
                title: "Founder & CEO",
                img: "/team1.jpg",
                desc: "Leading Bricore with vision, strategy, and a passion for transformative solutions.",
              },
              {
                name: "Chinedu Ijoma",
                title: "Head of Operations",
                img: "/team2.jpg",
                desc: "Ensures smooth delivery and coordination of all client and internal processes.",
              },
              {
                name: "Ayawei Promise Pretei",
                title: "ICT Consultant",
                img: "/promise_ayawei.jpeg",
                desc: "Specializes in integrating technology solutions to enhance business operations.",
              },
              
            ].map(({ name, title, img, desc }, i) => (
              <motion.div
                key={i}
                className="bg-[#161b22] rounded-lg p-6 hover:shadow-xl transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-[#58a6ff] mb-4 relative">
                  <Image src={img} alt={name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-white">{name}</h3>
                <p className="text-sm text-[#58a6ff] mb-2">{title}</p>
                <p className="text-gray-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      </motion.section>

      {/* Email Subscription */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
      <section className="py-16 px-6 bg-[#0d1117] text-center">
        <motion.div
          className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-6">Subscribe to our newsletter for the latest insights, updates, and offers from Bricore.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing! 🎉");
            }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="px-4 py-3 rounded-md w-full sm:w-2/3 text-white bg-[#161b22] border border-[#58a6ff] focus:outline-none focus:ring-2 focus:ring-[#58a6ff] transition"
              style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#58a6ff] hover:bg-[#4091e2] transition text-white rounded-md font-semibold"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
      </motion.section>

      {/* Footer */}
{/* WhatsApp Floating Button */}
<a
  href="https://wa.me/234905348075?text=Hello%20Bricore%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50"
>
  <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16.72 12.28c-.54-.27-1.2-.12-1.63.3l-.3.3a1.92 1.92 0 01-2.71 0l-.35-.35a1.92 1.92 0 010-2.71l.3-.3c.42-.43.57-1.09.3-1.63a6.12 6.12 0 00-10.59 2.4A9 9 0 0012 21a9 9 0 009-9c0-1.5-.4-2.91-1.15-4.16z"
      />
    </svg>
  </div>
</a>

      

    </main>
  );
}
