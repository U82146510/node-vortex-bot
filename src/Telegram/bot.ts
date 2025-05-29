import { Api, Bot, Context, InlineKeyboard } from "grammy";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import {getSpamLaunchMenu,userMetadataState,registerMetadataFieldHandlers} from './menu/spamLaunch.ts';
import {getMainMenuKeyboard} from './menu/mainMenu.ts';
import {referralKeyboard} from './menu/referalls.ts';
import {fileUploadService} from './menu/uploadImage.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

const token: string | undefined = process.env.bot_token;

if (!token) {
  throw new Error("missing bot token");
}

export const bot: Bot<Context, Api> = new Bot(token);

registerMetadataFieldHandlers(bot);
fileUploadService(bot);

// /start command
bot.command("start", (ctx) => {
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
Use /settings for configuration`);
});

// /home command
bot.command("home", (ctx) => {
  ctx.reply(
    `Yo, @${ctx.from?.username || "anon"}! Great to see you back! 🔥

What's the move, boss? Wanna mint some fresh heat or clip profits from your existing bag? 💸

Hit the buttons below and let's make it happen:`,
    {
      reply_markup: getMainMenuKeyboard(),
    }
  );
});

// Individual button handlers
bot.callbackQuery("your_projects", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Showing your projects...");
});

bot.callbackQuery("create_project", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Creating new project...");
});


//-------------------------------------------------------------

bot.callbackQuery("spam_launch", async (ctx) => {
  await ctx.answerCallbackQuery();
  const userId = ctx.from!.id;
  const values = userMetadataState.get(userId)?.values || {};


  await ctx.reply(`
🎯 Project 522344314 Metadata

Select a field to edit:

❌ Metadata not yet deployed`,{
    reply_markup:getSpamLaunchMenu(values),
  });
});

//------------------------------------------------------------

bot.callbackQuery("bump_bot", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(`
  🤖 Welcome to the Bump Bot!

This bot will help you create and manage bump operations for your tokens.

First, let's set up your bump project. Please provide the token address you want to bump:`);
});

bot.callbackQuery("help", async (ctx) => {
  await ctx.answerCallbackQuery("Here's some help!");
});


// Referrals submenu
bot.callbackQuery("referrals", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(
    `🤝 *Your Referral Program*

You don't have a referral link yet.
Click the button below to create one!

Share your link to grow the community!`,
    {
      reply_markup: referralKeyboard(),
      parse_mode: "Markdown",
    }
  );
});


// Create Referral logic
bot.callbackQuery("create_referral", async (ctx) => {
  await ctx.answerCallbackQuery("Referral link created! 🎉");
  await ctx.reply(`
    🎯 Create Your Custom Referral

Please enter your desired referral code.

Requirements:
• Only letters and numbers
• 4-15 characters long
• No spaces or special characters`);
});


// Back to Menu handler
bot.callbackQuery("back_to_home", async (ctx) => {
  await ctx.answerCallbackQuery();

  await ctx.editMessageText(
    `Yo, @${ctx.from?.username || "anon"}! Great to see you back! 🔥

What's the move, boss? Wanna mint some fresh heat or clip profits from your existing bag? 💸

Hit the buttons below and let's make it happen:`,
    {
      reply_markup: getMainMenuKeyboard(),
    }
  );
});


bot.on("message:text", async (ctx) => {
  const userId = ctx.from!.id;
  const state = userMetadataState.get(userId);
  if (!state || !state.currentField) return;

  const value = ctx.message.text;
  const updatedValues = { ...state.values, [state.currentField]: value };

  userMetadataState.set(userId, {
    currentField: undefined,
    values: updatedValues,
  });

  await ctx.reply(`✅ *${state.currentField.toUpperCase()}* updated to: *${value}*`, {
    parse_mode: "Markdown",
  });

  await ctx.reply("📄 Updated Metadata Menu:", {
    reply_markup: getSpamLaunchMenu(updatedValues),
  });
});
