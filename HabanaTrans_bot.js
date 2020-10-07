const {commandsList} require("./src/commands");
const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const express = require('express');
const expressApp = express()

const port = process.env.PORT || 3000;
expressApp.get('/', (req, res) => {
  res.send('This App is supporting HabanaTrans_bot!')
});
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'http://www.habanatrans.com'),
  Markup.callbackButton('Delete', 'delete')
]);

const habanaTrans_bot = new Telegraf(process.env.BOT_TOKEN);
// const habanaTrans_bot = new Composer();

// habanaTrans_bot.use(Telegraf.log())

/* Comandos por defecto */
habanaTrans_bot.start((ctx) => {
  // console.log(ctx)
  ctx.replyWithHTML(`<i><b>Hola estimado(a) ${ctx.from.first_name}!</b></i>\n
\rMi función es ayudarle brindándole toda la información a mi alcance sobre el transporte público en nuestra ciudad habanera. Para ello use los comandos de que dispongo para ese empeño. 
\nTenga una buena estancia 😊`, Markup
    .keyboard([
      ['🚍 Rutas Urbanas', '🏫 Terminales'], // Row1 with 2 buttons
      ['🌐 Sitio Web', '🖥 Web App', ], // Row2 with 2 buttons
      ['⬇ App Movil', '⭐ Califícanos', '👥 Comparte'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
    .extra()
  );
});

habanaTrans_bot.help(async (ctx) => {
  const commands = await ctx.getMyCommands()
  const info = commands.reduce((acc, val) => `${acc}/${val.command} - ${val.description}\n`, '')
  return ctx.reply(info)
})

/* Comandos personalizados */

// correr este comando cuando se modifican los comandos existentes y no se vea el cambio en produccion
habanaTrans_bot.command('updateCommands', async (ctx) => {
  await ctx.setMyCommands([
    {
      command: '/start',
      description: 'Inicio'
    },
    {
      command: '/help',
      description: 'Listado de comandos'
    },
    {
      command: '/terminales',
      description: 'Listado de terminales'
    },
    {
      command: '/rutas',
      description: 'Listado de rutas'
    },
  ]);
});

habanaTrans_bot.command('terminales', (ctx) => {
  ctx.reply('Listado de terminales');
  ctx.reply('Terminal 1 \nTerminal 2 \nTerminal 3');
});

habanaTrans_bot.command('rutas', (ctx) => {
  ctx.reply('Por favor seleccione una de las categorías de ruta');
  ctx.reply('Red Principal \nRed Alimentadora \nRutero y Metrotaxi \nRed Fecrrocarril \nHabana Bus Tour');
});

/* Palabras prohibidas y otras reglas */
habanaTrans_bot.hears([/puta/ig, 'anormal', 'fea', 'loca'], (ctx) => {
  ctx.reply('tu madre!')
});

/* Eventos */
habanaTrans_bot.on('bot_command', ({reply})=> {
  reply('Ese comando ese comandoooo!')
})

/* Hears */
habanaTrans_bot.hears('🚍 Rutas Urbanas', (ctx) =>{
  // todo:
  ctx.reply('Rutas')});
habanaTrans_bot.hears('🏫 Terminales', (ctx) =>{
  // todo:
  ctx.reply('Terminales')});
habanaTrans_bot.hears('🌐 Sitio Web', (ctx) =>{
  // todo:
  ctx.reply('Ida al sitio web')});
habanaTrans_bot.hears('🖥 Web App', (ctx) =>{
  // todo:
  ctx.reply('Ida a la app web')});
habanaTrans_bot.hears('⬇ App Movil', (ctx) =>{
  // todo:
  ctx.reply('Descargar la app desde apklis')});
habanaTrans_bot.hears('⭐ Califícanos', (ctx) =>{
  // todo:
  ctx.reply('Calificacion en apklis y playstore')});
habanaTrans_bot.hears('👥 Comparte', (ctx) =>{
  // todo:
  ctx.reply('Accion de compartir con otros user de Telegram')});


habanaTrans_bot.launch();