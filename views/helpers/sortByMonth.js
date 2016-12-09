function sortByMonth(issues, state) {
  if(!issues) return;
  return issues
  .filter( function(issue) {
    if(state && issue.state !== state) { return false; }
    var created_date = new Date(issue.created_at);
    var dateNow = new Date();
    if(dateNow - created_date < 2.628e+9) {
      return issue;
    }
  })
  .map( function(issue) {
    return `<li class="issue_item">${issue.title} <p class="issue_date">created at: ${issue.created_at}</p></li>`;
  }).join('');
}

module.exports = sortByMonth;
