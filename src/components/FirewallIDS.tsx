import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  ShieldX, 
  AlertTriangle, 
  Sliders, 
  Plus, 
  Trash2, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Radio, 
  Terminal,
  Activity,
  Zap,
  Info
} from 'lucide-react';
import { Language, FirewallRule, IDSSignature, PacketStatus } from '../types/network';

interface FirewallIDSProps {
  lang: Language;
  onSimulateEvent?: (type: string) => void;
}

export const FirewallIDS: React.FC<FirewallIDSProps> = ({ lang, onSimulateEvent }) => {
  const [securityMode, setSecurityMode] = useState<'IPS' | 'IDS'>('IPS'); // IPS drops, IDS alerts only
  const [activeTab, setActiveTab] = useState<'rules' | 'theory' | 'signatures'>('rules');

  // Firewall Rules
  const [firewallRules, setFirewallRules] = useState<FirewallRule[]>([
    {
      id: 'rule-1',
      name: 'Block Inbound Telnet (Insecure)',
      action: 'DROP',
      protocol: 'TCP',
      srcIp: 'ANY',
      dstPort: '23',
      enabled: true,
      hits: 42,
      descEn: 'Drops cleartext Telnet management attempts.',
      descBn: 'ঝুঁকিপূর্ণ টেলনেট ট্রাফিক স্বয়ংক্রিয়ভাবে ড্রপ করে।'
    },
    {
      id: 'rule-2',
      name: 'Allow Web Traffic (HTTP/HTTPS)',
      action: 'ALLOW',
      protocol: 'TCP',
      srcIp: 'ANY',
      dstPort: '80, 443',
      enabled: true,
      hits: 1589,
      descEn: 'Permits inbound public web traffic.',
      descBn: 'ওয়েব ট্রাফিকের জন্য পোর্ট ৮০ ও ৪৪৩ উন্মুক্ত রাখে।'
    },
    {
      id: 'rule-3',
      name: 'Block Outbound SMB (Port 445)',
      action: 'DROP',
      protocol: 'TCP',
      srcIp: 'ANY',
      dstPort: '445',
      enabled: true,
      hits: 18,
      descEn: 'Prevents WannaCry / EternalBlue lateral movement.',
      descBn: 'র‌্যানসমওয়্যার ছড়ানো প্রতিরোধে পোর্ট ৪৪৫ বন্ধ রাখে।'
    },
    {
      id: 'rule-4',
      name: 'Allow DNS Lookups',
      action: 'ALLOW',
      protocol: 'UDP',
      srcIp: 'ANY',
      dstPort: '53',
      enabled: true,
      hits: 890,
      descEn: 'Allows outbound DNS resolution.',
      descBn: 'ডোমেইন নেম রেজোলিউশনের জন্য ডিএনএস অনুমতি দেয়।'
    },
    {
      id: 'rule-5',
      name: 'Drop ICMP Ping from WAN',
      action: 'DROP',
      protocol: 'ICMP',
      srcIp: 'WAN',
      dstPort: 'ANY',
      enabled: false,
      hits: 74,
      descEn: 'Hides host from automated ping sweeps.',
      descBn: 'পাবলিক পিং স্ক্যান থেকে হোস্ট লুকিয়ে রাখে।'
    }
  ]);

  // IDS Signatures
  const [signatures, setSignatures] = useState<IDSSignature[]>([
    {
      id: 'sig-101',
      name: 'ET SCAN Potential Nmap SYN Scan',
      severity: 'HIGH',
      type: 'Reconnaissance',
      patternDescEn: 'Detects rapid sequence of half-open SYN packets across multiple ports within <500ms.',
      patternDescBn: 'অল্প সময়ে একাধিক পোর্টে দ্রুত হাফ-ওপেন SYN প্যাকেট শনাক্ত করে।',
      actionTaken: 'DROP_AND_ALERT',
      triggersCount: 14
    },
    {
      id: 'sig-102',
      name: 'GPL EXPLOIT SQL Injection in URI (UNION SELECT)',
      severity: 'CRITICAL',
      type: 'Web Application Exploit',
      patternDescEn: 'Payload contains SQL regex `(?:union.*?select.*?from|or 1=1)`.',
      patternDescBn: 'ইউআরএল বা রিকোয়েস্টে ক্ষতিকর এসকিউএল কোয়েরি প্যাটার্ন শনাক্ত।',
      actionTaken: 'DROP_AND_ALERT',
      triggersCount: 5
    },
    {
      id: 'sig-103',
      name: 'ET DOS TCP SYN Flood Attempt',
      severity: 'CRITICAL',
      type: 'Denial of Service',
      patternDescEn: 'Exceeds threshold of 1000 SYNs/sec with spoofed IPs without completing handshake.',
      patternDescBn: '৩-ওয়ে হ্যান্ডশেক সম্পন্ন না করে প্রতি সেকেন্ডে বিপুল সংখ্যক ভুয়া SYN রিকোয়েস্ট।',
      actionTaken: 'DROP_AND_ALERT',
      triggersCount: 3
    },
    {
      id: 'sig-104',
      name: 'ET POLICY SSH Brute Force Inbound',
      severity: 'MEDIUM',
      type: 'Credential Stuffing',
      patternDescEn: 'More than 5 failed SSH authentication handshakes in 30 seconds from single source IP.',
      patternDescBn: 'একই আইপি থেকে ঘন ঘন ভুল পাসওয়ার্ড দিয়ে SSH লগইন চেষ্টা।',
      actionTaken: 'ALERT_ONLY',
      triggersCount: 22
    }
  ]);

  // Security Incident Alerts Feed
  const [incidents, setIncidents] = useState<Array<{
    id: string;
    timestamp: string;
    signature: string;
    srcIp: string;
    dstPort: number;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    action: string;
  }>>([
    {
      id: 'inc-1',
      timestamp: '10:52:14',
      signature: 'ET SCAN Potential Nmap SYN Scan',
      srcIp: '185.220.101.5',
      dstPort: 80,
      severity: 'HIGH',
      action: 'DROPPED & LOGGED'
    },
    {
      id: 'inc-2',
      timestamp: '10:54:02',
      signature: 'GPL EXPLOIT SQL Injection in URI',
      srcIp: '91.240.118.17',
      dstPort: 443,
      severity: 'CRITICAL',
      action: 'BLOCKED (WAF RULE)'
    },
    {
      id: 'inc-3',
      timestamp: '10:56:48',
      signature: 'ET POLICY SSH Brute Force Inbound',
      srcIp: '45.154.255.88',
      dstPort: 22,
      severity: 'MEDIUM',
      action: 'RATE LIMITED'
    }
  ]);

  // New Rule Modal Form State
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleAction, setNewRuleAction] = useState<'ALLOW' | 'DROP' | 'REJECT'>('DROP');
  const [newRulePort, setNewRulePort] = useState('');
  const [newRuleProto, setNewRuleProto] = useState<'TCP' | 'UDP' | 'ICMP' | 'ALL'>('TCP');

  const toggleRule = (id: string) => {
    setFirewallRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim() || !newRulePort.trim()) return;

    const newRule: FirewallRule = {
      id: `rule-${Date.now()}`,
      name: newRuleName.trim(),
      action: newRuleAction,
      protocol: newRuleProto as any,
      srcIp: 'ANY',
      dstPort: newRulePort.trim(),
      enabled: true,
      hits: 0,
      descEn: `Custom user-defined rule for port ${newRulePort}.`,
      descBn: `ব্যবহারকারীর নিজস্ব তৈরি রুল (পোর্ট: ${newRulePort})।`
    };

    setFirewallRules(prev => [newRule, ...prev]);
    setNewRuleName('');
    setNewRulePort('');
  };

  const triggerSimulatedAttack = (type: 'SYN_FLOOD' | 'PORT_SCAN' | 'SQLI' | 'TELNET') => {
    const now = new Date().toLocaleTimeString();
    let newInc: any = null;

    if (type === 'SYN_FLOOD') {
      newInc = {
        id: `inc-${Date.now()}`,
        timestamp: now,
        signature: 'ET DOS TCP SYN Flood Attempt',
        srcIp: `198.51.100.${Math.floor(Math.random() * 250)}`,
        dstPort: 443,
        severity: 'CRITICAL',
        action: securityMode === 'IPS' ? 'DROPPED (SYN-COOKIE ACTIVATED)' : 'ALERTED (IDS ONLY)'
      };
      setSignatures(prev => prev.map(s => s.id === 'sig-103' ? { ...s, triggersCount: s.triggersCount + 1 } : s));
    } else if (type === 'PORT_SCAN') {
      newInc = {
        id: `inc-${Date.now()}`,
        timestamp: now,
        signature: 'ET SCAN Potential Nmap SYN Scan',
        srcIp: `194.26.29.${Math.floor(Math.random() * 250)}`,
        dstPort: 22,
        severity: 'HIGH',
        action: securityMode === 'IPS' ? 'PORT SCAN BLOCKED' : 'ALERTED (IDS ONLY)'
      };
      setSignatures(prev => prev.map(s => s.id === 'sig-101' ? { ...s, triggersCount: s.triggersCount + 1 } : s));
    } else if (type === 'SQLI') {
      newInc = {
        id: `inc-${Date.now()}`,
        timestamp: now,
        signature: "GPL EXPLOIT SQLi (1' OR '1'='1)",
        srcIp: `103.208.220.${Math.floor(Math.random() * 250)}`,
        dstPort: 443,
        severity: 'CRITICAL',
        action: securityMode === 'IPS' ? 'HTTP 403 FORBIDDEN' : 'ALERTED (IDS ONLY)'
      };
      setSignatures(prev => prev.map(s => s.id === 'sig-102' ? { ...s, triggersCount: s.triggersCount + 1 } : s));
    } else if (type === 'TELNET') {
      newInc = {
        id: `inc-${Date.now()}`,
        timestamp: now,
        signature: 'FIREWALL_HIT: Block Inbound Telnet',
        srcIp: `185.191.171.${Math.floor(Math.random() * 250)}`,
        dstPort: 23,
        severity: 'HIGH',
        action: 'PACKET DROPPED'
      };
      setFirewallRules(prev => prev.map(r => r.id === 'rule-1' ? { ...r, hits: r.hits + 1 } : r));
    }

    if (newInc) {
      setIncidents(prev => [newInc, ...prev.slice(0, 7)]);
      if (onSimulateEvent) onSimulateEvent(type);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Firewall & IDS / IPS Defense Engine' : 'ফায়ারওয়াল ও ইন্ট্রুশন ডিটেকশন/প্রিভেনশন (IDS/IPS)'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Stateful packet inspection, access control lists (ACLs), signature matching, and inline cyber threat prevention.'
                  : 'প্যাকেট ফিল্টারিং ফায়ারওয়াল, এক্সেস কন্ট্রোল লিস্ট এবং সাইবার অ্যাটাক (যেমন SYN Flood, SQLi, পোর্ট স্ক্যান) প্রতিরোধের রিয়েল-টাইম ইঞ্জিন।'}
              </p>
            </div>
          </div>

          {/* Mode Switch: IDS (Passive) vs IPS (Active Drop) */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
            <span className="text-xs text-slate-400 font-medium pl-1">
              {lang === 'en' ? 'Engine Mode:' : 'ইঞ্জিন মোড:'}
            </span>
            <button
              onClick={() => setSecurityMode('IPS')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition ${
                securityMode === 'IPS'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>IPS (Inline Drop)</span>
            </button>
            <button
              onClick={() => setSecurityMode('IDS')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition ${
                securityMode === 'IDS'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>IDS (Passive Alert)</span>
            </button>
          </div>
        </div>

        {/* Subtabs */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'rules'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Firewall ACL Rules' : 'ফায়ারওয়াল রুলস (ACL)'}
          </button>
          <button
            onClick={() => setActiveTab('signatures')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'signatures'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'IDS/IPS Signatures & Incidents' : 'আইডিএস সিগনেচার ও অ্যালার্ট'}
          </button>
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'theory'
                ? 'bg-slate-800 text-cyan-300 border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Concepts: Firewall vs IDS vs IPS' : 'থিওরি: ফায়ারওয়াল বনাম IDS বনাম IPS'}
          </button>
        </div>
      </div>

      {/* Simulated Attack Launch Buttons */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? 'Security Event Simulator & Threat Injector' : 'নিরাপত্তা ইভেন্ট ও অ্যাটাক সিমুলেটর'}
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Click to inject synthetic packets</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3">
          <button
            onClick={() => triggerSimulatedAttack('SYN_FLOOD')}
            className="p-2.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/50 border border-rose-800/60 text-left transition group"
          >
            <span className="text-[11px] font-bold text-rose-300 block group-hover:text-white">
              Launch SYN Flood
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">10,000 half-open SYNs</span>
          </button>

          <button
            onClick={() => triggerSimulatedAttack('PORT_SCAN')}
            className="p-2.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 text-left transition group"
          >
            <span className="text-[11px] font-bold text-amber-300 block group-hover:text-white">
              Run Nmap Port Scan
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Probes ports 21-445</span>
          </button>

          <button
            onClick={() => triggerSimulatedAttack('SQLI')}
            className="p-2.5 rounded-lg bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/60 text-left transition group"
          >
            <span className="text-[11px] font-bold text-purple-300 block group-hover:text-white">
              Send SQLi Exploit
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">HTTP URI injection</span>
          </button>

          <button
            onClick={() => triggerSimulatedAttack('TELNET')}
            className="p-2.5 rounded-lg bg-blue-950/40 hover:bg-blue-900/50 border border-blue-800/60 text-left transition group"
          >
            <span className="text-[11px] font-bold text-blue-300 block group-hover:text-white">
              Probe Telnet (Port 23)
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">Tests ACL Drop rule</span>
          </button>
        </div>
      </div>

      {activeTab === 'rules' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Rules Table (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {lang === 'en' ? 'Active Access Control Rules' : 'ফায়ারওয়াল এক্সেস কন্ট্রোল রুলস'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {lang === 'en' ? 'Evaluated top-to-bottom (First-match policy)' : 'উপর থেকে নিচে ক্রমানুসারে কার্যকর হয়'}
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400">
                  {firewallRules.filter(r => r.enabled).length} Enabled
                </span>
              </div>

              <div className="divide-y divide-slate-800">
                {firewallRules.map((rule) => (
                  <div
                    key={rule.id}
                    className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${
                      rule.enabled ? 'bg-slate-900/90' : 'bg-slate-950/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Action Badge */}
                      <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold shrink-0 ${
                        rule.action === 'ALLOW'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}>
                        {rule.action}
                      </span>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">{rule.name}</h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                            {rule.protocol}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {lang === 'en' ? rule.descEn : rule.descBn}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-1">
                          <span>Port: <strong className="text-cyan-300">{rule.dstPort}</strong></span>
                          <span>•</span>
                          <span>Hits: <strong className="text-amber-300">{rule.hits.toLocaleString()}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => toggleRule(rule.id)}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                          rule.enabled
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {rule.enabled ? (lang === 'en' ? 'Active' : 'সক্রিয়') : (lang === 'en' ? 'Disabled' : 'বন্ধ')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Rule Form (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Plus className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? 'Add Firewall Rule' : 'নতুন রুল তৈরি করুন'}
                </h3>
              </div>

              <form onSubmit={handleAddRule} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Rule Name</label>
                  <input
                    type="text"
                    required
                    value={newRuleName}
                    onChange={(e) => setNewRuleName(e.target.value)}
                    placeholder="e.g. Block Port 8080"
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Action</label>
                    <select
                      value={newRuleAction}
                      onChange={(e) => setNewRuleAction(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 px-2 py-1.5 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                    >
                      <option value="DROP">DROP</option>
                      <option value="ALLOW">ALLOW</option>
                      <option value="REJECT">REJECT</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Protocol</label>
                    <select
                      value={newRuleProto}
                      onChange={(e) => setNewRuleProto(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-700 px-2 py-1.5 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                    >
                      <option value="TCP">TCP</option>
                      <option value="UDP">UDP</option>
                      <option value="ICMP">ICMP</option>
                      <option value="ALL">ALL</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Target Port(s)</label>
                  <input
                    type="text"
                    required
                    value={newRulePort}
                    onChange={(e) => setNewRulePort(e.target.value)}
                    placeholder="e.g. 8080 or 22, 443"
                    className="w-full bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold shadow transition mt-2"
                >
                  {lang === 'en' ? 'Deploy Firewall Rule' : 'রুল প্রয়োগ করুন'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'signatures' && (
        <div className="space-y-5">
          {/* Recent Security Incidents Stream */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? 'Live Intrusion Detection Log (Suricata / Snort Style)' : 'লাইভ অনুপ্রবেশ ও হুমকি সনাক্তকরণ লগ'}
                </h3>
              </div>
              <span className="text-xs font-mono text-rose-400 animate-pulse">
                Monitoring Active
              </span>
            </div>

            <div className="divide-y divide-slate-800">
              {incidents.map((inc) => (
                <div key={inc.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-850/50 transition">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      inc.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      inc.severity === 'HIGH' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {inc.severity}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{inc.signature}</h4>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                        <span>Attacker: <strong className="text-rose-300">{inc.srcIp}</strong></span>
                        <span>•</span>
                        <span>Target Port: <strong className="text-cyan-300">:{inc.dstPort}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center font-mono text-xs">
                    <span className="text-slate-400">{inc.timestamp}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-emerald-400 text-[10px] font-bold">
                      {inc.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Signatures Database */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {signatures.map((sig) => (
              <div key={sig.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-white">{sig.name}</h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                    {sig.triggersCount} Triggers
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {lang === 'en' ? sig.patternDescEn : sig.patternDescBn}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <span>Class: {sig.type}</span>
                  <span className="text-cyan-400">{sig.actionTaken}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'theory' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stateless vs Stateful Firewall */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Firewall (Stateful vs Stateless)</h3>
            </div>
            <div className="text-xs text-slate-300 space-y-2">
              <p>
                <strong>Stateless:</strong> Inspects each packet independently based on IP, port, and protocol flags without knowing previous packet history.
              </p>
              <p>
                <strong>Stateful (SPI):</strong> Maintains a connection state table (NEW, ESTABLISHED, RELATED). Automatically allows return traffic for established sessions without needing open inbound ports.
              </p>
              <p className="text-cyan-300 font-mono text-[11px] pt-1">
                {lang === 'en' ? 'বাংলা: স্টেটফুল ফায়ারওয়াল সংযোগের অবস্থা মনে রাখে, ফলে রিটার্ন ট্রাফিক স্বয়ংক্রিয় অনুমতি পায়।' : 'স্টেটফুল ফায়ারওয়াল সংযোগের অবস্থা মনে রাখে, ফলে রিটার্ন ট্রাফিক স্বয়ংক্রিয় অনুমতি পায়।'}
              </p>
            </div>
          </div>

          {/* IDS */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Activity className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">IDS (Intrusion Detection System)</h3>
            </div>
            <div className="text-xs text-slate-300 space-y-2">
              <p>
                <strong>Passive Monitoring:</strong> Placed out-of-band using a SPAN port or network TAP. Copies traffic and analyzes it against known attack signatures or anomaly baselines.
              </p>
              <p>
                <strong>Action:</strong> Generates alerts, notifies SOC analysts, and logs events. Does NOT stop or delay network packets directly.
              </p>
              <p className="text-amber-300 font-mono text-[11px] pt-1">
                {lang === 'en' ? 'বাংলা: IDS কেবল ট্রাফিক দেখে অ্যালার্ট পাঠায়, কোনো প্যাকেট ব্লক করে না।' : 'IDS কেবল ট্রাফিক দেখে অ্যালার্ট পাঠায়, কোনো প্যাকেট ব্লক করে না।'}
              </p>
            </div>
          </div>

          {/* IPS */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white">IPS (Intrusion Prevention System)</h3>
            </div>
            <div className="text-xs text-slate-300 space-y-2">
              <p>
                <strong>Active Inline Defense:</strong> Sits directly in the physical traffic path (inline). Every single packet must pass through the IPS inspection engine before reaching destination.
              </p>
              <p>
                <strong>Action:</strong> Automatically drops malicious packets, resets TCP connections (TCP RST), and temporarily blacklists attacking IP addresses in real time.
              </p>
              <p className="text-rose-300 font-mono text-[11px] pt-1">
                {lang === 'en' ? 'বাংলা: IPS লাইনের মধ্যে বসে ক্ষতিকর প্যাকেট সাথে সাথে ড্রপ করে।' : 'IPS লাইনের মধ্যে বসে ক্ষতিকর প্যাকেট সাথে সাথে ড্রপ করে।'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
