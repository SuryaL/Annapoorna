/*
 --- USAGE ---

 Example HTML :
      <div class="myrating"> 
        Select a rating
        <div class="myrating-wrapper">
	        <starsy ng-click="self.clickedStars()" mode="write" output="self.rating" number-of-stars='5'>
    	    </starsy>
        </div>

		You rated:
        <div class="myrating-wrapper">
	        <starsy  mode="read" margin="5" this-much="self.rating.value" number-of-stars='5'>
    	    </starsy>
        </div>
		Rating to different percent scale:
         <div class="myrating-wrapper">
	        <starsy  mode="read" margin="1" percent="self.rating.percent" number-of-stars='13'>
    	    </starsy>
        </div>
      </div>



      Example css:
      .myrating {
        height: 40px;
        display: inline-block;
        position: relative;
        right: 0px;
        width: 100%;
        padding: 10px;
        .myrating-wrapper {
            display: inline-block;
            height: 100%;
            width: 100%;
            position: relative;
        }
    }
*/


import angular from 'angular';
import starsyDirective from './starsy.directive';
import ngTouch from 'angular-touch';

import './starsy.scss';

let starsyModule = angular.module('starsy', [ngTouch])
.directive('starsy',starsyDirective)

export default starsyModule.name;
