/**
 * Created by zhouyang on 17/8/7.
 */
/*
    步骤：
    1、实现简单反转控制
    2、实现海报的批量导出
    3、实现第一次排序--随机选取一个海报在中间
    4、其余海报随机排列在两侧
    5、控制条的实现
    6、控制条的翻转；如何将按钮和图片关联；
    扩展：圆形排列
*/
//公用函数--获取节点
function g(elem){
    if(elem.substring(0,1)=='.'){
        return document.getElementsByClassName(elem.substr(1));
    }
    else{
        return document.getElementById(elem.substr(1));
    }

}
//点击转换
function turn(a){
    var acl= a.className;
    var photoA=g('.photo');
    var n= a.id.split('_')[1];//获取当前元素id后数值
    //点击按钮时判断图片是否在中间，不在则使其居中后退出，在则进行翻转
    if(/photo-center/.test(acl)){
        if(/photo-turn-front/.test(acl)){
            acl=acl.replace(/photo-turn-front/,'photo-turn-back');
            g('#i_'+n).className +=' icon-back';
        }
        else{
            acl=acl.replace(/photo-turn-back/,'photo-turn-front');
            g('#i_'+n).className=g('#i_'+n).className.replace(/icon-back/,' ');
        }
        return a.className=acl;
    }
    else{
        return resort(n);
    }


}
//数据导入,输出所有海报
function putPhoto(){
    var mainhtml=[];
    //data.img
    var photoHtml=g('#wrap').innerHTML;
    var photoNav=[];
    for(var i=0;i<data.length;i++){
        var _html=photoHtml
            .replace('{{index}}',i)
            .replace('{{img}}',data[i].img+'.jpg')
            .replace('{{caption}}',data[i].caption)
            .replace('{{desc}}',data[i].desc);
        mainhtml.push(_html);
        //生成按钮
        var _photoNav='<span class="icon" onclick=turn(g("#photo_'+i+'")) id="i_'+i+'"></span>'

        photoNav.push(_photoNav);
    }
    console.log('a'+photoNav.join(' '));
    g('#wrap').innerHTML= mainhtml.join(' ');
    //将按钮打包加入html文档中
    g('#wrap').innerHTML +='<div id="nav" class="nav">'+photoNav.join(' ')+'<div>';
    //随机排序输出海报
    resort(random(0,data.length-1));
}
putPhoto();
//通用函数，生成范围内随机数
function random(min,max){
    var ran;
    ran=Math.ceil(Math.random()*(max-min)+min);
    return parseInt(ran);
}
//排序海报
function resort(n){
    //left top
    var _photoArr=g('.photo');
    console.log(_photoArr);
    var photoArr=[];
    for(var s=0;s<_photoArr.length;s++){
        //清除默认样式
        _photoArr[s].className=_photoArr[s].className.replace(/\s*photo-center\s*/,' ');
        //要把top、left、rotate也清除掉，不然这些样式会覆盖photo-center的样式
       _photoArr[s].style.top='';
        _photoArr[s].style.left='';
        _photoArr[s].style['transform']=_photoArr[s].style['-webkit-transform']='';//脚本中浏览器兼容

        photoArr.push(_photoArr[s]);
    }

    photoArr[n].className += ' photo-center';
    photoArr.splice(n,1);
    //将所有图片分为左右两边
    var photoLeft=photoArr.slice(0,Math.ceil(photoArr.length/2));
    var photoRight=photoArr.slice(Math.ceil(photoArr.length/2),photoArr.length);
    var wrapW=g('#wrap').clientWidth;
    var wrapH=g('#wrap').clientHeight;
    var photoW=g('#photo_1').clientWidth;
    var photoH=g('#photo_1').clientHeight;
    for(var j=0;j<photoLeft.length;j++){
        photoLeft[j].style.top=random(0,wrapH-photoH)+photoH/2+'px';
        photoLeft[j].style.left=random(0,wrapW/2-photoW*3/2)+photoW/2+'px';
        photoLeft[j].style.transform='rotate('+random(-130,130)+'deg)';
    }
    for(var k=0;k<photoRight.length;k++){
        photoRight[k].style.top=random(0,wrapH-photoH)+photoH/2+'px';
        photoRight[k].style.left=random(wrapW/2+photoW/2,wrapW-photoW)+photoW/2+'px';
        photoRight[k].style.transform='rotate('+random(-130,130)+'deg)';

    }
    //控制按钮
    var navs=g('.icon');
    for(var c=0;c<navs.length;c++){
        navs[c].className = navs[c].className.replace(/\s*icon-current\s*/,' ')
            .replace(/\s*icon-back\s*/,' ');
    }
    g('#i_'+n).className +=' icon-current';
    //console.log(g('#i_'+n).className);
}
//海报左右分区
function range(){

}