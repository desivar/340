// Needed Resources
const express = require("express");
const router = new express.Router();
const messageController = require("../controllers/messageController");
const { handleErrors } = require("../utilities");
const validate = require("../utilities/message-validation");
const Util = require('../utilities'); // Import your utilities

// INDEX
// Route to build inbox/inbox view
router.get("/", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await messageController.buildInbox(req, res, nav);
}));

// ARCHIVED MESSAGES
// Route to build inbox/archivedmessages view
router.get("/archivedmessages", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await messageController.buildArchivedMessages(req, res, nav);
}));

// SEND
// Route to build inbox/sendmessage view
router.get("/send", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await messageController.buildSendMessage(req, res, nav);
}));

// Route to build inbox/sendmessage view
router.post(
  "/send",
  validate.messageRules(),
  validate.checkMessageData,
  handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await messageController.sendMessage(req, res, nav);
  })
);

// VIEW
// Route to build inbox/viewmessage view
router.get("/view/:message_id", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await messageController.buildViewMessage(req, res, nav);
}));

// REPLY
// Route to build account reply message view
router.get("/reply/:message_id", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await messageController.buildReplyMessage(req, res, nav);
}));

// Route to build account reply message view
router.post(
  "/reply",
  validate.replyRules(),
  validate.checkReplyData,
  handleErrors(async (req, res) => {
    const nav = await Util.getNav(req, res);
    await messageController.replyMessage(req, res, nav);
  })
);

// READ
// Route to set message_read = true
router.get("/read/:message_id", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await messageController.readMessage(req, res, nav);
}));

// ARCHIVE
// Route to set message_archived = true
router.get("/archive/:message_id", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await messageController.archiveMessage(req, res, nav);
}));

// DELETE
// Route to delete a message
router.get("/delete/:message_id", handleErrors(async (req, res) => {
  const nav = await Util.getNav(req, res);
  await messageController.deleteMessage(req, res, nav);
}));

module.exports = router;