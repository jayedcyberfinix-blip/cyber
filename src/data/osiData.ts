import { OSILayerInfo } from '../types/network';

export const OSI_LAYERS: OSILayerInfo[] = [
  {
    layer: 7,
    nameEn: 'Application Layer',
    nameBn: 'অ্যাপ্লিকেশন লেয়ার (Application Layer)',
    pdu: 'Data',
    pduBn: 'ডাটা (User Data)',
    color: '#8b5cf6', // purple
    bgColor: 'bg-purple-950/40',
    borderColor: 'border-purple-500/40',
    shortDescEn: 'Network access directly for end-user applications & human-computer interaction.',
    shortDescBn: 'ব্যবহারকারীর অ্যাপ্লিকেশন ও নেটওয়ার্কের মধ্যে সরাসরি ইন্টারফেস তৈরি করে।',
    fullDescEn: 'The Application Layer is the closest layer to the end user. It enables software applications to communicate over the network by providing high-level protocols for web browsing, email transmission, file transfer, and API communication. It does NOT mean the web browser software itself, but the protocols it uses (e.g., HTTP, DNS).',
    fullDescBn: 'অ্যাপ্লিকেশন লেয়ার ব্যবহারকারীর সবচেয়ে কাছাকাছি থাকা স্তর। এটি ওয়েব ব্রাউজিং, ইমেইল আদান-প্রদান এবং ফাইল স্থানান্তরের মতো নেটওয়ার্ক সেবা অ্যাপ্লিকেশনগুলোকে সরবরাহ করে। মনে রাখা জরুরি—ক্রোম বা ফায়ারফক্স ব্রাউজার নিজে লেয়ার ৭ নয়, বরং ব্রাউজারের ব্যবহৃত প্রোটোকলগুলো (HTTP, DNS) এই লেয়ারে কাজ করে।',
    functionsEn: [
      'Identifies communication partners & determines resource availability',
      'Synchronizes application communication & user authentication',
      'Provides standard protocols for web (HTTP/HTTPS), file exchange (FTP), email (SMTP/IMAP)',
      'Translates user requests into network requests'
    ],
    functionsBn: [
      'যোগাযোগকারী অংশীদার চিহ্নিতকরণ এবং রিসোর্সের প্রাপ্যতা যাচাই',
      'ব্যবহারকারীর অ্যাপ্লিকেশন ডেটা প্রস্তুত ও অনুরোধ জেনারেশন',
      'ওয়েব, ফাইল আদান-প্রদান ও ইমেইল প্রোটোকল পরিচালনা (HTTP, FTP, SMTP)',
      'নেটওয়ার্কের সাথে সরাসরি ইউজার ইন্টারফেস সংযোগ'
    ],
    protocols: ['HTTP', 'HTTPS', 'DNS', 'FTP', 'SSH', 'SMTP', 'DHCP', 'SNMP', 'Telnet', 'WebSocket'],
    devices: ['Application Gateways', 'Firewall (WAF / L7)', 'Reverse Proxies', 'Load Balancers'],
    devicesBn: ['ওয়েব অ্যাপ্লিকেশন ফায়ারওয়াল (WAF)', 'রিভার্স প্রক্সি (Nginx/Cloudflare)', 'গেটওয়ে'],
    headerAdded: 'Application Data Payload (HTTP Request / Response Body)',
    sampleHeaderData: {
      'Method': 'GET /index.html HTTP/1.1',
      'Host': 'api.example.com',
      'User-Agent': 'Mozilla/5.0 (Client)',
      'Accept': 'application/json, text/html'
    },
    securityAspectsEn: 'Subject to SQL Injection (SQLi), Cross-Site Scripting (XSS), CSRF, API abuse, and DDoS. Protected by Web Application Firewalls (WAF) and input validation.',
    securityAspectsBn: 'এখানে SQL Injection, XSS, CSRF এবং API অ্যাটাক ঘটে। সুরক্ষায় WAF ও ইনপুট স্যানিটাইজেশন ব্যবহৃত হয়।'
  },
  {
    layer: 6,
    nameEn: 'Presentation Layer',
    nameBn: 'প্রেজেন্টেশন লেয়ার (Presentation Layer)',
    pdu: 'Data (Formatted / Encrypted)',
    pduBn: 'ফরম্যাট করা ডাটা',
    color: '#ec4899', // pink
    bgColor: 'bg-pink-950/40',
    borderColor: 'border-pink-500/40',
    shortDescEn: 'Data translation, syntax formatting, SSL/TLS encryption, and data compression.',
    shortDescBn: 'ডাটা ট্রান্সলেশন, সিনট্যাক্স রূপান্তর, এনক্রিপশন (SSL/TLS) এবং কম্প্রেশন সম্পন্ন করে।',
    fullDescEn: 'The Presentation Layer acts as the network translator. Because different computer architectures represent data in different ways (ASCII, EBCDIC, little-endian, big-endian), this layer translates data into a uniform standard syntax. It is also responsible for cryptography (SSL/TLS encryption & decryption) and data compression (gzip, brotli, JPEG, MPEG).',
    fullDescBn: 'প্রেজেন্টেশন লেয়ার মূলত নেটওয়ার্কের অনুবাদক (Translator)। বিভিন্ন অপারেটিং সিস্টেমের ডেটা ফরম্যাট ভিন্ন হতে পারে; এই লেয়ার সেগুলোকে একটি সার্বজনীন ফরম্যাটে রূপান্তর করে। এছাড়াও ডেটা সুরক্ষা নিশ্চিত করতে এনক্রিপশন/ডিক্রিপশন (SSL/TLS) এবং ব্যান্ডউইথ বাঁচাতে কম্প্রেশন (Gzip) এই লেয়ারেই ঘটে।',
    functionsEn: [
      'Character-code translation (e.g., ASCII to EBCDIC, Unicode)',
      'Data Encryption & Decryption (TLS/SSL cryptographic handshakes)',
      'Data Compression & Decompression to optimize transmission bandwidth',
      'Media format handling (JPEG, PNG, MP3, MPEG, JSON serialization)'
    ],
    functionsBn: [
      'ক্যারেক্টার কোডিং রূপান্তর (যেমন ASCII, Unicode, JSON)',
      'এনক্রিপশন ও ডিক্রিপশন (TLS/SSL সুরক্ষা)',
      'ব্যান্ডউইথ বাঁচানোর জন্য ডেটা কম্প্রেশন (Gzip, Brotli)',
      'মিডিয়া ডেটা ফরম্যাটিং (JPEG, PNG, MP4)'
    ],
    protocols: ['TLS/SSL', 'MIME', 'JPEG', 'ASCII', 'EBCDIC', 'GZIP', 'JSON/XML'],
    devices: ['TLS Termination Proxies', 'Crypto Accelerators', 'Encoding Gateways'],
    devicesBn: ['টিএলএস অ্যাক্সিলারেটর', 'এসএসএল অফলোডার', 'এনকোডিং গেটওয়ে'],
    headerAdded: 'TLS / Encryption Envelope & Formatting Tags',
    sampleHeaderData: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Encoding': 'gzip',
      'TLS Version': 'TLSv1.3 (Cipher: AES_256_GCM)'
    },
    securityAspectsEn: 'Vulnerabilities include TLS downgrade attacks, Heartbleed, weak cipher suites, and Certificate Spoofing. Mitigated by modern TLS 1.3 and HSTS.',
    securityAspectsBn: 'এখানে ম্যান-ইন-দ্য-মিডল এবং দুর্বল সাইফার অ্যাটাক হতে পারে। TLS 1.3 ও শক্তিশালী সার্টিফিকেট ব্যবহার এর সমাধান।'
  },
  {
    layer: 5,
    nameEn: 'Session Layer',
    nameBn: 'সেশন লেয়ার (Session Layer)',
    pdu: 'Data (Session Managed)',
    pduBn: 'সেশন ডাটা',
    color: '#3b82f6', // blue
    bgColor: 'bg-blue-950/40',
    borderColor: 'border-blue-500/40',
    shortDescEn: 'Establishes, manages, synchronizes, and terminates sessions between applications.',
    shortDescBn: 'দুটি অ্যাপ্লিকেশনের মধ্যে যোগাযোগ স্থাপন, নিয়ন্ত্রণ, সিঙ্ক্রোনাইজ এবং সমাপ্ত করে।',
    fullDescEn: 'The Session Layer controls the dialogues (connections) between computers. It establishes, manages, and terminates the connections between the local and remote application. It provides for full-duplex, half-duplex, or simplex operation, and establishes checkpointing, adjournment, termination, and restart procedures (e.g., resuming an interrupted file download).',
    fullDescBn: 'সেশন লেয়ার দুটি ডিভাইসের মধ্যে সেশন তৈরি, বজায় রাখা এবং যোগাযোগ শেষ হলে তা বন্ধ করার কাজ করে। কোনো ফাইল ডাউনলোড করার মাঝে লাইন কেটে গেলে যাতে প্রথম থেকে শুরু না হয়ে আগের পয়েন্ট থেকে শুরু হতে পারে (Checkpointing), তা এই লেয়ারের মাধ্যমেই সম্ভব হয়।',
    functionsEn: [
      'Session Establishment, Maintenance, and Graceful Teardown',
      'Dialogue Control (Determines whether communication is Simplex, Half-Duplex, or Full-Duplex)',
      'Synchronization checkpoints for long data streams (allows resume on disconnect)',
      'Token management to prevent simultaneous conflicting actions'
    ],
    functionsBn: [
      'সেশন তৈরি, রক্ষণাবেক্ষণ ও সুন্দরভাবে বন্ধ করা',
      'ডায়লগ কন্ট্রোল (সিমপ্লেক্স, হাফ-ডুপ্লেক্স অথবা ফুল-ডুপ্লেক্স নির্ধারণ)',
      'চেকপয়েন্ট স্থাপন যাতে যোগাযোগ বিচ্ছিন্ন হলে পুনরায় সচল করা যায়',
      'টোকেন ম্যানেজমেন্ট ও এক্সেস নিয়ন্ত্রণ'
    ],
    protocols: ['NetBIOS', 'RPC (Remote Procedure Call)', 'PPTP', 'Sockets API', 'SIP', 'SMB'],
    devices: ['Session Border Controllers (SBC)', 'RPC Brokers', 'Gateways'],
    devicesBn: ['সেশন বর্ডার কন্ট্রোলার (SBC)', 'আরপিসি ব্রোকার'],
    headerAdded: 'Session ID & Synchronization Markers',
    sampleHeaderData: {
      'Session-ID': 'sess_99a8b1c4e23',
      'Sync-Checkpoint': '#4 (Byte offset: 1048576)',
      'Dialogue-Mode': 'Full-Duplex'
    },
    securityAspectsEn: 'Risks include Session Hijacking, Session Fixation, and Man-in-the-Middle (MitM) token theft. Protected by secure random session IDs and HTTP-only cookie flags.',
    securityAspectsBn: 'সেশন হাইজ্যাকিং ও টোকেন চুরির ঝুঁকি থাকে। সুরক্ষিত র‍্যান্ডম সেশন আইডি ও এইচটিটিপি-অনলি কুকিজ সুরক্ষায় লাগে।'
  },
  {
    layer: 4,
    nameEn: 'Transport Layer',
    nameBn: 'ট্রান্সপোর্ট লেয়ার (Transport Layer)',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    pduBn: 'সেগমেন্ট (TCP) / ডাটাগ্রাম (UDP)',
    color: '#06b6d4', // cyan
    bgColor: 'bg-cyan-950/40',
    borderColor: 'border-cyan-500/40',
    shortDescEn: 'End-to-end host communication, port-to-port delivery, flow control, & error checking.',
    shortDescBn: 'এন্ড-টু-এন্ড যোগাযোগ, পোর্ট অ্যাড্রেসিং, সিকোয়েন্সিং, ফ্লো ও এরর কন্ট্রোল।',
    fullDescEn: 'The Transport Layer provides transparent transfer of data between end systems. It is responsible for end-to-end error recovery and flow control. It uses Port Numbers (0-65535) to direct data to the correct application process. The two dominant protocols are TCP (reliable, connection-oriented, ordered, with 3-way handshake) and UDP (fast, connectionless, lightweight).',
    fullDescBn: 'ট্রান্সপোর্ট লেয়ার একটি ডিভাইস থেকে অন্য ডিভাইসে ডেটা পৌঁছে দেওয়ার দায়িত্ব নেয়। এটি পোর্ট নাম্বারের (০ থেকে ৬৫৫৩৫) মাধ্যমে নির্দিষ্ট অ্যাপ্লিকেশনে ডেটা পাঠায়। এখানে প্রধান দুটি প্রোটোকল হলো টিসিপি (TCP - নিশ্চিত ও নির্ভরযোগ্য যোগাযোগ) এবং ইউডিপি (UDP - দ্রুতগতির কিন্তু সংযোগহীন যোগাযোগ)।',
    functionsEn: [
      'Port-based addressing (identifies exact process/service on the host)',
      'Segmentation of large data into segments and reassembly at destination',
      'Reliability via ACKs, sequence numbers, and retransmissions (TCP)',
      'Flow Control (Sliding Window) & Congestion Control to avoid receiver overload'
    ],
    functionsBn: [
      'পোর্ট অ্যাড্রেসিং (নির্দিষ্ট সফটওয়্যার প্রসেস খুঁজে বের করা)',
      'বড় ডেটাকে ছোট ছোট সেগমেন্টে ভাগ করা এবং অপর প্রান্তে সাজানো',
      'টিসিপিতে ৩-ওয়ে হ্যান্ডশেক (SYN, SYN-ACK, ACK) ও ডেটা প্রাপ্তির স্বীকৃতি (ACK)',
      'স্লাইডিং উইন্ডোর মাধ্যমে ট্রাফিক জ্যাম বা ফ্লো কন্ট্রোল প্রতিরোধ'
    ],
    protocols: ['TCP', 'UDP', 'SCTP', 'QUIC', 'DCCP'],
    devices: ['Layer 4 Firewalls', 'Load Balancers (HAProxy, F5)', 'NAT Routers'],
    devicesBn: ['লেয়ার ৪ ফায়ারওয়াল', 'লোড ব্যালান্সার', 'ন্যাট (NAT) রাউটার'],
    headerAdded: 'TCP / UDP Header (Ports, Sequence No, Ack No, Window, Checksum)',
    sampleHeaderData: {
      'Source Port': '54321 (Ephemeral Client Port)',
      'Destination Port': '443 (HTTPS)',
      'Sequence Number': '1001',
      'Flags': '[SYN, ACK]',
      'Window Size': '65535'
    },
    securityAspectsEn: 'Susceptible to SYN Flood DDoS, Port Scanning, TCP Session Hijacking, and UDP Amplification attacks. Defended by Stateful Packet Inspection (SPI) firewalls and SYN cookies.',
    securityAspectsBn: 'SYN Flood অ্যাটাক ও পোর্ট স্ক্যানিং এর শিকার হয়। স্টেটফুল ফায়ারওয়াল ও SYN কুকিজ দ্বারা সুরক্ষিত করা হয়।'
  },
  {
    layer: 3,
    nameEn: 'Network Layer',
    nameBn: 'নেটওয়ার্ক লেয়ার (Network Layer)',
    pdu: 'Packet',
    pduBn: 'প্যাকেট (Packet)',
    color: '#10b981', // emerald
    bgColor: 'bg-emerald-950/40',
    borderColor: 'border-emerald-500/40',
    shortDescEn: 'Logical IP addressing (IPv4/IPv6), packet routing across networks, & path selection.',
    shortDescBn: 'লজিক্যাল আইপি অ্যাড্রেসিং (IPv4/IPv6), পাথ সিলেকশন এবং রাউটিং সম্পন্ন করে।',
    fullDescEn: 'The Network Layer provides the functional and procedural means of transferring data sequences from one node to another connected in different networks. It handles logical IP addressing (IPv4 32-bit and IPv6 128-bit) and uses dynamic routing protocols (OSPF, BGP, RIP) to find the optimal path across routers to deliver packets.',
    fullDescBn: 'নেটওয়ার্ক লেয়ার এক নেটওয়ার্ক থেকে অন্য দূরবর্তী নেটওয়ার্কে ডেটা পৌঁছে দেওয়ার পথ (Path) নির্ধারণ করে। এটি আইপি অ্যাড্রেস (IPv4 ও IPv6) পরিচালনা করে এবং রাউটারের মাধ্যমে সবচেয়ে দ্রুত ও নিরাপদ পথ খুঁজে প্যাকেট ফরোয়ার্ড করে।',
    functionsEn: [
      'Logical Addressing (Assigning unique global or private IPv4/IPv6 addresses)',
      'Routing & Path Determination (Using routing tables, BGP, OSPF to traverse subnets)',
      'Packet Encapsulation (Prepending IP header to transport segment)',
      'Fragmentation and Reassembly if packet exceeds Maximum Transmission Unit (MTU)'
    ],
    functionsBn: [
      'লজিক্যাল আইপি অ্যাড্রেস প্রদান (IPv4 এবং IPv6)',
      'রাউটিং ও পাথ সিলেকশন (বিভিন্ন রাউটার ঘুরে সঠিক গন্তব্য নির্ধারণ)',
      'ট্রান্সপোর্ট সেগমেন্টকে প্যাকেটে এনক্যাপসুলেশন করা',
      'প্যাকেট ফ্র্যাগমেন্টেশন ও টিটিএল (TTL) নিয়ন্ত্রণ'
    ],
    protocols: ['IPv4', 'IPv6', 'ICMP (Ping/Traceroute)', 'IPsec', 'OSPF', 'BGP', 'RIP', 'IGMP'],
    devices: ['Routers', 'Layer 3 Switches', 'Stateful Network Firewalls'],
    devicesBn: ['রাউটার (Router)', 'লেয়ার ৩ সুইচ', 'আইপি ফায়ারওয়াল'],
    headerAdded: 'IP Header (Source IP, Destination IP, TTL, Protocol ID, Header Checksum)',
    sampleHeaderData: {
      'Source IP': '192.168.1.105',
      'Destination IP': '142.250.190.46 (google.com)',
      'TTL (Time to Live)': '64',
      'Protocol': '6 (TCP)'
    },
    securityAspectsEn: 'Subject to IP Spoofing, ICMP Ping Floods, Routing Poisoning (BGP hijacking), and Smurf attacks. Defended by IP filtering, anti-spoofing uRPF, and IPsec VPNs.',
    securityAspectsBn: 'আইপি স্পুফিং (IP Spoofing) ও পিং ফ্লাড অ্যাটাক হয়। এক্সেস কন্ট্রোল লিস্ট (ACL) ও IPsec দ্বারা নিরাপদ রাখা হয়।'
  },
  {
    layer: 2,
    nameEn: 'Data Link Layer',
    nameBn: 'ডাটা লিঙ্ক লেয়ার (Data Link Layer)',
    pdu: 'Frame',
    pduBn: 'ফ্রেম (Frame)',
    color: '#eab308', // amber
    bgColor: 'bg-amber-950/40',
    borderColor: 'border-amber-500/40',
    shortDescEn: 'Physical MAC addressing, local framing, error detection (CRC/FCS), & hop-to-hop transfer.',
    shortDescBn: 'ফিজিক্যাল ম্যাক অ্যাড্রেসিং, লোকাল নেটওয়ার্কে ফ্রেমিং ও এরর সনাক্তকরণ (CRC)।',
    fullDescEn: 'The Data Link Layer provides node-to-node data transfer across the local physical link. It is split into two sublayers: LLC (Logical Link Control) and MAC (Media Access Control). It wraps packets into Frames, adds the hardware MAC addresses (e.g., 00:1A:2B:3C:4D:5E), and attaches a Frame Check Sequence (CRC/FCS) trailer to detect bit errors.',
    fullDescBn: 'ডাটা লিঙ্ক লেয়ার একই লোকাল নেটওয়ার্কের (LAN) মধ্যে থাকা ডিভাইসগুলোর মধ্যে ডেটা ফ্রেম আকারে আদান-প্রদান করে। এটি হার্ডওয়্যার ম্যাক অ্যাড্রেস (MAC Address) ব্যবহার করে এবং ডেটায় কোনো বিট নষ্ট হলো কিনা তা ফ্রেমের শেষে CRC/FCS চেকসাম যোগ করে পরীক্ষা করে।',
    functionsEn: [
      'Framing: packaging network packets into discrete Ethernet frames',
      'Physical Addressing: Source & Destination MAC (48-bit hardware address)',
      'Media Access Control: arbitrating access to the shared transmission medium (CSMA/CD)',
      'Error Detection: Cyclic Redundancy Check (CRC/FCS trailer)'
    ],
    functionsBn: [
      'ফ্রেমিং: নেটওয়ার্ক প্যাকেটকে ফ্রেমে রূপান্তর করা',
      'ফিজিক্যাল ম্যাক অ্যাড্রেস সংযোজন (Source & Dest MAC)',
      'লোকাল সুইচে ম্যাক টেবিল ব্যবহার করে সঠিক পোর্টে ফ্রেম পাঠানো',
      'এরর ডিটেকশন: সাইক্লিক রিডানড্যান্সি চেক (CRC) দিয়ে ফ্রেম ভেরিফাই করা'
    ],
    protocols: ['Ethernet (IEEE 802.3)', 'Wi-Fi (IEEE 802.11)', 'ARP (Address Resolution)', 'PPP', 'VLAN (802.1Q)'],
    devices: ['Network Switches (Layer 2)', 'Network Interface Cards (NIC)', 'Wireless Access Points (WAP)', 'Bridges'],
    devicesBn: ['নেটওয়ার্ক সুইচ (Switch)', 'ল্যান কার্ড (NIC)', 'ওয়াই-ফাই এক্সেস পয়েন্ট', 'ব্রিজ'],
    headerAdded: 'Ethernet Header (Preamble, Dst MAC, Src MAC, EtherType) & FCS Trailer',
    sampleHeaderData: {
      'Source MAC': '3C:22:FB:4B:92:01',
      'Destination MAC': 'A0:36:9F:12:88:5E (Gateway Router)',
      'EtherType': '0x0800 (IPv4)',
      'Trailer (FCS/CRC)': '0x9B283A41'
    },
    securityAspectsEn: 'Prone to ARP Spoofing / Poisoning, MAC Flooding, VLAN Hopping, and Rogue DHCP servers. Mitigated by Dynamic ARP Inspection (DAI), Port Security, and DHCP Snooping.',
    securityAspectsBn: 'ARP স্পুফিং এবং ম্যাক ফ্লাডিং এর বড় হুমকি। পোর্ট সিকিউরিটি ও ডায়নামিক এআরপি ইন্সপেকশন দিয়ে সুরক্ষা দেওয়া হয়।'
  },
  {
    layer: 1,
    nameEn: 'Physical Layer',
    nameBn: 'ফিজিক্যাল লেয়ার (Physical Layer)',
    pdu: 'Bit (0s & 1s)',
    pduBn: 'বিট (Bits - ০ ও ১)',
    color: '#f97316', // orange
    bgColor: 'bg-orange-950/40',
    borderColor: 'border-orange-500/40',
    shortDescEn: 'Physical transmission of raw unstructured bits over copper, fiber optics, or radio waves.',
    shortDescBn: 'তামার তার, ফাইবার অপটিক ক্যাবল বা বেতার তরঙ্গে বৈদ্যুতিক/আলোক সিগন্যালে বিট পাঠানো।',
    fullDescEn: 'The Physical Layer is the lowest layer of the OSI model. It is responsible for the actual physical transmission of raw, unstructured bit streams (0s and 1s) across a physical transmission medium. It defines electrical voltages, radio frequencies, optical pulses, pin layouts, connectors (RJ45, SFP), cable specifications, and transmission rates.',
    fullDescBn: 'ফিজিক্যাল লেয়ার হলো ওএসআই মডেলের একেবারে প্রথম বা নিচের স্তর। এটি ডিজিটাল বিটগুলোকে (০ এবং ১) বৈদ্যুতিক সিগন্যাল, আলোর ঝলকানি (ফাইবার) অথবা রেডিও তরঙ্গে (ওয়াই-ফাই) রূপান্তর করে ফিজিক্যাল মাধ্যমে ট্রান্সমিট করে। ক্যাবল, কানেক্টর, ভোল্টেজ ইত্যাদি সবই এখানে নির্ধারিত হয়।',
    functionsEn: [
      'Bit Representation: converts bits into electrical voltages, optical light pulses, or RF waves',
      'Transmission Rate specification: Data rate in Mbps/Gbps (e.g. 10Gbps SFP+)',
      'Physical Topologies: Star, Mesh, Bus, Ring',
      'Line Configuration & Pinouts: RJ45 T568A/B, fiber SC/LC connectors'
    ],
    functionsBn: [
      'সিগন্যাল তৈরি: বিটগুলোকে ভোল্টেজ বা অপটিক্যাল আলোতে রূপান্তর',
      'ট্রান্সমিশন গতি নির্ধারণ (যেমন 100 Mbps বা 1 Gbps বা 10 Gbps)',
      'ফিজিক্যাল টপোলজি (Star, Mesh, Bus) ও তারের সংযোগ',
      'পিন লেআউট এবং কানেক্টর (RJ45, LC/SC Fiber, Coaxial)'
    ],
    protocols: ['1000BASE-T', '10GBASE-SR', 'DSL', 'USB', 'Bluetooth PHY', '802.11 PHY', 'RS-232'],
    devices: ['Hubs', 'Repeaters', 'Cables (Cat6, Fiber Optic)', 'SFP Modules', 'Modems'],
    devicesBn: ['নেটওয়ার্ক হাব (Hub)', 'রিপিটার (Repeater)', 'ক্যাট৬ / অপটিক্যাল ক্যাবল', 'মডেম'],
    headerAdded: 'Physical Preamble, Voltage Signaling & Clock Sync Pulse',
    sampleHeaderData: {
      'Signal Type': 'Electrical pulses (PAM-5 / 1000BASE-T)',
      'Media': 'Cat6 UTP Copper Cable',
      'Bitstream Preview': '10101010 10101011 00000000 01100101...',
      'Clock Rate': '125 MHz'
    },
    securityAspectsEn: 'Physical wiretapping, cable cuts, RF jamming, rogue physical hardware implants. Defended by physical server room access control, shielded twisted pair (STP), and conduit casing.',
    securityAspectsBn: 'ক্যাবল কেটে ফেলা, ওয়্যারল্যাপিং বা রেডিও জ্যামিং এর ঝুঁকি। সুরক্ষায় সার্ভার রুম লক ও শিল্ডেড ক্যাবল দরকার।'
  }
];

export interface EncapsulationStep {
  step: number;
  layer: number;
  direction: 'ENCAPSULATE' | 'DECAPSULATE';
  actionEn: string;
  actionBn: string;
  pduName: string;
  descriptionEn: string;
  descriptionBn: string;
  addedHeader: string;
  dataRepresentation: string;
}

export const SAMPLE_ENCAPSULATION_FLOW: EncapsulationStep[] = [
  {
    step: 1,
    layer: 7,
    direction: 'ENCAPSULATE',
    actionEn: 'User clicks "Send". Web browser creates an HTTP GET request.',
    actionBn: 'ব্যবহারকারী ওয়েব ব্রাউজারে রিকোয়েস্ট পাঠায়। HTTP GET রিকোয়েস্ট তৈরি হয়।',
    pduName: 'Application Data',
    descriptionEn: 'The client application generates the user payload payload: "GET /api/status HTTP/1.1".',
    descriptionBn: 'ব্রাউজার অ্যাপ্লিকেশন লেয়ার প্রোটোকল দিয়ে ডাটা প্রস্তুত করে।',
    addedHeader: 'HTTP Header',
    dataRepresentation: '[ HTTP: GET /api/status ]'
  },
  {
    step: 2,
    layer: 6,
    direction: 'ENCAPSULATE',
    actionEn: 'Data is encrypted via TLS 1.3 and formatted into uniform syntax.',
    actionBn: 'ডাটা TLS 1.3 দিয়ে এনক্রিপ্ট এবং সার্বজনীন সিনট্যাক্সে রূপান্তর হয়।',
    pduName: 'Encrypted Data',
    descriptionEn: 'The presentation layer serializes JSON/text and applies cryptographic cipher suite.',
    descriptionBn: 'প্রেজেন্টেশন লেয়ার সাইফার স্যুট দিয়ে ডাটাকে এনক্রিপ্ট করে সুরক্ষিত করে।',
    addedHeader: 'TLS 1.3 Record Header',
    dataRepresentation: '[ TLS | Encrypted Payload ]'
  },
  {
    step: 3,
    layer: 5,
    direction: 'ENCAPSULATE',
    actionEn: 'Session layer assigns dialogue tokens and session tracking ID.',
    actionBn: 'সেশন লেয়ার সেশন ট্র্যাকিং টোকেন ও ডায়লগ কন্ট্রোল প্যারামিটার যুক্ত করে।',
    pduName: 'Session Managed Data',
    descriptionEn: 'Maintains ongoing stream synchronization and checkpoints.',
    descriptionBn: 'চলমান সংযোগের চেকপয়েন্ট ও সেশন স্টেট নির্ধারণ করে।',
    addedHeader: 'Session State Tags',
    dataRepresentation: '[ SESS_ID | TLS | Payload ]'
  },
  {
    step: 4,
    layer: 4,
    direction: 'ENCAPSULATE',
    actionEn: 'Transport Layer wraps data in a TCP Segment with Ports & Sequence No.',
    actionBn: 'ট্রান্সপোর্ট লেয়ার সোর্স ও ডেস্টিনেশন পোর্ট এবং সিকোয়েন্স নাম্বার সহ TCP সেগমেন্ট বানায়।',
    pduName: 'TCP Segment',
    descriptionEn: 'Adds Source Port: 54123, Destination Port: 443, Seq=1, Ack=1, Flags=[ACK, PSH].',
    descriptionBn: 'সোর্স পোর্ট ও ডেস্টিনেশন পোর্ট যোগ করে নির্ভরযোগ্য ডেলিভারি নিশ্চিত করে।',
    addedHeader: 'TCP Header (20 Bytes)',
    dataRepresentation: '[ TCP Header (Src: 54123 -> Dst: 443) | SESS | TLS | Payload ]'
  },
  {
    step: 5,
    layer: 3,
    direction: 'ENCAPSULATE',
    actionEn: 'Network Layer wraps segment into an IP Packet with Source/Dest IP.',
    actionBn: 'নেটওয়ার্ক লেয়ার সোর্স ও ডেস্টিনেশন আইপি যোগ করে আইপি প্যাকেট তৈরি করে।',
    pduName: 'IP Packet',
    descriptionEn: 'Adds Source IP: 192.168.1.50, Dest IP: 142.250.190.46, TTL: 64, Protocol: TCP.',
    descriptionBn: 'রাউটারে পাঠানোর জন্য আইপি হেডার যোগ হয় যা বিশ্বজুড়ে প্যাকেটকে পথ দেখায়।',
    addedHeader: 'IPv4 Header (20 Bytes)',
    dataRepresentation: '[ IPv4 (192.168.1.50 -> 142.250.190.46) | TCP | Data ]'
  },
  {
    step: 6,
    layer: 2,
    direction: 'ENCAPSULATE',
    actionEn: 'Data Link Layer encapsulates packet into an Ethernet Frame with MAC addresses.',
    actionBn: 'ডাটা লিঙ্ক লেয়ার ফ্রেম তৈরি করে লোকাল গেটওয়ে রাউটারের ম্যাক অ্যাড্রেস ও CRC যোগ করে।',
    pduName: 'Ethernet Frame',
    descriptionEn: 'Adds Source MAC (Client NIC), Dest MAC (Next-hop Router MAC), and CRC/FCS Trailer.',
    descriptionBn: 'সরাসরি কেবল বা ওয়াইফাই ডিভাইসের ম্যাক অ্যাড্রেস ও এরর চেকিং সাইক্লিক রিডানড্যান্সি চেক (CRC) বসে।',
    addedHeader: 'Ethernet Header (14B) + FCS Trailer (4B)',
    dataRepresentation: '[ Eth Header (Src MAC -> Dst MAC) | IPv4 | TCP | Data | FCS Trailer ]'
  },
  {
    step: 7,
    layer: 1,
    direction: 'ENCAPSULATE',
    actionEn: 'Physical Layer converts the entire frame into electrical voltages or light pulses.',
    actionBn: 'ফিজিক্যাল লেয়ার সম্পূর্ণ ফ্রেমটিকে ভোল্টেজ বা অপটিক্যাল সিগন্যালে বিটে রূপান্তর করে তারে পাঠায়।',
    pduName: 'Bit Stream',
    descriptionEn: 'Transmits 01001000 01100101 01101100 01101100 01101111... across copper Cat6/Fiber.',
    descriptionBn: 'ডিজিটাল বাইনারি বিটগুলো ক্যাবলের মাধ্যমে ফিজিক্যাল দূরত্ব অতিক্রম করে সার্ভারের দিকে যায়।',
    addedHeader: 'Preamble (7 Bytes) + SFD (1 Byte)',
    dataRepresentation: '01010101 01010101 01010101 01010111 [Electrical Pulse Stream 1010011010...]'
  }
];
