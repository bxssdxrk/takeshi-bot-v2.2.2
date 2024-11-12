const { PREFIX } = require("../../config");
const { Hercai } = require("hercai");
const { WarningError } = require("../../errors/WarningError");
const { isVip, isGlobal } = require("../../middlewares/dxrkplusPermissions");
const herc = new Hercai();

module.exports = {
  name: "GPT",
  description: "Envie uma mensagem ao ChatGPT.",
  commands: ["gpt"],
  usage: `${PREFIX}gpt <descrição>`,
  handle: async ({
    args,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
    sendImageFromURL,
    userJid,
    remoteJid,
    sendReply,
  }) => {
    await sendWaitReact();
    
    const userIsVip = isVip(remoteJid, userJid);
    const userIsGlobal = isGlobal(remoteJid, userJid);
    
    if (!userIsVip && !userIsGlobal) {
      return sendErrorReply("Você deve ser membro dxrkplus™ para usar este comando.");
    }
    
    if (!args.length) {
      throw new WarningError(
        "Por favor, forneça uma mensagem."
      );
    }
    
    const response = await herc.question({
      content: `${args}`,
    });
    
    await sendSuccessReact();
    await sendReply(response.reply);
  },
};