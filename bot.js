require('dotenv').config();
const { Telegraf } = require('telegraf')
const getMainMenu = require('./keyboard')
const { yesterday, today } = require('./app')
const hockeyNews = require('./parse')

let day = new Date(Date.now()).toISOString().split('T')[0]
let todays = day.replace(/\d{8}/g)
const letToday = todays.replace(/-/g, '')
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name}! Выбирай, что хочешь узнать по хоккею!`, getMainMenu()))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('Результаты за вчера', async ctx => {
  const info = await yesterday
  info.forEach(el => {
    ctx.replyWithHTML(`${el[0]} ${el[2]} : ${el[3]} ${el[1]}
    `)
  })

})

bot.hears('Результаты онлайн', async ctx => {
  let stats = await today

  stats.forEach(el => {
    if (el[5] !== 20201203233000) {
      if (el[4] == 'FT' || el[4] == 'OT') {
        ctx.replyWithHTML(`<b>Матч окончен</b>\n${el[0]} ${el[2]} : ${el[3]} ${el[1]}
        `)
      } else if (el[4] == 'NS') {
        ctx.replyWithHTML(`<b>Матч еще не начался</b>\n${el[0]} - ${el[1]}\n
        `)
      } else if (el[4] == '1P' || el[4] == '2P' || el[4] == '3P') {
        ctx.replyWithHTML(`<b>Идет ${el[4]} в матче</b>\n${el[0]} ${el[2]} : ${el[3]} ${el[1]}
        `)
      } else if (el[4] == '') {
        ctx.replyWithHTML(`<b>Перерыв в матче</b>\n${el[0]} ${el[2]} : ${el[3]} ${el[1]}
        `)
      }
    }
  })
})

bot.hears('Новости', async ctx => {
  const news = await hockeyNews;
  news.forEach((el) => {
    ctx.replyWithHTML(
      `Новости:\n<b>${el[0]}</b>\nhttps://www.sports.ru/${el[1]}`
    )
  })
})

bot.hears('Фото дня', ctx => {
  ctx.replyWithPhoto(
    'https://photo.khl.ru/photoday/2073358/',
  )
})

bot.launch()
