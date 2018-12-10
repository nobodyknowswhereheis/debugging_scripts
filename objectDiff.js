// diff two objects deeply ie: if objects contain object, diff those too.
export function objectDiff(o, n) {
    var diff;
    if ((typeof o == "object" && o != null) && (typeof n == "object" && n != null)) {
        diff += doDiff(o, n);
        console.log(diff);
    }
    else
        console.error("Must pass in two objects.");
}
var doDiff = function (o, n) {
    var diff = "";
    if (o && n) {
        switch (typeof n) {
            case "number":
            case "string":
            case "boolean":
                if (n != o) {
                    diff = `${o} => ${n} \n`
                }
                break;
            case "object":
                if (Array.isArray(n)) {
                    diff += `[\n`;
                    for(var i = 0; i < n.length; i++){
                        diff += arrayDiff(n[i],i,n,o)
                    }
                    //diff += n.forEach((element,index,array) => arrayDiff(element,index,array,o))
                    diff += `\n]\n`;
                }
                else {
                    diff += `{\n`;
                    for (var prop in n) {
                        var ret = doDiff(o[prop], n[prop]);
                        if (ret)
                            diff += `\t${prop}: ${ret}\n`
                    }
                    diff += `}\n`;
                }
                break;
            case "function":
                break; // not handling functions.
            default:
                return diff;
        }
        return diff;
    }
    else if (o && !n) {
        return `${o} => ""`;
    }
    else if (!o && n) {
        return `undefined => ${n}`;
    }
    return diff;
}
var arrayDiff = function (element,index,array,o){
    if(o[index])
        var ret = doDiff(o[index],element);
    else
        var ret = doDiff(false,element);
    return `\t${ret}`;
}

// var obj5 = { type:"gorilla", age: 32, home:{country:"united states",state:"FL"},foods:["banana","mango",]}
// var obj6 = {...obj5, home:{country:"united kingdom"},foods:["banana","grapes","guava"]}
// objectDiff(obj6,obj6)