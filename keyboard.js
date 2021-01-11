const { Markup } = require('telegraf');

function getMainMenu() {
  return Markup.keyboard(
    [['Результаты онлайн', 'Результаты за вчера'],
    ['Новости', 'Фото дня']
    ]).resize().extra()
};

module.exports = getMainMenu;
