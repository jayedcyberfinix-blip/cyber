import React, { useState, useMemo } from 'react';
import { 
  Radio, 
  Search, 
  ShieldCheck, 
  ArrowUpDown, 
  Zap, 
  Server, 
  Layers, 
  CheckCircle, 
  XCircle,
  Cpu
} from 'lucide-react';
import { Language, ProtocolDirectoryItem } from '../types/network';
import { PROTOCOL_DIRECTORY, TCP_UDP_COMPARISON } from '../data/protocolsData';

interface ProtocolsDirectoryProps {
  lang: Language;
}

export const ProtocolsDirectory: React.FC<ProtocolsDirectoryProps> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [transportFilter, setTransportFilter] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'ports' | 'tcp_vs_udp'>('ports');

  const categories = ['ALL', 'Web', 'File', 'Remote', 'Mail', 'Infrastructure', 'Database'];
  const transports = ['ALL', 'TCP', 'UDP', 'TCP/UDP'];

  const filteredProtocols = useMemo(() => {
    return PROTOCOL_DIRECTORY.filter(item => {
      const matchSearch = 
        item.port.toString().includes(searchTerm) ||
        item.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descBn.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat = categoryFilter === 'ALL' || item.category === categoryFilter;
      const matchTrans = transportFilter === 'ALL' || item.transport === transportFilter || item.transport === 'TCP/UDP';

      return matchSearch && matchCat && matchTrans;
    });
  }, [searchTerm, categoryFilter, transportFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Ports & Protocols Encyclopedia' : 'পোর্ট ও প্রোটোকল গাইড এবং TCP বনাম UDP'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Explore standard network ports (0-65535), protocol behaviors, transport layers, and architectural differences between TCP & UDP.'
                  : 'নেটওয়ার্ক পোর্ট (০-৬৫৫৩৫), প্রোটোকলের দায়িত্ব, ট্রান্সপোর্ট লেয়ার সার্ভিস এবং TCP ও UDP এর তুলনামূলক বিশ্লেষণ।'}
              </p>
            </div>
          </div>

          {/* Sub Navigation: Ports Directory vs TCP/UDP Matrix */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('ports')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'ports'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'en' ? 'Port Directory' : 'পোর্ট ডিরেক্টরি'}
            </button>
            <button
              onClick={() => setActiveTab('tcp_vs_udp')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeTab === 'tcp_vs_udp'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'en' ? 'TCP vs UDP Deep-Dive' : 'TCP বনাম UDP তুলনা'}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'ports' ? (
        <div className="space-y-4">
          {/* Port Ranges Overview Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">Well-Known Ports</span>
                <span className="text-[11px] font-mono text-slate-400">0 – 1023</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'en'
                  ? 'Reserved for privileged core system services (HTTP 80, HTTPS 443, SSH 22, DNS 53). Requires root/admin permissions to bind.'
                  : 'মূল সিস্টেম প্রোটোকলের জন্য সংরক্ষিত (HTTP 80, HTTPS 443, SSH 22)। বাইন্ড করতে রুট পারমিশন লাগে।'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">Registered Ports</span>
                <span className="text-[11px] font-mono text-slate-400">1024 – 49151</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'en'
                  ? 'Registered with IANA for designated server applications (MySQL 3306, PostgreSQL 5432, RDP 3389, MongoDB 27017).'
                  : 'আইএএনএ (IANA) তে রেজিস্টার করা অ্যাপ্লিকেশন পোর্ট (যেমন ডাটাবেজ, রিমোট ডেস্কটপ)।'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">Dynamic / Ephemeral Ports</span>
                <span className="text-[11px] font-mono text-slate-400">49152 – 65535</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'en'
                  ? 'Allocated dynamically by the client OS as temporary source ports when connecting out to remote servers.'
                  : 'ক্লায়েন্ট কম্পিউটার কোনো ওয়েবসাইটে যুক্ত হওয়ার সময় অস্থায়ী সোর্স পোর্ট হিসেবে এটি বরাদ্দ পায়।'}
              </p>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={lang === 'en' ? 'Search port, protocol, name...' : 'পোর্ট, প্রোটোকল সার্চ করুন...'}
                className="w-full bg-slate-950 border border-slate-700 pl-9 pr-3 py-1.5 text-xs text-white rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Category */}
              <div className="flex items-center gap-1 overflow-x-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg transition ${
                      categoryFilter === cat
                        ? 'bg-purple-600 text-white font-semibold'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Transport Filter */}
              <div className="flex items-center gap-1 ml-auto">
                {transports.map(tr => (
                  <button
                    key={tr}
                    onClick={() => setTransportFilter(tr)}
                    className={`px-2 py-1 text-[11px] rounded-lg font-mono transition ${
                      transportFilter === tr
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {tr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Protocols Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProtocols.map(item => (
              <div
                key={item.port + item.protocol}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-cyan-400 font-bold text-sm">
                        :{item.port}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-white">{item.protocol}</h3>
                        <span className="text-[11px] text-slate-400 block line-clamp-1">{item.fullName}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-950/70 text-indigo-300 border border-indigo-800/60">
                      {item.transport}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {lang === 'en' ? item.descEn : item.descBn}
                  </p>
                </div>

                {/* Security Advice Note */}
                <div className="pt-2 border-t border-slate-800/80 flex items-start gap-1.5 text-[11px] text-amber-300/80">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                  <span className="line-clamp-2">{item.securityNote}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* TCP vs UDP In-Depth Comparison Table & Conceptual Matrix */
        <div className="space-y-6">
          {/* Quick Visual Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TCP Summary Card */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400" />
                  <h3 className="text-base font-bold text-white">TCP (Transmission Control Protocol)</h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Reliable & Ordered
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>3-Way Handshake:</strong> SYN → SYN-ACK → ACK establishes verified session.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Guaranteed Delivery:</strong> Every byte acknowledged; lost segments retransmitted.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Congestion Control:</strong> Adjusts window size automatically to prevent network buffer overflows.</span>
                </li>
              </ul>
              <div className="pt-2 text-xs font-mono text-cyan-400">
                Ideal for: Web (HTTP/HTTPS), File Transfer (SFTP/FTP), Remote Access (SSH), Email (SMTP).
              </div>
            </div>

            {/* UDP Summary Card */}
            <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-400" />
                  <h3 className="text-base font-bold text-white">UDP (User Datagram Protocol)</h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  Stateless & Low Latency
                </span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Connectionless:</strong> No handshake latency; immediate transmission of datagrams.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Minimal Overhead:</strong> Fixed 8-byte header saves bandwidth and router CPU cycles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>No Retransmission:</strong> Dropped packets are ignored. Prioritizes real-time speed over complete accuracy.</span>
                </li>
              </ul>
              <div className="pt-2 text-xs font-mono text-purple-400">
                Ideal for: Live Video Streaming (WebRTC), Multiplayer Gaming, DNS Queries, VoIP Calls, NTP.
              </div>
            </div>
          </div>

          {/* Full Comparison Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {lang === 'en' ? 'Side-by-Side Architectural Matrix' : 'বৈশিষ্ট্য ও প্রযুক্তিগত পার্থক্যের তুলনামূলক টেবিল'}
              </h3>
              <span className="text-xs text-slate-400 font-mono">RFC 793 vs RFC 768</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[11px] font-mono">
                  <tr>
                    <th className="p-3.5">{lang === 'en' ? 'Feature' : 'বৈশিষ্ট্য'}</th>
                    <th className="p-3.5 text-cyan-300">TCP</th>
                    <th className="p-3.5 text-purple-300">UDP</th>
                    <th className="p-3.5">{lang === 'en' ? 'Why It Matters' : 'কেন এটি গুরুত্বপূর্ণ'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {TCP_UDP_COMPARISON.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-850/50 transition">
                      <td className="p-3.5 font-semibold text-white whitespace-nowrap">
                        {lang === 'en' ? row.featureEn : row.featureBn}
                      </td>
                      <td className="p-3.5 text-cyan-200">
                        {row.tcp}
                      </td>
                      <td className="p-3.5 text-purple-200">
                        {row.udp}
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {lang === 'en' ? row.importanceEn : row.importanceBn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
