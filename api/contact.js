export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const input = req.body || {};
  if (typeof input.name !== 'string' || !input.name.trim() || input.name.length > 120 ||
      typeof input.email !== 'string' || input.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) ||
      typeof input.message !== 'string' || !input.message.trim() || input.message.length > 5000 ||
      (input.interest != null && (typeof input.interest !== 'string' || input.interest.length > 200))) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid name, email, and message.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not set');
    return res.status(500).json({ ok: false, error: 'Email not configured' });
  }

  const body = req.body || {};
  const name = body.name || '';
  const email = body.email || '';
  const interest = body.interest || '';
  const message = body.message || '';
  const source = body.source || 'governupsolutions.com';

  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'GovernUp Solutions <noreply@covenanthq.app>',
        to: ['hello@governupsolutions.com'],
        reply_to: email || undefined,
        subject: `New GovernUp inquiry: ${name}`.trim(),
        text: `Source: ${source}\n\nName: ${name}\nEmail: ${email}\nInquiry Type: ${interest}\n\nMessage:\n${message}`,
        headers: {
          'X-Auto-Response-Suppress': 'All',
          'Auto-Submitted': 'auto-generated',
          Precedence: 'bulk',
        },
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('Resend error:', resp.status, errText);
      return res.status(502).json({ ok: false });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Contact handler error:', e);
    return res.status(500).json({ ok: false });
  }
}
