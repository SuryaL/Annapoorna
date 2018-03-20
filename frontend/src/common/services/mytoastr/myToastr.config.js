export default function(toastrConfig){
        'ngInject';
	        // toastr
        angular.extend(toastrConfig, {
            allowHtml: false,
            closeButton: true,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            maxOpened: 1,
            newestOnTop: true,
            preventOpenDuplicates: true,
            iconClasses: {
                error: 'toast-error mycustom-toast-error',
                info: 'toast-info',
                success: 'toast-success mycustom-toast-success',
                warning: 'toast-warning mycustom-toast-warning'
            },
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: false,
            tapToDismiss: true,
            templates: {
                toast: 'directives/toast/toast.html',
                //     progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 2000,
            // imgSrc:'~common/assets/images/svgs/checkmark2.svg',
            titleClass: 'toast-title',
            toastClass: 'toast mycustom-toast'
        });
}