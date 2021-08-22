//Basic requirements
const Amdi = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const axios = require('axios');

// Config Checker
const read = require('../config');

// Strings
const Language = require('../language');
const Lang = Language.getString('tiktok');

if (read.WORKTYPE == 'private') {

  Amdi.applyCMD({ pattern: 'tiktok ?(.*)', fromMe: true, dontAddCommandList: true}, async (message, match) => {

        const userName = match[1]

        if (!userName) return await message.client.sendMessage(message.jid, Tlang.NEED, MessageType.text)

        await message.client.sendMessage(message.jid, Tlang.DOWN, MessageType.text)

        await axios
          .get(`https://api.xteam.xyz/dl/tiktok?url=${userName}&APIKEY=5bd33b276d41d6b4`)
          .then(async (response) => {
            const {
              server_1,
            } = response.data

            const profileBuffer = await axios.get(server_1, {
              responseType: 'arraybuffer',
            })

            await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {
              caption: '❰🍁🔱  T Rex BOT  🔱🍁❱',
            })
          })
          .catch(
            async (err) => await message.client.sendMessage(message.jid, Tlang.NOT + userName, MessageType.text),
          )
      },
    )
}

else if (read.WORKTYPE == 'public') {

  Amdi.applyCMD({ pattern: 'tiktok ?(.*)', fromMe: false, desc: Lang.TIKTOK_DESC}, (async (message, match) => {
    
    const tkurl = match[1]
   
     if (!tkurl) return await message.client.sendMessage(message.jid,Lang.NEED_WORD);
   
       await axios
         .get(`https://api.lolhuman.xyz/api/tiktokwm?apikey=d3be4b65ca9dab633c773d66&url=${tkurl}`)
         .then(async (response) => {
             const {
               result,
               status,
             } = response.data
   
             await message.client.sendMessage(message.jid,Lang.DLOAD_TK,MessageType.text, {quoted: message.data});
             const profileBuffer = await axios.get(result, {responseType: 'arraybuffer'})
   
             const msg = `${status}`
   
       if (msg === '500') { await message.client.sendMessage(message.jid,Lang.INVALID_TK,MessageType.text, {quoted: message.data})}
             
       if (msg === '200') { 
         await message.client.sendMessage(message.jid,Lang.UPLOADING_TK,MessageType.text, {quoted: message.data});
         await message.sendMessage(Buffer.from(profileBuffer.data), MessageType.video, {caption: "Copyright © 2021 | Queen Amdi"})
         }})
         .catch(
          async (err) => await message.client.sendMessage(message.jid,Lang.NO_RESULT,MessageType.text, {quoted: message.data}),
        )
 }))
}
