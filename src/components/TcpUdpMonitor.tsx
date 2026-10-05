import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  ArrowRight, 
  CheckCircle, 
  RotateCcw, 
  Play, 
  Download, 
  Trash2, 
  Search, 
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { Language, TCPSocketConnection, TCPState, Packet } from '../types/network';

interface TcpUdpMonitorProps {
  lang: Language;
  livePackets: Packet[];
  onClearLogs: () => void;
}

export const TcpUdpMonitor: React.FC<TcpUdpMonitorProps> = ({ lang, livePackets, onClearLogs }) => {
  const [activeTab, setActiveTab] = useState<'handshake' | 'connections' | 'logs'>('handshake');
  
  // 3-Way Handshake Interactive Stepper State
  const [handshakeStep, setHandshakeStep] = useState<number>(0); // 0: Idle, 1: SYN, 2: SYN-ACK, 3: ACK (ESTABLISHED)
  const [teardownStep, setTeardownStep] = useState<number>(0);

  // Search & filter for logs
  const [logSearch, setLogSearch] = useState('');
  const [logFilterProto, setLogFilterProto] = useState<string>('ALL');

  // Simulated Active Socket Table
  const [activeSockets, setActiveSockets] = useState<TCPSocketConnection[]>([
    {
      id: 'sock-1',
      clientIp: '192.168.1.50',
      clientPort: 54120,
      serverIp: '142.250.190.46',
      serverPort: 443,
      protocol: 'TCP',
      state: 'ESTABLISHED',
      sentBytes: 12450,
      receivedBytes: 98400,
      rttMs: 14,
      lastActive: 'Just now'
    },
    {
      id: 'sock-2',
      clientIp: '192.168.1.50',
      clientPort: 54122,
      serverIp: '104.21.34.19',
      serverPort: 80,
      protocol: 'TCP',
      state: 'TIME_WAIT',
      sentBytes: 1200,
      receivedBytes: 4500,
      rttMs: 22,
      lastActive: '5s ago'
    },
    {
      id: 'sock-3',
      clientIp: '192.168.1.50',
      clientPort: 53100,
      serverIp: '1.1.1.1',
      serverPort: 53,
      protocol: 'UDP',
      state: 'ESTABLISHED',
      sentBytes: 64,
      receivedBytes: 128,
      rttMs: 8,
      lastActive: '2s ago'
    },
    {
      id: 'sock-4',
      clientIp: '0.0.0.0',
      clientPort: 22,
      serverIp: '0.0.0.0',
      serverPort: 22,
      protocol: 'TCP',
      state: 'LISTEN',
      sentBytes: 0,
      receivedBytes: 0,
      rttMs: 0,
      lastActive: 'Background'
    },
    {
      id: 'sock-5',
      clientIp: '192.168.1.50',
      clientPort: 54199,
      serverIp: '185.199.108.153',
      serverPort: 443,
      protocol: 'TCP',
      state: 'ESTABLISHED',
      sentBytes: 45200,
      receivedBytes: 341000,
      rttMs: 19,
      lastActive: '1s ago'
    }
  ]);

  const filteredLogs = livePackets.filter(pkt => {
    const matchSearch = 
      pkt.srcIp.includes(logSearch) ||
      pkt.dstIp.includes(logSearch) ||
      pkt.srcPort.toString().includes(logSearch) ||
      pkt.dstPort.toString().includes(logSearch) ||
      pkt.protocol.toLowerCase().includes(logSearch.toLowerCase());

    const matchProto = logFilterProto === 'ALL' || pkt.protocol === logFilterProto;
    return matchSearch && matchProto;
  });

  const exportLogsAsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(livePackets, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `network_traffic_logs_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'TCP / UDP Connectivity, Handshakes & Live Logs' : 'টিসিপি/ইউডিপি হ্যান্ডশেক, সকেট কানেকশন ও লাইভ লগ'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Step through the 3-Way Handshake & 4-Way Teardown mathematics, monitor active socket states, and inspect real-time packet logs.'
                  : 'টিসিপি ৩-ওয়ে হ্যান্ডশেক এবং ৪-ওয়ে টিয়ারডাউনের সিকোয়েন্স নাম্বার হিসাব, কারেন্ট সকেট স্টেট এবং রিয়েল-টাইম ট্রাফিক লগ।'}
              </p>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('handshake')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'handshake'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Handshake Visualizer' : 'হ্যান্ডশেক সিমুলেটর'}
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'connections'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Active Sockets (netstat)' : 'সকেট কানেকশন টেবিল'}
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'logs'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Live Packet Logs' : 'লাইভ প্যাকেট লগ'}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'handshake' && (
        <div className="space-y-6">
          {/* 3-Way Handshake Step-by-Step Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span>TCP 3-Way Handshake (SYN → SYN-ACK → ACK)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en'
                    ? 'How client and server agree on initial sequence numbers (ISN) and allocate memory buffers before exchanging application data.'
                    : 'ডাটা পাঠানোর আগে ক্লায়েন্ট ও সার্ভার কীভাবে ৩টি ধাপে ইনিশিয়াল সিকোয়েন্স নাম্বার বিনিময় করে নিরাপদ সংযোগ গড়ে তোলে।'}
                </p>
              </div>

              {/* Handshake Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setHandshakeStep(prev => (prev < 3 ? prev + 1 : 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow transition"
                >
                  {handshakeStep === 0 ? (lang === 'en' ? 'Start Handshake' : 'শুরু করুন') :
                   handshakeStep === 3 ? (lang === 'en' ? 'Restart' : 'পুনরায় শুরু') :
                   (lang === 'en' ? `Next Step (${handshakeStep + 1}/3)` : `পরের ধাপ (${handshakeStep + 1}/৩)`)}
                </button>
                <button
                  onClick={() => setHandshakeStep(0)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Handshake Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Client Box */}
              <div className="md:col-span-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center font-mono font-bold text-xs">
                  CLIENT
                </div>
                <h4 className="text-xs font-bold text-white">Client Machine</h4>
                <div className="text-[11px] font-mono text-slate-400">192.168.1.50:54120</div>
                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-500 block">STATE:</span>
                  <span className={`font-bold ${
                    handshakeStep === 0 ? 'text-slate-400' :
                    handshakeStep === 1 ? 'text-amber-400' :
                    handshakeStep >= 2 ? 'text-emerald-400' : 'text-slate-400'
                  }`}>
                    {handshakeStep === 0 ? 'CLOSED' :
                     handshakeStep === 1 ? 'SYN_SENT' :
                     'ESTABLISHED'}
                  </span>
                </div>
              </div>

              {/* Transmission Pipeline (Middle 6 cols) */}
              <div className="md:col-span-6 space-y-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                {/* Step 1: SYN */}
                <div className={`p-2.5 rounded-lg border transition-all text-xs font-mono ${
                  handshakeStep === 1
                    ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200 ring-1 ring-cyan-500/40'
                    : handshakeStep > 1 ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-950 border-slate-900 opacity-40'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-cyan-400">1. SYN Packet (Client → Server)</span>
                    <span className="text-[10px] text-slate-500">Flags: [SYN]</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Seq = 1000 (Client ISN)</span>
                    <span>Ack = 0</span>
                  </div>
                </div>

                {/* Step 2: SYN-ACK */}
                <div className={`p-2.5 rounded-lg border transition-all text-xs font-mono ${
                  handshakeStep === 2
                    ? 'bg-purple-950/60 border-purple-500/60 text-purple-200 ring-1 ring-purple-500/40'
                    : handshakeStep > 2 ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-950 border-slate-900 opacity-40'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-purple-400">2. SYN-ACK (Server → Client)</span>
                    <span className="text-[10px] text-slate-500">Flags: [SYN, ACK]</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Seq = 5000 (Server ISN)</span>
                    <span className="text-emerald-400 font-bold">Ack = 1001 (1000 + 1)</span>
                  </div>
                </div>

                {/* Step 3: ACK */}
                <div className={`p-2.5 rounded-lg border transition-all text-xs font-mono ${
                  handshakeStep === 3
                    ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200 ring-1 ring-emerald-500/40'
                    : 'bg-slate-950 border-slate-900 opacity-40'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-400">3. ACK (Client → Server)</span>
                    <span className="text-[10px] text-slate-500">Flags: [ACK]</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Seq = 1001</span>
                    <span className="text-emerald-400 font-bold">Ack = 5001 (5000 + 1)</span>
                  </div>
                </div>
              </div>

              {/* Server Box */}
              <div className="md:col-span-3 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-mono font-bold text-xs">
                  SERVER
                </div>
                <h4 className="text-xs font-bold text-white">Target Web Server</h4>
                <div className="text-[11px] font-mono text-slate-400">142.250.190.46:443</div>
                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono">
                  <span className="text-slate-500 block">STATE:</span>
                  <span className={`font-bold ${
                    handshakeStep === 0 ? 'text-cyan-400' :
                    handshakeStep === 1 ? 'text-amber-400' :
                    'text-emerald-400'
                  }`}>
                    {handshakeStep === 0 ? 'LISTEN' :
                     handshakeStep === 1 ? 'SYN_RECEIVED' :
                     'ESTABLISHED'}
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation Footer */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <span className="font-bold text-cyan-400 block mb-1">
                {lang === 'en' ? 'The Sequence-Acknowledgment Arithmetic Rule:' : 'সিকোয়েন্স ও অ্যাকনলেজমেন্ট ম্যাথ রুল:'}
              </span>
              <p>
                {lang === 'en'
                  ? 'The ACK number is always calculated as (Received Sequence Number + 1 for SYN/FIN flags) or (Received Sequence Number + Payload Byte Length). This guarantees zero bytes are lost without notice.'
                  : 'টিসিপিতে ACK নাম্বার সবসময় (প্রাপ্ত সিকোয়েন্স নাম্বার + ১) হয়। এভাবে উভয় কম্পিউটার নিশ্চিত হয় যে অপর পক্ষ আগের প্রতিটি বিট সঠিকভাবে পেয়েছে।'}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'connections' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {lang === 'en' ? 'Active Network Sockets (Kernel Socket Table)' : 'কার্নেল সকেট কানেকশন টেবিল (netstat -tulnp)'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'en' ? 'Real-time open TCP/UDP sockets on the network' : 'নেটওয়ার্কে চলমান সক্রিয় সংযোগসমূহ'}
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400">
              {activeSockets.length} Total Sockets
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase">
                <tr>
                  <th className="p-3.5">Proto</th>
                  <th className="p-3.5">Local Address:Port</th>
                  <th className="p-3.5">Foreign Address:Port</th>
                  <th className="p-3.5">State</th>
                  <th className="p-3.5">Tx / Rx (Bytes)</th>
                  <th className="p-3.5">RTT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {activeSockets.map((sock) => (
                  <tr key={sock.id} className="hover:bg-slate-850/50 transition">
                    <td className="p-3.5 font-bold text-white">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        sock.protocol === 'TCP' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-purple-950 text-purple-300 border border-purple-800'
                      }`}>
                        {sock.protocol}
                      </span>
                    </td>
                    <td className="p-3.5 text-cyan-300">
                      {sock.clientIp}:{sock.clientPort}
                    </td>
                    <td className="p-3.5 text-emerald-300">
                      {sock.serverIp}:{sock.serverPort}
                    </td>
                    <td className="p-3.5">
                      <span className={`font-bold ${
                        sock.state === 'ESTABLISHED' ? 'text-emerald-400' :
                        sock.state === 'LISTEN' ? 'text-blue-400' :
                        sock.state === 'TIME_WAIT' ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {sock.state}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">
                      {sock.sentBytes.toLocaleString()} / {sock.receivedBytes.toLocaleString()}
                    </td>
                    <td className="p-3.5 text-slate-400">
                      {sock.rttMs > 0 ? `${sock.rttMs} ms` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-4">
          {/* Controls: Search, Filter, Clear, Export */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                placeholder={lang === 'en' ? 'Filter by IP, Port, Protocol...' : 'আইপি, পোর্ট, প্রোটোকল সার্চ...'}
                className="w-full bg-slate-950 border border-slate-700 pl-9 pr-3 py-1.5 text-xs text-white rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <select
                value={logFilterProto}
                onChange={(e) => setLogFilterProto(e.target.value)}
                className="bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">All Protocols</option>
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
                <option value="HTTP">HTTP</option>
                <option value="HTTPS">HTTPS</option>
                <option value="DNS">DNS</option>
                <option value="SSH">SSH</option>
                <option value="ICMP">ICMP</option>
              </select>

              <button
                onClick={exportLogsAsJson}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
                title="Export logs as JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'en' ? 'Export' : 'ডাউনলোড'}</span>
              </button>

              <button
                onClick={onClearLogs}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 border border-slate-700 transition"
                title="Clear all logs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'en' ? 'Clear' : 'মুছুন'}</span>
              </button>
            </div>
          </div>

          {/* Logs Feed Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase sticky top-0 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Time</th>
                    <th className="p-3">Protocol</th>
                    <th className="p-3">Source Socket</th>
                    <th className="p-3">Destination Socket</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Length</th>
                    <th className="p-3">Payload Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {filteredLogs.length > 0 ? (
                    filteredLogs.map((pkt) => (
                      <tr key={pkt.id} className="hover:bg-slate-850/60 transition">
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
                        <td className="p-3 text-cyan-300 whitespace-nowrap">{pkt.srcIp}:{pkt.srcPort}</td>
                        <td className="p-3 text-emerald-300 whitespace-nowrap">{pkt.dstIp}:{pkt.dstPort}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            pkt.status === 'ALLOWED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            pkt.status === 'DROPPED' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                            'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {pkt.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-400">{pkt.length}B</td>
                        <td className="p-3 text-slate-400 max-w-xs truncate" title={pkt.payloadPreview}>
                          {pkt.payloadPreview}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-slate-500">
                        {lang === 'en' ? 'No packet logs match your search filter.' : 'কোনো প্যাকেট লগ পাওয়া যায়নি।'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
