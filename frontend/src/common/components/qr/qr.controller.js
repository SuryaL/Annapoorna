import qrcode from './qrcode';
class QrController {
    constructor() {
        // 'ngInject';
        this.qrcode = qrcode;
        this.typeNumber = 4;
        this.errorCorrectionLevel = 'L';
        this.privatekey = '';
    }

    $onInit() {
        console.log('object');
    }

    createQr(data, privatekey){
        //TODO: //privatekey
        var qr = this.qrcode(this.typeNumber, this.errorCorrectionLevel);
        qr.addData(data);
        qr.make();
        let img = qr.createImgTag();
        document.getElementById('qrcode').innerHTML = img;
        return {
            qr,
            img
        }
    }
}

export default QrController;