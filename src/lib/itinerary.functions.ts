import { createServerFn } from "@tanstack/react-start";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

type Input = {
  location: string;
  travelers: "solo" | "couple" | "group";
  days: number;
};

export const generateItinerary = createServerFn({ method: "POST" })
  .inputValidator((d: Input) => {
    const location = String(d.location ?? "").trim().slice(0, 100);

    if (!location) {
      throw new Error("Please enter a destination.");
    }

    if (!["solo", "couple", "group"].includes(d.travelers)) {
      throw new Error("Invalid traveler type.");
    }

    const days = Math.min(7, Math.max(1, Math.round(Number(d.days) || 3)));

    return { location, travelers: d.travelers, days };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env["GEMINI_API_KEY"];

    if (!apiKey) {
      return {
        error: "Gemini API key is missing. Set GEMINI_API_KEY in the server environment.",
      };
    }

    const google = createGoogleGenerativeAI({ apiKey });

    const who = {
      solo: "a solo traveler",
      couple: "a couple",
      group: "a small group of friends",
    }[data.travelers];

    try {
      const result = streamText({
        model: google("gemini-3-flash-preview"),
        system:
          "You are an expert travel planner. Write in Markdown. Start with a one-line intro. Then for each day use a heading '## Day N — theme'. Within each day, use separate subheadings '### Morning', '### Afternoon', and '### Evening'. Under EACH subheading, give 2–3 short, separate bullet points for the important activities, dining, or transport. Never write a paragraph or combine the whole time period into one long bullet. Every bullet must follow this format: '- **Activity or place** — one short practical detail. **Estimated cost: LOCAL_CURRENCY amount or range per person**'. Use specific real places, include dining suggestions and short transport tips, and show 'Estimated cost: Free' for genuinely free activities. Use the destination's local currency with an unambiguous currency code; explicitly identify costs charged per vehicle or per group instead of per person when appropriate. Costs are approximate, not live prices; add one brief note that estimates vary and should be checked before booking. End with '## Where to stay' and '## Tips'. Be concise and practical. Do not include a top-level title.",
        prompt: `Plan a ${data.days}-day trip to ${data.location} for ${who}. Tailor the pace and suggestions to this type of traveler.`,
      });

      const text = await result.text;

      if (!text.trim()) {
        return { error: "Couldn't create a plan for that request." };
      }

      return { text };
    } catch (e: unknown) {
      console.error("Gemini itinerary generation failed:", e);

      const error = e as {
        statusCode?: number;
        status?: number;
      };

      const status = error.statusCode ?? error.status;

      if (status === 429) {
        return {
          error: "Gemini's request limit was reached. Please wait and try again.",
        };
      }

      if (status === 401 || status === 403) {
        return {
          error: "Gemini API key was rejected. Check GEMINI_API_KEY in Vercel.",
        };
      }

      return {
        error: "Something went wrong generating your plan. Please try again.",
      };
    }
  });
