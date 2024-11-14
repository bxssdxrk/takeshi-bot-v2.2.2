const { PREFIX } = require("../../config");
const { Hercai } = require("hercai");
const { WarningError } = require("../../errors/WarningError");

module.exports = {
  name: "GPT4",
  description: "Envie uma mensagem ao GPT-4.",
  commands: ["gpt4"],
  usage: `${PREFIX}gpt4 <mensagem>`,
  handle: async ({
    fullArgs,
    sendWaitReact,
    sendSuccessReply,
  }) => {
    
    await sendWaitReact();
    
    const herc = new Hercai();
    
    if (!fullArgs.length) {
      throw new WarningError(
        "Por favor, forneça uma mensagem."
      );
    }
    
    const response = await herc.question({
      content: `${fullArgs}`,
    });
    
    await sendSuccessReply(response.reply);
    
  },
};
