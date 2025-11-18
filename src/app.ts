import Koa = require('koa');
import bodyParser = require('koa-bodyparser');
import cors = require('koa-cors');

const app = new Koa();

app.use(cors()); // Разрешаем CORS
app.use(bodyParser());

app.use(async (ctx) => {
  if (ctx.path === '/newStudent' && ctx.method === 'POST') {
    console.log('Новый студент:', ctx.request.body);

    ctx.body = {
      message: 'Студент успешно добавлен!',
      student: ctx.request.body,
    };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Not Found' };
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});
