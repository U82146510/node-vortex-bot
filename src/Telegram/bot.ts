import { Api, Bot, Context,InlineKeyboard } from "grammy";
import dotnev from 'dotenv';
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotnev.config({
    path:path.resolve(__dirname,'../../.env')
});

const token:string|undefined = process.env.bot_token;

if(!token){
    throw new Error('missing bot token');
};

export const bot:Bot<Context, Api> = new Bot(token);

bot.command('start',(ctx)=>{
    ctx.reply(`🌟 Welcome to VORTEX!

🔥 Where Things Happen! 🔥

Available Features:
• Launch pump.fun tokens
• Create or import multiple wallets
• Auto-fund wallets via SOL disperser
• Bundle up to 24 wallets
• CTO pump.fun/raydium tokens
• Delayed bundle on pump.fun
• Advanced swap manager with intervals, sell all functions.
• Anti-MEV protection

Use /home to access all features
Use /settings for configuration`)
});

bot.command("home", (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("📁 Your Projects", "your_projects")
    .text("🚀 Create New Project", "create_project")
    .row()
    .text("🚀 SPAM LAUNCH", "spam_launch")
    .row()
    .text("🤑 BUMP BOT 🤑", "bump_bot")
    .row()
    .text("🔗 Referrals", "referrals")
    .url("❓ Help", "deployonvortex.gitbook.io/vortex")
    .row()
    .url("👥 Discord", "https://discord.gg/vortexdeployer");

  ctx.reply(
    `Yo, @${ctx.from?.username || "anon"}! Great to see you back! 🔥

What's the move, boss? Wanna mint some fresh heat or clip profits from your existing bag? 💸

Hit the buttons below and let's make it happen:`,
    {
      reply_markup: keyboard,
    }
  );
});

bot.callbackQuery("your_projects", (ctx) => ctx.answerCallbackQuery("Showing your projects..."));
bot.callbackQuery("create_project", (ctx) => ctx.answerCallbackQuery("Creating new project..."));
bot.callbackQuery("spam_launch", (ctx) => ctx.answerCallbackQuery("Launching SPAM..."));
bot.callbackQuery("bump_bot", (ctx) => ctx.answerCallbackQuery("Bumping..."));
bot.callbackQuery("referrals", async (ctx) => {
  const referralKeyboard = new InlineKeyboard()
    .text("🎯 Create Reff", "create_referral").row()
    .text("🔙 Back to Menu", "back_to_home");

  await ctx.editMessageText(
    `🤝 *Your Referral Program*

You don't have a referral link yet.
Click the button below to create one!

Share your link to grow the community!`,
    {
      reply_markup: referralKeyboard,
      parse_mode: "Markdown",
    }
  );
});
bot.callbackQuery("help", (ctx) => ctx.answerCallbackQuery("Here's some help!"));
