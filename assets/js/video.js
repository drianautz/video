// Youtube Video
var videoId;
var player;
var overlay;
var done = false;

$(document).on('click', '.start-video', function () {
    overlay = $(this);
    videoId = $(this).attr('data-video');
    $('#video_container').html("<div id='player'></div>");
    if(!player){
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    else{
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
});

$(document).on('click', '.video__thumbnail-item', function () {
    var video = $(this).attr('data-video');
    if(player){
        stopVideo();
    }
    $('.video-title').html($(this).attr('data-title'));
    $('.start-video').attr('data-video',video);
    $('.videoWrapper').css('background-image',"url('https://img.youtube.com/vi/"+video+"/maxresdefault.jpg')");
    $('#video_container').hide();
    $('.start-video').show();
    $('.video-title').removeClass('active');
    setTimeout(function(){ $('.video-title').addClass('active'); }, 100);
});

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if(event.data == 3){
        $('#video_container').show();
        $('.videoWrapper').css('background-image','none');
        $('.start-video').hide();
        $('.video-title').removeClass('active');
    }
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}
// End Youtube Video



// Menu Filter Drpdown
$('.init.filter-menu-item').on('click', function(){
    if($(this).find('i').hasClass('fa-angle-down')){
        resetDropDown();
        $(this).find('i').removeClass('fa-angle-down');
        $(this).find('i').addClass('fa-angle-up');
        $(this).addClass('choose');
        $(this).siblings('.filter-menu-item-child').show();
    }
    else{
        $(this).find('i').removeClass('fa-angle-up');
        $(this).find('i').addClass('fa-angle-down');
        $(this).removeClass('choose');
        $(this).siblings('.filter-menu-item-child').hide();
    }
    
});

$('.filter-menu-item-child .filter-menu-item:not(.user-input):not(.searchable)').on('click', function(){
    var value = $(this).attr('data-value');
    $(this).parent().siblings('.init.filter-menu-item').find('a span').html(value);
    resetDropDown();
});

$('.filter-menu-item-child .filter-menu-item.searchable').on('click', function(){
    var value = $(this).attr('data-value');
    $(this).parents().map(function(){
        if($(this).hasClass('filter-menu-item-child')){
            var label = $(this).siblings('.init.filter-menu-item').find('a span');
            $(label).html($(label).attr('data-base-string')+': '+value);
        }
    });
    resetDropDown();
});

$('.filter-year-set').on('click', function(){
    var val = $('.filter-year').val();
    if(val>=0 && val<=9999){
        $(this).parent().parent().parent().siblings('.init.filter-menu-item').find('a span').html('Year : '+val);
        resetDropDown();
    }
    else{
        $(this).parent().parent().parent().siblings('.init.filter-menu-item').find('a span').html('Year');
        $('.filter-year').val(''); 
    }
});

$('.filter-year').keypress(function(e){
    if(e.keyCode == 13) $('.filter-year-set').click();
});

$('.filter-committee').keyup(function(e){
    var input, filter, li, a, i;
    input = $(this);
    filter = input.val().toUpperCase();
    li = $('#list_item_committee').find('li');
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
});

$(document).on('click', function(e) {
    if($(this).hasClass('.init.filter-menu-item')) resetDropDown();
    else{
        var reset = true;
        var el = e.target.parentElement;
        while(el.tagName != 'BODY'){
            if($(el).hasClass('filter-menu-item')) {
                reset = false;
                break;
            }
            el = el.parentElement;
        }
        if(reset) resetDropDown();
    }
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        resetDropDown();
   }
});

function resetDropDown(){
    $('.filter-menu-item-child').hide();
    $('.init.filter-menu-item').removeClass('choose');
    $('.init.filter-menu-item').find('i').removeClass('fa-angle-up');
    $('.init.filter-menu-item').find('i').addClass('fa-angle-down');
}
// End Menu Filter Drpdown



