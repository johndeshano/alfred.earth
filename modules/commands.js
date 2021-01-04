const a_szRandomMessage = [
    "Fuck off idiot",
    "Don't care",
    "LOL",
    "Eat shit fuck face",
    "Do you make eye-contact when you're fucking your dad in the ass?",
    "CRY HERE ---> \\__/ <--- Africans need water.",
    "You sound like your parents beat each other in front of you.",
    "Don't be a loser, buy a rope and hang yourself.",
    "My dad can beat your dad in a kissing contest",
    "You're impossible to underestimate",
    "You're not the dumbest person on the planet, but you better hope he doesn't die",
    "Fuck you mayonaise monkey",
    "If your father stayed he would be dissapointed",
    "Such a shame your mother didn't swallow you",
    "The best part of you ran down your mom's leg",
    "If you where any stupider we'd have to water you",
    "I envy people who have never met you",
    "kys",
    "You're the reason I'm pro choice",
    "I bet your parents change the subject when their friends ask about you.",
    "I'm genuinely excited to never talk to you again",
    "I find the fact that you lived this long both surprising and disappointing",
    "If I throw a stick, will you leave?",
    "If you're here, who's home disappointing your parents?",
    "You are the reason why shampoo has instructions",
    "If you were any more inbred you would be a sandwich.",
    "I hope you realize everyone's just putting up with you",
    "The only person who is willing to fuck you is too lazy to jack off",
    "You must have to sneak up on your hand to masturbate",
    "I can understand why your parents abused you",
    "You're about as useful as Anne Frank's drum kit",
    "Filthy casual.",
    "This is why everyone talks behind your back",
    "I'm not mad, I'm just disappointed",
    "You aren't worth the amount of money it would have cost to abort you",
    "Have you ever considered suing your mother for drinking while she was pregnant with you?",
    "I wish you were retarded, because then you'd at least have an excuse",
    "If you want a comeback go look in your moms mouth",
    "Save your breath, you'll need to to blow up your girlfriend later",
    "With a face like yours, I’d be careful who and what I make fun of",
    "Who's this clown?",
    "You are weapons grade stupid",
    "You're the kind of jew that makes me wish the Holocaust actually happened",
]

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
        return pMessage.reply("fucking idiot type it right");

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
    // Reply an insult if he is DMEd
    if(pMessage.guild == undefined && (pMessage.author.id != 795139163309473812 || pMessage.author.id != 362274445253148693)){
        pMessage.channel.send(a_szRandomMessage[Math.floor(Math.random() * a_szRandomMessage.length)]);
    }

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

    if(pMessage.content.toLowerCase() == "bye alfred" ||
    pMessage.content.toLowerCase() == "good bye alfred" ||
    pMessage.content.toLowerCase() == "goodbye alfred" ||
    pMessage.content.toLowerCase() == "fuck off alfred"){
        pMessage.reply(a_szRandomMessage[Math.floor(Math.random() * a_szRandomMessage.length)])
    }
}


// Module Exports
module.exports = commands;