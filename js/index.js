'use strict';

const PIC_LIST = [1, 2, 3];
let NEXT_PIC = 0;
let CURRENT_PIC = PIC_LIST.length - 1;
let SLIDE_STOP = false;
let SCROLL_HEIGHT = 0;
let SCROLL_DETECT_DONE = false;

const SONG_LIST = [
  {
    owner: 'Anthony',
    title: 'Vitamin C - Graduation (Friends Forever)',
    path: './media/grad.m4a',
    weight: 60,    
  }, 
  {
    owner: 'Anthony',
    title: 'One Republic - Good Life',
    path: './media/goodlife.m4a',
    weight: 20,
  }, 
  // {
  //   owner: 'Anthony',
  //   title: 'Limahl - Never Ending Story',
  //   path: './media/neverending.m4a',
  //   weight: 20,
  // }, 
  // {
  //   owner: 'Anthony',
  //   title: 'Kina Grannis - Can\'t Help Falling In Love',
  //   path: './media/song-fallin.m4a',
  //   weight: 10,
  // }, 
  // {
  //   owner: 'Anthony',
  //   title: 'UP - Married Life',
  //   path: './media/up.mp3',
  //   weight: 10,
  // }, 
  // {
  //   owner: 'Anthony',
  //   title: 'Si Tu Vois Ma Mère – Tatiana Eva-Marie & Avalon Jazz Band',
  //   path: './media/situ.mp3',
  //   weight: 10,
  // }, 
];
let SONG_TRACK = 0;

function morePicBanner() {
  $('#js-landing').replaceWith(`
    <div id='js-landing' class='more_intro'>
      <img id='js-main-img' class='more_intro_img' src="./img/capemay.jpg">
    </div>
  `);
}

function playNext() {
  $('#js-music-info').css('display', 'none');
  SONG_TRACK++;
  if (SONG_TRACK === SONG_LIST.length) SONG_TRACK = 0;
  $('audio').attr('src', SONG_LIST[SONG_TRACK].path);
  document.getElementById('js-audio').play();
  $('#js-owner').text(SONG_LIST[SONG_TRACK].owner);
  $('#js-music-title').text(SONG_LIST[SONG_TRACK].title);    
  $('#js-music-info').css('display', 'block');
}

function fadeOut(i, height) {
  if (i <= 0) {
    setTimeout(() => {
      $('#js-cover-greeting').css('display', 'none');
      $('#js-page-loader').css('display', 'none');
      $('#js-more-pic').css('display', 'block');
      $('#js-btn-mute').css('display', 'flex');
      $('#js-msg-bottom').css('display', 'block');

      $('#js-landing').css('height', height);
      return;
      }, 200);
      return;
  }

  setTimeout(() => {
    $('#js-cover-greeting').css('opacity', i*0.01);
    fadeOut(i-1, height);
  }, 15);
}

function fadeOutCircle(i, height) {
  if (i <= 0) {
    $('#js-cover-greeting').css('background-image', 'url(' + './img/main-color-cir.jpg' + ')');
    $('#js-cover-greeting').css('opacity', 1);
    setTimeout(()=>{
      $('#js-landing').css('background-image', 'url(' + './img/main-color.jpg' + ')');
      setTimeout(()=> {
        return fadeOut(100, height);
      }, 100);
    }, 100);
    return;
  }
  setTimeout(() => {
    $('#js-cover-greeting').css('opacity', i*0.01);
    fadeOutCircle(i-1, height);
  }, 20);


}
function playMusic() {
  document.getElementById('js-audio').play();
  $('#js-owner').text(SONG_LIST[SONG_TRACK].owner);
  $('#js-music-title').text(SONG_LIST[SONG_TRACK].title);
  $('#js-greeting-text').hide();
  $('#js-msg-bottom').css('display', 'none');
  $('.intro').css('display', 'none');
  $('#js-main-img').addClass('fi_short');  
  
  const height =  $('#js-landing').height();
  const maxHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
  $('#js-landing').css('height', maxHeight);
  
  fadeOutCircle(100, height);
}

function changeBackground() {
  SLIDE_STOP = true; // stop slide show
  // $('#js-main-img1').hide();
  // $('#js-main-img2').hide();
  // $('#js-main-img3').hide();

  $('#js-landing').css('background', 'none');
  $('#js-main-img-next').css('display', 'block');

}

function stopMusic() {
  document.getElementById('js-audio').pause();
  $('#js-btn-mute').hide();
  $('#js-btn-mute-2').hide();
  $('#js-owner').hide();
  $('#js-music-info').hide();
  $('#js-btn-mute-2').hide();
}

function toggleFullList() {
  const listLength = $('#js-future-meetings').attr("cnt");

  $('#js-future-meetings').attr("cnt", listLength === "1" ? "0" : "1");
  renderFutureMeetings();
}

function openHelp() {
  $('#js-help').removeClass('hidden');
  $('#js-popup-bg').removeClass('hidden');
}

function closeHelp() {
  $('#js-help').addClass('hidden');
  $('#js-popup-bg').addClass('hidden');
}

function renderMainImage() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const isLandscape = width > height;
  const heightFactor = isLandscape ? 0.8 : 0.6;
  const bottomFactor = isLandscape ? '20%' : '40%';
  const greetingTopFactor = isLandscape ? 0.7 : 0.53;
  SCROLL_HEIGHT = height*greetingTopFactor*1.1;

  $('#js-landing').css('height', height*greetingTopFactor*1.05);
  // $('#js-bottom').css('margin-top', height*greetingTopFactor*1.05);
  $('.intro').css('height', height * heightFactor);
  $('.intro').css('bottom', bottomFactor);

  if (!isLandscape) {
    $('#js-greeting').css('background-position', 'top right');
    $('#js-greeting').css('background-size', '100%');
    $('#js-mobile-logo').css('width', '240px');
    $('.img_p, .img_l').css('padding', '7% 0');
    $('.img_p, .img_l').css('margin-bottom', '11%');
    $('.font_m').css('font-size', '1.4rem');
    $('.font_detail').css('font-size', '16px');
    $('.btn_black').addClass('btn_mobile');
    $('#js-warning').addClass('warning_mobile');
  }

  if (width < 1600) {
    $('.img_l').css('width', '100%');
    $('.img_p').css('width', '90%');
  }
}

function handleEvent() {
  // SONG_LIST.sort((a, b) => {
  //   const aRand = Math.random() + a.weight/100;
  //   const bRand = Math.random() + b.weight/100;
  //   return bRand - aRand;
  // });

  $('audio').attr('src', SONG_LIST[SONG_TRACK].path);

  $('audio').on({
    ended: function() {
      SONG_TRACK++;
      if (SONG_TRACK === SONG_LIST.length) SONG_TRACK = 0;
      $('audio').attr('src', SONG_LIST[SONG_TRACK].path);
      window.document.querySelector('audio').play();
      $('#js-owner').text(SONG_LIST[SONG_TRACK].owner);
      $('#js-music-title').text(SONG_LIST[SONG_TRACK].title);    
    }
  });

  window.onscroll = function (e) { 
    if (SCROLL_DETECT_DONE) return; 
    
    if (window.scrollY > SCROLL_HEIGHT) {
      changeBackground();
      SCROLL_DETECT_DONE = true;
    }
  }
}

async function slideShowPlay() { 
  if (SLIDE_STOP === true) {
    $('#js-main-img1').hide();
    $('#js-main-img2').hide();
    $('#js-main-img3').hide();  
    return;
  }
  
  $(`#js-main-img${PIC_LIST[CURRENT_PIC]}`).css('z-index', '-2');
  $(`#js-main-img${PIC_LIST[NEXT_PIC]}`).css('display', 'block');
  setTimeout(function() {
    $(`#js-main-img${PIC_LIST[CURRENT_PIC]}`).css('z-index', '-1');
    $(`#js-main-img${PIC_LIST[CURRENT_PIC]}`).css('display', 'none');
    CURRENT_PIC = NEXT_PIC;
    NEXT_PIC = (NEXT_PIC + 1) % PIC_LIST.length;
    slideShowPlay();
  }, 6000);
}

$(_=> {
  handleEvent();
  renderMainImage();
});
