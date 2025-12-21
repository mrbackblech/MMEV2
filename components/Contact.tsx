import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { createLead } from '../services/projectService';

interface ContactProps {
  initialMessage?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialMessage = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(initialMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createLead({ name, email, message: `${message}${phone ? `\n\nTelefon: ${phone}` : ''}` });
      alert("Vielen Dank! Wir haben Ihre Nachricht erhalten und in unserem System erfasst.");
      // Formular zurücksetzen
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20">
      <div className="w-full">
        {/* Section Label */}
        <span className="text-gold-500 text-[8px] uppercase tracking-[0.5em] font-bold mb-6 block">
          KONTAKT
        </span>

        {/* Main Headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-16 lg:mb-24 max-w-2xl">
          Starten wir den <br />
          <span className="italic text-gold-500">Dialog.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-y-16">
          
          {/* Form Side */}
          <div className="lg:col-span-6">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="block text-[8px] uppercase tracking-[0.2em] text-slate-500 font-bold">NAME</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="w-full bg-transparent border-b border-slate-800 text-white py-2 focus:border-gold-500 focus:outline-none transition-all font-serif text-base"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-[8px] uppercase tracking-[0.2em] text-slate-500 font-bold">E-MAIL ADRESSE</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full bg-transparent border-b border-slate-800 text-white py-2 focus:border-gold-500 focus:outline-none transition-all font-serif text-base"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="block text-[8px] uppercase tracking-[0.2em] text-slate-500 font-bold">TELEFON (OPTIONAL)</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  className="w-full bg-transparent border-b border-slate-800 text-white py-2 focus:border-gold-500 focus:outline-none transition-all font-serif text-base"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-[8px] uppercase tracking-[0.2em] text-slate-500 font-bold">ERZÄHLEN SIE UNS VON IHRER VISION</label>
                <textarea 
                  id="message" 
                  rows={2} 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-slate-800 text-white py-2 focus:border-gold-500 focus:outline-none transition-all resize-none font-serif text-base"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 text-white uppercase tracking-[0.4em] text-[10px] font-bold group pt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-gold-500" />
                    <span>SENDET...</span>
                  </>
                ) : (
                  <>
                    <span>ABSENDEN</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-gold-500" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Spacer column */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Info Side */}
          <div className="lg:col-span-4 lg:border-l lg:border-slate-800 lg:pl-12 flex flex-col justify-start space-y-12">
            
            {/* Kontakt Section */}
            <div className="space-y-4">
               <span className="text-slate-500 text-[8px] uppercase tracking-[0.3em] font-bold block">KONTAKT</span>
               <div className="space-y-1">
                 <a href="mailto:hello@mmevent.com" className="text-xl md:text-2xl font-serif text-white hover:text-gold-500 transition-colors block leading-tight">
                   hello@mmevent.com
                 </a>
                 <a href="tel:+490123456789" className="text-base md:text-lg font-serif text-slate-400 hover:text-white transition-colors block">
                   +49 (0) 123 456 789
                 </a>
               </div>
            </div>

            {/* Studio Section */}
            <div className="space-y-4">
               <span className="text-slate-500 text-[8px] uppercase tracking-[0.3em] font-bold block">STUDIO</span>
               <p className="text-lg md:text-xl font-serif text-slate-300 leading-snug">
                 Königsallee 1<br />
                 40212 Düsseldorf<br />
                 Deutschland
               </p>
            </div>

            {/* Additional Info / Fax */}
            <div className="space-y-4 opacity-40">
               <span className="text-slate-500 text-[8px] uppercase tracking-[0.3em] font-bold block">FAX & FESTNETZ</span>
               <p className="text-xs font-serif text-slate-400 leading-relaxed">
                 Festnetz: +49 (0) 211 987 654 0<br />
                 Fax: +49 (0) 211 987 654 9
               </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};