function parseISOString(s) {
  const b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

function parseMiniISOString(s) {
  const b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2]));
}

function formatDateAsString(dateString) {
  const dateArr = dateString.split(/\D+/);
  const monthNames = [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Aoû',
    'Sep',
    'Oct',
    'Nov',
    'Déc',
  ];

  const date = parseMiniISOString(dateString);
  return `${dateArr[2]} ${monthNames[date.getMonth()]} ${dateArr[0]}`;
}

module.exports = {
  parseISOString,
  parseMiniISOString,
  formatDateAsString,
};
