const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.sports.ru/hockey/news/';

async function getText() {
  try {
    const response = await axios.get(url);
    const result = await response.data
    return result
  } catch (error) {
    console.error(error);
  }
}
async function parse() {

  const news = await getText()

  const $ = cheerio.load(news);
  const textNews = []
  const links = []

  $('.short-text').each((i, elem) => {
    textNews.push($(elem).text())
  })
  $('.short-text').each(function () {
    let link = $(this).attr('href');
    links.push(link);
  });
  const sliceTextNews = textNews.slice(0, 11)
  const sliceLinks = links.slice(0, 11)
  const all = sliceTextNews.map((el, i) => [el, sliceLinks[i]])
  return all
}

const hockeyNews = parse()
module.exports = hockeyNews;
