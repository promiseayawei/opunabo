"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Rocket, Briefcase, Users, Star } from "lucide-react";

const milestones = [
  {
    year: "2023",
    title: "Bricore Founded",
    description: "Launched in Abuja with a mission to digitize African businesses intelligently.",
  },
  {
    year: "2023",
    title: "Customer support for I-Sabi Re-launched",
    description: "offered customer support services during the deployment of our all-in-one e-voting and engagement platform across Nigeria.",
  },
  {
    year: "2023",
    title: "Mapxpress Limited",
    description: " Assisted in launching Mapxpress, a logistics platform connecting drivers and customers.",
  },
  {
    year: "2024",
    title: "10,000 wedding leads generated",
    description: "We helped to generate 10,000 wedding leads for our clients through targeted marketing campaigns.  This milestone showcases our expertise in lead generation and our commitment to helping businesses grow.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#0b1120] text-white min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-28">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#4282ea] mb-4">About Bricore</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We design and deploy intelligent systems for businesses that want to grow faster, serve better, and stay ahead.
          </p>
        </motion.div>

        {/* Mission - Vision - Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Rocket,
              title: "Our Mission",
              text: "Empower bold organizations through human-centered software, data, and strategy.",
            },
            {
              icon: Briefcase,
              title: "Our Vision",
              text: "To become Africa&apos;s most trusted digital transformation company.",
            },
            {
              icon: Users,
              title: "Our Values",
              text: "Innovation, Integrity, Excellence, Long-term Thinking, Collaboration.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#1c2333] p-6 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <Icon size={40} className="text-[#4282ea] mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-[#4282ea]">{title}</h3>
              <p className="text-gray-400">{text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Founder Story */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="md:flex gap-10 items-center"
        >
          <div className="md:w-1/2">
            <Image
              src="/team1.jpg"
              alt="Founder"
              width={500}
              height={500}
              className="rounded-lg object-cover shadow-xl"
            />
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <h3 className="text-3xl font-bold text-[#4282ea] mb-4">Founder’s Story</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Hi, I’m Jennifer, founder of <strong>Bricore</strong>. <br />
              I started this company with one simple mission: <strong>to help people focus on what matters most. </strong>
              As a digital entrepreneur myself, I know how easy it is to get buried in the day-to-day tasks, such as answering emails, managing calendars, handling customer service, and juggling all the small but necessary tasks that keep a business running.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              At <strong>Bricore</strong>, we support ambitious individuals and businesses of all kinds from coaches and creatives to real estate professionals, e-commerce founders, service providers, and growing teams.
              If you’re building something big, we’re here to support you behind the scenes.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Our team takes care of the tasks that slow you down, so you can stay focused on your vision, your clients, and your growth.
            </p>
          </div>

        </motion.div>
 
        {/* What We Do */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-[#4282ea]">What We Can Do for You</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>✅ Take over your daily admin tasks so you stay organized and productive</li>
            <li>✅ Handle client and customer communication with speed and professionalism</li>
            <li>✅ Keep your calendar, inbox, and documents in perfect order</li>
            <li>✅ Support your backend operations like invoicing, data entry, and CRM updates</li>
            <li>✅ Scale with you — from solopreneur to full operation</li>
          </ul>
          <p className="text-gray-400">
            Whether you need help 3 days a week or full-time, we offer flexible monthly plans tailored to your growth stage.
          </p>
        </motion.div>

        {/* Why We Do It */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-[#4282ea]">Why We Do It</h2>
          <p className="text-gray-300">
            Small business owners wear <strong>too many hats</strong> — and we&apos;ve seen firsthand how easy it is to hit burnout trying to do it all.
          </p>
          <p className="text-gray-400">With Bricore as your support system, you can:</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>🌱 Reclaim your time and mental space</li>
            <li>📈 Focus on revenue-generating tasks and client relationships</li>
            <li>📬 Stop feeling overwhelmed by emails, DMs, and to-do lists</li>
            <li>🤝 Delegate confidently to a team that gets your vision and helps you scale</li>
          </ul>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h3 className="text-xl font-semibold text-[#4282ea]">Ready to Experience the Difference?</h3>
          <p className="text-gray-300">Let&apos;s lighten your load so you can lead with clarity, confidence, and calm.</p>
          <div className="flex justify-center gap-4">
            <a
              href="/services"
              className="px-6 py-3 bg-[#4282ea] text-black rounded-md font-semibold hover:opacity-90 transition"
            >
              Explore Services
            </a>
            <a
              href="/contact"
              className="px-6 py-3 border border-[#4282ea] text-[#4282ea] rounded-md font-semibold hover:bg-[#4282ea]/10 transition"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial="hidden"
          whileInView="show"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-[#4282ea] mb-12">Projects Achieved</h3>
          <div className="space-y-12 relative border-l-2 border-[#4282ea] pl-10">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex gap-6 items-start"
              >
                <div className="absolute -left-[42px] top-1 bg-[#4282ea] text-black rounded-full p-2 shadow-lg">
                  <Star size={20} />
                </div>
                <div className="ml-2">
                  <h4 className="text-lg font-bold text-white">
                    {item.year} - {item.title}
                  </h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Value Box
        <div className="grid sm:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-[#161b22] shadow hover:shadow-xl transition">
            <Rocket className="text-[#4282ea] mb-4" size={40} />
            <h3 className="font-semibold text-xl mb-2 text-[#4282ea]">Reliability</h3>
            <p className="text-gray-400">Dependable tech with guaranteed uptime &amp; security.</p>
          </div>
        </div> */}

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-xl text-gray-400 mb-6">Trusted By</h3>
          <div className="flex flex-wrap justify-center gap-10">
            <Image src="/airbnb.png" alt="Client 1" width={100} height={50} />
            <Image src="/moniepoint.jpg" alt="Client 2" width={100} height={50} />
            <Image src="/sahara_rep.jpg" alt="Client 3" width={100} height={50} />
            <Image src="/ayaweisoft.jpeg" alt="Client 4" width={100} height={50} />
            <Image src="/mapxpress.jpeg" alt="Client 5" width={100} height={50} />
            <Image src="/event.jpeg" alt="Client 6" width={100} height={50} />

          </div>
        </motion.div>
      </div>
    </main>
  );
}
