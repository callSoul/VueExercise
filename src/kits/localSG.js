/**
 * 获取本地的存储数据,也可以从本地返回数据,
 * 存储的数据都以key
 */
export const KEY = 'goodsdata';
export var valueObj = {goodsid:0,count:0};//定义本地存储的格式,
//c存储数据
//value:{goodsId:88,count:4}

export function setItem(value){
     var jsonString = localStorage.getItem(KEY);
         jsonString = jsonString || "[]";
         var arr = JSON.parse(jsonString);
         //将数据添加到本地存储
         arr.push(value);
         //将arr转换成json格式的字符串存储在本地
         localStorage.setItem(KEY,JSON.stringify(arr));
}
//获取本地的数据
export function getItem(){
    var jsonString = localStorage.getItem(KEY);
    jsonString = jsonString || "[]";
    return JSON.parse(jsonString);
}

//将localstroge中的数据进行整合成为一个对象
/**
 * 商品id的值:商品的数量,下面的这种形式,返回的数据格式
 * {88:87,99:10}
 * 
 */
export function getgoodsObject(){
    var arr = getItem();
    /**
     * arr的格式[{goodsid:87,count:1},{goodsid:87,count:2}{goodsid:87,count:4}]
     */
    //将数组中id相同的多个对象合并成一个对象,将数据整合成上面的形式
    var resObj = {}
    for (var i=0;i<arr.length;i++) {
        var item = arr[i];
        if (!resObj[item.goodsid]) {
            resObj[item.goodsid] = item.count;
        }else {
            //有该数据则追加
            var count = resObj[item.goodsid];
            resObj[item.goodsid] = count + item.count;
        }
    }
    return resObj;
}
//删除数据,根据goodsid删除所有该id的对象
export function removeItem(goodsid){
    var arr = getItem();
    for (var i=arr.length-1;i>=0;i--) {
        if (arr[i].goodsid == goodsid) {
            arr.splice(i,1);
        }
    }
    //同时将此时最新的数据信息存储在localstroge中
    localStorage.setItem(KEY,JSON.stringify(arr));
}
//每次点击加或者减的时候都要对本地的数据进行跟新的操作,接受一个对象,产品的id跟增加或者减少的类型
//objg格式为:{goodsid:87,type:'add'}
export function updateData(obj){
    var arr = getItem();
    var count = 1;
    if (obj.type == 'add'){
        arr.push({goodsid:obj.goodsid,count:count});
    }else {
        for (var i=0;i<arr.length;i++){
            //如果这个对象中的count值等于1,则删除这个对象,否则将这个对象的count值减1
            if (arr[i].goodsid == obj.goodsid) {
                if (arr[i].count >1) {
                    arr[i].count = arr[i].count -1;
                    break;
                }else {
                    //将这个对象删除
                    arr.splice(i,1);
                    break;
                }
            }
        }
    }
    //将最新的arr保存到localStroge中
    localStorage.setItem(KEY,JSON.stringify(arr));
}
//所有保存在localstroge中的数据格式[{gooddis:88,count:1},{goodsid:89,count:2},{goodsid:88,count:1}]
