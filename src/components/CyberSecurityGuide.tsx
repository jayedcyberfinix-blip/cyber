import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Smartphone, 
  Globe, 
  Cpu, 
  Key, 
  Fish, 
  Users, 
  Search, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Info, 
  AlertTriangle,
  ExternalLink,
  BookOpen,
  Zap,
  Lock
} from 'lucide-react';
import { Language } from '../types/network';
import { 
  CYBER_SECURITY_TOOLS, 
  CYBER_CATEGORIES, 
  CyberTool 
} from '../data/cyberToolsData';

interface CyberSecurityGuideProps {
  lang: Language;
  onSendToTerminal?: (command: string) => void;
}

export const CyberSecurityGuide: React.FC<CyberSecurityGuideProps> = ({ 
  lang, 
  onSendToTerminal 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectedTool, setInspectedTool] = useState<CyberTool | null>(CYBER_SECURITY_TOOLS[0]);

  const copyCommand = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredTools = CYBER_SECURITY_TOOLS.filter(tool => {
    const matchCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchQuery = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.descBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.descEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.testingTypeEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.testingTypeBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.sampleCommand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'mobile': return <Smartphone className="w-4 h-4 text-emerald-400" />;
      case 'web': return <Globe className="w-4 h-4 text-cyan-400" />;
      case 'network': return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'password': return <Key className="w-4 h-4 text-amber-400" />;
      case 'phishing': return <Fish className="w-4 h-4 text-rose-400" />;
      case 'social': return <Users className="w-4 h-4 text-purple-400" />;
      default: return <ShieldAlert className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Cybersecurity Tools & Penetration Testing Handbook' : 'সাইবার সিকিউরিটি টুলস ও তাদের ব্যবহার নির্দেশিকা'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Comprehensive reference of 39+ top security tools across Mobile, Web, Network, Password Auditing, and Social Engineering with live practice commands.'
                  : 'সাইবার নিরাপত্তা, নেটওয়ার্ক অ্যাটাক এবং পেনেট্রেশন টেস্টিংয়ে ব্যবহৃত প্রধান ৩৯+ টুলস ও তাদের সংক্ষিপ্ত কাজের প্র্যাকটিক্যাল গাইড।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-rose-300 font-bold">
              39 Tools Cataloged
            </span>
          </div>
        </div>

        {/* Disclaimer Notice Banner matching PDF */}
        <div className="mt-4 p-3 rounded-lg bg-amber-950/30 border border-amber-900/50 flex items-start gap-2.5 text-xs text-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-300 font-semibold">{lang === 'en' ? 'Legal Disclaimer: ' : 'সতর্কতা (Disclaimer): '}</strong>
            {lang === 'en'
              ? 'The tools mentioned herein are intended strictly for educational purposes, defensive security auditing, and authorized penetration testing. Unauthorized use against systems without explicit prior permission is illegal and punishable by law.'
              : 'উপরে উল্লিখিত টুলগুলো মূলত পেনেট্রেশন টেস্টিং, সিকিউরিটি অডিটিং এবং সাইবার নিরাপত্তার উদ্দেশ্যে তৈরি করা হয়েছে। অনুমতি ছাড়া যেকোনো নেটওয়ার্ক বা সিস্টেমে এগুলোর অনৈতিক ব্যবহার আইনত দণ্ডনীয় অপরাধ।'}
          </p>
        </div>
      </div>

      {/* Search & Category Filter Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search tool (e.g. Frida, Burp, Nmap, Hydra)...' : 'টুল সার্চ করুন (যেমন: Frida, Burp, Nmap, Hydra)...'}
            className="w-full bg-slate-950 border border-slate-700 pl-9 pr-3 py-1.5 text-xs text-white rounded-lg focus:outline-none focus:border-rose-500 font-mono"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {CYBER_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-[11px] rounded-lg transition font-medium whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-rose-600 text-white font-bold shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {lang === 'en' ? cat.labelEn : cat.labelBn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual Grid: Tools Directory Cards on Left, Deep Tool Dissection & Terminal Output Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tools Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1 text-xs text-slate-400">
            <span>Showing {filteredTools.length} security tools</span>
            <span>Click any card to inspect output</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTools.map((tool) => {
              const isSelected = inspectedTool?.id === tool.id;
              return (
                <div
                  key={tool.id}
                  onClick={() => setInspectedTool(tool)}
                  className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? 'bg-slate-900 border-rose-500 ring-2 ring-rose-500/30 shadow-lg shadow-black/40'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(tool.category)}
                        <h3 className="text-sm font-bold text-white">{tool.name}</h3>
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 shrink-0">
                        {tool.testingTypeEn.split('/')[0]}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {lang === 'en' ? tool.descEn : tool.descBn}
                    </p>
                  </div>

                  {/* Bottom Action buttons */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-[11px] text-cyan-400 truncate max-w-[180px]">
                      {tool.sampleCommand}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSendToTerminal) onSendToTerminal(tool.sampleCommand);
                        setInspectedTool(tool);
                      }}
                      className="px-2 py-1 rounded bg-rose-600/20 hover:bg-rose-600/40 border border-rose-500/40 text-rose-300 text-[10px] font-bold transition flex items-center gap-1 shrink-0"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Practice</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Tool Dissection & Simulated Execution Drawer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {inspectedTool ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 sticky top-20">
              <div className="pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 mb-1">
                  {getCategoryIcon(inspectedTool.category)}
                  <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider font-bold">
                    {inspectedTool.categoryTitleEn}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white">{inspectedTool.name}</h2>
                <span className="text-xs font-mono text-emerald-400 mt-0.5 block">
                  {inspectedTool.testingTypeEn} ({inspectedTool.testingTypeBn})
                </span>
              </div>

              {/* Bengali Description */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                <strong className="text-slate-400 text-[10px] uppercase block mb-1">কার্যপ্রণালী (Role):</strong>
                {inspectedTool.descBn}
              </div>

              {/* Sample Command & Copy */}
              <div className="space-y-1.5 font-mono text-xs">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Practice Command:
                </span>
                <div className="flex items-center justify-between p-2.5 rounded bg-slate-950 border border-slate-800 text-cyan-300">
                  <code className="text-[11px] break-all">{inspectedTool.sampleCommand}</code>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <button
                      onClick={() => copyCommand(inspectedTool.sampleCommand, inspectedTool.id)}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedId === inspectedTool.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    {onSendToTerminal && (
                      <button
                        onClick={() => onSendToTerminal(inspectedTool.sampleCommand)}
                        className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold"
                        title="Send to Terminal Sandbox"
                      >
                        Run
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Simulated Output in Terminal Style */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
                <div className="text-[10px] text-slate-500 uppercase flex items-center justify-between pb-1 border-b border-slate-900">
                  <span>Simulated Terminal Output</span>
                  <span className="text-emerald-400">Exit 0</span>
                </div>
                <div className="pt-1 space-y-1 text-slate-300">
                  {inspectedTool.simulatedOutput.map((out, oIdx) => (
                    <div
                      key={oIdx}
                      className={
                        out.includes('[CRITICAL]') || out.includes('[STOLEN]') ? 'text-rose-400 font-bold' :
                        out.includes('[WARN]') ? 'text-amber-400' :
                        out.includes('[+]') ? 'text-emerald-400' :
                        'text-slate-300'
                      }
                    >
                      {out}
                    </div>
                  ))}
                </div>
              </div>

              {/* Defensive Countermeasure & Mitigation */}
              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-xs text-blue-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-blue-300">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>Defensive Mitigation (প্রতিরোধ ব্যবস্থা)</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {lang === 'en' ? inspectedTool.bestPracticeTipEn : inspectedTool.bestPracticeTipBn}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs bg-slate-900 border border-slate-800 rounded-xl">
              Click any tool card to inspect sample command, terminal outputs, and defense techniques.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
