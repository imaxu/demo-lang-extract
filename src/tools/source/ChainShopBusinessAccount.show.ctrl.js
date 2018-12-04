require(['./modules-loader'], function (app) {
    app.controller("ChainShopBusinessAccount.show.ctrl", function ($scope, $getChainShop, $getLastHallAccount, $getHallAccount, $getPreBillindex, $getNextBillindex) {
        $scope.model = {
            chainshopList: [],
            defChainshop: {},
            time: "",
            hallAccount: [],
            checkoutInfo: {},//汇总数据
            billindex: 0,//账单号
            maxBillNum: 0,
            earningsList: [],//现金收入->业务收益
            equipIncomeList: [],//现金收入->设备收益
            intservList: [],//业务结账->综合业务
            equipDivisionList: [],//业务结账->设备分账
            ridesList: [],//经营收益->游乐项目
            stationList: [],//经营收益->机台结账
            giftSaleList: [],//经营收益->礼品销售兑换
            salePackList: [],//经营收益->销售套餐
            busiSettList: [],//经营收益->商户结算
            realCoinMonList: [],//经营监控->实币监控
            memRegList: [],//经营监控->会员注册
            memAccSumList: [],//经营监控->会员账户汇总（账户变化汇总）
            curAccBanList: [],//经营监控->当期账户结余（本期账户结余）
            numBiList: [],//经营监控->数字币结算
            numAbiList: [],//经营监控->数字A币结算
            numBiRecoverList: [],//经营监控->数字币回收
            counselorList: [],//经营监控->辅导员业务结算
            youhuiList: [],//经营监控->优惠券结算
            selectCash: {
                cash_bill: [
                    { id: 1, name: '业务收益', show: true },
                    { id: 12, name: '设备收益', show: true }
                ],
                edit_cashBill: [],
                select_hide_cashBill: {},
                select_show_cashBill: {},
                bill_show_obj: {}
            },
            selectDeal: {
                deal_bill: [
                    { id: 10, name: '机台', show: true },
                    { id: 4, name: '游乐项目', show: true },
                    { id: 13, name: '礼品销售兑换', show: true },
                    { id: 9, name: '销售套餐', show: true }
                ],
                edit_dealBill: [],
                select_hide_dealBill: {},
                select_show_dealBill: {},
                bill_show_obj: {}
            },
            selectBusi: {
                busi_bill: [
                    { id: 3, name: '综合业务', show: true },
                    { id: 14, name: '设备分账', show: false }
                ],
                edit_busiBill: [],
                select_hide_busiBill: {},
                select_show_busiBill: {},
                bill_show_obj: {}
            },
            selectMoni: {
                moni_bill: [
                    { id: 6, name: '实币监控', show: true },
                    { id: 7, name: '会员注册', show: true },
                    { id: 8, name: '账户变化汇总', show: true },
                    { id: 15, name: '本期账户结余', show: true },
                    { id: 16, name: '优惠券结算', show: true }
                ],
                edit_moniBill: [],
                select_hide_moniBill: {},
                select_show_moniBill: {},
                bill_show_obj: {}
            },
        },
        $scope.action = {
            init: function () {
                $(".form_datetime").datetimepicker({
                    format: 'yyyy-mm-dd',
                    language: 'zh-CN',
                    weekStart: 1,
                    autoclose: 1,
                    minView: 2
                })
                $scope.action.getChainShop();
                $scope.action.cleardatas();
                $scope.action.selectCash.init_cashBill_show();
                $scope.action.selectDeal.init_dealBill_show();
                $scope.action.selectBusi.init_busiBill_show();
                $scope.action.selectMoni.init_moniBill_show();
            },
            cleardatas:function(){
                $scope.model.earningsList = [];
                $scope.model.equipIncomeList = [];
                $scope.model.jitai = [];
                $scope.model.ridesList = [];
                $scope.model.giftSaleList = [];
                $scope.model.salePackList = [];
                $scope.model.intservList = [];
                $scope.model.devicedata = [];
                $scope.model.realCoinMonList = [];
                $scope.model.memRegList = [];
                $scope.model.memAccSumList = [];
                $scope.model.curAccBanList = [];
                $scope.model.youhuiList = [];
            },
            getChainShop: function () {
                var querydata = {};
                querydata.appid = localStorage.getItem("app_id");
                querydata.token = localStorage.getItem("access_token");
                querydata.user_session = localStorage.getItem("user_session");
                $getChainShop({
                    data: querydata,
                    onSuccess: function (res) {
                        for (var i = 0; i < res.biz_data.items.length; i++) {
                            $scope.model.chainshopList.push({
                                chainshop_no: res.biz_data.items[i].chainshop_no,
                                name: res.biz_data.items[i].chainshop_no + "  " + res.biz_data.items[i].name
                            });
                        }
                        $scope.model.defChainshop = $scope.model.chainshopList[0];
                        $scope.action.getLastHallAccount();
                    },
                    onFail: function (msg) {
                        alert(msg);
                    },
                    onError: function (e_msg) {
                        alert(e_msg);
                    }
                })
            },
            changeChainshop: function () {
                $scope.action.getLastHallAccount();
            },
            getLastHallAccount: function () {
                var querydata = {};
                querydata.appid = localStorage.getItem("app_id");
                querydata.token = localStorage.getItem("access_token");
                querydata.user_session = localStorage.getItem("user_session");
                querydata.chainshop_no = $scope.model.defChainshop.chainshop_no;
                $getLastHallAccount({
                    data: querydata,
                    onSuccess: function (res) {
                        if (res.return_code == 0) {
                            $scope.model.maxBillNum = Number(res.biz_data.billindex);
                            $scope.model.billindex = Number(res.biz_data.billindex);
                            $scope.model.time = new Date(res.biz_data.accountday).Format("yyyy-MM-dd");
                            $("#time").val($scope.model.time);
                            $scope.action.query();
                        } else {
                            alert(res.return_msg);
                        }
                    },
                    onFail: function (msg) {
                        
                    },
                    onError: function (e_msg) {
                        alert(e_msg);
                    }
                })
            },
            getHallAccount: function (args) {
                var querydata = {};
                querydata.appid = localStorage.getItem("app_id");
                querydata.token = localStorage.getItem("access_token");
                querydata.user_session = localStorage.getItem("user_session");
                querydata.chainshop_no = $scope.model.defChainshop.chainshop_no;
                if (isNaN(args) == false) {
                    querydata.billindex = args;
                } else {
                    querydata.accountday = args;
                }
                $scope.action.cleardatas();
                $getHallAccount({
                    data: querydata,
                    onSuccess: function (res) {
                        $scope.model.hallAccount = res.biz_data.items;                        
                        if (res.biz_data.items.length > 0) {
                            res.biz_data.items.forEach(function (item) {                                
                                switch (item.kind) {
                                    case 1://汇总数据
                                        $scope.model.checkoutInfo = item.kinddata[0];
                                        $scope.model.time = new Date(item.kinddata[0].accountday).Format("yyyy-MM-dd");
                                        $scope.model.billindex = item.kinddata[0].accountno;
                                        break;
                                    case 2://现金收入->业务收益
                                        $scope.model.earningsList = [];
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        var total = {
                                            bustype: "合计",
                                            cash: 0,
                                            billnum: 0
                                        };
                                        item.kinddata.forEach(function (earnings) {
                                            total.cash += earnings.cash;
                                            total.billnum += earnings.billnum;

                                            earnings.cash = earnings.cash.toFixed(2);
                                            $scope.model.earningsList.push(earnings);
                                        })
                                        total.cash = total.cash.toFixed(2);
                                        $scope.model.earningsList.push(total);
                                        break;
                                    case 3://业务结账->综合业务
                                        $scope.model.intservList = [];
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        var total = {
                                            bustype: "合计",
                                            cash: 0,
                                            storecash: 0,
                                            bi: 0,
                                            abi: 0,
                                            piao: 0,
                                            Apiao: 0,
                                            realbi: 0,
                                            jifen: 0,
                                            billnum: 0
                                        };
                                        item.kinddata.forEach(function (intserv) {
                                            total.cash += intserv.cash;
                                            total.storecash += intserv.storecash;
                                            total.bi += intserv.bi;
                                            total.abi += intserv.abi;
                                            total.piao += intserv.piao;
                                            total.Apiao += intserv.Apiao;
                                            total.realbi += intserv.realbi;
                                            total.jifen += intserv.jifen;
                                            total.billnum += intserv.billnum;

                                            intserv.cash = intserv.cash.toFixed(2);
                                            intserv.storecash = intserv.storecash.toFixed(2);
                                            $scope.model.intservList.push(intserv);
                                        })
                                        total.cash = total.cash.toFixed(2);
                                        total.storecash = total.storecash.toFixed(2);
                                        $scope.model.intservList.push(total);
                                        break;
                                    case 4://经营收益->游乐项目
                                        $scope.model.ridesList = [];
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        var total = {
                                            name: "合计",
                                            count: 0,
                                            cash: 0,
                                            bi: 0,
                                            abi: 0,
                                            times: 0
                                        };
                                        item.kinddata.forEach(function (rides) {
                                            total.count += rides.count;
                                            total.cash += rides.cash;
                                            total.bi += rides.bi;
                                            total.abi += rides.abi;
                                            total.times += rides.times;

                                            rides.cash = rides.cash.toFixed(2);
                                            $scope.model.ridesList.push(rides);
                                        })
                                        total.cash = total.cash.toFixed(2);
                                        $scope.model.ridesList.push(total);
                                        break;
                                    case 5:
                                        break;
                                    case 6://经营监控->实币监控
                                        $scope.model.realCoinMonList = item.kinddata;
                                        break;
                                    case 7://经营监控->会员注册
                                        $scope.model.memRegList = [];
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        var total = {
                                            orderNum: "合计",
                                            cardno: "--",
                                            name: "--",
                                            tel: "--",
                                            cash: 0,
                                            bi: 0,
                                            abi: 0,
                                        }
                                        item.kinddata.forEach(function (memReg, ind) {
                                            total.cash += memReg.cash;
                                            total.bi += memReg.bi;
                                            total.abi += memReg.abi;

                                            memReg.orderNum = ind+1;
                                            memReg.cash = memReg.cash.toFixed(2);
                                            $scope.model.memRegList.push(memReg);
                                        })
                                        total.cash = total.cash.toFixed(2);
                                        $scope.model.memRegList.push(total);
                                        break;
                                    case 8://经营监控->会员账户汇总
                                        $scope.model.memAccSumList = item.kinddata;
                                        break;
                                    case 9://经营收益->销售套餐
                                        $scope.model.salePackList = [];
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        var total = {
                                            name: "合计",
                                            cash: 0,
                                            num: 0
                                        }
                                        item.kinddata.forEach(function (salePack) {
                                            total.cash += salePack.cash;
                                            total.num += salePack.num;

                                            salePack.cash = salePack.cash.toFixed(2);
                                            $scope.model.salePackList.push(salePack);
                                        })
                                        total.cash = total.cash.toFixed(2);
                                        $scope.model.salePackList.push(total);
                                        break;
                                    case 10://经营收益->机台结账
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        item.kinddata.forEach(function (station) {
                                            var total = {
                                                name: "合计",
                                                toubi: 0,
                                                tuipiao: 0,
                                                defen: 0
                                            }
                                            station.jitai.forEach(function (jitai) {
                                                total.toubi += jitai.toubi;
                                                total.tuipiao += jitai.tuipiao;
                                                total.defen += jitai.defen;
                                            })
                                            station.jitai.push(total);
                                        })
                                        $scope.model.stationList = item.kinddata;
                                        break;
                                    case 11://
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        item.kinddata.forEach(function (counsel) {
                                            var total = {
                                                name: "合计",
                                                count: 0,
                                                cash: 0,
                                                bi: 0,
                                                abi: 0,
                                                times: 0
                                            }
                                            counsel.game.forEach(function (game) {
                                                total.count += game.count;
                                                total.cash += game.cash;
                                                total.bi += game.bi;
                                                total.abi += game.abi;
                                                total.times += game.times;

                                                game.cash = game.cash.toFixed(2);
                                            })
                                            total.cash = total.cash.toFixed(2);
                                            counsel.game.push(total)
                                        })
                                        $scope.model.counselorList = item.kinddata;
                                        break;
                                    case 12://设备收益
                                        $scope.model.equipIncomeList = [];
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        var total = {
                                            cno: "合计",
                                            deviceid: "--",
                                            devicename: "--",
                                            cash: 0,
                                            weixin: 0,
                                            alipay: 0,
                                            unionpos: 0,
                                            weixinpos: 0,
                                            alipaypos: 0,
                                            qqcash: 0,
                                            baiducash: 0,
                                            jingcash: 0,
                                            othercash: 0,
                                            sumcash: 0
                                        }
                                        item.kinddata.forEach(function (equipIncome) {
                                            equipIncome.sumcash = equipIncome.cash + equipIncome.weixin + equipIncome.alipay
                                                + equipIncome.unionpos + equipIncome.weixinpos + equipIncome.alipaypos + equipIncome.qqcash
                                                + equipIncome.baiducash + equipIncome.jingcash + equipIncome.othercash,

                                            total.cash += equipIncome.cash;
                                            total.weixin += equipIncome.weixin;
                                            total.alipay += equipIncome.alipay;
                                            total.unionpos += equipIncome.unionpos;
                                            total.weixinpos += equipIncome.weixinpos;
                                            total.alipaypos += equipIncome.alipaypos;
                                            total.qqcash += equipIncome.qqcash;
                                            total.baiducash += equipIncome.baiducash;
                                            total.jingcash += equipIncome.jingcash;
                                            total.othercash += equipIncome.othercash;
                                            total.sumcash += equipIncome.sumcash;

                                            equipIncome.cash = equipIncome.cash.toFixed(2);
                                            equipIncome.weixin = equipIncome.weixin.toFixed(2);
                                            equipIncome.alipay = equipIncome.alipay.toFixed(2);
                                            equipIncome.unionpos = equipIncome.unionpos.toFixed(2);
                                            equipIncome.weixinpos = equipIncome.weixinpos.toFixed(2);
                                            equipIncome.alipaypos = equipIncome.alipaypos.toFixed(2);
                                            equipIncome.qqcash = equipIncome.qqcash.toFixed(2);
                                            equipIncome.baiducash = equipIncome.baiducash.toFixed(2);
                                            equipIncome.jingcash = equipIncome.jingcash.toFixed(2);
                                            equipIncome.othercash = equipIncome.othercash.toFixed(2);
                                            equipIncome.sumcash = equipIncome.sumcash.toFixed(2);
                                            $scope.model.equipIncomeList.push(equipIncome);
                                        })
                                        total.cash = total.cash.toFixed(2);
                                        total.weixin = total.weixin.toFixed(2);
                                        total.alipay = total.alipay.toFixed(2);
                                        total.unionpos = total.unionpos.toFixed(2);
                                        total.weixinpos = total.weixinpos.toFixed(2);
                                        total.alipaypos = total.alipaypos.toFixed(2);
                                        total.qqcash = total.qqcash.toFixed(2);
                                        total.baiducash = total.baiducash.toFixed(2);
                                        total.jingcash = total.jingcash.toFixed(2);
                                        total.othercash = total.othercash.toFixed(2);
                                        total.sumcash = total.sumcash.toFixed(2);
                                        $scope.model.equipIncomeList.push(total);
                                        break;
                                    case 13://礼品销售兑换
                                        $scope.model.giftSaleList = [];
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        var total = {
                                            count: 0,
                                            cash: 0,
                                            bi: 0,
                                            abi: 0,
                                            piao: 0,
                                            apiao: 0,
                                            //jifen: 0,
                                            cost: 0,
                                            profit: 0
                                        };
                                        item.kinddata.sort($scope.action.compare("goodno", "asc"));
                                        item.kinddata.forEach(function (giftSale) {
                                            total.count += giftSale.count;
                                            total.cash += giftSale.cash;
                                            total.bi += giftSale.bi;
                                            total.abi += giftSale.abi;
                                            total.piao += giftSale.piao;
                                            total.apiao += giftSale.apiao;
                                            //total.jifen += giftSale.jifen;
                                            total.cost += giftSale.cost;
                                            total.profit += giftSale.profit;

                                            giftSale.cash = giftSale.cash.toFixed(2);
                                            giftSale.cost = giftSale.cost.toFixed(2);
                                            giftSale.profit = giftSale.profit.toFixed(2);
                                            $scope.model.giftSaleList.push(giftSale);
                                        })
                                        total.cash = total.cash.toFixed(2);
                                        total.cost = total.cost.toFixed(2);
                                        total.profit = total.profit.toFixed(2);
                                        $scope.model.giftSaleList.push(total);
                                        break;
                                    case 15://本期账户结余
                                        if (item.kinddata.length == 0) {
                                            return;
                                        }
                                        $scope.model.curAccBanList = [];
                                        var total = {
                                            cardtypename: "合计",
                                            totalnum: 0,
                                            activenum: 0,
                                            bi: 0,
                                            abi: 0,
                                            piao: 0,
                                            apiao: 0,
                                            jifen: 0,
                                            storecash: 0,
                                        };
                                        item.kinddata.forEach(function (curAcc) {
                                            total.totalnum += curAcc.totalnum;
                                            total.activenum += curAcc.activenum;
                                            total.bi += curAcc.bi;
                                            total.abi += curAcc.abi;
                                            total.piao += curAcc.piao;
                                            total.apiao += curAcc.apiao;
                                            total.jifen += curAcc.jifen;
                                            total.storecash += curAcc.storecash;

                                            curAcc.storecash = curAcc.storecash.toFixed(2);
                                            $scope.model.curAccBanList.push(curAcc);
                                        })
                                        total.storecash = total.storecash.toFixed(2);
                                        $scope.model.curAccBanList.push(total);
                                        break;
                                    case 16://优惠券结算
                                        $scope.model.youhuiList = [];
                                        var total = {
                                            quanname: "合计",
                                            quankind: "--",
                                            count: 0,
                                            bi: 0,
                                            abi: 0,
                                            cash: 0,
                                        };
                                        item.kinddata.forEach(function (youhui) {
                                            total.count += youhui.count;
                                            total.bi += youhui.bi;
                                            total.abi += youhui.abi;
                                            total.cash += youhui.cash;
                                            youhui.cash = youhui.cash.toFixed(2);
                                            $scope.model.youhuiList.push(youhui);
                                        })
                                        total.cash = total.cash.toFixed(2);
                                        $scope.model.youhuiList.push(total);
                                        break;
                                    case 14://设备分账  
                                        var arrs = item.kinddata;
                                        arrs.forEach(function (eq) {
                                            var total = {
                                                bustype: "合计",
                                                cash: 0,
                                                storecash: 0,
                                                bi: 0,
                                                abi: 0,
                                                Apiao: 0,
                                                piao: 0,
                                                jifen: 0,
                                                realbi: 0,
                                                billnum: 0
                                            };
                                            eq.devicedata.forEach(function (dtl) {
                                                total.cash += dtl.cash;
                                                total.storecash += dtl.storecash;
                                                total.bi += dtl.bi;
                                                total.abi += dtl.abi;
                                                total.Apiao += dtl.Apiao;
                                                total.piao += dtl.piao;
                                                total.jifen += dtl.jifen;
                                                total.realbi += dtl.realbi;
                                                total.billnum += dtl.billnum;

                                                dtl.cash = dtl.cash.toFixed(2);
                                                dtl.storecash = dtl.storecash.toFixed(2);
                                            })
                                            total.cash = total.cash.toFixed(2);
                                            total.storecash = total.storecash.toFixed(2);
                                            eq.devicedata.push(total);
                                        })
                                        $scope.model.equipDivisionList = arrs;
                                        break;
                                }
                            })
                        }
                    },
                    onFail: function (msg) {
                        alert(msg);
                    },
                    onError: function (e_msg) {
                        alert(e_msg);
                    }
                })
            },
            query: function () {
                $scope.model.time = $("#time").val();
                $scope.action.getHallAccount($scope.model.time);
            },
            prev: function () {
                var querydata = {};
                querydata.appid = localStorage.getItem("app_id");
                querydata.token = localStorage.getItem("access_token");
                querydata.user_session = localStorage.getItem("user_session");
                querydata.chainshop_no = $scope.model.defChainshop.chainshop_no;
                querydata.billindex = $scope.model.billindex;
                $getPreBillindex({
                    data: querydata,
                    onSuccess: function (res) {
                        if (res.return_code == 0) {
                            $scope.model.billindex = Number(res.billindex);
                            $scope.action.getHallAccount($scope.model.billindex);
                        } else {
                            alert(res.return_msg);
                        }
                    },
                    onFail: function (msg) {
                        alert(msg);
                    },
                    onError: function (e_msg) {
                        alert(e_msg);
                    }
                })
            },
            next: function () {
                var querydata = {};
                querydata.appid = localStorage.getItem("app_id");
                querydata.token = localStorage.getItem("access_token");
                querydata.user_session = localStorage.getItem("user_session");
                querydata.chainshop_no = $scope.model.defChainshop.chainshop_no;
                querydata.billindex = $scope.model.billindex;
                $getNextBillindex({
                    data: querydata,
                    onSuccess: function (res) {
                        if (res.return_code == 0) {
                            $scope.model.billindex = Number(res.billindex);
                            $scope.action.getHallAccount($scope.model.billindex);
                        } else {
                            alert(res.return_msg);
                        }
                    },
                    onFail: function (msg) {
                        alert(msg);
                    },
                    onError: function (e_msg) {
                        alert(e_msg);
                    }
                })
            },
            selectCash: {
                adjust_cashBill: function () {
                    $("#SetCashColumn").modal("show");
                    $scope.model.selectCash.edit_cashBill = angular.copy($scope.model.selectCash.cash_bill);
                },
                save_adjustCash: function () {
                    $scope.model.selectCash.cash_bill = angular.copy($scope.model.selectCash.edit_cashBill);
                    localStorage.cashBillsInfo = JSON.stringify($scope.model.selectCash.cash_bill);
                    $scope.action.selectCash.create_cashBill_show_obj();
                    $("#SetCashColumn").modal("hide");
                },
                cashAdd: function () {
                    $scope.model.selectCash.edit_cashBill.forEach(function (item) {
                        $scope.model.selectCash.select_hide_cashBill.forEach(function (bill) {
                            if (item.id == bill) {
                                item.show = true;
                            }
                        })
                    })
                },
                cashReduce: function () {
                    $scope.model.selectCash.edit_cashBill.forEach(function (item) {
                        $scope.model.selectCash.select_show_cashBill.forEach(function (bill) {
                            if (item.id == bill) {
                                item.show = false;
                            }
                        })
                    })
                },
                init_cashBill_show: function () {
                    if (localStorage.cashBillsInfo != undefined) {
                        $scope.model.selectCash.cash_bill = JSON.parse(localStorage.cashBillsInfo);
                    }
                    $scope.action.selectCash.create_cashBill_show_obj();
                },
                create_cashBill_show_obj: function () {
                    $scope.model.selectCash.bill_show_obj = {};
                    $scope.model.selectCash.cash_bill.forEach(function (item) {
                        $scope.model.selectCash.bill_show_obj['m' + item.id] = item.show;
                    })
                },
            },
            selectDeal: {
                adjust_dealBill: function () {
                    $("#SetDealColumn").modal("show");
                    $scope.model.selectDeal.edit_dealBill = angular.copy($scope.model.selectDeal.deal_bill);
                },
                save_adjustDeal: function () {
                    $scope.model.selectDeal.deal_bill = angular.copy($scope.model.selectDeal.edit_dealBill);
                    localStorage.dealBillsInfo = JSON.stringify($scope.model.selectDeal.deal_bill);
                    $scope.action.selectDeal.create_dealBill_show_obj();
                    $("#SetDealColumn").modal("hide");
                },
                dealAdd: function () {
                    $scope.model.selectDeal.edit_dealBill.forEach(function (item) {
                        $scope.model.selectDeal.select_hide_dealBill.forEach(function (bill) {
                            if (item.id == bill) {
                                item.show = true;
                            }
                        })
                    })
                },
                dealReduce: function () {
                    $scope.model.selectDeal.edit_dealBill.forEach(function (item) {
                        $scope.model.selectDeal.select_show_dealBill.forEach(function (bill) {
                            if (item.id == bill) {
                                item.show = false;
                            }
                        })
                    })
                },
                init_dealBill_show: function () {
                    if (localStorage.dealBillsInfo != undefined) {
                        $scope.model.selectDeal.deal_bill = JSON.parse(localStorage.dealBillsInfo);
                    }
                    $scope.action.selectDeal.create_dealBill_show_obj();
                },
                create_dealBill_show_obj: function () {
                    $scope.model.selectDeal.bill_show_obj = {};
                    $scope.model.selectDeal.deal_bill.forEach(function (item) {
                        $scope.model.selectDeal.bill_show_obj['m' + item.id] = item.show;
                    })
                },
            },
            selectBusi: {
                adjust_busiBill: function () {
                    $("#SetBusiColumn").modal("show");
                    $scope.model.selectBusi.edit_busiBill = angular.copy($scope.model.selectBusi.busi_bill);
                },
                save_adjustBusi: function () {
                    $scope.model.selectBusi.busi_bill = angular.copy($scope.model.selectBusi.edit_busiBill);
                    localStorage.busiBillsInfo = JSON.stringify($scope.model.selectBusi.busi_bill);
                    $scope.action.selectBusi.create_busiBill_show_obj();
                    $("#SetBusiColumn").modal("hide");
                },
                busiAdd: function () {
                    $scope.model.selectBusi.edit_busiBill.forEach(function (item) {
                        $scope.model.selectBusi.select_hide_busiBill.forEach(function (bill) {
                            if (item.id == bill) {
                                item.show = true;
                            }
                        })
                    })
                },
                busiReduce: function () {
                    $scope.model.selectBusi.edit_busiBill.forEach(function (item) {
                        $scope.model.selectBusi.select_show_busiBill.forEach(function (bill) {
                            if (item.id == bill) {
                                item.show = false;
                            }
                        })
                    })
                },
                init_busiBill_show: function () {
                    if (localStorage.busiBillsInfo != undefined) {
                        $scope.model.selectBusi.busi_bill = JSON.parse(localStorage.busiBillsInfo);
                    }
                    $scope.action.selectBusi.create_busiBill_show_obj();
                },
                create_busiBill_show_obj: function () {
                    $scope.model.selectBusi.bill_show_obj = {};
                    $scope.model.selectBusi.busi_bill.forEach(function (item) {
                        $scope.model.selectBusi.bill_show_obj['m' + item.id] = item.show;
                    })
                },
            },
            selectMoni: {
                adjust_moniBill: function () {
                    $("#SetMoniColumn").modal("show");
                    $scope.model.selectMoni.edit_moniBill = angular.copy($scope.model.selectMoni.moni_bill);
                },
                save_adjustMoni: function () {
                    $scope.model.selectMoni.moni_bill = angular.copy($scope.model.selectMoni.edit_moniBill);
                    localStorage.moniBillsInfo = JSON.stringify($scope.model.selectMoni.moni_bill);
                    $scope.action.selectMoni.create_moniBill_show_obj();
                    $("#SetMoniColumn").modal("hide");
                },
                moniAdd: function () {
                    $scope.model.selectMoni.edit_moniBill.forEach(function (item) {
                        $scope.model.selectMoni.select_hide_moniBill.forEach(function (bill) {
                            if (item.id == bill) {
                                item.show = true;
                            }
                        })
                    })
                },
                moniReduce: function () {
                    $scope.model.selectMoni.edit_moniBill.forEach(function (item) {
                        $scope.model.selectMoni.select_show_moniBill.forEach(function (bill) {
                            if (item.id == bill) {
                                item.show = false;
                            }
                        })
                    })
                },
                init_moniBill_show: function () {
                    if (localStorage.moniBillsInfo != undefined) {
                        $scope.model.selectMoni.moni_bill = JSON.parse(localStorage.moniBillsInfo);
                    }
                    $scope.action.selectMoni.create_moniBill_show_obj();
                },
                create_moniBill_show_obj: function () {
                    $scope.model.selectMoni.bill_show_obj = {};
                    $scope.model.selectMoni.moni_bill.forEach(function (item) {
                        $scope.model.selectMoni.bill_show_obj['m' + item.id] = item.show;
                    })
                },
            },
            compare:function(property,order) {
	            return function (a, b) {
	                var value1 = a[property];
	                var value2 = b[property];
	                if(order=="desc"){
	                    return value2 - value1;
	                }
	                if(order=="asc"){
	                    return value1 - value2;
	                }
	            }
            },
            //打印
            printTable: function () {
                $("#title").empty();
                $("#content").empty();
                var bigModalStyle = ' style="margin:15px 0px;font-weight: 600"';
                var smallModalStyle = ' style="margin:15px 0px"';
                //现金收入
                if (($scope.model.earningsList.length > 0 && $scope.model.selectCash.bill_show_obj.m1 == true) || ($scope.model.equipIncomeList.length > 0 && $scope.model.selectCash.bill_show_obj.m12 == true)) {
                    var html = '<div ' + bigModalStyle + '><label>◆ 现金收入</label></div>';
                    $("#content").append(html);
                }
                //业务收益
                if ($scope.model.earningsList.length > 0 && $scope.model.selectCash.bill_show_obj.m1 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 业务收益</label></div>';
                    var table = {
                        options: [
                            { name: '业务类型', id: 'bustype', float: 'center' },
                            { name: '金额', id: 'cash', float: 'right' },
                            { name: '业务笔数', id: 'billnum', float: 'center' },
                        ],
                        data: $scope.model.earningsList,
                        lastBold: true,
                        width: 400,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }
                //设备收益
                if ($scope.model.equipIncomeList.length > 0 && $scope.model.selectCash.bill_show_obj.m12 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 设备收益</label></div>';
                    var table = {
                        options: [
                            { name: '机位号', id: 'cno', float: 'center' },
                            { name: '设备编码', id: 'deviceid', float: 'center' },
                            { name: '设备名称', id: 'devicename', float: 'center' },
                            { name: '现金', id: 'cash', float: 'right' },
                            { name: '微信', id: 'weixin', float: 'right' },
                            { name: '支付宝', id: 'alipay', float: 'right' },
                            { name: '银联（POS机）', id: 'unionpos', float: 'right' },
                            { name: '微信（POS机）', id: 'weixinpos', float: 'right' },
                            { name: '支付宝（POS机）', id: 'alipaypos', float: 'right' },
                            { name: 'QQ钱包', id: 'qqcash', float: 'right' },
                            { name: '百度钱包', id: 'baiducash', float: 'right' },
                            { name: '京东钱包', id: 'jingcash', float: 'right' },
                            { name: '其他', id: 'othercash', float: 'right' },
                            { name: '小计', id: 'sumcash', float: 'right' }

                        ],
                        data: $scope.model.equipIncomeList,
                        lastBold: true,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html)
                }
                //经营收益
                if (($scope.model.stationList.length > 0 && $scope.model.selectDeal.bill_show_obj.m10 == true)
                    || ($scope.model.ridesList.length > 0 && $scope.model.selectDeal.bill_show_obj.m4 == true)
                    || ($scope.model.giftSaleList.length > 0 && $scope.model.selectDeal.bill_show_obj.m13 == true)
                    || ($scope.model.salePackList.length > 0 && $scope.model.selectDeal.bill_show_obj.m9 == true)) {
                    var html = '<div ' + bigModalStyle + '><label>◆ 经营收益</label></div>';
                    $("#content").append(html);
                }
                //机台结账
                if ($scope.model.stationList.length > 0 && $scope.model.selectDeal.bill_show_obj.m10 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 机台结账</label></div>';
                    $scope.model.stationList.forEach(function (jitai) {
                        html = '<div ' + smallModalStyle + '><label>' + jitai.name + '</label></div>';
                        var table = {
                            options: [
                                { name: '机台名称', id: 'name', float: 'center' },
                                { name: '投币', id: 'toubi', float: 'right' },
                                { name: '退票', id: 'tuipiao', float: 'right' },
                                { name: '得分', id: 'defen', float: 'right' },
                            ],
                            data: jitai.jitai,
                            lastBold: true,
                            width: 400,
                        }
                        html += creatPrintTable(table);
                        $("#content").append(html);
                    })
                }
                //游乐项目
                if ($scope.model.ridesList.length > 0 && $scope.model.selectDeal.bill_show_obj.m4 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 游乐项目</label></div>';
                    var table = {
                        options: [
                            { name: '游乐项目', id: 'name', float: 'center' },
                            { name: '张数', id: 'count', float: 'right' },
                            { name: '收现金', id: 'cash', float: 'right' },
                            { name: 'A币消费', id: 'abi', float: 'right' },
                            { name: '币消费', id: 'bi', float: 'right' },
                            { name: '次卡消费', id: 'times', float: 'right' },
                        ],
                        data: $scope.model.ridesList,
                        lastBold: true,
                        width: 400,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }
                //礼品销售兑换
                if ($scope.model.giftSaleList.length > 0 && $scope.model.selectDeal.bill_show_obj.m13 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 礼品销售兑换</label></div>';
                    var table = {
                        options: [
                            { name: '礼品编码', id: 'goodno', float: 'left' },
                            { name: '名称', id: 'goodname', float: 'left' },
                            { name: '数量', id: 'count', float: 'right' },
                            { name: '现金', id: 'cash', float: 'right' },
                            { name: '扣币', id: 'bi', float: 'right' },
                            { name: '扣票', id: 'piao', float: 'right' },
                            { name: '扣A币', id: 'abi', float: 'right' },
                            { name: '扣A票', id: 'apiao', float: 'right' },
                            { name: '成本', id: 'cost', float: 'right' },
                            { name: '利润', id: 'profit', float: 'right' },
                        ],
                        data: $scope.model.giftSaleList,
                        lastBold: true,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }
                //销售套餐
                if ($scope.model.salePackList.length > 0 && $scope.model.selectDeal.bill_show_obj.m9 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 销售套餐</label></div>';
                    var table = {
                        options: [
                            { name: '套餐名称', id: 'name', float: 'center' },
                            { name: '金额', id: 'cash', float: 'right' },
                            { name: '数量', id: 'num', float: 'right' },
                        ],
                        data: $scope.model.salePackList,
                        lastBold: true,
                        width: 400,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }
                //业务结账
                if (($scope.model.intservList.length > 0 && $scope.model.selectBusi.bill_show_obj.m3 == true) || ($scope.model.equipDivisionList.length > 0 && $scope.model.selectBusi.bill_show_obj.m14 == true)) {
                    var html = '<div ' + bigModalStyle + '><label>◆ 业务结账</label></div>';
                    $("#content").append(html);
                }
                //综合业务
                if ($scope.model.intservList.length > 0 && $scope.model.selectBusi.bill_show_obj.m3 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 礼品销售兑换</label></div>';
                    var table = {
                        options: [
                            { name: '业务类型', id: 'bustype', float: 'center' },
                            { name: '金额', id: 'cash', float: 'right' },
                            { name: '储值', id: 'storecash', float: 'right' },
                            { name: '币', id: 'bi', float: 'right' },
                            { name: 'A币', id: 'abi', float: 'right' },
                            { name: 'A票', id: 'Apiao', float: 'right' },
                            { name: '票', id: 'piao', float: 'right' },
                            { name: '积分', id: 'jifen', float: 'right' },
                            { name: '实币', id: 'realbi', float: 'right' },
                            { name: '业务笔数', id: 'billnum', float: 'right' },
                        ],
                        data: $scope.model.intservList,
                        lastBold: true,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }
                //设备分账
                if ($scope.model.equipDivisionList.length > 0 && $scope.model.selectBusi.bill_show_obj.m14 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 机台结账</label></div>';
                    $scope.model.equipDivisionList.forEach(function (device) {
                        html = '<div ' + smallModalStyle + '><label>' + device.name + '</label>&nbsp;&nbsp;&nbsp;<label>结账单号：' + device.ano + '</label>&nbsp;&nbsp;&nbsp;<label>收银员：' + device.cashier + '</label></div>';
                        var table = {
                            options: [
                                { name: '业务类型', id: 'bustype', float: 'center' },
                                { name: '金额', id: 'cash', float: 'right' },
                                { name: '储值', id: 'storecash', float: 'right' },
                                { name: '币', id: 'bi', float: 'right' },
                                { name: 'A币', id: 'abi', float: 'right' },
                                { name: 'A票', id: 'Apiao', float: 'right' },
                                { name: '票', id: 'piao', float: 'right' },
                                { name: '积分', id: 'jifen', float: 'right' },
                                { name: '实币', id: 'realbi', float: 'right' },
                                { name: '业务笔数', id: 'billnum', float: 'right' },
                            ],
                            data: device.devicedata,
                            lastBold: true
                        }
                        html += creatPrintTable(table);
                        $("#content").append(html);
                    })
                }
                //经营监控
                if (($scope.model.realCoinMonList.length > 0 && $scope.model.selectMoni.bill_show_obj.m6 == true)
                    || ($scope.model.memRegList.length > 0 && $scope.model.selectMoni.bill_show_obj.m7 == true)
                    || ($scope.model.memAccSumList.length > 0 && $scope.model.selectMoni.bill_show_obj.m8 == true)
                    || ($scope.model.curAccBanList.length > 0 && $scope.model.selectMoni.bill_show_obj.m15 == true)
                    || ($scope.model.youhuiList.length > 0 && $scope.model.selectMoni.bill_show_obj.m16 == true)) {
                    var html = '<div ' + bigModalStyle + '><label>◆ 经营监控</label></div>';
                    $("#content").append(html);
                }
                //实币监控
                if ($scope.model.realCoinMonList.length > 0 && $scope.model.selectMoni.bill_show_obj.m6 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 实币监控（平衡公式：售币+兑币+机台退币=投币+存币）</label></div>';
                    var table = {
                        options: [
                            { name: '售币', id: 'salebi', float: 'right' },
                            { name: '兑币', id: 'exbi', float: 'right' },
                            { name: '机台退币', id: 'tuibi', float: 'right' },
                            { name: '投币', id: 'toubi', float: 'right' },
                            { name: '存币', id: 'cunbi', float: 'right' },
                        ],
                        data: $scope.model.realCoinMonList,
                        lastBold: false,
                        width: 400,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }
                //会员注册
                if ($scope.model.memRegList.length > 0 && $scope.model.selectMoni.bill_show_obj.m7 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 会员注册</label></div>';
                    var table = {
                        options: [
                            { name: '序号', id: 'orderNum', float: 'center' },
                            { name: '卡号', id: 'cardno', float: 'center' },
                            { name: '姓名', id: 'name', float: 'center' },
                            { name: '电话', id: 'tel', float: 'center' },
                            { name: '金额', id: 'cash', float: 'right' },
                            { name: '币值', id: 'bi', float: 'right' },
                            { name: 'A币', id: 'abi', float: 'right' },
                        ],
                        data: $scope.model.memRegList,
                        lastBold: true,
                        width: 400,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }
                //会员账户汇总
                if ($scope.model.memAccSumList.length > 0 && $scope.model.selectMoni.bill_show_obj.m8 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 会员账户汇总</label></div>';
                    var table = {
                        options: [
                            { name: '', id: 'name', float: 'center' },
                            { name: '储值', id: 'store', float: 'right' },
                            { name: '币值', id: 'bi', float: 'right' },
                            { name: 'A币值', id: 'abi', float: 'right' },
                            { name: 'A票值', id: 'apiao', float: 'right' },
                            { name: '票值', id: 'piao', float: 'right' },
                            { name: '积分', id: 'jifen', float: 'right' },
                            { name: '会员数量', id: 'membernum', float: 'right' },
                        ],
                        data: $scope.model.memAccSumList,
                        lastBold: true,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }
                //本(当)期账户结余
                if ($scope.model.curAccBanList.length > 0 && $scope.model.selectMoni.bill_show_obj.m15 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 本期账户结余</label></div>';
                    var table = {
                        options: [
                            { name: '会员类型', id: 'cardtypename', float: 'center' },
                            { name: '总数量', id: 'totalnum', float: 'right' },
                            { name: '活动数量', id: 'activenum', float: 'right' },
                            { name: '币值', id: 'bi', float: 'right' },
                            { name: '票值', id: 'piao', float: 'right' },
                            { name: 'A币', id: 'abi', float: 'right' },
                            { name: 'A票', id: 'apiao', float: 'right' },
                            { name: '积分', id: 'jifen', float: 'right' },
                            { name: '储值', id: 'storecash', float: 'right' },
                        ],
                        data: $scope.model.curAccBanList,
                        lastBold: false,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }
                //优惠券结算
                if ($scope.model.youhuiList.length > 0 && $scope.model.selectMoni.bill_show_obj.m16 == true) {
                    html = '<div ' + smallModalStyle + '><label>● 优惠券结算</label></div>';
                    var table = {
                        options: [
                            { name: '优惠券名称', id: 'cardtypename', float: 'center' },
                            { name: '优惠券类型', id: 'totalnum', float: 'center' },
                            { name: '张数', id: 'activenum', float: 'center' },
                            { name: '现金', id: 'bi', float: 'right' },
                            { name: '赠币', id: 'piao', float: 'right' },
                            { name: '赠A币', id: 'abi', float: 'right' },
                        ],
                        data: $scope.model.youhuiList,
                        lastBold: true,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html);
                }


                LODOP = getLodop();
                LODOP.PRINT_INITA(10, 10, 754, 453, "分店场地结账表");
                LODOP.SET_PRINT_STYLE("FontSize", 10);
                LODOP.SET_PRINT_STYLE("Bold", 1);
                LODOP.SET_PRINT_STYLE("FontColor", '#000');
                LODOP.ADD_PRINT_TEXT(21, 300, 151, 30, "分店场地结账表");
                LODOP.SET_PRINT_STYLEA(0, "FontSize", 14);
                LODOP.SET_PRINT_STYLEA(0, "Horient", 2);
                LODOP.ADD_PRINT_TEXT(50, "28%", 480, 50, '汇总时间:' + $scope.model.checkoutInfo.starttime + '到：' +
                    $scope.model.checkoutInfo.endtime);

                LODOP.ADD_PRINT_LINE(70, 30, 70, "RightMargin:40", 0, 1);

                LODOP.ADD_PRINT_HTM(80, 30, "RightMargin:40", "BottomMargin:80", document.getElementById("content").outerHTML);

                LODOP.ADD_PRINT_TEXT(400, 542, 165, 22, "第#页/共&页");
                LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
                LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
                LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
                LODOP.PREVIEW();
            }
        }
    })
})