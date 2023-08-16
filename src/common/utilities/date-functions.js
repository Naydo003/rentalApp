
Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}

export function addHoursHelper(date, h) {
  return date.addHours(h)
}