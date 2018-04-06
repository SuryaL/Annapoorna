
export default class GrabAttention {
    // not injected as a service 
    // need to send these params and instantiate
    constructor($auth, $window, ScanStore, Mymo, $timeout, item_store_location) {
        this.$window = $window;
        this.$auth = $auth;
        this.$timeout = $timeout;
        this.code = 'm';
        this.item_store_location = (item_store_location || 'seen_slider_help-') + this.$auth.getUser().id;
        this.refreshRawStoredValue();
        this.Mymo = Mymo;
        this.attentiongrab = null;
    }

    canStart(bool = true) {
        this.can_activate = bool;
    }

    refreshRawStoredValue() {
        this._raw_stored_value = this.getRawStoredValue();
    }

    getRawStoredValue() {
        return this.$window.localStorage.getItem(`${this.item_store_location}`);
    }

    get current_value() {
        return JSON.parse(this._raw_stored_value || '{}');
    }

    getCodeName(current_measure, current_sequence_index) {
        return `${this.code}-${current_measure}-${current_sequence_index}`
    }

    checkIfSeen(current_measure, current_sequence_index) {
        // console.log(this.current_value, this.getCodeName(current_measure, current_sequence_index));
        return this.current_value[this.getCodeName(current_measure, current_sequence_index)]
    }

    setSeen(current_measure, current_sequence_index) {
        let value_to_store = this.current_value;
        value_to_store[this.getCodeName(current_measure, current_sequence_index)] = true;
        this.$window.localStorage.setItem(this.item_store_location, JSON.stringify(value_to_store));
        this.refreshRawStoredValue();
    }

    setSeenAndStop(current_measure, current_sequence_index){
        this.setSeen(current_measure, current_sequence_index);
        this.stopAttentionGrab();
    }

    activateAttentionGrab(params, config) {
        if(this.can_activate) {
            if(!this.attentiongrab) {
                this.$timeout(() => {
                    // console.log('grabbing attention');
                    this.attentiongrab = this.Mymo.grabAttentionBurst(...params)(config).replay();
                })
            } else {
                    // console.log('replay attention');
                    this.attentiongrab.replay();
            }
            this.needsAttention = true;
        }
    }

    stopAttentionGrab() {
        if(!!this.attentiongrab && this.can_activate) {
            this.$timeout(() => {
                // console.log('stopping grab attention');
                this.needsAttention = false;
                this.attentiongrab.stop();
                // console.log('resetting');
                // IOS FREEZES ON RESET
                // WORK AROUND
                this.$timeout(() => {
                    this.attentiongrab.reset();
                    this.attentiongrab.setProgress(0);
                // console.log('set prog');
                this.$timeout(() => {
                        this.attentiongrab.setProgress(0);
                // console.log('set prog');
            },10)
                },10)
                // this.attentiongrab = null;
            },10)
        }
    }
}