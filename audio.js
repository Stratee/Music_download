javascript:!function() {
    if (window._A_A_A_A_) {
        alert('Already installed');
        return;
}
window._A_A_A_A_ = true;
var _Audio_prototype_play=Audio.prototype.play;
var _PrevAudio = null;
var div = document.createElement('div');
div.style = "position:fixed;left:0;top:0;right:auto;bottom:auto;z-index:2000000000;border:5px solid black;background:white;color:black";
var a = document.createElement('a');
a.appendChild(document.createTextNode('?'));
a.style = "display:block;color:inherit;padding:.1em;max-height:1.2em;line-height:1.2em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;";
div.appendChild(a);
var audioPlacement = document.createElement('div');
div.appendChild(audioPlacement);
var input = document.createElement('input');
input.onfocus = function () {
    input.select();
};
div.appendChild(input);
Audio.prototype.play = function () {
    document.body.appendChild(div);
    if (_PrevAudio && _PrevAudio.parentNode) {
        _PrevAudio.parentNode.removeChild(_PrevAudio);
}
_PrevAudio = this;
audioPlacement.appendChild(_PrevAudio);
_PrevAudio.setAttribute('style',"display:block!important");
_PrevAudio.setAttribute('controls', 'controls');
a.style.width = _PrevAudio.clientWidth + 'px';
input.style.width = _PrevAudio.clientWidth + 'px';
a.download = '';
var src = _PrevAudio.src;
if (!src) {
src = _PrevAudio.querySelector('source[type="audio/mp3"]') || _PrevAudio.querySelector('source["type=audio/mpeg"]') || _PrevAudio.querySelector('source["type=audio/mp4"]') || _PrevAudio.querySelector('source]');
if (src) {
src = src.src;
}
}
a.firstChild.data = src;
a.href = src;
input.value = '';
setTimeout(getTitle, 100);
return _Audio_prototype_play.apply(this, arguments);
};
var getText = function (el, txt) {
txt = txt || [];
for (var i=0; i<el.childNodes.length; i++) {
switch (el.childNodes[i].nodeType) {
case Node.ELEMENT_NODE:
getText(el.childNodes[i], txt);
break;
case Node.TEXT_NODE:
txt.push(el.childNodes[i].data);
break;
}
}
return txt.join('');
};
var getTitleFromElements = function (artistSelector, titleSelector) {
var p = document.querySelector(artistSelector);
if (p) {
p = getText(p).replace(/^\s*[-–]\s*|\s*[-–]\s*$/g, '').trim();
}
var t = document.querySelector(titleSelector);
if (t) {
t = getText(t).replace(/^\s*[-–]\s*|\s*[-–]\s*$/g, '').trim();
}
return (p?p:'Unknown Artist') + ' - ' + (t?t:'Unknown Song');
};
var getTitle = function () {
var title = 'Unknown Artist - Unknown Song';
if (/(\.|^)yandex\.ru$/.test(document.location.host)) {
title = getTitleFromElements('.player-controls__track-container .track__artists', '.player-controls__track-container .track__title');
} else if (/(\.|^)vk\.com$/.test(document.location.host)) {
title = getTitleFromElements('.audio_page_player_title_performer', '.audio_page_player_title_song');
} else if (/(\.|^)ok\.ru$/.test(document.location.host)) {
title = getTitleFromElements('.mus_player_artist', '.mus_player_song');
} else if (/(\.|^)zvooq\.com$/.test(document.location.host)) {
title = getTitleFromElements('.topPanelTimeline-intitleArtist', '.topPanelTimeline-intitleRelease');
} else if (/(\.|^)karaoke\.ru$/.test(document.location.host)) {
title = getTitleFromElements('.player-karaoke-ru-copyrights-artists, .select-song .player-song-authors', '.player-karaoke-ru-copyrights-title, .select-song .player-song-title');
title += ' (караоке)';
} else if (/(\.|^)itunes\.apple\.com$/.test(document.location.host)) {
title = getTitleFromElements('.is-now-playing .bordered-list__subtitle, .product-hero-gutter .t-hero-headline', '.is-now-playing .bordered-list__title, .product-hero-gutter .is-active .table__row__name');
}
input.value = title;
_PrevAudio.download = a.download = title + '.mp3';
}
}();﻿
