//所有的文章
var posts;
//多说数据
var duoshuo;
//多说thread_key
var threads;

/**
 * 初始化获取archives.json数据
 */
function initJsonData(url) {
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
            threads = new Array(posts.length);
            for (var i = 0; i < posts.length; i ++) {
                threads[i] = posts[i].UUID;
            }
            console.log(url+ "异步数据获取完成, posts.size : " + posts.length + " threads_key : " + threads.length);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
/***
 *  根据threads获取当前页的多说评论数据
 * @param threads 多说thread_keys
 * @param currentPage 当前页面
 */
function getDuoShuoData(threads, currentPage, countPerPage) {
    $.ajax({
        type: "get", //jquey是不支持post方式跨域的
        async: false,
        url: "http://api.duoshuo.com/threads/counts.jsonp?short_name=demi-panda&threads=" + threads.toString() + "&callback=?", //跨域请求的URL
        dataType: "jsonp",
        //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
        jsonp: "jsoncallback",
        //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        jsonpCallback: "success_jsonpCallback",
        timeout: 5000,
        //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
        success: function (json) {
            duoshuo = eval(json.response);
            console.log("duoshuo数据获取完成...");
            var content = pageselectCallback(currentPage, countPerPage);
            $('#content').html(content);
            console.log("初始化第"+currentPage+"页数据 OK...");
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
 * @param currentPage  当前页
 * @param countPerPage 每页显示的数量
 * @returns {Array}
 */
function getCurrentPageThreads(currentPage, countPerPage) {
    var start = (currentPage - 1 )  * countPerPage;
    var rows = posts.length - start < countPerPage ? posts.length - start : countPerPage;
    var currentThreads = new Array(rows);
    var position = 0;
    for(var i= start;i< posts.length;i++) {
        currentThreads[position] = threads[i];
        position ++;
        if (position >= rows) {
            break;
        }
    }
    console.log("page : " + currentPage + " currentThreads : " + currentThreads);
    return currentThreads;
}

function getStartedInitialization(countPerPage) {
    if (countPerPage == null) {
        countPerPage = 20;
    }
    var options = {
        currentPage: 1,
        totalPages: posts.length % countPerPage == 0 ? posts.length / countPerPage : parseInt(posts.length / countPerPage) + 1,
        onPageClicked: function(e,originalEvent,type,newPage){
            //获取第N页的threads
            var currentThreads = getCurrentPageThreads(newPage,countPerPage);
            //同步获取评论数据
            getDuoShuoData(currentThreads, newPage, countPerPage);
        }
    }
    if (options.currentPage == 1) {
        //获取第一页的threads
        var currentThreads = getCurrentPageThreads(1,countPerPage);
        getDuoShuoData(currentThreads, 1, countPerPage);
    }
    $('#page-selection').bootstrapPaginator(options);

}

function pageselectCallback(currentPage, countPerPage) {
    var newcontent = "";
    if( currentPage == "" || parseInt(currentPage) <= 0 ) {
        currentPage = 1;
    }
    var start = (currentPage - 1 )  * countPerPage;
    var max_elem = Math.min((currentPage + 1) * countPerPage, posts.length);
    var position = 0;
    var rows = posts.length - start < countPerPage ? posts.length - start : countPerPage;
    for(var i= start;i< max_elem;i++)
    {
        //获取多说评论数
        var comments = "";
        if (duoshuo == null || duoshuo.length <= 0) {
            comments = "暂无评论";
        } else {
            comments = duoshuo[posts[i].UUID].comments > 0 ? duoshuo[posts[i].UUID].comments + " 条评论" : "暂无评论";
        }
        newcontent += "<article class='blog-post'>";
        newcontent += "<div class='post-heading'><h3><a href='"+ posts[i].url +"'>"+posts[i].title+"</a></h3></div>";
        newcontent += "<div class='row'>";
        newcontent += "<div class='span3'>"; //span3 start
        if (posts[i].images > 1) {
            newcontent += "<div class='flexslider'><ul class='slides'>";
            for (var j = 0; j < posts[i].images.length; j ++) {
                newcontent += "<li><a href='"+posts[i].url+"'><img src='"+posts[i].images[j]+"' alt='"+posts[i].title+"' /></a></li>";
            }
            newcontent += "</ul></div>";
        } else {
            newcontent += "<div class='post-image'>";
            if (posts[i].images.length > 0) {
                newcontent += "<a href='"+posts[i].url+"'><img src='"+posts[i].images[0]+"' alt='"+posts[i].title+"'/></a>";
            } else {
                newcontent += "<blockquote>"+posts[i].description+"</blockquote>";
            }
            newcontent += "</div>";
        }
        newcontent += "</div>";//span3 end
        newcontent += "<div class='span5'><ul class='post-meta'>"
        newcontent += "<li class='first'><i class='icon-calendar'></i><span>"+posts[i].date+"</span></li>";
        newcontent += "<li><i class='icon-list-alt'></i><a href='"+posts[i].url+"#comments' title='"+posts.title+"' 的评论'>"+comments+"</a></li>";
        newcontent += "<li class='last'><i class='icon-tags'></i><span>";
        if (posts[i].tags.length > 0) {
            for (var t = 0; t < posts[i].tags.length; t ++) {
                newcontent += "<a href='"+window.location.host+"/tags/"+jQuery.trim(posts[i].tags[t])+"' class='text' title='"+posts[i].tags[t]+"' rel='category tag'>"+posts[i].tags[t]+"</a>&nbsp;";
            }
        }
        newcontent += "</span></li></ul>";//ul end
        newcontent += "<div class='clearfix'></div>";
        newcontent += "<p>"+posts[i].description+"</p>";
        newcontent += "<a href='"+posts[i].url+"'><button class='btn btn-small btn-success' type='button'>Read more</button></a>";
        newcontent += "</div></div></article>";
        position ++;
        if (position >= rows) {
            break;
        }
    }
    return newcontent;
}
