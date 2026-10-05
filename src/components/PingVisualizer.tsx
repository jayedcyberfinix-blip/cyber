import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Activity, 
  HelpCircle, 
  Info, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowRight, 
  Radio, 
  Layers, 
  Cpu, 
  Zap,
  Sliders
} from 'lucide-react';
import { Language } from '../types/network';

interface PingVisualizerProps {
  lang: Language;
}

interface PingLine {
  seq: number;
  bytes: number;
  ip: string;
  ttl: number;
  timeMs: number;
  rawText: string;
  isLoss?: boolean;
}

export const PingVisualizer: React.FC<PingVisualizerProps> = ({ lang }) => {
  const [targetIp, setTargetIp] = useState('192.168.1.254');
  const [pingCount, setPingCount] = useState(6);
  const [isPinging, setIsPinging] = useState(false);
  const [simScenario, setSimScenario] = useState<'normal' | 'timeout' | 'unreachable' | 'spike'>('normal');

  // Terminal Output State
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [pingRecords, setPingRecords] = useState<PingLine[]>([]);
  const [stats, setStats] = useState<{
    transmitted: number;
    received: number;
    lossPercent: number;
    totalTimeMs: number;
    min: number;
    avg: number;
    max: number;
    mdev: number;
  } | null>(null);

  const [activeTokenHighlight, setActiveTokenHighlight] = useState<string | null>('target_ip');

  const timeoutRef = useRef<any>(null);

  // Exact screenshot values for one-click matching
  const loadExactScreenshotData = () => {
    setIsPinging(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setTargetIp('192.168.1.254');
    const screenshotLines = [
      'cmnatic@CMNatic-THM-LPTOP:~$ ping 192.168.1.254',
      'PING 192.168.1.254 (192.168.1.254) 56(84) bytes of data.',
      '64 bytes from 192.168.1.254: icmp_seq=1 ttl=63 time=2.18 ms',
      '64 bytes from 192.168.1.254: icmp_seq=2 ttl=63 time=2.53 ms',
      '64 bytes from 192.168.1.254: icmp_seq=3 ttl=63 time=2.15 ms',
      '64 bytes from 192.168.1.254: icmp_seq=4 ttl=63 time=3.34 ms',
      '64 bytes from 192.168.1.254: icmp_seq=5 ttl=63 time=10.3 ms',
      '64 bytes from 192.168.1.254: icmp_seq=6 ttl=63 time=4.45 ms',
      '^C',
      '--- 192.168.1.254 ping statistics ---',
      '6 packets transmitted, 6 received, 0% packet loss, time 5008ms',
      'rtt min/avg/max/mdev = 2.152/4.160/10.313/2.864 ms',
      'cmnatic@CMNatic-THM-LPTOP:~$'
    ];

    setTerminalLines(screenshotLines);
    setPingRecords([
      { seq: 1, bytes: 64, ip: '192.168.1.254', ttl: 63, timeMs: 2.18, rawText: '64 bytes from 192.168.1.254: icmp_seq=1 ttl=63 time=2.18 ms' },
      { seq: 2, bytes: 64, ip: '192.168.1.254', ttl: 63, timeMs: 2.53, rawText: '64 bytes from 192.168.1.254: icmp_seq=2 ttl=63 time=2.53 ms' },
      { seq: 3, bytes: 64, ip: '192.168.1.254', ttl: 63, timeMs: 2.15, rawText: '64 bytes from 192.168.1.254: icmp_seq=3 ttl=63 time=2.15 ms' },
      { seq: 4, bytes: 64, ip: '192.168.1.254', ttl: 63, timeMs: 3.34, rawText: '64 bytes from 192.168.1.254: icmp_seq=4 ttl=63 time=3.34 ms' },
      { seq: 5, bytes: 64, ip: '192.168.1.254', ttl: 63, timeMs: 10.3, rawText: '64 bytes from 192.168.1.254: icmp_seq=5 ttl=63 time=10.3 ms' },
      { seq: 6, bytes: 64, ip: '192.168.1.254', ttl: 63, timeMs: 4.45, rawText: '64 bytes from 192.168.1.254: icmp_seq=6 ttl=63 time=4.45 ms' }
    ]);

    setStats({
      transmitted: 6,
      received: 6,
      lossPercent: 0,
      totalTimeMs: 5008,
      min: 2.152,
      avg: 4.160,
      max: 10.313,
      mdev: 2.864
    });
  };

  // Run initial load matching user's image
  useEffect(() => {
    loadExactScreenshotData();
  }, []);

  // Live Ping Simulator Execution
  const executeLivePing = () => {
    setIsPinging(true);
    setTerminalLines([
      `cmnatic@CMNatic-THM-LPTOP:~$ ping ${targetIp}`,
      `PING ${targetIp} (${targetIp}) 56(84) bytes of data.`
    ]);
    setPingRecords([]);
    setStats(null);

    let currentSeq = 1;
    const records: PingLine[] = [];
    const rttTimes: number[] = [];

    const sendNext = () => {
      if (currentSeq > pingCount) {
        // Complete
        setIsPinging(false);
        const received = records.filter(r => !r.isLoss).length;
        const lossPercent = Math.round(((pingCount - received) / pingCount) * 100);
        const totalDuration = (pingCount - 1) * 1000 + (rttTimes.length > 0 ? rttTimes[rttTimes.length - 1] : 0) + 8;

        let min = 0, avg = 0, max = 0, mdev = 0;
        if (rttTimes.length > 0) {
          min = Math.min(...rttTimes);
          max = Math.max(...rttTimes);
          avg = rttTimes.reduce((a, b) => a + b, 0) / rttTimes.length;
          const variance = rttTimes.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / rttTimes.length;
          mdev = Math.sqrt(variance);
        }

        setTerminalLines(prev => [
          ...prev,
          '^C',
          `--- ${targetIp} ping statistics ---`,
          `${pingCount} packets transmitted, ${received} received, ${lossPercent}% packet loss, time ${Math.round(totalDuration)}ms`,
          `rtt min/avg/max/mdev = ${min.toFixed(3)}/${avg.toFixed(3)}/${max.toFixed(3)}/${mdev.toFixed(3)} ms`,
          'cmnatic@CMNatic-THM-LPTOP:~$'
        ]);

        setStats({
          transmitted: pingCount,
          received,
          lossPercent,
          totalTimeMs: Math.round(totalDuration),
          min,
          avg,
          max,
          mdev
        });
        return;
      }

      // Generate latency based on scenario
      let timeMs = 2.0 + Math.random() * 2.5; // ~2-4ms
      let ttl = 63;
      let isLoss = false;
      let lineText = '';

      if (simScenario === 'timeout') {
        isLoss = true;
        lineText = `Request timeout for icmp_seq ${currentSeq}`;
      } else if (simScenario === 'unreachable') {
        isLoss = true;
        lineText = `From 192.168.1.1 icmp_seq=${currentSeq} Destination Host Unreachable`;
      } else if (simScenario === 'spike' && currentSeq === 5) {
        timeMs = 10.3; // mimic spike in screenshot
        lineText = `64 bytes from ${targetIp}: icmp_seq=${currentSeq} ttl=${ttl} time=${timeMs.toFixed(2)} ms`;
        rttTimes.push(timeMs);
      } else {
        if (currentSeq === 5) timeMs = 10.3;
        lineText = `64 bytes from ${targetIp}: icmp_seq=${currentSeq} ttl=${ttl} time=${timeMs.toFixed(2)} ms`;
        rttTimes.push(timeMs);
      }

      const record: PingLine = {
        seq: currentSeq,
        bytes: 64,
        ip: targetIp,
        ttl,
        timeMs,
        rawText: lineText,
        isLoss
      };

      records.push(record);
      setPingRecords([...records]);
      setTerminalLines(prev => [...prev, lineText]);

      currentSeq++;
      timeoutRef.current = setTimeout(sendNext, 850);
    };

    timeoutRef.current = setTimeout(sendNext, 400);
  };

  const tokenExplanations: Record<string, {
    titleEn: string;
    titleBn: string;
    descEn: string;
    descBn: string;
    formula?: string;
  }> = {
    target_ip: {
      titleEn: 'ping 192.168.1.254 (Target IP)',
      titleBn: 'ping 192.168.1.254 (টার্গেট আইপি)',
      descEn: 'The destination device IP address being probed (often the local default gateway router or remote server). Sends ICMP Echo Request packets (Type 8).',
      descBn: 'যে নির্দিষ্ট আইপিতে পিং পাঠিয়ে কানেকশন টেস্ট করা হচ্ছে। এটি সাধারণত লোকাল গেটওয়ে রাউটার বা কোনো সার্ভারের আইপি।'
    },
    bytes_header: {
      titleEn: '56(84) bytes of data',
      titleBn: '৫৬(৮৪) বাইট ডাটা (Header Math)',
      descEn: 'Why 56(84)? ICMP payload is 56 bytes. Added to 8 bytes ICMP header + 20 bytes IPv4 header = 84 total bytes on the physical wire!',
      descBn: 'কেন ৫৬(৮৪)? পিং এর আসল ডাটা পেলোড ৫৬ বাইট। এর সাথে ৮ বাইট ICMP হেডার এবং ২০ বাইট IPv4 হেডার মিলে তারের মধ্যে মোট ৮৪ বাইট হয় (৫৬ + ৮ + ২০ = ৮৪)।',
      formula: '56B (Payload) + 8B (ICMP Header) + 20B (IP Header) = 84 Bytes Frame'
    },
    bytes_returned: {
      titleEn: '64 bytes from 192.168.1.254',
      titleBn: '৬৪ বাইট ডাটা ফেরত (Echo Reply)',
      descEn: 'The size of the returned ICMP Echo Reply (Type 0). It contains 56 bytes of original timestamp/data plus 8 bytes of ICMP header = 64 bytes.',
      descBn: 'টার্গেট রাউটার থেকে সফলভাবে ফেরত আসা ICMP Echo Reply এর সাইজ (৫৬ বাইট ডাটা + ৮ বাইট ICMP হেডার = ৬৪ বাইট)।'
    },
    icmp_seq: {
      titleEn: 'icmp_seq=1, 2, 3... (Sequence Number)',
      titleBn: 'icmp_seq (সিকোয়েন্স নাম্বার)',
      descEn: 'Sequentially numbers each ICMP packet sent (1, 2, 3...). Used to track missing packets, calculate packet loss percentage, and detect out-of-order packets.',
      descBn: 'প্রতিটি পাঠানো প্যাকেটের ধারাবাহিক ক্রমিক নাম্বার। এর মাধ্যমে কোনো প্যাকেট হারালো কিনা (Packet Loss) তা সঠিকভাবে হিসাব করা হয়।'
    },
    ttl: {
      titleEn: 'ttl=63 (Time To Live & Router Hops)',
      titleBn: 'ttl=63 (টিটিএল ও রাউটার হপ)',
      descEn: 'Linux/Unix systems send packets with an initial TTL of 64. Because ttl=63, exactly 1 router hop decremented the TTL by 1! If target was on the exact same switch, it would be ttl=64; if Windows it would start at 128.',
      descBn: 'লিনাক্সের ডিফল্ট TTL থাকে ৬৪। এখানে ttl=63 হওয়ার অর্থ হলো প্যাকেটটি পথিমধ্যে ঠিক ১টি রাউটার অতিক্রম করেছে (৬৪ - ১ = ৬৩)!',
      formula: 'Initial TTL (64) - Router Hops (1) = TTL 63'
    },
    time_rtt: {
      titleEn: 'time=2.18 ms (Round-Trip Time / Latency)',
      titleBn: 'time=2.18 ms (রাউন্ড-ট্রিপ ল্যাটেন্সি)',
      descEn: 'Highlighted in red in your image! The time elapsed from when Host sent ICMP Echo Request until it received the Echo Reply. 2.18 ms indicates a very fast, healthy local connection.',
      descBn: 'আপনার ছবিতে লাল বাক্সে চিহ্নিত! কম্পিউটার থেকে রিকোয়েস্ট যাওয়া এবং রাউটার থেকে রিপ্লাই ফেরত আসার মোট সময় (মিলি-সেকেন্ডে)। ২.১৮ ms নির্দেশ করে সংযোগটি অত্যন্ত দ্রুত ও সুস্থ।'
    },
    total_time: {
      titleEn: 'time 5008ms (Total Test Duration)',
      titleBn: 'time 5008ms (মোট পরীক্ষার সময়)',
      descEn: 'Highlighted in red in your image! The total wall-clock duration of the test. Ping sleeps 1 second (1000ms) between probes. 5 sleep intervals (5000ms) + round trip latency = 5008ms.',
      descBn: 'আপনার ছবিতে লাল বক্সে চিহ্নিত! মোট ৬টি প্যাকেট পাঠানোর সম্পূর্ণ সময়। প্রতি প্যাকেটের মাঝে লিনাক্স ১ সেকেন্ড (১০০০ ms) অপেক্ষা করে। ৫টি বিরতি (৫০০০ ms) + সামান্য নেটওয়ার্ক ল্যাটেন্সি = ৫০৮ ms।'
    },
    packet_loss: {
      titleEn: '0% packet loss (Reliability Rate)',
      titleBn: '0% packet loss (প্যাকেট লস শতকরা হার)',
      descEn: 'All 6 packets were successfully acknowledged with zero dropouts. 0% indicates flawless physical cabling and uninhibited ICMP routing.',
      descBn: '৬টি প্যাকেটের ৬টিই সম্পূর্ণ অক্ষত অবস্থায় ফিরে এসেছে। ০% প্যাকেট লস মানে তার বা ওয়াই-ফাই সংযোগে কোনো বিঘ্ন নেই।'
    },
    rtt_stats: {
      titleEn: 'rtt min/avg/max/mdev = 2.152/4.160/10.313/2.864 ms',
      titleBn: 'min / avg / max / mdev পরিসংখ্যান',
      descEn: 'Statistical breakdown:\n• min: 2.152 ms (fastest response)\n• avg: 4.160 ms (average latency)\n• max: 10.313 ms (packet #5 latency spike)\n• mdev: 2.864 ms (Mean Deviation / Jitter)',
      descBn: 'পরিসংখ্যানগত হিসাব:\n• min: সর্বনিম্ন সময় (২.১৫২ ms)\n• avg: গড় সময় (৪.১৬০ ms)\n• max: সর্বোচ্চ সময় (১০.৩১৩ ms - প্যাকেট ৫ এ সামান্য ট্রাফিক স্পাইক)\n• mdev: জিটার বা ল্যাটেন্সির ওঠানামা (২.৮৬৪ ms)।'
    }
  };

  const currentToken = tokenExplanations[activeTokenHighlight || 'target_ip'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Ping & ICMP Protocol Deep-Dive Simulator' : 'পিং (Ping) কি, কীভাবে কাজ করে এবং সম্পূর্ণ টার্মিনাল ডিকনস্ট্রাকশন'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Examine every single parameter, header byte, TTL count, RTT latency (time=ms), and statistical calculation from your ping command.'
                  : 'আপনার টার্মিনাল স্ক্রিনশটের প্রতিটি লাইন, বাইট হিসাব, TTL=63, time=2.18ms এবং min/avg/max/mdev এর পূর্ণাঙ্গ ব্যাখ্যা ও লাইভ সিমুলেটর।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadExactScreenshotData}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono font-bold transition"
            >
              {lang === 'en' ? 'Load Screenshot Data' : 'স্ক্রিনশটের ডাটা লোড করুন'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Linux Terminal on Left, Dissection Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Linux Terminal Window (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
            {/* Terminal Window Top Bar */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-[11px] text-slate-400 ml-2 font-semibold">
                  cmnatic@CMNatic-THM-LPTOP: ~ (bash)
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">ICMP Socket Active</span>
            </div>

            {/* Terminal Screen Body */}
            <div className="p-4 space-y-1.5 text-slate-200 overflow-x-auto min-h-[360px] leading-relaxed">
              {terminalLines.map((line, idx) => {
                // Check if line matches prompt
                const isPrompt = line.includes('cmnatic@CMNatic-THM-LPTOP:~$');
                const isHeader = line.includes('PING 192.168.1.254');
                const isReply = line.includes('64 bytes from');
                const isStats = line.includes('ping statistics');
                const isPktLoss = line.includes('packets transmitted');
                const isRttMath = line.includes('rtt min/avg/max/mdev');

                return (
                  <div key={idx} className="flex items-center flex-wrap gap-1">
                    {isPrompt && (
                      <span className="text-emerald-400 font-bold">
                        {line.split('ping')[0]}
                      </span>
                    )}

                    {line.includes('ping') && isPrompt && (
                      <>
                        <span className="text-white">ping </span>
                        <button
                          onClick={() => setActiveTokenHighlight('target_ip')}
                          className="px-1 py-0.5 rounded bg-rose-950/80 border border-rose-500 text-rose-300 font-bold hover:bg-rose-900 transition"
                          title="Click to inspect Target IP"
                        >
                          {targetIp}
                        </button>
                      </>
                    )}

                    {isHeader && (
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-300">PING {targetIp} ({targetIp}) </span>
                        <button
                          onClick={() => setActiveTokenHighlight('bytes_header')}
                          className="px-1 py-0.5 rounded bg-blue-950/80 border border-blue-500 text-blue-300 font-bold hover:bg-blue-900 transition"
                          title="Click to inspect 56(84) Header Math"
                        >
                          56(84) bytes of data.
                        </button>
                      </div>
                    )}

                    {isReply && (
                      <div className="flex items-center flex-wrap gap-1 text-slate-300">
                        <button
                          onClick={() => setActiveTokenHighlight('bytes_returned')}
                          className="hover:text-cyan-300 transition"
                        >
                          64 bytes
                        </button>
                        <span>from {targetIp}:</span>

                        <button
                          onClick={() => setActiveTokenHighlight('icmp_seq')}
                          className="text-slate-400 hover:text-white"
                        >
                          icmp_seq={idx - 1}
                        </button>

                        <button
                          onClick={() => setActiveTokenHighlight('ttl')}
                          className="text-amber-400 font-bold hover:underline"
                        >
                          ttl=63
                        </button>

                        {/* Highlighted in user red box! */}
                        <button
                          onClick={() => setActiveTokenHighlight('time_rtt')}
                          className="px-1 py-0.2 rounded bg-rose-950/70 border border-rose-500 text-rose-300 font-bold hover:bg-rose-900 transition"
                          title="Click to inspect RTT latency"
                        >
                          {line.split('ttl=63 ')[1] || 'time=2.18 ms'}
                        </button>
                      </div>
                    )}

                    {line === '^C' && (
                      <span className="text-slate-500 font-bold">^C (SIGINT Interrupted)</span>
                    )}

                    {isStats && (
                      <span className="text-cyan-400 font-bold mt-2 block">{line}</span>
                    )}

                    {isPktLoss && (
                      <div className="flex items-center flex-wrap gap-1 text-slate-300">
                        <button
                          onClick={() => setActiveTokenHighlight('packet_loss')}
                          className="hover:text-emerald-400"
                        >
                          6 packets transmitted, 6 received, 0% packet loss,
                        </button>
                        {/* Highlighted in user red box! */}
                        <button
                          onClick={() => setActiveTokenHighlight('total_time')}
                          className="px-1 py-0.2 rounded bg-rose-950/70 border border-rose-500 text-rose-300 font-bold hover:bg-rose-900 transition"
                          title="Click to inspect total duration"
                        >
                          time 5008ms
                        </button>
                      </div>
                    )}

                    {isRttMath && (
                      <button
                        onClick={() => setActiveTokenHighlight('rtt_stats')}
                        className="text-emerald-300 font-bold hover:underline text-left block"
                      >
                        {line}
                      </button>
                    )}

                    {!isPrompt && !isHeader && !isReply && !isStats && !isPktLoss && !isRttMath && line !== '^C' && (
                      <span>{line}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Interactive Run Controller Bar */}
            <div className="bg-slate-900 p-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[11px]">Target:</span>
                <input
                  type="text"
                  value={targetIp}
                  onChange={(e) => setTargetIp(e.target.value)}
                  className="w-32 bg-slate-950 border border-slate-700 px-2 py-1 rounded text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Scenarios */}
              <div className="flex items-center gap-2">
                <select
                  value={simScenario}
                  onChange={(e) => setSimScenario(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 px-2.5 py-1 rounded text-[11px] text-slate-300 font-mono focus:outline-none focus:border-emerald-500"
                >
                  <option value="normal">Normal (0% Loss)</option>
                  <option value="spike">Latency Spike (Packet 5: 10.3ms)</option>
                  <option value="timeout">Request Timeout (Firewall Drop)</option>
                  <option value="unreachable">Host Unreachable (ARP Fail)</option>
                </select>

                <button
                  onClick={executeLivePing}
                  disabled={isPinging}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPinging ? 'Pinging...' : 'Run Live Ping'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Click Tokens Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            <span className="text-slate-500 uppercase font-semibold text-[10px] mr-1">
              Click to explain:
            </span>
            {[
              { id: 'target_ip', label: '192.168.1.254' },
              { id: 'bytes_header', label: '56(84) Bytes' },
              { id: 'time_rtt', label: 'time=2.18ms (Red Box 1)' },
              { id: 'ttl', label: 'ttl=63' },
              { id: 'total_time', label: 'time 5008ms (Red Box 2)' },
              { id: 'rtt_stats', label: 'mdev (Jitter)' },
              { id: 'packet_loss', label: '0% Loss' }
            ].map(token => (
              <button
                key={token.id}
                onClick={() => setActiveTokenHighlight(token.id)}
                className={`px-2 py-0.5 rounded transition ${
                  activeTokenHighlight === token.id
                    ? 'bg-rose-500 text-white font-bold shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {token.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Parameter Deep Dissection Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4 sticky top-20">
            <div className="pb-3 border-b border-slate-800">
              <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 block mb-1">
                Screenshot Dissection Inspector
              </span>
              <h3 className="text-base font-bold text-white">
                {currentToken.titleEn}
              </h3>
              <span className="text-xs text-emerald-400 font-medium block mt-0.5">
                {currentToken.titleBn}
              </span>
            </div>

            {/* Explanation Body */}
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p className="bg-slate-950 p-3 rounded-lg border border-slate-800 whitespace-pre-line">
                {lang === 'en' ? currentToken.descEn : currentToken.descBn}
              </p>

              {currentToken.formula && (
                <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/50 font-mono text-[11px] text-blue-300">
                  <span className="text-slate-400 text-[10px] uppercase block mb-0.5">Formula / Header Breakdown:</span>
                  <strong>{currentToken.formula}</strong>
                </div>
              )}
            </div>

            {/* Underlying Protocol: ICMP RFC 792 */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                <span>ICMP Protocol (Internet Control Message Protocol)</span>
              </div>
              <ul className="space-y-1 text-[11px] text-slate-400 font-mono">
                <li>• Layer: <strong className="text-slate-200">Layer 3 (Network Layer)</strong></li>
                <li>• IP Protocol Number: <strong className="text-cyan-400">1 (ICMP)</strong></li>
                <li>• Echo Request: <strong className="text-emerald-400">Type 8, Code 0</strong></li>
                <li>• Echo Reply: <strong className="text-purple-400">Type 0, Code 0</strong></li>
                <li>• Port Number: <strong className="text-amber-400">None! (ICMP does not use TCP/UDP ports)</strong></li>
              </ul>
            </div>

            {/* Why did Packet 5 spike to 10.3ms? */}
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-900/50 text-xs text-amber-200 space-y-1">
              <div className="flex items-center gap-1 font-bold text-amber-300">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>Why did packet #5 spike to 10.3 ms in your image?</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {lang === 'en'
                  ? 'Packets 1-4 took 2-3ms, but packet #5 took 10.3ms. This is caused by temporary wireless interference, router CPU scheduling, or bufferbloat. This is why "mdev" (mean deviation / jitter) is calculated!'
                  : 'প্যাকেট ১-৪ মাত্র ২-৩ ms এ আসলেও প্যাকেট ৫ এ ১০.৩ ms লেগেছে। ওয়াই-ফাই তরঙ্গে ক্ষণিক বাধা বা রাউটারের সিপিইউ অন্য কাজে ব্যস্ত থাকায় এই সাময়িক দেরি (Jitter) হয়।'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
