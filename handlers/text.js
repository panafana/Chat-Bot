

const m = require('../messages/msgTemplates');

function textHandler (message, id, nlp, user) {
    const msg = message.text;
    console.log(msg);
    switch (msg.toUpperCase()) {
        case "HODOR": return m.hodorDefault(id);
        case "TEST": return m.testDefault(id);
        case "HELLO BROTHER": return m.helloBrother(id);
        case "FIRST EVENT": return m.firstEvent(id);
        default: return nlpHandler(id,nlp,user);
    }
}

function nlpHandler(id , nlp,user){
    return new Promise((resolve,reject) =>{
        if(nlp.entities.intent){
            resolve(intentHandler(id,user,nlp));
        }
    } );
}

function intentHandler(id,user,nlp){
    switch(nlp.entities.intent[0].value){
        case "greeting":return m.getStarted(id,user);
        case "events_open": return m.availableEvents(id);
        case "events_closed": return m.unavailableEvents(id);
        case "event_search": return m.eventSearch(id,nlp);

        default: throw new Error("Unknown intent "+nlp.entities.intent[0].value);
    }
}


module.exports = {
    textHandler
};
