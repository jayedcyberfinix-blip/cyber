export interface HeaderField {
  name: string;
  bitLength: number;
  sampleHex: string;
  sampleDec: string;
  descEn: string;
  descBn: string;
  offsetBits: number;
}

export interface HeaderDissection {
  id: string;
  name: string;
  nameBn: string;
  totalBytes: number;
  descriptionEn: string;
  descriptionBn: string;
  fields: HeaderField[];
}

export const PACKET_HEADERS: Record<string, HeaderDissection> = {
  ipv4: {
    id: 'ipv4',
    name: 'IPv4 Header (RFC 791)',
    nameBn: 'IPv4 হেডার কাঠামো (৩২-বিট আর্কিটেকচার)',
    totalBytes: 20,
    descriptionEn: 'The IPv4 header is 20 bytes (minimum) up to 60 bytes with options. It delivers packets across network hops using 32-bit logical addresses.',
    descriptionBn: 'IPv4 হেডারের সাইজ সাধারণ অবস্থায় ২০ বাইট। এতে সোর্স ও ডেস্টিনেশন আইপি, টিটিএল এবং প্রোটোকল শনাক্তকারী তথ্য থাকে।',
    fields: [
      {
        name: 'Version (4 bits)',
        bitLength: 4,
        sampleHex: '0x4',
        sampleDec: '4',
        descEn: 'Specifies the IP version (4 for IPv4, 6 for IPv6).',
        descBn: 'আইপি ভার্সন নির্দেশ করে (৪ মানে IPv4)।',
        offsetBits: 0
      },
      {
        name: 'IHL - Internet Header Length (4 bits)',
        bitLength: 4,
        sampleHex: '0x5',
        sampleDec: '5 (20 Bytes)',
        descEn: 'Length of header in 32-bit (4-byte) words. Minimum value is 5 (5 x 4 = 20 bytes).',
        descBn: 'হেডারের মোট দৈর্ঘ্য নির্দেশ করে। মান ৫ হলে ৫x৪ = ২০ বাইট।',
        offsetBits: 4
      },
      {
        name: 'DSCP / ToS (6 bits)',
        bitLength: 6,
        sampleHex: '0x00',
        sampleDec: '0 (Best Effort)',
        descEn: 'Differentiated Services Code Point for Quality of Service (QoS) traffic prioritization.',
        descBn: 'ট্রাফিকের অগ্রাধিকার (QoS/VoIP) নির্ধারণ করে।',
        offsetBits: 8
      },
      {
        name: 'ECN - Explicit Congestion (2 bits)',
        bitLength: 2,
        sampleHex: '0x0',
        sampleDec: '0',
        descEn: 'Notifies routers of network congestion without dropping packets.',
        descBn: 'প্যাকেট না ফেলে ট্রাফিক জ্যাম সম্পর্কে রাউটারকে সতর্ক করে।',
        offsetBits: 14
      },
      {
        name: 'Total Length (16 bits)',
        bitLength: 16,
        sampleHex: '0x05DC',
        sampleDec: '1500 Bytes',
        descEn: 'Entire packet size including IP header and data payload in bytes (Max 65,535 bytes).',
        descBn: 'হেডার এবং ডাটা সহ সম্পূর্ণ প্যাকেটের মোট সাইজ বাইটে।',
        offsetBits: 16
      },
      {
        name: 'Identification (16 bits)',
        bitLength: 16,
        sampleHex: '0x1C2B',
        sampleDec: '7211',
        descEn: 'Unique ID identifying fragments belonging to the same original IP packet.',
        descBn: 'টুকরো হওয়া (ফ্র্যাগমেন্টেড) প্যাকেট জোড়া লাগানোর জন্য ইউনিক আইডি।',
        offsetBits: 32
      },
      {
        name: 'Flags: [Reserved, DF, MF] (3 bits)',
        bitLength: 3,
        sampleHex: '0x2',
        sampleDec: 'DF=1, MF=0',
        descEn: 'Control flags: DF (Don\'t Fragment - 1 means don\'t split), MF (More Fragments - 1 means more pieces follow).',
        descBn: 'ডিএফ (প্যাকেট না ভাঙার নির্দেশ) এবং এমএফ (আরো অংশ বাকি আছে কিনা) ফ্ল্যাগ।',
        offsetBits: 48
      },
      {
        name: 'Fragment Offset (13 bits)',
        bitLength: 13,
        sampleHex: '0x0000',
        sampleDec: '0',
        descEn: 'Position of this fragment within the original unfragmented packet (in 8-byte units).',
        descBn: 'মূল প্যাকেটের কত নম্বর বাইটে এই টুকরোটি বসবে তার হিসাব।',
        offsetBits: 51
      },
      {
        name: 'TTL - Time to Live (8 bits)',
        bitLength: 8,
        sampleHex: '0x40',
        sampleDec: '64 Hops',
        descEn: 'Hop limit counter. Decremented by 1 at every router. Prevents packets looping forever (drops at 0 and sends ICMP Time Exceeded).',
        descBn: 'প্যাকেটটি সর্বোচ্চ কতটি রাউটার পার হতে পারবে। প্রতি রাউটারে ১ কমে; ০ হলে প্যাকেট ড্রপ হয় যাতে নেটওয়ার্কে লুপ না বাঁধে।',
        offsetBits: 64
      },
      {
        name: 'Protocol (8 bits)',
        bitLength: 8,
        sampleHex: '0x06',
        sampleDec: '6 (TCP)',
        descEn: 'Specifies the L4 payload protocol: 6 = TCP, 17 = UDP, 1 = ICMP, 89 = OSPF.',
        descBn: 'পরের ট্রান্সপোর্ট লেয়ার প্রোটোকল কি: ৬ হলে TCP, ১৭ হলে UDP, ১ হলে ICMP।',
        offsetBits: 72
      },
      {
        name: 'Header Checksum (16 bits)',
        bitLength: 16,
        sampleHex: '0x8A24',
        sampleDec: '35364',
        descEn: '16-bit one\'s complement sum of header fields. Verified by each router to detect bit corruption.',
        descBn: 'হেডারে কোনো ভুল বিট তৈরি হয়েছে কিনা তা যাচাই করার গাণিতিক চেকসাম।',
        offsetBits: 80
      },
      {
        name: 'Source IP Address (32 bits)',
        bitLength: 32,
        sampleHex: '0xC0A80132',
        sampleDec: '192.168.1.50',
        descEn: 'The 32-bit IPv4 address of the originating sender machine.',
        descBn: 'যে কম্পিউটার থেকে প্যাকেট পাঠানো হয়েছে তার ৩২-বিট আইপি অ্যাড্রেস।',
        offsetBits: 96
      },
      {
        name: 'Destination IP Address (32 bits)',
        bitLength: 32,
        sampleHex: '0x8EFA8E2E',
        sampleDec: '142.250.142.46',
        descEn: 'The 32-bit IPv4 address of the final recipient machine or next NAT boundary.',
        descBn: 'যে গন্তব্য কম্পিউটারে প্যাকেট পৌঁছাবে তার ৩২-বিট আইপি অ্যাড্রেস।',
        offsetBits: 128
      }
    ]
  },
  ipv6: {
    id: 'ipv6',
    name: 'IPv6 Header (RFC 8200)',
    nameBn: 'IPv6 হেডার কাঠামো (১২৮-বিট ফিক্সড ৪০-বাইট আর্কিটেকচার)',
    totalBytes: 40,
    descriptionEn: 'The IPv6 header has a fixed size of 40 bytes with no checksum (handled by L2/L4) for ultra-fast router processing. It supports 128-bit addresses.',
    descriptionBn: 'IPv6 হেডারের আকার নির্দিষ্ট ৪০ বাইট। রাউটারের দ্রুতগতির জন্য এতে নিজস্ব চেকসাম নেই এবং বিশাল ১২৮-বিট অ্যাড্রেস রয়েছে।',
    fields: [
      {
        name: 'Version (4 bits)',
        bitLength: 4,
        sampleHex: '0x6',
        sampleDec: '6',
        descEn: 'IP version number: always 6 for IPv6.',
        descBn: 'ভার্সন কোড: IPv6 এর জন্য সবসময় ৬।',
        offsetBits: 0
      },
      {
        name: 'Traffic Class (8 bits)',
        bitLength: 8,
        sampleHex: '0x00',
        sampleDec: '0',
        descEn: 'Equivalent to IPv4 DSCP and ECN. Used for QoS prioritization and congestion marking.',
        descBn: 'কিউওএস (QoS) ট্রাফিক অগ্রাধিকার নির্ধারণ করে।',
        offsetBits: 4
      },
      {
        name: 'Flow Label (20 bits)',
        bitLength: 20,
        sampleHex: '0x1A4F0',
        sampleDec: '107760',
        descEn: 'Identifies packets in the same communication stream so routers can route them along the same path without reordering.',
        descBn: 'একই স্ট্রিমের প্যাকেটগুলোকে একই পথে দ্রুত পাঠানোর ফ্লো লেবেল।',
        offsetBits: 12
      },
      {
        name: 'Payload Length (16 bits)',
        bitLength: 16,
        sampleHex: '0x0400',
        sampleDec: '1024 Bytes',
        descEn: 'Size of the payload in bytes following the 40-byte IPv6 fixed header (including extension headers).',
        descBn: '৪০ বাইট হেডারের পরের ডাটা ও এক্সটেনশনের সাইজ।',
        offsetBits: 32
      },
      {
        name: 'Next Header (8 bits)',
        bitLength: 8,
        sampleHex: '0x06',
        sampleDec: '6 (TCP)',
        descEn: 'Replaces IPv4 "Protocol" field. Points to TCP (6), UDP (17), or an IPv6 Extension Header.',
        descBn: 'পরের হেডার কি তা নির্দেশ করে (যেমন ৬ = TCP, ১৭ = UDP)।',
        offsetBits: 48
      },
      {
        name: 'Hop Limit (8 bits)',
        bitLength: 8,
        sampleHex: '0x40',
        sampleDec: '64 Hops',
        descEn: 'Identical purpose to IPv4 TTL. Decremented by 1 at each router. Discarded when 0.',
        descBn: 'IPv4 এর TTL এর মতো; প্রতি রাউটার অতিক্রম করলে ১ করে কমে।',
        offsetBits: 56
      },
      {
        name: 'Source IPv6 Address (128 bits)',
        bitLength: 128,
        sampleHex: '2001:0db8:85a3::8a2e:0370:7334',
        sampleDec: '2001:db8:85a3::8a2e:370:7334',
        descEn: '128-bit global or link-local address of the transmitting node.',
        descBn: 'প্রেরকের সম্পূর্ণ ১২৮-বিট IPv6 অ্যাড্রেস।',
        offsetBits: 64
      },
      {
        name: 'Destination IPv6 Address (128 bits)',
        bitLength: 128,
        sampleHex: '2607:f8b0:4005:805::200e',
        sampleDec: '2607:f8b0:4005:805::200e',
        descEn: '128-bit address of the final destination recipient.',
        descBn: 'প্রাপকের সম্পূর্ণ ১২৮-বিট IPv6 অ্যাড্রেস।',
        offsetBits: 192
      }
    ]
  },
  tcp: {
    id: 'tcp',
    name: 'TCP Header (RFC 793)',
    nameBn: 'TCP হেডার কাঠামো (ট্রান্সপোর্ট লেয়ার সেগমেন্ট)',
    totalBytes: 20,
    descriptionEn: 'The Transmission Control Protocol header manages ports, byte-stream sequence numbers, acknowledgements, flow control windows, and control flags (SYN, ACK, FIN, RST).',
    descriptionBn: 'টিসিপি হেডারে সোর্স ও ডেস্টিনেশন পোর্ট, সিকোয়েন্স ও অ্যাকনলেজমেন্ট নাম্বার এবং ৩-ওয়ে হ্যান্ডশেক ফ্ল্যাগ থাকে।',
    fields: [
      {
        name: 'Source Port (16 bits)',
        bitLength: 16,
        sampleHex: '0xD431',
        sampleDec: '54321',
        descEn: 'Ephemeral port dynamically chosen by the client operating system (1024-65535).',
        descBn: 'ক্লায়েন্টের অপারেটিং সিস্টেমের ডায়নামিক পোর্ট।',
        offsetBits: 0
      },
      {
        name: 'Destination Port (16 bits)',
        bitLength: 16,
        sampleHex: '0x01BB',
        sampleDec: '443 (HTTPS)',
        descEn: 'Target service port on the destination server (e.g., 80, 443, 22).',
        descBn: 'সার্ভারের নির্দিষ্ট সার্ভিস পোর্ট (যেমন 443 বা 80)।',
        offsetBits: 16
      },
      {
        name: 'Sequence Number (32 bits)',
        bitLength: 32,
        sampleHex: '0x3B9ACA00',
        sampleDec: '1000000000',
        descEn: 'Tracks the position of the first data byte in this segment within the entire TCP stream.',
        descBn: 'টিসিপি স্ট্রিমে এই সেগমেন্টের প্রথম বাইটের সঠিক অবস্থান ও ক্রম।',
        offsetBits: 32
      },
      {
        name: 'Acknowledgment Number (32 bits)',
        bitLength: 32,
        sampleHex: '0x3B9ACA01',
        sampleDec: '1000000001',
        descEn: 'If ACK flag is set, specifies the next sequence number the receiver expects to receive.',
        descBn: 'রিসিভার পরবর্তী কোন বাইটটি আশা করছে তার সিকোয়েন্স নাম্বার।',
        offsetBits: 64
      },
      {
        name: 'Data Offset (4 bits)',
        bitLength: 4,
        sampleHex: '0x5',
        sampleDec: '5 (20 Bytes)',
        descEn: 'Size of the TCP header in 32-bit words (indicates where the data payload starts).',
        descBn: 'টিসিপি হেডারের মোট সাইজ (ডাটা কোথা থেকে শুরু হচ্ছে)।',
        offsetBits: 96
      },
      {
        name: 'Reserved (3 bits)',
        bitLength: 3,
        sampleHex: '0x0',
        sampleDec: '0',
        descEn: 'Reserved for future use; must be 0.',
        descBn: 'ভবিষ্যতের জন্য সংরক্ষিত; মান শূন্য।',
        offsetBits: 100
      },
      {
        name: 'Flags: [URG, ACK, PSH, RST, SYN, FIN] (9 bits)',
        bitLength: 9,
        sampleHex: '0x018',
        sampleDec: '[PSH, ACK]',
        descEn: 'SYN=Initiate handshake, ACK=Acknowledge receipt, FIN=Graceful teardown, RST=Abort reset, PSH=Push data immediately, URG=Urgent.',
        descBn: 'কানেকশন নিয়ন্ত্রণ ফ্ল্যাগ: SYN (সংযোগ শুরু), ACK (স্বীকৃতি), FIN (সংযোগ শেষ), RST (রিসেট)।',
        offsetBits: 103
      },
      {
        name: 'Window Size (16 bits)',
        bitLength: 16,
        sampleHex: '0xFFFF',
        sampleDec: '65535 Bytes',
        descEn: 'Flow control: how many bytes the receiver buffer is ready to accept without waiting for ACK.',
        descBn: 'ফ্লো কন্ট্রোল: রিসিভারের বাফারে না উপচে কত বাইট ধারণ করতে পারবে।',
        offsetBits: 112
      },
      {
        name: 'Checksum (16 bits)',
        bitLength: 16,
        sampleHex: '0xE25A',
        sampleDec: '57946',
        descEn: 'Mandatory checksum calculated over TCP pseudo-header, TCP header, and payload data.',
        descBn: 'সম্পূর্ণ সেগমেন্টের নির্ভুলতা পরীক্ষার জন্য চেকসাম।',
        offsetBits: 128
      },
      {
        name: 'Urgent Pointer (16 bits)',
        bitLength: 16,
        sampleHex: '0x0000',
        sampleDec: '0',
        descEn: 'Offset to the last byte of urgent data if the URG flag is set.',
        descBn: 'জরুরি ডাটার অবস্থান নির্দেশ করে (যদি URG ফ্ল্যাগ অন থাকে)।',
        offsetBits: 144
      }
    ]
  },
  udp: {
    id: 'udp',
    name: 'UDP Header (RFC 768)',
    nameBn: 'UDP হেডার কাঠামো (লাইটওয়েট ৮-বাইট আর্কিটেকচার)',
    totalBytes: 8,
    descriptionEn: 'The User Datagram Protocol header is only 8 bytes long. It provides lightweight, connectionless datagram delivery with zero handshake latency.',
    descriptionBn: 'UDP হেডার মাত্র ৮ বাইটের হয়। কোনো হ্যান্ডশেক বা নিশ্চিত প্রাপ্তি ছাড়া দ্রুততম সময়ে ডাটা ডেলিভারি দেয়।',
    fields: [
      {
        name: 'Source Port (16 bits)',
        bitLength: 16,
        sampleHex: '0xC350',
        sampleDec: '50000',
        descEn: 'Port number of the sending process (optional in some implementations, 0 if unused).',
        descBn: 'প্রেরকের পোর্ট নাম্বার।',
        offsetBits: 0
      },
      {
        name: 'Destination Port (16 bits)',
        bitLength: 16,
        sampleHex: '0x0035',
        sampleDec: '53 (DNS)',
        descEn: 'Target service port on the destination host (e.g., 53 for DNS, 123 for NTP, 67 for DHCP).',
        descBn: 'গন্তব্য সার্ভারের সার্ভিস পোর্ট (যেমন DNS এর জন্য ৫৩)।',
        offsetBits: 16
      },
      {
        name: 'Length (16 bits)',
        bitLength: 16,
        sampleHex: '0x0034',
        sampleDec: '52 Bytes',
        descEn: 'Length of the entire UDP datagram in bytes (Header 8 bytes + Data payload bytes). Minimum value is 8.',
        descBn: 'হেডার (৮ বাইট) সহ সম্পূর্ণ UDP ডাটাগ্রামের দৈর্ঘ্য।',
        offsetBits: 32
      },
      {
        name: 'Checksum (16 bits)',
        bitLength: 16,
        sampleHex: '0x7A1F',
        sampleDec: '31263',
        descEn: 'Validates integrity of the UDP pseudo-header, header, and data. Optional in IPv4 (can be 0), mandatory in IPv6.',
        descBn: 'ডাটাগ্রাম নির্ভুলভাবে পৌঁছাল কিনা তা যাচাইয়ের চেকসাম।',
        offsetBits: 48
      }
    ]
  }
};
