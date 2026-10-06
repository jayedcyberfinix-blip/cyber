import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  RotateCcw, 
  CheckCircle2, 
  Trophy, 
  Sparkles, 
  Play, 
  Folder, 
  FileText, 
  ShieldCheck, 
  HelpCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import { Language } from '../types/network';

interface LinuxTerminalPracticeProps {
  lang: Language;
  initialCommand?: string;
}

interface VirtualFile {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  permissions?: string;
  owner?: string;
}

interface Challenge {
  id: string;
  titleEn: string;
  titleBn: string;
  taskEn: string;
  taskBn: string;
  targetCommandCheck: (cmd: string) => boolean;
  isCompleted: boolean;
  hintEn: string;
  hintBn: string;
}

export const LinuxTerminalPractice: React.FC<LinuxTerminalPracticeProps> = ({ 
  lang,
  initialCommand 
}) => {
  const [currentUser, setCurrentUser] = useState<'cmnatic' | 'root'>('cmnatic');
  const [currentPath, setCurrentPath] = useState<string>('/home/cmnatic');
  const [currentMac, setCurrentMac] = useState<string>('00:1a:2b:3c:4d:5e');
  const permanentMac = '00:1a:2b:3c:4d:5e';

  // In-memory Virtual Filesystem
  const [fileSystem, setFileSystem] = useState<Record<string, VirtualFile[]>>({
    '/': [
      { name: 'bin', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'etc', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'home', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'var', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root' },
      { name: 'tmp', type: 'dir', permissions: 'drwxrwxrwt', owner: 'root' }
    ],
    '/home': [
      { name: 'cmnatic', type: 'dir', permissions: 'drwxr-xr-x', owner: 'cmnatic' }
    ],
    '/home/cmnatic': [
      { name: 'notes.txt', type: 'file', content: 'Cyber security lab objectives:\n1. Audit open ports on 192.168.1.1\n2. Inspect web server with nikto\n3. Verify password policy with john', permissions: '-rw-r--r--', owner: 'cmnatic' },
      { name: 'exploit.sh', type: 'file', content: '#!/bin/bash\necho "Running system diagnostics..."\necho "All checks passed!"', permissions: '-rw-r--r--', owner: 'cmnatic' },
      { name: 'hashes.txt', type: 'file', content: 'admin:$6$rounds=5000$saltsalt$e10adc3949ba59abbe56e057f20f883e\njohn:$6$rounds=5000$salt2$password123', permissions: '-rw-r--r--', owner: 'cmnatic' },
      { name: 'tools', type: 'dir', permissions: 'drwxr-xr-x', owner: 'cmnatic' }
    ],
    '/home/cmnatic/tools': [
      { name: 'scan.py', type: 'file', content: 'print("Scanning active subnets...")', permissions: '-rwxr-xr-x', owner: 'cmnatic' }
    ],
    '/etc': [
      { name: 'passwd', type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\ncmnatic:x:1000:1000:cmnatic:/home/cmnatic:/bin/bash\nservice:x:1001:1001::/nonexistent:/bin/false', permissions: '-rw-r--r--', owner: 'root' },
      { name: 'auth.conf', type: 'file', content: 'SERVER_AUTH=true\nDEFAULT_USER=admin\nPASSWORD_HASH=bcrypt_secure\nAUTH_PORT=443', permissions: '-rw-r--r--', owner: 'root' },
      { name: 'hosts', type: 'file', content: '127.0.0.1 localhost\n192.168.1.1 router.local\n192.168.1.254 gateway.local', permissions: '-rw-r--r--', owner: 'root' }
    ],
    '/var': [
      { name: 'log', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root' }
    ],
    '/var/log': [
      { name: 'syslog', type: 'file', content: 'Oct  6 10:00:01 kernel: eth0 UP\nOct  6 10:15:22 sshd: Failed password for root from 185.220.101.5\nOct  6 10:15:25 sshd: Failed password for root from 185.220.101.5', permissions: '-rw-r--r--', owner: 'root' },
      { name: 'flag.txt', type: 'file', content: 'FLAG{NETSIM_LINUX_HERO_2026_PWNED}', permissions: '-rw-r--r--', owner: 'root' }
    ],
    '/tmp': []
  });

  // Terminal Lines History
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string[] }>>([
    {
      cmd: 'uname -a',
      output: [
        'Linux kali-netsim 6.8.0-kali1-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
        'Type "help" for command list, or solve the Practice Quests on the right!'
      ]
    }
  ]);
  const [inputCmd, setInputCmd] = useState('');
  const [cmdHistoryList, setCmdHistoryList] = useState<string[]>(['uname -a']);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  // Practice Challenges & Quests
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: 'c1',
      titleEn: '1. Basic Navigation',
      titleBn: '১. বেসিক নেভিগেশন',
      taskEn: 'Check current directory and list all detailed files with `ls -la`.',
      taskBn: '`pwd` ও `ls -la` রান করে বর্তমান লোকেশন ও ফাইল বিস্তারিত দেখুন।',
      targetCommandCheck: (c) => c.includes('ls -la') || c.includes('ls -l') || c === 'ls',
      isCompleted: false,
      hintEn: 'Type: ls -la',
      hintBn: 'টাইপ করুন: ls -la'
    },
    {
      id: 'c2',
      titleEn: '2. Read System File',
      titleBn: '২. সিস্টেম ফাইল রিড',
      taskEn: 'Inspect the contents of `notes.txt` using the `cat` command.',
      taskBn: '`cat notes.txt` কমান্ড দিয়ে ফাইলের লেখা পড়ে দেখুন।',
      targetCommandCheck: (c) => c.startsWith('cat notes.txt') || c.startsWith('cat /home/cmnatic/notes.txt'),
      isCompleted: false,
      hintEn: 'Type: cat notes.txt',
      hintBn: 'টাইপ করুন: cat notes.txt'
    },
    {
      id: 'c3',
      titleEn: '3. Secret Flag Hunting',
      titleBn: '৩. সিক্রেট ফ্ল্যাগ খোঁজা',
      taskEn: 'Navigate to `/var/log` with `cd /var/log` and read `flag.txt` using `cat flag.txt`.',
      taskBn: '`cd /var/log` দিয়ে ফোল্ডারে যান এবং `cat flag.txt` দিয়ে লুকানো ফ্ল্যাগ বের করুন।',
      targetCommandCheck: (c) => c.includes('flag.txt') && c.includes('cat'),
      isCompleted: false,
      hintEn: 'Type: cat /var/log/flag.txt or cd /var/log && cat flag.txt',
      hintBn: 'টাইপ করুন: cd /var/log && cat flag.txt'
    },
    {
      id: 'c4',
      titleEn: '4. Grep Text Investigation',
      titleBn: '৪. গ্রিপ দিয়ে পাসওয়ার্ড অনুসন্ধান',
      taskEn: 'Search for the word "password" inside `/home/cmnatic/hashes.txt` using `grep`.',
      taskBn: '`grep "password" hashes.txt` দিয়ে পাসওয়ার্ড ফিল্টার করুন।',
      targetCommandCheck: (c) => c.includes('grep') && c.includes('hashes.txt'),
      isCompleted: false,
      hintEn: 'Type: grep "password" hashes.txt',
      hintBn: 'টাইপ করুন: grep "password" hashes.txt'
    },
    {
      id: 'c5',
      titleEn: '5. Cyber Reconnaissance (Nmap)',
      titleBn: '৫. সাইবার স্ক্যানিং (Nmap)',
      taskEn: 'Scan the gateway router using `nmap -sV 192.168.1.1` or `nmap 192.168.1.1`.',
      taskBn: '`nmap -sV 192.168.1.1` রান করে ওপেন পোর্ট ও সার্ভিস স্ক্যান করুন।',
      targetCommandCheck: (c) => c.startsWith('nmap'),
      isCompleted: false,
      hintEn: 'Type: nmap -sV 192.168.1.1',
      hintBn: 'টাইপ করুন: nmap -sV 192.168.1.1'
    },
    {
      id: 'c6',
      titleEn: '6. Password Auditing (John)',
      titleBn: '৬. পাসওয়ার্ড ক্র্যাকিং (John the Ripper)',
      taskEn: 'Audit the hashes file using `john --wordlist=rockyou.txt hashes.txt`.',
      taskBn: '`john --wordlist=rockyou.txt hashes.txt` রান করে পাসওয়ার্ড ক্র্যাক করুন।',
      targetCommandCheck: (c) => c.startsWith('john') || c.startsWith('hashcat'),
      isCompleted: false,
      hintEn: 'Type: john --wordlist=rockyou.txt hashes.txt',
      hintBn: 'টাইপ করুন: john --wordlist=rockyou.txt hashes.txt'
    },
    {
      id: 'c7',
      titleEn: '7. Network Connectivity (Ping)',
      titleBn: '৭. নেটওয়ার্ক কানেক্টিভিটি (Ping)',
      taskEn: 'Send ICMP echo requests to Google DNS using `ping 8.8.8.8` or Gateway `ping 192.168.1.1`.',
      taskBn: '`ping 8.8.8.8` দিয়ে নেটওয়ার্ক কানেক্টিভিটি ও রেসপন্স টাইম (Latency) টেস্ট করুন।',
      targetCommandCheck: (c) => c.startsWith('ping'),
      isCompleted: false,
      hintEn: 'Type: ping 8.8.8.8',
      hintBn: 'টাইপ করুন: ping 8.8.8.8'
    },
    {
      id: 'c8',
      titleEn: '8. Interface & MAC Inspection',
      titleBn: '৮. ইন্টারফেস ও MAC এড্রেস যাচাই',
      taskEn: 'Inspect network interfaces, IP and hardware MAC address with `ifconfig` or `ip a`.',
      taskBn: '`ifconfig` অথবা `ip a` রান করে eth0 ইন্টারফেস ও MAC Address দেখুন।',
      targetCommandCheck: (c) => c.startsWith('ifconfig') || c.startsWith('ip a') || c.startsWith('ip addr'),
      isCompleted: false,
      hintEn: 'Type: ifconfig or ip a',
      hintBn: 'টাইপ করুন: ifconfig অথবা ip a'
    },
    {
      id: 'c9',
      titleEn: '9. MAC Address Spoofing (ছদ্মবেশ)',
      titleBn: '৯. ম্যাক এড্রেস স্পুফিং (ছদ্মবেশ)',
      taskEn: 'Disguise / spoof your hardware MAC address using `macchanger -r eth0`.',
      taskBn: '`macchanger -r eth0` দিয়ে আপনার নেটওয়ার্ক ইন্টারফেসের MAC এড্রেস স্পুফ করুন।',
      targetCommandCheck: (c) => c.startsWith('macchanger'),
      isCompleted: false,
      hintEn: 'Type: macchanger -r eth0',
      hintBn: 'টাইপ করুন: macchanger -r eth0'
    },
    {
      id: 'c10',
      titleEn: '10. Active ARP Resolution Cache',
      titleBn: '১০. সক্রিয় ARP ক্যাশ রেজোলিউশন',
      taskEn: 'View the local ARP cache table mapping IP addresses to physical MACs with `arp -a`.',
      taskBn: '`arp -a` দিয়ে আইপি এবং ম্যাক এড্রেসের রেজোলিউশন ক্যাশ টেবিল দেখুন।',
      targetCommandCheck: (c) => c.startsWith('arp'),
      isCompleted: false,
      hintEn: 'Type: arp -a',
      hintBn: 'টাইপ করুন: arp -a'
    }
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  useEffect(() => {
    if (initialCommand) {
      executeBashCommand(initialCommand);
    }
  }, [initialCommand]);

  const executeBashCommand = (cmd: string) => {
    const raw = cmd.trim();
    if (!raw) return;

    // Add to history list
    setCmdHistoryList(prev => [...prev, raw]);
    setHistoryPointer(-1);

    // Check challenge completion
    setChallenges(prev => prev.map(ch => {
      if (!ch.isCompleted && ch.targetCommandCheck(raw)) {
        return { ...ch, isCompleted: true };
      }
      return ch;
    }));

    if (raw === 'clear') {
      setTerminalHistory([]);
      setInputCmd('');
      return;
    }

    const parts = raw.split(' ');
    const mainCmd = parts[0];
    const args = parts.slice(1);

    let output: string[] = [];

    switch (mainCmd) {
      case 'pwd':
        output = [currentPath];
        break;

      case 'whoami':
        output = [currentUser];
        break;

      case 'id':
        output = [
          currentUser === 'root'
            ? 'uid=0(root) gid=0(root) groups=0(root)'
            : 'uid=1000(cmnatic) gid=1000(cmnatic) groups=1000(cmnatic),27(sudo),100(users)'
        ];
        break;

      case 'date':
        output = [new Date().toUTCString()];
        break;

      case 'cd':
        const targetDir = args[0] || '~';
        if (targetDir === '~' || targetDir === '/home/cmnatic') {
          setCurrentPath('/home/cmnatic');
        } else if (targetDir === '/') {
          setCurrentPath('/');
        } else if (targetDir === '..') {
          if (currentPath !== '/') {
            const up = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';
            setCurrentPath(up);
          }
        } else {
          // Resolve relative or absolute
          let resolved = targetDir.startsWith('/') ? targetDir : `${currentPath === '/' ? '' : currentPath}/${targetDir}`;
          resolved = resolved.replace(/\/+/g, '/');
          if (fileSystem[resolved]) {
            setCurrentPath(resolved);
          } else {
            output = [`bash: cd: ${targetDir}: No such file or directory`];
          }
        }
        break;

      case 'ls':
        const isDetailed = args.includes('-la') || args.includes('-l') || args.includes('-al');
        const currentFiles = fileSystem[currentPath] || [];

        if (isDetailed) {
          output = [
            `total ${currentFiles.length * 4}`,
            `drwxr-xr-x 4 ${currentUser} ${currentUser} 4096 Oct  6 10:00 .`,
            `drwxr-xr-x 8 root root 4096 Oct  6 09:30 ..`,
            ...currentFiles.map(f => `${f.permissions || '-rw-r--r--'} 1 ${f.owner || currentUser} ${f.owner || currentUser} 1024 Oct  6 10:00 ${f.name}`)
          ];
        } else {
          output = [currentFiles.map(f => f.name).join('   ') || '(empty directory)'];
        }
        break;

      case 'mkdir':
        const newFolder = args[0];
        if (!newFolder) {
          output = ['mkdir: missing operand'];
        } else {
          const currentFiles = fileSystem[currentPath] || [];
          if (currentFiles.some(f => f.name === newFolder)) {
            output = [`mkdir: cannot create directory ‘${newFolder}’: File exists`];
          } else {
            const updated = [...currentFiles, { name: newFolder, type: 'dir' as const, permissions: 'drwxr-xr-x', owner: currentUser }];
            setFileSystem(prev => ({
              ...prev,
              [currentPath]: updated,
              [`${currentPath === '/' ? '' : currentPath}/${newFolder}`]: []
            }));
            output = [];
          }
        }
        break;

      case 'touch':
        const newFile = args[0];
        if (!newFile) {
          output = ['touch: missing file operand'];
        } else {
          const currentFiles = fileSystem[currentPath] || [];
          if (!currentFiles.some(f => f.name === newFile)) {
            const updated = [...currentFiles, { name: newFile, type: 'file' as const, content: '', permissions: '-rw-r--r--', owner: currentUser }];
            setFileSystem(prev => ({ ...prev, [currentPath]: updated }));
          }
          output = [];
        }
        break;

      case 'cat':
        const targetCat = args[0];
        if (!targetCat) {
          output = ['cat: missing file operand'];
        } else {
          let resolvedCatPath = currentPath;
          let filename = targetCat;

          if (targetCat.includes('/')) {
            resolvedCatPath = targetCat.substring(0, targetCat.lastIndexOf('/')) || '/';
            filename = targetCat.substring(targetCat.lastIndexOf('/') + 1);
          }

          const dirFiles = fileSystem[resolvedCatPath] || [];
          const found = dirFiles.find(f => f.name === filename);

          if (found && found.type === 'file') {
            output = (found.content || '(empty file)').split('\n');
          } else if (found && found.type === 'dir') {
            output = [`cat: ${targetCat}: Is a directory`];
          } else {
            output = [`cat: ${targetCat}: No such file or directory`];
          }
        }
        break;

      case 'grep':
        const query = (args[0] || '').replace(/['"]/g, '');
        const grepFile = args[1] || '';
        const currentFilesGrep = fileSystem[currentPath] || [];
        const fileToGrep = currentFilesGrep.find(f => f.name === grepFile);

        if (fileToGrep && fileToGrep.content) {
          const matches = fileToGrep.content.split('\n').filter(line => line.toLowerCase().includes(query.toLowerCase()));
          output = matches.length > 0 ? matches : [];
        } else if (!grepFile) {
          output = ['Usage: grep "word" <file>'];
        } else {
          output = [`grep: ${grepFile}: No such file or directory`];
        }
        break;

      case 'chmod':
        output = [`mode of '${args[1] || 'file'}' changed to ${args[0] || '+x'}`];
        break;

      case 'rm':
        const rmTarget = args[args.length - 1];
        if (!rmTarget) {
          output = ['rm: missing operand'];
        } else {
          const currentFiles = fileSystem[currentPath] || [];
          const filtered = currentFiles.filter(f => f.name !== rmTarget);
          setFileSystem(prev => ({ ...prev, [currentPath]: filtered }));
          output = [];
        }
        break;

      case 'nmap':
        output = [
          'Starting Nmap 7.94 ( https://nmap.org )',
          `Nmap scan report for ${args[args.length - 1] || '192.168.1.1'}`,
          'Host is up (0.0021s latency).',
          'PORT     STATE SERVICE     VERSION',
          '22/tcp   open  ssh         OpenSSH 8.9p1 Ubuntu',
          '80/tcp   open  http        Apache httpd 2.4.52',
          '443/tcp  open  ssl/https   Apache httpd 2.4.52',
          '8080/tcp open  http-proxy  Squid http proxy 4.13',
          'MAC Address: 00:1A:2B:3C:4D:5E (Cisco Systems)',
          'Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds'
        ];
        break;

      case 'sqlmap':
        output = [
          '    ___',
          '   __H__',
          ' ___ ___[)]_____ ___ ___  {1.7.12#stable}',
          '|_ -| . ["]     | .\'| . |',
          '|___|_  ["]_|_|_|__,|  _|   https://sqlmap.org',
          '      |_|V...       |_|',
          '[+] Testing parameter for SQL Injection...',
          '[+] Parameter `id` is vulnerable! Type: Boolean-based blind & UNION query',
          'Available databases [2]:',
          '[*] web_production',
          '[*] information_schema'
        ];
        break;

      case 'john':
        output = [
          'Loaded 2 password hashes (sha512crypt [SHA512 128/128 AVX 2x])',
          'Cost 1 (iteration count) is 5000 for all loaded hashes',
          'Will run 8 OpenMP threads',
          'Press \'q\' or Ctrl-C to abort',
          'password123      (john)',
          '123456           (admin)',
          '2 password hashes cracked, 0 left'
        ];
        break;

      case 'hashcat':
        output = [
          'hashcat (v6.2.6) starting in benchmark mode...',
          'Hardware.Mon.#1..: Temp: 62c Fan: 44% Util: 98% Core: 2520MHz',
          'Speed.#1.........: 45,210.4 MH/s (45 Billion hashes/sec)',
          'Session..........: hashcat',
          'Status...........: Cracked'
        ];
        break;

      case 'nikto':
        output = [
          '- Nikto v2.5.0',
          '+ Target IP:          192.168.1.1',
          '+ Target Port:        80',
          '+ Server:             Apache/2.4.52 (Ubuntu)',
          '+ Anti-clickjacking X-Frame-Options header missing.',
          '+ /robots.txt: Entry found with 2 disallowed paths.',
          '+ 1 Host(s) tested'
        ];
        break;

      case 'hydra':
        output = [
          'Hydra v9.5 (c) 2023 by van Hauser / THC',
          '[DATA] max 16 tasks per target, 1 target, 1000 login tries',
          '[22][ssh] host: 192.168.1.1   login: admin   password: password123',
          '1 of 1 target completed, 1 valid password found'
        ];
        break;

      case 'frida':
        output = [
          '     ____',
          '    / _  |   Frida 16.2.1 - A world-class dynamic instrumentation toolkit',
          '   /_/ |_|',
          '[USB::Pixel 7]-> Hooking classes.dex...',
          '[+] SSL Pinning patched! Intercepting plaintext HTTPS.'
        ];
        break;

      case 'netcat':
      case 'nc':
        output = [
          'Listening on 0.0.0.0 4444 ...',
          'Connection received from 192.168.1.50 54122',
          'uid=1000(cmnatic) gid=1000(cmnatic)'
        ];
        break;

      case 'ping': {
        const target = args.find(a => !a.startsWith('-')) || '8.8.8.8';
        const isLocal = target.startsWith('192.168.1.');
        const rttBase = isLocal ? 1.42 : 14.28;
        output = [
          `PING ${target} (${target}) 56(84) bytes of data.`,
          `64 bytes from ${target}: icmp_seq=1 ttl=64 time=${(rttBase + Math.random() * 0.3).toFixed(2)} ms`,
          `64 bytes from ${target}: icmp_seq=2 ttl=64 time=${(rttBase + Math.random() * 0.3).toFixed(2)} ms`,
          `64 bytes from ${target}: icmp_seq=3 ttl=64 time=${(rttBase + Math.random() * 0.3).toFixed(2)} ms`,
          `64 bytes from ${target}: icmp_seq=4 ttl=64 time=${(rttBase + Math.random() * 0.3).toFixed(2)} ms`,
          '',
          `--- ${target} ping statistics ---`,
          '4 packets transmitted, 4 received, 0% packet loss, time 3004ms',
          `rtt min/avg/max/mdev = ${rttBase.toFixed(3)}/${(rttBase + 0.15).toFixed(3)}/${(rttBase + 0.38).toFixed(3)}/0.145 ms`
        ];
        break;
      }

      case 'ifconfig':
        output = [
          'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
          '        inet 192.168.1.50  netmask 255.255.255.0  broadcast 192.168.1.255',
          '        inet6 fe80::a00:27ff:fe4c:892a  prefixlen 64  scopeid 0x20<link>',
          `        ether ${currentMac}  txqueuelen 1000  (Ethernet)`,
          '        RX packets 24102  bytes 18942104 (18.0 MB)',
          '        RX errors 0  dropped 0  overruns 0  frame 0',
          '        TX packets 19280  bytes 12948190 (12.3 MB)',
          '        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0',
          '',
          'lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536',
          '        inet 127.0.0.1  netmask 255.0.0.0',
          '        inet6 ::1  prefixlen 128  scopeid 0x10<host>',
          '        loop  txqueuelen 1000  (Local Loopback)',
          '        RX packets 512  bytes 48192 (47.0 KB)',
          '        TX packets 512  bytes 48192 (47.0 KB)'
        ];
        break;

      case 'ip': {
        const sub = args[0] || 'a';
        if (sub === 'a' || sub === 'addr' || sub === 'address') {
          output = [
            '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000',
            '    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00',
            '    inet 127.0.0.1/8 scope host lo',
            '       valid_lft forever preferred_lft forever',
            '    inet6 ::1/128 scope host',
            '       valid_lft forever preferred_lft forever',
            '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000',
            `    link/ether ${currentMac} brd ff:ff:ff:ff:ff:ff`,
            '    inet 192.168.1.50/24 brd 192.168.1.255 scope global dynamic eth0',
            '       valid_lft 86320sec preferred_lft 86320sec',
            '    inet6 fe80::a00:27ff:fe4c:892a/64 scope link',
            '       valid_lft forever preferred_lft forever'
          ];
        } else if (sub === 'route' || sub === 'r') {
          output = [
            'default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.50 metric 100',
            '192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.50 metric 100'
          ];
        } else if (sub === 'link') {
          output = [
            '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT',
            `2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT qlen 1000`,
            `    link/ether ${currentMac} brd ff:ff:ff:ff:ff:ff`
          ];
        } else {
          output = ['Usage: ip [ addr | route | link ]'];
        }
        break;
      }

      case 'arp':
        output = [
          'Address                  HWtype  HWaddress           Flags Mask            Iface',
          '192.168.1.1              ether   00:1a:2b:3c:4d:5e   C                     eth0',
          '192.168.1.254            ether   00:50:56:c0:00:08   C                     eth0',
          '192.168.1.80             ether   3c:52:82:11:22:33   C                     eth0'
        ];
        break;

      case 'macchanger': {
        const flag = args[0] || '-s';
        if (flag === '-s' || flag === '--show') {
          output = [
            `Current MAC:   ${currentMac} (Active spoofed NIC)`,
            `Permanent MAC: ${permanentMac} (Cisco Systems, Inc.)`
          ];
        } else if (flag === '-r' || flag === '--random') {
          const hex = '0123456789abcdef';
          const randomMac = Array.from({ length: 6 }, () => 
            hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)]
          ).join(':');
          const prev = currentMac;
          setCurrentMac(randomMac);
          output = [
            `Current MAC:   ${prev} (previous)`,
            `Permanent MAC: ${permanentMac} (Cisco Systems, Inc.)`,
            `New MAC:       ${randomMac} (Randomized Spoofed MAC Address)`
          ];
        } else if (flag === '-p' || flag === '--permanent') {
          setCurrentMac(permanentMac);
          output = [
            `Current MAC:   ${currentMac}`,
            `Permanent MAC: ${permanentMac}`,
            `Reset to permanent hardware MAC: ${permanentMac}`
          ];
        } else if (flag === '-m' && args[1]) {
          const chosenMac = args[1];
          setCurrentMac(chosenMac);
          output = [
            `Current MAC:   ${currentMac}`,
            `Permanent MAC: ${permanentMac}`,
            `New MAC:       ${chosenMac} (Custom Specified)`
          ];
        } else {
          output = [
            'GNU MAC Changer v1.7.0',
            'Usage: macchanger [options] device',
            '  -s, --show             Show the MAC address',
            '  -r, --random           Set fully random MAC address',
            '  -p, --permanent        Reset to original, permanent hardware MAC',
            '  -m, --mac=XX:XX:...    Set custom MAC address'
          ];
        }
        break;
      }

      case 'traceroute': {
        const host = args.find(a => !a.startsWith('-')) || '8.8.8.8';
        output = [
          `traceroute to ${host} (${host}), 30 hops max, 60 byte packets`,
          ' 1  _gateway (192.168.1.1)  1.218 ms  1.154 ms  1.121 ms',
          ' 2  10.120.0.1 (10.120.0.1)  4.312 ms  4.298 ms  4.350 ms',
          ' 3  172.217.168.45 (172.217.168.45)  11.230 ms  11.190 ms  11.240 ms',
          ` 4  ${host} (${host})  14.210 ms  14.150 ms  14.090 ms`
        ];
        break;
      }

      case 'curl': {
        const targetUrl = args[args.length - 1] || 'http://192.168.1.1';
        output = [
          'HTTP/1.1 200 OK',
          `Date: ${new Date().toUTCString()}`,
          'Server: Apache/2.4.52 (Ubuntu)',
          'Content-Type: text/html; charset=UTF-8',
          'Connection: keep-alive',
          '',
          '<!DOCTYPE html>',
          '<html><head><title>NetSim Secure Gateway</title></head>',
          `<body><h1>Status: Online (Target: ${targetUrl})</h1><p>Firewall: ACTIVE | NAT/PAT: ENABLED</p></body></html>`
        ];
        break;
      }

      case 'wget': {
        const targetUrl = args[args.length - 1] || 'http://192.168.1.1/index.html';
        output = [
          `--2026-10-06 10:20:00--  ${targetUrl}`,
          'Resolving gateway... 192.168.1.1',
          'Connecting to 192.168.1.1:80... connected.',
          'HTTP request sent, awaiting response... 200 OK',
          'Length: 412 [text/html]',
          'Saving to: ‘index.html’',
          '',
          'index.html          100%[===================>]     412  --.-KB/s    in 0s',
          '',
          '2026-10-06 10:20:00 (12.4 MB/s) - ‘index.html’ saved [412/412]'
        ];
        break;
      }

      case 'netstat':
        output = [
          'Active Internet connections (only servers)',
          'Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name',
          'tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      842/sshd',
          'tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1024/apache2',
          'tcp        0      0 0.0.0.0:443             0.0.0.0:*               LISTEN      1024/apache2',
          'udp        0      0 0.0.0.0:68              0.0.0.0:*                           620/dhclient'
        ];
        break;

      case 'ss':
        output = [
          'State     Recv-Q    Send-Q       Local Address:Port        Peer Address:Port    Process',
          'LISTEN    0         128                0.0.0.0:22               0.0.0.0:*        users:(("sshd",pid=842,fd=3))',
          'LISTEN    0         511                0.0.0.0:80               0.0.0.0:*        users:(("apache2",pid=1024,fd=4))',
          'LISTEN    0         511                0.0.0.0:443              0.0.0.0:*        users:(("apache2",pid=1024,fd=6))'
        ];
        break;

      case 'iptables':
        output = [
          'Chain INPUT (policy ACCEPT 1420 packets, 185K bytes)',
          'target     prot opt source               destination         ',
          'ACCEPT     all  --  anywhere             anywhere             state RELATED,ESTABLISHED',
          'DROP       tcp  --  anywhere             anywhere             tcp dpt:telnet',
          'DROP       tcp  --  anywhere             anywhere             tcp dpt:microsoft-ds',
          '',
          'Chain FORWARD (policy DROP 0 packets, 0 bytes)',
          'target     prot opt source               destination         ',
          '',
          'Chain OUTPUT (policy ACCEPT 1940 packets, 342K bytes)',
          'target     prot opt source               destination'
        ];
        break;

      case 'uname':
        if (args.includes('-a')) {
          output = ['Linux kali-netsim 6.8.0-kali1-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'];
        } else if (args.includes('-r')) {
          output = ['6.8.0-kali1-amd64'];
        } else {
          output = ['Linux'];
        }
        break;

      case 'sudo':
        if (args[0] === 'su' || args[0] === '-i') {
          setCurrentUser('root');
          output = ['Switched user to root (#). Full administrative privileges granted.'];
        } else if (args.length > 0) {
          executeBashCommand(args.join(' '));
          return;
        } else {
          output = ['usage: sudo [command] | sudo su'];
        }
        break;

      case 'su':
        setCurrentUser('root');
        output = ['Switched user to root (#).'];
        break;

      case 'exit':
        if (currentUser === 'root') {
          setCurrentUser('cmnatic');
          output = ['exit: session returned to cmnatic ($).'];
        } else {
          output = ['exit: session cannot be terminated in sandbox simulator.'];
        }
        break;

      case 'echo': {
        const echoRaw = args.join(' ');
        if (echoRaw.includes('>')) {
          const [textPart, filePart] = echoRaw.split('>');
          const cleanText = textPart.trim().replace(/^["']|["']$/g, '');
          const cleanFilename = filePart.trim();
          if (cleanFilename) {
            const currentFiles = fileSystem[currentPath] || [];
            const existing = currentFiles.find(f => f.name === cleanFilename);
            if (existing) {
              existing.content = cleanText;
              setFileSystem(prev => ({ ...prev }));
            } else {
              const updated = [...currentFiles, { name: cleanFilename, type: 'file' as const, content: cleanText, permissions: '-rw-r--r--', owner: currentUser }];
              setFileSystem(prev => ({ ...prev, [currentPath]: updated }));
            }
          }
          output = [];
        } else {
          output = [echoRaw.replace(/^["']|["']$/g, '')];
        }
        break;
      }

      case 'head':
      case 'tail': {
        const fTarget = args[args.length - 1];
        const currentFiles = fileSystem[currentPath] || [];
        const foundF = currentFiles.find(f => f.name === fTarget);
        if (foundF && foundF.content) {
          const lines = foundF.content.split('\n');
          output = mainCmd === 'head' ? lines.slice(0, 5) : lines.slice(-5);
        } else {
          output = [`${mainCmd}: ${fTarget || ''}: No such file`];
        }
        break;
      }

      case 'wc': {
        const fTarget = args[args.length - 1] || 'notes.txt';
        output = [`  14  82 640 ${fTarget}`];
        break;
      }

      case 'nslookup':
      case 'dig': {
        const domain = args.find(a => !a.startsWith('-')) || 'google.com';
        output = [
          'Server:         8.8.8.8',
          'Address:        8.8.8.8#53',
          '',
          'Non-authoritative answer:',
          `Name:   ${domain}`,
          'Address: 142.250.190.46',
          `Name:   ${domain}`,
          'Address: 2607:f8b0:4004:800::200e'
        ];
        break;
      }

      case 'free':
        output = [
          '               total        used        free      shared  buff/cache   available',
          'Mem:           15920        3480        8450         410        3990       11980',
          'Swap:           4096           0        4096'
        ];
        break;

      case 'df':
        output = [
          'Filesystem     1K-blocks      Used Available Use% Mounted on',
          '/dev/nvme0n1p2 244589200  48920140 183204900  22% /',
          'tmpfs            8151200         0   8151200   0% /dev/shm'
        ];
        break;

      case 'history':
        output = cmdHistoryList.map((c, i) => `  ${i + 1}  ${c}`);
        break;

      case 'help':
        output = [
          'NetSim Linux Terminal Simulator - Supported Commands:',
          '  Navigation:      pwd, ls, ls -la, cd <dir>, cd .., cd ~, cd /',
          '  File Operations: cat <file>, touch <file>, mkdir <dir>, rm <file>, echo <txt> > <file>, head, tail, wc, grep <query> <file>',
          '  Networking:      ping <host>, ifconfig, ip [a|route|link], arp -a, macchanger [-s|-r|-p], traceroute <host>, curl <url>, wget <url>, netstat, ss, nslookup, dig',
          '  System & Admin:  whoami, id, uname -a, date, sudo [cmd], su, free, df, history, clear, exit',
          '  Security Tools:  nmap, sqlmap, john, hashcat, nikto, hydra, frida, nc, iptables'
        ];
        break;

      default:
        output = [`bash: ${mainCmd}: command not found. Type 'help' for available commands.`];
        break;
    }

    setTerminalHistory(prev => [
      ...prev,
      {
        cmd: raw,
        output
      }
    ]);
    setInputCmd('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistoryList.length > 0) {
        const nextPtr = historyPointer === -1 ? cmdHistoryList.length - 1 : Math.max(0, historyPointer - 1);
        setHistoryPointer(nextPtr);
        setInputCmd(cmdHistoryList[nextPtr] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer !== -1) {
        const nextPtr = historyPointer + 1;
        if (nextPtr < cmdHistoryList.length) {
          setHistoryPointer(nextPtr);
          setInputCmd(cmdHistoryList[nextPtr] || '');
        } else {
          setHistoryPointer(-1);
          setInputCmd('');
        }
      }
    }
  };

  const completedCount = challenges.filter(c => c.isCompleted).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {lang === 'en' ? 'Linux Bash Interactive Terminal & Practice Lab' : 'লিনাক্স লাইভ টার্মিনাল সিমুলেটর ও প্র্যাকটিস ল্যাব'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {lang === 'en'
                  ? 'Fully interactive in-browser Linux shell with virtual filesystem, real file creation, bash commands, cybersecurity tools, and hands-on quests.'
                  : 'ব্রাউজারেই বাস্তব লিনাক্স শেল! কমান্ড লিখে ফাইল তৈরি করুন, ডিরেক্টরি ব্রাউজ করুন, সাইবার সিকিউরিটি টুলস রান করুন এবং প্র্যাকটিস চ্যালেঞ্জ সমাধান করুন।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User Toggle: cmnatic vs root */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 pl-1.5">User:</span>
              <button
                onClick={() => setCurrentUser('cmnatic')}
                className={`px-2 py-0.5 rounded transition ${currentUser === 'cmnatic' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                cmnatic ($)
              </button>
              <button
                onClick={() => setCurrentUser('root')}
                className={`px-2 py-0.5 rounded transition ${currentUser === 'root' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                root (#)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Terminal Window on Left, Quests / Challenges on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Terminal Screen (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
            {/* Window Title Bar */}
            <div className="bg-slate-900 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-[11px] text-slate-400 ml-2 font-semibold">
                  {currentUser}@{currentUser === 'root' ? 'kali-root' : 'kali-netsim'}: {currentPath} ({currentUser === 'root' ? '#' : '$'})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTerminalHistory([])}
                  className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700 transition"
                >
                  Clear Screen
                </button>
                <span className="text-[10px] text-emerald-400 font-bold">100% In-Memory Bash</span>
              </div>
            </div>

            {/* Scrollable Terminal Screen */}
            <div className="p-4 space-y-2 text-slate-200 min-h-[380px] max-h-[480px] overflow-y-auto leading-relaxed">
              <div className="text-slate-500 text-[11px] pb-1 border-b border-slate-900">
                Linux Sandbox Ready. Virtual Filesystem Mounted at /home/cmnatic. Type commands or click challenges on the right!
              </div>

              {terminalHistory.map((h, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={currentUser === 'root' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {currentUser}@kali:{currentPath}{currentUser === 'root' ? '#' : '$'}
                    </span>
                    <span className="text-white font-bold">{h.cmd}</span>
                  </div>

                  {h.output.length > 0 && (
                    <div className="text-slate-300 pl-2 border-l border-slate-800 space-y-0.5 font-mono text-[11px]">
                      {h.output.map((line, lIdx) => {
                        const isDir = line.startsWith('d') || line.includes('Is a directory');
                        const isSuccess = line.includes('Cracked') || line.includes('UP') || line.includes('vulnerable') || line.includes('passed');
                        const isError = line.includes('command not found') || line.includes('No such file') || line.includes('cannot');

                        return (
                          <div
                            key={lIdx}
                            className={
                              isError ? 'text-rose-400 font-medium' :
                              isSuccess ? 'text-emerald-400 font-bold' :
                              isDir ? 'text-cyan-400 font-semibold' :
                              'text-slate-300'
                            }
                          >
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              {/* Active Terminal Input Row */}
              <form onSubmit={(e) => { e.preventDefault(); executeBashCommand(inputCmd); }} className="flex items-center gap-1.5 pt-1">
                <span className={currentUser === 'root' ? 'text-rose-400 font-bold shrink-0' : 'text-emerald-400 font-bold shrink-0'}>
                  {currentUser}@kali:{currentPath}{currentUser === 'root' ? '#' : '$'}
                </span>
                <input
                  type="text"
                  value={inputCmd}
                  onChange={(e) => setInputCmd(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  placeholder="type command (e.g. ls -la, cat notes.txt, nmap 192.168.1.1)..."
                  className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none"
                />
              </form>
              <div ref={terminalEndRef} />
            </div>

            {/* Quick Practice Commands Bar */}
            <div className="bg-slate-900 p-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500 uppercase font-bold text-[10px]">Quick Click:</span>
                {['pwd', 'ls -la', 'ping 8.8.8.8', 'ifconfig', 'ip a', 'arp -a', 'macchanger -r eth0', 'traceroute 8.8.8.8', 'curl http://192.168.1.1', 'nmap 192.168.1.1', 'cat notes.txt', 'cat /var/log/flag.txt', 'help'].map(c => (
                  <button
                    key={c}
                    onClick={() => executeBashCommand(c)}
                    className="px-2 py-0.5 rounded bg-slate-950 hover:bg-slate-800 text-cyan-300 hover:text-white border border-slate-800 font-mono transition"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Practice Quests & Challenges (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? 'Practice Quests & Lab' : 'প্র্যাকটিস ল্যাব চ্যালেঞ্জ'}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                {completedCount} / {challenges.length} Done
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {lang === 'en'
                ? 'Solve these real-world Linux and cybersecurity challenges. Type the required commands into the terminal on the left to unlock rewards!'
                : 'বামের টার্মিনালে কমান্ডগুলো প্র্যাকটিস করুন। সঠিকভাবে কমান্ড রান করলে চ্যালেঞ্জগুলো সবুজ ব্যাজে আনলক হবে!'}
            </p>

            {/* Challenge Cards List */}
            <div className="space-y-2.5">
              {challenges.map(ch => (
                <div
                  key={ch.id}
                  className={`p-3 rounded-xl border transition-all text-xs space-y-1.5 ${
                    ch.isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      {ch.isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />
                      )}
                      <span>{lang === 'en' ? ch.titleEn : ch.titleBn}</span>
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      ch.isCompleted ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-900 text-slate-400'
                    }`}>
                      {ch.isCompleted ? 'SOLVED' : 'PENDING'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {lang === 'en' ? ch.taskEn : ch.taskBn}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Hint: {lang === 'en' ? ch.hintEn : ch.hintBn}</span>
                    <button
                      onClick={() => executeBashCommand(ch.hintEn.replace('Type: ', ''))}
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Auto-solve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Reward Notification if All Completed */}
            {completedCount === challenges.length && (
              <div className="p-3 rounded-lg bg-gradient-to-r from-amber-950/60 to-emerald-950/60 border border-amber-500 text-center space-y-1 animate-pulse">
                <Sparkles className="w-5 h-5 text-amber-400 mx-auto" />
                <h4 className="text-xs font-bold text-amber-300">Congratulations! All Quests Solved!</h4>
                <p className="text-[11px] text-slate-300">You have mastered core Linux file operations, grep search, and security tools.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
