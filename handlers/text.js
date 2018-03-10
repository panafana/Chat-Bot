

const m = require('../messages/msgTemplates');

function textHandler (message, id, nlp, user) {
    const msg = message.text;
    console.log(msg);
    switch (msg.toUpperCase()) {
        case "HODOR": return m.hodorDefault(id);
        case "TEST": return m.testDefault(id);
        case "HELLO BROTHER": return m.helloBrother(id);
        default: return nlpHandler(id,nlp,user);
    }
}

function nlpHandler(id , nlp,user){
    return new Promise((resolve,reject) =>{
        if(nlp.entities.intent){
            resolve(intentHandler(id,user,nlp));
        }
    } )
}

function intentHandler(id,user,nlp){
    switch(nlp.entities.intent[0].value){
        case "greeting":return m.getStarted(id,user);
        default: throw new Error("Unknown intent");
    }
}
module.exports = {
    textHandler
};
