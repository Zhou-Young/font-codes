/**
 * Created by zhouyang on 17/7/21.
 */
window.onload=function(){
    var banner=document.getElementById("banner");
    var bannerImg=document.getElementById("bannerImg");
    var btnDot=document.getElementById("btnDot").getElementsByTagName("span");
    var btnLeft=document.getElementById("btnLeft");
    var btnRight=document.getElementById("btnRight");
    var width=bannerImg.scrollWidth/6;
    var len=4;
    var index=1;
    var interval=10000;
    var anim=false;    //防止在图片切换的途中点击按钮
    function re(){
        bannerImg.style.left=-document.body.clientWidth+"px"; //获取屏幕宽度
        btnDot[index].className="";
    }
    re();
    function move(n){
        var left=parseInt(bannerImg.style.left)+n;  //需要移动的距离
        var time=200;  //设置动画时间300ms
        var intrv=10; //隔多久刷新一次
        var speed=n/(time/intrv); //刷新速度
        anim=true;
        function go(){
            if((speed>0&&left>parseInt(bannerImg.style.left))||(speed<0&&left<parseInt(bannerImg.style.left))){
                bannerImg.style.left=parseInt(bannerImg.style.left)+speed+"px";
                setTimeout(go,intrv); //设置定时器，隔intrv时间执行一次go
            }
            else{
                bannerImg.style.left=left+"px";
                if(left>-width){
                    bannerImg.style.left=-width*len+"px";
                }
                else if(left<-width*len){
                    bannerImg.style.left=-width+"px";   //判断超过之后回到第一个
                }
                anim=false;
            }
        }
        go();

    }
    function showbtn(){    //改变按钮样式
        for(var i=0;i<btnDot.length;i++){
            if(btnDot[i].className="spandot active"){
                btnDot[i].className="spandot";
            }
        }
        if(index!=4){
            btnDot[index-1].className="active";
            btnDot[index].className="";
        }
        else{
            btnDot[index-1].className="active";
        }

    }
    btnLeft.onclick=function(){
        if (anim) {
            return;
        }
        index-=1;  //判断点击到了哪个按钮
        if(index<1){
            index=4;
        }
        move(width);
        showbtn();
    };
    btnRight.onclick=function(){
        if (anim) {
            return;
        }
        index+=1;
        if(index>4){
            index=1;
        }
        move(-width);
        showbtn();
    };
    for(var j=0;j<btnDot.length;j++){   //点击按钮切换图片
        btnDot[j].onclick=function(){
            if (anim) {
                return;
            }
            if(this.className=="active"){
                return false;
            }

            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -width * (myIndex - index);
            index = myIndex;
            move(offset);
            showbtn();

        }

    }
    function play() {    //设置自动播放
        timer = setTimeout(function () {
            btnRight.onclick();
            play();
        }, interval);
    }
    function stop() {
        clearTimeout(timer);
    }
    banner.onmouseover=stop;  //鼠标移入停止自动播放
    banner.onmouseout=play;
    play();

    //
    var newsUl=document.getElementById("newsUl");
    var newsBtnL=document.getElementById("newsBtnL");
    var newsBtnR=document.getElementById("newsBtnR");
    var newsLi=document.getElementById("newsUl").getElementsByTagName("li");
    var n=Math.ceil(newsLi.length/6);
    var newsIndex=1;
    newsBtnL.onclick=function(){
        newsIndex-=1;
        if(newsIndex<1){
            newsIndex=1;
            return false;
        }
        newsUl.style.top=parseInt(newsUl.style.top)+690+"px";

    }
    newsBtnR.onclick=function(){
        newsIndex+=1;
        if(newsIndex>n){
            newsIndex=n;
            return false;
        }
        newsUl.style.top=parseInt(newsUl.style.top)-690+"px";

    }
    //
    var compCycleUl=document.getElementById("competition-cycle-ul");
    var compCycleBtn=document.getElementById("competition-cycle-btn").getElementsByTagName("li");
    var competitionCycle=document.getElementById("competitionCycle");
    var comnum=0;
    for(var p=0;p<compCycleBtn.length;p++){   //点击按钮切换图片
        compCycleBtn[p].onclick=function(){
            var ComIndex = parseInt(this.getAttribute('index'))-1;
            compCycleUl.style.left=-850*ComIndex+'px';
            showCombtn(ComIndex);
            comnum=ComIndex;
        }

    }

    function playnext(){
        compCycleUl.style.left=-850*comnum+'px';
        showCombtn(comnum);
        comnum++;
        if(comnum==5){
            comnum=0;
        }
    }
    function complay(){

        timer1=setTimeout(function(){
            playnext();

            complay();
        },3000);
    }
    function comstop(){
        clearTimeout(timer1);
    }
    competitionCycle.onmouseover=comstop;
    competitionCycle.onmouseout=complay;
    complay();
    function showCombtn(index){    //改变按钮样式
        for(var i=0;i<compCycleBtn.length;i++){
            if(compCycleBtn[i].className="comactive"){
                compCycleBtn[i].className="";
            }
        }
        compCycleBtn[index].className="comactive";


    }
    //
    window.onscroll = function(){
        if((document.body.scrollTop>860)||(document.documentElement.scrollTop>860)){
            document.getElementById("asideNav").style.visibility="visible";
        }
        else{
            document.getElementById("asideNav").style.visibility="hidden";
        }
    }
    //
    var hotblogUl=document.getElementById("hotblogUl");
    var hotblogL=document.getElementById("hotblogLeft");
    var hotblogR=document.getElementById("hotblogRight");
    var hotblogLi=document.getElementById("hotblogUl").getElementsByTagName("li");
    var hotblogN=Math.ceil(hotblogLi.length/4);
    var hotblogIndex=1;
    hotblogL.onclick=function(){
        hotblogIndex-=1;
        if(hotblogIndex<1){
            hotblogIndex=1;
            return false;
        }
        hotblogUl.style.left=parseInt(hotblogUl.style.left)+1184+"px";

    }
    hotblogR.onclick=function(){
        hotblogIndex+=1;
        if(hotblogIndex>hotblogN){
            hotblogIndex=hotblogN;
            return false;
        }
        hotblogUl.style.left=parseInt(hotblogUl.style.left)-1184+"px";

    }
    //
    var hotblogUl1=document.getElementById("hotblogUl1");
    var hotblogL1=document.getElementById("hotblogLeft1");
    var hotblogR1=document.getElementById("hotblogRight1");
    var hotblogLi1=document.getElementById("hotblogUl1").getElementsByTagName("li");
    var hotblogN1=Math.ceil(hotblogLi1.length/4);
    var hotblogIndex1=1;
    hotblogL1.onclick=function(){
        hotblogIndex1-=1;
        if(hotblogIndex1<1){
            hotblogIndex1=1;
            return false;
        }
        hotblogUl1.style.left=parseInt(hotblogUl1.style.left)+1184+"px";

    }
    hotblogR1.onclick=function(){
        hotblogIndex1+=1;
        if(hotblogIndex1>hotblogN1){
            hotblogIndex1=hotblogN1;
            return false;
        }
        hotblogUl1.style.left=parseInt(hotblogUl1.style.left)-1184+"px";

    }
};