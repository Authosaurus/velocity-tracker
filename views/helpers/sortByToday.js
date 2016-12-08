function sortByToday(issues, state) {
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
    return `<li><p>${issue.title}</p>
            <p>${issue.created_at}</p></li>`;

  });
}

module.exports = sortByToday;
