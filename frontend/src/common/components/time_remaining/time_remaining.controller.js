class TimeRemainingController {
    constructor($interval) {
        'ngInject';
        this.name = 'TimeRemaining';
        this.timeRemaining = '';
        this.$interval = $interval;
        this.timePassed = true;
    }
    $onInit(){
        this.loop();
    }

    loop(){
        this.updateTime();
        this.$interval(()=>{
            this.updateTime();
        },1000)
    }

    updateTime(){
        let{total, d,hr,m,s}= this.getTimeRemaining(this.deadline);
        let timeR ={
            d,hr,m,s
        }
        this.timeRemaining = Object.keys(timeR).reduce((prev,curr)=>{
            let val = timeR[curr];
            if(val<=0 && !prev){
                return prev
            }
            prev += val+ curr + ' ';
            return prev;
        },'');
        if(+total < 0){
            this.timePassed = true;
            this.timeRemaining = '- ' + this.timeRemaining;
        }else{
            this.timePassed = false;
        }
    }

    getTimeRemaining(endtime){
        if(!endtime){
            return{
                total:0, d:0,hr:0,m:0,s:0
            }
        }
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
