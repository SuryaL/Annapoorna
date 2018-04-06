Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

function getNextWeekData() {
    let nextmonday = new Date();
    nextmonday.setDate(nextmonday.getDate() + (1 + 7 - nextmonday.getDay()) % 7);
    nextmonday.setHours(18, 59, 59);
    // console.log(nextmonday);
    let nexttues = new Date(nextmonday);
    nexttues.addHours(24);

    let nextwed = new Date(nexttues);
    nextwed.addHours(24);
    //    console.log(nextwed);
    let nextthurs = new Date(nextwed);
    nextthurs.addHours(24);

    let nextfri = new Date(nextthurs);
    nextfri.addHours(24);
    //    console.log(nextfri);
    return {
        week: nextmonday.toISOString(),
        voting_deadline: nexttues.toISOString(),
        order_deadline: nextthurs.toISOString()
    }
}

module.exports={
    getNextWeekData
}