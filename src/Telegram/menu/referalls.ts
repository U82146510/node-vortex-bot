import {bot} from '../bot.ts';
import { InlineKeyboard } from 'grammy';

export function referralKeyboard():InlineKeyboard{
    return new InlineKeyboard()
    .text("🎯 Create Reff", "create_referral")
    .row()
    .text("🔙 Back to Menu", "back_to_home");
}