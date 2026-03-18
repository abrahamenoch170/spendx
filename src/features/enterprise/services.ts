import { enterpriseSeedEvent } from './data';
import type {
  ConciergeFAQ,
  ConciergeMessage,
  EnterpriseConciergeService,
  EnterpriseEvent,
  EnterpriseEventService,
  EnterpriseMapService,
  EnterpriseTicketService,
  VenueNode,
  VenueRoute,
} from './types';

const wait = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const enterpriseEventService: EnterpriseEventService = {
  async getEvent(eventId) {
    await wait(100);
    return enterpriseSeedEvent.id === eventId || enterpriseSeedEvent.slug === eventId
      ? enterpriseSeedEvent
      : null;
  },
  async listEvents() {
    await wait(100);
    return [enterpriseSeedEvent];
  },
  async saveDraft(event: EnterpriseEvent) {
    await wait(150);
    return event;
  },
};

export const enterpriseConciergeService: EnterpriseConciergeService = {
  async ask(_eventId, input) {
    await wait(300);
    const normalized = input.toLowerCase();

    const faqMatch = enterpriseSeedEvent.conciergeFaqs.find(
      (faq) =>
        faq.question.toLowerCase().includes(normalized) ||
        faq.tags.some((tag) => normalized.includes(tag))
    );

    const workflowReplies = [
      {
        keywords: ['transport', 'travel', 'cost', 'distance'],
        text: `Your saved travel estimate is ${enterpriseSeedEvent.transportEstimate.distanceKm}km, about ${enterpriseSeedEvent.transportEstimate.durationMinutes} minutes, and roughly ${enterpriseSeedEvent.transportEstimate.currency} ${enterpriseSeedEvent.transportEstimate.estimatedCost}.`,
      },
      {
        keywords: ['waitlist', 'seat'],
        text: `Current waitlist pressure is highest on the keynote and Studio B workshop. Organizers can promote waitlisted attendees as seats open.`,
      },
      {
        keywords: ['certificate', 'history', 'past event'],
        text: 'Certificates and event history become available in the post-event dashboard once attendance is confirmed.',
      },
    ].find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));

    const text =
      faqMatch?.answer ??
      workflowReplies?.text ??
      'I can help with your agenda, travel estimate, ticket wallet, venue directions, networking, and post-event follow-up.';

    const response: ConciergeMessage = {
      id: `concierge-${Date.now()}`,
      role: 'assistant',
      text,
      state: 'sent',
      createdAt: new Date().toISOString(),
    };

    return response;
  },
  async getFaqs(): Promise<ConciergeFAQ[]> {
    await wait(50);
    return enterpriseSeedEvent.conciergeFaqs;
  },
};

export const enterpriseTicketService: EnterpriseTicketService = {
  async selectTicket() {
    await wait(200);
    return { success: true };
  },
  async checkIn() {
    await wait(200);
    return { success: true };
  },
};

export const enterpriseMapService: EnterpriseMapService = {
  async getNodes(): Promise<VenueNode[]> {
    await wait(80);
    return enterpriseSeedEvent.venueNodes;
  },
  async getRoutes(): Promise<VenueRoute[]> {
    await wait(80);
    return enterpriseSeedEvent.venueRoutes;
  },
};
