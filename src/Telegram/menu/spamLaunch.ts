import {bot} from '../bot.ts';
import { InlineKeyboard } from "grammy";


// Spam Launch Menu

export function getSpamLaunchMenu():InlineKeyboard{
    return new InlineKeyboard()
    .text(`Name: here should be set name`)
    .text(`Symbol: here should be symbol set`)
    .row()
    .text(`Description:here should be description`)
    .row()
    .text(`Twitter: here should be twitter context`)
    .text(`Telegram: here should be telegram contact`)
    .row()
    .text(`Webite: Should be a website set`)
    .row()
    .text(`Image: shold be an image set`)
    .row()
    .text(`DEPLOY METADATA`)
    .text(`CLONE METADATA`)
    .row()
    .text("🔙 Back to Menu", "back_to_home")  
};