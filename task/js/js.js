/**
 * Created by zhouyang on 17/7/12.
 */


//选国家后出现对应城市，失去焦点后隐藏
//e的作用域
window.onload=function(){
    //下拉菜单
    searchInput.addEventListener("click", function(e) {
        e = e||event;
        if (e.target.nodeName.toLowerCase() == "input") {
            var a=e.target;
            e.target.nextElementSibling.style.display="block";
            e.target.nextElementSibling.addEventListener("click", function(e) {
                if (e.target.nodeName.toLowerCase() == "p") {
                    a.value=e.target.innerHTML;
                    e.target.parentNode.parentNode.style.display="none";
                }
            })
        }
    })

    document.getElementById("dot1").onclick=function(){
        document.getElementById("b-con").style.transform="translateY(0px)";


    };
    document.getElementById("dot2").onclick=function(){
        document.getElementById("b-con").style.transform="translateY(-180px)";

    };
    document.getElementById("dot3").onclick=function(){
        document.getElementById("b-con").style.transform="translateY(-360px)";

    };
}
//



