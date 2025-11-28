import { Router, type Request, type Response } from 'express';
import { botController } from './bot-controller';

const router = Router();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '7373419661';

if (!TELEGRAM_BOT_TOKEN) {
  console.warn('[Telegram] Bot token not configured');
}

async function sendTelegramMessage(text: string, parseMode = 'HTML'): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN) return false;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: parseMode,
          disable_web_page_preview: true,
        }),
      }
    );

    return response.ok;
  } catch (err) {
    console.error('[Telegram] Failed to send message:', err);
    return false;
  }
}

router.post('/telegram/webhook', async (req: Request, res: Response): Promise<void> => {
  try {
    const update = req.body;

    if (update.message) {
      const { text, from } = update.message;
      const username = from?.username || from?.first_name || 'User';

      if (text?.startsWith('/start')) {
        const appUrl = `${process.env.RAILWAY_PUBLIC_DOMAIN || 'http://localhost:5000'}`;
        const webAppUrl = `${appUrl}/telegram?user=${from?.id}`;

        await sendTelegramMessage(
          `🤖 <b>PocketOption Trading Bot</b>\n\n` +
          `Добро пожаловать, ${username}!\n\n` +
          `📊 <a href="${webAppUrl}">Открыть Дашборд</a>\n\n` +
          `Команды:\n` +
          `/start - Главное меню\n` +
          `/status - Статус бота\n` +
          `/trades - История торговли\n` +
          `/stop - Остановить бота`
        );
      } else if (text?.startsWith('/status')) {
        const status = await botController.getStatus();
        await sendTelegramMessage(
          `📊 <b>Статус Бота</b>\n\n` +
          `Состояние: ${status.running ? '▶️ Работает' : '⏸️ Остановлен'}\n` +
          `Баланс: $${status.balance.toFixed(2)}\n` +
          `Всего сделок: ${status.stats.total}\n` +
          `Win Rate: ${status.stats.winRate}%`
        );
      } else if (text?.startsWith('/trades')) {
        const status = await botController.getStatus();
        const trades = status.trades.slice(0, 5);
        let message = '📈 <b>Последние Сделки</b>\n\n';

        if (trades.length === 0) {
          message += 'Нет сделок';
        } else {
          trades.forEach((trade: any, i: number) => {
            message += `${i + 1}. ${trade.direction.toUpperCase()} ${trade.asset}\n`;
            message += `   Результат: ${trade.result === 'win' ? '✅ Win' : '❌ Loss'}\n`;
            message += `   Сумма: $${trade.amount}\n\n`;
          });
        }

        await sendTelegramMessage(message);
      } else if (text?.startsWith('/stop')) {
        await botController.stop();
        await sendTelegramMessage('⏹️ Бот остановлен');
      }
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('[Telegram] Webhook error:', err);
    res.status(500).json({ ok: false });
  }
});

export { router as telegramRouter, sendTelegramMessage };
