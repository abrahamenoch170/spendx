export type EnterpriseEventStatus =
  | 'draft'
  | 'published'
  | 'ongoing'
  | 'completed'
  | 'archived';

export type EnterpriseEventMode = 'physical' | 'virtual' | 'hybrid';
export type EnterpriseSessionType = 'keynote' | 'panel' | 'workshop' | 'networking';
export type EnterpriseTicketType = 'free' | 'paid' | 'vip';
export type EnterpriseNetworkingState = 'hidden' | 'discoverable' | 'pending' | 'connected';
export type ConciergeRole = 'user' | 'assistant' | 'system';
export type ConciergeMessageState = 'sent' | 'typing' | 'offline' | 'escalated';
export type EnterpriseRole =
  | 'organizer'
  | 'admin'
  | 'moderator'
  | 'speaker_manager'
  | 'sponsor_manager'
  | 'speaker'
  | 'attendee';

export interface TicketTier {
  id: string;
  name: string;
  type: EnterpriseTicketType;
  price: number;
  currency: string;
  capacity: number;
  sold: number;
  benefits: string[];
  customFields?: string[];
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  image: string;
  socialLinks: { label: string; url: string }[];
}

export interface Session {
  id: string;
  title: string;
  description: string;
  type: EnterpriseSessionType;
  roomId: string;
  roomName: string;
  speakerIds: string[];
  start: string;
  end: string;
  capacity: number;
  attendees: number;
  live: boolean;
  waitlistCount?: number;
  trackId?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: string;
  logo: string;
  blurb: string;
  boothId?: string;
  leadsCaptured?: number;
}

export interface CommunityLink {
  id: string;
  label: string;
  platform: 'whatsapp' | 'telegram' | 'discord' | 'slack';
  url: string;
}

export interface AttendeeProfile {
  id: string;
  name: string;
  company: string;
  role: string;
  avatar: string;
  bio: string;
  networkingState: EnterpriseNetworkingState;
  community: string;
}

export interface VenueNode {
  id: string;
  name: string;
  kind: 'room' | 'booth' | 'amenity' | 'entrance';
  x: number;
  y: number;
  occupancy: number;
  description: string;
}

export interface VenueRoute {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  label: string;
  durationMinutes: number;
}

export interface ConciergeFAQ {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

export interface ConciergeMessage {
  id: string;
  role: ConciergeRole;
  text: string;
  state: ConciergeMessageState;
  createdAt: string;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
}

export interface CheckInRecord {
  id: string;
  sessionId: string;
  attendeeId: string;
  attendeeName: string;
  status: 'queued' | 'synced';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: EnterpriseRole;
  permissions: string[];
  note: string;
}

export interface SeatAssignment {
  id: string;
  sessionId: string;
  label: string;
  total: number;
  allocated: number;
  available: number;
}

export interface WaitlistEntry {
  id: string;
  sessionId: string;
  attendeeId: string;
  attendeeName: string;
  priority: string;
  status: 'waiting' | 'promoted';
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface Poll {
  id: string;
  sessionId: string;
  question: string;
  options: PollOption[];
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  audience: 'all' | 'attendees' | 'team' | 'speakers';
  createdAt: string;
  status: 'scheduled' | 'sent';
}

export interface NotificationItem {
  id: string;
  type: 'schedule' | 'checkin' | 'networking' | 'announcement';
  title: string;
  message: string;
  target: string;
  read: boolean;
  createdAt: string;
}

export interface TransportEstimate {
  originLabel: string;
  distanceKm: number;
  durationMinutes: number;
  estimatedCost: number;
  currency: string;
  countdownLabel: string;
}

export interface EventAnalytics {
  revenue: string;
  registrations: string;
  attendance: string;
  engagement: string;
  polls: string;
  qna: string;
  checkins: string;
  waitlistFillRate: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuedOn: string;
}

export interface PastEventSummary {
  id: string;
  title: string;
  date: string;
  summary: string;
}

export interface EnterpriseEvent {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  type: 'conference' | 'summit' | 'workshop' | 'meetup';
  mode: EnterpriseEventMode;
  status: EnterpriseEventStatus;
  startDate: string;
  endDate: string;
  location: string;
  bannerImage: string;
  venueDescription: string;
  attendeeCount: number;
  ticketTiers: TicketTier[];
  sessions: Session[];
  speakers: Speaker[];
  sponsors: Sponsor[];
  communityLinks: CommunityLink[];
  attendees: AttendeeProfile[];
  venueNodes: VenueNode[];
  venueRoutes: VenueRoute[];
  conciergeFaqs: ConciergeFAQ[];
  dashboardMetrics: DashboardMetric[];
  team: TeamMember[];
  seatAssignments: SeatAssignment[];
  waitlist: WaitlistEntry[];
  announcements: Announcement[];
  polls: Poll[];
  notifications: NotificationItem[];
  transportEstimate: TransportEstimate;
  analytics: EventAnalytics;
  certificates: Certificate[];
  pastEvents: PastEventSummary[];
}

export interface EnterpriseEventService {
  getEvent: (eventId: string) => Promise<EnterpriseEvent | null>;
  listEvents: () => Promise<EnterpriseEvent[]>;
  saveDraft: (event: EnterpriseEvent) => Promise<EnterpriseEvent>;
}

export interface EnterpriseConciergeService {
  ask: (eventId: string, input: string) => Promise<ConciergeMessage>;
  getFaqs: (eventId: string) => Promise<ConciergeFAQ[]>;
}

export interface EnterpriseTicketService {
  selectTicket: (eventId: string, tierId: string) => Promise<{ success: boolean }>;
  checkIn: (eventId: string, sessionId: string) => Promise<{ success: boolean }>;
}

export interface EnterpriseMapService {
  getNodes: (eventId: string) => Promise<VenueNode[]>;
  getRoutes: (eventId: string) => Promise<VenueRoute[]>;
}

export interface EnterpriseApiEndpoint {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  handler: string;
  surface: 'host' | 'attendee' | 'shared';
  summary: string;
}
