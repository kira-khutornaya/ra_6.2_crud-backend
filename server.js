const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));

const notes = [
  {
    id: 0,
    content: 'Vestibulum vitae pellentesque risus, sed porttitor turpis. Praesent scelerisque, diam et auctor vulputate, enim eros imperdiet dui, sed maximus augue lacus vel nulla. In egestas quam metus.',
  },
  {
    id: 1,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at egestas quam. Nunc molestie urna ac augue efficitur, sit amet ultricies nulla faucibus. ',
  },
  {
    id: 2,
    content: 'Phasellus felis tellus, laoreet sed tortor sit amet, malesuada iaculis dui. Pellentesque dignissim risus vel turpis sodales pharetra. Curabitur porta.',
  },
];
let nextId = 3;

const router = new Router();

router.get('/notes', async (ctx, next) => {
    ctx.response.body = notes;
});

router.post('/notes', async(ctx, next) => {
    notes.push({...ctx.request.body, id: nextId++});
    ctx.response.status = 204;
});

router.delete('/notes/:id', async(ctx, next) => {
    const noteId = Number(ctx.params.id);
    const index = notes.findIndex(o => o.id === noteId);
    if (index !== -1) {
        notes.splice(index, 1);
    }
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started'));
