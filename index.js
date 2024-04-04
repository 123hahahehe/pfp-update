const { Client, Intents } = require('discord.js');
require('dotenv').config();

const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]
});

client.once('ready', () => {
    console.log('Bot is online!');
    const guildId = '1224150177678622793'; // Guild ID
    const guild = client.guilds.cache.get(guildId);
    if (guild) {
        const guildIcon = guild.iconURL({ format: 'png', dynamic: true, size: 2048 });
        if (guildIcon) {
            client.user.setAvatar(guildIcon)
                .then(() => console.log('Bot profile picture updated successfully!'))
                .catch(error => console.error('Error updating bot profile picture:', error));
        } else {
            console.error('Guild icon URL not available.');
        }
    } else {
        console.error('Guild not found.');
    }
});

client.login(process.env.BOT_TOKEN);