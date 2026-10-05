import React, { useState } from 'react';
import { 
  Activity, 
  Server, 
  Laptop, 
  Shield, 
  Globe, 
  ArrowRight, 
  BarChart3, 
  Sliders, 
  Filter, 
  ShieldAlert, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Layers,
  Cpu,
  Wifi,
  Radio,
  FileCode
} from 'lucide-react';
import { Language, Packet } from '../types/network';

interface NetworkDashboardProps {
  lang: Language;
  livePackets: Packet[];
  isTrafficRunning: boolean;
  packetRate: number;
}

export const NetworkDashboard: React.FC<NetworkDashboardProps> = ({
  lang,
  livePackets,
  isTrafficRunning,
  packetRate
}) => {
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>('firewall');

  // Topology node statistics
  const totalPackets = livePackets.length;
  const allowedPackets = livePackets.filter(p => p.status === 'ALLOWED').length;
  const droppedPackets = livePackets.filter(p => p.status === 'DROPPED').length;
  const threatPackets = livePackets.filter(p => p.isThreat).length;

  // Protocol counts
  const protoCounts = livePackets.reduce((acc, p) => {
    acc[p.protocol] = (acc[p.protocol] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Real-Time Network Traffic Visualizer & Topology' : 'রিয়েল-টাইম নেটওয়ার্ক ট্রাফিক ও টপোলজি ম্যাপ'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Live packet flow across Client, Switch, Firewall/IDS, Gateway, and Internet servers. Real-time metrics and deep packet inspection.'
                  : 'ক্লায়েন্ট কম্পিউটার, সুইচ, ফায়ারওয়াল, রাউটার এবং ইন্টারনেটের মধ্যে চলমান লাইভ ডেটা প্যাকেট প্রবাহের ড্যাশবোর্ড।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${isTrafficRunning ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
              <span className="text-slate-300">{isTrafficRunning ? 'STREAM ACTIVE' : 'STREAM PAUSED'}</span>
            </div>
          </div>
        </div>

        {/* Real-Time Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80">
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'en' ? 'Throughput Rate' : 'প্যাকেট রেট'}</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-cyan-300">{isTrafficRunning ? packetRate : 0}</span>
              <span className="text-[11px] text-slate-500 font-mono">pkt/s</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'en' ? 'Total Packets' : 'মোট প্যাকেট'}</span>
            <span className="text-xl font-bold font-mono text-white mt-0.5 block">{totalPackets.toLocaleString()}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'en' ? 'Allowed / Passed' : 'অনুমোদিত ট্রাফিক'}</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-emerald-400">{allowedPackets.toLocaleString()}</span>
              <span className="text-[11px] text-slate-500 font-mono">({totalPackets > 0 ? Math.round((allowedPackets/totalPackets)*100) : 100}%)</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{lang === 'en' ? 'Threats Intercepted' : 'আটকানো হুমকি'}</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-xl font-bold font-mono text-rose-400">{droppedPackets + threatPackets}</span>
              <span className="text-[10px] text-rose-400 font-mono">DROPPED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network Topology Map (Interactive Visual Canvas) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Live Network Infrastructure Topology' : 'লাইভ নেটওয়ার্ক ইনফ্রাস্ট্রাকচার ও নোড সংযোগ'}
            </h2>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {lang === 'en' ? 'Click node to inspect hardware' : 'নোডে ক্লিক করে হার্ডওয়্যার বিবরণ দেখুন'}
          </span>
        </div>

        {/* Nodes Flow Row */}
        <div className="relative py-4 overflow-x-auto">
          <div className="min-w-[650px] flex items-center justify-between relative px-4">
            {/* Animated Traffic Cable Line */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-800 -z-0">
              {isTrafficRunning && (
                <div className="h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-purple-500 animate-pulse" />
              )}
            </div>

            {/* Node 1: Client Host */}
            <div
              onClick={() => setSelectedNode('client')}
              className={`relative z-10 cursor-pointer p-3.5 rounded-xl border transition-all text-center space-y-1.5 ${
                selectedNode === 'client'
                  ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white">Client Workstation</h3>
              <span className="text-[10px] font-mono text-slate-400 block">192.168.1.50</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                Host A (NIC)
              </span>
            </div>

            {/* Node 2: Access Switch (Layer 2) */}
            <div
              onClick={() => setSelectedNode('switch')}
              className={`relative z-10 cursor-pointer p-3.5 rounded-xl border transition-all text-center space-y-1.5 ${
                selectedNode === 'switch'
                  ? 'bg-slate-900 border-indigo-400 ring-2 ring-indigo-500/30 shadow-lg shadow-indigo-500/10'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white">L2 Managed Switch</h3>
              <span className="text-[10px] font-mono text-slate-400 block">MAC: 00:1A:2B:3C:4D:5E</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                24-Port Gigabit
              </span>
            </div>

            {/* Node 3: Firewall & IDS Engine */}
            <div
              onClick={() => setSelectedNode('firewall')}
              className={`relative z-10 cursor-pointer p-3.5 rounded-xl border transition-all text-center space-y-1.5 ${
                selectedNode === 'firewall'
                  ? 'bg-slate-900 border-rose-400 ring-2 ring-rose-500/30 shadow-lg shadow-rose-500/10'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white">NGFW & IDS/IPS</h3>
              <span className="text-[10px] font-mono text-slate-400 block">SPI & DPI Engine</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono">
                Active Inline
              </span>
            </div>

            {/* Node 4: Gateway Router */}
            <div
              onClick={() => setSelectedNode('router')}
              className={`relative z-10 cursor-pointer p-3.5 rounded-xl border transition-all text-center space-y-1.5 ${
                selectedNode === 'router'
                  ? 'bg-slate-900 border-teal-400 ring-2 ring-teal-500/30 shadow-lg shadow-teal-500/10'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white">Core Edge Router</h3>
              <span className="text-[10px] font-mono text-slate-400 block">NAT & BGP Routing</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 font-mono">
                WAN: 203.0.113.195
              </span>
            </div>

            {/* Node 5: Internet & Target Cloud */}
            <div
              onClick={() => setSelectedNode('internet')}
              className={`relative z-10 cursor-pointer p-3.5 rounded-xl border transition-all text-center space-y-1.5 ${
                selectedNode === 'internet'
                  ? 'bg-slate-900 border-purple-400 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white">Public Internet / Cloud</h3>
              <span className="text-[10px] font-mono text-slate-400 block">DNS / Web / SSH</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 font-mono">
                Global WAN
              </span>
            </div>
          </div>
        </div>

        {/* Selected Node Details Box */}
        {selectedNode && (
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold block mb-1">
              Node Telemetry Details ({selectedNode.toUpperCase()})
            </span>
            {selectedNode === 'client' && (
              <p className="text-slate-300">
                {lang === 'en'
                  ? 'Client Workstation: IP 192.168.1.50, Default Gateway 192.168.1.1, Subnet Mask 255.255.255.0. Initiates outbound TCP/UDP application sessions and resolves DNS names.'
                  : 'ক্লায়েন্ট কম্পিউটার: আইপি ১৯২.১৬৮.১.৫০, সাবনেট ২৫৫.২৫৫.২৫৫.০। এটি ব্রাউজার ও সফটওয়্যার থেকে ট্রাফিক জেনারেট করে স্থানীয় সুইচে পাঠায়।'}
              </p>
            )}
            {selectedNode === 'switch' && (
              <p className="text-slate-300">
                {lang === 'en'
                  ? 'Layer 2 Ethernet Switch: Maintains MAC address CAM table. Inspects Destination MAC in Layer 2 Ethernet frames and switches frames directly to target ports without altering IP packets.'
                  : 'লেয়ার ২ সুইচ: ম্যাক অ্যাড্রেস টেবিল দেখে লোকাল নেটওয়ার্কে কোনো ফ্রেম না ফেলে সরাসরি নির্দিষ্ট পোর্টে ফরওয়ার্ড করে।'}
              </p>
            )}
            {selectedNode === 'firewall' && (
              <p className="text-slate-300">
                {lang === 'en'
                  ? 'Next-Generation Firewall & IDS/IPS: Inspects packets up to Layer 7. Enforces Access Control Lists (ACLs), tracks stateful TCP connections, and matches traffic against signature rules to drop exploits and malicious scans.'
                  : 'নেক্সট-জেন ফায়ারওয়াল ও IDS/IPS: লেয়ার ৭ পর্যন্ত ডিপ প্যাকেট ইন্সপেকশন চালায়, আক্রমণ শনাক্ত করলে স্বয়ংক্রিয়ভাবে প্যাকেট ড্রপ করে অ্যালার্ট পাঠায়।'}
              </p>
            )}
            {selectedNode === 'router' && (
              <p className="text-slate-300">
                {lang === 'en'
                  ? 'Core Edge Router (Layer 3): Translates private RFC 1918 LAN addresses (192.168.1.0/24) into public WAN IP 203.0.113.195 via NAT/PAT. Routes packets across upstream autonomous systems via BGP/OSPF.'
                  : 'লেয়ার ৩ রাউটার: ন্যাট (NAT) এর মাধ্যমে লোকাল প্রাইভেট আইপিকে পাবলিক আইপিতে রূপান্তর করে বিশ্বব্যাপী ইন্টারনেটের সাথে যুক্ত করে।'}
              </p>
            )}
            {selectedNode === 'internet' && (
              <p className="text-slate-300">
                {lang === 'en'
                  ? 'Global Internet & Cloud Servers: Google DNS (8.8.8.8, 1.1.1.1), Cloudflare edge nodes, HTTPS application servers, and remote NTP servers.'
                  : 'গ্লোবাল ইন্টারনেট: ক্লাউড সার্ভার, ওয়েব হোস্ট, ডিএনএস সার্ভিস এবং আন্তর্জাতিক নেটওয়ার্ক ব্যাকবোন।'}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Main Grid: Live Packet Stream on Left, Selected Packet Deep Inspection on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live Packet Stream Table (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? 'Live Packet Stream Feed' : 'লাইভ প্যাকেট ট্রাফিক স্ট্রিম'}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {livePackets.length} captured
              </span>
            </div>

            <div className="overflow-x-auto max-h-[460px]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase sticky top-0 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Time</th>
                    <th className="p-3">Protocol</th>
                    <th className="p-3">Source → Destination</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {livePackets.slice(0, 20).map((pkt) => {
                    const isSelected = selectedPacket?.id === pkt.id;
                    return (
                      <tr
                        key={pkt.id}
                        onClick={() => setSelectedPacket(pkt)}
                        className={`cursor-pointer transition ${
                          isSelected ? 'bg-cyan-950/50' : 'hover:bg-slate-850/60'
                        }`}
                      >
                        <td className="p-3 text-slate-400 whitespace-nowrap">{pkt.timestamp}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pkt.protocol === 'HTTPS' || pkt.protocol === 'HTTP' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' :
                            pkt.protocol === 'DNS' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                            pkt.protocol === 'SSH' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                            'bg-slate-800 text-slate-300'
                          }`}>
                            {pkt.protocol}
                          </span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="text-cyan-300">{pkt.srcIp}:{pkt.srcPort}</span>
                          <span className="text-slate-500 mx-1.5">→</span>
                          <span className="text-emerald-300">{pkt.dstIp}:{pkt.dstPort}</span>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pkt.status === 'ALLOWED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            pkt.status === 'DROPPED' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                            'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {pkt.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => setSelectedPacket(pkt)}
                            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Deep Packet Inspection Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 sticky top-20">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? 'Packet Dissection Inspector' : 'প্যাকেট ডিকনস্ট্রাকশন ইন্স্পেক্টর'}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-400">
                {selectedPacket ? `ID: ${selectedPacket.id}` : 'Select a packet'}
              </span>
            </div>

            {selectedPacket ? (
              <div className="space-y-3 font-mono text-xs">
                {/* Protocol & Status Summary */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Protocol & Size</span>
                    <span className="text-white font-bold">{selectedPacket.protocol} ({selectedPacket.length} Bytes)</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                    selectedPacket.status === 'ALLOWED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    {selectedPacket.status}
                  </span>
                </div>

                {/* OSI Layer Breakdown Box */}
                <div className="space-y-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    OSI Envelopes at Each Layer:
                  </span>

                  {/* L4 */}
                  <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-900/50 text-[11px] space-y-1">
                    <span className="text-cyan-400 font-bold block">Layer 4 (Transport): {selectedPacket.protocol}</span>
                    <div className="text-slate-300 flex justify-between">
                      <span>Src Port: {selectedPacket.srcPort}</span>
                      <span>Dst Port: {selectedPacket.dstPort}</span>
                    </div>
                  </div>

                  {/* L3 */}
                  <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-900/50 text-[11px] space-y-1">
                    <span className="text-emerald-400 font-bold block">Layer 3 (Network): IPv4</span>
                    <div className="text-slate-300 flex justify-between">
                      <span>Src IP: {selectedPacket.srcIp}</span>
                      <span>Dst IP: {selectedPacket.dstIp}</span>
                    </div>
                    <div className="text-slate-400 text-[10px]">TTL: {selectedPacket.ttl || 64} Hops</div>
                  </div>

                  {/* L2 */}
                  <div className="p-2.5 rounded bg-amber-950/40 border border-amber-900/50 text-[11px] space-y-1">
                    <span className="text-amber-400 font-bold block">Layer 2 (Data Link): Ethernet II</span>
                    <div className="text-slate-400 text-[10px] truncate">
                      Src MAC: 3C:22:FB:4B:92:01 → Dst MAC: A0:36:9F:12:88:5E
                    </div>
                  </div>
                </div>

                {/* Payload Preview */}
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">Data Payload Preview</span>
                  <div className="text-emerald-300 text-[11px] p-2 rounded bg-slate-900 border border-slate-800 break-all">
                    {selectedPacket.payloadPreview}
                  </div>
                </div>

                {/* Threat Banner if threat */}
                {selectedPacket.isThreat && (
                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-4 h-4 text-rose-400" />
                      <span>Security Threat Alert</span>
                    </div>
                    <p className="text-[11px] text-rose-200">
                      {selectedPacket.threatType} - Blocked by firewall IDS rules.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                {lang === 'en' ? 'Click on any packet from the live table to inspect headers and payload.' : 'যেকোনো প্যাকেটে ক্লিক করে বিস্তারিত হেডার ও পেলোড দেখুন।'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
