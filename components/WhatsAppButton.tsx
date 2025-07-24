'use client';

export default function WhatsAppButton() {
  const phone = "+1234567890"; // Replace with actual number
  const text = "Hello CCMG, I’d like to learn more.";

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="white"
      >
        <path d="M16.72 12.28c-.54-.27-1.2-.12-1.63.3l-.3.3a1.92 1.92 0 01-2.71 0l-.35-.35a1.92 1.92 0 010-2.71l.3-.3c.42-.43.57-1.09.3-1.63A6.12 6.12 0 006.72 4.68C4.22 7.18 4 11.53 7 15a9 9 0 0012 1c1.5-1.5 2-2.91 2-4.16z" />
      </svg>
    </a>
  );
}
