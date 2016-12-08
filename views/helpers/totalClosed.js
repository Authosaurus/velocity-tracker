function totalClosed(issues) {
  return issues.filter( function(issue) {
    return (issue.closed_at !== null)
  }).length;
};
