import React, { useState, useMemo } from 'react';
import { 
  Binary, 
  Calculator, 
  Globe, 
  HelpCircle, 
  Check, 
  Copy, 
  Layers, 
  ShieldAlert,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Language } from '../types/network';

interface IPAddressToolProps {
  lang: Language;
}

export const IPAddressTool: React.FC<IPAddressToolProps> = ({ lang }) => {
  // Subnet Calculator States
  const [ipInput, setIpInput] = useState<string>('192.168.1.75');
  const [cidrPrefix, setCidrPrefix] = useState<number>(24);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // IPv6 Interactive State
  const [ipv6Input, setIpv6Input] = useState<string>('2001:0db8:0000:0000:0000:ff00:0042:8329');

  // IPv4 calculation helpers
  const subnetCalculation = useMemo(() => {
    try {
      const parts = ipInput.trim().split('.').map(Number);
      if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return null;
      }

      // Convert IP to 32-bit unsigned integer
      const ipInt = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;

      // Netmask
      const maskInt = cidrPrefix === 0 ? 0 : (0xFFFFFFFF << (32 - cidrPrefix)) >>> 0;
      const wildcardInt = (~maskInt) >>> 0;

      const networkInt = (ipInt & maskInt) >>> 0;
      const broadcastInt = (networkInt | wildcardInt) >>> 0;

      const intToIp = (val: number) => [
        (val >>> 24) & 255,
        (val >>> 16) & 255,
        (val >>> 8) & 255,
        val & 255
      ].join('.');

      const intToBinary = (val: number) => [
        ((val >>> 24) & 255).toString(2).padStart(8, '0'),
        ((val >>> 16) & 255).toString(2).padStart(8, '0'),
        ((val >>> 8) & 255).toString(2).padStart(8, '0'),
        (val & 255).toString(2).padStart(8, '0')
      ];

      const netmaskStr = intToIp(maskInt);
      const wildcardStr = intToIp(wildcardInt);
      const networkStr = intToIp(networkInt);
      const broadcastStr = intToIp(broadcastInt);

      let firstUsableStr = 'N/A';
      let lastUsableStr = 'N/A';
      let usableHosts = 0;

      if (cidrPrefix === 31) {
        // Point to point RFC 3021
        firstUsableStr = networkStr;
        lastUsableStr = broadcastStr;
        usableHosts = 2;
      } else if (cidrPrefix === 32) {
        firstUsableStr = networkStr;
        lastUsableStr = networkStr;
        usableHosts = 1;
      } else {
        firstUsableStr = intToIp(networkInt + 1);
        lastUsableStr = intToIp(broadcastInt - 1);
        usableHosts = Math.max(0, Math.pow(2, 32 - cidrPrefix) - 2);
      }

      // Determine Class
      let ipClass = 'Class A';
      if (parts[0] >= 128 && parts[0] <= 191) ipClass = 'Class B';
      else if (parts[0] >= 192 && parts[0] <= 223) ipClass = 'Class C';
      else if (parts[0] >= 224 && parts[0] <= 239) ipClass = 'Class D (Multicast)';
      else if (parts[0] >= 240) ipClass = 'Class E (Experimental)';

      // Determine Scope
      let isPrivate = false;
      let scopeDesc = 'Public Routable Internet IP';
      if (parts[0] === 10) {
        isPrivate = true;
        scopeDesc = 'RFC 1918 Private (10.0.0.0/8)';
      } else if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) {
        isPrivate = true;
        scopeDesc = 'RFC 1918 Private (172.16.0.0/12)';
      } else if (parts[0] === 192 && parts[1] === 168) {
        isPrivate = true;
        scopeDesc = 'RFC 1918 Private (192.168.0.0/16)';
      } else if (parts[0] === 127) {
        scopeDesc = 'Loopback (Localhost 127.0.0.1)';
      } else if (parts[0] === 169 && parts[1] === 254) {
        scopeDesc = 'APIPA (Automatic Private IP Link-Local)';
      }

      return {
        ip: ipInput,
        cidr: cidrPrefix,
        netmask: netmaskStr,
        wildcard: wildcardStr,
        network: networkStr,
        broadcast: broadcastStr,
        firstUsable: firstUsableStr,
        lastUsable: lastUsableStr,
        usableHosts,
        ipClass,
        isPrivate,
        scopeDesc,
        binaryIp: intToBinary(ipInt),
        binaryMask: intToBinary(maskInt)
      };
    } catch {
      return null;
    }
  }, [ipInput, cidrPrefix]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 1500);
  };

  // Compressed IPv6 logic
  const ipv6Analytics = useMemo(() => {
    try {
      const clean = ipv6Input.trim().toLowerCase();
      // Simple heuristic for IPv6 type
      let type = 'Global Unicast (2000::/3)';
      if (clean.startsWith('fe80:')) type = 'Link-Local Unicast (fe80::/10)';
      else if (clean.startsWith('fc') || clean.startsWith('fd')) type = 'Unique Local Address (fc00::/7)';
      else if (clean.startsWith('ff')) type = 'Multicast (ff00::/8)';
      else if (clean === '::1' || clean === '0:0:0:0:0:0:0:1') type = 'Loopback Address (::1)';
      else if (clean === '::') type = 'Unspecified Address (::)';

      // Shorthand compressed version
      const compressed = clean
        .replace(/0000:0000:0000:0000:0000/g, '::')
        .replace(/0000:0000:0000:0000/g, '::')
        .replace(/0000:0000:0000/g, '::')
        .replace(/0000:0000/g, '::')
        .replace(/:000/g, ':')
        .replace(/:00/g, ':')
        .replace(/:0([1-9a-f])/g, ':$1');

      return {
        original: ipv6Input,
        compressed: compressed || '2001:db8::ff00:42:8329',
        type
      };
    } catch {
      return { original: ipv6Input, compressed: ipv6Input, type: 'IPv6 Address' };
    }
  }, [ipv6Input]);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {lang === 'en' ? 'IP Addressing (IPv4 & IPv6) & Subnet Visualizer' : 'আইপি অ্যাড্রেসিং (IPv4 ও IPv6) এবং সাবনেট ক্যালকুলেটর'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {lang === 'en'
                ? 'Understand 32-bit dotted-decimal vs 128-bit hexadecimal addressing, CIDR notation, private RFC 1918 ranges, and binary masking.'
                : '৩২-বিট ডটেড ডেসিমাল এবং ১২৮-বিট হেক্সাডেসিমাল আইপি অ্যাড্রেসের কাঠামো, ক্লাস, প্রাইভেট রেঞ্জ এবং সাবনেট মাস্কিং এর রিয়েল-টাইম হিসাব।'}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Subnet Calculator Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              {lang === 'en' ? 'Interactive CIDR Subnet Calculator' : 'ইন্টারেক্টিভ সাবনেট ক্যালকুলেটর (CIDR)'}
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded">
            IPv4 32-Bit
          </span>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
          <div className="md:col-span-6 space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
              <span>{lang === 'en' ? 'IPv4 Address' : 'আইপি অ্যাড্রেস'}</span>
              <span className="text-[11px] text-slate-500">e.g. 192.168.1.1, 10.0.0.5</span>
            </label>
            <input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              placeholder="192.168.1.1"
            />
          </div>

          <div className="md:col-span-6 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-slate-300">
              <span>{lang === 'en' ? 'Subnet Mask / Prefix Length (CIDR):' : 'সাবনেট মাস্ক / প্রিফিক্স (CIDR):'}</span>
              <span className="font-mono text-cyan-400 font-bold">/{cidrPrefix} ({subnetCalculation?.netmask || ''})</span>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="range"
                min="8"
                max="32"
                value={cidrPrefix}
                onChange={(e) => setCidrPrefix(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="w-12 text-center text-xs font-mono font-bold bg-slate-800 border border-slate-700 py-1.5 rounded text-white">
                /{cidrPrefix}
              </span>
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        {subnetCalculation ? (
          <div className="mt-5 space-y-4">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">{lang === 'en' ? 'Usable Hosts' : 'ব্যবহারযোগ্য হোস্ট'}</span>
                <span className="text-lg font-mono font-bold text-emerald-400">
                  {subnetCalculation.usableHosts.toLocaleString()}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">{lang === 'en' ? 'Network Class' : 'আইপি ক্লাস'}</span>
                <span className="text-base font-semibold text-cyan-300">
                  {subnetCalculation.ipClass}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">{lang === 'en' ? 'IP Type' : 'আইপি ধরন'}</span>
                <span className={`text-xs font-semibold ${subnetCalculation.isPrivate ? 'text-amber-300' : 'text-blue-300'}`}>
                  {subnetCalculation.scopeDesc}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">{lang === 'en' ? 'Wildcard Mask' : 'ওয়াইল্ডকার্ড মাস্ক'}</span>
                <span className="text-sm font-mono text-purple-300">
                  {subnetCalculation.wildcard}
                </span>
              </div>
            </div>

            {/* Detailed Address Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">{lang === 'en' ? 'Network Address (Subnet ID)' : 'নেটওয়ার্ক অ্যাড্রেস'}</span>
                  <span className="text-sm text-cyan-300 font-bold">{subnetCalculation.network}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(subnetCalculation.network, 'network')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy"
                >
                  {copiedField === 'network' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">{lang === 'en' ? 'Directed Broadcast Address' : 'ব্রডকাস্ট অ্যাড্রেস'}</span>
                  <span className="text-sm text-amber-300 font-bold">{subnetCalculation.broadcast}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(subnetCalculation.broadcast, 'broadcast')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy"
                >
                  {copiedField === 'broadcast' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">{lang === 'en' ? 'First Usable Host IP' : 'প্রথম ব্যবহারযোগ্য হোস্ট আইপি'}</span>
                  <span className="text-sm text-emerald-300 font-bold">{subnetCalculation.firstUsable}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(subnetCalculation.firstUsable, 'first')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy"
                >
                  {copiedField === 'first' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">{lang === 'en' ? 'Last Usable Host IP' : 'শেষ ব্যবহারযোগ্য হোস্ট আইপি'}</span>
                  <span className="text-sm text-emerald-300 font-bold">{subnetCalculation.lastUsable}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(subnetCalculation.lastUsable, 'last')}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                  title="Copy"
                >
                  {copiedField === 'last' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Binary Bit-Level Breakdown */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>{lang === 'en' ? '32-Bit Binary Breakdown (Network Bits vs Host Bits)' : '৩২-বিট বাইনারি বিশ্লেষণ (নেটওয়ার্ক বিট বনাম হোস্ট বিট)'}</span>
                <span className="text-[11px] text-cyan-400">/{cidrPrefix} Prefix</span>
              </div>
              <div className="space-y-1.5 font-mono text-xs overflow-x-auto">
                <div className="flex items-center gap-2">
                  <span className="w-20 text-slate-400 shrink-0">IP (Binary):</span>
                  <div className="flex gap-1.5 text-slate-200">
                    {subnetCalculation.binaryIp.map((octet, oIdx) => (
                      <span key={oIdx} className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {octet}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-20 text-slate-400 shrink-0">Mask (Bits):</span>
                  <div className="flex gap-1.5">
                    {subnetCalculation.binaryMask.map((octet, oIdx) => (
                      <span key={oIdx} className="bg-cyan-950/60 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800/40">
                        {octet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {lang === 'en'
                  ? `First ${cidrPrefix} bits are allocated to the Network ID, leaving ${32 - cidrPrefix} bits for Host assignation (2^${32 - cidrPrefix} - 2 = ${subnetCalculation.usableHosts} usable).`
                  : `প্রথম ${cidrPrefix}টি বিট নেটওয়ার্কের জন্য নির্ধারিত, বাকি ${32 - cidrPrefix}টি বিট ডিভাইসগুলোকে দেওয়ার জন্য বরাদ্দ।`}
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-3 rounded-lg bg-red-950/30 border border-red-900/40 text-xs text-red-300 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{lang === 'en' ? 'Please enter a valid IPv4 address (e.g. 192.168.1.1).' : 'সঠিক IPv4 অ্যাড্রেস লিখুন (যেমন: 192.168.1.1)।'}</span>
          </div>
        )}
      </div>

      {/* IPv4 vs IPv6 Conceptual Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IPv4 Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span>IPv4 (Internet Protocol v4)</span>
            </h3>
            <span className="text-xs font-mono text-cyan-300 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
              32 Bits (4 Bytes)
            </span>
          </div>

          <div className="text-xs text-slate-300 space-y-2">
            <p>
              {lang === 'en'
                ? 'Total Address Space: 2^32 ≈ 4,294,967,296 (~4.3 Billion addresses). Format: 4 octets separated by dots (e.g. 172.217.16.206).'
                : 'মোট আইপি সংখ্যা: ৪.৩ বিলিয়ন। ৪টি অক্টেট দশমিক বিন্দু দিয়ে ভাগ করা থাকে। বিশ্বজুড়ে জনসংখ্যা ও ডিভাইসের তুলনায় অপ্রতুল হওয়ায় NAT এবং IPv6 এর আবির্ভাব ঘটে।'}
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[11px]">
              <div className="text-slate-400 font-semibold uppercase">{lang === 'en' ? 'RFC 1918 Private Ranges:' : 'প্রাইভেট আইপি রেঞ্জ (ল্যান নেটওয়ার্ক):'}</div>
              <div className="text-cyan-300">• Class A: 10.0.0.0 – 10.255.255.255 (/8)</div>
              <div className="text-cyan-300">• Class B: 172.16.0.0 – 172.31.255.255 (/12)</div>
              <div className="text-cyan-300">• Class C: 192.168.0.0 – 192.168.255.255 (/16)</div>
              <div className="text-amber-300">• Loopback: 127.0.0.1/8 (Localhost)</div>
              <div className="text-purple-300">• APIPA: 169.254.0.0/16 (DHCP failure)</div>
            </div>
          </div>
        </div>

        {/* IPv6 Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>IPv6 (Internet Protocol v6)</span>
            </h3>
            <span className="text-xs font-mono text-emerald-300 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
              128 Bits (16 Bytes)
            </span>
          </div>

          <div className="text-xs text-slate-300 space-y-2">
            <p>
              {lang === 'en'
                ? 'Total Address Space: 2^128 ≈ 3.4 × 10^38 addresses (virtually inexhaustible). Written in 8 groups of 4 hexadecimal digits (hextets).'
                : 'মোট আইপি সংখ্যা: ৩৪০ ট্রিলিয়ন ট্রিলিয়ন ট্রিলিয়ন! এতে কোনো NAT এর প্রয়োজন হয় না; প্রতিটি ডিভাইসের নিজস্ব পাবলিক ইউনিক গ্লোবাল আইপি সম্ভব।'}
            </p>

            {/* Interactive IPv6 Compression */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono text-[11px]">
              <div className="text-slate-400 font-semibold uppercase">{lang === 'en' ? 'IPv6 Shorthand / Compression Tool:' : 'IPv6 সংকোচন টুল:'}</div>
              <input
                type="text"
                value={ipv6Input}
                onChange={(e) => setIpv6Input(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 px-2 py-1 rounded text-emerald-300 text-xs focus:outline-none focus:border-emerald-500"
              />
              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <span>Compressed:</span>
                <span className="text-emerald-400 font-bold">{ipv6Analytics.compressed}</span>
              </div>
              <div className="text-[10px] text-indigo-300">
                Type: {ipv6Analytics.type}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
