# TravelMate — AI-Powered Travel Itinerary Planner

**Tagline:** Every journey, thoughtfully planned.

TravelMate is a web application prototype that helps travelers generate day-by-day trip itineraries from a destination, traveler type, and trip duration. It uses a server-side AI request to produce structured suggestions for morning, afternoon, and evening activities with estimated costs.

## Technology stack in this export

- React and TypeScript
- TanStack Start and Vite
- Tailwind CSS
- OpenAI API (server-side itinerary generation)

> Note: This exported version does not include a FastAPI backend or Supabase integration. Do not describe those as implemented unless you add and test them separately.

## Run locally on macOS

1. Install Node.js **22.12 or newer**.
2. Extract the ZIP and open the `travelmate` folder in VS Code.
3. In the VS Code terminal, run:

   ```bash
   npm install
   ```

4. Create a local environment file by copying the example:

   ```bash
   cp .env.example .env
   ```

5. Open `.env` and add your own API key after `OPENAI_API_KEY=`. Keep this key private. API usage may incur charges; a ChatGPT subscription does not include API credits.
6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open the local URL printed in the terminal.

The interface may load without an API key, but AI itinerary generation requires a valid key. Never put the key in frontend code or commit the `.env` file.

## Useful project locations

- `src/routes/` — application pages and routes
- `src/components/SiteLayout.tsx` — shared navigation and page layout
- `src/styles.css` — global styling
- `src/lib/itinerary.functions.ts` — itinerary generation logic
- `src/assets/hero.jpg` — homepage image

## Checks

```bash
npm test
npm run lint
npm run build
```

## Current scope and limitations

Implemented in this export: destination, traveler type, trip duration, and AI-assisted itinerary generation.

Not implemented in this export: persistent trip saving, editing individual activities, collaborative planning, cost tracking, and a live booking/route-optimization integration. The contact form is a local demonstration and does not send or store messages.

## Deployment notes

This application uses server-side functionality. Deploy it to a host that supports its Node.js server runtime, configure `OPENAI_API_KEY` as a private environment variable, and verify generation after deployment. A static-only host will not run the server-side AI function. Consider rate limiting and usage controls before making the application public.

## Development and AI-assistance disclosure

This project was created with AI-assisted development tools and then exported for local use and further modification. The exported source has been organized for independent development; this documentation does not claim unaided authorship. Follow your institution's rules for disclosing AI assistance and third-party services. Review dependency licenses and retain required notices when redistributing the project.
