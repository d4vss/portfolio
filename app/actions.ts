"use server";

import { contactFormSchema } from "@/lib/zod";

const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const secret = process.env.NEXT_PRIVATE_TURNSTILE_SECRET_KEY;
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

if (!secret) {
  throw new Error("Turnstile secret key is missing!");
}

if (!discordWebhookUrl) {
  throw new Error("Discord webhook URL is missing!");
}

interface ContactForm {
  email: string | null;
  message: string | null;
  token: string | null;
}

export async function submitContactForm(
  prevState: number | null | undefined,
  formData: FormData
): Promise<number> {
  const form: ContactForm = {
    email: formData.get("email") as string | null,
    message: formData.get("message") as string | null,
    token: formData.get("cf-turnstile-response") as string | null,
  };

  if (!form.token || typeof form.token !== "string") {
    return 400;
  }

  const validation = await contactFormSchema.safeParseAsync(form);
  if (!validation.success) {
    return 400;
  }

  const res = await fetch(verifyEndpoint, {
    method: "POST",
    body: new URLSearchParams({
      secret: secret as string,
      response: form.token,
    }).toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    return 500;
  }

  const data = await res.json();
  if (!data.success) {
    return 400;
  }

  const discordPayload = {
    content: null,
    embeds: [
      {
        title: "New Contact Form Submission",
        color: 7506394,
        fields: [
          { name: "Email", value: form.email || "N/A", inline: true },
          { name: "Message", value: form.message || "No message provided.", inline: false },
          { name: "Time", value: new Date().toISOString(), inline: true },
        ],
      },
    ],
  };

  const discordResponse = await fetch(discordWebhookUrl as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discordPayload),
  });

  if (!discordResponse.ok) {
    console.error("Failed to send Discord webhook message:", await discordResponse.text());
    return 500;
  }

  return 200;
}
