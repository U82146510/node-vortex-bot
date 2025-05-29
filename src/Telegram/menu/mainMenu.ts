import {bot} from '../bot.ts';
import { InlineKeyboard } from 'grammy';

// Main menu (shared between commands and callbacks)
export function getMainMenuKeyboard():InlineKeyboard {
  return new InlineKeyboard()
    .text("📁 Your Projects", "your_projects")
    .text("🚀 Create New Project", "create_project")
    .row()
    .text("🚀 SPAM LAUNCH", "spam_launch")
    .row()
    .text("🤑 BUMP BOT 🤑", "bump_bot")
    .row()
    .text("🔗 Referrals", "referrals")
    .url("❓ Help", "https://deployonvortex.gitbook.io/vortex")
    .row()
    .url("👥 Discord", "https://discord.gg/vortexdeployer");
};