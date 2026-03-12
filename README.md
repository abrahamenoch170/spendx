# Spendx Web

Production-grade Next.js 14 project architecture for Spendx.

## Setup Instructions

1. Copy `.env.local.example` to `.env.local` and fill in the required environment variables.
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Environment Variables

- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key
- `OPENROUTER_API_KEY`: OpenRouter API key for AI features
- `DODO_API_KEY`: Dodo Payments API key
- `DODO_WEBHOOK_SECRET`: Dodo Payments webhook secret
- `ONESIGNAL_APP_ID`: OneSignal App ID for push notifications
- `ONESIGNAL_REST_API_KEY`: OneSignal REST API key
- `FOURSQUARE_API_KEY`: Foursquare API key for venue data
- `EVENTBRITE_API_KEY`: Eventbrite API key for events
- `TICKETMASTER_API_KEY`: Ticketmaster API key for events
- `SNAP_CLIENT_ID`: Snapchat Client ID for lens integration
- `SNAP_CLIENT_SECRET`: Snapchat Client Secret
- `NEXT_PUBLIC_APP_URL`: Public URL of the application
- `NEXT_PUBLIC_MAP_STYLE`: URL to the map style JSON
- `VALHALLA_API_URL`: Valhalla routing engine API URL
