// This function receives data from Wix
// and sends an email using Resend.
// It runs securely on Vercel (not on your Wix site).

import { Resend } from "resend";

// Create a Resend client using the API key
// (the key will be stored securely in Vercel later)
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Extract fields sent from Wix
  const { name, email, message } = req.body;

  // Basic validation
  if (!email || !message) {
    return res.status(400).json({
      error: "Missing required fields (email or message)"
    });
  }

  try {
    // Send the email via Resend
    await resend.emails.send({
      from: "SPC <noreply@spc-cpf.com>",
      to: ["well-being@spc-cpf.com"], // <-- change if needed
      subject: "New form submission from Well-being Self-Assessment",
      html: `
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    // Respond back to Wix with success
    return res.status(200).json({ success: true });

  } catch (error) {
    console

