const { Client, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

async function updateBotAvatar() {
    const guildId = '1224150177678622793'; // Guild ID
    const guild = client.guilds.cache.get(guildId);
    if (guild) {
        const guildIcon = guild.iconURL({ format: 'png', dynamic: true, size: 2048 });
        if (guildIcon) {
            try {
                await client.user.setAvatar(guildIcon);
                console.log('Bot profile picture updated successfully!');
            } catch (error) {
                console.error('Error updating bot profile picture:', error);
            }
        } else {
            console.error('Guild icon URL not available.');
        }
    } else {
        console.error('Guild not found.');
    }
}

client.once('ready', () => {
    console.log('Bot is online!');
    updateBotAvatar(); // Initial update
    setInterval(updateBotAvatar, 60000); // Check for updates every minute
});

client.login(process.env.BOT_TOKEN);
