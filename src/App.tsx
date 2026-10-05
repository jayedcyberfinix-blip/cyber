import React, { useState, useEffect, useRef } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { OSISimulator } from './components/OSISimulator';
import { NetworkDashboard } from './components/NetworkDashboard';
import { IPAddressTool } from './components/IPAddressTool';
import { ProtocolsDirectory } from './components/ProtocolsDirectory';
import { PacketInspector } from './components/PacketInspector';
import { FirewallIDS } from './components/FirewallIDS';
import { PortForwarding } from './components/PortForwarding';
import { TcpUdpMonitor } from './components/TcpUdpMonitor';
import { NetworkTypesGuide } from './components/NetworkTypesGuide';
import { MacSpoofing } from './components/MacSpoofing';
import { HotspotIpConflict } from './components/HotspotIpConflict';
import { PingVisualizer } from './components/PingVisualizer';
import { Language, Packet, NetworkProtocol, PacketStatus } from './types/network';

// Initial synthetic packets
const INITIAL_PACKETS: Packet[] = [
  {
    id: 'pkt-901',
    timestamp: '10:55:01',
    srcIp: '192.168.1.50',
    dstIp: '142.250.190.46',
    srcPort: 54101,
    dstPort: 443,
    protocol: 'HTTPS',
    length: 512,
    payloadPreview: 'TLSv1.3 Client Hello (SNI: www.google.com)',
    status: 'ALLOWED',
    latencyMs: 14,
    flags: ['SYN', 'ACK'],
    ttl: 64
  },
  {
    id: 'pkt-902',
    timestamp: '10:55:02',
    srcIp: '192.168.1.50',
    dstIp: '8.8.8.8',
    srcPort: 53102,
    dstPort: 53,
    protocol: 'DNS',
    length: 68,
    payloadPreview: 'Standard query 0x1a2b A api.github.com',
    status: 'ALLOWED',
    latencyMs: 9,
    ttl: 64
  },
  {
    id: 'pkt-903',
    timestamp: '10:55:03',
    srcIp: '185.220.101.44',
    dstIp: '203.0.113.195',
    srcPort: 48912,
    dstPort: 23,
    protocol: 'TCP',
    length: 60,
    payloadPreview: 'TCP [SYN] to Telnet (Cleartext admin probe)',
    status: 'DROPPED',
    matchedRule: 'Block Inbound Telnet (Insecure)',
    latencyMs: 2,
    isThreat: true,
    threatType: 'Insecure Protocol Scan'
  },
  {
    id: 'pkt-904',
    timestamp: '10:55:04',
    srcIp: '192.168.1.50',
    dstIp: '140.82.113.4',
    srcPort: 54110,
    dstPort: 22,
    protocol: 'SSH',
    length: 1040,
    payloadPreview: 'SSH-2.0-OpenSSH_9.0 Encrypted Transport',
    status: 'ALLOWED',
    latencyMs: 21,
    flags: ['PSH', 'ACK']
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('osi');
  const [lang, setLang] = useState<Language>('en');
  const [isTrafficRunning, setIsTrafficRunning] = useState<boolean>(true);
  const [livePackets, setLivePackets] = useState<Packet[]>(INITIAL_PACKETS);
  const [packetRate, setPacketRate] = useState<number>(4);

  // Background Traffic Generator
  useEffect(() => {
    if (!isTrafficRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      const protocols: NetworkProtocol[] = ['HTTPS', 'HTTP', 'DNS', 'TCP', 'UDP', 'SSH', 'ICMP'];
      const chosenProto = protocols[Math.floor(Math.random() * protocols.length)];

      const isThreatRandom = Math.random() < 0.12; // 12% probability of a malicious packet / port scan
      let srcIp = `192.168.1.${Math.floor(Math.random() * 80) + 10}`;
      let dstIp = chosenProto === 'DNS' ? '8.8.8.8' : chosenProto === 'HTTPS' ? '142.250.190.46' : '104.21.34.19';
      let dstPort = 443;
      let status: PacketStatus = 'ALLOWED';
      let payloadPreview = 'Data payload transfer';

      if (chosenProto === 'DNS') {
        dstPort = 53;
        payloadPreview = 'Query A domain.example.org IN';
      } else if (chosenProto === 'HTTP') {
        dstPort = 80;
        payloadPreview = 'GET /api/v1/metrics HTTP/1.1';
      } else if (chosenProto === 'SSH') {
        dstPort = 22;
        payloadPreview = 'SSH-2.0 Key Exchange Diffie-Hellman';
      } else if (chosenProto === 'ICMP') {
        dstPort = 0;
        payloadPreview = 'Echo (ping) request id=0x0041 seq=1';
      }

      if (isThreatRandom) {
        srcIp = `185.191.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 250)}`;
        dstPort = Math.random() > 0.5 ? 23 : 445;
        status = 'DROPPED';
        payloadPreview = dstPort === 23 ? 'Inbound Telnet scan attempt' : 'SMB exploit probe (Port 445)';
      }

      const newPacket: Packet = {
        id: `pkt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: timeStr,
        srcIp,
        dstIp,
        srcPort: Math.floor(Math.random() * 30000) + 30000,
        dstPort,
        protocol: chosenProto,
        length: Math.floor(Math.random() * 1200) + 64,
        payloadPreview,
        status,
        latencyMs: Math.floor(Math.random() * 35) + 5,
        flags: ['ACK'],
        ttl: 64,
        isThreat: isThreatRandom,
        threatType: isThreatRandom ? 'Firewall ACL Violation' : undefined
      };

      setLivePackets(prev => [newPacket, ...prev.slice(0, 79)]); // Keep last 80 packets
    }, 1000);

    return () => clearInterval(interval);
  }, [isTrafficRunning]);

  const handleClearLogs = () => {
    setLivePackets([]);
  };

  const handleSimulateCustomEvent = (type: string) => {
    const now = new Date().toTimeString().split(' ')[0];
    const newPacket: Packet = {
      id: `pkt-${Date.now()}`,
      timestamp: now,
      srcIp: '198.51.100.99',
      dstIp: '203.0.113.195',
      srcPort: 49120,
      dstPort: type === 'TELNET' ? 23 : 443,
      protocol: 'TCP',
      length: 840,
      payloadPreview: `Simulated Attack: ${type}`,
      status: 'DROPPED',
      latencyMs: 2,
      isThreat: true,
      threatType: type
    };
    setLivePackets(prev => [newPacket, ...prev.slice(0, 79)]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        isTrafficRunning={isTrafficRunning}
        setIsTrafficRunning={setIsTrafficRunning}
        packetRate={packetRate}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-6">
        {activeTab === 'ping' && <PingVisualizer lang={lang} />}
        {activeTab === 'osi' && <OSISimulator lang={lang} />}
        {activeTab === 'net_types' && <NetworkTypesGuide lang={lang} />}
        {activeTab === 'mac_spoof' && <MacSpoofing lang={lang} />}
        {activeTab === 'hotspot_conflict' && <HotspotIpConflict lang={lang} />}
        {activeTab === 'traffic' && (
          <NetworkDashboard
            lang={lang}
            livePackets={livePackets}
            isTrafficRunning={isTrafficRunning}
            packetRate={packetRate}
          />
        )}
        {activeTab === 'ip' && <IPAddressTool lang={lang} />}
        {activeTab === 'protocols' && <ProtocolsDirectory lang={lang} />}
        {activeTab === 'headers' && <PacketInspector lang={lang} />}
        {activeTab === 'firewall' && (
          <FirewallIDS
            lang={lang}
            onSimulateEvent={handleSimulateCustomEvent}
          />
        )}
        {activeTab === 'portforward' && <PortForwarding lang={lang} />}
        {activeTab === 'tcpudp' && (
          <TcpUdpMonitor
            lang={lang}
            livePackets={livePackets}
            onClearLogs={handleClearLogs}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 text-slate-500 text-xs py-4 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-semibold text-slate-400">NetSim Pro v2.4</span>
            <span className="text-slate-700">•</span>
            <span>{lang === 'en' ? 'Interactive Networking & Cyber Defense Simulator' : 'ওএসআই মডেল ও নেটওয়ার্ক ট্রাফিক সিমুলেটর'}</span>
            <span className="text-slate-700">•</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-medium shadow-sm">
              <span>Created by</span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Jayed</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>RFC 791 / 793 / 8200 Compliant</span>
            <span>•</span>
            <span>TCP / UDP / IP Engine</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">100% Real-Time Sandbox</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
