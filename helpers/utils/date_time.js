Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

// FIXME NEED BETTER WAY
//CURRENTLY HARDCODED
function getNextWeekData() {
    let nextmonday = new Date();
    nextmonday.setDate(nextmonday.getDate() + (1 + 7 - nextmonday.getDay()) % 7);
    
    let [one,two1] = nextmonday.toISOString().split('T');
    let [two2,three]=two1.split('.');
    nextmonday = new Date(one+'T23:59:59.'+three);
    
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


function dallastime(date) {
    return new Date(date).toLocaleString("en-US", { timeZone: "America/Chicago" })
}

module.exports={
    getNextWeekData,
    dallastime
}