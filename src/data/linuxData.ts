export interface LinuxCommand {
  command: string;
  name: string;
  descEn: string;
  descBn: string;
  category: string;
  exampleOutput?: string[];
  syntax?: string;
  tipBn?: string;
}

export interface LinuxDirectoryInfo {
  dir: string;
  nameBn: string;
  descEn: string;
  descBn: string;
  color: string;
}

export interface TroubleshootingItem {
  id: string;
  titleEn: string;
  titleBn: string;
  errorSnippet: string;
  causeEn: string;
  causeBn: string;
  solutionCommand: string;
  solutionDescEn: string;
  solutionDescBn: string;
}

export const LINUX_DIRECTORIES: LinuxDirectoryInfo[] = [
  {
    dir: '/',
    nameBn: 'Root Directory (মূল ডিরেক্টরি)',
    descEn: 'The top-level root of the entire Linux hierarchy. Everything starts from here.',
    descBn: 'লিনাক্স ফাইল সিস্টেমের একদম মূল বা শুরুর স্থান। সকল ড্রাইভ ও ফোল্ডার এর নিচে থাকে।',
    color: '#ef4444' // red
  },
  {
    dir: '/home',
    nameBn: 'Home Directory (ব্যবহারকারীর নিজস্ব ফোল্ডার)',
    descEn: 'Stores personal files, documents, and desktop profiles for standard users (e.g. /home/user).',
    descBn: 'ব্যবহারকারীদের ব্যক্তিগত ফোল্ডারসমূহ ও ডাউনলোড/ডকুমেন্ট রাখা থাকে।',
    color: '#3b82f6' // blue
  },
  {
    dir: '/etc',
    nameBn: 'Configuration Files (সিস্টেম কনফিগারেশন)',
    descEn: 'Contains system-wide configuration files and startup scripts (e.g. /etc/passwd, /etc/network).',
    descBn: 'সিস্টেম ও ইনস্টল করা সফটওয়্যারের কনফিগারেশন ফাইল থাকে।',
    color: '#8b5cf6' // purple
  },
  {
    dir: '/var',
    nameBn: 'Variable Data & Logs (লগ ও ডেটা)',
    descEn: 'Variable data that constantly changes: system logs (/var/log), web files (/var/www), mail queues.',
    descBn: 'সিস্টেমের লগ ফাইল ও পরিবর্তনশীল ডেটা সুরক্ষিত থাকে।',
    color: '#f59e0b' // amber
  },
  {
    dir: '/tmp',
    nameBn: 'Temporary Files (সাময়িক ফাইল)',
    descEn: 'Temporary files created by apps. Cleared automatically on system reboot.',
    descBn: 'সাময়িক বা অস্থায়ী ফাইল থাকে (পিসি রিবুট দিলে মুছে যায়)।',
    color: '#ec4899' // pink
  },
  {
    dir: '/bin',
    nameBn: 'Essential User Binaries (মৌলিক কমান্ড ফাইল)',
    descEn: 'Essential executable binary programs for all users (e.g. bash, ls, ping, cp, cat).',
    descBn: 'জরুরী ও মৌলিক লিনাক্স কমান্ডগুলোর বাইনারি এক্সিকিউটেবল ফাইল থাকে।',
    color: '#10b981' // emerald
  }
];

export const LINUX_COMMANDS: LinuxCommand[] = [
  // 1. Navigation
  {
    command: 'pwd',
    name: 'Print Working Directory',
    descEn: 'Displays the full absolute pathname of the current active working directory.',
    descBn: 'বর্তমানে আপনি কোন ডিরেক্টরিতে অবস্থান করছেন তা দেখায়।',
    category: 'navigation',
    syntax: 'pwd',
    exampleOutput: ['/home/cmnatic/cyber_labs']
  },
  {
    command: 'ls -la',
    name: 'List All Detailed',
    descEn: 'Lists all files including hidden ones (.dotfiles) with permissions, owner, size, and date.',
    descBn: 'হিডেন ফাইলসহ ডিরেক্টরির সব ফাইল ও ফোল্ডার বিস্তারিত সহ দেখায়।',
    category: 'navigation',
    syntax: 'ls -la',
    exampleOutput: [
      'total 48',
      'drwxr-xr-x 4 cmnatic cmnatic 4096 Oct  6 10:00 .',
      'drwxr-xr-x 8 cmnatic cmnatic 4096 Oct  6 09:30 ..',
      '-rw-r--r-- 1 cmnatic cmnatic  220 Oct  6 09:00 .bash_logout',
      '-rw-r--r-- 1 cmnatic cmnatic 3771 Oct  6 09:00 .bashrc',
      'drwxr-xr-x 2 cmnatic cmnatic 4096 Oct  6 10:15 logs',
      '-rwxr-xr-x 1 cmnatic cmnatic  842 Oct  6 10:20 scan.sh',
      '-rw-r--r-- 1 cmnatic cmnatic 1024 Oct  6 10:22 notes.txt'
    ],
    tipBn: 'কালার কোড: ব্লু = ফোল্ডার (Directory), গ্রিন = এক্সিকিউটেবল স্ক্রিপ্ট, সাদা = সাধারণ টেক্সট ফাইল।'
  },
  {
    command: 'cd [folder_name]',
    name: 'Change Directory',
    descEn: 'Moves your active terminal into the specified directory.',
    descBn: 'নির্দিষ্ট কোনো ফোল্ডারের ভেতরে প্রবেশ করার জন্য।',
    category: 'navigation',
    syntax: 'cd <folder_path>',
    exampleOutput: ['cmnatic@CMNatic-THM-LPTOP:~/cyber_labs$']
  },
  {
    command: 'cd /',
    name: 'Change to Root',
    descEn: 'Navigates immediately to the root filesystem directory.',
    descBn: 'সরাসরি লিনাক্সের মূল বা রুট (Root) ডিরেক্টরিতে যাওয়ার জন্য।',
    category: 'navigation',
    syntax: 'cd /',
    exampleOutput: ['cmnatic@CMNatic-THM-LPTOP:/$']
  },
  {
    command: 'cd ..',
    name: 'Move Up One Directory',
    descEn: 'Moves up one level into the parent directory.',
    descBn: 'এক ধাপ পেছনের ডিরেক্টরিতে ফিরে আসার জন্য।',
    category: 'navigation',
    syntax: 'cd ..',
    exampleOutput: ['cmnatic@CMNatic-THM-LPTOP:~$']
  },
  {
    command: 'cd ~',
    name: 'Change to Home',
    descEn: 'Navigates directly to current user home directory (/home/username).',
    descBn: 'সরাসরি মেইন ইউজার বা Home ডিরেক্টরিতে চলে যাওয়ার জন্য।',
    category: 'navigation',
    syntax: 'cd ~',
    exampleOutput: ['cmnatic@CMNatic-THM-LPTOP:~$']
  },

  // 2. File Management
  {
    command: 'mkdir [folder_name]',
    name: 'Make Directory',
    descEn: 'Creates a brand new folder or directory.',
    descBn: 'নতুন একটি ফোল্ডার বা ডিরেক্টরি তৈরি করার জন্য।',
    category: 'management',
    syntax: 'mkdir <folder_name>',
    exampleOutput: ['Folder created: project_alpha']
  },
  {
    command: 'rm [file_name]',
    name: 'Remove File',
    descEn: 'Permanently deletes a specified file from storage.',
    descBn: 'কোনো নির্দিষ্ট ফাইল স্থায়ীভাবে ডিলিট বা মুছে ফেলার জন্য।',
    category: 'management',
    syntax: 'rm <file_name>',
    exampleOutput: ['File deleted: old_notes.txt']
  },
  {
    command: 'rm -rf [folder_name]',
    name: 'Force Remove Directory',
    descEn: 'Recursively and forcefully deletes a directory and all nested files without prompting.',
    descBn: 'যেকোনো ফোল্ডার এবং তার ভেতরের সবকিছু ডিলিট করার জন্য।',
    category: 'management',
    syntax: 'rm -rf <folder_name>',
    exampleOutput: ['Deleted directory and all contents: temp_dump/']
  },
  {
    command: 'cp [file] [destination]',
    name: 'Copy File',
    descEn: 'Copies a file to another path or duplicate name.',
    descBn: 'ফাইল এক স্থান থেকে অন্য স্থানে কপি বা অনুলিপি করার জন্য।',
    category: 'management',
    syntax: 'cp <source> <dest>',
    exampleOutput: ['Copied config.env to config.env.bak']
  },
  {
    command: 'mv [file] [destination]',
    name: 'Move / Rename File',
    descEn: 'Moves a file to another directory or renames it in place.',
    descBn: 'ফাইল অন্য স্থানে সরাতে বা ফাইলের নাম পরিবর্তন করতে।',
    category: 'management',
    syntax: 'mv <source> <dest>',
    exampleOutput: ['Renamed draft.txt to final_report.txt']
  },

  // 3. Permissions & Access Control
  {
    command: 'chmod +x script.sh',
    name: 'Make Executable',
    descEn: 'Adds executable (+x) permissions to a file so it can be run directly.',
    descBn: 'কোনো ফাইল বা স্ক্রিপ্ট এক্সিকিউট বা রান করার পারমিশন দেওয়া।',
    category: 'permissions',
    syntax: 'chmod +x <filename>',
    exampleOutput: ['Permissions updated: script.sh is now executable (-rwxr-xr-x)']
  },
  {
    command: 'chmod 777 [file]',
    name: 'Full Permissions (Read/Write/Exec)',
    descEn: 'Grants complete read, write, and execute permissions to Owner, Group, and Everyone (rwxrwxrwx).',
    descBn: 'ফাইলের ফুল রিড, রাইট ও এক্সিকিউট (Full Access) পারমিশন দেওয়া।',
    category: 'permissions',
    syntax: 'chmod 777 <file>',
    exampleOutput: ['File permissions set to 777 (-rwxrwxrwx)']
  },
  {
    command: 'sudo chown user:user [file]',
    name: 'Change Ownership',
    descEn: 'Transfers user owner and group owner of a file or folder.',
    descBn: 'ফাইলের মালিকানা বা ওনারশিপ (Ownership) পরিবর্তন করা।',
    category: 'permissions',
    syntax: 'sudo chown <user>:<group> <file>',
    exampleOutput: ['Ownership changed: file now owned by cmnatic:cmnatic']
  },

  // 4. File Viewing Commands
  {
    command: 'cat file.txt',
    name: 'Concatenate & Print Entire File',
    descEn: 'Outputs the complete contents of a file to terminal stdout at once.',
    descBn: 'সম্পূর্ণ ফাইলের সকল বিষয়বস্তু একবারে আউটপুটে দেখাবে।',
    category: 'viewing',
    syntax: 'cat <file>',
    exampleOutput: [
      '# Network Configuration',
      'IP=192.168.1.50',
      'GATEWAY=192.168.1.254',
      'DNS=8.8.8.8, 1.1.1.1'
    ]
  },
  {
    command: 'cat f1.txt f2.txt',
    name: 'Concatenate Multiple Files',
    descEn: 'Merges and prints multiple files sequentially to the terminal.',
    descBn: 'একাধিক ফাইলের বিষয়বস্তু পর পর যুক্ত করে একসাথে দেখায়।',
    category: 'viewing',
    syntax: 'cat f1.txt f2.txt',
    exampleOutput: [
      '--- File 1 Content ---',
      'Server: Apache/2.4',
      '--- File 2 Content ---',
      'Status: Active (Running)'
    ]
  },
  {
    command: 'cat > newfile.txt',
    name: 'Create & Write to File Directly',
    descEn: 'Redirects terminal standard input directly into a new file until Ctrl+D is pressed.',
    descBn: 'নতুন ফাইল তৈরি করে সরাসরি টেক্সট লেখার সুবিধা দেয়। (Ctrl+D চেপে শেষ করতে হয়)',
    category: 'viewing',
    syntax: 'cat > <newfile>',
    exampleOutput: ['Type text here... Press Ctrl+D to save and exit.']
  },
  {
    command: 'less file.txt',
    name: 'Interactive Paginated File Viewer',
    descEn: 'Opens an interactive pager allowing you to scroll up/down through huge files without loading all into RAM.',
    descBn: 'ফাইলের ভেতরে স্ক্রোল করে সহজে পড়ার সুযোগ দেয়।',
    category: 'viewing',
    syntax: 'less <file>',
    exampleOutput: ['[Displaying page 1 of 50. Press Q to exit, Space for next page]']
  },
  {
    command: 'head file.txt',
    name: 'Print First 10 Lines',
    descEn: 'Displays the beginning 10 lines of a file.',
    descBn: 'ফাইলের শুরুর প্রথম ১০টি লাইন আউটপুট হিসেবে দেখাবে।',
    category: 'viewing',
    syntax: 'head <file>',
    exampleOutput: [
      'Line 1: #!/bin/bash',
      'Line 2: # Network Probe Script',
      'Line 3: echo "Starting system audit..."',
      '... (lines 4-10)'
    ]
  },
  {
    command: 'head -n 5 file.txt',
    name: 'Print First N Lines',
    descEn: 'Displays exactly the first 5 lines of a file.',
    descBn: 'ফাইলের একদম শুরুর প্রথম ৫টি লাইন নির্দেশ করে দেখাবে।',
    category: 'viewing',
    syntax: 'head -n 5 <file>',
    exampleOutput: [
      'Line 1: System Boot Initialized',
      'Line 2: Kernel: Linux 6.8.0',
      'Line 3: CPU: AMD Ryzen 7',
      'Line 4: Memory: 16384 MB',
      'Line 5: Network: eth0 link UP'
    ]
  },
  {
    command: 'tail file.txt',
    name: 'Print Last 10 Lines',
    descEn: 'Outputs the final 10 lines of a file.',
    descBn: 'ফাইলের শেষের ১০টি লাইন আউটপুট হিসেবে দেখাবে।',
    category: 'viewing',
    syntax: 'tail <file>',
    exampleOutput: [
      '... (previous lines omitted)',
      'Oct  6 10:45:01 systemd: Started Daily apt download.',
      'Oct  6 10:48:22 sshd: Accepted publickey for cmnatic from 192.168.1.105'
    ]
  },
  {
    command: 'tail -n 20 file.txt',
    name: 'Print Last N Lines',
    descEn: 'Outputs specifically the last 20 lines of a file.',
    descBn: 'ফাইলের একদম শেষের ২০টি লাইন নির্দিষ্ট করে দেখাবে।',
    category: 'viewing',
    syntax: 'tail -n 20 <file>',
    exampleOutput: ['[Displaying last 20 lines of auth.log]']
  },
  {
    command: 'tail -f file.txt',
    name: 'Live Follow File Changes',
    descEn: 'Monitors a file in real-time, streaming new lines as they are appended (e.g. live logs).',
    descBn: 'রিয়েল-টাইমে ফাইলের লাইভ পরিবর্তন মনিটর করবে।',
    category: 'viewing',
    syntax: 'tail -f <logfile>',
    exampleOutput: [
      '[Watching /var/log/syslog in real-time... Press Ctrl+C to abort]',
      'Oct  6 10:52:14 kernel: [UFW BLOCK] IN=eth0 OUT= SRC=185.220.101.5 DST=192.168.1.50 PROTO=TCP DPT=23',
      'Oct  6 10:54:02 ufw: BLOCK port 445 SMB scan probe'
    ]
  },

  // 5. Searching Inside Files (grep)
  {
    command: 'grep "word" file.txt',
    name: 'Search Exact String in File',
    descEn: 'Finds and prints every line in file.txt containing the target word.',
    descBn: 'ফাইলের ভেতরে নির্দিষ্ট কোনো শব্দ বা টেক্সট খোঁজার জন্য।',
    category: 'search',
    syntax: 'grep "word" <file>',
    exampleOutput: ['192.168.1.50:443 - - [06/Oct/2026] "GET /admin HTTP/1.1" 200']
  },
  {
    command: 'grep -i "word" file.txt',
    name: 'Case-Insensitive Search',
    descEn: 'Searches for text matching regardless of upper/lower case (e.g. Word, WORD, word).',
    descBn: 'বড় বা ছোট হাতের অক্ষর (Case-insensitive) না মেনে শব্দ সার্চ করবে।',
    category: 'search',
    syntax: 'grep -i "word" <file>',
    exampleOutput: [
      'ADMIN_USER=root',
      'Admin_Group=wheel',
      'admin_mode=enabled'
    ]
  },
  {
    command: 'grep -r "word" /path',
    name: 'Recursive Search in Folder',
    descEn: 'Searches for target word across all files in a folder and its subdirectories.',
    descBn: 'একটি ফোল্ডারের ভেতরের সকল ফাইলে একসাথে কোনো শব্দ খুঁজবে।',
    category: 'search',
    syntax: 'grep -r "word" <path>',
    exampleOutput: [
      '/etc/nginx/nginx.conf: server_name api.example.com;',
      '/etc/nginx/sites-available/default: root /var/www/html;'
    ]
  },
  {
    command: 'grep -n "word" file.txt',
    name: 'Search with Line Numbers',
    descEn: 'Displays matching lines prefixed with their exact line number.',
    descBn: 'শব্দটি ফাইলের কত নম্বর লাইনে আছে তা লাইন নম্বরসহ দেখাবে।',
    category: 'search',
    syntax: 'grep -n "word" <file>',
    exampleOutput: [
      '42: permit root login no',
      '89: password authentication yes'
    ]
  },

  // 6. Cyber Security Tools
  {
    command: 'nmap -sV [IP/Domain]',
    name: 'Nmap Service Version Scan',
    descEn: 'Scans target IP/Domain for open ports and probes service names and versions.',
    descBn: 'টার্গেট আইপির ওপেন পোর্ট ও সার্ভিস ভার্সন স্ক্যান করতে।',
    category: 'security',
    syntax: 'nmap -sV <IP>',
    exampleOutput: [
      'Starting Nmap 7.94 ( https://nmap.org )',
      'PORT    STATE SERVICE  VERSION',
      '22/tcp  open  ssh      OpenSSH 8.9p1 Ubuntu',
      '80/tcp  open  http     Apache httpd 2.4.52 ((Ubuntu))',
      '443/tcp open  ssl/http Apache httpd 2.4.52 ((Ubuntu))',
      'Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel'
    ]
  },
  {
    command: 'netcat -lvnp [Port]',
    name: 'Netcat Reverse Shell Listener',
    descEn: 'Binds a local listener port to catch incoming network connections or reverse shells.',
    descBn: 'রিভার্স শেল (Reverse Shell) রিসিভ করতে নির্দিষ্ট পোর্টে লিসেনার রাখা।',
    category: 'security',
    syntax: 'nc -lvnp <port>',
    exampleOutput: [
      'Listening on 0.0.0.0 4444 ...',
      'Connection received on 192.168.1.75 51230',
      'Linux victim-host 5.15.0 #1 SMP x86_64'
    ]
  },
  {
    command: 'tcpdump -i eth0',
    name: 'TCPDump Live Packet Capture',
    descEn: 'Sniffs and prints live network packet traffic passing through the specified network interface.',
    descBn: 'নেটওয়ার্ক ইন্টারফেস দিয়ে যাওয়া লাইভ ট্রাফিক ক্যাপচার করতে।',
    category: 'security',
    syntax: 'sudo tcpdump -i <interface>',
    exampleOutput: [
      '10:55:01.120 IP 192.168.1.50.54101 > 142.250.190.46.443: Flags [P.], seq 1:513',
      '10:55:01.134 IP 142.250.190.46.443 > 192.168.1.50.54101: Flags [.], ack 513'
    ]
  },
  {
    command: 'gobuster dir -u [URL] -w [wordlist]',
    name: 'Gobuster Directory Brute-Force',
    descEn: 'Enumerates hidden URI directories and files on a web server using wordlist word matching.',
    descBn: 'ওয়েবসাইটের হিডেন ফোল্ডার বা ডিরেক্টরি ব্রুট-ফোর্স করতে।',
    category: 'security',
    syntax: 'gobuster dir -u <URL> -w <wordlist>',
    exampleOutput: [
      '===============================================================',
      '/admin                (Status: 301) [Size: 178]',
      '/login                (Status: 200) [Size: 2450]',
      '/api                  (Status: 403) [Size: 278]',
      '/robots.txt           (Status: 200) [Size: 120]'
    ]
  },
  {
    command: 'hydra -l [user] -P [pass] [IP] ssh',
    name: 'THC-Hydra Password Cracking',
    descEn: 'Fast network logon brute-forcer testing credentials against protocols like SSH, FTP, HTTP.',
    descBn: 'SSH বা বিভিন্ন সার্ভিসে ব্রুট-ফোর্স অ্যাটাক চালানোর জন্য।',
    category: 'security',
    syntax: 'hydra -l <user> -P <passlist> <IP> ssh',
    exampleOutput: [
      'Hydra v9.5 (c) 2023 by van Hauser / THC',
      '[22][ssh] host: 192.168.1.254   login: admin   password: password123',
      '1 valid password found'
    ]
  },
  {
    command: 'nikto -h [URL]',
    name: 'Nikto Web Vulnerability Scanner',
    descEn: 'Scans web servers for dangerous files, outdated server software, and security misconfigurations.',
    descBn: 'ওয়েব সার্ভারের সিকিউরিটি দুর্বলতা (Vulnerability) স্ক্যান করতে।',
    category: 'security',
    syntax: 'nikto -h <URL>',
    exampleOutput: [
      '+ Target IP: 192.168.1.254',
      '+ Target Hostname: router.local',
      '+ Server: Apache/2.4.41 (Ubuntu)',
      '+ Retrived x-frame-options header: Header missing (Clickjacking risk)',
      '+ OSVDB-3092: /admin/: Admin console directory found.'
    ]
  },

  // 7. Network & Security Services
  {
    command: 'sudo systemctl start ssh',
    name: 'Start System Service',
    descEn: 'Starts a systemd daemon service (e.g. ssh, nginx, apache2, docker).',
    descBn: 'SSH সার্ভিস বা অন্য যেকোনো সার্ভিস চালু করার জন্য।',
    category: 'services',
    syntax: 'sudo systemctl start <service>',
    exampleOutput: ['Service ssh.service successfully started.']
  },
  {
    command: 'sudo ufw enable / disable',
    name: 'Toggle UFW Firewall',
    descEn: 'Enables or disables Ubuntu Uncomplicated Firewall (UFW).',
    descBn: 'লিনাক্স ফায়ারওয়াল (Firewall) চালু বা বন্ধ করার জন্য।',
    category: 'services',
    syntax: 'sudo ufw enable',
    exampleOutput: ['Firewall is active and enabled on system startup']
  },
  {
    command: 'netstat -tulnp / ss -tulnp',
    name: 'List Listening Ports',
    descEn: 'Displays all active TCP and UDP listening ports and their associated process PID/Name.',
    descBn: 'সিস্টেমে বর্তমানে কোন কোন পোর্ট লিসেন করছে তা দেখতে।',
    category: 'services',
    syntax: 'ss -tulnp',
    exampleOutput: [
      'Netid State  Recv-Q Send-Q Local Address:Port  Process',
      'tcp   LISTEN 0      128    0.0.0.0:22          users:(("sshd",pid=840))',
      'tcp   LISTEN 0      511    0.0.0.0:80          users:(("nginx",pid=1120))',
      'tcp   LISTEN 0      511    0.0.0.0:443         users:(("nginx",pid=1120))'
    ]
  },

  // 8. System Utilities & Info
  {
    command: 'sudo apt update && apt upgrade',
    name: 'Update & Upgrade Software Packages',
    descEn: 'Refreshes package repository metadata and upgrades installed software to latest versions.',
    descBn: 'সিস্টেমের সফ্টওয়্যার ও প্যাকেজ আপডেট ও আপগ্রেড করতে।',
    category: 'utilities',
    syntax: 'sudo apt update && sudo apt upgrade -y',
    exampleOutput: [
      'Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease',
      'Fetched 28.5 MB in 3s (9500 kB/s)',
      'All packages are up to date.'
    ]
  },
  {
    command: 'ip a / ifconfig',
    name: 'View Network Interfaces & IP Addresses',
    descEn: 'Shows all configured network interfaces, MAC addresses, and assigned IPv4/IPv6 addresses.',
    descBn: 'পিসির IP Address এবং নেটওয়ার্ক ইন্টারফেস দেখার জন্য।',
    category: 'utilities',
    syntax: 'ip a',
    exampleOutput: [
      '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 inet 127.0.0.1/8',
      '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500',
      '    link/ether 00:1a:2b:3c:4d:5e',
      '    inet 192.168.1.50/24 brd 192.168.1.255 scope global eth0'
    ]
  },
  {
    command: 'df -h',
    name: 'Disk Free Storage Space',
    descEn: 'Reports disk usage and available free storage for all mounted partitions in human-readable GB/MB.',
    descBn: 'হার্ডডিস্কের মোট স্টোরেজ ও ব্যবহৃত ফাঁকা জায়গা দেখতে।',
    category: 'utilities',
    syntax: 'df -h',
    exampleOutput: [
      'Filesystem      Size  Used Avail Use% Mounted on',
      '/dev/sda1        50G   14G   34G  30% /',
      '/dev/sda2       200G   45G  145G  24% /home'
    ]
  },
  {
    command: 'free -m',
    name: 'RAM & Swap Memory Usage',
    descEn: 'Displays total, used, and free RAM physical memory and swap memory in Megabytes.',
    descBn: 'সিস্টেমের মেমোরি বা RAM ব্যবহারের পরিমাণ দেখার জন্য।',
    category: 'utilities',
    syntax: 'free -m',
    exampleOutput: [
      '               total        used        free      shared  buff/cache   available',
      'Mem:           15920        3840        8120         420        3960       11660',
      'Swap:           4096           0        4096'
    ]
  },

  // 9. Process Management
  {
    command: 'ps aux',
    name: 'List All Running Processes',
    descEn: 'Prints snapshot of every active process running on the system with User, PID, %CPU, %MEM.',
    descBn: 'ব্যাকগ্রাউন্ডে চলমান সকল প্রসেসের তালিকা দেখার জন্য।',
    category: 'processes',
    syntax: 'ps aux',
    exampleOutput: [
      'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND',
      'root         1  0.0  0.1 168920 12840 ?        Ss   09:00   0:02 /sbin/init',
      'cmnatic   1020  1.2  2.4 845200 48200 tty1     S+   10:15   0:14 /usr/bin/python3 app.py'
    ]
  },
  {
    command: 'top / htop',
    name: 'Interactive Real-Time Task Manager',
    descEn: 'Real-time interactive process viewer showing live CPU, Memory usage, and running tasks.',
    descBn: 'রিয়েল-টাইমে প্রসেসর, র‍্যাম ব্যবহার এবং প্রসেস দেখতে।',
    category: 'processes',
    syntax: 'top',
    exampleOutput: [
      'top - 10:55:00 up 2:15,  1 user,  load average: 0.15, 0.08, 0.05',
      'Tasks: 180 total,   1 running, 179 sleeping',
      '%Cpu(s):  2.4 us,  1.1 sy,  0.0 ni, 96.5 id'
    ]
  },
  {
    command: 'kill -9 [PID]',
    name: 'Force Kill Process',
    descEn: 'Sends SIGKILL (-9) signal to immediately and forcefully terminate a frozen process by PID.',
    descBn: 'কোনো প্রসেস বা অ্যাপ্লিকেশন বলপূর্বক বন্ধ (Force Kill) করতে।',
    category: 'processes',
    syntax: 'kill -9 <PID>',
    exampleOutput: ['Process PID 1020 terminated forcefully (SIGKILL).']
  },
  {
    command: 'history',
    name: 'Command History List',
    descEn: 'Prints the numbered log of all previous commands executed in current bash session.',
    descBn: 'টার্মিনালে ব্যবহৃত আগের সকল কমান্ডের তালিকা দেখতে।',
    category: 'processes',
    syntax: 'history',
    exampleOutput: [
      '  101  cd /var/www/html',
      '  102  ls -la',
      '  103  nano index.html',
      '  104  sudo systemctl restart nginx'
    ]
  }
];

export const LINUX_TEXT_EDITORS = [
  {
    editor: 'Nano',
    command: 'nano file.txt',
    bestForEn: 'Easiest for beginners with visible keyboard shortcuts',
    bestForBn: 'নতুনদের জন্য সবচেয়ে সহজ ✅',
    shortcuts: [
      { key: 'Ctrl + O', labelEn: 'Save (Write Out)', labelBn: 'সেভ করা' },
      { key: 'Ctrl + X', labelEn: 'Exit', labelBn: 'বের হওয়া' },
      { key: 'Ctrl + K', labelEn: 'Cut line', labelBn: 'লাইন কাটা' },
      { key: 'Ctrl + U', labelEn: 'Paste (Uncut)', labelBn: 'পেস্ট করা' },
      { key: 'Ctrl + W', labelEn: 'Where Is (Search)', labelBn: 'সার্চ করা' }
    ]
  },
  {
    editor: 'Vim',
    command: 'vim file.txt',
    bestForEn: 'High-speed modal editing for advanced developers and sysadmins',
    bestForBn: 'অভিজ্ঞ ইউজারদের দ্রুত কাজের জন্য ⚡',
    shortcuts: [
      { key: 'i', labelEn: 'Insert mode (start typing)', labelBn: 'টাইপ শুরু করার মোড' },
      { key: 'Esc', labelEn: 'Command mode', labelBn: 'কমান্ড মোড' },
      { key: ':w', labelEn: 'Save file', labelBn: 'ফাইল সেভ' },
      { key: ':wq', labelEn: 'Save and Quit', labelBn: 'সেভ করে প্রস্থান' },
      { key: ':q!', labelEn: 'Quit without saving', labelBn: 'সেভ না করে প্রস্থান' }
    ]
  },
  {
    editor: 'Gedit',
    command: 'gedit file.txt',
    bestForEn: 'Graphical (GUI) desktop window text editor (like Notepad)',
    bestForBn: 'গ্রাফিক্যাল (GUI) টেক্সট এডিটর 🖥️',
    shortcuts: [
      { key: 'Ctrl + S', labelEn: 'Save', labelBn: 'সেভ করা' },
      { key: 'Ctrl + Q', labelEn: 'Quit window', labelBn: 'উইন্ডো বন্ধ' }
    ]
  }
];

export const TROUBLESHOOTING_ERRORS: TroubleshootingItem[] = [
  {
    id: 'err-1',
    titleEn: 'Destination path already exists and is not an empty directory',
    titleBn: '১. Destination path already exists (ফোল্ডার খালি নয়)',
    errorSnippet: 'fatal: destination path "repo" already exists and is not an empty directory.',
    causeEn: 'You are trying to git clone into a folder name that already exists on disk.',
    causeBn: 'আপনি যে ডিরেক্টরিতে ডাউনলোড/ক্লোন করছেন সেটি খালি নয়, আগে থেকেই একই নামের ফোল্ডার তৈরি আছে।',
    solutionCommand: 'cd [folder_name]   OR   rm -rf [folder_name]',
    solutionDescEn: 'Either enter the existing directory with cd [folder_name] or permanently remove it with rm -rf [folder_name] and retry.',
    solutionDescBn: 'প্রথমে cd [folder_name] দিয়ে ফোল্ডারে ঢুকুন অথবা rm -rf [folder_name] দিয়ে মুছে পুনরায় ডাউনলোড ট্রাই করুন।'
  },
  {
    id: 'err-2',
    titleEn: 'Could not get lock /var/lib/dpkg/lock-frontend',
    titleBn: '২. Could not get lock /var/lib/dpkg/lock-frontend',
    errorSnippet: 'E: Could not get lock /var/lib/dpkg/lock-frontend - open (11: Resource temporarily unavailable)\nE: Unable to acquire the dpkg frontend lock',
    causeEn: 'Another package installation or automated background update process (unattended-upgrades) is actively running.',
    causeBn: 'ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে অন্য কোনো সফটওয়্যার বা আপডেট প্রসেস চলছে, ফলে ফাইল লক হয়ে আছে।',
    solutionCommand: 'sudo killall apt apt-get',
    solutionDescEn: 'Kills hanging apt background locks so you can install packages immediately.',
    solutionDescBn: 'ব্যাকগ্রাউন্ডে চলা লক আটকে থাকা প্রসেস বন্ধ করতে sudo killall apt apt-get টাইপ করুন।'
  },
  {
    id: 'err-3',
    titleEn: "Command 'git' (or any tool) not found",
    titleBn: "৩. Command 'git' (or any tool) not found",
    errorSnippet: "bash: git: command not found\nCommand 'git' not found, but can be installed with: sudo apt install git",
    causeEn: 'The requested utility binary is not installed on this Linux system.',
    causeBn: 'কমান্ডটির জন্য প্রয়োজনীয় প্যাকেজ বা টুলটি এখনও পিসিতে ইনস্টল করা নেই।',
    solutionCommand: 'sudo apt install git',
    solutionDescEn: 'Installs the missing package using the apt package manager repository.',
    solutionDescBn: 'টুলটি ইনস্টল করতে sudo apt install git (বা টুলের নাম) রান করুন।'
  }
];
