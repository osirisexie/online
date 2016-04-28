/**
 * Created by qianmoxie on 3/3/16.
 */
var apiOption = {
    server: "http://localhost:3000"
};
function requestOption (method,path,qs,json){
    this.url = apiOption.server + path;
    this.method = method;
    this.json = (typeof json === 'undefined')? {} : json;
    this.qs = (typeof qs === 'undefined')?{}: qs;
}

module.exports.requestOption = requestOption;