import angular from 'angular';
import InputPlaceholderDirective from './inputPlaceholder.directive';
import InputPlaceholderProvider from './inputPlaceholder.provider';
import './style.scss';

// A directive for inputPlaceholder animation.
/** USAGE <input type="text" input-placeholder="text" />
// 
// Make sure the input element is fit completely in a container with position : relative; and either margin-top, padding-top or overflow:visible set according to requirement.
 *
        // Configure in app.config  //

        inputPlaceholderProvider.setSwitchOnFocus(false); // toggle the switch on focus or on when input has a value
        inputPlaceholderProvider.setTransUpRatio({x:0.6, y:1});
        inputPlaceholderProvider.setTransDownRatio({x:0.4});
        inputPlaceholderProvider.setFontAnimation(true);
        inputPlaceholderProvider.setAnimationTime(0.2);
        inputPlaceholderProvider.setAnimationScale(0.9) // default
        inputPlaceholderProvider.setAnimationTime(1) // in seconds

 * Use input-placeholder="text" attribute on your input tag. 
 * use inputPlaceholderProvider setTransDownRatio(x,y) , setTransUpRatio(x,y) to set custom default values in (em) for both transitions
 * use attributes i-trans-up-x="number" , i-trans-down-x, i-trans-up-y, i-trans-down-y .. for individual element customization
 

 * ADDITIONAL:
 * IF NEED TO REINITIALIZE THE PLACEHOLDERS, BROADCAST 'reinit-iplaceholder' event

    // for reinitializing the placeholders on event (use incases where the view is hidden on link)
    self.$scope.$broadcast('reinit-iplaceholder');
    
    // In case the text changes dynamically
    self.$scope.$broadcast('reinit-iplaceholder',{replace_element:true});
   
 
 * if need to delay link, use attribute i-placeholder-link-delay="0.2" in seconds
 * i-animation-scale, i-animation-time, i-animation-delay
 * Use i-placeholder , i-placeholder-up , i-placeholder-down classes to customize your css

 Do not change font sizes. It lags on mobiles. use i-animation-scale;
 */

export default angular
    .module('inputPlaceholder', [])
    .directive('inputPlaceholder',InputPlaceholderDirective)
    .provider('inputPlaceholder', InputPlaceholderProvider)
    .name;