# NetSim Pro 🌐

> **Interactive OSI 7-Layer Simulator, Network Topologies (PAN/LAN/MAN/WAN), MAC Address & Spoofing Engine, Hotspot NAT & IP Conflict Visualizer, and Real-Time Network Traffic Defense Suite.**

[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

---

## 🚀 Features Overview

### 1. 💻 Linux Interactive Bash Terminal & Practice Lab
- **In-Memory Virtual Filesystem**: Live directory navigation and file manipulation (`ls`, `cd`, `pwd`, `cat`, `touch`, `mkdir`, `rm`, `grep`, `head`, `tail`, `wc`, `echo "text" > file`).
- **Live Network Commands**: `ping 8.8.8.8`, `ifconfig`, `ip a / link / route`, `arp -a`, `macchanger -r eth0`, `traceroute`, `curl`, `wget`, `netstat`, `ss`, `iptables -L`.
- **Hands-on Quests & Auto-solve**: 10 real-world practice challenges covering file inspection, searching, secret flag hunting, and network reconnaissance.
- **Quick Click Bar**: Instant execution of essential networking and security diagnostics.

### 2. 🐧 Linux Essential Commands & Troubleshooting Handbook
- **Interactive Bash Sandbox**: Real-time interactive simulated terminal with color-coded syntax (`pwd`, `ls -la`, `cat`, `head -n 5`, `tail -f`, `grep`, `chmod`, `nmap`, `ps aux`, `df -h`, `free -m`).
- **File System Hierarchy**: Visual interactive map of `/`, `/home`, `/etc`, `/var`, `/tmp`, `/bin`.
- **Text Editors & Shortcuts**: Nano, Vim, and Gedit guides with interactive in-terminal Nano simulator (`Ctrl+O`, `Ctrl+X`, `Ctrl+K`).
- **Cyber Security Utilities**: Nmap, Netcat listeners, TCPDump, Gobuster, Hydra, Nikto with realistic outputs.
- **Troubleshooting Guide**: Solutions and one-click fixes for `Destination path already exists`, `Could not get lock /var/lib/dpkg/lock-frontend`, and `Command not found`.

### 2. 🏓 Ping & ICMP Deep-Dive Simulator (Screenshot Breakdown)
- **Direct Terminal Dissection**: Line-by-line explanation of Linux `ping 192.168.1.254`.
- **56(84) Bytes Header Math**: 56B payload + 8B ICMP header + 20B IPv4 header = 84B on the wire.
- **TTL=63 Explained**: How router hops decrement TTL (Initial 64 - 1 hop = 63).
- **Latency & Red Box Breakdown**: Why `time=2.18 ms` measures Round-Trip Time (RTT) and why packet #5 spiked to `10.3 ms`.
- **Wall-Clock Math (`time 5008ms`)**: Explains the 1000ms sleep interval between 6 packets.
- **rtt min/avg/max/mdev**: Complete formula and mean deviation (jitter) explanation.
- **Interactive Scenarios**: Normal 0% Loss, Latency Spike, Request Timeout (Firewall Drop), and Destination Host Unreachable.

### 2. 📚 OSI 7-Layer Interactive Stack & Encapsulation
- **Complete 7 Layers**: Application (L7), Presentation (L6), Session (L5), Transport (L4), Network (L3), Data Link (L2), Physical (L1).
- **Step-by-Step Flow**: Auto-play and manual controls for **Encapsulation (L7 → L1)** and **Decapsulation (L1 → L7)**.
- **PDU & Envelopes**: Live data transformations (Data → Segment → Packet → Frame → Bits).
- **Hardware & Security**: Associated devices (Hub, Switch, Router, Firewall, WAF) and layer-specific vulnerabilities.

### 2. 🗺️ Network Classification (PAN, LAN, MAN, WAN)
- **PAN (Personal Area Network)**: 1 – 10 Meters (Bluetooth, Zigbee, NFC, Hotspot).
- **LAN (Local Area Network)**: 10m – 1 Kilometer (Ethernet Cat6, Wi-Fi 6 Routers, Switches).
- **MAN (Metropolitan Area Network)**: 5 – 50 Kilometers (Metro Fiber Optic, Microwave Links, ISP networks).
- **WAN (Wide Area Network)**: Global / Planetary scale (Submarine Cables, Satellite, Tier-1 BGP).
- **Interactive Radius Simulator**: Drag slider from 5 meters to 150+ km and watch network topologies adapt in real-time.

### 3. 🔍 MAC Address Architecture & Spoofing (ছদ্মবেশ) Simulator
- **48-Bit MAC Anatomy**: OUI (Organizationally Unique Identifier, 24 bits) + NIC Device Serial (24 bits).
- **OUI Vendor Lookup**: Decodes Apple, Cisco, Intel, Raspberry Pi, VMware, Dell, and Samsung hardware.
- **Live MAC Spoofing Simulator**: Step-by-step visual demonstration of how a blocked device disguises its MAC in software to bypass Wi-Fi Access Point Whitelists.
- **Defensive Mitigations**: 802.1X Enterprise authentication, Dynamic ARP Inspection (DAI), and Switch Port Security.

### 4. 📱 Hotspot NAT (Same Public IP) & Duplicate IP Conflict
- **Why Both Devices Share the Same Public IP**: Visualizes how a smartphone hotspot acts as a cellular NAT router. Inside the LAN, devices have unique private IPs (`192.168.43.15` and `192.168.43.28`), but outside WAN they share one single public IP (`103.112.54.12`) via Port Address Translation (PAT).
- **IP Address Conflict Simulation**: What happens when two devices claim the exact same private IP (`192.168.1.50`). Demonstrates Gratuitous ARP collisions, switch ARP table flapping, and OS connection dropouts.

### 5. 🧮 IPv4 / IPv6 Subnet Calculator
- **Interactive CIDR Calculator**: Real-time calculation of Netmask, Wildcard, Network ID, Broadcast, and First/Last Usable Host range.
- **32-Bit Binary Bitmask**: Visual breakdown of Network Bits vs Host Bits.
- **IPv6 Shorthand Engine**: Address compression (`::`), RFC 1918 private classes, and Scope identification.

### 6. 📖 Ports & Protocols Directory + TCP vs UDP Deep-Dive
- Filterable directory of Well-Known (0-1023), Registered (1024-49151), and Ephemeral (49152-65535) ports.
- Comprehensive architectural comparison matrix between **TCP** (Reliable, In-Order, 3-Way Handshake) and **UDP** (Stateless, 8-Byte Header, Low-Latency).

### 7. 🔬 Packet & Header Dissector (Wireshark-Style)
- Accurate 32-bit layout diagrams for **IPv4**, **IPv6**, **TCP**, and **UDP** headers.
- Interactive Header Crafter: manipulate TTL, Source/Destination IPs, and TCP control flags (SYN, ACK, FIN, RST, PSH, URG) with live Hex dump.

### 8. 🛡️ Firewall & IDS / IPS Defense Engine
- Stateless vs Stateful Packet Inspection (SPI).
- Rule editor: deploy custom Access Control Lists (ACLs) with ALLOW, DROP, or REJECT actions.
- Signature-based Threat Injector: simulate SYN Floods, Nmap Port Scans, SQL Injection payloads, and Telnet probes in real-time.

### 9. 🔀 Port Forwarding (NAT / PAT) Analytics
- WAN-to-LAN port translation rule manager.
- External Connection Probe tester: test if WAN ports (`:8080`, `:2222`) successfully map to internal servers.

### 10. ⚡ TCP / UDP Connectivity & Live Logs
- Interactive **TCP 3-Way Handshake (SYN → SYN-ACK → ACK)** with sequence number arithmetic.
- Active Socket Table (`netstat` / `ss` view).
- Live real-time packet log stream with search, protocol filters, pause/resume, and JSON export.

---

## 📦 Project Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `pnpm` or `yarn`

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/netsim-pro.git
   cd netsim-pro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The compiled static output will be generated in the `dist/` directory, ready to deploy to GitHub Pages, Vercel, or Netlify.

5. **Type check & Lint:**
   ```bash
   npm run lint
   ```

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: Dual language toggle (English & বাংলা)

---

## 🌐 Multilingual Support (বাংলা ও English)
Every module comes with dual-language support for Bangladeshi and international network engineering students, cybersecurity learners, and IT professionals.

---

## 👨‍💻 Author & Credits
Created with ❤️ by **Jayed** (`jayedcyberfinix@gmail.com`).

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
