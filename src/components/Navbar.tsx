import React from 'react';
import { 
  Layers, 
  Activity, 
  Binary, 
  Radio, 
  FileCode, 
  ShieldAlert, 
  Share2, 
  Cpu, 
  Play, 
  Pause, 
  Languages,
  Network,
  Terminal,
  Shield,
  Trophy 
} from 'lucide-react';
import { Language } from '../types/network';

export type ActiveTab = 
  | 'terminal_practice'
  | 'linux'
  | 'ping'
  | 'osi' 
  | 'net_types'
  | 'mac_spoof'
  | 'hotspot_conflict'
  | 'traffic' 
  | 'ip' 
  | 'protocols' 
  | 'headers' 
  | 'firewall' 
  | 'portforward' 
  | 'tcpudp';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  isTrafficRunning: boolean;
  setIsTrafficRunning: (running: boolean) => void;
  packetRate: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  isTrafficRunning,
  setIsTrafficRunning,
  packetRate
}) => {
  const tabs = [
    { id: 'terminal_practice' as ActiveTab, icon: Terminal, labelEn: 'Terminal Practice Lab', labelBn: 'টার্মিনাল প্র্যাকটিস ল্যাব' },
    { id: 'linux' as ActiveTab, icon: Trophy, labelEn: 'Linux Handbook', labelBn: 'লিনাক্স কমান্ড গাইড' },
    { id: 'ping' as ActiveTab, icon: Activity, labelEn: 'Ping & ICMP Inspector', labelBn: 'পিং ও ICMP ডায়াগনস্টিক' },
    { id: 'osi' as ActiveTab, icon: Layers, labelEn: 'OSI 7 Layers', labelBn: 'OSI ৭ লেয়ার সিমুলেশন' },
    { id: 'net_types' as ActiveTab, icon: Network, labelEn: 'PAN, LAN, MAN, WAN', labelBn: 'PAN / LAN / MAN / WAN' },
    { id: 'mac_spoof' as ActiveTab, icon: Cpu, labelEn: 'MAC & Spoofing', labelBn: 'ম্যাক ও স্পুফিং (ছদ্মবেশ)' },
    { id: 'hotspot_conflict' as ActiveTab, icon: Radio, labelEn: 'Hotspot IP & Conflict', labelBn: 'হটস্পট একই আইপি ও কনফ্লিক্ট' },
    { id: 'traffic' as ActiveTab, icon: Activity, labelEn: 'Live Traffic & Map', labelBn: 'লাইভ ট্রাফিক ও টপোলজি' },
    { id: 'ip' as ActiveTab, icon: Binary, labelEn: 'IP & Subnetting', labelBn: 'IPv4 / IPv6 সাবনেটিং' },
    { id: 'protocols' as ActiveTab, icon: Radio, labelEn: 'Ports & Protocols', labelBn: 'পোর্টস ও প্রোটোকলস' },
    { id: 'headers' as ActiveTab, icon: FileCode, labelEn: 'Packet Headers', labelBn: 'প্যাকেট হেডার ইন্স্পেক্টর' },
    { id: 'firewall' as ActiveTab, icon: ShieldAlert, labelEn: 'Firewall & IDS/IPS', labelBn: 'ফায়ারওয়াল ও IDS/IPS' },
    { id: 'portforward' as ActiveTab, icon: Share2, labelEn: 'Port Forwarding', labelBn: 'পোর্ট ফরোয়ার্ডিং' },
    { id: 'tcpudp' as ActiveTab, icon: Cpu, labelEn: 'TCP/UDP & Logs', labelBn: 'TCP/UDP হ্যান্ডশেক ও লগ' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-3 py-2.5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                  NetSim Pro
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  NOC v2.4
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full bg-slate-900 border border-slate-700/80 text-slate-300">
                  <span className="text-slate-400">by</span>
                  <span className="font-bold text-cyan-400">Jayed</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {lang === 'en' ? 'Interactive OSI & Network Simulation Suite' : 'ওএসআই মডেল ও নেটওয়ার্ক ট্রাফিক সিমুলেটর'}
              </p>
            </div>
          </div>

          {/* Quick Controls: Traffic Play/Pause, Live Metrics, Language */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Traffic Indicator */}
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs">
              <span className={`w-2 h-2 rounded-full ${isTrafficRunning ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
              <span className="text-slate-300 font-mono">
                {isTrafficRunning ? `${packetRate} pkt/s` : 'PAUSED'}
              </span>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsTrafficRunning(!isTrafficRunning)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                isTrafficRunning 
                  ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
              title={isTrafficRunning ? 'Pause live packet engine' : 'Resume live packet engine'}
            >
              {isTrafficRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Pause' : 'থামান'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{lang === 'en' ? 'Live Stream' : 'লাইভ চালান'}</span>
                </>
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 hover:bg-slate-750 transition"
              title="Toggle English / বাংলা"
            >
              <Languages className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'en' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar mt-2.5 pt-1 border-t border-slate-800/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{lang === 'en' ? tab.labelEn : tab.labelBn}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
