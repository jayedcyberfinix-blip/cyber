export type Language = 'en' | 'bn';

export type OSILayerNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface OSILayerInfo {
  layer: OSILayerNumber;
  nameEn: string;
  nameBn: string;
  pdu: string;
  pduBn: string;
  color: string;
  bgColor: string;
  borderColor: string;
  shortDescEn: string;
  shortDescBn: string;
  fullDescEn: string;
  fullDescBn: string;
  functionsEn: string[];
  functionsBn: string[];
  protocols: string[];
  devices: string[];
  devicesBn: string[];
  headerAdded: string;
  sampleHeaderData: Record<string, string>;
  securityAspectsEn: string;
  securityAspectsBn: string;
}

export type NetworkProtocol = 'TCP' | 'UDP' | 'ICMP' | 'DNS' | 'HTTP' | 'HTTPS' | 'SSH' | 'FTP' | 'DHCP' | 'ARP';

export type PacketStatus = 'ALLOWED' | 'DROPPED' | 'REJECTED' | 'ALERT';

export interface Packet {
  id: string;
  timestamp: string;
  srcIp: string;
  dstIp: string;
  srcPort: number;
  dstPort: number;
  protocol: NetworkProtocol;
  length: number; // bytes
  payloadPreview: string;
  status: PacketStatus;
  matchedRule?: string;
  latencyMs: number;
  flags?: string[]; // e.g. ['SYN'], ['ACK'], ['PSH', 'ACK']
  ttl?: number;
  isThreat?: boolean;
  threatType?: string;
  threatDescBn?: string;
}

export interface FirewallRule {
  id: string;
  name: string;
  action: 'ALLOW' | 'DROP' | 'REJECT';
  protocol: NetworkProtocol | 'ALL';
  srcIp: string; // CIDR or 'ANY'
  dstPort: string; // number or 'ANY'
  enabled: boolean;
  hits: number;
  descEn: string;
  descBn: string;
}

export interface IDSSignature {
  id: string;
  name: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  type: string;
  patternDescEn: string;
  patternDescBn: string;
  actionTaken: 'ALERT_ONLY' | 'DROP_AND_ALERT';
  triggersCount: number;
}

export interface PortForwardRule {
  id: string;
  serviceName: string;
  wanPort: number;
  lanIp: string;
  lanPort: number;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  enabled: boolean;
  totalHits: number;
  description: string;
}

export type TCPState = 
  | 'CLOSED'
  | 'LISTEN'
  | 'SYN_SENT'
  | 'SYN_RECEIVED'
  | 'ESTABLISHED'
  | 'FIN_WAIT_1'
  | 'FIN_WAIT_2'
  | 'CLOSE_WAIT'
  | 'CLOSING'
  | 'LAST_ACK'
  | 'TIME_WAIT';

export interface TCPSocketConnection {
  id: string;
  clientIp: string;
  clientPort: number;
  serverIp: string;
  serverPort: number;
  protocol: 'TCP' | 'UDP';
  state: TCPState;
  sentBytes: number;
  receivedBytes: number;
  rttMs: number;
  lastActive: string;
}

export interface ProtocolDirectoryItem {
  port: number;
  protocol: string;
  fullName: string;
  transport: 'TCP' | 'UDP' | 'TCP/UDP';
  layer: number;
  category: 'Web' | 'File' | 'Remote' | 'Mail' | 'Infrastructure' | 'Database' | 'Security';
  descEn: string;
  descBn: string;
  securityNote: string;
}
