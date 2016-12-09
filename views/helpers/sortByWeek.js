const formatDate = require('./format-date.js');

function sortByWeek(issues, state) {
  if(!issues) return;
  return issues
  .filter( function(issue) {
    if(state && issue.state !== state) { return false; }
    var created_date = new Date(issue.created_at);
    var dateNow = new Date();
    if(dateNow - created_date < 6.048e+8) {
      return issue;
    }
  })
  .map( function(issue) {
    var date = formatDate(issue.created_at);
    return `<li class="issue_item">${issue.title} <p class="issue_date">created at: ${date}</p></li>`;
  }).join('');
}

module.exports = sortByWeek;
