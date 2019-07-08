import {fancyHTML as dm } from './dom';
import Modal from './assets/js/modal';

// Fancy modal namesapce
function Fancymodal(title, text){
   this.title = title;
   this.text = text;
   this.init();
}
Fancymodal.prototype = {
    constructor: Fancymodal,
    init: function(){
       if(typeof jQuery === 'undefined'){
            console.error('Fancymodal: dependency (jQuery) not found.')
            return;
       }
       jQuery('body').append(dm);
       const bs_modal = new Modal(jQuery('.modal'));
       bs_modal.show();
    }
}

function famo(title, text){
    return new Fancymodal(title, text);
}

famo('hello', 'world');