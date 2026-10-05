import React, { useState } from 'react';
import { 
  Network, 
  Radio, 
  Building2, 
  Globe, 
  MapPin, 
  Cpu, 
  Smartphone, 
  Laptop, 
  Server, 
  CheckCircle2, 
  Info,
  Sliders,
  Activity,
  Layers
} from 'lucide-react';
import { Language } from '../types/network';

interface NetworkTypesGuideProps {
  lang: Language;
}

export type NetworkTypeKey = 'PAN' | 'LAN' | 'MAN' | 'WAN';

export interface NetworkTypeData {
  id: NetworkTypeKey;
  name: string;
  fullName: string;
  rangeEn: string;
  rangeBn: string;
  rangeKmMax: number;
  color: string;
  borderColor: string;
  bgGradient: string;
  badgeBg: string;
  badgeText: string;
  scopeEn: string;
  scopeBn: string;
  techEn: string;
  techBn: string;
  examplesEn: string[];
  examplesBn: string[];
  speedEn: string;
  speedBn: string;
  ownershipEn: string;
  ownershipBn: string;
  devices: string[];
}

export const NETWORK_TYPES_DATA: Record<NetworkTypeKey, NetworkTypeData> = {
  PAN: {
    id: 'PAN',
    name: 'PAN',
    fullName: 'Personal Area Network',
    rangeEn: '1 - 10 Meters',
    rangeBn: '১ - ১০ মিটার',
    rangeKmMax: 0.01,
    color: '#10b981', // emerald
    borderColor: 'border-emerald-500/40',
    bgGradient: 'from-emerald-950/40 to-slate-900',
    badgeBg: 'bg-emerald-950/80',
    badgeText: 'text-emerald-300 border-emerald-800',
    scopeEn: 'Centered around a single individual inside a very close personal workspace (desk, room, body area).',
    scopeBn: 'এক ব্যক্তির খুব কাছের নিজস্ব ডিভাইস সংযোগ। সাধারণত একটি ডেস্ক বা ঘরের ভেতরে সীমাবদ্ধ।',
    techEn: 'Bluetooth (BLE 5.0+), Zigbee, NFC, Wi-Fi Direct, Mobile Hotspot, Ultra-Wideband (UWB).',
    techBn: 'Bluetooth, Zigbee, NFC, Hotspot, Wi-Fi Direct, UWB।',
    examplesEn: [
      'Smartphone connected to wireless earbuds or smartwatch',
      'Wireless mouse & keyboard connected to laptop',
      'Mobile Hotspot sharing mobile data to a nearby tablet'
    ],
    examplesBn: [
      'ফোনের সাথে ওয়্যারলেস হেডফোন, স্মার্টওয়াচ বা ব্লুটুথ কিবোর্ড কানেক্ট করা।',
      'মোবাইল হটস্পটের মাধ্যমে ল্যাপটপ বা ট্যাবলেটে নেট শেয়ারিং।',
      'NFC পেমেন্ট বা ফাইল শেয়ারিং (Nearby Share / AirDrop)।'
    ],
    speedEn: '1 to 24 Mbps (Bluetooth) up to 250 Mbps (Hotspot)',
    speedBn: '১ থেকে ২৪ Mbps (Bluetooth) এবং হটস্পটে ২৫০ Mbps পর্যন্ত',
    ownershipEn: 'Private (Personal single-user ownership)',
    ownershipBn: 'সম্পূর্ণ ব্যক্তিগত মালিকানাধীন',
    devices: ['Smartphones', 'Smartwatches', 'Earbuds', 'Wireless Mice', 'Fitness Bands']
  },
  LAN: {
    id: 'LAN',
    name: 'LAN',
    fullName: 'Local Area Network',
    rangeEn: '10 Meters - 1 Kilometer',
    rangeBn: '১০ মি - ১ কিমি',
    rangeKmMax: 1,
    color: '#3b82f6', // blue
    borderColor: 'border-blue-500/40',
    bgGradient: 'from-blue-950/40 to-slate-900',
    badgeBg: 'bg-blue-950/80',
    badgeText: 'text-blue-300 border-blue-800',
    scopeEn: 'Spans a single room, residential house, school, university lab, or office building.',
    scopeBn: 'একটি কক্ষ, বাসা, স্কুল বা পুরো অফিস বিল্ডিং।',
    techEn: 'Ethernet Cables (Cat5e/Cat6/Cat6a), Wi-Fi Routers (802.11ax Wi-Fi 6), L2/L3 Switches, Patch Panels.',
    techBn: 'Ethernet Cables (CAT6), Wi-Fi Router, Switch, Access Point।',
    examplesEn: [
      'Office internal network connecting all staff PCs, printers, and NAS file servers',
      'Home Wi-Fi network connecting smart TVs, laptops, and game consoles',
      'University computer lab interconnected for shared resources'
    ],
    examplesBn: [
      'একটি অফিসের সব কম্পিউটারের মধ্যে ফাইল ও প্রিন্টার শেয়ারিং নেটওয়ার্ক।',
      'বাসার ওয়াই-ফাই রাউটার দিয়ে টিভি, ল্যাপটপ ও ফোন সংযোগ।',
      'কম্পিউটার ল্যাবের লোকাল সার্ভার ও ক্লায়েন্ট যোগাযোগ।'
    ],
    speedEn: '100 Mbps to 10 Gbps (Ultra-high speed & low latency)',
    speedBn: '১০০ Mbps থেকে ১০ Gbps (অত্যন্ত দ্রুতগতি ও স্বল্প ল্যাটেন্সি)',
    ownershipEn: 'Private (Controlled by home owner or corporate enterprise)',
    ownershipBn: 'ব্যক্তিগত বা প্রাতিষ্ঠানিক (Enterprise)',
    devices: ['Managed Switches', 'Wi-Fi 6 Routers', 'Access Points', 'Printers', 'Desktop PCs']
  },
  MAN: {
    id: 'MAN',
    name: 'MAN',
    fullName: 'Metropolitan Area Network',
    rangeEn: '5 - 50 Kilometers',
    rangeBn: '৫ - ৫০ কিমি',
    rangeKmMax: 50,
    color: '#a855f7', // purple
    borderColor: 'border-purple-500/40',
    bgGradient: 'from-purple-950/40 to-slate-900',
    badgeBg: 'bg-purple-950/80',
    badgeText: 'text-purple-300 border-purple-800',
    scopeEn: 'Covers an entire city, municipality, or designated metropolitan geographic zone.',
    scopeBn: 'একটি শহর বা নির্দিষ্ট ভৌগোলিক মেট্রোপলিটন এলাকা।',
    techEn: 'Underground Fiber Optic Rings (DWDM), High-speed Microwave Radio Links, Metro Ethernet.',
    techBn: 'Fiber Optic Cables, High-speed Microwave Links, Metro Ethernet।',
    examplesEn: [
      'City-wide Cable TV distribution network',
      'Local ISP broadband optical network across Dhaka/Chittagong metropolitan areas',
      'Municipal Smart City surveillance camera network connecting police HQ to traffic poles'
    ],
    examplesBn: [
      'ক্যাবল টিভি নেটওয়ার্ক, শহরের স্থানীয় ব্রডব্যান্ড ISP সার্ভিস।',
      'শহরের এক প্রান্তের ব্যাংক ব্রাঞ্চের সাথে অন্য প্রান্তের মেইন ব্রাঞ্চের ফাইবার সংযোগ।',
      'সিটি কর্পোরেশনের ট্রাফিক ও সিকিউরিটি ক্যামেরা সেন্ট্রাল মনিটরিং নেটওয়ার্ক।'
    ],
    speedEn: '1 Gbps to 100 Gbps (Metro backbone rings)',
    speedBn: '১ Gbps থেকে ১০০ Gbps পর্যন্ত মেট্রো ফাইবার লিংক',
    ownershipEn: 'Shared / Telecom Consortiums / City ISP operators',
    ownershipBn: 'সরকারি, আধা-সরকারি বা টেলিকম অপারেটর/আইএসপি',
    devices: ['Optical Line Terminals (OLT)', 'Microwave Antennas', 'Metro Core Routers']
  },
  WAN: {
    id: 'WAN',
    name: 'WAN',
    fullName: 'Wide Area Network',
    rangeEn: 'Global / Unlimited',
    rangeBn: 'গ্লোবাল / অসীম',
    rangeKmMax: 40000,
    color: '#06b6d4', // cyan
    borderColor: 'border-cyan-500/40',
    bgGradient: 'from-cyan-950/40 to-slate-900',
    badgeBg: 'bg-cyan-950/80',
    badgeText: 'text-cyan-300 border-cyan-800',
    scopeEn: 'Encompasses entire countries, continents, or the entire planetary globe.',
    scopeBn: 'দেশ, মহাদেশ বা সমগ্র পৃথিবী জুড়ে বিস্তৃত।',
    techEn: 'Undersea Trans-Oceanic Submarine Cables, Satellite Links (Starlink/LEO), Tier-1 BGP Telecom Backbones.',
    techBn: 'Submarine Cables, Satellite Communications, Routers, BGP Backbones।',
    examplesEn: [
      'The Global Internet (The world\'s largest public Wide Area Network)',
      'Multinational bank network linking branches in London, New York, Tokyo, and Dhaka',
      'Global cloud infrastructure connecting Google / AWS data centers across continents'
    ],
    examplesBn: [
      'Internet (বিশ্বের সবচেয়ে বড় WAN নেটওয়ার্ক)।',
      'বাংলাদেশ সাবমেরিন ক্যাবল (SEA-ME-WE 4 & 5) দিয়ে গ্লোবাল ইন্টারনেটের সাথে যুক্ত থাকা।',
      'বহুজাতিক কোম্পানির গ্লোবাল ক্লাউড ও ডাটা সেন্টার আন্তঃসংযোগ।'
    ],
    speedEn: 'Varies by submarine cable link (Tbps backbone, user speeds 10-1000 Mbps)',
    speedBn: 'টেরাবিট (Tbps) সাবমেরিন ব্যাকবোন, ব্যবহারকারী পর্যায়ে ১০-১০০০ Mbps',
    ownershipEn: 'Distributed (No single owner; interconnected autonomous systems)',
    ownershipBn: 'আন্তর্জাতিক কনসোর্টিয়াম ও গ্লোবাল টিয়ার-১ ব্যাকবোন',
    devices: ['Submarine Repeaters', 'Satellite Ground Stations', 'Tier-1 BGP Routers']
  }
};

export const NetworkTypesGuide: React.FC<NetworkTypesGuideProps> = ({ lang }) => {
  const [selectedType, setSelectedType] = useState<NetworkTypeKey>('LAN');
  const [simDistanceKm, setSimDistanceKm] = useState<number>(0.5); // 500m

  const currentData = NETWORK_TYPES_DATA[selectedType];

  const handleDistanceSlider = (val: number) => {
    setSimDistanceKm(val);
    if (val <= 0.015) {
      setSelectedType('PAN');
    } else if (val <= 1.5) {
      setSelectedType('LAN');
    } else if (val <= 60) {
      setSelectedType('MAN');
    } else {
      setSelectedType('WAN');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Network Types Classification (PAN, LAN, MAN, WAN)' : 'নেটওয়ার্কের প্রকারভেদ (PAN, LAN, MAN, WAN) ও ভৌগোলিক ব্যাপ্তি'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Geographic coverage, underlying technologies, hardware, and interactive distance visualizer based on international networking standards.'
                  : 'ভৌগোলিক পরিধি ও ব্যাপ্তির ভিত্তিতে নেটওয়ার্কের ৪টি প্রধান স্তর, ব্যবহৃত প্রযুক্তি ও লাইভ কভারেজ সিমুলেটর।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span>Selected Scope:</span>
            <span className="font-bold text-cyan-400">{selectedType}</span>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid - Exactly matching user screenshot! */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(NETWORK_TYPES_DATA) as NetworkTypeKey[]).map((key) => {
          const item = NETWORK_TYPES_DATA[key];
          const isSelected = selectedType === key;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedType(key)}
              className={`cursor-pointer rounded-xl p-5 border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? `bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-xl shadow-black/40`
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {/* Top Row: Name and Range Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    {item.name} ({item.fullName})
                  </h3>
                </div>
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold font-mono border ${item.badgeBg} ${item.badgeText}`}>
                  {lang === 'en' ? item.rangeEn : item.rangeBn}
                </span>
              </div>

              {/* Bullet Points with clean typography */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="text-slate-500 font-bold shrink-0">•</span>
                  <div>
                    <strong className="text-slate-200">{lang === 'en' ? 'Scope / Extent:' : 'ব্যাপ্তি:'}</strong>{' '}
                    <span>{lang === 'en' ? item.scopeEn : item.scopeBn}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-slate-500 font-bold shrink-0">•</span>
                  <div>
                    <strong className="text-slate-200">{lang === 'en' ? 'Technologies:' : 'প্রযুক্তি:'}</strong>{' '}
                    <span className="font-mono text-cyan-300/90">{lang === 'en' ? item.techEn : item.techBn}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-slate-500 font-bold shrink-0">•</span>
                  <div>
                    <strong className="text-slate-200">{lang === 'en' ? 'Examples:' : 'উদাহরণ:'}</strong>{' '}
                    <span>{(lang === 'en' ? item.examplesEn : item.examplesBn)[0]}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick specs */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Speed: <strong className="text-emerald-400">{item.speedEn.split('(')[0]}</strong></span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedType(key);
                  }}
                  className="text-cyan-400 hover:underline"
                >
                  {isSelected ? (lang === 'en' ? 'Active View' : 'নির্বাচিত') : (lang === 'en' ? 'Simulate →' : 'সিমুলেট করুন →')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Live Coverage & Scale Distance Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                {lang === 'en' ? 'Live Geographic Distance & Radius Simulator' : 'দূরত্ব ও কভারেজ ব্যাসার্ধ লাইভ সিমুলেটর'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'en'
                ? 'Drag the slider to increase distance and watch the network scale dynamically shift from PAN to LAN to MAN to WAN!'
                : 'স্লাইডার টেনে দূরত্ব বাড়ান বা কমান এবং দেখুন কীভাবে নেটওয়ার্কের ধরন PAN থেকে LAN, MAN এবং গ্লোবাল WAN-এ পরিবর্তিত হয়!'}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-xs">
            <span className="text-slate-400">{lang === 'en' ? 'Current Distance:' : 'বর্তমান দূরত্ব:'}</span>
            <span className="text-cyan-400 font-bold">
              {simDistanceKm < 1 ? `${Math.round(simDistanceKm * 1000)} Meters` : `${simDistanceKm.toFixed(1)} Kilometers`}
            </span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min="0.005"
            max="150"
            step="0.01"
            value={simDistanceKm}
            onChange={(e) => handleDistanceSlider(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500">
            <span>5m (PAN)</span>
            <span>500m (LAN)</span>
            <span>25km (MAN)</span>
            <span>150km+ (WAN)</span>
          </div>
        </div>

        {/* Visual Simulated Coverage Radar / Topology */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Visual Icon Node */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all"
                style={{ backgroundColor: `${currentData.color}25`, border: `2px solid ${currentData.color}` }}
              >
                {selectedType === 'PAN' && <Smartphone className="w-8 h-8 text-emerald-400" />}
                {selectedType === 'LAN' && <Building2 className="w-8 h-8 text-blue-400" />}
                {selectedType === 'MAN' && <MapPin className="w-8 h-8 text-purple-400" />}
                {selectedType === 'WAN' && <Globe className="w-8 h-8 text-cyan-400" />}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white font-mono">{currentData.name} Active</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${currentData.badgeBg} ${currentData.badgeText}`}>
                    {lang === 'en' ? currentData.rangeEn : currentData.rangeBn}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  {lang === 'en' ? currentData.scopeEn : currentData.scopeBn}
                </p>
              </div>
            </div>

            {/* Simulated Live Connected Devices */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono space-y-1 w-full md:w-auto shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                {lang === 'en' ? 'Simulated Endpoints at this Scale:' : 'বর্তমান স্কেলের ডিভাইসসমূহ:'}
              </span>
              {currentData.devices.slice(0, 3).map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Comparison Specs Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Bandwidth & Speed</span>
            <span className="text-sm font-bold text-white font-mono mt-0.5 block">{currentData.speedEn}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Network Ownership</span>
            <span className="text-sm font-semibold text-cyan-300 mt-0.5 block">{lang === 'en' ? currentData.ownershipEn : currentData.ownershipBn}</span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Typical Latency (RTT)</span>
            <span className="text-sm font-bold text-emerald-400 font-mono mt-0.5 block">
              {selectedType === 'PAN' ? '< 3 ms' :
               selectedType === 'LAN' ? '0.5 – 2 ms' :
               selectedType === 'MAN' ? '5 – 15 ms' : '30 – 180 ms'}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Primary Medium</span>
            <span className="text-sm font-semibold text-purple-300 mt-0.5 block">
              {selectedType === 'PAN' ? '2.4 GHz RF (BLE)' :
               selectedType === 'LAN' ? 'Cat6 Copper / Wi-Fi' :
               selectedType === 'MAN' ? 'Metro Fiber Optic' : 'Submarine Optic & Satellite'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
