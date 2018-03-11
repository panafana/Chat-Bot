const { FB, t } = require('fblib');
const fb = new FB(global.FB_PAGE_TOKEN, global.FB_APP_SECRET);

const { setContext } = require('../handlers/context');
const events = require('../data');


const menus = require('../messages/menus');

const DELAY = 500;

// Menu and Get Started
function getStarted (id, user) {
  setContext(id, {expecting: "nothing", step: "get_started"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `Γεια σου ${user.fullname}! 😁`
  });
}

function attachmentDefaultAnswer (id) {
  setContext(id, {expecting: "nothing", step: "attachment_sent"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `Προς το παρόν υποστηρίζω μόνο μηνύματα κειμένου.`
  });
}

function hodorDefault (id) {
  setContext(id, {expecting: "nothing", step: "hodor_default"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `Hodor?`
  });
}

function testDefault (id) {
  setContext(id, {expecting: "nothing", step: "test_default"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `tset`
  });
}
function helloBrother (id) {
  setContext(id, {expecting: "nothing", step: "hello_brother"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `Do you listen?`
  });
}

function pressButton (id,user) {
  setContext(id, {expecting: "nothing", step: "press_button"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `You pressed a button well done! Malaka ${user.first_name}!`
  });
}

function firstEvent (id) {
  setContext(id, {expecting: "nothing", step: "first_event"});
  return fb.fbMessageDelay(DELAY, id, {
    text: events[0].title
  });
}


function availableEvents (id) {
  let e = events.filter(e => e.applications);
  let final = "";
  for(let i=0;i<e.length;i++){
    final += e[i].title + " \n";  
  }

  setContext(id, {expecting: "nothing", step: "available_events"});
  return fb.fbMessageDelay(DELAY, id, {
    attachment: t.cardMessage(e.map(e => t.cardElement({
      title : e.title,
      subtitle: e.commitment,
      image_url: e.image_url
    })))
  });
}

function unavailableEvents (id) {
  let e = events.filter(e => !e.applications);
  let final = "";
  for(let i=0;i<e.length;i++){
    final += e[i].title + " \n";  
  }
  
  setContext(id, {expecting: "nothing", step: "available_events"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `Τα μη διαθεσιμα events ειναι: `+final
  });
}

function eventSearch (id,nlp) {

  if(nlp.entities.type){
    let e = events.filter(e => (e.type==nlp.entities.type[0].value && e.applications));
    console.log(e);
    setContext(id, {expecting: "nothing", step:"event_search",type:nlp.entities.type[0].value});
  return fb.fbMessageDelay(DELAY, id, {
    attachment: t.cardMessage(e.map(e => t.cardElement({
      title : e.title,
      subtitle: e.commitment,
      image_url: e.image_url
    })))
  });
  }else{
    setContext(id, {expecting: "nothing", step: "event_search"});
    return fb.fbMessageDelay(DELAY, id, {
      text: `Τί τύπο event θέλεις;`
    });
  }

  
}

function eventType (id) {
  setContext(id, {expecting: "event_search", step: "event_type"});
  return fb.fbMessageDelay(DELAY, id, {
    text: `Τί τύπο event θέλεις;`
  });
}

module.exports = {
  // Menu and Get Started
  getStarted,
  // Default Answers
  attachmentDefaultAnswer,
  hodorDefault,
  testDefault,
  helloBrother,
  pressButton,
  firstEvent,
  availableEvents,
  unavailableEvents,
  eventSearch,
  eventType
}
