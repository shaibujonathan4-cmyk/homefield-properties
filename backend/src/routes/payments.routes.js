import { Router } from 'express';

const router = Router();

// GET /api/payments/verify/:reference
// Confirms with Paystack's servers that a payment actually succeeded,
// rather than trusting the browser's word for it.
router.get('/verify/:reference', async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const data = await response.json();

    if (data.data?.status === 'success') {
      res.json({ verified: true, amount: data.data.amount, email: data.data.customer.email });
    } else {
      res.json({ verified: false });
    }
  } catch (err) {
    console.error('Paystack verification error:', err.message);
    res.status(500).json({ verified: false, error: 'Verification failed' });
  }
});

export default router;