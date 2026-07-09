# Free Fire Headshot Bot

Telegram бот для настроек Free Fire по модели телефона.

## Установка

1. **Установи Node.js** — https://nodejs.org (LTS версия)

2. **Получи токен бота:**
   - Открой Telegram, найди @BotFather
   - Напиши `/newbot`, задай имя и username
   - Скопируй токен (вида `123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11`)

3. **Настрой токен:**
   Открой `bot.js`, замени `ВАШ_ТОКЕН_ОТ_BOTFATHER` на свой токен.
   Или создай файл `.env` с содержимым:
   ```
   BOT_TOKEN=ваш_токен
   ```

4. **Запуск:**
   ```bash
   cd freefire_bot
   npm install
   npm start
   ```

## Использование

- Напиши боту модель телефона: `Samsung S24 Ultra`, `iPhone 15 Pro`, `Poco F5` и т.д.
- Бот выдаст настройки: чувствительность, HUD, советы
- `/list` — список популярных моделей
- `/help` — помощь

## Поддерживаемые бренды

Apple, Samsung, Xiaomi, Poco, Redmi, OnePlus, OPPO, VIVO, Realme, Honor, Huawei, Google Pixel, ASUS ROG, Infinix
