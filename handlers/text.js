const m = require('../messages/msgTemplates');

function textHandler (message, id, nlp, user) {
    const msg = message.text;
    console.log(msg);
    switch (msg.toUpperCase()) {
        case "HODOR": return m.hodorDefault(id);
        case "TEST": return m.testDefault(id);
        case "HELLO BROTHER": return m.helloBrother(id);
        default: throw new Error("Unrecognized text Message ");
    }
}

module.exports = {
    textHandler
};
