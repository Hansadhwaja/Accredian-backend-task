// server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendReferralEmail } = require('./sendEmail'); // Adjust the path as needed
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Endpoint to handle saving referral data
app.post('/api/referral', async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, course } = req.body;

    // Validate input (optional)
    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail || !course) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Save referral to database using Prisma
    const savedReferral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        course,
      },
    });

    // Send referral email
    await sendReferralEmail({ referrerName, referrerEmail, refereeName, refereeEmail, course });

    res.status(201).json(savedReferral);
  } catch (error) {
    console.error('Error saving referral:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
