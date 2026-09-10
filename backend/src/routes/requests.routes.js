import { Router } from 'express';
import sgMail from '@sendgrid/mail';

const router = Router();

// POST /api/requests - visitor submits a desired property request.
// Sends them a confirmation email if their contact field looks like an email.
router.post('/', async (req, res) => {
  const { name, contact, budget, area, details } = req.body;

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact || '');

  if (isEmail) {
    try {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      await sgMail.send({
        to: contact,
        from: process.env.SENDER_EMAIL,
        subject: 'We got your property request — Homefield',
        text: `Hi ${name || 'there'},\n\nWe've received your property request:\n\nBudget: ${budget}\nArea: ${area}\nDetails: ${details}\n\nWe'll be in touch if there's a match, or if we have questions.\n\n— Homefield`,
        html: `
          <p>Hi ${name || 'there'},</p>
          <p>We've received your property request:</p>
          <ul>
            <li><strong>Budget:</strong> ${budget}</li>
            <li><strong>Area:</strong> ${area}</li>
            <li><strong>Details:</strong> ${details}</li>
          </ul>
          <p>We'll be in touch if there's a match, or if we have questions.</p>
          <p>— Homefield</p>
        `,
      });
    } catch (err) {
      console.error('SendGrid error:', err.response?.body || err.message);
    }
  }

  res.json({ message: 'Request received', emailSent: isEmail });
});

export default router;