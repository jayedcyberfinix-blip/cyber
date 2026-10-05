import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Play, 
  Info,
  Laptop,
  Wifi,
  Eye,
  Terminal,
  Zap
} from 'lucide-react';
import { Language } from '../types/network';

interface MacSpoofingProps {
  lang: Language;
}

export const MacSpoofing: React.FC<MacSpoofingProps> = ({ lang }) => {
  const [activeSubTab, setActiveSubTab] = useState<'architecture' | 'simulation' | 'defense'>('simulation');

  // MAC Analyzer state
  const [inputMac, setInputMac] = useState('00:1A:2B:3C:4D:5E');

  // MAC Spoofing Live Simulator State
  const [spoofStep, setSpoofStep] = useState<number>(0); // 0: Normal/Blocked, 1: Recon, 2: Spoofed, 3: Bypassed & Online
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [spoofedMacValue, setSpoofedMacValue] = useState<string>('00:14:22:98:A1:0C'); // Authorized VIP device

  // Known OUI database sample
  const knownVendors: Record<string, string> = {
    '00:1A:2B': 'Cisco Systems, Inc.',
    '00:14:22': 'Dell Inc.',
    '3C:22:FB': 'Apple, Inc.',
    'A0:36:9F': 'Intel Corporate',
    'B8:27:EB': 'Raspberry Pi Foundation',
    'FC:FB:FB': 'Cisco-Linksys',
    '00:50:56': 'VMware, Inc.',
    'F0:18:98': 'Apple, Inc.',
    'D8:3A:DD': 'Samsung Electronics'
  };

  // Decode MAC details
  const macAnalysis = useMemo(() => {
    const clean = inputMac.trim().replace(/[:-]/g, '').toUpperCase();
    if (clean.length !== 12 || !/^[0-9A-F]{12}$/.test(clean)) {
      return null;
    }

    const formatted = `${clean.slice(0,2)}:${clean.slice(2,4)}:${clean.slice(4,6)}:${clean.slice(6,8)}:${clean.slice(8,10)}:${clean.slice(10,12)}`;
    const oui = `${clean.slice(0,2)}:${clean.slice(2,4)}:${clean.slice(4,6)}`;
    const nic = `${clean.slice(6,8)}:${clean.slice(8,10)}:${clean.slice(10,12)}`;
    const vendor = knownVendors[oui] || 'Generic / Locally Assigned / Private Vendor';

    // First byte binary
    const firstByteInt = parseInt(clean.slice(0, 2), 16);
    const isMulticast = (firstByteInt & 0x01) === 1; // Least significant bit of 1st byte
    const isLocalAdmin = (firstByteInt & 0x02) === 2; // Second least significant bit

    return {
      formatted,
      oui,
      nic,
      vendor,
      isMulticast,
      isLocalAdmin,
      firstByteBinary: firstByteInt.toString(2).padStart(8, '0'),
      isBroadcast: clean === 'FFFFFFFFFFFF'
    };
  }, [inputMac]);

  const handleNextSpoofStep = () => {
    if (spoofStep < 3) {
      setSpoofStep(prev => prev + 1);
    } else {
      setSpoofStep(0);
    }
  };

  const resetSpoofSimulation = () => {
    setSpoofStep(0);
    setIsSimulating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'MAC Address Architecture & MAC Spoofing Simulator' : 'ম্যাক অ্যাড্রেস (MAC) কাঠামো ও ছদ্মবেশ ধারণ (Spoofing) সিমুলেটর'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Examine 48-bit hardware MAC anatomy (OUI vs NIC), understand how devices spoof addresses to disguise identity, and learn how enterprise networks defend.'
                  : '৪৮-বিট ফিজিক্যাল ম্যাক অ্যাড্রেসের ওইউআই (OUI) ও নিক (NIC) কাঠামো, কীভাবে সফটওয়্যারের মাধ্যমে ম্যাক স্পুফিং (ছদ্মবেশ) করা হয় এবং তা প্রতিরোধের উপায়।'}
              </p>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setActiveSubTab('simulation')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeSubTab === 'simulation'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Spoofing Simulator' : 'স্পুফিং সিমুলেটর'}
            </button>
            <button
              onClick={() => setActiveSubTab('architecture')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeSubTab === 'architecture'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'MAC Anatomy & OUI' : 'ম্যাক কাঠামো ও OUI'}
            </button>
            <button
              onClick={() => setActiveSubTab('defense')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeSubTab === 'defense'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? 'Defense & Mitigation' : 'প্রতিরোধ ব্যবস্থা'}
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'simulation' && (
        <div className="space-y-6">
          {/* Interactive Step-by-Step MAC Spoofing Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    {lang === 'en' ? 'Interactive Wi-Fi MAC Filter Bypass Simulation' : 'ওয়াই-ফাই ম্যাক ফিল্টারিং বাইপাস লাইভ সিমুলেশন'}
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en'
                    ? 'Watch how a blocked client disguises its network card address as an authorized VIP machine to bypass router access control lists.'
                    : 'দেখুন কীভাবে একটি ব্লক থাকা কম্পিউটার সফটওয়্যারে অথোরাইজড ল্যাপটপের ম্যাক অ্যাড্রেস ধারন (ছদ্মবেশ) করে রাউটারকে ধোঁকা দেয়।'}
                </p>
              </div>

              {/* Stepper Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextSpoofStep}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    {spoofStep === 0 ? (lang === 'en' ? 'Start Spoofing Attack' : 'স্পুফিং শুরু করুন') :
                     spoofStep === 1 ? (lang === 'en' ? 'Step 2: Change MAC Address' : 'ধাপ ২: ম্যাক পরিবর্তন') :
                     spoofStep === 2 ? (lang === 'en' ? 'Step 3: Transmit Spoofed Frame' : 'ধাপ ৩: ফ্রেম পাঠান') :
                     (lang === 'en' ? 'Restart Simulation' : 'পুনরায় শুরু')}
                  </span>
                </button>
                <button
                  onClick={resetSpoofSimulation}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Topology Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Attacker / Guest PC */}
              <div className={`md:col-span-4 p-4 rounded-xl border text-center space-y-2 transition-all ${
                spoofStep >= 2
                  ? 'bg-amber-950/30 border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950 border-slate-800'
              }`}>
                <Laptop className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-xs font-bold text-white">Client Device (Attacker / Guest)</h4>
                
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-left space-y-1">
                  <div className="text-slate-500 text-[10px]">FACTORY HARDWARE (ROM):</div>
                  <div className="text-slate-400">AA:11:BB:22:CC:33</div>
                  
                  <div className="text-slate-500 text-[10px] pt-1">ACTIVE DRIVER (RAM):</div>
                  <div className={`font-bold ${spoofStep >= 2 ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`}>
                    {spoofStep >= 2 ? spoofedMacValue : 'AA:11:BB:22:CC:33'}
                  </div>
                </div>

                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  spoofStep === 3 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  spoofStep >= 1 ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                  'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {spoofStep === 3 ? 'STATUS: ACCESS GRANTED (ONLINE)' :
                   spoofStep >= 1 ? 'STATUS: DISGUISE ACTIVE' :
                   'STATUS: ACCESS BLOCKED (403)'}
                </span>
              </div>

              {/* Wi-Fi Radio Wave Transmission */}
              <div className="md:col-span-4 text-center space-y-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <Wifi className={`w-6 h-6 mx-auto ${spoofStep >= 2 ? 'text-amber-400 animate-bounce' : 'text-slate-600'}`} />
                <span className="text-[10px] font-mono text-slate-400 uppercase block">
                  802.11 Wi-Fi Frame
                </span>
                
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-left">
                  <div className="text-slate-500 text-[10px]">SOURCE MAC IN FRAME:</div>
                  <span className={`font-bold ${spoofStep >= 2 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {spoofStep >= 2 ? spoofedMacValue : 'AA:11:BB:22:CC:33'}
                  </span>
                </div>
                
                <span className="text-[10px] text-slate-400 block">
                  {spoofStep === 0 && 'Frame sent with real MAC -> Blocked by ACL'}
                  {spoofStep === 1 && 'Sniffing Wi-Fi traffic to find authorized MAC'}
                  {spoofStep === 2 && 'MAC rewritten in OS network adapter'}
                  {spoofStep === 3 && 'Router verifies MAC against Whitelist -> Matched!'}
                </span>
              </div>

              {/* Wi-Fi Access Point / Router with Whitelist */}
              <div className="md:col-span-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5">
                  {spoofStep === 3 ? (
                    <Unlock className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Lock className="w-5 h-5 text-rose-400" />
                  )}
                  <h4 className="text-xs font-bold text-white">Target Wi-Fi Router</h4>
                </div>

                {/* Router Whitelist Table */}
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-left space-y-1">
                  <span className="text-slate-400 uppercase font-semibold block">Router MAC Whitelist:</span>
                  <div className="flex items-center justify-between text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-emerald-900/40">
                    <span>{spoofedMacValue}</span>
                    <span className="text-[9px] text-emerald-500">ALLOWED</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 px-2 py-0.5">
                    <span>3C:22:FB:4B:92:01</span>
                    <span className="text-[9px] text-emerald-500">ALLOWED</span>
                  </div>
                </div>

                <div className="pt-1 text-[11px] font-mono">
                  {spoofStep === 3 ? (
                    <span className="text-emerald-400 font-bold">MATCH FOUND! PASS PACKET</span>
                  ) : (
                    <span className="text-rose-400 font-bold">MAC NOT ON WHITELIST (DROP)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Explanation Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 text-xs">
              <div className={`p-3 rounded-lg border ${spoofStep === 0 ? 'bg-rose-950/30 border-rose-500/50' : 'bg-slate-950 border-slate-800'}`}>
                <span className="font-bold text-slate-200 block mb-1">1. The Problem</span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'en'
                    ? 'Router uses MAC Filtering. Client original MAC is blocked or captive portal trial has expired.'
                    : 'রাউটারে ম্যাক ফিল্টারিং অন আছে। ক্লায়েন্টের আসল ম্যাক অ্যাড্রেস ব্লক করা বা ফ্রি ট্রায়াল শেষ।'}
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${spoofStep === 1 ? 'bg-amber-950/30 border-amber-500/50' : 'bg-slate-950 border-slate-800'}`}>
                <span className="font-bold text-slate-200 block mb-1">2. Reconnaissance</span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'en'
                    ? 'Attacker sniffs airwaves using Wireshark / airodump-ng to observe authorized connected client MACs.'
                    : 'ওয়্যারলেস ট্রাফিক স্ক্যান করে নেটওয়ার্কে ইতিমধ্যে অনুমতি পাওয়া বৈধ ডিভাইসের ম্যাক কপি করা হয়।'}
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${spoofStep === 2 ? 'bg-amber-950/30 border-amber-500/50' : 'bg-slate-950 border-slate-800'}`}>
                <span className="font-bold text-slate-200 block mb-1">3. The Disguise (Spoof)</span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'en'
                    ? 'OS changes the software MAC in RAM: `macchanger -m 00:14:22:98:A1:0C wlan0`. Physical ROM is unchanged.'
                    : 'অপারেটিং সিস্টেমে নেটওয়ার্ক কার্ডের সফটওয়্যার ম্যাক পরিবর্তন করে বৈধ ডিভাইসের ছদ্মবেশ নেওয়া হয়।'}
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${spoofStep === 3 ? 'bg-emerald-950/30 border-emerald-500/50' : 'bg-slate-950 border-slate-800'}`}>
                <span className="font-bold text-slate-200 block mb-1">4. Successful Bypass</span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'en'
                    ? 'Router inspects the incoming frame header, sees the whitelisted MAC, and immediately grants internet access!'
                    : 'রাউটার ফ্রেমের হেডার পরীক্ষা করে দেখে ম্যাক হোয়াইটলিস্টে আছে, ফলে বিনা বাধায় ইন্টারনেট কানেকশন দিয়ে দেয়!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'architecture' && (
        <div className="space-y-6">
          {/* MAC Address Dissection & Bit Anatomy */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'en' ? '48-Bit MAC Address Structure (IEEE 802 Standard)' : '৪৮-বিট ম্যাক অ্যাড্রেসের অভ্যন্তরীণ আর্কিটেকচার'}
            </h3>

            {/* Visual 48-Bit Block Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* OUI First 24 Bits */}
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300">OUI (Organizationally Unique Identifier)</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                    First 24 Bits (3 Bytes)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Assigned directly by IEEE to hardware manufacturers (e.g. Cisco, Apple, Intel, Dell). Every network card made by that vendor carries this exact prefix.'
                    : 'আইইইই (IEEE) সরাসরি হার্ডওয়্যার প্রস্তুতকারী কোম্পানিকে (Cisco, Apple, Intel) বরাদ্দ দেয়। এই ৩ বাইট দেখেই বোঝা যায় ডিভাইসটি কোন কোম্পানির।'}
                </p>
                <div className="text-xs font-mono text-cyan-400 font-bold bg-slate-950 p-2 rounded border border-cyan-900/40">
                  Example: 00:1A:2B (Cisco) | 3C:22:FB (Apple)
                </div>
              </div>

              {/* NIC Extension Last 24 Bits */}
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-300">NIC Specific Extension (Device ID)</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">
                    Last 24 Bits (3 Bytes)
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Assigned uniquely by the manufacturer to each individual chip or network adapter. Guarantees that no two original NICs in the world share the exact same hardware MAC.'
                    : 'প্রস্তুতকারী কোম্পানি তাদের প্রতিটি নেটওয়ার্ক চিপের জন্য একটি সম্পূর্ণ ইউনিক সিরিয়াল নাম্বার দেয়, যাতে পৃথিবীতে দুটি ডিভাইসের ম্যাক কখনো এক না হয়।'}
                </p>
                <div className="text-xs font-mono text-purple-400 font-bold bg-slate-950 p-2 rounded border border-purple-900/40">
                  Example: :3C:4D:5E (Unique Chip Serial)
                </div>
              </div>
            </div>

            {/* Interactive MAC Analyzer Tool */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                {lang === 'en' ? 'Interactive MAC Address Decoder & OUI Lookup' : 'ম্যাক অ্যাড্রেস ডিকোডার ও ভেন্ডর ফাইন্ডার'}
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-80">
                  <input
                    type="text"
                    value={inputMac}
                    onChange={(e) => setInputMac(e.target.value)}
                    placeholder="00:1A:2B:3C:4D:5E"
                    className="w-full bg-slate-900 border border-slate-700 px-3 py-1.5 text-xs text-white rounded-lg focus:outline-none focus:border-amber-400 font-mono font-bold"
                  />
                </div>
                <span className="text-xs text-slate-400">
                  Try: <code className="text-cyan-400 cursor-pointer" onClick={() => setInputMac('3C:22:FB:4B:92:01')}>Apple</code>,{' '}
                  <code className="text-cyan-400 cursor-pointer" onClick={() => setInputMac('00:1A:2B:11:22:33')}>Cisco</code>,{' '}
                  <code className="text-cyan-400 cursor-pointer" onClick={() => setInputMac('B8:27:EB:AA:BB:CC')}>Raspberry Pi</code>
                </span>
              </div>

              {macAnalysis ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-2">
                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">OUI VENDOR</span>
                    <span className="text-white font-bold text-xs">{macAnalysis.vendor}</span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">CASTING TYPE (I/G BIT)</span>
                    <span className={`font-bold ${macAnalysis.isMulticast ? 'text-purple-400' : 'text-emerald-400'}`}>
                      {macAnalysis.isMulticast ? 'Multicast (Bit 0 = 1)' : 'Unicast (Bit 0 = 0)'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">ADMIN TYPE (U/L BIT)</span>
                    <span className={`font-bold ${macAnalysis.isLocalAdmin ? 'text-amber-400' : 'text-blue-400'}`}>
                      {macAnalysis.isLocalAdmin ? 'Locally Administered (Spoofed/Private)' : 'Universally Administered (IEEE Burned)'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-rose-400">
                  Invalid MAC address format. Please enter a valid 12-character hex address (e.g. 00:1A:2B:3C:4D:5E).
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'defense' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">802.1X Enterprise Authentication</h4>
            <p className="text-xs text-slate-300">
              Never rely on MAC Whitelists for security. 802.1X (RADIUS / EAP-TLS) requires cryptographic user certificates or passwords before opening the port.
            </p>
            <span className="text-[10px] font-mono text-emerald-400 block pt-1">
              বাংলা: শুধু ম্যাক দেখে নেটওয়ার্কে ঢুকতে না দিয়ে ইউজারনেম/পাসওয়ার্ড বা ডিজিটাল সার্টিফিকেট বাধ্যতামূলক করা।
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h4 className="text-sm font-bold text-white">Dynamic ARP Inspection (DAI)</h4>
            <p className="text-xs text-slate-300">
              Switches inspect ARP packets against a DHCP Snooping binding database to ensure that the MAC and IP match the authentic DHCP lease.
            </p>
            <span className="text-[10px] font-mono text-cyan-400 block pt-1">
              বাংলা: সুইচ পরীক্ষা করে দেখে আইপি ও ম্যাক অ্যাড্রেস রাউটারের আসল তালিকার সাথে মিলছে কিনা।
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h4 className="text-sm font-bold text-white">Port Security (Sticky MAC)</h4>
            <p className="text-xs text-slate-300">
              Cisco/Enterprise switches remember the first MAC plugged into a port. If a spoofed or changed MAC appears, the switch port shuts down automatically.
            </p>
            <span className="text-[10px] font-mono text-purple-400 block pt-1">
              বাংলা: সুইচের পোর্টে কোনো ডিভাইস ম্যাক পরিবর্তন করলেই পোর্টটি সাথে সাথে লক বা শাটডাউন হয়ে যায়।
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
