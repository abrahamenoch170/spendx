import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Bot,
  CalendarPlus,
  CheckCircle2,
  Clock3,
  MapPinned,
  MessageCircle,
  Mic,
  QrCode,
  Search,
  Sparkles,
  Ticket,
  TrainFront,
  Users,
} from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { enterpriseCache } from '../features/enterprise/cache';
import { useEnterpriseStore } from '../features/enterprise/store';
import type { Poll, Session } from '../features/enterprise/types';

const pageTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'travel', label: 'Travel' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'map', label: 'Venue Map' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'networking', label: 'Networking' },
  { id: 'ticket', label: 'Ticket Wallet' },
  { id: 'history', label: 'History' },
  { id: 'concierge', label: 'AI Concierge' },
] as const;

const cardClass =
  'rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.28)]';

const inputClass =
  'w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-[#8DF688]/70 focus:ring-2 focus:ring-[#8DF688]/20';

const sectionLabelClass = 'font-mono text-[11px] uppercase tracking-[0.24em] text-[#8DF688]';

const quickReplies = [
  'Show my agenda',
  'Next session',
  'Venue directions',
  'Show my ticket',
  'Travel estimate',
];

const formatSessionTime = (session: Session) =>
  `${format(new Date(session.start), 'EEE, h:mm a')} - ${format(new Date(session.end), 'h:mm a')}`;

const connectLabel = (state: string) => {
  if (state === 'connected') return 'Connected';
  if (state === 'pending') return 'Pending';
  return "Let's Connect";
};

const findSpeakerNames = (session: Session, namesById: Record<string, string>) =>
  session.speakerIds.length
    ? session.speakerIds.map((id) => namesById[id]).filter(Boolean).join(', ')
    : 'Open networking session';

export const PublicEventPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    event,
    selectedTicketId,
    selectedAgendaSessionIds,
    selectedSessionId,
    setSelectedSession,
    selectedMapNodeId,
    setSelectedMapNode,
    selectTicket,
    ticketWalletClaimed,
    attendeeCheckedIn,
    queueCheckIn,
    isOffline,
    setOfflineState,
    toggleAgendaSession,
    toggleConnect,
    conciergeMessages,
    addConciergeMessage,
    pendingCheckIns,
    claimTicketWallet,
    votePollOption,
    markNotificationRead,
    updateTransportOrigin,
  } = useEnterpriseStore();

  const [activeTab, setActiveTab] = useState<(typeof pageTabs)[number]['id']>('overview');
  const [conciergeInput, setConciergeInput] = useState('');
  const [mapQuery, setMapQuery] = useState('');
  const [travelOrigin, setTravelOrigin] = useState(event.transportEstimate.originLabel);

  useEffect(() => {
    const hydrate = async () => {
      await enterpriseCache.hydrateFromBoundary();
    };
    void hydrate();
  }, []);

  useEffect(() => {
    const updateNetwork = () => setOfflineState(!window.navigator.onLine);
    updateNetwork();
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    return () => {
      window.removeEventListener('online', updateNetwork);
      window.removeEventListener('offline', updateNetwork);
    };
  }, [setOfflineState]);

  const selectedTicket =
    event.ticketTiers.find((tier) => tier.id === selectedTicketId) ?? event.ticketTiers[0];
  const speakerNamesById = useMemo(
    () => Object.fromEntries(event.speakers.map((speaker) => [speaker.id, speaker.name])),
    [event.speakers]
  );
  const agendaSessions = event.sessions.filter((session) =>
    selectedAgendaSessionIds.includes(session.id)
  );
  const selectedSession =
    event.sessions.find((session) => session.id === selectedSessionId) ?? event.sessions[0];

  const filteredNodes = event.venueNodes.filter((node) => {
    const query = mapQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      node.name.toLowerCase().includes(query) ||
      node.description.toLowerCase().includes(query) ||
      node.kind.toLowerCase().includes(query)
    );
  });

  const selectedNode =
    event.venueNodes.find((node) => node.id === selectedMapNodeId) ??
    filteredNodes[0] ??
    event.venueNodes[0];

  const activeRoute =
    event.venueRoutes.find((route) => route.toNodeId === selectedNode?.id) ??
    event.venueRoutes[0];

  const handleConciergeSubmit = async (text: string) => {
    if (!text.trim()) return;
    await addConciergeMessage(text.trim());
    setConciergeInput('');
  };

  const handleCheckIn = () => {
    if (!selectedSession) return;
    queueCheckIn(selectedSession.id, 'Guest Pass Holder');
    setActiveTab('ticket');
  };

  const applyTransportEstimate = () => {
    if (!travelOrigin.trim()) return;
    updateTransportOrigin(travelOrigin.trim());
  };

  const slugMatches = !id || id === event.slug || id === event.id;

  const nextAgendaSession = agendaSessions[0];
  const unreadNotifications = event.notifications.filter((notification) => !notification.read);

  return (
    <div className="enterprise-shell min-h-screen bg-[#07110B] pb-24 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,246,136,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(141,246,136,0.08),transparent_30%)]" />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 p-4 sm:p-6">
        <header className={`${cardClass} sticky top-4 z-20 px-5 py-5 sm:px-6`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/app/dashboard')}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#8DF688]">
                  Attendee lifecycle
                </p>
                <h1 className="font-enterprise-heading text-3xl tracking-tight sm:text-4xl">
                  {event.name}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('ticket')}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80"
              >
                Ticket wallet
              </button>
              <button
                onClick={() => setActiveTab('concierge')}
                className="rounded-full bg-[#8DF688] px-5 py-2.5 font-semibold text-[#081109]"
              >
                Open concierge
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
            <span>{format(new Date(event.startDate), 'MMM d')} - {format(new Date(event.endDate), 'MMM d, yyyy')}</span>
            <span className="text-white/20">•</span>
            <span>{event.location}</span>
            <span className="text-white/20">•</span>
            <span>{event.attendeeCount} registered</span>
            <span className="text-white/20">•</span>
            <span>{unreadNotifications.length} unread updates</span>
            {!slugMatches ? (
              <>
                <span className="text-white/20">•</span>
                <span className="text-amber-200">Previewing seeded event for `{id}`</span>
              </>
            ) : null}
          </div>

          <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
            isOffline
              ? 'border-amber-300/30 bg-amber-400/10 text-amber-100'
              : 'border-[#8DF688]/25 bg-[#8DF688]/10 text-[#DFFFD8]'
          }`}>
            {isOffline
              ? `Offline mode is on. Your schedule, ticket, map, FAQs, and travel estimate remain cached. ${pendingCheckIns.length} action${pendingCheckIns.length === 1 ? '' : 's'} waiting to sync.`
              : 'You are online. Ticket, map, schedule, travel planning, and concierge are ready with offline fallback.'}
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.58fr_0.92fr]">
          <div className="space-y-6">
            <div className={`${cardClass} overflow-hidden`}>
              <div className="relative h-[360px] overflow-hidden">
                <img src={event.bannerImage} alt={event.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07110B] via-[#07110B]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#B9F8B7]">
                    {event.category} • {event.type}
                  </p>
                  <h2 className="mt-3 max-w-3xl font-enterprise-heading text-4xl leading-tight sm:text-5xl">
                    {event.tagline}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
                    {event.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        claimTicketWallet();
                        setActiveTab('ticket');
                      }}
                      className="rounded-full bg-[#8DF688] px-5 py-3 font-semibold text-[#081109]"
                    >
                      Register / Get Ticket
                    </button>
                    <button
                      onClick={() => setActiveTab('agenda')}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/85"
                    >
                      My Agenda
                    </button>
                    <button
                      onClick={() => setActiveTab('map')}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/85"
                    >
                      Indoor Map
                    </button>
                    <button
                      onClick={() => setActiveTab('travel')}
                      className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/85"
                    >
                      Travel Planner
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {pageTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-[#8DF688] text-[#081109]'
                      : 'border border-white/10 bg-white/5 text-white/72 hover:border-[#8DF688]/40 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'overview' ? (
              <div className="grid gap-6 lg:grid-cols-2">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Pre-event planning</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Your core controls</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      { icon: Ticket, label: 'Ticket wallet', action: 'ticket' },
                      { icon: CalendarPlus, label: 'My agenda', action: 'agenda' },
                      { icon: MapPinned, label: 'Venue map', action: 'map' },
                      { icon: TrainFront, label: 'Travel planner', action: 'travel' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setActiveTab(item.action as typeof activeTab)}
                        className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-5 text-left transition hover:border-[#8DF688]/40"
                      >
                        <item.icon className="h-5 w-5 text-[#8DF688]" />
                        <p className="mt-4 text-sm text-white/72">{item.label}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Live highlights</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Sessions and notifications</h3>
                  <div className="mt-5 space-y-3">
                    {event.sessions.slice(0, 3).map((session) => (
                      <button
                        key={session.id}
                        onClick={() => {
                          setSelectedSession(session.id);
                          setActiveTab('agenda');
                        }}
                        className="w-full rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-left transition hover:border-[#8DF688]/40"
                      >
                        <p className="text-lg font-semibold">{session.title}</p>
                        <p className="mt-2 text-sm text-white/60">{findSpeakerNames(session, speakerNamesById)}</p>
                        <p className="mt-3 font-mono text-xs text-[#AEEBAB]">{formatSessionTime(session)}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'travel' ? (
              <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Budget calculator</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Travel and cost planning</h3>
                  <div className="mt-5 space-y-4">
                    <label className="block">
                      <span className="mb-2 block text-sm text-white/60">Starting location</span>
                      <input
                        className={inputClass}
                        value={travelOrigin}
                        onChange={(e) => setTravelOrigin(e.target.value)}
                      />
                    </label>
                    <button onClick={applyTransportEstimate} className="rounded-full bg-[#8DF688] px-5 py-3 font-semibold text-[#081109]">
                      Update estimate
                    </button>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">Distance</p>
                      <p className="mt-3 text-lg font-semibold">{event.transportEstimate.distanceKm} km</p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">Travel time</p>
                      <p className="mt-3 text-lg font-semibold">{event.transportEstimate.durationMinutes} min</p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">Estimated cost</p>
                      <p className="mt-3 text-lg font-semibold">
                        {event.transportEstimate.currency} {event.transportEstimate.estimatedCost}
                      </p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">Countdown</p>
                      <p className="mt-3 text-lg font-semibold">{event.transportEstimate.countdownLabel}</p>
                    </div>
                  </div>
                </div>

                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>AI planning</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Suggested pre-event actions</h3>
                  <div className="mt-5 space-y-3 text-sm text-white/70">
                    <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Select your ticket first so budget, reminders, and schedule guidance can stay personalized.</div>
                    <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Use “Add to agenda” before event day to unlock route-first prompts and live session reminders.</div>
                    <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Travel estimates are ready to sync into Solo Mode later when the cross-mode bridge is added.</div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'agenda' ? (
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.9fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Personal agenda</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">All sessions</h3>
                  <div className="mt-5 space-y-3">
                    {event.sessions.map((session) => {
                      const saved = selectedAgendaSessionIds.includes(session.id);
                      return (
                        <div key={session.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{session.type}</p>
                              <button
                                onClick={() => setSelectedSession(session.id)}
                                className="mt-1 text-left text-lg font-semibold transition hover:text-[#8DF688]"
                              >
                                {session.title}
                              </button>
                              <p className="mt-2 text-sm text-white/60">{session.description}</p>
                            </div>
                            <button
                              onClick={() => toggleAgendaSession(session.id)}
                              className={`rounded-full px-4 py-2 text-sm font-medium ${
                                saved
                                  ? 'bg-[#8DF688] text-[#081109]'
                                  : 'border border-white/10 text-white/80'
                              }`}
                            >
                              {saved ? 'Saved' : 'Add to agenda'}
                            </button>
                          </div>
                          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/60">
                            <span>{formatSessionTime(session)}</span>
                            <span className="text-white/20">•</span>
                            <span>{session.roomName}</span>
                            <span className="text-white/20">•</span>
                            <span>{findSpeakerNames(session, speakerNamesById)}</span>
                            {session.live ? (
                              <span className="rounded-full bg-[#8DF688]/15 px-3 py-1 text-xs text-[#8DF688]">
                                Live now
                              </span>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Session detail</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">
                    {selectedSession?.title ?? 'Choose a session'}
                  </h3>
                  {selectedSession ? (
                    <div className="mt-5 space-y-4">
                      <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <p className="text-sm text-white/70">{selectedSession.description}</p>
                        <div className="mt-4 space-y-2 text-sm text-white/60">
                          <p>{formatSessionTime(selectedSession)}</p>
                          <p>{selectedSession.roomName}</p>
                          <p>{findSpeakerNames(selectedSession, speakerNamesById)}</p>
                          <p>{selectedSession.waitlistCount ?? 0} people on waitlist</p>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <button
                          onClick={handleCheckIn}
                          className="rounded-full bg-[#8DF688] px-5 py-3 font-semibold text-[#081109]"
                        >
                          {attendeeCheckedIn ? 'Checked in' : 'Session check-in'}
                        </button>
                        <button
                          onClick={() => setActiveTab('engagement')}
                          className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/85"
                        >
                          Polls / Q&A
                        </button>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedMapNode(selectedSession.roomId);
                          setActiveTab('map');
                        }}
                        className="inline-flex items-center gap-2 text-sm text-[#8DF688]"
                      >
                        <MapPinned className="h-4 w-4" /> Open room on map
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {activeTab === 'map' ? (
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.9fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className={sectionLabelClass}>Indoor navigation</p>
                      <h3 className="mt-2 font-enterprise-heading text-2xl">Venue map</h3>
                    </div>
                    <label className="relative w-full max-w-xs">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45" />
                      <input
                        className={`${inputClass} pl-10`}
                        placeholder="Search rooms, booths, amenities"
                        value={mapQuery}
                        onChange={(e) => setMapQuery(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="relative mt-5 h-[420px] rounded-[28px] border border-white/10 bg-[#0E1812] p-4">
                    {filteredNodes.map((node) => (
                      <button
                        key={node.id}
                        onClick={() => setSelectedMapNode(node.id)}
                        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      >
                        <div
                          className={`h-5 w-5 rounded-full border shadow-[0_0_22px_rgba(141,246,136,0.6)] ${
                            selectedNode?.id === node.id
                              ? 'border-[#E8FFE5] bg-[#8DF688]'
                              : 'border-white/40 bg-[#77D671]'
                          }`}
                        />
                        <span className="rounded-full bg-black/75 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                          {node.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Navigation sheet</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">{selectedNode?.name}</h3>
                  {selectedNode ? (
                    <div className="mt-5 space-y-4">
                      <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <p className="text-sm text-white/70">{selectedNode.description}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/60">
                          <span className="rounded-full bg-[#8DF688]/15 px-3 py-1 text-xs text-[#8DF688]">
                            {selectedNode.kind}
                          </span>
                          <span>{selectedNode.occupancy}% occupancy</span>
                        </div>
                      </div>
                      {activeRoute ? (
                        <div className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                          <p className="text-sm text-white/60">Suggested route</p>
                          <p className="mt-2 text-lg font-semibold">{activeRoute.label}</p>
                          <p className="mt-2 text-sm text-[#AEEBAB]">
                            Approx. {activeRoute.durationMinutes} min walk
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {activeTab === 'engagement' ? (
              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.98fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Live engagement</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Polls and Q&A</h3>
                  <div className="mt-5 space-y-4">
                    {event.polls.map((poll: Poll) => (
                      <div key={poll.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <p className="text-lg font-semibold">{poll.question}</p>
                        <div className="mt-4 space-y-2">
                          {poll.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => votePollOption(poll.id, option.id)}
                              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/75 transition hover:border-[#8DF688]/40"
                            >
                              <span>{option.label}</span>
                              <span className="font-mono text-[#AEEBAB]">{option.votes}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Notifications</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Live updates</h3>
                    <div className="mt-5 space-y-3">
                      {event.notifications.map((notification) => (
                        <button
                          key={notification.id}
                          onClick={() => markNotificationRead(notification.id)}
                          className="w-full rounded-[24px] border border-white/10 bg-black/20 px-4 py-4 text-left transition hover:border-[#8DF688]/40"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold">{notification.title}</p>
                            <span className={`rounded-full px-3 py-1 text-xs ${notification.read ? 'bg-white/5 text-white/40' : 'bg-[#8DF688]/15 text-[#8DF688]'}`}>
                              {notification.read ? 'read' : 'new'}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-white/60">{notification.message}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Feedback loop</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Session feedback</h3>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                        <MessageCircle className="h-5 w-5 text-[#8DF688]" />
                        <p className="mt-3 text-sm text-white/70">Submit Q&A and moderator-ready prompts during live sessions.</p>
                      </div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                        <Sparkles className="h-5 w-5 text-[#8DF688]" />
                        <p className="mt-3 text-sm text-white/70">Lottie-ready confirmation states can wrap votes, ratings, and comments later.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'networking' ? (
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.9fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Networking</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Attendee directory</h3>
                  <div className="mt-5 space-y-3">
                    {event.attendees.map((attendee) => (
                      <div key={attendee.id} className="flex gap-4 rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <img src={attendee.avatar} alt={attendee.name} className="h-16 w-16 rounded-2xl border border-white/10 bg-white/5" />
                        <div className="flex-1">
                          <p className="text-lg font-semibold">{attendee.name}</p>
                          <p className="mt-1 text-sm text-[#AEEBAB]">{attendee.role} • {attendee.company}</p>
                          <p className="mt-2 text-sm text-white/60">{attendee.bio}</p>
                          <div className="mt-3 flex flex-wrap gap-3">
                            <button
                              onClick={() => toggleConnect(attendee.id)}
                              className={`rounded-full px-4 py-2 text-sm font-medium ${
                                attendee.networkingState === 'connected'
                                  ? 'bg-[#8DF688] text-[#081109]'
                                  : 'border border-white/10 text-white/80'
                              }`}
                            >
                              {connectLabel(attendee.networkingState)}
                            </button>
                            <span className="rounded-full bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/60">
                              {attendee.community}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Community links</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Join the channels</h3>
                    <div className="mt-5 space-y-3">
                      {event.communityLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-[24px] border border-white/10 bg-black/20 px-4 py-4 transition hover:border-[#8DF688]/40"
                        >
                          <p className="font-semibold">{link.label}</p>
                          <p className="mt-2 text-sm text-white/60">{link.platform}</p>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>AI matchmaking</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Suggested connections</h3>
                    <div className="mt-5 space-y-3 text-sm text-white/70">
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">People with overlapping agenda picks are highlighted first.</div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Role-based suggestions will become live once the backend profile matcher is wired in.</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'ticket' ? (
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.95fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Ticketing</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Choose your pass</h3>
                  <div className="mt-5 space-y-3">
                    {event.ticketTiers.map((tier) => {
                      const active = tier.id === selectedTicketId;
                      return (
                        <button
                          key={tier.id}
                          onClick={() => selectTicket(tier.id)}
                          className={`w-full rounded-[24px] border px-4 py-4 text-left transition ${
                            active
                              ? 'border-[#8DF688]/60 bg-[#8DF688]/10'
                              : 'border-white/10 bg-black/20 hover:border-[#8DF688]/35'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-lg font-semibold">{tier.name}</p>
                              <p className="mt-1 text-sm text-white/60">
                                {tier.currency} {tier.price} • {tier.type}
                              </p>
                            </div>
                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                              {tier.capacity - tier.sold} left
                            </span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {tier.benefits.map((benefit) => (
                              <span key={benefit} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Wallet</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">QR ready</h3>
                  <div className="mt-5 rounded-[30px] border border-[#8DF688]/30 bg-[linear-gradient(160deg,rgba(141,246,136,0.2),rgba(255,255,255,0.03))] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold">{selectedTicket?.name}</p>
                        <p className="mt-1 text-sm text-white/60">{event.name}</p>
                      </div>
                      {ticketWalletClaimed ? (
                        <span className="rounded-full bg-[#081109] px-3 py-1 text-xs text-[#8DF688]">
                          Active
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-6 flex items-center justify-between rounded-[26px] border border-white/10 bg-black/30 px-4 py-5">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/45">
                          Session access
                        </p>
                        <p className="mt-2 text-sm text-white/70">
                          {agendaSessions.length} saved session{agendaSessions.length === 1 ? '' : 's'}
                        </p>
                      </div>
                      <QrCode className="h-16 w-16 text-[#D7FFD4]" />
                    </div>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button className="rounded-full bg-[#081109] px-4 py-2 text-sm text-[#8DF688]">
                        Add to Apple Wallet
                      </button>
                      <button className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80">
                        Add to Google Wallet
                      </button>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3 text-sm text-white/65">
                    <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                      Checkout seam is ready for Whop checkout and payment status hooks.
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                      {attendeeCheckedIn ? (
                        <span className="inline-flex items-center gap-2 text-[#8DF688]">
                          <CheckCircle2 className="h-4 w-4" /> Last session check-in queued successfully
                        </span>
                      ) : (
                        'Use the session detail panel to check in when a session goes live.'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'history' ? (
              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.98fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <p className={sectionLabelClass}>Post-event dashboard</p>
                  <h3 className="mt-2 font-enterprise-heading text-2xl">Past events and recommendations</h3>
                  <div className="mt-5 space-y-3">
                    {event.pastEvents.map((pastEvent) => (
                      <div key={pastEvent.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                        <p className="text-lg font-semibold">{pastEvent.title}</p>
                        <p className="mt-2 text-sm text-[#AEEBAB]">{pastEvent.date}</p>
                        <p className="mt-3 text-sm text-white/60">{pastEvent.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Certificates</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Downloads</h3>
                    <div className="mt-5 space-y-3">
                      {event.certificates.map((certificate) => (
                        <div key={certificate.id} className="rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                          <p className="text-lg font-semibold">{certificate.title}</p>
                          <p className="mt-2 text-sm text-white/60">Issued on {certificate.issuedOn}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>AI follow-up</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Recommended next actions</h3>
                    <div className="mt-5 space-y-3 text-sm text-white/70">
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Reconnect with attendees you marked as pending after the event wraps.</div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">Export sessions and certificates to your personal event history once backend exports are wired in.</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'concierge' ? (
              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.98fr]">
                <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                  <div className="flex items-center gap-3">
                    <Bot className="h-5 w-5 text-[#8DF688]" />
                    <div>
                      <p className={sectionLabelClass}>AI concierge</p>
                      <h3 className="font-enterprise-heading text-2xl">Ask anything about the event</h3>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {conciergeMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`max-w-[85%] rounded-[24px] px-4 py-4 text-sm ${
                          message.role === 'user'
                            ? 'ml-auto bg-[#8DF688] text-[#081109]'
                            : 'bg-black/25 text-white/75'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`mt-2 text-[11px] uppercase tracking-[0.2em] ${
                          message.role === 'user' ? 'text-[#0B2A0C]/70' : 'text-white/35'
                        }`}>
                          {message.state}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3">
                    <input
                      className={inputClass}
                      placeholder="Ask about your schedule, directions, travel, or ticket"
                      value={conciergeInput}
                      onChange={(e) => setConciergeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          void handleConciergeSubmit(conciergeInput);
                        }
                      }}
                    />
                    <button
                      onClick={() => void handleConciergeSubmit(conciergeInput)}
                      className="rounded-2xl bg-[#8DF688] px-4 py-3 font-semibold text-[#081109]"
                    >
                      Send
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Quick replies</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Fast actions</h3>
                    <div className="mt-5 space-y-3">
                      {quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => void handleConciergeSubmit(reply)}
                          className="w-full rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-left text-sm text-white/72 transition hover:border-[#8DF688]/40"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={`${cardClass} px-5 py-6 sm:px-6`}>
                    <p className={sectionLabelClass}>Voice and fallback</p>
                    <h3 className="mt-2 font-enterprise-heading text-2xl">Assistant states</h3>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                        <Mic className="h-5 w-5 text-[#8DF688]" />
                        <p className="mt-3 text-sm text-white/70">Voice shell ready for browser speech APIs</p>
                      </div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                        <Clock3 className="h-5 w-5 text-[#8DF688]" />
                        <p className="mt-3 text-sm text-white/70">Offline FAQ fallback stays available during outages</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-6">
            <div className={`${cardClass} px-5 py-6 sm:px-6`}>
              <p className={sectionLabelClass}>Next up</p>
              <h3 className="mt-2 font-enterprise-heading text-2xl">Personal agenda pulse</h3>
              {nextAgendaSession ? (
                <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 px-4 py-4">
                  <p className="text-lg font-semibold">{nextAgendaSession.title}</p>
                  <p className="mt-2 text-sm text-white/60">{formatSessionTime(nextAgendaSession)}</p>
                  <button
                    onClick={() => {
                      setSelectedSession(nextAgendaSession.id);
                      setSelectedMapNode(nextAgendaSession.roomId);
                      setActiveTab('map');
                    }}
                    className="mt-4 rounded-full bg-[#8DF688] px-4 py-2 text-sm font-semibold text-[#081109]"
                  >
                    Route me there
                  </button>
                </div>
              ) : (
                <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/60">
                  Save sessions to your agenda to see your next countdown here.
                </div>
              )}
            </div>

            <div className={`${cardClass} px-5 py-6 sm:px-6`}>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-[#8DF688]" />
                <div>
                  <p className={sectionLabelClass}>Speaker highlights</p>
                  <h3 className="font-enterprise-heading text-2xl">Featured voices</h3>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {event.speakers.slice(0, 3).map((speaker) => (
                  <div key={speaker.id} className="flex gap-3 rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                    <img src={speaker.image} alt={speaker.name} className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5" />
                    <div>
                      <p className="font-semibold">{speaker.name}</p>
                      <p className="mt-1 text-sm text-[#AEEBAB]">{speaker.role} • {speaker.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${cardClass} px-5 py-6 sm:px-6`}>
              <p className={sectionLabelClass}>Sponsor boulevard</p>
              <h3 className="mt-2 font-enterprise-heading text-2xl">Partner booths</h3>
              <div className="mt-5 space-y-3">
                {event.sponsors.map((sponsor) => (
                  <div key={sponsor.id} className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4">
                    <p className="font-semibold">{sponsor.name}</p>
                    <p className="mt-1 text-sm text-[#AEEBAB]">{sponsor.tier}</p>
                    <p className="mt-2 text-sm text-white/60">{sponsor.blurb}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${cardClass} px-5 py-6 sm:px-6`}>
              <p className={sectionLabelClass}>Notification feed</p>
              <h3 className="mt-2 font-enterprise-heading text-2xl">Unread updates</h3>
              <div className="mt-5 space-y-3">
                {unreadNotifications.length ? (
                  unreadNotifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => markNotificationRead(notification.id)}
                      className="w-full rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-left"
                    >
                      <p className="font-semibold">{notification.title}</p>
                      <p className="mt-2 text-sm text-white/60">{notification.message}</p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-[22px] border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/60">
                    You are caught up.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};
