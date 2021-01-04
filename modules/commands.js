var a_pCommands = [];
function AddCommand(szName, szCommand, fnCallback){
    a_pCommands.push({
        szName: szName,
        szCommand: szCommand,
        fnCallback: fnCallback
    });
}

function AutoDelete(pMessage){
    pMessage.react("5️⃣");
    setTimeout(function(){
        pMessage.react("4️⃣");
        setTimeout(function(){
            pMessage.react("3️⃣");
            setTimeout(function(){
                pMessage.react("2️⃣");
                setTimeout(function(){
                    pMessage.react("1️⃣");
                    setTimeout(function(){
                        pMessage.delete();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}


//* --- Help Command ---
AddCommand("Help", "help", function(pMessage, a_szArgs){
    if(a_szArgs.length > 0){
        if(a_szArgs[0].toLowerCase() == "me"){
            pMessage.reply("kys dipshit");
        }else if(a_szArgs[0].toLowerCase() == "us"){
            pMessage.reply("I can't help you retards");
        }
    }else{
        pMessage.reply("LOL");
    }
});

//* --- Test Command ---
AddCommand("Test", "test", function(pMessage, a_szArgs){
    pMessage.reply("whats good bitch");
});

//* --- Get UID Command ---
AddCommand("uid", "uid", function(pMessage, a_szArgs){

    if(pMessage.mentions.users.array().length > 0){
        pMessage.mentions.users.array().forEach(function(pUser){
            pMessage.channel.send(pUser.username + "'s UID: " + pUser.id);
        })
    }else{
        pMessage.channel.send("Your UID: " + pMessage.author.id);
    }
});

//* --- Purge Command ---
AddCommand("Purge", "purge", function(pMessage, a_szArgs){
    var iCount = parseInt(a_szArgs[0]);
    
    // Check to make sure a number was entered
    if(isNaN(iCount))
        return pMessage.reply("? ? ? ? ? ? ?");

    // Make sure its above 0
    if(iCount <= 0)
        return pMessage.reply("the fuck you want me to do dipshit create messages?");

    // Purge messages
    pMessage.channel.bulkDelete(iCount + 1);

    pMessage.reply("Purged " + iCount + " messages.").then(function(pReplyMessage){
        AutoDelete(pReplyMessage);
    });
});



//* -----------------------
//* --- Command Handler ---
//* -----------------------
const commands = function(pMessage){
    a_szMessageSplit = pMessage.content.split(" ");

    // Make sure command keyword "alfred" is used
    if(a_szMessageSplit[0].toLowerCase() == "alfred" && pMessage.author.id == "159024143357050880"){
        // Get command called
        const szCommand = a_szMessageSplit[1].toLowerCase();

        // Get the list of arguments
        const a_szArguments = a_szMessageSplit.slice(2);

        // Search commands
        // If it exists call it
        a_pCommands.forEach(function(pCommand){
            if(pCommand.szCommand == szCommand){
                pCommand.fnCallback(pMessage, a_szArguments);
            }
        });
    }

    // Random other keywords
    if(pMessage.content.toLowerCase() == "hi alfred" ||
    pMessage.content.toLowerCase() == "hey alfred" ||
    pMessage.content.toLowerCase() == "hello alfred" ||
    pMessage.content.toLowerCase() == "goodmorning alfred" ||
    pMessage.content.toLowerCase() == "good morning alfred" ||
    pMessage.content.toLowerCase() == "goodnight alfred" ||
    pMessage.content.toLowerCase() == "good night alfred" ||
    pMessage.content.toLowerCase() == "goodafternoon alfred" ||
    pMessage.content.toLowerCase() == "good afternoon alfred"){
        pMessage.channel.send("sup bitch");
    }
}


// Module Exports
module.exports = commands;