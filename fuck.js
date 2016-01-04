var a = {
    title:"店铺信息详情页",
    content:{
        head:{
            text:"页面顶部总标题",
            link:""
        },
        frame:[
                {
                     head:"基本信息",
                     format:"module-info",
                     data:[
                       [
                           {name:"店铺ID", value:"67890809",format:"info-text",editable:true,dataLimit:null},
                           {name:"店铺名称",value:"测试店铺名称xxxx",format:"info-text",editable:true,dataLimit:null}
                       ],
                       [
                           {name:"用户ID", value:"67890809",format:"info-text",editable:true,dataLimit:null},
                           {name:"用户名称",value:"测试店铺名称xxxx",format:"info-text",editable:true,dataLimit:null}
                       ],
                       [
                           {name:"加密店铺", value:"67890809",format:"info-text",editable:true,dataLimit:null},
                           {name:"加密店铺ID",value:"测试店铺名称xxxx",format:"info-text",editable:true,dataLimit:null}
                       ],
                       [
                           {name:"店铺类型", value:"67890809",format:"info-text",editable:true,dataLimit:null},
                           {name:"主营类目",value:"测试店铺名称xxxx",format:"info-text",editable:true,dataLimit:null}
                       ],
                       [
                           {name:"所在市场", value:"67890809",format:"info-text",editable:true,dataLimit:null},
                           {name:"入驻时间",value:"测试店铺名称xxxx",format:"info-text",editable:true,dataLimit:null}
                       ],
                       [
                           {name:"个性化域名", value:"67890809",format:"info-text",editable:true,dataLimit:null},
                           {name:"注册类型",value:"测试店铺名称xxxx",format:"info-text",editable:true,dataLimit:null}
                       ],
                    ]
                },

                {
                    head:"活动信息",
                    format:"module-table",
                    category:["活动名称","活动状态","店铺参与状态"],
                    data:[
                        ["asdede","asdede","asdede","asdede","asdede","asdede"],
                        ["asdede","asdede","asdede","asdede","asdede","asdede"],
                        ["asdede","asdede","asdede","asdede","asdede","asdede"]
                    ],
                    scrollHoz:false
                },
                {
                    head:"处罚记录",
                    format:"module-multi",
                    data:[
                        {
                            head:"店铺处罚",
                            format:"module-table",
                            category:["处罚时间","处罚原因","处罚内容"],
                            data:[
                                ["asdede","asdede","asdede","asdede","asdede","asdede"],
                                ["asdede","asdede","asdede","asdede","asdede","asdede"],
                                ["asdede","asdede","asdede","asdede","asdede","asdede"]
                            ]
                        },
                        {
                            head:"商品处罚",
                            format:"module-table",
                            category:["处罚时间","商品名称","处罚原因","处罚内容"],
                            data:[
                                ["asdede","asdede","asdede","asdede","asdede","asdede"],
                                ["asdede","asdede","asdede","asdede","asdede","asdede"],
                                ["asdede","asdede","asdede","asdede","asdede","asdede"]
                            ]
                        }
                    ]
                },
                {
                    head:"带日期的查询项",
                    format:"module-date-condition",
                    condition:{
                         startTime:"",
                         endTime:"",
                         timeType:["yesterday","week","last7days","last30day"]
                    },
                    queryUrl:"http://xxxxxx",
                    targetId:"#moudle-table-123"
                },
                {
                    head:"高级自助查询项",
                    format:"module-advanced-condition",
                    condition:[
                         {name:"orderID",label:"订单ID",type:"input",data:null,dafaultValue:""},
                         {name:"area",label:"面向人群",type:"select",data:["人群1","人群2"],dafaultValue:"0"},
                         {name:"startTime",label:"开始时间",type:"datetime",data:null,dafaultValue:""}
                    ],
                    queryUrl:"http://xxxxxx",
                    targetId:"#moudle-table-123"
                },
                {
                  head: "筛选table列表中【列】的显示",
                  format: "module-table-control",
                  targetId: "#moudle-table-123",
                  category: ["列1","列2","列3"],
                  queryUrl:"http://xxxxxx"
                },
                {
                  head: "分页",
                  format: "module-paging",
                  targetId: "111",
                  queryUrl: "http://www.xiadiam.com/111/sss",
                  data: {
                    currentPage: 1,
                    totalPages: 100 ,
                    singelPages: 10
                  }
                }

        ]
    }
}

