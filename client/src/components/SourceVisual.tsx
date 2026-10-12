import React, { useState } from 'react';

type Props = {
  src?: string;
  alt: string;
  title: string;
  mark: string;
  className?: string;
  decorative?: boolean;
};
export default function SourceVisual({src,alt,title,mark,className='',decorative=false}:Props) {
  const [failed,setFailed] = useState(false);
  return <div className={`relative overflow-hidden bg-[#061016] ${className}`} aria-hidden={decorative ? true : undefined}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_15%,rgba(255,209,138,.18),transparent_60%),linear-gradient(145deg,#061016,#15252F)]" />
    {src&&!failed ? <img src={src} alt={decorative?'':alt} loading="lazy" onError={()=>setFailed(true)} className="absolute inset-0 h-full w-full object-cover" /> : <div className="relative flex h-full min-h-[280px] flex-col justify-between gap-10 p-7 md:p-10">
      <p className="font-mono text-xs tracking-[.2em] text-[#8CEEDD]">SCROLLVERSE / {mark}</p>
      <div aria-hidden="true" className="absolute -right-16 top-14 h-64 w-64 rounded-full border border-[#FFD18A]/25"><div className="absolute inset-8 rounded-full border border-[#8CEEDD]/25" /><div className="absolute inset-16 rounded-full border border-[#FFD18A]/30" /></div>
      <div className="relative"><p className="max-w-md text-3xl font-black leading-tight tracking-tight text-[#FFD18A] md:text-4xl">{title}</p><p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[#D1E4EA]">Text-led display · Original visual source retained</p></div>
    </div>}
  </div>;
}
