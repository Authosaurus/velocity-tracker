function formatDate(date) {
  return date.replace(/T/, ', ').replace(/Z/, '');
}

module.exports = formatDate;
