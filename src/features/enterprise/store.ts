import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { enterpriseSeedEvent } from './data';
import { enterpriseConciergeService } from './services';
import type {
  Announcement,
  CheckInRecord,
  ConciergeMessage,
  EnterpriseEvent,
} from './types';

interface EnterpriseStore {
  event: EnterpriseEvent;
  selectedTicketId: string | null;
  selectedSessionId: string | null;
  selectedMapNodeId: string | null;
  selectedAgendaSessionIds: string[];
  ticketWalletClaimed: boolean;
  attendeeCheckedIn: boolean;
  conciergeMessages: ConciergeMessage[];
  pendingCheckIns: CheckInRecord[];
  manualOverrideEnabled: boolean;
  organizerView: 'overview' | 'setup' | 'program' | 'operations' | 'concierge' | 'analytics' | 'api';
  isOffline: boolean;
  lastSyncLabel: string;
  setOrganizerView: (view: EnterpriseStore['organizerView']) => void;
  setSelectedSession: (sessionId: string | null) => void;
  setSelectedMapNode: (nodeId: string | null) => void;
  setOfflineState: (offline: boolean) => void;
  updateEvent: (updater: (event: EnterpriseEvent) => EnterpriseEvent) => void;
  selectTicket: (ticketId: string) => void;
  toggleAgendaSession: (sessionId: string) => void;
  toggleConnect: (attendeeId: string) => void;
  addConciergeMessage: (text: string) => Promise<void>;
  queueCheckIn: (sessionId: string, attendeeName: string) => void;
  syncPendingCheckIns: () => void;
  publishEvent: () => void;
  claimTicketWallet: () => void;
  promoteWaitlist: (entryId: string) => void;
  rebalanceSeats: (seatId: string, delta: number) => void;
  votePollOption: (pollId: string, optionId: string) => void;
  addAnnouncement: (title: string, message: string, audience: Announcement['audience']) => void;
  markNotificationRead: (notificationId: string) => void;
  updateTransportOrigin: (originLabel: string) => void;
}

const initialMessages: ConciergeMessage[] = [
  {
    id: 'message-1',
    role: 'assistant',
    text: 'Welcome to SpendX Enterprise. Ask about your agenda, travel estimate, venue directions, tickets, waitlists, or networking.',
    state: 'sent',
    createdAt: new Date().toISOString(),
  },
];

const roundToCurrency = (amount: number) => Math.max(0, Math.round(amount));

export const useEnterpriseStore = create<EnterpriseStore>()(
  persist(
    (set, get) => ({
      event: enterpriseSeedEvent,
      selectedTicketId: enterpriseSeedEvent.ticketTiers[1]?.id ?? null,
      selectedSessionId: enterpriseSeedEvent.sessions[0]?.id ?? null,
      selectedMapNodeId: enterpriseSeedEvent.venueNodes[0]?.id ?? null,
      selectedAgendaSessionIds: [enterpriseSeedEvent.sessions[0]?.id ?? ''],
      ticketWalletClaimed: true,
      attendeeCheckedIn: false,
      conciergeMessages: initialMessages,
      pendingCheckIns: [],
      manualOverrideEnabled: true,
      organizerView: 'overview',
      isOffline: typeof navigator !== 'undefined' ? !navigator.onLine : false,
      lastSyncLabel: 'Just now',
      setOrganizerView: (organizerView) => set({ organizerView }),
      setSelectedSession: (selectedSessionId) => set({ selectedSessionId }),
      setSelectedMapNode: (selectedMapNodeId) => set({ selectedMapNodeId }),
      setOfflineState: (isOffline) => set({ isOffline }),
      updateEvent: (updater) => set((state) => ({ event: updater(state.event) })),
      selectTicket: (selectedTicketId) => set({ selectedTicketId, ticketWalletClaimed: true }),
      toggleAgendaSession: (sessionId) =>
        set((state) => ({
          selectedAgendaSessionIds: state.selectedAgendaSessionIds.includes(sessionId)
            ? state.selectedAgendaSessionIds.filter((id) => id !== sessionId)
            : [...state.selectedAgendaSessionIds, sessionId],
        })),
      toggleConnect: (attendeeId) =>
        set((state) => ({
          event: {
            ...state.event,
            attendees: state.event.attendees.map((attendee) => {
              if (attendee.id !== attendeeId) return attendee;
              const nextState =
                attendee.networkingState === 'connected'
                  ? 'discoverable'
                  : attendee.networkingState === 'pending'
                    ? 'connected'
                    : 'pending';
              return { ...attendee, networkingState: nextState };
            }),
          },
        })),
      addConciergeMessage: async (text) => {
        const userMessage: ConciergeMessage = {
          id: `user-${Date.now()}`,
          role: 'user',
          text,
          state: 'sent',
          createdAt: new Date().toISOString(),
        };
        const typingMessage: ConciergeMessage = {
          id: `typing-${Date.now()}`,
          role: 'assistant',
          text: 'Concierge is thinking...',
          state: get().isOffline ? 'offline' : 'typing',
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          conciergeMessages: [...state.conciergeMessages, userMessage, typingMessage],
        }));

        if (get().isOffline) {
          const fallback =
            get().event.conciergeFaqs.find((faq) =>
              faq.tags.some((tag) => text.toLowerCase().includes(tag))
            )?.answer ??
            'You are offline. Cached event FAQs are still available for agenda, map, ticket, and travel help.';

          set((state) => ({
            conciergeMessages: state.conciergeMessages.map((message) =>
              message.id === typingMessage.id
                ? { ...message, text: fallback, state: 'offline' }
                : message
            ),
          }));
          return;
        }

        const response = await enterpriseConciergeService.ask(get().event.id, text);
        set((state) => ({
          conciergeMessages: state.conciergeMessages.map((message) =>
            message.id === typingMessage.id ? response : message
          ),
        }));
      },
      queueCheckIn: (sessionId, attendeeName) =>
        set((state) => ({
          attendeeCheckedIn: true,
          pendingCheckIns: [
            ...state.pendingCheckIns,
            {
              id: `checkin-${Date.now()}`,
              sessionId,
              attendeeId: 'attendee-self',
              attendeeName,
              status: state.isOffline ? 'queued' : 'synced',
              createdAt: new Date().toISOString(),
            },
          ],
          lastSyncLabel: state.isOffline ? 'Offline queue pending' : 'Synced moments ago',
          event: {
            ...state.event,
            notifications: [
              {
                id: `notification-${Date.now()}`,
                type: 'checkin',
                title: 'Check-in recorded',
                message: `Your check-in for ${state.event.sessions.find((session) => session.id === sessionId)?.title ?? 'session'} was captured.`,
                target: 'ticket',
                read: false,
                createdAt: new Date().toISOString(),
              },
              ...state.event.notifications,
            ],
          },
        })),
      syncPendingCheckIns: () =>
        set((state) => ({
          pendingCheckIns: state.pendingCheckIns.map((record) => ({ ...record, status: 'synced' })),
          lastSyncLabel: state.pendingCheckIns.length ? 'Synced moments ago' : state.lastSyncLabel,
        })),
      publishEvent: () =>
        set((state) => ({
          event: {
            ...state.event,
            status: state.event.status === 'published' ? 'draft' : 'published',
            dashboardMetrics: state.event.dashboardMetrics.map((metric) =>
              metric.id === 'metric-1'
                ? {
                    ...metric,
                    trend:
                      state.event.status === 'published'
                        ? 'Draft mode enabled'
                        : 'Public link is live',
                  }
                : metric
            ),
          },
        })),
      claimTicketWallet: () => set({ ticketWalletClaimed: true }),
      promoteWaitlist: (entryId) =>
        set((state) => {
          const entry = state.event.waitlist.find((item) => item.id === entryId);
          if (!entry) return state;

          return {
            event: {
              ...state.event,
              waitlist: state.event.waitlist.map((item) =>
                item.id === entryId ? { ...item, status: 'promoted' } : item
              ),
              seatAssignments: state.event.seatAssignments.map((seat) =>
                seat.sessionId === entry.sessionId && seat.available > 0
                  ? {
                      ...seat,
                      allocated: seat.allocated + 1,
                      available: seat.available - 1,
                    }
                  : seat
              ),
              announcements: [
                {
                  id: `announce-${Date.now()}`,
                  title: 'Waitlist promotion sent',
                  message: `${entry.attendeeName} was promoted from the waitlist for ${state.event.sessions.find((session) => session.id === entry.sessionId)?.title ?? 'a session'}.`,
                  audience: 'team',
                  createdAt: new Date().toISOString(),
                  status: 'sent',
                },
                ...state.event.announcements,
              ],
            },
          };
        }),
      rebalanceSeats: (seatId, delta) =>
        set((state) => ({
          event: {
            ...state.event,
            seatAssignments: state.event.seatAssignments.map((seat) => {
              if (seat.id !== seatId) return seat;
              const total = Math.max(seat.allocated, seat.total + delta);
              return {
                ...seat,
                total,
                available: Math.max(0, total - seat.allocated),
              };
            }),
          },
        })),
      votePollOption: (pollId, optionId) =>
        set((state) => ({
          event: {
            ...state.event,
            polls: state.event.polls.map((poll) =>
              poll.id === pollId
                ? {
                    ...poll,
                    options: poll.options.map((option) =>
                      option.id === optionId ? { ...option, votes: option.votes + 1 } : option
                    ),
                  }
                : poll
            ),
          },
        })),
      addAnnouncement: (title, message, audience) =>
        set((state) => ({
          event: {
            ...state.event,
            announcements: [
              {
                id: `announce-${Date.now()}`,
                title,
                message,
                audience,
                createdAt: new Date().toISOString(),
                status: 'sent',
              },
              ...state.event.announcements,
            ],
            notifications: [
              {
                id: `notification-${Date.now()}`,
                type: 'announcement',
                title,
                message,
                target: 'overview',
                read: false,
                createdAt: new Date().toISOString(),
              },
              ...state.event.notifications,
            ],
          },
        })),
      markNotificationRead: (notificationId) =>
        set((state) => ({
          event: {
            ...state.event,
            notifications: state.event.notifications.map((notification) =>
              notification.id === notificationId
                ? { ...notification, read: true }
                : notification
            ),
          },
        })),
      updateTransportOrigin: (originLabel) =>
        set((state) => {
          const distanceKm = Math.max(4, originLabel.trim().length * 0.8);
          const durationMinutes = Math.max(12, Math.round(distanceKm * 2.4));
          const estimatedCost = roundToCurrency(distanceKm * 550);
          return {
            event: {
              ...state.event,
              transportEstimate: {
                ...state.event.transportEstimate,
                originLabel,
                distanceKm: Number(distanceKm.toFixed(1)),
                durationMinutes,
                estimatedCost,
              },
            },
          };
        }),
    }),
    {
      name: 'spendx-enterprise-store',
      partialize: (state) => ({
        event: state.event,
        selectedTicketId: state.selectedTicketId,
        selectedSessionId: state.selectedSessionId,
        selectedMapNodeId: state.selectedMapNodeId,
        selectedAgendaSessionIds: state.selectedAgendaSessionIds,
        ticketWalletClaimed: state.ticketWalletClaimed,
        attendeeCheckedIn: state.attendeeCheckedIn,
        conciergeMessages: state.conciergeMessages,
        pendingCheckIns: state.pendingCheckIns,
        manualOverrideEnabled: state.manualOverrideEnabled,
        organizerView: state.organizerView,
        lastSyncLabel: state.lastSyncLabel,
      }),
    }
  )
);
