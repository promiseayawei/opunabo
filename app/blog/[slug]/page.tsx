"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ChevronRight, Scale, Tag } from "lucide-react";
import { posts } from "../../../components/blogData";
import { Particles } from "../../../components/teamData";

/* ── full article content keyed by slug ─────────────────────── */
const content: Record<string, React.ReactNode> = {
  "understanding-land-title-verification-nigeria": (
    <>
      <p>Land acquisition in Nigeria remains one of the most legally hazardous transactions a private individual or corporate entity can undertake. The plurality of title documents in circulation — Certificates of Occupancy, Deeds of Assignment, Governors&apos; Consents, Court Orders, and informal customary receipts — means that without rigorous due diligence, a purchaser may acquire nothing more than an expensive dispute.</p>

      <h3>The Root of Title Problem</h3>
      <p>Nigerian land law is still substantially governed by the Land Use Act 1978, which vested all land in each state in the Governor held in trust for the people. This means that absolute ownership in the English common law sense does not exist — what is transacted is a right of occupancy, either statutory or customary. The Governor&apos;s consent is therefore required for any alienation of a statutory right of occupancy, and failure to obtain it renders the transaction void.</p>

      <h3>The Key Documents to Verify</h3>
      <p>A proper title search must interrogate, at minimum, the following instruments:</p>
      <ul>
        <li><strong>Certificate of Occupancy (C of O)</strong> — issued by the State Governor and the strongest evidence of title. Verify its existence at the relevant Land Registry and confirm it has not been revoked.</li>
        <li><strong>Governor&apos;s Consent</strong> — required for every subsequent assignment. A chain of transactions without consents is a chain of voidable transactions.</li>
        <li><strong>Deed of Assignment</strong> — the instrument of transfer. Check that it was properly stamped and registered.</li>
        <li><strong>Survey Plan</strong> — must be prepared by a licensed surveyor and filed with the Surveyor General&apos;s office. Verify that the parcel does not fall within a government acquisition or forest reserve.</li>
      </ul>

      <h3>Conducting the Search</h3>
      <p>The Land Registry search is conducted at the state Lands Bureau. In Rivers State, this is the Ministry of Lands, Housing and Urban Development. A formal search request must be submitted, and the result — a Search Report — will reveal whether the property is registered, whether any encumbrances exist, and the identity of the registered holder.</p>
      <p>In addition to the Land Registry, a prudent buyer should conduct searches at the Corporate Affairs Commission (if the vendor is a company), the court registries (to check for pending litigation), and the relevant planning authority (to confirm that the proposed use of the land is permitted).</p>

      <h3>Red Flags to Watch For</h3>
      <p>Certain indicators should immediately pause any transaction: a vendor who cannot produce the original title documents; a property with multiple claimants; land located near a waterfront, government reservation, or transmission line corridor; and any situation in which a vendor presses for urgency or discounts the need for legal advice. These are not mere inconveniences — they are frequently the markers of fraud.</p>

      <h3>Conclusion</h3>
      <p>No amount of money saved by bypassing proper due diligence is worth the cost of protracted litigation over land. Engage qualified property law counsel before any commitment is made, and ensure that every step — from initial search through to registration of the final instrument — is handled with professional oversight.</p>
    </>
  ),
  "directors-liability-nigerian-company-law": (
    <>
      <p>The enactment of the Companies and Allied Matters Act (CAMA) 2020 marked the most significant overhaul of Nigerian corporate law in three decades. Among its many reforms, the provisions governing directors&apos; duties and personal liability deserve particular attention from boards, executives, and their advisers.</p>

      <h3>The Statutory Duties Framework</h3>
      <p>CAMA 2020 codifies directors&apos; duties in terms that are more explicit than its 1990 predecessor. Section 305 requires every director to act in what he believes to be the best interests of the company. Section 306 imposes a duty to exercise reasonable care, skill and diligence — assessed both subjectively (the director&apos;s actual knowledge) and objectively (the standard expected of a reasonably diligent person with similar responsibilities).</p>

      <h3>Personal Liability for Company Obligations</h3>
      <p>The general principle that a company is a separate legal person from its directors remains intact. However, CAMA 2020 pierces the corporate veil in several circumstances that directors frequently underestimate:</p>
      <ul>
        <li><strong>Fraudulent trading</strong> (Section 572): where a director knowingly carried on business with intent to defraud creditors, the court may declare them personally liable for all debts.</li>
        <li><strong>Wrongful trading</strong> (Section 573): a director who continued to incur debt when they knew or ought to have known that insolvent liquidation was unavoidable may be liable to contribute to the company&apos;s assets.</li>
        <li><strong>Insolvent trading</strong>: where a director takes money from the company&apos;s accounts knowing it to be insolvent, personal recovery orders may follow.</li>
      </ul>

      <h3>Governance Structures That Mitigate Risk</h3>
      <p>The single most effective protection for a director is a well-maintained record of board deliberation. Minutes that show genuine consideration of risk, independent professional advice obtained, and dissents recorded are invaluable in demonstrating that a director discharged the duty of care. Boards should also ensure that management accounts are presented at every meeting, that the company&apos;s statutory filings at CAC are current, and that the company maintains adequate Directors and Officers (D&O) insurance.</p>

      <h3>The Related-Party Transaction Trap</h3>
      <p>CAMA 2020 tightened the disclosure requirements around related-party transactions. A director who fails to declare a material interest in a contract to which the company is a party not only risks the transaction being voided but may face personal liability for any loss suffered by the company as a result.</p>

      <h3>Practical Takeaways</h3>
      <p>Every director — executive or non-executive — should obtain independent legal advice on the scope of their personal obligations upon appointment. The era in which a non-executive directorship was treated as a ceremonial title is over. CAMA 2020 does not distinguish between executive and non-executive directors when imposing liability.</p>
    </>
  ),
};

/* fallback content for posts without bespoke body */
function DefaultContent({ post }: { post: (typeof posts)[0] }) {
  return (
    <>
      <p>{post.excerpt}</p>
      <p>This article is currently being expanded. Please check back shortly, or <Link href="/contact" className="text-[#FFD700] hover:underline">contact our offices</Link> to speak directly with {post.author} on this matter.</p>
    </>
  );
}

/* ── props ───────────────────────────────────────────────────── */
interface Props { params: Promise<{ slug: string }> }

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function BlogPostPage({ params }: Props) {
  const { slug } = use(params);
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);
  const body = content[slug] ?? <DefaultContent post={post} />;

  return (
    <main
      className="bg-[#080C14] text-white overflow-x-hidden min-h-screen"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_30%_50%,rgba(255,215,0,0.05),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,215,0,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.8) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Particles count={10} />

        <div className="relative z-20 max-w-4xl mx-auto px-6 py-28 md:py-36">
          {/* back */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/blog"
              className="inline-flex items-center gap-2 text-[#FFD700]/60 hover:text-[#FFD700] text-xs font-sans uppercase tracking-widest transition-colors duration-300 mb-10 group">
              <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform duration-300" />
              The Brief
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* category */}
            <div className="flex items-center gap-2 mb-6">
              <Tag size={11} className="text-[#FFD700]/60" />
              <span className="text-[#FFD700]/60 text-xs font-sans uppercase tracking-[0.25em]">{post.category}</span>
            </div>

            <h1
              className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: "0 0 40px rgba(255,215,0,0.08)" }}
            >
              {post.title}
            </h1>

            {/* meta row */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
                  <Scale size={14} className="text-[#FFD700]" />
                </div>
                <div>
                  <p className="text-white text-xs font-sans font-semibold leading-tight">{post.author}</p>
                  <p className="text-gray-600 text-[10px] font-sans italic">{post.authorTitle}</p>
                </div>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <span className="text-gray-600 text-xs font-sans">{post.date}</span>
              <div className="h-4 w-px bg-white/10" />
              <span className="flex items-center gap-1 text-gray-600 text-xs font-sans">
                <Clock size={11} /> {post.readTime}
              </span>
            </div>

            {/* decorative rule */}
            <div className="flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-[#FFD700]/60 to-transparent" />
              <div className="w-1 h-1 rotate-45 bg-[#FFD700]/60" />
              <div className="h-px w-8 bg-gradient-to-r from-[#FFD700]/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE BODY ─────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="prose-article"
            style={{
              color: "rgba(200,200,210,0.8)",
              fontSize: "15px",
              lineHeight: "1.9",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
            }}
          >
            <style>{`
              .prose-article p { margin-bottom: 1.4em; }
              .prose-article h3 {
                font-size: 1.25rem;
                font-weight: 700;
                color: #fff;
                margin: 2.2em 0 0.8em;
                letter-spacing: 0.01em;
                padding-left: 0.75rem;
                border-left: 2px solid rgba(255,215,0,0.5);
              }
              .prose-article ul {
                margin: 1em 0 1.4em 0;
                padding-left: 0;
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: 0.6em;
              }
              .prose-article ul li {
                padding-left: 1.25rem;
                position: relative;
                color: rgba(200,200,210,0.75);
                font-size: 0.9rem;
              }
              .prose-article ul li::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0.65em;
                width: 6px;
                height: 6px;
                background: #FFD700;
                transform: rotate(45deg);
                opacity: 0.7;
              }
              .prose-article strong { color: rgba(241,241,241,0.9); font-weight: 600; }
              .prose-article a { color: #FFD700; text-decoration: underline; text-underline-offset: 3px; }
            `}</style>
            {body}
          </motion.div>

          {/* disclaimer */}
          <motion.div
            className="mt-12 p-6 border border-[#FFD700]/10 bg-[#FFD700]/[0.03]"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] text-gray-600 font-sans leading-relaxed uppercase tracking-widest">
              Disclaimer — This article is provided for general informational purposes only and does not constitute legal advice. For advice specific to your circumstances, please consult a qualified legal practitioner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── AUTHOR CARD ──────────────────────────────────────── */}
      <section className="py-12 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="flex items-center gap-6 bg-[#0E1420] border border-white/5 p-6"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 flex-shrink-0 bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
              <Scale className="w-6 h-6 text-[#FFD700]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-base leading-tight">{post.author}</p>
              <p className="text-[#FFD700]/60 text-xs font-sans uppercase tracking-widest mt-0.5">{post.authorTitle}</p>
              <p className="text-gray-600 text-xs font-sans mt-2">Opunabo Ekine & Associates — Port Harcourt, Rivers State</p>
            </div>
            <Link
              href="/team"
              className="hidden sm:flex items-center gap-1.5 text-[#FFD700]/50 hover:text-[#FFD700] text-xs font-sans uppercase tracking-widest transition-colors duration-300 flex-shrink-0"
            >
              View Profile <ChevronRight size={11} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── RELATED POSTS ────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFD700]" />
              <span className="text-[#FFD700]/60 text-xs font-sans tracking-[0.3em] uppercase">Related Articles</span>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((r, i) => (
                <motion.div
                  key={r.slug}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link href={`/blog/${r.slug}`}
                    className="group flex flex-col gap-3 bg-[#0A0E18] border border-white/5 hover:border-[#FFD700]/25 p-5 transition-all duration-400">
                    <span className="text-[10px] font-sans text-[#FFD700]/50 uppercase tracking-widest">{r.category}</span>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#FFD700] transition-colors duration-300 leading-snug">
                      {r.title}
                    </h4>
                    <span className="flex items-center gap-1 text-[#FFD700]/40 group-hover:text-[#FFD700] transition-colors duration-300 text-[10px] font-sans uppercase tracking-widest mt-auto">
                      Read <ChevronRight size={9} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,215,0,0.06),transparent)]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[#FFD700]/60 text-xs font-sans tracking-[0.35em] uppercase mb-6">Speak With Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Need Advice on a <span className="text-[#FFD700]">Legal Matter?</span>
          </h2>
          <p className="text-gray-400 mb-10 font-sans text-sm">
            Schedule a confidential consultation with one of our senior attorneys.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-[#FFD700] text-[#080C14] px-12 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition-all duration-300"
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          >
            Request a Consultation
          </motion.a>
        </motion.div>
      </section>
    </main>
  );
}