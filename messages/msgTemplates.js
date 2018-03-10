const { FB, t } = require('fblib');
const fb = new FB(global.FB_PAGE_TOKEN, global.FB_APP_SECRET);

const { setContext } = require('../handlers/context');

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

module.exports = {
  // Menu and Get Started
  getStarted,
  // Default Answers
  attachmentDefaultAnswer,
  hodorDefault,
  testDefault,
  helloBrother,
  pressButton
}
