var videoPlayer = document.getElementsByClassName('video-player')[0];
var video = document.getElementsByTagName('video')[0];
var menu = document.getElementsByClassName('menu')[0];
var play = document.getElementsByClassName('play')[0];
var time = document.getElementsByClassName('time')[0];
var progressBar = document.getElementsByClassName('progress-bar')[0]; //进度条
var quick = document.getElementsByClassName('quick')[0];
var quickList = document.getElementsByClassName('quick-list')[0];
var liList = quickList.getElementsByTagName('ul')[0].getElementsByTagName('li');
var sound = document.getElementsByClassName('sound')[0];
var soundList = document.getElementsByClassName('sound-list')[0];
var line = document.getElementsByClassName('line')[0];
var fullScreen = document.getElementsByClassName('full-screen')[0];

//是否已经全屏
var flag = false;

//初始化音量
video.volume = 0.5

menu.onmouseenter = function() {
    this.style.opacity = 1;
}

menu.onmouseleave = function() {
    this.style.opacity = 0;
}

play.onclick = function() {
    //paused：获取视频是否已暂停
    if (video.paused) {
        //视频播放
        video.play();
        play.innerHTML = '暂停';
    } else {
        //视频暂停
        video.pause();
        play.innerHTML = '播放';
    }
}

//进度条
progressBar.onmouseenter = function() {
    progressBar.classList.add('active');
}

progressBar.onmouseleave = function() {
    progressBar.classList.remove('active');
}

progressBar.onclick = function(e) {
    //获取自身的宽度
    var width = progressBar.clientWidth;
    //获取点击位置的宽度
    var location = e.layerX;

    //视频跳转到相应时间
    var targetTime = location / width * video.duration;
    video.currentTime = targetTime;
}

progressBar.getElementsByTagName('i')[0].onclick = function(e) {
    //阻止事件冒泡
    e.stopPropagation();
}

//倍速
quick.onclick = function() {
    quickList.style.display = 'block';
}

quickList.onmouseleave = function() {
    quickList.style.display = 'none';
}

//设置倍速播放
for (var i = 0; i < liList.length; i++) {
    var ele = liList[i];
    ele.index = i;
    ele.onclick = function() {
        switch (this.index) {
            case 0:
                //设置播放倍数
                video.playbackRate = 2;
                quick.innerHTML = 'X2.0';
                break;
            case 1:
                //设置播放倍数
                video.playbackRate = 1.5;
                quick.innerHTML = 'X1.5';
                break;
            case 2:
                //设置播放倍数
                video.playbackRate = 1.25;
                quick.innerHTML = 'X1.25';
                break;
            case 3:
                //设置播放倍数
                video.playbackRate = 1;
                quick.innerHTML = '倍速';
                break;
        }
    }
}

//音量
sound.onclick = function() {
    soundList.style.display = 'block';
}

soundList.onmouseleave = function() {
    soundList.style.display = 'none';
}

line.onclick = function(e) {
    //鼠标相对于事件源的横坐标
    var location = e.layerX;

    this.getElementsByTagName('span')[0].style.width = location + 'px';
    this.getElementsByTagName('i')[0].style.left = (location - 2) + 'px';

    //设置音量
    video.volume = location / 100;
}

line.getElementsByTagName('i')[0].onclick = function(e) {
    e.stopPropagation();
}

//全屏
fullScreen.onclick = function() {
    var dom = document.documentElement;

    if (!flag) {
        //设置页面全屏
        if (dom.requestFullscreen) {
            dom.requestFullscreen();
        } else if (dom.mozRequestFullScreen) {
            dom.mozRequestFullScreen();
        } else if (dom.webkitRequestFullscreen) {
            dom.webkitRequestFullscreen();
        } else if (dom.msRequestFullscreen) {
            dom.msRequestFullscreen();
        }

        //设置video全屏
        //window.screen.width：获取屏幕分辨率的宽度
        videoPlayer.style.width = window.screen.width + 'px';
        videoPlayer.style.height = window.screen.height + 'px';
        console.log(line.getElementsByTagName('i')[0].classList)

        fullScreen.getElementsByTagName('i')[0].classList.remove('icon-quanping');
        fullScreen.getElementsByTagName('i')[0].classList.add('icon-suoxiao');
        flag = true;
    } else {
        //页面退出全屏
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        videoPlayer.style.width = 1000 + 'px';
        videoPlayer.style.height = 500 + 'px';
        console.log(line.getElementsByTagName('i')[0].classList)

        fullScreen.getElementsByTagName('i')[0].classList.remove('icon-suoxiao');
        fullScreen.getElementsByTagName('i')[0].classList.add('icon-quanping');
        flag = false;
    }
}

setInterval(function() {
    //获取视频总时长（秒数）
    var totlaTime = video.duration;
    //获取视频当前播放时长
    var nowTime = video.currentTime;
    time.innerHTML = formatTime(nowTime) + ' / ' + formatTime(totlaTime);

    //进度条
    var width = nowTime / totlaTime * progressBar.clientWidth;
    progressBar.getElementsByTagName('div')[0].style.width = width + 'px';
    progressBar.getElementsByTagName('i')[0].style.left = width + 'px';
}, 1000);

//格式化时间
function formatTime(time) {
    var hour = parseInt(time / 3600);
    var minute = parseInt(time % 3600 / 60);
    var second = parseInt(time % 3600 % 60);
    var date;
    if (hour == 0) {
        if (minute == 0) {
            date = second >= 10 ? '00:' + second : '00:0' + second;
        } else {
            if (minute >= 10) {
                date = second >= 10 ? minute + ':' + second : minute + ':0' + second;
            } else {
                date = second >= 10 ? '0' + minute + ':' + second : '0' + minute + ':0' + second;
            }
        }
    } else {
        if (hour >= 10) {
            if (minute == 0) {
                date = second >= 10 ? hour + ':00:' + second : hour + ':00:0' + second;
            } else {
                if (minute >= 10) {
                    date = second >= 10 ? hour + ':' + minute + ':' + second : hour + ':' + minute + ':0' + second;
                } else {
                    date = second >= 10 ? hour + ':0' + minute + ':' + second : hour + ':0' + minute + ':0' + second;
                }
            }
        } else {
            if (minute == 0) {
                date = second >= 10 ? '0' + hour + ':00:' + second : '0' + hour + ':00:0' + second;
            } else {
                if (minute >= 10) {
                    date = second >= 10 ? '0' + hour + ':' + minute + ':' + second : '0' + hour + ':' + minute + ':0' + second;
                } else {
                    date = second >= 10 ? '0' + hour + ':0' + minute + ':' + second : '0' + hour + ':0' + minute + ':0' + second;
                }
            }
        }
    }
    return date;
}