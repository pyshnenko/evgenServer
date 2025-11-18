import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import { Telegraf, session } from 'telegraf';
const app = express();
const PORT = Number(process.env.PORT);

const bot = new Telegraf(String(process.env.TGTOK));

app.use(express.urlencoded({ extended: true }));
// Также можно парсить JSON (на случай, если клиент отправляет JSON)
app.use(express.json());

bot.use(session());

bot.telegram.setMyCommands([
  { command: '/start', description: 'Начинаем начинать' }
])

bot.start(async (ctx: any) => {
  console.log(ctx.from.id)
  ctx.reply('Привет!!!')
});

bot.launch();
// POST /api/newStudent — приём данных формы
app.post('/api/newStudent', (req: Request, res: Response) => {
  console.log('Получены данные:', req.body);

  // Пример валидации
  const { phone, city } = req.body;
  if (!phone || !city) {
    return res.status(400).json({
      error: 'нет телефона или города',
    });
  }

  // Здесь можно сохранить данные в БД и т.д.
  bot.telegram.sendMessage(Number(process.env.ADMIN1),`К вам обратился пользователь\n${phone}\n${city}`)
  bot.telegram.sendMessage(Number(process.env.ADMIN2),`К вам обратился пользователь\n${phone}\n${city}`)
  res.status(201).json({
    message: 'Студент успешно добавлен',
    student: { phone, city },
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
