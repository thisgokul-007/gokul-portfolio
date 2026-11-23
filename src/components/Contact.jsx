import React, { useState, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { Github } from './Icons';
import {
  Mail, Send, User, MessageSquare, FileText,
  CheckCircle2, AlertCircle, Loader2, Copy, Check,
  AtSign, ExternalLink
} from 'lucide-react';

const EMAIL = portfolioData.socials.email;

function InputField({ id, label, icon: Icon, type = 'text', value, onChange, placeholder, error, disabled }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-mono text-white/60 tracking-wider uppercase">
        {label} <span className="text-[#56C8FF]">*</span>
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-white/25 font-normal transition-all duration-200 outline-none focus:ring-2 focus:ring-[#56C8FF]/30 disabled:opacity-50 ${
            error
              ? 'border-red-500/50 focus:border-red-500/70 bg-red-500/5'
              : 'border-white/10 focus:border-[#56C8FF]/50'
          }`}
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 font-mono flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({ id, label, value, onChange, placeholder, error, disabled }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-mono text-white/60 tracking-wider uppercase">
        {label} <span className="text-[#56C8FF]">*</span>
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={5}
        className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-white/25 font-normal transition-all duration-200 outline-none focus:ring-2 focus:ring-[#56C8FF]/30 disabled:opacity-50 resize-none ${
          error
            ? 'border-red-500/50 focus:border-red-500/70 bg-red-500/5'
            : 'border-white/10 focus:border-[#56C8FF]/50'
        }`}
      />
      {error && (
        <p className="text-xs text-red-400 font-mono flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const submitLock = useRef(false);

  const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Your name is required.';
    if (!form.email.trim()) e.email = 'Your email address is required.';
    else if (!validateEmail(form.email)) e.email = 'Please enter a valid email address.';
    if (!form.subject.trim()) e.subject = 'A subject line is required.';
    if (!form.message.trim()) e.message = 'Please write a message before sending.';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitLock.current || status === 'sending') return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      sound.playClick();
      return;
    }

    submitLock.current = true;
    setStatus('sending');
    setErrorMsg('');
    sound.playClick();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again or email directly.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      submitLock.current = false;
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      sound.playClick();
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const isBusy = status === 'sending';

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden bg-[#080A10]">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#56C8FF]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9370DB]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#56C8FF] mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>CONTACT // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            LET'S BUILD SOMETHING
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mt-3 font-normal">
            Open to internship opportunities, hackathon collaborations, project discussions, and genuine connections in the developer community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── Left Info Panel ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Direct email card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <AtSign className="w-4 h-4 text-[#56C8FF]" />
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Direct Email</span>
              </div>
              <p className="text-sm font-mono text-white mb-3 break-all">{EMAIL}</p>
              <button
                onClick={copyEmail}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#56C8FF]/40 hover:bg-[#56C8FF]/10 text-white/60 hover:text-white transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#50FA7B]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied to clipboard!' : 'Copy email address'}
              </button>
            </div>

            {/* Social links */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <p className="text-xs font-mono text-white/50 uppercase tracking-wider mb-4">Connect</p>
              <div className="flex flex-col gap-3">
                <a
                  href={portfolioData.socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/8 hover:border-white/20 hover:bg-white/8 text-white/70 hover:text-white transition-all group cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-mono">github.com/thisgokul-007</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto text-white/30 group-hover:text-white/60 transition-colors" />
                </a>
                <a
                  href={portfolioData.socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sound.playHover()}
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/8 hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 text-white/70 hover:text-white transition-all group cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm font-mono">S. Gokul on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto text-white/30 group-hover:text-white/60 transition-colors" />
                </a>
              </div>
            </div>

            {/* Status indicator */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#50FA7B]/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#50FA7B] animate-pulse" />
                <span className="text-xs font-mono text-[#50FA7B]">Available for opportunities</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-normal">
                Open to internship roles, collaborative hackathon teams, and freelance project discussions.
              </p>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="lg:col-span-3">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">

              {/* Success State */}
              {status === 'success' && (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="p-4 rounded-full bg-[#50FA7B]/15 border border-[#50FA7B]/30">
                    <CheckCircle2 className="w-10 h-10 text-[#50FA7B]" />
                  </div>
                  <h3 className="text-xl font-black text-white">Message Delivered!</h3>
                  <p className="text-sm text-slate-400 max-w-sm">
                    Your message has been sent to Gokul's inbox. Expect a reply within 24–48 hours.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); sound.playClick(); }}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-[#56C8FF]/15 border border-[#56C8FF]/30 text-[#56C8FF] text-sm font-mono hover:bg-[#56C8FF]/25 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

              {/* Form */}
              {status !== 'success' && (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                      id="contact-name"
                      label="Your Name"
                      icon={User}
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="e.g. Jane Smith"
                      error={errors.name}
                      disabled={isBusy}
                    />
                    <InputField
                      id="contact-email"
                      label="Your Email"
                      icon={AtSign}
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="e.g. jane@company.com"
                      error={errors.email}
                      disabled={isBusy}
                    />
                  </div>

                  <InputField
                    id="contact-subject"
                    label="Subject"
                    icon={FileText}
                    value={form.subject}
                    onChange={handleChange('subject')}
                    placeholder="e.g. Internship Opportunity / Collaboration"
                    error={errors.subject}
                    disabled={isBusy}
                  />

                  <TextareaField
                    id="contact-message"
                    label="Message"
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Tell Gokul about your opportunity, project idea, or just say hello..."
                    error={errors.message}
                    disabled={isBusy}
                  />

                  {/* Global error */}
                  {status === 'error' && errorMsg && (
                    <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-500/10 border border-red-500/25">
                      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-red-300 leading-relaxed">{errorMsg}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isBusy}
                    onMouseEnter={() => !isBusy && sound.playHover()}
                    className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#56C8FF] to-[#9370DB] text-black font-black text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-[0_0_30px_rgba(86,200,255,0.25)]"
                  >
                    {isBusy ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending Message…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-600 font-mono">
                    Your message is delivered directly to{' '}
                    <span className="text-slate-500">{EMAIL}</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
