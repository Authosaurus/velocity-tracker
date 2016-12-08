function totalOpen(issues) {
  return issues.filter( function(issue) {
    return (issue.closed_at === null);
  }).length;
}

module.exports = totalOpen;
