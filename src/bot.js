import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import db from "./database.js";

dotenv.config();
console.log(process.env.BOT_TOKEN);
console.log(process.env.ADMIN_ID);

const bot = new Telegraf(process.env.BOT_TOKEN);
const ADMIN_ID = Number(process.env.ADMIN_ID);


bot.start((ctx) => {
    ctx.reply(
        "سلام.🌱\n\n" +
        "ترجیح میدم بیای پیوی ولی اشکالی نداره، بفرما."
    );
});

// every user message
bot.on("message", async (ctx) => {

    // Admin message
    if (ctx.from.id === ADMIN_ID) {

        if (!ctx.message.reply_to_message) {
            console.log("Admin message is not a reply");
            return;
        }

        if (!("text" in ctx.message)) return;

        const repliedMessageId =
            ctx.message.reply_to_message.message_id;

        console.log("Replied to:", repliedMessageId);

        const row = db.prepare(`
            SELECT user_id
            FROM messages
            WHERE admin_message_id = ?
        `).get(repliedMessageId);


        if (!row) {
            console.log("User not found");
            return;
        }


        await ctx.telegram.sendMessage(
            row.user_id,
            ctx.message.text
        );

        await ctx.reply("✅ پاسخ با موفقیت ارسال شد.");

        console.log("Reply sent");

        return;
    }


    //user message
    if (!("text" in ctx.message)) return;


    const sent = await ctx.telegram.sendMessage(
    ADMIN_ID,
    `📨 پیام جدید ناشناس\n\n` +
    `${ctx.message.text}`
    );


    db.prepare(`
        INSERT INTO messages (admin_message_id, user_id)
        VALUES (?, ?)
    `).run(
        sent.message_id,
        ctx.from.id
    );


    await ctx.reply(
        "پیامت ارسال شد.👍🏼\n\n" +
        "سعی میکنم سریع‌تر جوابت رو بدم."
    );

});


//Admins rep
bot.on("message", async (ctx) => {

    if (ctx.from.id !== ADMIN_ID) return;

    if (!ctx.message.reply_to_message) {
        console.log("Admin message is not a reply");
        return;
    }

    const repliedMessageId =
        ctx.message.reply_to_message.message_id;

    console.log("Replied to:", repliedMessageId);

    const row = db.prepare(`
    SELECT user_id
    FROM messages
    WHERE admin_message_id = ?
`).get(repliedMessageId);


if (!row) {
    console.log("User not found");
    return;
}


const userId = row.user_id;

    if (!userId) {
        console.log("User not found for this message");
        return;
    }

    if (!("text" in ctx.message)) return;

    await ctx.telegram.sendMessage(
        userId,
        ctx.message.text
    );
});

bot.launch();

console.log("Bot is running...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
