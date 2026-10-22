import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

type Input = { location: string; travelers: "solo" | "couple" | "group"; days: number };

export const generateItinerary = createServerFn({ method: "POST" })
  .inputValidator((d: Input) => {
    const location = String(d.location ?? "").trim().slice(0, 100);
    if (!location) throw new Error("Please enter a destination.");
    if (!["solo", "couple", "group"].includes(d.travelers)) throw new Error("Invalid traveler type.");
    const days = Math.min(7, Math.max(1, Math.round(Number(d.days) || 3)));
    return { location, travelers: d.travelers, days };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env["OPENAI_API_KEY"];
    if (!apiKey) return { error: "Set OPENAI_API_KEY on the server to generate itineraries." };
    const provider = createOpenAI({
      apiKey,
    });
    const who = { solo: "a solo traveler", couple: "a couple", group: "a small group of friends" }[data.travelers];
    try {
      const result = streamText({
        model: provider.responses(process.env["OPENAI_MODEL"] || "gpt-4.1-mini"),
        system:
          "You are an expert travel planner. Write in Markdown. Start with a one-line intro. Then for each day use a heading '## Day N — theme'. Within each day, use separate subheadings '### Morning', '### Afternoon', and '### Evening'. Under EACH subheading, give 2–3 short, separate bullet points for the important activities, dining, or transport. Never write a paragraph or combine the whole time period into one long bullet. Every bullet must follow this format: '- **Activity or place** — one short practical detail. **Estimated cost: LOCAL_CURRENCY amount or range per person**'. Use specific real places, include dining suggestions and short transport tips, and show 'Estimated cost: Free' for genuinely free activities. Use the destination's local currency with an unambiguous currency code; explicitly identify costs charged per vehicle or per group instead of per person when appropriate. Costs are approximate, not live prices; add one brief note that estimates vary and should be checked before booking. End with '## Where to stay' and '## Tips'. Be concise and practical. Do not include a top-level title.",
        prompt: `Plan a ${data.days}-day trip to ${data.location} for ${who}. Tailor the pace and suggestions to this type of traveler.`,
        providerOptions: {
          openai: {
            store: false,
          },
        },
      });
      const text = await result.text;
      if (!text.trim()) return { error: "Couldn't create a plan for that request." };
      return { text };
    } catch (e: unknown) {
      console.error(e);
      const status = (e as { statusCode?: number })?.statusCode;
      if (status === 429) return { error: "Too many requests right now. Please try again in a minute." };
      if (status === 402) return { error: "The AI service billing limit was reached. Check your provider billing settings." };
      return { error: "Something went wrong generating your plan. Please try again." };
    }
  });
