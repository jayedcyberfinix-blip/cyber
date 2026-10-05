import React, { useState } from 'react';
import { 
  FileCode, 
  Layers, 
  Info, 
  Sliders, 
  Terminal, 
  Check, 
  HelpCircle,
  Cpu,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../types/network';
import { PACKET_HEADERS, HeaderField } from '../data/packetHeaders';

interface PacketInspectorProps {
  lang: Language;
}

export const PacketInspector: React.FC<PacketInspectorProps> = ({ lang }) => {
  const [selectedProtocol, setSelectedProtocol] = useState<'ipv4' | 'ipv6' | 'tcp' | 'udp'>('ipv4');
  const [activeField, setActiveField] = useState<HeaderField>(PACKET_HEADERS.ipv4.fields[0]);

  // Interactive Crafter State
  const [craftSrcIp, setCraftSrcIp] = useState('192.168.1.100');
  const [craftDstIp, setCraftDstIp] = useState('142.250.190.46');
  const [craftTtl, setCraftTtl] = useState(64);
  const [craftSrcPort, setCraftSrcPort] = useState(51234);
  const [craftDstPort, setCraftDstPort] = useState(443);
  const [craftFlags, setCraftFlags] = useState<{ [key: string]: boolean }>({
    SYN: true,
    ACK: false,
    FIN: false,
    RST: false,
    PSH: false,
    URG: false
  });

  const currentDissection = PACKET_HEADERS[selectedProtocol];

  const handleProtocolChange = (proto: 'ipv4' | 'ipv6' | 'tcp' | 'udp') => {
    setSelectedProtocol(proto);
    setActiveField(PACKET_HEADERS[proto].fields[0]);
  };

  const toggleFlag = (flagName: string) => {
    setCraftFlags(prev => ({
      ...prev,
      [flagName]: !prev[flagName]
    }));
  };

  // Calculate hex flags value
  const flagByteValue = (
    (craftFlags.URG ? 32 : 0) |
    (craftFlags.ACK ? 16 : 0) |
    (craftFlags.PSH ? 8 : 0) |
    (craftFlags.RST ? 4 : 0) |
    (craftFlags.SYN ? 2 : 0) |
    (craftFlags.FIN ? 1 : 0)
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Packet & Protocol Header Dissector' : 'প্যাকেট ও হেডার কাঠামো বিশ্লেষণ (Wireshark-স্টাইল)'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Examine raw byte structures of IPv4, IPv6, TCP, and UDP headers. Click any field to inspect bit offsets, hex representations, and network behavior.'
                  : 'IPv4, IPv6, TCP এবং UDP হেডারের প্রতিটি বিট ও ফিল্ডের বিস্তারিত বিশ্লেষণ। ফিল্ডে ক্লিক করে হেক্স ভ্যালু ও ভূমিকা দেখুন।'}
              </p>
            </div>
          </div>

          {/* Protocol Switcher */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto font-mono text-xs">
            {(['ipv4', 'ipv6', 'tcp', 'udp'] as const).map(p => (
              <button
                key={p}
                onClick={() => handleProtocolChange(p)}
                className={`px-3 py-1.5 rounded-md font-bold transition uppercase ${
                  selectedProtocol === p
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Header Bit Diagram on Top/Left, Field Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 32-Bit Grid Diagram */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {currentDissection.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en' ? currentDissection.descriptionEn : currentDissection.descriptionBn}
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 shrink-0">
                {currentDissection.totalBytes} Bytes
              </span>
            </div>

            {/* 32-Bit Width Grid Scale */}
            <div className="mt-4 hidden sm:grid grid-cols-32 text-[9px] font-mono text-slate-500 text-center border-b border-slate-800 pb-1 px-1">
              <span>0</span>
              <span className="col-start-8">7</span>
              <span className="col-start-9">8</span>
              <span className="col-start-16">15</span>
              <span className="col-start-17">16</span>
              <span className="col-start-24">23</span>
              <span className="col-start-25">24</span>
              <span className="col-start-32">31</span>
            </div>

            {/* Header Fields Interactive Blocks */}
            <div className="mt-3 flex flex-wrap gap-2">
              {currentDissection.fields.map((field) => {
                const isActive = activeField.name === field.name;
                return (
                  <button
                    key={field.name}
                    onClick={() => setActiveField(field)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      isActive
                        ? 'bg-blue-600/20 border-blue-400 text-white shadow-md shadow-blue-500/10 ring-1 ring-blue-400'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                    style={{
                      flex: `1 1 ${Math.max(160, (field.bitLength / 32) * 100)}%`
                    }}
                  >
                    <div className="flex items-center justify-between gap-1 text-[11px] font-mono">
                      <span className="font-bold text-blue-300 truncate">{field.name}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">[{field.bitLength}b]</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-400 text-[10px] truncate">{field.sampleHex}</span>
                      <span className="font-mono text-emerald-400 font-semibold text-[11px] truncate">{field.sampleDec}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>{lang === 'en' ? 'Click on any block to see detailed bit explanation.' : 'যেকোনো ব্লকে ক্লিক করে বিস্তারিত ব্যাখ্যা দেখুন।'}</span>
              <span className="font-mono text-blue-400">RFC Compliant Layout</span>
            </div>
          </div>

          {/* Interactive Live Packet Crafter Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? 'Interactive Header Crafter & Flag Manipulator' : 'প্যাকেট হেডার ক্রাফটার ও ফ্ল্যাগ পরীক্ষাগার'}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Live Byte Generator</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Source IP</label>
                <input
                  type="text"
                  value={craftSrcIp}
                  onChange={(e) => setCraftSrcIp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 rounded text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">Destination IP</label>
                <input
                  type="text"
                  value={craftDstIp}
                  onChange={(e) => setCraftDstIp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 rounded text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 text-[10px] uppercase font-semibold block mb-1">TTL (Hops)</label>
                <input
                  type="number"
                  min="1"
                  max="255"
                  value={craftTtl}
                  onChange={(e) => setCraftTtl(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 px-2.5 py-1.5 rounded text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* TCP Flags Toggle Box */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-300 uppercase">
                  {lang === 'en' ? 'TCP Control Flags (SYN, ACK, FIN, RST, PSH, URG):' : 'TCP নিয়ন্ত্রণ ফ্ল্যাগসমূহ:'}
                </span>
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  Flags: 0x{flagByteValue.toString(16).padStart(2, '0').toUpperCase()} ({flagByteValue})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.keys(craftFlags).map(flagKey => (
                  <button
                    key={flagKey}
                    onClick={() => toggleFlag(flagKey)}
                    className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition ${
                      craftFlags[flagKey]
                        ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400 shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {flagKey} {craftFlags[flagKey] ? '= 1' : '= 0'}
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Raw Hex Stream */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Raw Hex Stream Dissection (Wireshark Dump)</span>
                <span className="text-emerald-400">45 00 00 3c ...</span>
              </div>
              <p className="text-emerald-300 text-[11px] break-all">
                45 00 00 3c 1c 2b 40 00 {craftTtl.toString(16).padStart(2, '0')} 06 8a 24 c0 a8 01 64 8e fa be 2e d4 31 01 bb 3b 9a ca 00 00 00 00 00 50 {flagByteValue.toString(16).padStart(2, '0')} ff ff e2 5a 00 00
              </p>
            </div>
          </div>
        </div>

        {/* Right: Active Field Inspector */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 sticky top-20">
            <div className="pb-3 border-b border-slate-800">
              <span className="text-[10px] uppercase font-mono tracking-wider text-blue-400 block mb-1">
                Field Deep-Dive
              </span>
              <h3 className="text-base font-bold text-white">
                {activeField.name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">
                  {activeField.bitLength} Bits ({activeField.bitLength / 8} Bytes)
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Offset: {activeField.offsetBits} bits
                </span>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Hexadecimal:</span>
                <span className="text-blue-300 font-bold">{activeField.sampleHex}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Decimal / Value:</span>
                <span className="text-emerald-400 font-bold">{activeField.sampleDec}</span>
              </div>
            </div>

            {/* Explanation */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                {lang === 'en' ? 'Description & Behavior' : 'বিবরণ ও কার্যপদ্ধতি'}
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                {lang === 'en' ? activeField.descEn : activeField.descBn}
              </p>
            </div>

            {/* Wireshark Tip */}
            <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs text-indigo-300">
              <div className="flex items-center gap-1.5 font-semibold text-indigo-200 mb-1">
                <Info className="w-3.5 h-3.5" />
                <span>Wireshark Analysis Note</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {lang === 'en'
                  ? 'In network packet capture tools like Wireshark and tcpdump, this field is highlighted directly within the packet bytes view.'
                  : 'ওয়্যারশার্ক এবং টিসিপিডাম্পে প্যাকেট ট্রাফিকের বাইট সিলেক্ট করলে এই ফিল্ডটি সরাসরি দেখা যায়।'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
