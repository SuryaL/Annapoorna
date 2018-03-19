class TimeRemainingController {
    constructor($interval) {
        'ngInject';
        this.name = 'TimeRemaining';
        this.time_remaining = '';
        this.$interval = $interval;
        this.loop();
    }

    loop(){
        this.$interval(()=>{
            let{total, d,hr,m,s}= this.getTimeRemaining(this.deadline);
            let timeR ={
                d,hr,m,s
            }
            this.time_remaining = Object.keys(timeR).reduce((prev,curr)=>{
                let val = timeR[curr];
                if(val<=0 && !prev){
                    return prev
                }
                prev += val+ curr + ' ';
                return prev;
            },'')
            if(+total < 0){
                this.time_remaining = '- ' + this.time_remaining;
            }
        },1000)
    }

    getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
          'total': t,
          'd': +days.toString().replace('-',''),
          'hr': +hours.toString().replace('-',''),
          'm': +minutes.toString().replace('-',''),
          's': +seconds.toString().replace('-','')
        };
      }
}

export default TimeRemainingController;
