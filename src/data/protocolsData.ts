import { ProtocolDirectoryItem } from '../types/network';

export const PROTOCOL_DIRECTORY: ProtocolDirectoryItem[] = [
  {
    port: 20,
    protocol: 'FTP Data',
    fullName: 'File Transfer Protocol (Data Channel)',
    transport: 'TCP',
    layer: 7,
    category: 'File',
    descEn: 'Transfers actual file contents between client and server in active FTP mode.',
    descBn: 'অ্যাক্টিভ এফটিপি মোডে ক্লায়েন্ট ও সার্ভারের মধ্যে মূল ফাইল ডাটা স্থানান্তর করে।',
    securityNote: 'Transmits unencrypted plaintext. Highly recommended to use SFTP (Port 22) or FTPS instead.'
  },
  {
    port: 21,
    protocol: 'FTP Control',
    fullName: 'File Transfer Protocol (Control Command)',
    transport: 'TCP',
    layer: 7,
    category: 'File',
    descEn: 'Authenticates user and sends control commands (USER, PASS, LIST, RETR).',
    descBn: 'এফটিপি সংযোগ স্থাপন, ইউজার পাসওয়ার্ড প্রমাণীকরণ এবং কমান্ড পাঠাতে ব্যবহৃত হয়।',
    securityNote: 'Credentials transmitted in cleartext. Vulnerable to packet sniffing.'
  },
  {
    port: 22,
    protocol: 'SSH / SFTP',
    fullName: 'Secure Shell / Secure FTP',
    transport: 'TCP',
    layer: 7,
    category: 'Remote',
    descEn: 'Encrypted remote command-line login, shell access, port forwarding, and secure file transfer.',
    descBn: 'এনক্রিপ্টেড রিমোট সার্ভার ম্যানেজমেন্ট, টার্মিনাল এক্সেস এবং সুরক্ষিত ফাইল ট্রান্সফার।',
    securityNote: 'Industry standard for secure remote admin. Defends against eavesdropping via strong public key cryptography.'
  },
  {
    port: 23,
    protocol: 'Telnet',
    fullName: 'Teletype Network',
    transport: 'TCP',
    layer: 7,
    category: 'Remote',
    descEn: 'Legacy unencrypted terminal emulation protocol for remote device configuration.',
    descBn: 'পুরোনো আন-এনক্রিপ্টেড রিমোট কনসোল প্রোটোকল। বর্তমানে ঝুঁকিপূর্ণ বিবেচিত হয়।',
    securityNote: 'CRITICAL RISK: Everything including passwords travels in plain text. Replaced by SSH.'
  },
  {
    port: 25,
    protocol: 'SMTP',
    fullName: 'Simple Mail Transfer Protocol',
    transport: 'TCP',
    layer: 7,
    category: 'Mail',
    descEn: 'Transfers outgoing emails between mail transfer agents (MTAs) across servers.',
    descBn: 'সার্ভার টু সার্ভার ইমেইল পাঠানোর মূল প্রোটোকল।',
    securityNote: 'Modern implementations use STARTTLS or SMTPS (Port 587/465) to prevent spam and intercepting.'
  },
  {
    port: 53,
    protocol: 'DNS',
    fullName: 'Domain Name System',
    transport: 'TCP/UDP',
    layer: 7,
    category: 'Infrastructure',
    descEn: 'Resolves human-readable domain names (e.g. google.com) into IP addresses (142.250.x.x). UDP for fast queries, TCP for zone transfers >512B.',
    descBn: 'ডোমেইন নামকে কম্পিউটারের বোঝার উপযোগী আইপি অ্যাড্রেসে রূপান্তর করে। ছোট কোয়েরিতে UDP এবং বড় জোনে TCP ব্যবহার করে।',
    securityNote: 'Subject to DNS Spoofing / Cache Poisoning and DDoS Amplification. Use DNSSEC and DoH (DNS over HTTPS).'
  },
  {
    port: 67,
    protocol: 'DHCP Server',
    fullName: 'Dynamic Host Configuration Protocol (Server)',
    transport: 'UDP',
    layer: 7,
    category: 'Infrastructure',
    descEn: 'Automatically leases IP addresses, subnet masks, default gateways, and DNS servers to clients.',
    descBn: 'নেটওয়ার্কের নতুন ডিভাইসকে স্বয়ংক্রিয়ভাবে আইপি অ্যাড্রেস, গেটওয়ে এবং ডিএনএস বরাদ্দ দেয়।',
    securityNote: 'Rogue DHCP servers can perform MitM attacks. Use DHCP Snooping on switches.'
  },
  {
    port: 68,
    protocol: 'DHCP Client',
    fullName: 'Dynamic Host Configuration Protocol (Client)',
    transport: 'UDP',
    layer: 7,
    category: 'Infrastructure',
    descEn: 'Client port listening for DHCP Offer and DHCP ACK messages from routers/servers.',
    descBn: 'ক্লায়েন্ট পোর্ট যা রাউটার থেকে আইপি কনফিগারেশন গ্রহণ করে।',
    securityNote: 'Client side of the DORA process (Discover, Offer, Request, Acknowledge).'
  },
  {
    port: 80,
    protocol: 'HTTP',
    fullName: 'Hypertext Transfer Protocol',
    transport: 'TCP',
    layer: 7,
    category: 'Web',
    descEn: 'The foundational protocol of the World Wide Web for transferring web pages, images, and API data.',
    descBn: 'ওয়ার্ল্ড ওয়াইড ওয়েবের মূল ভিত্তি। ওয়েব পেজ, ছবি ও তথ্য ব্রাউজারে আনতে ব্যবহৃত হয়।',
    securityNote: 'Unencrypted plaintext. Anyone sniffing traffic sees cookies, passwords, and sessions. Always redirect to HTTPS.'
  },
  {
    port: 110,
    protocol: 'POP3',
    fullName: 'Post Office Protocol version 3',
    transport: 'TCP',
    layer: 7,
    category: 'Mail',
    descEn: 'Retrieves emails from a remote server to a local client and typically deletes them from server.',
    descBn: 'সার্ভার থেকে লোকাল কম্পিউটারে ইমেইল ডাউনলোড করে পড়ার পুরোনো প্রোটোকল।',
    securityNote: 'Use POP3S (Port 995 with SSL/TLS) or modern IMAP.'
  },
  {
    port: 123,
    protocol: 'NTP',
    fullName: 'Network Time Protocol',
    transport: 'UDP',
    layer: 7,
    category: 'Infrastructure',
    descEn: 'Synchronizes clock timestamps of computers to millisecond precision across packet-switched networks.',
    descBn: 'নেটওয়ার্কের সব কম্পিউটারের সময় ও ঘড়িকে মিলি-সেকেন্ড নির্ভুলতায় মিলিয়ে রাখে।',
    securityNote: 'Often abused for high-amplification UDP DDoS reflection attacks.'
  },
  {
    port: 143,
    protocol: 'IMAP',
    fullName: 'Internet Message Access Protocol',
    transport: 'TCP',
    layer: 7,
    category: 'Mail',
    descEn: 'Retrieves and synchronizes emails across multiple devices while keeping mail stored on server.',
    descBn: 'একাধিক ডিভাইস থেকে একযোগে ইমেইল সিনক্রোনাইজ ও ম্যানেজ করার প্রোটোকল।',
    securityNote: 'Use IMAPS (Port 993 with TLS encryption) for privacy.'
  },
  {
    port: 161,
    protocol: 'SNMP',
    fullName: 'Simple Network Management Protocol',
    transport: 'UDP',
    layer: 7,
    category: 'Infrastructure',
    descEn: 'Monitors and collects telemetry metrics from routers, switches, servers, and IoT equipment.',
    descBn: 'রাউটার, সুইচ এবং সার্ভারের হেলথ, ট্রাফিক এবং পারফরম্যান্স মনিটর করে।',
    securityNote: 'SNMP v1/v2c use plaintext community strings (public/private). Always enforce SNMPv3 with auth and AES encryption.'
  },
  {
    port: 443,
    protocol: 'HTTPS',
    fullName: 'Hypertext Transfer Protocol Secure (TLS/SSL)',
    transport: 'TCP',
    layer: 7,
    category: 'Web',
    descEn: 'HTTP encrypted via TLS (Transport Layer Security). Safeguards web sessions, logins, payments, and APIs.',
    descBn: 'ওয়েব ট্রাফিকের সবচেয়ে নিরাপদ রূপ। টিএলএস এনক্রিপশনের মাধ্যমে পাসওয়ার্ড, পেমেন্ট ও ব্রাউজিং সুরক্ষিত রাখে।',
    securityNote: 'Mandatory standard for all modern web communication. Enforces privacy and server authenticity.'
  },
  {
    port: 445,
    protocol: 'SMB',
    fullName: 'Server Message Block',
    transport: 'TCP',
    layer: 7,
    category: 'File',
    descEn: 'Windows native network file sharing, printer sharing, and named pipe communication.',
    descBn: 'উইন্ডোজ ফাইল শেয়ারিং এবং প্রিন্টার শেয়ারিং এর নিজস্ব প্রোটোকল।',
    securityNote: 'Infamous target for WannaCry / EternalBlue exploits. Never expose port 445 to the public internet!'
  },
  {
    port: 3389,
    protocol: 'RDP',
    fullName: 'Remote Desktop Protocol',
    transport: 'TCP',
    layer: 7,
    category: 'Remote',
    descEn: 'Microsoft proprietary protocol providing a graphical user interface to connect to another computer.',
    descBn: 'মাইক্রোসফট রিমোট ডেস্কটপ প্রোটোকল যা দিয়ে দূর থেকে সম্পূর্ণ গ্রাফিক্যাল কম্পিউটার কন্ট্রোল করা যায়।',
    securityNote: 'Primary ransomware vector through brute-force attacks and BlueKeep CVE. Enforce VPN and NLA (Network Level Auth).'
  },
  {
    port: 3306,
    protocol: 'MySQL',
    fullName: 'MySQL Database Server',
    transport: 'TCP',
    layer: 7,
    category: 'Database',
    descEn: 'Relational database communication channel between web backend applications and MySQL / MariaDB server.',
    descBn: 'ওয়েব অ্যাপ্লিকেশন এবং মাইএসকিউএল ডাটাবেজের মধ্যে তথ্য আদান-প্রদান করে।',
    securityNote: 'Keep closed to WAN. Allow only internal localhost / VPC connections.'
  },
  {
    port: 5432,
    protocol: 'PostgreSQL',
    fullName: 'PostgreSQL Database Engine',
    transport: 'TCP',
    layer: 7,
    category: 'Database',
    descEn: 'PostgreSQL object-relational database listener port for client drivers and query execution.',
    descBn: 'পোস্টগ্রেসকিউএল ডাটাবেজ কানেকশন পোর্ট।',
    securityNote: 'Bind strictly to private IP or loopback with SSL certificate verification.'
  },
  {
    port: 8080,
    protocol: 'HTTP Alternate / Proxy',
    fullName: 'Alternative HTTP & Tomcat / Proxy Port',
    transport: 'TCP',
    layer: 7,
    category: 'Web',
    descEn: 'Commonly used as secondary HTTP web server port, development testing, and caching proxies.',
    descBn: 'ওয়েব সার্ভার টেস্টিং, ডকার কন্টেইনার এবং প্রক্সি সার্ভারে বহুল ব্যবহৃত বিকল্প পোর্ট।',
    securityNote: 'Check that staging or dev admin consoles are not unintentionally exposed to the public internet.'
  }
];

export interface TcpUdpComparisonItem {
  featureEn: string;
  featureBn: string;
  tcp: string;
  udp: string;
  importanceEn: string;
  importanceBn: string;
}

export const TCP_UDP_COMPARISON: TcpUdpComparisonItem[] = [
  {
    featureEn: 'Connection Style',
    featureBn: 'কানেকশন ধরন',
    tcp: 'Connection-Oriented (3-Way Handshake SYN, SYN-ACK, ACK required before data transfer)',
    udp: 'Connectionless (Fire-and-forget, sends datagrams without handshake)',
    importanceEn: 'TCP guarantees both sides are ready; UDP achieves zero latency startup.',
    importanceBn: 'টিসিপিতে আগে সংযোগ নিশ্চিত হয়, ইউডিপিতে কোনো অপেক্ষা ছাড়াই সরাসরি ডাটা পাঠানো শুরু হয়।'
  },
  {
    featureEn: 'Reliability & Delivery',
    featureBn: 'নির্ভরযোগ্যতা ও প্রাপ্তির নিশ্চয়তা',
    tcp: '100% Guaranteed. Every byte acknowledged (ACK); lost segments are automatically retransmitted.',
    udp: 'Unreliable / Best-Effort. Lost packets are dropped forever without acknowledgement.',
    importanceEn: 'Critical files cannot lose bits; live video prefers skipping lost frames over freezing.',
    importanceBn: 'ফাইল বা ওয়েবে একটি বিট হারালেও চলে না (TCP), কিন্তু লাইভ স্ট্রিমিংয়ে ফ্রেম ড্রপ হলেও চলে (UDP)।'
  },
  {
    featureEn: 'Data Ordering',
    featureBn: 'ডাটার ক্রম বজায় রাখা',
    tcp: 'Strictly In-Order. Sequence numbers ensure packets are reassembled in original sequence.',
    udp: 'No Ordering. Packets may arrive out-of-order or duplicate.',
    importanceEn: 'Prevents scrambled text or corrupt software downloads.',
    importanceBn: 'টিসিপি উল্টাপাল্টা আসা প্যাকেটগুলোকে নাম্বারিং দেখে একদম আসল ক্রমানুসারে সাজায়।'
  },
  {
    featureEn: 'Speed & Latency',
    featureBn: 'গতি ও ল্যাটেন্সি',
    tcp: 'Slower due to handshake, acknowledgement round-trips, and congestion flow control.',
    udp: 'Ultra-fast and minimal latency. No acknowledgements or retransmission delays.',
    importanceEn: 'Gaming and VoIP stutter if TCP waits for retransmission; UDP delivers real-time feed.',
    importanceBn: 'ভিডিও কল বা অনলাইন গেমিংয়ে মিলি-সেকেন্ড গুরুত্বপূর্ণ, তাই ইউডিপির গতি অনেক বেশি উপযোগী।'
  },
  {
    featureEn: 'Header Overhead',
    featureBn: 'হেডার সাইজ ও ওভারহেড',
    tcp: '20 to 60 Bytes (Contains Ports, Sequence No, Ack No, Window, Checksum, Options, Flags).',
    udp: 'Only 8 Bytes (Source Port, Destination Port, Length, Checksum).',
    importanceEn: 'UDP saves huge bandwidth on high-frequency IoT sensors and DNS lookups.',
    importanceBn: 'ইউডিপি হেডার মাত্র ৮ বাইট হওয়ায় ব্যান্ডউইথ অপচয় হয় না।'
  },
  {
    featureEn: 'Flow & Congestion Control',
    featureBn: 'ফ্লো ও কনজেশন নিয়ন্ত্রণ',
    tcp: 'Yes (Sliding window, slow-start, congestion avoidance algorithms).',
    udp: 'None. UDP transmits at whatever rate the application provides, potentially saturating links.',
    importanceEn: 'TCP protects internet backbone from collapse; UDP must handle flow at app layer (e.g. QUIC).',
    importanceBn: 'টিসিপি ট্রাফিক জ্যাম বুঝলে গতি কমিয়ে দেয়, কিন্তু ইউডিপি কোনো কিছু না দেখে পাঠাতে থাকে।'
  },
  {
    featureEn: 'Typical Use Cases',
    featureBn: 'ব্যবহারের ক্ষেত্রসমূহ',
    tcp: 'Websites (HTTP/HTTPS), SSH, Email (SMTP/IMAP), File Transfer (FTP/SFTP), Databases.',
    udp: 'DNS Queries, DHCP, Live Video Streaming (WebRTC/RTP), Online Multiplayer Gaming, VoIP, NTP.',
    importanceEn: 'Use TCP when data accuracy is vital; use UDP when speed and real-time timing are paramount.',
    importanceBn: 'নির্ভুল তথ্যে TCP, আর রিয়েল-টাইম লাইভ যোগাযোগে UDP ব্যবহার হয়।'
  }
];
