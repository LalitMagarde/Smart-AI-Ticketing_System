import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "ticketing-system",
    name: "SmartTicket AI",
    eventKey: process.env.INNGEST_EVENT_KEY,
});
