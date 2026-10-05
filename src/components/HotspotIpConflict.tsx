import React, { useState } from 'react';
import { 
  Smartphone, 
  Laptop, 
  Globe, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  Server, 
  Cpu, 
  ShieldAlert, 
  Layers, 
  Activity,
  Zap,
  Info
} from 'lucide-react';
import { Language } from '../types/network';

interface HotspotIpConflictProps {
  lang: Language;
}

export const HotspotIpConflict: React.FC<HotspotIpConflictProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'hotspot_nat' | 'ip_conflict'>('hotspot_nat');

  // Hotspot NAT Simulation States
  const [isNatSimulating, setIsNatSimulating] = useState(false);
  const [natSimStep, setNatSimStep] = useState(0); // 0: Idle, 1: Sent to Phone, 2: Rewritten to WAN IP, 3: Reached Web Server, 4: Returned

  // IP Conflict Simulation States
  const [isConflictTriggered, setIsConflictTriggered] = useState(false);
  const [conflictStep, setConflictStep] = useState(0); // 0: Normal, 1: Device 2 sets same IP, 2: Gratuitous ARP sent, 3: Collision Warning

  const publicWanIp = '103.112.54.12';

  const runNatSimulation = () => {
    setIsNatSimulating(true);
    setNatSimStep(1);

    setTimeout(() => setNatSimStep(2), 1200);
    setTimeout(() => setNatSimStep(3), 2400);
    setTimeout(() => {
      setNatSimStep(4);
      setIsNatSimulating(false);
    }, 3800);
  };

  const runConflictSimulation = () => {
    setIsConflictTriggered(true);
    setConflictStep(1);

    setTimeout(() => setConflictStep(2), 1400);
    setTimeout(() => setConflictStep(3), 2800);
  };

  const resetConflict = () => {
    setIsConflictTriggered(false);
    setConflictStep(0);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Hotspot Same IP (NAT) & IP Conflict Simulation' : 'হটস্পটে একই আইপি শেয়ারিং (NAT) ও আইপি কনফ্লিক্ট সিমুলেটর'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Why multiple devices in a hotspot share the exact same Public IP on the internet, and what happens when two devices have the same Private IP.'
                  : 'হটস্পটে যুক্ত থাকা দুটি ডিভাইসের পাবলিক আইপি কেন হুবহু একই দেখায় (NAT) এবং লোকাল নেটওয়ার্কে দুটি ডিভাইসে একই আইপি বসলে কীভাবে কনফ্লিক্ট ঘটে।'}
              </p>
            </div>
          </div>

          {/* Switcher Tab */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('hotspot_nat')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'hotspot_nat'
                  ? 'bg-teal-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? '1. Why Public IPs are the Same' : '১. হটস্পটে একই পাবলিক আইপি (NAT)'}
            </button>
            <button
              onClick={() => setActiveTab('ip_conflict')}
              className={`px-3 py-1.5 rounded-md transition ${
                activeTab === 'ip_conflict'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'en' ? '2. Duplicate IP Conflict (Collision)' : '২. আইপি কনফ্লিক্ট (সংঘর্ষ)'}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'hotspot_nat' ? (
        <div className="space-y-6">
          {/* Main Hotspot Same IP Visualizer */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span>{lang === 'en' ? 'Why Do Both Devices Have the Same Public IP?' : 'হটস্পটে উভয় ডিভাইসের পাবলিক আইপি কেন একই হয়?'}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en'
                    ? 'Smartphone Hotspot acts as a cellular NAT router. Inside LAN they have unique private IPs, but outside WAN they share one public IP.'
                    : 'স্মার্টফোন হটস্পট একটি মিনি রাউটার হিসেবে কাজ করে। ভেতরে ভিন্ন প্রাইভেট আইপি থাকলেও ইন্টারনেটে বের হওয়ার সময় একটিমাত্র পাবলিক আইপি রূপান্তর (NAT) ঘটে।'}
                </p>
              </div>

              <button
                onClick={runNatSimulation}
                disabled={isNatSimulating}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow transition disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isNatSimulating ? (lang === 'en' ? 'Transmitting...' : 'ট্রান্সমিট হচ্ছে...') : (lang === 'en' ? 'Send Simultaneous Requests' : 'একযোগে রিকোয়েস্ট পাঠান')}</span>
              </button>
            </div>

            {/* Topology Map */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Left: 2 Connected Devices (Laptop & Tablet) */}
              <div className="md:col-span-4 space-y-3">
                {/* Device 1 */}
                <div className={`p-3.5 rounded-xl border transition-all text-xs ${
                  natSimStep === 1 ? 'bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold text-white">Laptop A</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300">
                      Private LAN
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-300 space-y-0.5">
                    <div>LAN IP: <strong className="text-cyan-400">192.168.43.15</strong></div>
                    <div>Port: <strong className="text-slate-400">:52100</strong></div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                    Visits: <code className="text-white">google.com</code>
                  </div>
                </div>

                {/* Device 2 */}
                <div className={`p-3.5 rounded-xl border transition-all text-xs ${
                  natSimStep === 1 ? 'bg-purple-950/60 border-purple-400 ring-2 ring-purple-500/30' : 'bg-slate-950 border-slate-800'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-purple-400" />
                      <span className="font-bold text-white">Phone / Tablet B</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-purple-300">
                      Private LAN
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-300 space-y-0.5">
                    <div>LAN IP: <strong className="text-purple-400">192.168.43.28</strong></div>
                    <div>Port: <strong className="text-slate-400">:52100</strong></div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                    Visits: <code className="text-white">whatismyip.com</code>
                  </div>
                </div>
              </div>

              {/* Middle: Phone Hotspot Gateway & NAT Table */}
              <div className="md:col-span-4 p-4 rounded-xl bg-slate-950 border border-teal-500/40 text-center space-y-2 shadow-lg shadow-teal-500/10">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white">Host Smartphone (Mobile Hotspot)</h3>
                
                <div className="text-[11px] font-mono text-slate-400 space-y-1">
                  <div>Internal Gateway: <strong className="text-emerald-400">192.168.43.1</strong></div>
                  <div>Cellular WAN IP: <strong className="text-amber-300 font-bold">{publicWanIp}</strong></div>
                </div>

                {/* Hotspot Translation Table */}
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-left space-y-1 mt-2">
                  <span className="text-slate-500 uppercase font-bold block">Active NAT/PAT Translation Table:</span>
                  <div className="text-cyan-300 flex justify-between">
                    <span>192.168.43.15:52100</span>
                    <span>→ :{publicWanIp}:41001</span>
                  </div>
                  <div className="text-purple-300 flex justify-between">
                    <span>192.168.43.28:52100</span>
                    <span>→ :{publicWanIp}:41002</span>
                  </div>
                </div>

                <span className="text-[10px] text-teal-300 block">
                  {natSimStep === 2 && 'Rewriting Source IPs to 103.112.54.12...'}
                  {natSimStep === 3 && 'Forwarding packets to 4G/5G Cellular Tower...'}
                  {natSimStep === 4 && 'Responses delivered back to Laptop & Tablet!'}
                </span>
              </div>

              {/* Right: Remote Public Internet & Web Servers */}
              <div className="md:col-span-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <Globe className="w-8 h-8 text-blue-400 mx-auto" />
                <h3 className="text-xs font-bold text-white">Public Internet / Web Server</h3>
                <span className="text-[11px] font-mono text-slate-400 block">www.whatismyip.com</span>

                {/* What the Web Server Sees */}
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-left font-mono text-[11px] space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">SERVER ACCESS LOG:</span>
                  <div className="text-cyan-300">
                    Client 1: <strong className="text-white">{publicWanIp}</strong>:41001
                  </div>
                  <div className="text-purple-300">
                    Client 2: <strong className="text-white">{publicWanIp}</strong>:41002
                  </div>
                </div>

                <div className="p-2 rounded bg-amber-950/40 border border-amber-900/60 text-[11px] text-amber-300 font-bold">
                  BOTH DEVICES SHOW IDENTICAL PUBLIC IP!
                </div>
              </div>
            </div>

            {/* In-depth Conceptual Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Info className="w-4 h-4" />
                <span>{lang === 'en' ? 'How NAT Solves the IPv4 Shortage (PAT - Port Address Translation):' : 'কীভাবে ন্যাট (NAT) প্রযুক্তি একই আইপি শেয়ার করতে সাহায্য করে:'}</span>
              </div>
              <p className="leading-relaxed">
                {lang === 'en'
                  ? 'Your SIM card receives only ONE public IPv4 address from the mobile operator (Grameenphone, Banglalink, Robi, etc.). When 5 friends connect to your hotspot, each friend gets a local private IP (192.168.43.x). When they browse the web, your phone substitutes their private IP with the single cellular public IP, keeping track of who is who via unique temporary port numbers (Port Address Translation - PAT).'
                  : 'আপনার সিম কার্ড মোবাইল অপারেটরের টাওয়ার থেকে কেবল ১টি পাবলিক আইপি পায়। যখন বন্ধুরা আপনার হটস্পটে যুক্ত হয়, ফোন তাদের আলাদা লোকাল আইপি (192.168.43.x) দেয়। কিন্তু ইন্টারনেটে যাওয়ার সময় ফোন তাদের প্রাইভেট আইপি পরিবর্তন করে সিমের একমাত্র পাবলিক আইপি বসিয়ে দেয় এবং ভিন্ন ভিন্ন পোর্ট নাম্বারের মাধ্যমে মনে রাখে কোন ডেটা কার কাছে পাঠাতে হবে।'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Part 2: IP Address Conflict Simulation */
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <h2 className="text-base font-bold text-white uppercase tracking-wider">
                    {lang === 'en' ? 'Duplicate IP Address Conflict Simulation' : 'একই লোকাল আইপি দুই ডিভাইসে হলে কী ঘটে? (IP Conflict)'}
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {lang === 'en'
                    ? 'What happens when two devices on the same Wi-Fi/LAN accidentally or maliciously claim the exact same IP address (192.168.1.50).'
                    : 'একই নেটওয়ার্কে দুটি ডিভাইসে ভুলবশত বা স্ট্যাটিক্যালি একই আইপি বসানো হলে কীভাবে ARP সংঘর্ষ ঘটে এবং ইন্টারনেট বিচ্ছিন্ন হয়।'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={runConflictSimulation}
                  disabled={isConflictTriggered}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow transition disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Trigger Duplicate IP Conflict' : 'কনফ্লিক্ট ঘটান (Trigger Conflict)'}</span>
                </button>
                <button
                  onClick={resetConflict}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Collision Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Device 1 */}
              <div className="md:col-span-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                <Laptop className="w-8 h-8 text-cyan-400 mx-auto" />
                <h4 className="text-xs font-bold text-white">Device 1 (Original User)</h4>
                
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-left font-mono text-[11px] space-y-1">
                  <div>Assigned IP: <strong className="text-cyan-400">192.168.1.50</strong></div>
                  <div>MAC: <strong className="text-slate-400">00:1A:2B:3C:4D:5E</strong></div>
                </div>

                <span className="text-[10px] text-emerald-400 font-mono block">
                  Original Owner of 192.168.1.50
                </span>
              </div>

              {/* Middle Conflict Zone */}
              <div className={`md:col-span-4 p-4 rounded-xl border text-center space-y-2 transition-all ${
                conflictStep >= 2
                  ? 'bg-rose-950/40 border-rose-500/80 shadow-xl shadow-rose-500/20'
                  : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex items-center justify-center gap-1.5">
                  <AlertTriangle className={`w-6 h-6 ${conflictStep >= 2 ? 'text-rose-400 animate-bounce' : 'text-slate-600'}`} />
                  <span className="text-xs font-bold text-white">Local Wi-Fi Switch / Router</span>
                </div>

                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-left space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">SWITCH ARP TABLE:</span>
                  {conflictStep >= 2 ? (
                    <div className="text-rose-400 font-bold animate-pulse">
                      COLLISION! 192.168.1.50 mapped to TWO different MACs!
                    </div>
                  ) : (
                    <div className="text-emerald-400">
                      192.168.1.50 → 00:1A:2B:3C:4D:5E (Normal)
                    </div>
                  )}
                </div>

                {conflictStep >= 3 && (
                  <div className="p-2 rounded bg-rose-950 border border-rose-800 text-[10px] text-rose-200 font-bold">
                    SYSTEM ERROR: "Windows detected an IP address conflict with another system!"
                  </div>
                )}
              </div>

              {/* Device 2 (The conflicting host) */}
              <div className={`md:col-span-4 p-4 rounded-xl border text-center space-y-2 transition-all ${
                conflictStep >= 1 ? 'bg-amber-950/30 border-amber-500/60' : 'bg-slate-950 border-slate-800'
              }`}>
                <Laptop className="w-8 h-8 text-amber-400 mx-auto" />
                <h4 className="text-xs font-bold text-white">Device 2 (Manual Static IP)</h4>
                
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-left font-mono text-[11px] space-y-1">
                  <div>Claimed IP: <strong className="text-rose-400 font-bold">192.168.1.50</strong></div>
                  <div>MAC: <strong className="text-slate-400">3C:22:FB:99:88:77</strong></div>
                </div>

                <span className="text-[10px] text-amber-300 font-mono block">
                  {conflictStep >= 1 ? 'Sends Gratuitous ARP: "I am 192.168.1.50!"' : 'Static configuration'}
                </span>
              </div>
            </div>

            {/* Resolution & Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block mb-1">1. Why does it happen?</span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'en'
                    ? 'Happens when someone configures a static IP manually that overlaps with an already active DHCP lease.'
                    : 'কেউ ভুলবশত বা ইচ্ছাকৃতভাবে রাউটারের অটোমেটিক (DHCP) রেঞ্জের কোনো আইপি নিজের কম্পিউটারে ম্যানুয়ালি বসিয়ে দিলে।'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block mb-1">2. What breaks?</span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'en'
                    ? 'Packets flap randomly between both machines. Both users experience severe disconnection, broken web sockets, and dropped pings.'
                    : 'সুইচ বুঝতে পারে না কার কাছে প্যাকেট পাঠাবে। ফলে দুটি ডিভাইসেরই ইন্টারনেট ঘন ঘন কেটে যায় ও লোডিং আটকে থাকে।'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-bold text-white block mb-1">3. How to fix?</span>
                <p className="text-slate-400 text-[11px]">
                  {lang === 'en'
                    ? 'Set adapter to "Obtain an IP automatically (DHCP)" or run `ipconfig /release && ipconfig /renew` in terminal.'
                    : 'অ্যাডাপ্টারের সেটিংসে গিয়ে "Obtain IP automatically (DHCP)" সিলেক্ট করা অথবা টার্মিনালে `ipconfig /renew` রান করা।'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
