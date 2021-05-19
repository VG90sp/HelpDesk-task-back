const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();
app.use(cors());
app.use(koaBody({
  json: true,
}));

const router = new Router();

let nextId = 1;
const ticket = [
  {
    id: nextId++, name: 'Билет 1', status: true, created: 'date pm',
  },
  {
    id: nextId++, name: 'Билет 2', status: true, created: 'date pm',
  },
];
nextId = 1;
const ticketFull = [
  {
    id: nextId++, name: 'Билет 1', description: 'Хоккей', status: true, created: 'date pm',
  },
  {
    id: nextId++, name: 'Билет 2', description: 'Театр', status: true, created: 'date pm',
  },
];

router.get('/allTickets', async (ctx) => {
  const { id } = ctx.request.query;
  if (!id) {
    ctx.response.body = ticket;
  } else {
    ctx.response.body = ticketFull.filter((o) => o.id === Number(id));
  }
});

router.post('/setTickets', async (ctx) => {
  const {
    name, description, status, created,
  } = ctx.request.body;
  const id = nextId++;
  ticket.push({
    id, name, status, created,
  });
  ticketFull.push({
    id, name, description, status, created,
  });
  ctx.response.body = ticketFull;
});

app.use(router.routes());
app.use(router.allowedMethods());


const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
const server = http.createServer(app.callback()).listen(port)
// server.listen(port, () => console.log('server started on http://localhost: 7070'));