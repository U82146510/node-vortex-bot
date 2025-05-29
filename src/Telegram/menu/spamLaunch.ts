import { Api, Bot, Context, InlineKeyboard } from "grammy";


interface MetadataState {
  currentField?: MetadataField;
  values: Partial<Record<MetadataField, string>>;
}

type MetadataField =
  | "name"
  | "symbol"
  | "description"
  | "twitter"
  | "telegram"
  | "website"
  | "image";

export const userMetadataState = new Map<number, MetadataState>();

// Spam Launch Menu

export function getSpamLaunchMenu(values?:Partial<Record<MetadataField,string>>):InlineKeyboard{
    const getValue = (field:MetadataField)=>values?.[field] ? `${values[field]}` : "";
    return new InlineKeyboard()
    .text(`📝 Name: ${getValue("name")}`, "edit_name")
    .text(`🔠 Symbol: ${getValue("symbol")}`, "edit_symbol")
    .row()
    .text(`📄 Description: ${getValue("description")}`, "edit_description")
    .row()
    .text(`🐦 Twitter: ${getValue("twitter")}`, "edit_twitter")
    .text(`💬 Telegram: ${getValue("telegram")}`, "edit_telegram")
    .row()
    .text(`🌐 Website: ${getValue("website")}`, "edit_website")
    .row()
    .text(`🖼️ Image: ${getValue("image")}`, "edit_image")
    .row()
    .text(`📤 DEPLOY METADATA`, "deploy_metadata")
    .text("📋 CLONE METADATA", "clone_metadata")
    .row()
    .text("🔙 Back to Menu", "back_to_home");
};


export function registerMetadataFieldHandlers(bot: Bot<Context, Api>):void {
  const handleEditField = (field: MetadataField, label: string) => {
    bot.callbackQuery(`edit_${field}`, async (ctx) => {
      await ctx.answerCallbackQuery();
      const userId = ctx.from!.id;

      const existing = userMetadataState.get(userId) || { values: {} };
      userMetadataState.set(userId, {
        ...existing,
        currentField: field,
      });

      await ctx.reply(`Please enter the new *${label}* for your project:`, {
        parse_mode: "Markdown",
      });
    });
  };

  handleEditField("name", "Name");
  handleEditField("symbol", "Symbol");
  handleEditField("description", "Description");
  handleEditField("twitter", "Twitter");
  handleEditField("telegram", "Telegram");
  handleEditField("website", "Website");
  handleEditField("image", "Image");
}