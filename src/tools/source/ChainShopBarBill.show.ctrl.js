require(['./modules-loader'], function (app) {
    app.controller("ChainShopBarBill.show.ctrl", function ($scope, $location, $getBarAccountDetail) {
        $scope.model = {
            chainshop_no: $location.search().chainshop_no,
            acode: $location.search().acode,
            checker: "",
            startTime: $location.search().startTime,
            endTime: $location.search().endTime,
            ycash: "",
            rcash: "",
            bills_base: [
                  { id: 1, name: _('业务结算'), show: false },
                  { id: 2, name: _('异常交易记录'), show: false },
                  { id: 3, name: _('支付类型统计'), show: false },
                  { id: 4, name: _('游乐项目'), show: false },
                  { id: 5, name: _('年月次票'), show: false },
                  { id: 6, name: _('优惠券'), show: false }
            ],
            setColumn: {
                //全部列
                columns: [
                    { colunmname: _('业务类型'), bindname: 'typename', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-center', sort: 0 },
                    { colunmname: _('价值'), bindname: 'cash', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 1 },
                    { colunmname: _('储值'), bindname: 'storecash', isfixed: 0, isseclect: 0, ownreport: "barBill", css: 'text-right', sort: 2 },
                    { colunmname: _('币值'), bindname: 'bi', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 3 },
                    { colunmname: _('赠币'), bindname: 'zbi', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 4 },
                    { colunmname: _('A币'), bindname: 'abi', isfixed: 0, isseclect: 0, ownreport: "barBill", css: 'text-right', sort: 5 },
                    { colunmname: _('A票'), bindname: 'apiao', isfixed: 0, isseclect: 0, ownreport: "barBill", css: 'text-right', sort: 6 },
                    { colunmname: _('票'), bindname: 'piao', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 7 },
                    { colunmname: _('实币'), bindname: 'realbi', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 8 },
                    { colunmname: _('数字币'), bindname: 'digbi', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 9 },
                    { colunmname: _('数字A币'), bindname: 'digAbi', isfixed: 0, isseclect: 0, ownreport: "barBill", css: 'text-right', sort: 10 },
                    { colunmname: _('数字彩票（票）'), bindname: 'lottery_piao', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 11 },
                    { colunmname: _('数字彩票（币）'), bindname: 'lottery_bi', isfixed: 0, isseclect: 0, ownreport: "barBill", css: 'text-right', sort: 12 },
                    { colunmname: _('数字彩票（A票）'), bindname: 'lottery_apiao', isfixed: 0, isseclect: 0, ownreport: "barBill", css: 'text-right', sort: 13 },
                    { colunmname: _('数字彩票（A币）'), bindname: 'lottery_abi', isfixed:0, isseclect: 0, ownreport: "barBill", css: 'text-right', sort: 14 },
                    { colunmname: _('存票卡'), bindname: 'cupiao', isfixed: 0, isseclect: 0, ownreport: "barBill", css: 'text-right', sort: 15 },
                    { colunmname: _('积分'), bindname: 'jifen', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 16 },
                    { colunmname: _('卡数'), bindname: 'cardnum', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 17 },
                    { colunmname: _('笔数'), bindname: 'billnum', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 18 },
                ],
                //显示的列
                showCols: [],
                //默认的列
                defaultCols: [
                    { colunmname: _('业务类型'), bindname: 'typename', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-center', sort: 0 },
                    { colunmname: _('价值'), bindname: 'cash', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 1 },
                    { colunmname: _('币值'), bindname: 'bi', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 3 },
                    { colunmname: _('赠币'), bindname: 'zbi', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 4 },
                    { colunmname: _('票'), bindname: 'piao', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 7 },
                    { colunmname: _('实币'), bindname: 'realbi', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 8 },
                    { colunmname: _('数字币'), bindname: 'digbi', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 9 },
                    { colunmname: _('数字彩票（票）'), bindname: 'lottery_piao', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 11 },
                    { colunmname: _('积分'), bindname: 'jifen', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 16 },
                    { colunmname: _('卡数'), bindname: 'cardnum', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 17 },
                    { colunmname: _('笔数'), bindname: 'billnum', isfixed: 1, isseclect: 1, ownreport: "barBill", css: 'text-right', sort: 18 },
                ],
                //设置列里待选择的列
                noSelectCols: [],
                //设置列里已选择的列
                selectCols: [],
                //设置列里可选字段的选中项
                leftChooseCol: [],
                //设置列里显示字段的选中项
                rightChooseCol: [],
            },
            bills: {
                BarAccountRecords: [],
                BarAccountErrorRecords: [],
                BarPaymentTypeSumGroup: [],
                GateTicketBills: [],
                LimitTicketBill: [],
                CouponCheckOutSummarys: []
            },
            operations: [
                "1", "2", "11", "129", "133"
            ],
        };
        $scope.action = {
            init: function () {
                $scope.action.getBarAccountDetail();
                $scope.action.setColumn.initColumns();
            },
            getBarAccountDetail: function () {
                var querydata = {};
                querydata.appid = localStorage.getItem("app_id");
                querydata.token = localStorage.getItem("access_token");
                querydata.user_session = localStorage.getItem("user_session");
                querydata.chainshop_no = $scope.model.chainshop_no;
                querydata.acode = $scope.model.acode;
                $getBarAccountDetail({
                    data: querydata,
                    onSuccess: function (res) {
                        $scope.model.checker = res.biz_data.items[0].kinddata[0].checker;
                        $scope.model.ycash = res.biz_data.items[0].kinddata[0].ycash.toFixed(2);
                        $scope.model.rcash = res.biz_data.items[0].kinddata[0].rcash.toFixed(2);
                        res.biz_data.items.shift();
                        res.biz_data.items.forEach(function (item) {
                            $scope.model.bills_base[item.kind-1].show = true;
                            switch (item.kind) {
                                case 1://业务结算数据
                                    $scope.model.bills.BarAccountRecords = item;
                                    $scope.model.bills.BarAccountRecords.kinddata.forEach(function (bar) {
                                        var total = {
                                            typename: _("合计"),
                                            cash: 0,
                                            storecash: 0,
                                            bi: 0,
                                            zbi: 0,
                                            abi: 0,
                                            apiao: 0,
                                            piao: 0,
                                            realbi: 0,
                                            digbi: 0,
                                            digAbi: 0,
                                            lottery_piao: 0,
                                            lottery_bi: 0,
                                            lottery_apiao: 0,
                                            lottery_abi: 0,
                                            cupiao: 0,
                                            jifen: 0,
                                            cardnum: 0,
                                            billnum: 0
                                        };
                                        bar.batai.forEach(function (batai) {
                                            total.cash += batai.cash;
                                            total.storecash += batai.storecash;
                                            total.bi += batai.bi;
                                            total.zbi += batai.zbi;
                                            total.abi += batai.abi;
                                            total.apiao += batai.apiao;
                                            total.piao += batai.piao;
                                            total.realbi += batai.realbi;
                                            total.digbi += batai.digbi;
                                            total.digAbi += batai.digAbi;
                                            total.lottery_piao += batai.lottery_piao;
                                            total.lottery_bi += batai.lottery_bi;
                                            total.lottery_apiao += batai.lottery_apiao;
                                            total.lottery_abi += batai.lottery_abi;
                                            total.cupiao += batai.cupiao;
                                            total.jifen += batai.jifen;
                                            total.cardnum += batai.cardnum;
                                            total.billnum += batai.billnum;

                                            batai.cash = batai.cash.toFixed(2);
                                            batai.storecash = batai.storecash.toFixed(2);
                                        })
                                        total.cash = total.cash.toFixed(2);
                                        total.storecash = total.storecash.toFixed(2);
                                        bar.batai.push(total);
                                    });                                    
                                    break;
                                case 2://异常交易记录
                                    $scope.model.bills.BarAccountErrorRecords = [];
                                    item.kinddata.forEach(function (gate) {
                                        gate.cash = gate.cash.toFixed(2);
                                        $scope.model.bills.BarAccountErrorRecords.push(gate);
                                    })
                                    break;
                                case 3://支付类型统计
                                    $scope.model.bills.BarPaymentTypeSumGroup = [];
                                    var total = {
                                        paytype: "",
                                        paytypename: _("合计"),
                                        cash: 0
                                    };
                                    item.kinddata.forEach(function (pay) {
                                        total.cash += pay.cash;

                                        pay.cash = pay.cash.toFixed(2);
                                        $scope.model.bills.BarPaymentTypeSumGroup.push(pay);
                                    })
                                    total.cash = total.cash.toFixed(2);
                                    $scope.model.bills.BarPaymentTypeSumGroup.push(total);
                                    break;
                                case 4://游乐项目合计
                                    $scope.model.bills.GateTicketBills = [];
                                    var total = {
                                        name: _("合计"),
                                        count: 0,
                                        cash: 0,
                                        bi: 0,
                                        abi: 0,
                                        times: 0
                                    };
                                    item.kinddata.forEach(function (gate) {
                                        total.count += gate.count;
                                        total.cash += gate.cash;
                                        total.bi += gate.bi;
                                        total.abi += gate.abi;
                                        total.times += gate.times;

                                        gate.cash = gate.cash.toFixed(2);
                                        $scope.model.bills.GateTicketBills.push(gate);
                                    })
                                    total.cash = total.cash.toFixed(2);
                                    $scope.model.bills.GateTicketBills.push(total);
                                    break;
                                case 5://年月次票合计
                                    $scope.model.bills.LimitTicketBill = [];
                                    var total = {
                                        name: _("合计"),
                                        count: 0,
                                        cash: 0,
                                        bi: 0,
                                        abi: 0
                                    };
                                    item.kinddata.forEach(function (ticket) {
                                        total.count += ticket.count;
                                        total.cash += ticket.cash;
                                        total.bi += ticket.bi;
                                        total.abi += ticket.abi;

                                        ticket.cash = ticket.cash.toFixed(2);
                                        $scope.model.bills.LimitTicketBill.push(ticket);
                                    })
                                    total.cash = total.cash.toFixed(2);
                                    $scope.model.bills.LimitTicketBill.push(total);
                                    break;
                                case 6://优惠券
                                    $scope.model.bills.CouponCheckOutSummarys = [];
                                    var total = {
                                        name: _("合计"),
                                        typename: "--",
                                        count: 0,
                                        cash: 0,
                                        bi: 0,
                                        abi: 0
                                    };
                                    item.kinddata.forEach(function (ticket) {
                                        if (ticket.type == 1) {
                                            ticket.typename=_("赠币券")
                                        }
                                        if (ticket.type == 2) {
                                            ticket.typename = _("现金券")
                                        }
                                        if (ticket.type == 3) {
                                            ticket.typename = _("赠A币券")
                                        }
                                        total.count += ticket.count;
                                        total.cash += ticket.cash;
                                        total.bi += ticket.bi;
                                        total.abi += ticket.abi;

                                        ticket.cash = ticket.cash.toFixed(2);
                                        $scope.model.bills.CouponCheckOutSummarys.push(ticket);
                                    })
                                    total.cash = total.cash.toFixed(2);
                                    $scope.model.bills.CouponCheckOutSummarys.push(total);
                                    break;
                            }
                        })
                    },
                    onFail: function (msg) {
                        alert(msg);
                    },
                    onError: function (e_msg) {
                        alert(e_msg);
                    }
                })
            },
            goBack: function () {
                $location.path("/AccountManage/ChainShopBarAccount").search({});
            },
            //设置列部分
            setColumn: {
                initColumns: function () {
                    if (localStorage.barColumns != undefined) {
                        $scope.model.setColumn.showCols = JSON.parse(localStorage.barColumns);
                    }
                    else {
                        $scope.model.setColumn.showCols = $scope.model.setColumn.defaultCols.slice();
                    }
                },
                setColumnsClick: function () {
                    $("#SetColumn").modal('show');
                    $scope.model.setColumn.selectCols = $scope.model.setColumn.showCols.slice();//复制数组
                    $scope.model.setColumn.noSelectCols = [];
                    $scope.model.setColumn.columns.forEach(function (item) {
                        if (!$scope.model.setColumn.selectCols.find(function (date) {
                            return date.bindname == item.bindname;
                        })) {
                            $scope.model.setColumn.noSelectCols.push(item);
                        }
                    })
                    $scope.model.setColumn.leftChooseCol = [];
                    $scope.model.setColumn.rightChooseCol = [];
                },
                addCols: function () {
                    $scope.model.setColumn.leftChooseCol.forEach(function (item) {
                        item.isseclect = 1;
                        $scope.model.setColumn.selectCols.push(item);
                        var x = $scope.model.setColumn.noSelectCols.findIndex(function (col) {
                            return col.bindname == item.bindname;
                        });
                        if (x >= 0) {
                            $scope.model.setColumn.noSelectCols.splice(x, 1);
                        }
                    })
                },
                removeCols: function () {
                    $scope.model.setColumn.rightChooseCol.forEach(function (item) {
                        item.isseclect = 0;
                        $scope.model.setColumn.noSelectCols.push(item);
                        var x = $scope.model.setColumn.selectCols.findIndex(function (col) {
                            return col.bindname == item.bindname;
                        });
                        if (x >= 0) {
                            $scope.model.setColumn.selectCols.splice(x, 1);
                        }
                    });
                    //排序
                    $scope.model.setColumn.noSelectCols.sort(function (a, b) {
                        return a.sort - b.sort;
                    })
                },
                shiftUp: function () {
                    if ($scope.model.setColumn.rightChooseCol.length == 1) {
                        var x = $scope.model.setColumn.selectCols.findIndex(function (col) {
                            return col.bindname == $scope.model.setColumn.rightChooseCol[0].bindname;
                        });
                        if (x > 0) {
                            var col = $scope.model.setColumn.selectCols[x];
                            $scope.model.setColumn.selectCols.splice(x, 1);
                            $scope.model.setColumn.selectCols.splice(x - 1, 0, col);
                        }
                    }
                },
                shiftDown: function () {
                    if ($scope.model.setColumn.rightChooseCol.length == 1) {
                        var x = $scope.model.setColumn.selectCols.findIndex(function (col) {
                            return col.bindname == $scope.model.setColumn.rightChooseCol[0].bindname;
                        });
                        if (x < $scope.model.setColumn.selectCols.length) {
                            var col = $scope.model.setColumn.selectCols[x];
                            $scope.model.setColumn.selectCols.splice(x, 1);
                            $scope.model.setColumn.selectCols.splice(x + 1, 0, col);
                        }
                    }
                },
                resetCols: function () {
                    $scope.model.setColumn.selectCols = $scope.model.setColumn.defaultCols.slice();
                    $scope.model.setColumn.noSelectCols = [];
                    $scope.model.setColumn.columns.forEach(function (item) {
                        if (!$scope.model.setColumn.selectCols.find(function (date) {
                            return date.bindname == item.bindname;
                        })) {
                            $scope.model.setColumn.noSelectCols.push(item);
                        }
                    })
                    $scope.model.setColumn.leftChooseCol = [];
                    $scope.model.setColumn.rightChooseCol = [];
                },
                save: function () {
                    $scope.model.setColumn.showCols = $scope.model.setColumn.selectCols.slice();
                    localStorage.barColumns = JSON.stringify($scope.model.setColumn.selectCols);
                    $("#SetColumn").modal('hide');
                }
            },
            printTable: function () {
                $("#title").empty();
                $("#content").empty();
                var bigModalStyle = ' style="margin:15px 30px;font-weight: 600"';
                var smallModalStyle = ' style="margin:15px 30px"'
                var title = [
                        '<div style="text-align: center;width: 100%;font-weight: 600;font-size: 19px;">' + _("吧台结账单") + '</div>',
                        '<div style="width: 100%;border-bottom: 1px solid; margin: 25px 25px 25px;font-size:14px;padding-bottom:5px">',
                            '<label style="width:50%;padding-left:20px;">' + _("账单号") + '：' + $scope.model.acode + '</label>',
                            //'<label style="margin-left:20px;width:40%">结账人：' + $scope.model.checker + '</label>',
                            '<div style="margin-top:5px">',
                                '<label style="width:50%;;padding-left:20px;">' + _("结账人") + '：' + $scope.model.checker + '</label>',
                                '<label style="margin-left:20px;">' + _("账期") + '：' + $scope.model.startTime + '</label>',
                                '<label >' + _("到") + '：' + $scope.model.endTime + '</label>',
                            '</div>',
                        '</div>',
                ].join("\n");
                $("#title").append(title)
                var html = '';

                //业务结算
                if ($scope.model.bills_base[0].show) {
                    html = '<div ' + bigModalStyle + '><label>◆ ' + _("业务结算") + '</label><div>';
                    $("#content").append(html);
                    var options = [];
                    $scope.model.setColumn.showCols.forEach(function (item) {
                        var obj = {};
                        obj.name = item.colunmname;
                        obj.id = item.bindname;
                        obj.float = item.css.substr(5);
                        options.push(obj);
                    })
                    $scope.model.bills.BarAccountRecords.kinddata.forEach(function (bar) {
                        html = '<div ' + smallModalStyle + '><label>' + _("吧台") + '：' + bar.barnameid + '</label><div>';
                        var table = {
                            options: options,
                            data: bar.batai,
                            lastBold: true,
                        }
                        html += creatPrintTable(table);
                        $("#content").append(html)
                    })         
                    html = [
                        '<div style="width:700px;text-align:right;margin-top:-20px">',
                            '<label>' + _("应收") + '：' + $scope.model.ycash + _("元") + '</label>',
                            '<label style="margin-left:10px">' + _("实收") + '：' + $scope.model.rcash + _("元") + '</label>',
                        '</div>',
                    ].join('');
                    $("#content").append(html);
                }
                //异常交易记录
                if ($scope.model.bills_base[1].show) {
                    html = '<div ' + smallModalStyle + '><label>◆ ' + _("异常交易记录") + '</label><div>';
                    var table = {
                        options: [
                            { name: _('吧台'), id: 'devicename', float: 'center' },
                            { name: _('业务时间'), id: 'btime', float: 'left' },
                            { name: _('卡号'), id: 'cardno', float: 'left' },
                            { name: _('业务类型'), id: 'typename', float: 'left' },
                            { name: _('价值'), id: 'cash', float: 'right' },
                            { name: _('币值'), id: 'bi', float: 'right' },
                            { name: _('票'), id: 'piao', float: 'right' },
                            { name: _('数字币'), id: 'dig', float: 'right' },
                            { name: _('数字彩票'), id: 'lottery', float: 'right' },
                            { name: _('异常原因'), id: 'comment', float: 'right' },
                        ],
                        data: $scope.model.bills.BarAccountErrorRecords,
                        lastBold: true,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html)
                }
                //支付类型统计
                if ($scope.model.bills_base[2].show) {
                    html = '<div ' + smallModalStyle + '><label>◆ ' + _("支付类型统计") + '</label><div>';
                    var table = {
                        options: [
                            { name: _('支付类型'), id: 'paytypename', float: 'center' },
                            { name: _('支付金额'), id: 'cash', float: 'right' },
                        ],
                        data: $scope.model.bills.BarPaymentTypeSumGroup,
                        lastBold: true,
                        width: 200
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html)
                }
                //游乐项目
                if ($scope.model.bills_base[3].show) {
                    html = '<div ' + smallModalStyle + '><label>◆ ' + _("游乐项目") + '</label><div>';
                    var table = {
                        options: [
                            { name: _('项目名称'), id: 'name', float: 'center' },
                            { name: _('张数'), id: 'count', float: 'right' },
                            { name: _('收现金'), id: 'cash', float: 'right' },
                            { name: _('扣A币'), id: 'abi', float: 'right' },
                            { name: _('扣币'), id: 'bi', float: 'right' },
                            { name: _('扣次'), id: 'times', float: 'right' },
                        ],
                        data: $scope.model.bills.GateTicketBills,
                        lastBold: true,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html)
                }
                //年月次票
                if ($scope.model.bills_base[4].show) {
                    html = '<div ' + smallModalStyle + '><label>◆ ' + _("年月次票") + '</label><div>';
                    var table = {
                        options: [
                            { name: _('年月票名称'), id: 'name', float: 'center' },
                            { name: _('数量'), id: 'count', float: 'right' },
                            { name: _('收现金'), id: 'cash', float: 'right' },
                            { name: _('扣币'), id: 'bi', float: 'right' },
                            { name: _('扣A币'), id: 'abi', float: 'right' },
                        ],
                        data: $scope.model.bills.LimitTicketBill,
                        lastBold: true,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html)
                }
                //优惠券
                if ($scope.model.bills_base[5].show) {
                    html = '<div ' + smallModalStyle + '><label>◆ ' + _("优惠券") + '</label><div>';
                    var table = {
                        options: [
                            { name: _('名称'), id: 'name', float: 'center' },
                            { name: _('类型'), id: 'type', float: 'center' },
                            { name: _('张数'), id: 'count', float: 'right' },
                            { name: _('抵现金'), id: 'cash', float: 'right' },
                            { name: _('赠币'), id: 'bi', float: 'right' },
                            { name: _('赠A币'), id: 'abi', float: 'right' },
                        ],
                        data: $scope.model.bills.CouponCheckOutSummarys,
                        lastBold: true,
                    }
                    html += creatPrintTable(table);
                    $("#content").append(html)
                }
                var printer = new Printer();
                printer.PrintHtmlPreview(document.getElementById("printer").outerHTML);
            },
            operationClick: function (item) {
                switch (item.bustype) {
                    case "1": {
                        $location.path('/AccountManage/MemberRegister').search({ "chainshop_no": $scope.model.chainshop_no, "acode": $scope.model.acode, "startTime": $scope.model.startTime, "endTime": $scope.model.endTime });
                        break;
                    }
                    case "2": {
                        $location.path('/AccountManage/MemberRecharge').search({ "chainshop_no": $scope.model.chainshop_no, "acode": $scope.model.acode, "startTime": $scope.model.startTime, "endTime": $scope.model.endTime });
                        break;
                    }
                    case "11": {
                        $location.path('/AccountManage/SellCoin').search({ "chainshop_no": $scope.model.chainshop_no, "acode": $scope.model.acode, "startTime": $scope.model.startTime, "endTime": $scope.model.endTime });
                        break;
                    }
                    case "129": {
                        $location.path('/AccountManage/SalesPackage').search({ "chainshop_no": $scope.model.chainshop_no, "acode": $scope.model.acode, "startTime": $scope.model.startTime, "endTime": $scope.model.endTime });
                        break;
                    }
                    case "133": {
                        $location.path('/AccountManage/OpenCard').search({ "chainshop_no": $scope.model.chainshop_no, "acode": $scope.model.acode, "startTime": $scope.model.startTime, "endTime": $scope.model.endTime });
                        break;
                    }
                }
            },
        }
    })
})