global.fetch = require('node-fetch')
const translit = require('./trans')
let someday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
let yesterdays = someday.replace(/-/g, '')
let day = new Date(Date.now()).toISOString().split('T')[0]
let todays = day.replace(/-/g, '')

async function data() {
  const response = await fetch(`https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=hockey&Date=${yesterdays}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "008b4f0328mshdbd56778fe67365p17b12bjsn4d44c70bbc32",
      "x-rapidapi-host": "livescore6.p.rapidapi.com"
    }
  })
  let info = []
  const result = await response.json();
  const resultYesterday = result.Stages[0].Events;
  // console.log(resultYesterday);
  for (let i = 0; i < resultYesterday.length; i++) {
    info.push([translit(resultYesterday[i].T1[0].Nm), translit(resultYesterday[i].T2[0].Nm), resultYesterday[i].Tr1, resultYesterday[i].Tr2]);
  }
  return info
}


async function alldata() {
  const response = await fetch(`https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=hockey&Date=${todays}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "008b4f0328mshdbd56778fe67365p17b12bjsn4d44c70bbc32",
      "x-rapidapi-host": "livescore6.p.rapidapi.com"
    }
  })
  let stats = []
  const result = await response.json();
  const resultToday = result.Stages[0].Events;
  for (let i = 0; i < resultToday.length; i++) {
    stats.push([translit(resultToday[i].T1[0].Nm), translit(resultToday[i].T2[0].Nm), resultToday[i].Tr1, resultToday[i].Tr2, resultToday[i].Eps, resultToday[i].Esd]);
  }
  return stats
}




const yesterday = data()
const today = alldata()
module.exports = { yesterday, today }



