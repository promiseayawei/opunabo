// app/contact/page.tsx

import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Bricore",
  description: "Get in touch with us for consultation, support, or partnership",
};

export default function ContactPage() {
  return (
    <main className="bg-[#0a0f1a] text-white py-20 px-6 min-h-screen">
      

      <ContactForm />
    </main>
  );
}
