jQuery(document).ready(function () {
    $.ajax({
        type: "get", //jquey是不支持post方式跨域的
        async: false,
        url: "http://demi-panda.duoshuo.com/api/sites/listTopThreads.jsonp?num_items=11&callback=?", //跨域请求的URL
        dataType: "jsonp",
        //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonp: "jsoncallback",
        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        jsonpCallback: "topCallback",
        //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        success: function (json) {
            listTopJson = eval(json.response);
            console.log("duoshuo热门文章数据获取完成...");
            initTopList(listTopJson);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    $.ajax({
        type: "get", //jquey是不支持post方式跨域的
        async: false,
        url: "http://demi-panda.duoshuo.com/api/sites/listRecentPosts.jsonp?num_items=10&callback=?", //跨域请求的URL
        dataType: "jsonp",
        //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonp: "jsoncallback",
        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        jsonpCallback: "callback",
        timeout: 3000,
        //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        success: function (json) {
            listRecentJson = eval(json.response);
            console.log("duoshuo最新评论数据获取完成...");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    $.ajax({
        type: "get", //jquey是不支持post方式跨域的
        async: false,
        url: "http://demi-panda.duoshuo.com/api/sites/listVisitors.jsonp?num_items=20&callback=?", //跨域请求的URL
        dataType: "jsonp",
        //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonp: "jsoncallback",
        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        jsonpCallback: "jsonpCallback",
        //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        success: function (json) {
            listVisitor = eval(json.response);
            console.log("duoshuo最近访客数据获取完成...");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
});

function initTopList(listTopJson) {
    var newtops = "";
    if (listTopJson != null && listTopJson.length > 0) {
        for (var i = 1; i < listTopJson.length; i ++) {
            var validURL;
            var validTitle;
            if(listTopJson[i].url != null && listTopJson[i].url.match("demi-panda.com") != null){
                validURL = listTopJson[i].url;
            } else {
                validURL = listTopJson[i].url.replace("\/\/","\/\/demi-panda.com");
            }
            newtops += "<li><a href='"+validURL+"'>"+listTopJson[i].title+"</a>";
            newtops += "<div class='clear'>";
            newtops += "</div>";
            newtops += "<span class='date'><i class='icon-calendar'></i> "+listTopJson[i].created_at.split("T")[0]+"</span>";
            newtops += "<span class='comment'><i class='icon-comment'></i><a href='"+validURL+"/#comments' title='"+listTopJson[i].title+" 的评论'>"+listTopJson[i].comments+" 条评论</a></span>";
            newtops += "</li>";

        }
    }
    $('#ds-top-threads').html(newtops);
    console.log("initTopList successfully...");
}

/**
 * 验证是否为中文
 * @param str
 * @returns {boolean}
 */
function isChn(str){
    var reg = /^[u4E00-u9FA5]+$/;
    if(!reg.test(str)){
        return false;
    }
    return true;
}