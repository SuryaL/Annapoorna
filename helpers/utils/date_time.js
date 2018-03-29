Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

function getNextWeekData() {
    let nextmonday = new Date();
    nextmonday.setDate(nextmonday.getDate() + (1 + 7 - nextmonday.getDay()) % 7);
    nextmonday.setHours(18, 59, 59);
    // console.log(nextmonday);

    let nextwed = new Date(nextmonday);
    nextwed.addHours(48);
    //    console.log(nextwed);

    let nextfri = new Date(nextwed);
    nextfri.addHours(48);
    //    console.log(nextfri);
    return {
        week: nextmonday.toISOString(),
        voting_deadline: nextwed.toISOString(),
        order_deadline: nextfri.toISOString()
    }

}

module.exports={
    getNextWeekData
}