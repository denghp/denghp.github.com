/**
 * 初始化获取archives.json数据
 */
function initJsonData(url) {
    var posts;
    var allKeys;
    $.ajax({
        type: "get", //jquey是不支持post方式跨域的
        async: false,
        url: url, //跨域请求的URL
        dataType: "json",
        //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonp: "jsoncallback",
        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        jsonpCallback: "success_jsonpCallback",
        //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        success: function (json) {
            posts = json;
            allKeys = new Array(posts.length);
            for (var i = 0; i < posts.length; i++) {
                allKeys[i] = posts[i].UUID;
            }
            console.log(url + "数据获取完成, posts.size : " + posts.length + " threads_key : " + allKeys.length);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    return new Array(posts, allKeys)
}

function initTagsJsonData(url) {
    var tags;
    $.ajax({
        type: "get", //jquey是不支持post方式跨域的
        async: false,
        url: "/json/tags.json", //跨域请求的URL
        dataType: "json",
        //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonp: "jsoncallback",
        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        jsonpCallback: "success_jsonpCallback",
        //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        success: function (json) {
            tags = json;
            console.log("tags.json数据获取完成, tags.length : " + tags.length);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    return tags;
}

/***
 *  根据threads获取当前页的多说评论数据
 * @param 所有文章
 * @param currentKeys 當前需要獲取根據文章ID獲取
 * @param currentPage 当前页面
 */
function getDuoShuoData(posts, currentKeys, currentPage, countPerPage) {
    $.ajax({
        type: "get", //jquey是不支持post方式跨域的
        async: false,
        url: "http://api.duoshuo.com/threads/counts.jsonp?short_name=demi-panda&threads=" + currentKeys.toString() + "&callback=?", //跨域请求的URL
        dataType: "jsonp",
        //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonp: "jsoncallback",
        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        jsonpCallback: "success_jsonpCallback",
        timeout: 5000,
        //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        success: function (json) {
            var duoshuo = eval(json.response);
            console.log("duoshuo数据获取完成...");
            var content = pageselectCallback(posts, duoshuo, currentPage, countPerPage);
            $('#content').html(content);
            $("html, body").animate({ scrollTop: 0 }, 1000);
            console.log("初始化第" + currentPage + "页数据 OK...");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
            duoshuo = null;
        }
    });
}
/**
 * 获取当前页threads_keys
 * @param allKeys 所有文章唯一ID
 * @param currentPage  当前页
 * @param countPerPage 每页显示的数量
 * @returns {Array}
 */
function getCurrentPageThreads(allKeys, currentPage, countPerPage) {
    var start = (currentPage - 1 ) * countPerPage;
    var rows = allKeys.length - start < countPerPage ? allKeys.length - start : countPerPage;
    var currentThreads = new Array(rows);
    var position = 0;
    for (var i = start; i < allKeys.length; i++) {
        currentThreads[position] = allKeys[i];
        position++;
        if (position >= rows) {
            break;
        }
    }
    //console.log("page : " + currentPage + " currentThreads : " + currentThreads);
    return currentThreads;
}

function getStartedInitialization(posts, allKeys, countPerPage) {
    getStartedInitialization(posts, allKeys, countPerPage, null);
}

function getStartedInitialization(posts, allKeys, countPerPage, tagName) {
    if (countPerPage == null || countPerPage == undefined) {
        countPerPage = 20;
    }
    var options = {
        currentPage: 1,
        //計算總頁數
        totalPages: posts.length % countPerPage == 0 ? posts.length / countPerPage : parseInt(posts.length / countPerPage) + 1,
        onPageClicked: function (e, originalEvent, type, newPage) {
            //获取第N页的threads
            var currentThreads = getCurrentPageThreads(allKeys, newPage, countPerPage);
            //同步获取评论数据
            getDuoShuoData(posts, currentThreads, newPage, countPerPage);
        }
    }
    if (tagName != null && tagName != undefined ) {
        if (options.currentPage == 1) {
            //获取第一页的threads
            var currentThreads = getCurrentPageThreads(allKeys, 1, countPerPage);
            getDuoShuoData(posts, currentThreads, 1, countPerPage);
        }
    }
    $('#page-selection').bootstrapPaginator(options);

}

function pageselectCallback(posts, duoshuo, currentPage, countPerPage) {
    var newcontent = "";
    if (currentPage == "" || parseInt(currentPage) <= 0) {
        currentPage = 1;
    }
    var start = (currentPage - 1 ) * countPerPage;
    var max_elem = Math.min((currentPage + 1) * countPerPage, posts.length);
    var position = 0;
    var rows = posts.length - start < countPerPage ? posts.length - start : countPerPage;
    for (var i = start; i < max_elem; i++) {
        //获取多说评论数
        var comments = "";
        if ( duoshuo != null && duoshuo[posts[i].UUID] != undefined && duoshuo[posts[i].UUID].comments != undefined ) {
            comments = duoshuo[posts[i].UUID].comments > 0 ? duoshuo[posts[i].UUID].comments + " 条评论" : "暂无评论";
        } else {
            comments = "暂无评论";
        }
        newcontent += "<article class='blog-post'>";
        newcontent += "<div class='post-heading'><h3><a href='" + posts[i].url + "'>" + posts[i].title + "</a></h3></div>";
        newcontent += "<div class='row'>";
        newcontent += "<div class='span3'>"; //span3 start
        /**
         if (posts[i].images.length > 1) {
            newcontent += "<div class='post-slider'><div class='flexslider'><ul class='slides'>";
            for (var j = 0; j < posts[i].images.length; j ++) {
                newcontent += "<li><a href='"+posts[i].url+"'><img src='"+posts[i].images[j]+"' alt='"+posts[i].title+"' /></a></li>";
            }
            newcontent += "</ul></div></div>";
        } else {
            newcontent += "<div class='post-image'>";
            if (posts[i].images.length > 0) {
                newcontent += "<a href='"+posts[i].url+"'><img src='"+posts[i].images[0]+"' alt='"+posts[i].title+"'/></a>";
            } else {
                newcontent += "<blockquote>"+posts[i].description+"</blockquote>";
            }
            newcontent += "</div>";
        }**/
        newcontent += "<div class='post-image'>";
        if (posts[i].images.length > 0) {
            newcontent += "<a href='" + posts[i].url + "'><img class='lazy' src='http://demi-panda.oss.aliyuncs.com/assets/img/grey.gif' data-original='" + posts[i].images[0] + "' width='270' height='203' alt='" + posts[i].title + "'/></a>";
        } else {
            newcontent += "<blockquote>" + posts[i].description + "</blockquote>";
        }
        newcontent += "</div>";

        newcontent += "</div>";//span3 end
        newcontent += "<div class='span5'><ul class='post-meta'>"
        newcontent += "<li class='first'><i class='icon-calendar'></i><span>" + posts[i].date + "</span></li>";
        newcontent += "<li><i class='icon-list-alt'></i><a href='" + posts[i].url + "#comments' title='" + posts[i].title + "' 的评论'>" + comments + "</a></li>";
        newcontent += "<li class='last'><i class='icon-tags'></i><span>";
        if (posts[i].tags.length > 0) {
            for (var t = 0; t < posts[i].tags.length; t++) {
                newcontent += "<a href='/tags/index.html?name=" + posts[i].tags[t] + "' class='text' title='" + posts[i].tags[t] + "' rel='category tag'>" + posts[i].tags[t] + "</a>&nbsp;";
            }
        }
        newcontent += "</span></li></ul>";//ul end
        newcontent += "<div class='clearfix'></div>";
        newcontent += "<p>" + posts[i].description + "</p>";
        newcontent += "<a href='" + posts[i].url + "'><button class='btn btn-small btn-success' type='button'>Read more</button></a>";
        newcontent += "</div></div></article>";
        position++;
        if (position >= rows) {
            break;
        }
    }
    return newcontent;
}

function getTagParameter() {
    var urlItems = window.location.href.split("?");
    var params = "";
    if (urlItems != null && urlItems.length > 1) {
        params = urlItems[1];
        return params.split("=")[1];
    } else {
        return null;
    }

}

function isChinese(str) {
    var re = /[^\u4e00-\u9fa5]/;
    if (re.test(str)) return false;
    return true;
}
