export default function($templateCache) {
    'ngInject';
    // toastr
    $templateCache.put('directives/toast/toast.html',
        `<div class="{{toastClass}} {{toastType}}" ng-click="tapToast()">
              <div class="t-message-container" ng-switch on="allowHtml">
                <div ng-switch-default ng-if="title" class="{{titleClass}}" aria-label="{{title}}">{{title}}</div>
                <div ng-switch-default class="mq-line-height dynamic-text-l {{messageClass}}" aria-label="{{message}}"><span class="t-image mq-line-height dynamic-text-l "></span><span class="t-message mq-line-height dynamic-text-l ">{{message}}</span></div>
                <div ng-switch-when="true" ng-if="title" class="{{titleClass}}" ng-bind-html="title"></div>
                <div ng-switch-when="true" class="mq-line-height dynamic-text-l {{messageClass}}" ng-bind-html="message"></div>
              </div>
              <progress-bar ng-if="progressBar"></progress-bar>
            </div>`
    );
}
