const emotes = require ("../config/emojis.json");
const Discord = require("discord.js")

exports.run = async (client, message, args) => {

    //If the member is not in a voice channel
    if(!message.member.voice.channel) return message.channel.send(`**Você não está em um canal de voz** ${emotes.error}`);

    //If no music is provided
    if (!args[0]) return message.channel.send(`**Por favor insira uma música** ${emotes.error}`);

    const aTrackIsAlreadyPlaying = client.player.isPlaying(message.guild.id);

        // If there's already a track playing 
        if(aTrackIsAlreadyPlaying){

            // Add the track to the queue
            const result = await client.player.addToQueue(message.guild.id, args[0]);
            if(!result) return message.channel.send(`Este provedor de músicas não é suportado ...`);

            if(result.type === 'playlist'){
                message.channel.send(`${result.tracks.length} **músicas adicionadas à fila** ${emotes.music}`);
            } else {
                message.channel.send(`${result.name} *adicionado à fila* ${emotes.music}`);
            }

        } else {

            // Else, play the song
            const result = await client.player.play(message.member.voice.channel, args.join(" ")).catch(() => {});
            if(!result) return message.channel.send(`**Este provedor de músicas não é suportado ...**`);

            if(result.type === 'playlist'){
                message.channel.send(`${result.tracks.length} músicas adicionadas à fila ${emotes.music}\nAtualmente tocando ${result.tracks[0].name} !`);
            } else {
                
                message.channel.send(`__*Tocando agora*__ ${result.name} ${emotes.music}`);
            }

            const queue = client.player.getQueue(message.guild.id)

            //Events
            .on('end', () => {
                message.channel.send(`**Não há mais música na fila** ${emotes.error}`);
            })
            .on('trackChanged', (oldTrack, newTrack) => {
                message.channel.send(`**Tocando agora** ${newTrack.name} ... ${emotes.music}`);
            })
            .on('channelEmpty', () => {
                message.channel.send(`**Parando de tocar, não há mais membro no canal de voz** ${emotes.error}`);
            });
        }
    }
