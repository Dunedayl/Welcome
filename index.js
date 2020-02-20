const {
    Client,
    Attachment
} = require('discord.js');

// const {
//     PREFIX,
//     token,
// } = require('./config copy.json');

const bot = new Client();
const ytdl = require("ytdl-core");

const userid = '371670423999610880'; // ID SANI 
const VoiceChannelID = '622095079007584271'; // MAIN VOICE SERVER ID 
const ServerID = '622095079007584267' // MAIN Server ID 

//const userid = '261614952115077123'; // MY ID 
//const VoiceChannelID = '667010725255970849'; // test server VOICE SERVER ID 
//const ServerID = '667010724685414410' // test server ID 

var servers = {};

bot.on('voiceStateUpdate', async (oldMember, newMember) => {

    console.log(newMember.guild.channels.get('667010725255970849'));

    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    if (oldUserChannel === undefined && newUserChannel !== undefined) {

        if (newMember.user.id == userid && newMember.voiceChannelID == VoiceChannelID) {

            if (true) servers[ServerID] = {
                queue: []
            }

            var server = servers[ServerID]

            server.queue.push('https://www.youtube.com/watch?v=MEmSNkd0TX0');

            if (true) newMember.guild.channels.get(VoiceChannelID).join().then(function (connection) {
                play(connection, ServerID);
            })
        }

    } else if (newUserChannel === undefined) { }

    function play(connection, ServerID) {

        var server = servers[ServerID];

        server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter: 'audioonly' }));

        server.queue.shift();

        server.dispatcher.on("end", function () {
            if (server.queue[0]) {
                play(connection, ServerID);
            } else {
                connection.disconnect();
            }
        });
    }
});

bot.login(token);
