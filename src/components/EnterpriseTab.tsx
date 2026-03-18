import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  ChevronRight,
  LifeBuoy,
  MapPinned,
  RadioTower,
  Send,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  WandSparkles,
} from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useTab } from '../context/TabContext';
import { enterpriseApiSpec, enterpriseSeedEvent } from '../features/enterprise/data';
import { enterpriseCache } from '../features/enterprise/cache';
import { useEnterpriseStore } from '../features/enterprise/store';

const organizerViews = [
  { id: 'overview', label: 'Overview' },
  { id: 'setup', label: 'Setup' },
  { id: 'program', label: 'Program' },
  { id: 'operations', label: 'Operations' },
  { id: 'concierge', label: 'Concierge' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'api', label: 'API Map' },
] as const;

const badgeClass: Record<string, string> = {
  draft: 'bg-white/10 text-white/70',
  published: 'bg-[#8DF688]/20 text-[#8DF688]',
  ongoing: 'bg-emerald-400/20 text-emerald-300',
  completed: 'bg-sky-400/20 text-sky-200',
  archived: 'bg-stone-400/20 text-stone-200',
};

const cardClass =
  'rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.28)]';

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#8DF688]/70 focus:ring-2 focus:ring-[#8DF688]/20';

const sectionLabelClass = 'font-mono text-[11px] uppercase tracking-[0.24em] text-[#8DF688]';

const formatSessionTime = (start: string, end: string) =>
  `${format(new Date(start), 'EEE, h:mm a')} - ${format(new Date(end), 'h:mm a')}`;

export const EnterpriseTab = () => {
  const navigate = useNavigate();
  const { setActiveTab } = useTab();
  const {
    event,
    organizerView,
    setOrganizerView,
    updateEvent,
    publishEvent,
    isOffline,
    setOfflineState,
    pendingCheckIns,
    syncPendingCheckIns,
    lastSyncLabel,
    promoteWaitlist,
    rebalanceSeats,
    addAnnouncement,
  } = useEnterpriseStore();
  const [faqDraft, setFaqDraft] = useState('');
  const [announcementTitle, setAnnouncementTitle] = useState('');
  const [announcementMessage, setAnnouncementMessage] = useState('');

  useEffect(() => {
    const cached = enterpriseCache.load();
    if (cached?.event) {
      updateEvent(() => cached.event);
    }
  }, [updateEvent]);

  useEffect(() => {
    enterpriseCache.save(event);
  }, [event]);

  useEffect(() => {
    const updateNetwork = () => {
      const offline = !window.navigator.onLine;
      setOfflineState(offline);
      if (!offline) {
        syncPendingCheckIns();
      }
    };

    updateNetwork();
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    return () => {
      window.removeEventListener('online', updateNetwork);
      window.removeEventListener('offline', updateNetwork);
    };
  }, [setOfflineState, syncPendingCheckIns]);

  const eventDateLabel = `${format(new Date(event.startDate), 'MMM d')} - ${format(new Date(event.endDate), 'MMM d, yyyy')}`;

  const unreadNotifications = useMemo(
    () => event.notifications.filter((notification) => !notification.read).length,
    [event.notifications]
  );

  const addFaq = () => {
    if (!faqDraft.trim()) return;
    updateEvent((current) => ({
      ...current,
      conciergeFaqs: [
        {
          id: `faq-${Date.now()}`,
          question: faqDraft.trim(),
          answer: 'Draft answer pending organizer review.',
          tags: faqDraft.toLowerCase().split(' ').filter(Boolean).slice(0, 3),
        },
        ...current.conciergeFaqs,
      ],
    }));
    setFaqDraft('');
  };

  const addTicketTier = () => {
    updateEvent((current) => ({
      ...current,
      ticketTiers: [
        ...current.ticketTiers,
        {
          id: `ticket-${Date.now()}`,
          name: 'New Tier',
          type: 'paid',
          price: 25,
          currency: 'USD',
          capacity: 75,
          sold: 0,
          benefits: ['Custom access'],
          customFields: ['Department'],
        },
      ],
    }));
  };

  const addSession = () => {
    updateEvent((current) => ({
      ...current,
      sessions: [
        ...current.sessions,
        {
          id: `session-${Date.now()}`,
          title: 'New Session',
          description: 'Describe the experience, room, and outcomes for attendees.',
          type: 'workshop',
          roomId: current.venueNodes[1]?.id ?? 'node-room-b',
          roomName: current.venueNodes[1]?.name ?? 'Studio B',
          speakerIds: [],
          start: current.startDate,
          end: current.endDate,
          capacity: 80,
          attendees: 0,
          live: false,
          waitlistCount: 0,
          trackId: 'track-new',
        },
      ],
    }));
  };

  const addSpeaker = () => {
    updateEvent((current) => ({
      ...current,
      speakers: [
        ...current.speakers,
        {
          id: `speaker-${Date.now()}`,
          name: 'New Speaker',
          role: 'Guest',
          company: 'Partner',
          bio: 'Short speaker bio.',
          image: 'https://api.dicebear.com/9.x/notionists/svg?seed=Speaker',
          socialLinks: [{ label: 'Website', url: 'https://example.com' }],
        },
      ],
    }));
  };

  const addSponsor = () => {
    updateEvent((current) => ({
      ...current,
      sponsors: [
        ...current.sponsors,
        {
          id: `sponsor-${Date.now()}`,
          name: 'New Sponsor',
          tier: 'Silver',
          logo: 'https://dummyimage.com/240x96/8df688/0a0a0a&text=Sponsor',
          blurb: 'Sponsor booth and activation details.',
          leadsCaptured: 0,
        },
      ],
    }));
  };

  const addCommunityLink = () => {
    updateEvent((current) => ({
      ...current,
      communityLinks: [
        ...current.communityLinks,
        {
          id: `community-${Date.now()}`,
          label: 'New Community',
          platform: 'telegram',
          url: 'https://t.me/example',
        },
      ],
    }));
  };

  const sendAnnouncement = () => {
    if (!announcementTitle.trim() || !announcementMessage.trim()) return;
    addAnnouncement(announcementTitle.trim(), announcementMessage.trim(), 'all');
    setAnnouncementTitle('');
    setAnnouncementMessage('');
  };

  return (
    <div className="enterprise-shell min-h-full bg-[#07110B] pb-28 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,246,136,0.20),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(141,246,136,0.10),transparent_35%)]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 p-4 sm:p-6">
        <header className={`${cardClass} sticky top-4 z-20 flex flex-col gap-4 px-5 py-5 sm:px-6`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveTab('home')}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#8DF688]">
                  SpendX Enterprise Host
                </p>
                <h1 className="font-enterprise-heading text-3xl tracking-tight sm:text-4xl">
                  {event.name}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${badgeClass[event.status]}`}>
                {event.status}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                {event.team.length} roles active
              </span>
              <button
                onClick={() => navigate(`/e/${event.slug}`)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-[#8DF688]/50 hover:text-white"
              >
                Preview attendee view <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                onClick={publishEvent}
                className="rounded-full bg-[#8DF688] px-5 py-2.5 font-semibold text-[#081109] transition hover:brightness-95"
              >
                {event.status === 'published' ? 'Unpublish event' : 'Publish event'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span>{eventDateLabel}</span>
            <span className="text-white/20">•</span>
            <span>{event.location}</span>
            <span className="text-white/20">•</span>
            <span>{event.mode}</span>
            <span className="text-white/20">•</span>
            <span>{lastSyncLabel}</span>
            <span className="text-white/20">•</span>
            <span>{unreadNotifications} unread notifications</span>
          </div>

          <div className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
            isOffline
              ? 'border-amber-300/30 bg-amber-400/10 text-amber-100'
              : 'border-[#8DF688]/25 bg-[#8DF688]/10 text-[#DFFFD8]'
          }`}>
            <div className="flex items-center gap-3">
              <RadioTower className="h-4 w-4" />
              <span>
                {isOffline
                  ? `Offline mode active. ${pendingCheckIns.length} check-in${pendingCheckIns.length === 1 ? '' : 's'} waiting to sync.`
                  : 'Online and synced. Cached tickets, maps, FAQs, and queue state stay available if the network drops.'}
              </span>
            </div>
            {!isOffline && pendingCheckIns.length > 0 ? (
              <button
                onClick={syncPendingCheckIns}
                className="rounded-full border border-[#8DF688]/40 px-3 py-1 text-xs font-medium text-[#8DF688]"
              >
                Sync queue
              </button>
            ) : null}
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_0.92fr]">
          <div className="space-y-6">
            <div className={`${cardClass} overflow-hidden`}>
              <div className="relative h-64 overflow-hidden">
                <img src={event.bannerImage} alt={event.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07110B] via-[#07110B]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.28em] text-[#B9F8B7]">
                    Host lifecycle control
                  </p>
                  <h2 className="max-w-3xl font-enterprise-heading text-3xl leading-tight sm:text-4xl">
                    {event.tagline}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-white/72 sm:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {event.dashboardMetrics.map((metric) => (
                <div key={metric.id} className={`${cardClass} px-5 py-5`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/45">
                    {metric.label}
                  </p>
                  <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-sm text-[#AEEBAB]">{metric.trend}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {organizerViews.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setOrganizerView(view.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    organizerView === view.id
                      ? 'bg-[#8DF688] text-[#081109]'
                      : 'border border-white/10 bg-white/5 text-white/72 hover:border-[#8DF688]/40 hover:text-white'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </div>

            {organizerView === 'overview' ? (
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.95fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Live dashboard</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Team roles and command flow</h3>
                  <div className="mt-5 space-y-3">
                    {event.team.map((member) => (
                      <div key={member.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-lg font-semibold">{member.name}</p>
                            <p className="mt-1 text-sm text-[#AEEBAB]">{member.role.replace('_', ' ')}</p>
                          </div>
                          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                            {member.permissions.length} permissions
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-white/65">{member.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <div className="flex items-center gap-3">
                      <MapPinned className="h-5 w-5 text-[#8DF688]" />
                      <div>
                        <p className={sectionLabelClass}>Indoor map</p>
                        <h3 className="font-enterprise-heading text-2xl">Occupancy-aware venue control</h3>
                      </div>
                    </div>
                    <div className="relative mt-5 h-64 rounded-[28px] border border-white/10 bg-[#0E1812] p-4">
                      {event.venueNodes.map((node) => (
                        <div
                          key={node.id}
                          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                          style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        >
                          <div className="h-4 w-4 rounded-full border border-[#D7FFD4] bg-[#8DF688] shadow-[0_0_24px_rgba(141,246,136,0.6)]" />
                          <span className="rounded-full bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                            {node.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm text-white/65">{event.venueDescription}</p>
                  </div>

                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-[#8DF688]" />
                      <div>
                        <p className={sectionLabelClass}>Operational readiness</p>
                        <h3 className="font-enterprise-heading text-2xl">Core loop health</h3>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3 text-sm text-white/70">
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Discover → register → schedule → attend → check-in remains intact with offline fallback.</div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">AI orchestration is advisory-first, with organizer override and role-aware alerts.</div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Waitlists and seat rebalance are surfaced before sessions overfill.</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {organizerView === 'setup' ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Event setup</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Core event controls</h3>
                  <div className="mt-5 space-y-4">
                    <label className="block">
                      <span className="mb-2 block text-sm text-white/60">Event title</span>
                      <input
                        className={inputClass}
                        value={event.name}
                        onChange={(e) => updateEvent((current) => ({ ...current, name: e.target.value }))}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-white/60">Tagline</span>
                      <input
                        className={inputClass}
                        value={event.tagline}
                        onChange={(e) => updateEvent((current) => ({ ...current, tagline: e.target.value }))}
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-sm text-white/60">Venue description for AI mapping</span>
                      <textarea
                        className={`${inputClass} min-h-28 resize-none`}
                        value={event.venueDescription}
                        onChange={(e) => updateEvent((current) => ({ ...current, venueDescription: e.target.value }))}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className={sectionLabelClass}>Ticketing and registration</p>
                        <h3 className="mt-2 font-enterprise-heading text-2xl">Whop-ready ticket setup</h3>
                      </div>
                      <button
                        onClick={addTicketTier}
                        className="rounded-full border border-[#8DF688]/40 px-4 py-2 text-sm text-[#8DF688]"
                      >
                        Add tier
                      </button>
                    </div>
                    <div className="mt-5 space-y-3">
                      {event.ticketTiers.map((tier) => (
                        <div key={tier.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-lg font-semibold">{tier.name}</p>
                              <p className="mt-1 text-sm text-white/60">
                                {tier.type} • {tier.currency} {tier.price}
                              </p>
                            </div>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                              {tier.sold}/{tier.capacity}
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {tier.customFields?.map((field) => (
                              <span key={field} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                                {field}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className={sectionLabelClass}>Sponsors and community</p>
                        <h3 className="mt-2 font-enterprise-heading text-2xl">Partner setup</h3>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={addSponsor} className="rounded-full border border-[#8DF688]/40 px-4 py-2 text-sm text-[#8DF688]">
                          Add sponsor
                        </button>
                        <button onClick={addCommunityLink} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
                          Add link
                        </button>
                      </div>
                    </div>
                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      {event.sponsors.map((sponsor) => (
                        <div key={sponsor.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                          <p className="text-lg font-semibold">{sponsor.name}</p>
                          <p className="mt-1 text-sm text-[#AEEBAB]">{sponsor.tier}</p>
                          <p className="mt-3 text-sm text-white/60">{sponsor.blurb}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {organizerView === 'program' ? (
              <div className="grid gap-6 lg:grid-cols-[1.12fr_0.95fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className={sectionLabelClass}>Program builder</p>
                      <h3 className="mt-2 font-enterprise-heading text-2xl">Sessions and tracks</h3>
                    </div>
                    <button onClick={addSession} className="rounded-full border border-[#8DF688]/40 px-4 py-2 text-sm text-[#8DF688]">
                      Add session
                    </button>
                  </div>
                  <div className="mt-5 space-y-3">
                    {event.sessions.map((session) => (
                      <div key={session.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/40">{session.trackId}</p>
                            <h4 className="mt-1 text-lg font-semibold">{session.title}</h4>
                            <p className="mt-2 text-sm text-white/60">{session.description}</p>
                          </div>
                          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                            {session.attendees}/{session.capacity}
                          </span>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/60">
                          <span>{formatSessionTime(session.start, session.end)}</span>
                          <span className="text-white/20">•</span>
                          <span>{session.roomName}</span>
                          <span className="text-white/20">•</span>
                          <span>{session.waitlistCount ?? 0} on waitlist</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className={sectionLabelClass}>Speaker management</p>
                      <h3 className="mt-2 font-enterprise-heading text-2xl">Speaker roster</h3>
                    </div>
                    <button onClick={addSpeaker} className="rounded-full border border-[#8DF688]/40 px-4 py-2 text-sm text-[#8DF688]">
                      Add speaker
                    </button>
                  </div>
                  <div className="mt-5 space-y-3">
                    {event.speakers.map((speaker) => (
                      <div key={speaker.id} className="flex gap-4 rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <img src={speaker.image} alt={speaker.name} className="h-16 w-16 rounded-2xl border border-white/10 bg-white/5" />
                        <div className="flex-1">
                          <p className="text-lg font-semibold">{speaker.name}</p>
                          <p className="mt-1 text-sm text-[#AEEBAB]">{speaker.role} • {speaker.company}</p>
                          <p className="mt-2 text-sm text-white/60">{speaker.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {organizerView === 'operations' ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <div className="flex items-center gap-3">
                    <LifeBuoy className="h-5 w-5 text-[#8DF688]" />
                    <div>
                      <p className={sectionLabelClass}>Seats and waitlist</p>
                      <h3 className="font-enterprise-heading text-2xl">Live capacity controls</h3>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {event.seatAssignments.map((seat) => (
                      <div key={seat.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-lg font-semibold">{seat.label}</p>
                            <p className="mt-2 text-sm text-white/60">
                              {seat.allocated} allocated • {seat.available} available
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => rebalanceSeats(seat.id, -10)} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                              -10 seats
                            </button>
                            <button onClick={() => rebalanceSeats(seat.id, 10)} className="rounded-full border border-[#8DF688]/40 px-3 py-1 text-xs text-[#8DF688]">
                              +10 seats
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 space-y-3">
                    {event.waitlist.map((entry) => (
                      <div key={entry.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-lg font-semibold">{entry.attendeeName}</p>
                            <p className="mt-1 text-sm text-white/60">{entry.priority}</p>
                          </div>
                          <button
                            onClick={() => promoteWaitlist(entry.id)}
                            disabled={entry.status === 'promoted'}
                            className={`rounded-full px-4 py-2 text-sm ${
                              entry.status === 'promoted'
                                ? 'bg-white/5 text-white/40'
                                : 'bg-[#8DF688] text-[#081109]'
                            }`}
                          >
                            {entry.status === 'promoted' ? 'Promoted' : 'Promote'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <div className="flex items-center gap-3">
                      <Send className="h-5 w-5 text-[#8DF688]" />
                      <div>
                        <p className={sectionLabelClass}>Announcements</p>
                        <h3 className="font-enterprise-heading text-2xl">Broadcast updates</h3>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3">
                      <input
                        className={inputClass}
                        placeholder="Announcement title"
                        value={announcementTitle}
                        onChange={(e) => setAnnouncementTitle(e.target.value)}
                      />
                      <textarea
                        className={`${inputClass} min-h-24 resize-none`}
                        placeholder="Write the message that should go to attendees and team"
                        value={announcementMessage}
                        onChange={(e) => setAnnouncementMessage(e.target.value)}
                      />
                      <button onClick={sendAnnouncement} className="rounded-full bg-[#8DF688] px-5 py-3 font-semibold text-[#081109]">
                        Send broadcast
                      </button>
                    </div>
                    <div className="mt-5 space-y-3">
                      {event.announcements.map((announcement) => (
                        <div key={announcement.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-lg font-semibold">{announcement.title}</p>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                              {announcement.status}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-white/60">{announcement.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Sponsor lead capture</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Booth activity</h3>
                    <div className="mt-5 space-y-3">
                      {event.sponsors.map((sponsor) => (
                        <div key={sponsor.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-lg font-semibold">{sponsor.name}</p>
                              <p className="mt-1 text-sm text-[#AEEBAB]">{sponsor.tier}</p>
                            </div>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                              {sponsor.leadsCaptured ?? 0} leads
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {organizerView === 'concierge' ? (
              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.98fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <div className="flex items-center gap-3">
                    <Bot className="h-5 w-5 text-[#8DF688]" />
                    <div>
                      <p className={sectionLabelClass}>AI concierge setup</p>
                      <h3 className="font-enterprise-heading text-2xl">Knowledge base and escalation</h3>
                    </div>
                  </div>
                  <div className="mt-5 flex gap-3">
                    <input
                      className={inputClass}
                      placeholder="Add a common attendee question"
                      value={faqDraft}
                      onChange={(e) => setFaqDraft(e.target.value)}
                    />
                    <button onClick={addFaq} className="rounded-2xl bg-[#8DF688] px-4 py-3 font-semibold text-[#081109]">
                      Save
                    </button>
                  </div>
                  <div className="mt-5 space-y-3">
                    {event.conciergeFaqs.map((faq) => (
                      <div key={faq.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <p className="font-semibold">{faq.question}</p>
                        <p className="mt-2 text-sm text-white/65">{faq.answer}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {faq.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/55">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <div className="flex items-center gap-3">
                      <WandSparkles className="h-5 w-5 text-[#8DF688]" />
                      <div>
                        <p className={sectionLabelClass}>AI orchestration</p>
                        <h3 className="font-enterprise-heading text-2xl">Command surfaces</h3>
                      </div>
                    </div>
                    <div className="mt-5 space-y-3 text-sm text-white/70">
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Move sessions, update seat blocks, route attendees, and trigger announcements through `/ai/action`.</div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Duplicate attendee questions and waitlist pressure should escalate to moderators and organizers first.</div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Voice mode remains a shell until the OpenRouter + speech pipeline is wired in.</div>
                    </div>
                  </div>

                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Sample host triggers</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Live command prompts</h3>
                    <div className="mt-5 space-y-3">
                      {[
                        'Move Workshop A to 3 PM and notify saved attendees',
                        'Promote 5 keynote waitlist attendees',
                        'Push a sponsor boulevard traffic update',
                        'Highlight the route to Studio B on the venue map',
                      ].map((prompt) => (
                        <div key={prompt} className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/70">
                          {prompt}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {organizerView === 'analytics' ? (
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.98fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <div className="flex items-center gap-3">
                    <ChartNoAxesCombined className="h-5 w-5 text-[#8DF688]" />
                    <div>
                      <p className={sectionLabelClass}>Reports and insights</p>
                      <h3 className="font-enterprise-heading text-2xl">Post-event analytics</h3>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {Object.entries(event.analytics).map(([key, value]) => (
                      <div key={key} className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-white/45">{key}</p>
                        <p className="mt-3 text-lg font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Certificates and follow-up</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Attendee outcomes</h3>
                    <div className="mt-5 space-y-3">
                      {event.certificates.map((certificate) => (
                        <div key={certificate.id} className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                          <p className="text-lg font-semibold">{certificate.title}</p>
                          <p className="mt-2 text-sm text-white/60">Issued on {certificate.issuedOn}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Notifications</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Recent attendee alerts</h3>
                    <div className="mt-5 space-y-3">
                      {event.notifications.map((notification) => (
                        <div key={notification.id} className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold">{notification.title}</p>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                              {notification.type}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-white/60">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {organizerView === 'api' ? (
              <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                <p className={sectionLabelClass}>Frontend + backend mapping</p>
                <h3 className="mt-2 font-enterprise-heading text-2xl">Production API overview</h3>
                <div className="mt-5 space-y-3">
                  {enterpriseApiSpec.map((endpoint) => (
                    <div key={`${endpoint.method}-${endpoint.path}`} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[#8DF688]/15 px-3 py-1 text-xs font-medium text-[#8DF688]">
                          {endpoint.method}
                        </span>
                        <code className="font-mono text-sm text-white">{endpoint.path}</code>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                          {endpoint.surface}
                        </span>
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                          {endpoint.handler}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-white/65">{endpoint.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-6">
            <div className={`${cardClass} px-5 py-6 sm:px-6`}>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-[#8DF688]" />
                <div>
                  <p className={sectionLabelClass}>Attendee lifecycle</p>
                  <h3 className="font-enterprise-heading text-2xl">Host priorities</h3>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  'Pre-event: configure tickets, seats, speakers, sponsors, FAQ, and community links.',
                  'During event: rebalance waitlists, moderate Q&A, update routes, and broadcast changes.',
                  'Post-event: issue certificates, review analytics, and follow up with segmented communications.',
                ].map((item, index) => (
                  <div key={item} className="flex gap-3 rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8DF688] text-xs font-semibold text-[#081109]">
                      {index + 1}
                    </div>
                    <p className="text-sm text-white/70">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${cardClass} px-5 py-6 sm:px-6`}>
              <div className="flex items-center gap-3">
                <Ticket className="h-5 w-5 text-[#8DF688]" />
                <div>
                  <p className={sectionLabelClass}>Waitlist pressure</p>
                  <h3 className="font-enterprise-heading text-2xl">Session demand snapshot</h3>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {event.sessions.map((session) => (
                  <div key={session.id} className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold">{session.title}</p>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                        {session.waitlistCount ?? 0} waitlist
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${cardClass} px-5 py-6 sm:px-6`}>
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-[#8DF688]" />
                <div>
                  <p className={sectionLabelClass}>Next integration wave</p>
                  <h3 className="font-enterprise-heading text-2xl">Production wiring</h3>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-white/70">
                <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Supabase auth, RLS, storage, realtime, and event CRUD endpoints.</div>
                <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Whop checkout, QR wallet issuance, and payment status updates.</div>
                <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">OpenRouter, vector search, and AI action routing for schedules, maps, and notifications.</div>
              </div>
            </div>

            <div className={`${cardClass} px-5 py-6 sm:px-6`}>
              <button
                onClick={() => navigate(`/e/${event.slug}`)}
                className="flex w-full items-center justify-between rounded-[24px] bg-[#8DF688] px-5 py-4 font-semibold text-[#081109]"
              >
                Open attendee lifecycle preview
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};
