exports.getDate = function() {
  const newDate = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  }
  return newDate.toLocaleDateString('en-US', options)
}