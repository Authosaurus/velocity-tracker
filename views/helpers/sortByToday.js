const formatDate = require('./format-date.js');

function sortByToday(issues, state) {
  if(!issues) return;
  return issues
  .filter( function(issue) {
    var created_date = new Date(issue.created_at);
    var dateNow = new Date();
    if(state && issue.state !== state) { return false; }
    if(dateNow - created_date < 8.64e+7) {
      return issue;
    }
  })
  .map( function(issue) {
    var date = formatDate(issue.created_at);
    return `<li class="issue_item">${issue.title} <p class="issue_date">created at: ${date}</p></li>`;
  }).join('');
}

module.exports = sortByToday;
