import React, { useState } from 'react';
import { 
  Share2, 
  Server, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Activity, 
  BarChart3, 
  ShieldCheck,
  Cpu,
  RotateCw
} from 'lucide-react';
import { Language, PortForwardRule } from '../types/network';

interface PortForwardingProps {
  lang: Language;
}

export const PortForwarding: React.FC<PortForwardingProps> = ({ lang }) => {
  const [wanIp] = useState('203.0.113.195');

  // Rules list
  const [rules, setRules] = useState<PortForwardRule[]>([
    {
      id: 'pf-1',
      serviceName: 'Web Server (Nginx)',
      wanPort: 8080,
      lanIp: '192.168.1.100',
      lanPort: 80,
      protocol: 'TCP',
      enabled: true,
      totalHits: 4120,
      description: 'Public WAN port 8080 mapped to internal HTTP server on port 80.'
    },
    {
      id: 'pf-2',
      serviceName: 'Secure Shell (SSH Bastion)',
      wanPort: 2222,
      lanIp: '192.168.1.10',
      lanPort: 22,
      protocol: 'TCP',
      enabled: true,
      totalHits: 680,
      description: 'Obfuscated WAN port 2222 mapped to internal admin SSH host.'
    },
    {
      id: 'pf-3',
      serviceName: 'Minecraft Dedicated Server',
      wanPort: 25565,
      lanIp: '192.168.1.150',
      lanPort: 25565,
      protocol: 'TCP/UDP',
      enabled: true,
      totalHits: 1940,
      description: 'Allows external gaming friends to join internal LAN server.'
    },
    {
      id: 'pf-4',
      serviceName: 'IP Camera RTSP Stream',
      wanPort: 5540,
      lanIp: '192.168.1.45',
      lanPort: 554,
      protocol: 'UDP',
      enabled: false,
      totalHits: 125,
      description: 'CCTV streaming channel forwarded to security DVR.'
    }
  ]);

  // Test Connection Simulator States
  const [testWanPort, setTestWanPort] = useState<number>(8080);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: 'SUCCESS' | 'FAILED';
    targetRule?: PortForwardRule;
    messageEn: string;
    messageBn: string;
    latencyMs: number;
  } | null>(null);

  // New Rule Form State
  const [newServiceName, setNewServiceName] = useState('');
  const [newWanPort, setNewWanPort] = useState('');
  const [newLanIp, setNewLanIp] = useState('192.168.1.');
  const [newLanPort, setNewLanPort] = useState('');
  const [newProtocol, setNewProtocol] = useState<'TCP' | 'UDP' | 'TCP/UDP'>('TCP');

  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName || !newWanPort || !newLanIp || !newLanPort) return;

    const newRule: PortForwardRule = {
      id: `pf-${Date.now()}`,
      serviceName: newServiceName.trim(),
      wanPort: Number(newWanPort),
      lanIp: newLanIp.trim(),
      lanPort: Number(newLanPort),
      protocol: newProtocol,
      enabled: true,
      totalHits: 0,
      description: `WAN :${newWanPort} mapped to ${newLanIp}:${newLanPort}`
    };

    setRules(prev => [newRule, ...prev]);
    setNewServiceName('');
    setNewWanPort('');
    setNewLanPort('');
  };

  const runConnectionTest = () => {
    setIsTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTesting(false);
      const matched = rules.find(r => r.wanPort === Number(testWanPort));

      if (matched && matched.enabled) {
        setTestResult({
          status: 'SUCCESS',
          targetRule: matched,
          messageEn: `Port ${testWanPort} is OPEN! Traffic successfully translated to ${matched.lanIp}:${matched.lanPort} (${matched.serviceName}).`,
          messageBn: `পোর্ট ${testWanPort} উন্মুক্ত! ট্রাফিক সফলভাবে লোকাল সার্ভার ${matched.lanIp}:${matched.lanPort} এ ফরোয়ার্ড হয়েছে।`,
          latencyMs: Math.floor(Math.random() * 25) + 12
        });
        setRules(prev => prev.map(r => r.id === matched.id ? { ...r, totalHits: r.totalHits + 1 } : r));
      } else if (matched && !matched.enabled) {
        setTestResult({
          status: 'FAILED',
          messageEn: `Port ${testWanPort} rule exists but is currently DISABLED. Connection refused.`,
          messageBn: `পোর্ট ${testWanPort} এর রুল তৈরি আছে কিন্তু বর্তমানে বন্ধ (Disabled)। সংযোগ প্রত্যাখ্যাত হয়েছে।`,
          latencyMs: 8
        });
      } else {
        setTestResult({
          status: 'FAILED',
          messageEn: `Port ${testWanPort} is CLOSED on WAN IP ${wanIp}. No matching NAT forwarding rule.`,
          messageBn: `পাবলিক আইপি ${wanIp} এ পোর্ট ${testWanPort} বন্ধ। কোনো ফরোয়ার্ডিং রুল পাওয়া যায়নি।`,
          latencyMs: 150
        });
      }
    }, 700);
  };

  const totalHitsCount = rules.reduce((acc, r) => acc + r.totalHits, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950/30 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Port Forwarding (NAT / PAT) Analytics' : 'পোর্ট ফরোয়ার্ডিং (NAT / PAT) ও রুট অ্যানালিটিক্স'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Examine how WAN Public IP traffic translates across NAT boundaries to private LAN servers. Test live connectivity and monitor forwarded sessions.'
                  : 'পাবলিক আইপি থেকে লোকাল প্রাইভেট আইপিতে ট্রাফিক কীভাবে ন্যাট (NAT) টেবিল দ্বারা ফরোয়ার্ড হয় তা পরীক্ষা ও মনিটর করুন।'}
              </p>
            </div>
          </div>

          {/* Quick WAN info */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>WAN IP: <strong className="text-white">{wanIp}</strong></span>
          </div>
        </div>
      </div>

      {/* Visual NAT Pipeline Architecture Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          {lang === 'en' ? 'NAT Flow Topology & Port Address Translation' : 'ন্যাট (NAT) ট্রাফিক ফ্লো পাইপলাইন'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* External Client */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <Globe className="w-6 h-6 text-blue-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">External Internet Client</h4>
            <span className="text-[11px] font-mono text-slate-400 block">IP: 142.250.190.5</span>
            <span className="text-[10px] text-cyan-400 font-mono block">Connects to {wanIp}:{testWanPort}</span>
          </div>

          {/* Router Gateway (NAT) */}
          <div className="relative p-4 rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-teal-500/40 text-center space-y-1 shadow-lg shadow-teal-500/10">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-teal-500 text-slate-950">
              NAT ROUTER / GATEWAY
            </div>
            <Server className="w-6 h-6 text-teal-400 mx-auto mt-1" />
            <h4 className="text-xs font-bold text-white">Edge Gateway (NAT Table)</h4>
            <span className="text-[11px] font-mono text-slate-400 block">WAN: {wanIp}</span>
            <span className="text-[10px] text-amber-300 font-mono block">LAN: 192.168.1.1</span>
          </div>

          {/* Target Internal Server */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
            <Cpu className="w-6 h-6 text-emerald-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">Target LAN Device</h4>
            <span className="text-[11px] font-mono text-slate-400 block">IP: 192.168.1.100 (Internal)</span>
            <span className="text-[10px] text-emerald-400 font-mono block">Local Port: :80</span>
          </div>
        </div>
      </div>

      {/* Interactive External Connection Tester */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Live External Port Probe & Translation Checker' : 'বাহ্যিক পোর্ট টেস্ট ও কানেকশন প্রোব'}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">TCP Handshake Probe</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300">
            <span>{wanIp}:</span>
            <input
              type="number"
              value={testWanPort}
              onChange={(e) => setTestWanPort(Number(e.target.value))}
              placeholder="Port"
              className="w-20 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-white font-bold text-xs focus:outline-none focus:border-teal-400"
            />
          </div>

          <button
            onClick={runConnectionTest}
            disabled={isTesting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition disabled:opacity-50"
          >
            {isTesting ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Activity className="w-3.5 h-3.5" />}
            <span>{lang === 'en' ? 'Test Port Forwarding' : 'কানেকশন টেস্ট করুন'}</span>
          </button>
        </div>

        {/* Test Result Feedback */}
        {testResult && (
          <div className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
            testResult.status === 'SUCCESS'
              ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
              : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
          }`}>
            {testResult.status === 'SUCCESS' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white">
                {testResult.status === 'SUCCESS' ? 'Connection Established (200 OK)' : 'Connection Failed (DROP)'}
              </h4>
              <p className="text-xs">
                {lang === 'en' ? testResult.messageEn : testResult.messageBn}
              </p>
              <span className="text-[10px] font-mono text-slate-400 block">
                Round-Trip Time: {testResult.latencyMs}ms
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Rules Table (8 cols) & Add Rule / Analytics (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Rules Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? 'Configured Port Forwarding Rules' : 'কনফিগার করা পোর্ট ফরোয়ার্ডিং রুলস'}
                </h3>
                <span className="text-xs text-slate-400">
                  {lang === 'en' ? 'Static NAT & Port Address Translation (PAT)' : 'স্ট্যাটিক ন্যাট ও প্যাট ম্যাপিং'}
                </span>
              </div>
              <span className="text-xs font-mono text-teal-400">
                {rules.length} Rules Active
              </span>
            </div>

            <div className="divide-y divide-slate-800">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    rule.enabled ? 'bg-slate-900' : 'bg-slate-950/50 opacity-60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{rule.serviceName}</h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                        {rule.protocol}
                      </span>
                    </div>

                    {/* Routing Path */}
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-300 pt-1">
                      <span className="text-cyan-400 font-bold">WAN :{rule.wanPort}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-emerald-400 font-bold">{rule.lanIp}:{rule.lanPort}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 mt-1">
                      {rule.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right text-xs font-mono">
                      <span className="text-slate-500 text-[10px] block">TOTAL HITS</span>
                      <span className="text-amber-400 font-bold">{rule.totalHits.toLocaleString()}</span>
                    </div>

                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                        rule.enabled
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {rule.enabled ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Rule Form & Analytics */}
        <div className="lg:col-span-4 space-y-4">
          {/* Analytics Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <BarChart3 className="w-4 h-4 text-teal-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {lang === 'en' ? 'Forwarding Metrics' : 'ফরোয়ার্ডিং পরিসংখ্যান'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">TOTAL FORWARDED</span>
                <span className="text-sm font-bold text-white">{totalHitsCount.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">ACTIVE PORTS</span>
                <span className="text-sm font-bold text-teal-400">
                  {rules.filter(r => r.enabled).length}
                </span>
              </div>
            </div>
          </div>

          {/* Add Rule Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Plus className="w-4 h-4 text-teal-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {lang === 'en' ? 'Add Port Forwarding Rule' : 'নতুন রুল যোগ করুন'}
              </h3>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="e.g. Plex Media Server"
                  className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">WAN Port</label>
                  <input
                    type="number"
                    required
                    value={newWanPort}
                    onChange={(e) => setNewWanPort(e.target.value)}
                    placeholder="32400"
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-white font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Protocol</label>
                  <select
                    value={newProtocol}
                    onChange={(e) => setNewProtocol(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 px-2 py-1.5 rounded-lg text-white font-mono focus:outline-none focus:border-teal-500"
                  >
                    <option value="TCP">TCP</option>
                    <option value="UDP">UDP</option>
                    <option value="TCP/UDP">TCP/UDP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">LAN IP</label>
                  <input
                    type="text"
                    required
                    value={newLanIp}
                    onChange={(e) => setNewLanIp(e.target.value)}
                    placeholder="192.168.1.100"
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-white font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">LAN Port</label>
                  <input
                    type="number"
                    required
                    value={newLanPort}
                    onChange={(e) => setNewLanPort(e.target.value)}
                    placeholder="32400"
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-white font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold shadow transition mt-1"
              >
                {lang === 'en' ? 'Save Forwarding Rule' : 'রুল সেভ করুন'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
