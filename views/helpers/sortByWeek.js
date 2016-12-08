function sortByToday(issues) {
  var sortedIssues = issues
  .filter( function(issue) {
    var created_date = new Date(issue.created_at);
    var dateNow = new Date();
    if(dateNow - created_date < 6.048e+8) {
      return issue;
    }
  })
  .map( function(issue) {
    return `<p>${issue.title}</p><br>
            <p>${issue.created_at}</p>`;

  })
  return sortedIssues;
};


module.exports = sortByToday;
