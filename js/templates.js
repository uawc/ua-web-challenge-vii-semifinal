define(['jade'], function(jade) { if(jade && jade['runtime'] !== undefined) { jade = jade.runtime; }

this["JST"] = this["JST"] || {};

this["JST"]["comment"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (author, body, created_utc, score) {
buf.push("<div class=\"links\"><b>" + (jade.escape((jade_interp = author) == null ? '' : jade_interp)) + "</b> <b>" + (jade.escape((jade_interp = score) == null ? '' : jade_interp)) + " points</b> Posted " + (jade.escape((jade_interp = created_utc) == null ? '' : jade_interp)) + "</div><div class=\"content\">" + (jade.escape((jade_interp = body) == null ? '' : jade_interp)) + "</div><div class=\"subcomment\"></div>");}.call(this,"author" in locals_for_with?locals_for_with.author:typeof author!=="undefined"?author:undefined,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"created_utc" in locals_for_with?locals_for_with.created_utc:typeof created_utc!=="undefined"?created_utc:undefined,"score" in locals_for_with?locals_for_with.score:typeof score!=="undefined"?score:undefined));;return buf.join("");
};

this["JST"]["message"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (author, created_utc, id, num_comments, score, subreddit, thumbnail, title, url) {
buf.push("<legend class=\"rating\">>>> Rating: " + (jade.escape((jade_interp = score) == null ? '' : jade_interp)) + " <<<</legend>");
if ( thumbnail)
{
buf.push("<a" + (jade.attr("href", url, true, false)) + " target=\"_blank\" class=\"preview empty\"><img" + (jade.attr("src", thumbnail, true, false)) + " width=\"70\" height=\"52\" alt=\"\"/></a>");
}
buf.push("<div class=\"content\"><a" + (jade.attr("href", url, true, false)) + " target=\"_blank\" class=\"link_white\">" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</a><div class=\"links\">submitted " + (jade.escape((jade_interp = created_utc) == null ? '' : jade_interp)) + " by <b>" + (jade.escape((jade_interp = author) == null ? '' : jade_interp)) + "</b> to<a" + (jade.attr("href", '/?/' + subreddit, true, false)) + " class=\"link_pink no-refresh\">" + (jade.escape(null == (jade_interp = ' /r/' + subreddit) ? "" : jade_interp)) + "</a></div><a" + (jade.attr("href", "/comments/" + (id) + "", true, false)) + " class=\"no-refresh\">" + (jade.escape((jade_interp = num_comments) == null ? '' : jade_interp)) + " comments</a></div>");}.call(this,"author" in locals_for_with?locals_for_with.author:typeof author!=="undefined"?author:undefined,"created_utc" in locals_for_with?locals_for_with.created_utc:typeof created_utc!=="undefined"?created_utc:undefined,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"num_comments" in locals_for_with?locals_for_with.num_comments:typeof num_comments!=="undefined"?num_comments:undefined,"score" in locals_for_with?locals_for_with.score:typeof score!=="undefined"?score:undefined,"subreddit" in locals_for_with?locals_for_with.subreddit:typeof subreddit!=="undefined"?subreddit:undefined,"thumbnail" in locals_for_with?locals_for_with.thumbnail:typeof thumbnail!=="undefined"?thumbnail:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"url" in locals_for_with?locals_for_with.url:typeof url!=="undefined"?url:undefined));;return buf.join("");
};

this["JST"]["navigation"] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (className, item, text, url) {
buf.push("<a" + (jade.attr("href", url, true, false)) + (jade.attr("data-item", "" + (item) + "", true, false)) + (jade.cls(["navigation-item no-refresh " + (className) + ""], [true])) + ">" + (jade.escape((jade_interp = text) == null ? '' : jade_interp)) + "</a>");}.call(this,"className" in locals_for_with?locals_for_with.className:typeof className!=="undefined"?className:undefined,"item" in locals_for_with?locals_for_with.item:typeof item!=="undefined"?item:undefined,"text" in locals_for_with?locals_for_with.text:typeof text!=="undefined"?text:undefined,"url" in locals_for_with?locals_for_with.url:typeof url!=="undefined"?url:undefined));;return buf.join("");
};

return this["JST"];

});