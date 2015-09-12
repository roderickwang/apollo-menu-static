/**
 * Created by roderickWang on 9/12/15.
 */
function tinyxhr(params) {
    let {url, success, method, post, contenttype}=params;
    var requestTimeout, xhr;
    try {
        xhr = new XMLHttpRequest();
    } catch (e) {
        try {
            xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            if (console)console.log("tinyxhr: XMLHttpRequest not supported");
            return null;
        }
    }
    requestTimeout = setTimeout(function () {
        xhr.abort();
        success(new Error("tinyxhr: aborted by a timeout"), "", xhr);
    }, 5000);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;
        clearTimeout(requestTimeout);
        success(xhr.status != 200 ? new Error("tinyxhr: server respnse status is " + xhr.status) : false, xhr.responseText, xhr);
    };
    xhr.open(method ? method.toUpperCase() : "GET", url, true);

    //xhr.withCredentials = true;

    if (!post)
        xhr.send();
    else {
        xhr.setRequestHeader('Content-type', contenttype ? contenttype : 'application/x-www-form-urlencoded');
        xhr.send(post)
    }
}