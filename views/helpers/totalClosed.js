function totalClosed(issues) {
  if(!issues) return;
  return issues.filter( function(issue) {
    return (issue.closed_at !== null);
  }).length;
}

module.exports = totalClosed;