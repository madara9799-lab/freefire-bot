const TelegramBot = require('node-telegram-bot-api');
const { findSettings, UNIVERSAL } = require('./settings');

const token = process.env.BOT_TOKEN || '8717894049:AAGn5zw_h28MotXOo1nM4sYCFs6Um0ZosOg';

const bot = new TelegramBot(token, { polling: true });

// Форматирование настроек
function formatSettings(settings, model) {
  return `
🎯 *Хедшот настройки для ${settings.name}*

📱 *Модель:* ${model || settings.name}

━━━━━━━━━━━━━━━━━━
🎛 *Чувствительность:*
┃ 🔫 Общая: \`${settings.general}\`
┃ 🔴 Красная точка: \`${settings.red_dot}\`
┃ 🔭 2x: \`${settings.scope_2x}\`
┃ 🔭 4x: \`${settings.scope_4x}\`
┃ 👁 Free Look: \`${settings.free_look}\`
━━━━━━━━━━━━━━━━━━
🎯 *Режим прицела:* ${settings.aim}
🖐 *Рекомендуемый HUD:* ${settings.hud}

💡 *Совет:* ${settings.tip}

━━━━━━━━━━━━━━━━━━
_Настройки подбираются под твою модель. Подстрой под свой стиль игры!_
  `;
}

// Список популярных моделей для справки
function formatHelp() {
  return `
👋 *Привет! Я бот настроек для Free Fire!*

Просто напиши *модель своего телефона*, и я дам тебе оптимальные хедшот-настройки.

*Примеры:* \`iPhone 15 Pro Max\`, \`Samsung S24 Ultra\`, \`Poco F5\`, \`Redmi Note 13\`, \`OnePlus 12\`

━━━━━━━━━━━━━━━━━━
*Доступные бренды:*
• Apple (iPhone 11-16, iPad)
• Samsung (A, S серии)
• Xiaomi / Poco / Redmi
• OnePlus
• OPPO / VIVO / Realme
• Honor / Huawei
• Google Pixel
• ASUS ROG Phone
• Infinix

━━━━━━━━━━━━━━━━━━
⚙ *Команды:*
/start — Приветствие
/help — Помощь
/list — Список популярных моделей

_Введи свою модель телефона прямо сейчас!_`;
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, formatHelp(), { parse_mode: 'Markdown' });
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, formatHelp(), { parse_mode: 'Markdown' });
});

bot.onText(/\/list/, (msg) => {
  const list = `
📋 *Популярные модели:*

*Apple:* iPhone 16 Pro Max, 15 Pro, 14, 13, 12, 11, X, SE, iPad
*Samsung:* S24 Ultra, S23, S22, S21, S20 FE, A55, A34, A15
*Xiaomi:* 14 Ultra, 13 Pro, 12
*Poco:* F6, F5, F4, X6
*Redmi:* Note 13 Pro, Note 12, Note 11
*OnePlus:* 12, 12R, 11, Nord 4
*Realme:* GT 6, GT 5, C67
*ASUS:* ROG Phone 8, 7, 6
*OPPO:* Find X8, Reno 12, A78
*VIVO:* X100 Pro, V30, Y100
*Honor:* Magic 6 Pro, 200, 90
*Huawei:* P70 Pro, P60 Pro
*Google:* Pixel 9 Pro, 8 Pro, 7
*Infinix:* GT 20 Pro, Note 40, Hot 40

_Напиши свою модель!_`;
  bot.sendMessage(msg.chat.id, list, { parse_mode: 'Markdown' });
});

// Обработка любого текста (поиск по модели)
bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    const model = msg.text.trim();
    const settings = findSettings(model);

    if (settings) {
      bot.sendMessage(msg.chat.id, formatSettings(settings, model), { parse_mode: 'Markdown' });
    } else {
      bot.sendMessage(msg.chat.id,
        `❌ Модель "${model}" не найдена.

Попробуй написать иначе, например:
• \`Samsung S24 Ultra\` или просто \`s24 ultra\`
• \`iPhone 15 Pro Max\` или \`iphone 15\`
• \`Poco F5\` или \`redmi note 13\`

Или введи /list для списка моделей.

А пока — *универсальные настройки:*`,
        { parse_mode: 'Markdown' }
      );
      bot.sendMessage(msg.chat.id, formatSettings(UNIVERSAL, model), { parse_mode: 'Markdown' });
    }
  }
});

console.log('Бот запущен!');
