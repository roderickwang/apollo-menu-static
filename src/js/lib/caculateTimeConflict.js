/**
 * Created by roderickWang on 8/5/15.
 */
function caculateTimeConflict(list) {
    //mock
    list = [
        {
            "beginDate": "2014-11-21",
            "couponOfferId": 374372,
            "dayValue": {
                "beginDay": 1,
                "beginTime": "11:00",
                "endDay": 1,
                "endTime": "21:30"
            },
            "description": "未填写",
            "detailDescs": [],
            "discount": {
                "cut": 1,
                "full": 2,
                "limitCount": 0,
                "ratio": 3,
                "redeemDescription": "0.85",
                "redeemType": 1,
                "ticketValidPeriod": 30
            },
            "effectiveInHolidays": true,
            "endDate": "2016-04-30",
            "exceptTimePeriods": [
                "2015-01-01"
            ],
            "customExceptDate": true,
            "inventoryStatus": 0,
            "maxInventory": 0,
            "shopBriefInfos": [
                {
                    "shopId": 8040484,
                    "shopName": "围炉夜话烤全鱼"
                }
            ],
            "ticketIssueThreshold": 3,
            "title": "全单8.5折"
        },
        {
            "beginDate": "2015-06-15",
            "couponOfferId": 608025,
            "dayValue": {
                "beginDay": 2,
                "beginTime": "11:00",
                "endDay": 1,
                "endTime": "22:00"
            },
            "description": "未填写",
            "detailDescs": [
                "除酒水饮料、印度飞饼"
            ],
            "discount": {
                "cut": 1,
                "full": 2,
                "limitCount": 0,
                "ratio": 3,
                "redeemDescription": "0.8100000000000001",
                "redeemType": 2,
                "ticketValidPeriod": 30
            },
            "effectiveInHolidays": true,
            "endDate": "2016-09-15",
            "exceptTimePeriods": [],
            "inventoryStatus": 0,
            "maxInventory": 0,
            "shopBriefInfos": [
                {
                    "shopId": 20874125,
                    "shopName": "围炉夜话烤全鱼•靓汤鱼"
                },
                {
                    "shopId": 23400919,
                    "shopName": "围炉夜话5.0版烤鱼"
                },
                {
                    "shopId": 23685725,
                    "shopName": "围炉夜话烤全鱼•靓汤鱼"
                }
            ],
            "ticketIssueThreshold": 3,
            "title": "8.1折"
        },
        {
            "beginDate": "2015-06-15",
            "couponOfferId": 608026,
            "dayValue": {
                "beginDay": 2,
                "beginTime": "11:00",
                "endDay": 1,
                "endTime": "22:00"
            },
            "description": "未填写",
            "detailDescs": [
                "除酒水饮料、印度飞饼"
            ],
            "discount": {
                "cut": 1,
                "full": 2,
                "limitCount": 0,
                "ratio": 0.81,
                "redeemDescription": "0.8100000000000001",
                "redeemType": 3,
                "ticketValidPeriod": 30
            },
            "effectiveInHolidays": true,
            "endDate": "2016-09-15",
            "exceptTimePeriods": [],
            "inventoryStatus": 0,
            "maxInventory": 0,
            "shopBriefInfos": [
                {
                    "shopId": 20874125,
                    "shopName": "围炉夜话烤全鱼•靓汤鱼"
                },
                {
                    "shopId": 23400919,
                    "shopName": "围炉夜话5.0版烤鱼"
                },
                {
                    "shopId": 23685725,
                    "shopName": "围炉夜话烤全鱼•靓汤鱼"
                }
            ],
            "ticketIssueThreshold": 1,
            "title": "8.1折"
        }, {
            "beginDate": "2015-06-15",
            "couponOfferId": 608027,
            "dayValue": {
                "beginDay": 2,
                "beginTime": "11:00",
                "endDay": 1,
                "endTime": "22:00"
            },
            "description": "未填写",
            "detailDescs": [
                "除酒水饮料、印度飞饼"
            ],
            "discount": {
                "cut": 1,
                "full": 1,
                "limitCount": 0,
                "ratio": 0.81,
                "redeemDescription": "0.8100000000000001",
                "redeemType": 4,
                "ticketValidPeriod": 30
            },
            "effectiveInHolidays": true,
            "endDate": "2016-09-15",
            "exceptTimePeriods": [],
            "inventoryStatus": 0,
            "maxInventory": 0,
            "shopBriefInfos": [
                {
                    "shopId": 20874125,
                    "shopName": "围炉夜话烤全鱼•靓汤鱼"
                },
                {
                    "shopId": 23400919,
                    "shopName": "围炉夜话5.0版烤鱼"
                },
                {
                    "shopId": 23685725,
                    "shopName": "围炉夜话烤全鱼•靓汤鱼"
                }
            ],
            "ticketIssueThreshold": 1,
            "title": "8.1折"
        }
    ];
    //console.log(list);
    var result = []
    for (var i = 0; i < list.length; i++) {
        for (var j = i; j < list.length; j++) {
            //shopIds有交集时
            if (insertAry(list[i].shopBriefInfos.map(shopIds), list[j].shopBriefInfos.map(shopIds)).length > 0) {
                return [i,j];
            }
        }
    }
}

function ifConflict(a,b){
    var covedA=covert(a);
    var covedB=covert(b);
    var akeys=Object.keys(covedA);
    var bkeys=Object.keys(covedB);
    var inserts = insertAry(akeys, bkeys);
    if(inserts.length==0){
        return false;
    }else{
        for(var i=0;i<inserts.length;i++){
            if(insertAry(covedA[i],covedB[i]).length>0){
                return true;
            }
        }
        return false;
    }
}

function covert(obj) {
    var begin = new moment(obj.beginDate);
    var end = new moment(obj.endDate);
    var result = {};
    var beginStr = begin.format('YYYY-MM-DD');
    var endStr = end.format('YYYY-MM-DD');

    var ifNextDay = parse(obj.dayValue.beginTime.split(":")[0]) < parse(obj.dayValue.endTime.split(":")[0]);
    if(ifNextDay&&obj.endDay==7){

    }
    var ifNextWeek = obj.beginDay < obj.endDay;
    do {
        var beginWeekday=begin.weekday()+1;
        if (beginWeekday>=obj.beginDay && beginWeekday<=obj.endDay+(ifNextWeek?7:0)+(ifNextDay?1:0)){
            result[beginStr] = [];
                var beginNum=covertTime(obj.beginTime);
                var endNum=covertTime(obj.endTime)+(ifNextDay?24*4:0);
                while(beginNum!=endNum){
                    result[beginStr].push(beginNum);
                    beginNum++;
                }
        }
        beginStr = begin.add(1, 'days').format('YYYY-MM-DD');
    }while (beginStr != endStr)

}

function covertTime(time){
    var times=time.split(":");
    return parseInt(times[0])*4+(parseInt(times[1])/15);
}

function shopIds(shop) {
    return shop.shopId;
}

function insertAry(a, b) {
    return a.reduce(function (list, o) {
        var index = b.indexOf(o);
        if (index != -1) {
            return list;
        } else {
            return list.splice(index, 1);
        }
    }, a);
};


//caculateTimeConflict();
console.log(insertAry([1, 2], [2, 3]));