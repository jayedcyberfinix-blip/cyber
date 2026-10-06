import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  FolderTree, 
  FileText, 
  ShieldAlert, 
  Search, 
  Copy, 
  Check, 
  Play, 
  HelpCircle, 
  AlertTriangle, 
  BookOpen, 
  Layers, 
  Cpu, 
  HardDrive, 
  Lock, 
  Activity,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Language } from '../types/network';
import { 
  LINUX_COMMANDS, 
  LINUX_DIRECTORIES, 
  LINUX_TEXT_EDITORS, 
  TROUBLESHOOTING_ERRORS, 
  LinuxCommand 
} from '../data/linuxData';

interface LinuxHandbookProps {
  lang: Language;
  onOpenTerminal?: (cmd?: string) => void;
}

export const LinuxHandbook: React.FC<LinuxHandbookProps> = ({ lang, onOpenTerminal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Terminal Simulator States
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string[] }>>([
    {
      cmd: 'ls -la',
      output: [
        'total 48',
        'drwxr-xr-x 4 cmnatic cmnatic 4096 Oct  6 10:00 .',
        'drwxr-xr-x 8 cmnatic cmnatic 4096 Oct  6 09:30 ..',
        '-rwxr-xr-x 1 cmnatic cmnatic  842 Oct  6 10:20 scan.sh',
        '-rw-r--r-- 1 cmnatic cmnatic 1024 Oct  6 10:22 file.txt',
        'drwxr-xr-x 2 cmnatic cmnatic 4096 Oct  6 10:15 logs'
      ]
    }
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [nanoEditorOpen, setNanoEditorOpen] = useState(false);
  const [nanoText, setNanoText] = useState('#!/bin/bash\necho "Hello from NetSim Linux Sandbox!"\nping -c 4 192.168.1.254\n');

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory, nanoEditorOpen]);

  const copyCommand = (cmdText: string) => {
    navigator.clipboard.writeText(cmdText);
    setCopiedCmd(cmdText);
    setTimeout(() => setCopiedCmd(null), 1500);
  };

  const executeCommand = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    }

    if (trimmed.startsWith('nano')) {
      setNanoEditorOpen(true);
      setTerminalInput('');
      return;
    }

    // Match command
    const matched = LINUX_COMMANDS.find(c => {
      const baseCmd = c.command.split(' ')[0];
      return trimmed.startsWith(baseCmd) || trimmed === c.command;
    });

    let outputLines: string[] = [];

    if (trimmed === 'pwd') {
      outputLines = ['/home/cmnatic/cyber_labs'];
    } else if (trimmed === 'ls' || trimmed === 'ls -la') {
      outputLines = [
        'total 48',
        'drwxr-xr-x 4 cmnatic cmnatic 4096 Oct  6 10:00 .',
        'drwxr-xr-x 8 cmnatic cmnatic 4096 Oct  6 09:30 ..',
        '-rw-r--r-- 1 cmnatic cmnatic  220 Oct  6 09:00 .bash_logout',
        '-rw-r--r-- 1 cmnatic cmnatic 3771 Oct  6 09:00 .bashrc',
        'drwxr-xr-x 2 cmnatic cmnatic 4096 Oct  6 10:15 logs',
        '-rwxr-xr-x 1 cmnatic cmnatic  842 Oct  6 10:20 scan.sh',
        '-rw-r--r-- 1 cmnatic cmnatic 1024 Oct  6 10:22 file.txt'
      ];
    } else if (trimmed.startsWith('cat')) {
      outputLines = [
        '--- file.txt contents ---',
        'HOST=192.168.1.254',
        'PORT=443',
        'PROTOCOL=HTTPS',
        'USER=admin',
        'STATUS=ACTIVE'
      ];
    } else if (trimmed.startsWith('head')) {
      outputLines = [
        '1: System Boot Initialized',
        '2: Kernel: Linux 6.8.0-generic',
        '3: CPU: AMD Ryzen 7 (16 cores)',
        '4: Memory: 16384 MB DDR5',
        '5: Network: eth0 link UP 1000Mbps'
      ];
    } else if (trimmed.startsWith('tail')) {
      outputLines = [
        'Oct  6 10:50:01 kernel: [UFW ALLOW] IN=eth0 OUT= SRC=192.168.1.50 DST=142.250.190.46 PROTO=TCP DPT=443',
        'Oct  6 10:52:14 ufw: [BLOCK] IN=eth0 SRC=185.220.101.5 DST=192.168.1.254 PROTO=TCP DPT=23',
        'Oct  6 10:55:08 systemd: NetworkManager connected to gateway 192.168.1.254'
      ];
    } else if (trimmed.startsWith('grep')) {
      outputLines = [
        'file.txt: Line 2: PORT=443',
        'file.txt: Line 3: PROTOCOL=HTTPS'
      ];
    } else if (matched && matched.exampleOutput) {
      outputLines = matched.exampleOutput;
    } else {
      outputLines = [`${trimmed}: command executed successfully with code 0.`];
    }

    setTerminalHistory(prev => [...prev, { cmd: trimmed, output: outputLines }]);
    setTerminalInput('');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(terminalInput);
  };

  const filteredCommands = LINUX_COMMANDS.filter(cmd => {
    const matchesCat = activeCategory === 'all' || cmd.category === activeCategory;
    const matchesSearch = 
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.descEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.descBn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Linux Essential Commands & Troubleshooting Guide' : 'লিনাক্স ফাইল সিস্টেম, প্রয়োজনীয় কমান্ডসমূহ এবং সিকিউরিটি টুলসের বাংলা গাইড'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Interactive Linux terminal sandbox, file viewing, permissions, grep search, cyber security tools, and error resolution handbook.'
                  : 'ফাইল নেভিগেশন, পারমিশন, টেক্সট এডিটর, গ্রিপ সার্চ, সাইবার সিকিউরিটি টুলস (Nmap, Netcat, Gobuster) এবং সাধারণ এরর সমাধানের পূর্ণাঙ্গ লাইভ গাইড।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenTerminal && (
              <button
                onClick={() => onOpenTerminal('help')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-mono text-xs shadow transition flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Open Practice Lab' : 'টার্মিনাল ল্যাব প্র্যাকটিস'}</span>
              </button>
            )}
            <button
              onClick={() => executeCommand('ls -la')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold font-mono text-xs shadow transition"
            >
              Run Demo in Bash
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Linux Bash Terminal Playground */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
        {/* Terminal Header Bar */}
        <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
            <span className="text-[11px] text-slate-400 ml-2 font-semibold">
              cmnatic@CMNatic-THM-LPTOP: ~/cyber_labs (bash)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTerminalHistory([])}
              className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
            >
              Clear Screen
            </button>
            <span className="text-[10px] text-emerald-400 font-bold">Interactive Sandbox</span>
          </div>
        </div>

        {/* If Nano Editor is Open */}
        {nanoEditorOpen ? (
          <div className="p-4 bg-slate-950 text-slate-200 space-y-3">
            <div className="bg-slate-800 px-2 py-1 rounded text-center text-xs font-bold text-white flex justify-between">
              <span>GNU nano 6.2</span>
              <span>File: script.sh</span>
              <span>Modified</span>
            </div>
            <textarea
              value={nanoText}
              onChange={(e) => setNanoText(e.target.value)}
              rows={8}
              className="w-full bg-slate-900 border border-slate-700 p-3 rounded font-mono text-xs text-emerald-300 focus:outline-none focus:border-emerald-500 resize-none"
            />
            {/* Nano Shortcuts Footer matching PDF */}
            <div className="bg-slate-900 p-2.5 rounded border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-cyan-300">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-white font-bold">Ctrl + O</span>
                <span>Save (সেভ করা)</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-300">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-white font-bold">Ctrl + X</span>
                <span>Exit (বের হওয়া)</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-white font-bold">Ctrl + K</span>
                <span>Cut Line (লাইন কাটা)</span>
              </div>
              <button
                onClick={() => setNanoEditorOpen(false)}
                className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Close Nano
              </button>
            </div>
          </div>
        ) : (
          /* Normal Terminal Stream */
          <div className="p-4 space-y-2 text-slate-200 max-h-[340px] overflow-y-auto leading-relaxed">
            <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-900">
              Welcome to NetSim Linux Interactive Environment. Type any command (e.g. pwd, ls -la, cat file.txt, nmap -sV, free -m) or click below!
            </div>

            {terminalHistory.map((entry, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-400 font-bold">cmnatic@CMNatic-THM-LPTOP:~$</span>
                  <span className="text-white font-bold">{entry.cmd}</span>
                </div>
                <div className="text-slate-300 pl-2 border-l border-slate-800 space-y-0.5 font-mono text-[11px]">
                  {entry.output.map((outLine, lIdx) => {
                    const isDir = outLine.startsWith('d');
                    const isExec = outLine.includes('-rwxr-xr-x');
                    return (
                      <div
                        key={lIdx}
                        className={
                          isDir ? 'text-blue-400 font-semibold' :
                          isExec ? 'text-emerald-400 font-semibold' :
                          outLine.includes('BLOCK') ? 'text-rose-400 font-bold' :
                          'text-slate-300'
                        }
                      >
                        {outLine}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Input Line Form */}
            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-1.5 pt-1">
              <span className="text-emerald-400 font-bold">cmnatic@CMNatic-THM-LPTOP:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type a command (e.g. ls -la, pwd, cat, nmap)..."
                className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none"
              />
            </form>
            <div ref={terminalEndRef} />
          </div>
        )}

        {/* Quick Command Suggestions Pill Row */}
        <div className="bg-slate-900 p-2.5 border-t border-slate-800 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-slate-500 text-[10px] uppercase font-bold mr-1">Quick Run:</span>
          {['pwd', 'ls -la', 'cat file.txt', 'head -n 5 file.txt', 'grep -i "admin" file.txt', 'nano file.txt', 'nmap -sV 192.168.1.254', 'free -m', 'df -h'].map(cmd => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-800 font-mono transition"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Linux File System Structure (Tree Cards matching PDF Section 2) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <FolderTree className="w-4 h-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {lang === 'en' ? '২. Linux File System Structure (লিনাক্স ফাইল সিস্টেম স্ট্রাকচার)' : '২. লিনাক্স ফাইল সিস্টেম স্ট্রাকচার (Linux File System Hierarchy)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LINUX_DIRECTORIES.map(dir => (
            <div
              key={dir.dir}
              onClick={() => executeCommand(`cd ${dir.dir} && pwd && ls`)}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer transition space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-base text-white group-hover:text-cyan-400 transition">
                  {dir.dir}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  Directory
                </span>
              </div>
              <h4 className="text-xs font-semibold text-cyan-300">{dir.nameBn}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'en' ? dir.descEn : dir.descBn}
              </p>
              <span className="text-[10px] text-emerald-400 font-mono block pt-1">Click to browse →</span>
            </div>
          ))}
        </div>
      </div>

      {/* Text Editors Section (Nano, Vim, Gedit matching PDF Section 6) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <FileText className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {lang === 'en' ? '৬. Text Editors & Shortcuts (টেক্সট এডিটরসমূহ)' : '৬. টেক্সট এডিটরসমূহ ও দরকারি শর্টকাট (Text Editors)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {LINUX_TEXT_EDITORS.map(ed => (
            <div key={ed.editor} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{ed.editor}</h3>
                <span className="text-[11px] font-mono text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {ed.command}
                </span>
              </div>
              <p className="text-xs text-slate-300">{lang === 'en' ? ed.bestForEn : ed.bestForBn}</p>

              {/* Shortcuts */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs font-mono">
                {ed.shortcuts.map((sc, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between text-[11px] p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-amber-400 font-bold">{sc.key}</span>
                    <span className="text-slate-300">{lang === 'en' ? sc.labelEn : sc.labelBn}</span>
                  </div>
                ))}
              </div>

              {ed.editor === 'Nano' && (
                <button
                  onClick={() => setNanoEditorOpen(true)}
                  className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs shadow transition"
                >
                  Open Nano Simulator
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Search & Category Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search command, grep, chmod, nmap..."
            className="w-full bg-slate-950 border border-slate-700 pl-9 pr-3 py-1.5 text-xs text-white rounded-lg focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'all', label: 'All Commands' },
            { id: 'navigation', label: '১. নেভিগেশন' },
            { id: 'management', label: '৩. ম্যানেজমেন্ট' },
            { id: 'permissions', label: '৪. পারমিশন' },
            { id: 'viewing', label: '৫. ফাইল দেখা' },
            { id: 'search', label: '৭. সার্চ (Grep)' },
            { id: 'security', label: 'সাইবার সিকিউরিটি' },
            { id: 'services', label: 'সার্ভিসেস' },
            { id: 'utilities', label: 'সিস্টেম তথ্য' },
            { id: 'processes', label: 'প্রসেস' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 text-[11px] rounded-lg transition font-medium ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* All Commands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredCommands.map((cmd) => (
          <div
            key={cmd.command}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 font-mono text-cyan-400 font-bold text-xs truncate">
                  {cmd.command}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-indigo-950/70 text-indigo-300 border border-indigo-800/60 shrink-0">
                  {cmd.category}
                </span>
              </div>

              <h4 className="text-xs font-bold text-white mt-2">{cmd.name}</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {lang === 'en' ? cmd.descEn : cmd.descBn}
              </p>

              {cmd.tipBn && (
                <div className="mt-2 p-2 rounded bg-blue-950/30 border border-blue-900/40 text-[10px] text-blue-300">
                  {cmd.tipBn}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => executeCommand(cmd.command.replace(/\[.*?\]/g, 'file.txt'))}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-semibold transition"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Run in Bash</span>
              </button>
              <button
                onClick={() => copyCommand(cmd.command)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition"
                title="Copy Command"
              >
                {copiedCmd === cmd.command ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Section 9: Common Troubleshooting Errors (সাধারণ লিনাক্স এরর ও সমাধান matching PDF Section 9) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {lang === 'en' ? '৯. Common Linux Errors & Solutions (সাধারণ লিনাক্স এরর ও সমাধান)' : '৯. সাধারণ লিনাক্স এরর ও সমাধান (Troubleshooting Errors)'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TROUBLESHOOTING_ERRORS.map((err) => (
            <div key={err.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-amber-300">{err.titleBn}</h3>
              
              {/* Error code box */}
              <div className="p-2.5 rounded bg-rose-950/40 border border-rose-900/60 font-mono text-[10px] text-rose-300 whitespace-pre-wrap">
                {err.errorSnippet}
              </div>

              <div className="text-xs text-slate-300">
                <strong className="text-slate-400 block text-[10px] uppercase">কারণ (Cause):</strong>
                <span>{err.causeBn}</span>
              </div>

              {/* Solution box */}
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">সমাধান কমান্ড:</span>
                <div className="flex items-center justify-between font-mono text-xs text-white">
                  <code>{err.solutionCommand}</code>
                  <button
                    onClick={() => {
                      copyCommand(err.solutionCommand);
                      executeCommand(err.solutionCommand.split(' ')[0]);
                    }}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 ml-2"
                    title="Copy & Run"
                  >
                    <Play className="w-3 h-3 text-cyan-400 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
