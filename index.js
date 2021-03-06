// To make bot go online do nodemon index.js
const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});



    bot.on("Ready", async () => {
        console.log(`${bot.user.username} is online!`);``

});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);


    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);  

    if(cmd === `${prefix}kick`){

        //!kick @daeshan askin for it
    
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
        if(kUser.hasPermission("MANAGE_MEMBERS")) return message.channel.send("That person can't be kicked!");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Tiime", message.createdAt)
        .addField("Reason", kReason);
    
        let kickChannel = message.guild.channels.find(`name`, "incidents");
        if(!kickChannel) return message.channel.send("Can't find incidents channel.");
    
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
    
        return;
      }

      if(cmd === `${prefix}ban`){

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
    
        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#bc0000")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
    
        let incidentchannel = message.guild.channels.find(`name`, "incidents");
        if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
    
        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(banEmbed);
    
    
        return;
      }
    



    if(cmd === `${prefix}report`){

        //report @user this is the reason

        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user.");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new Discord.RichEmbed()
        .setTitle("Reports")
        .setColor("#77f442")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);



        message.delete().catch(O_o=>{});

        message.channel.send(reportEmbed);
        return;
    }
    
    
    if(cmd === `${prefix}serverinfo`){

        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setTitle("Server Information")
        .setColor("#77f442")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount);

        return message.channel.send(serverembed);
    }

    
    if(cmd === `${prefix}help`){

        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setTitle("Bot Commands")
        .setColor("#77f442")
        .setThumbnail(bicon)
        .addField("?help", "Shows this message", true)
        .addField("?serverinfo", "Shows the server info", true)
        .addField("?report", "Reports the specified user", true)
        .addField("?kick", "Requires a #incidents channel! Kicks the specified user", true)
        .addField("?ban", "Requires a #incidents channel! Kicks the specified user", true)
        .addField("?tempmute", "Temp mutes the specified user!", true);

        return message.channel.send(botembed);

    }

})

bot.login(botconfig.token);
