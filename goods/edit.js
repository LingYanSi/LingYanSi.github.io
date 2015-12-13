/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var GoodsTags = __webpack_require__(186);
	var GoodsClassify = __webpack_require__(183);
	var StockMode = __webpack_require__(207);
	var Title = __webpack_require__(209);
	var Desc = __webpack_require__(181);
	var Code = __webpack_require__(177);
	var Price = __webpack_require__(199);
	var CounterPrice = __webpack_require__(178);
	var Stock = __webpack_require__(206);
	var Brand = __webpack_require__(176);
	var Postage = __webpack_require__(196);
	var PostageInfo = __webpack_require__(197);
	var Volume = __webpack_require__(210);
	var Weight = __webpack_require__(211);
	var CoverImages = __webpack_require__(179);
	var SkuSetting = __webpack_require__(205);
	var GoodsProp = __webpack_require__(185);
	var GoodsDetail = __webpack_require__(184);
	var SizeDesc = __webpack_require__(200);
	var CustomModule = __webpack_require__(180);
	var MoreBar = __webpack_require__(195);
	var EditCategoryModal = __webpack_require__(192);
	var Modal = __webpack_require__(21);
	var SaveError = __webpack_require__(194);
	var Link = __webpack_require__(172);
	var Validator = __webpack_require__(174);
	var BondZones = __webpack_require__(175);
	__webpack_require__(208);

	// 是否正在请求数据
	var isAjax = false;

	var ContentView = React.createClass({
	    displayName: 'ContentView',

	    mixins: [React.addons.LinkedStateMixin],
	    getInitialState: function getInitialState() {
	        return {
	            data: {}
	        };
	    },
	    // 在挂载结束之后马上被调用
	    componentDidMount: function componentDidMount() {
	        var itemId = window.XD.PHPBridge.getItem('itemId');
	        var cid = window.XD.PHPBridge.getItem('cid');

	        // 本地测试，千万别发上线
	        // itemId = '17nw0yu';

	        // 如果是编辑页面
	        var url = itemId ? '/pc/itemmanager/item/edit/' + itemId : '/pc/itemmanager/item/add';

	        // 如果有类目id
	        if (cid) {
	            url = url + '?cid=' + cid;
	        }

	        $.get(url, { _ajax: 1 }, (function (data) {
	            if (data.status.code == 1001) {
	                if (this.isMounted()) {
	                    var result = data.result;
	                    this.setState({
	                        data: result
	                    });
	                }
	            } else {
	                var result = data.result;

	                if (result) {
	                    // 如果有跳转地址
	                    if (result.redirect) {
	                        Modal.alert(result.error, function () {
	                            location.href = result.redirect;
	                        });
	                        return;
	                    }
	                    result.error && Modal.alert(result.error);
	                } else {
	                    Modal.alert(data.status.msg);
	                }
	            }
	        }).bind(this), 'json');

	        // 有坑，在ie8中，点击任意一个a标签，都会弹出来！！！！，什么鬼
	        $(window).on('beforeunload', (function () {
	            if (!ContentView.formNotChange) {
	                // return '退出后未保存的信息将被永久删除，确认吗？'
	            }
	        }).bind(this));
	    },

	    // 编辑类目
	    editCategory: function editCategory(itemId) {
	        Modal.open({
	            title: '类目',
	            id: 'J_EditCategoryModal',
	            body: React.createElement(EditCategoryModal, { itemId: itemId })
	        });
	    },

	    // 获取运费类型
	    getPostageType: function getPostageType(choosePostageId) {
	        var postage = this.props.postage;
	        var postageType = 0;

	        // 查找运费类型
	        postage && postage.postageList && _.each(postage.postageList, function (item, key) {
	            if (choosePostageId == item.tplId) {
	                postageType = item.billingMethods;
	            }
	        });

	        return postageType;
	    },

	    // 保存并上架
	    saveAndSale: function saveAndSale(type, event) {
	        var submitData = this.getSubmitData(type);
	        submitData && this.postData(submitData, event.target);
	    },

	    // 保存
	    save: function save(type, event) {
	        var submitData = this.getSubmitData(type);
	        submitData && this.postData(submitData, event.target);
	    },

	    // 提交数据
	    postData: function postData(submitData, elem) {

	        // 禁用按钮
	        elem.setAttribute('disabled', 'disabled');

	        if (isAjax) {
	            return;
	        }
	        isAjax = true;

	        $.post('/pc/itemmanager/item/save', submitData, (function (data, textStatus, xhr) {
	            if (data.status.code == 1001) {
	                data.result && Modal.tip(data.result.msg, function () {
	                    // 保存成功，不弹出页面离开提示信息
	                    ContentView.formNotChange = true;
	                    // 后端会返回商品详情页 url
	                    location.href = Link.GOODS_DETAIL_URL + data.result.itemId;
	                }, 1500);
	            } else {
	                if (_.isObject(data.result)) {
	                    var errorMsg = [];
	                    data.result && _.each(data.result, function (msg, key) {
	                        errorMsg.push(React.createElement(SaveError, { msg: msg }));
	                    });
	                    Modal.alert(errorMsg);
	                } else {
	                    Modal.alert(data.result);
	                }
	            }

	            // 启动按钮
	            elem.removeAttribute('disabled', 'disabled');

	            isAjax = false;
	        }).bind(this), 'json');
	    },

	    // 获取提交数据
	    getSubmitData: function getSubmitData(autoShelf) {
	        var data = this.state.data;

	        // 是否交过保证金
	        var needFillDetail = data.needFillDetail;

	        var submitData = {};

	        submitData['cid'] = data.cid || '';
	        submitData['tradeItemId'] = data.itemId || '';

	        // ------------------本地测试START-------------
	        // -----------------本地测试END----------------

	        // 保税区
	        if (data.bondzones.visible) {
	            submitData['bondedZoneId'] = BondZones.getData();
	            // console.log('保税区',submitData['bondedZoneId'])
	            if (!submitData['bondedZoneId']) {
	                Modal.alert('请选择保税区');
	                return;
	            }
	        }

	        // 标题
	        submitData['title'] = Title.getData();
	        if (!Validator.checkTitle(submitData.title)) {
	            return false;
	        }

	        // 双十一预售 开始
	        this.presaleObj = this.presaleObj || data.presale;
	        if (this.presaleObj && !data.presale_hidden) {
	            submitData.presale = {};
	            _.map(this.presaleObj, function (ele, key) {
	                submitData.presale[key] = ele;
	            });
	            // console.log('双十一预售presale:',submitData);
	        }
	        // 双十一预售 结束

	        // 简述
	        submitData['description'] = Desc.getData();
	        if (!Validator.checkDescription(submitData.description)) {
	            return false;
	        }

	        // 标签
	        submitData['tags'] = GoodsTags.getData();
	        if (needFillDetail) {
	            if (!Validator.checkTags(submitData.tags)) {
	                return false;
	            }
	        }
	        submitData.tags = submitData.tags.join(',');

	        // 封面图数据
	        submitData['coverImages'] = CoverImages.getData()._coverImages;
	        // console.log(submitData.coverImages);
	        if (!Validator.checkCoverImages(CoverImages.getData()._coverRelativeImages)) {
	            return false;
	        }
	        submitData.coverImages = submitData.coverImages.join(',');
	        // submitData.coverImages = '['+submitData.coverImages.join(',')+']';

	        // 设置分类
	        submitData['classIds'] = GoodsClassify.getData();

	        // 库存方式
	        submitData['stockMode'] = StockMode.getData();

	        // sku类型
	        var skuType = SkuSetting.getData().skuType;

	        // sku数据
	        submitData['sku'] = SkuSetting.getData().sku;
	        if (!Validator.checkSku(submitData.sku, skuType)) {
	            return false;
	        }
	        submitData.sku = submitData.sku.join(',');
	        // submitData.sku = '['+submitData.sku.join(',')+']';

	        // sku图片数据【删除】
	        submitData['skuImgInfo'] = SkuSetting.getData().skuImgInfo;
	        if (!Validator.checkSkuImgInfo(submitData.skuImgInfo, skuType)) {
	            return false;
	        }
	        submitData.skuImgInfo = submitData.skuImgInfo.join(',');

	        // 编码
	        submitData['code'] = Code.getData();
	        if (data.bondzones.visible && !submitData['code']) {
	            Modal.alert('编码不能为空');
	            return;
	        }

	        // 价格
	        submitData['price'] = Price.getData();
	        if (!Validator.checkPrice(submitData.price)) {
	            return false;
	        }

	        // 国内专柜价
	        if (data.counterPrice.isShow) {
	            submitData['counterPrice'] = CounterPrice.getData();
	        }

	        // 库存
	        submitData['stock'] = Stock.getData();
	        if (!Validator.checkStock(submitData.stock)) {
	            return false;
	        }
	        submitData.stock = ~ ~submitData.stock;

	        // 品牌
	        if (data.brand && data.brand.isBrandShow) {
	            submitData['brandId'] = Brand.getData();
	            if (data.brand.isBrandRequired) {
	                if (!Validator.checkBrand(submitData.brandId)) {
	                    return false;
	                }
	            }
	        }

	        // 运费
	        if (data.postage && data.postage.isShow) {
	            submitData['postageId'] = Postage.getData().postageId;
	            submitData['postageType'] = Postage.getData().postageType;
	        }

	        // 体积
	        if (data.postage && data.postage.isShow && Postage.getData().postageType == 3) {
	            submitData['volume'] = Volume.getData() || '';
	            if (!Validator.checkVolume(submitData.volume)) {
	                return false;
	            }
	        }

	        // 重量
	        if (data.postage && data.postage.isShow && Postage.getData().postageType == 2) {
	            submitData['weight'] = Weight.getData() || '';
	            if (!Validator.checkWeight(submitData.weight)) {
	                return false;
	            }
	        }

	        // 商品属性新版
	        if (!_.isEmpty(data.properties.defaultData) || data.properties.propertiesData) {
	            // 数据格式为[{title:'品牌',values:'adiaos',id:111},]
	            submitData['properties'] = GoodsProp.getData();
	            if (!Validator.checkProperties(submitData['properties'], data.properties.defaultData)) {
	                return false;
	            }
	            submitData['properties'] = '[' + submitData['properties'].join(',') + ']';
	        }

	        // sku尺码属性
	        submitData['skuProperties'] = SizeDesc.getData();
	        if (!Validator.checkSkuProperties(submitData['skuProperties'])) {
	            return false;
	        }
	        submitData.skuProperties = '[' + submitData.skuProperties.join(',') + ']';

	        // 商品详情
	        submitData['details'] = GoodsDetail.getData();
	        // if(!Validator.checkDetail(submitData['details'],data.categories)){
	        //     return false;
	        // }

	        // 是否需要上架
	        submitData['autoShelf'] = autoShelf;

	        // console.log(JSON.stringify(submitData));

	        return submitData;
	    },
	    // 双十一预售
	    handlePresale: function handlePresale(data) {
	        this.presaleObj = data;
	        // console.log('预售数据',data)
	    },

	    render: function render() {
	        var data = this.state.data;
	        var categories = data.categories || [];

	        // 是否需要显示体积和体重
	        var isShowVolumeWeight = data.postage && data.postage.isShow;

	        // sku类型
	        var skuType = data.skuSetting && data.skuSetting.skuType;

	        console.log('主页面BondZones', data, data.bondzones, data);

	        return React.createElement(
	            'div',
	            { className: 'xd-goods-edit xd-page' },
	            React.createElement(
	                'div',
	                { className: 'xd-header' },
	                React.createElement(
	                    'h1',
	                    { className: 'xd-title' },
	                    '填写商品信息'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'publish-content' },
	                React.createElement(
	                    'div',
	                    { className: 'form' },
	                    data.isEditPage ? React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(
	                                'a',
	                                { className: 'xd-btn primary', target: '_blank', href: "/pc/itemmanager/item/editpricestock/" + data.itemId },
	                                '快捷修改价格库存'
	                            )
	                        )
	                    ) : null,
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '类目'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl', style: { position: 'relative' } },
	                            categories.length ? categories.map(function (name, i) {
	                                return React.createElement(
	                                    'span',
	                                    null,
	                                    name,
	                                    ' ',
	                                    i < categories.length - 1 ? React.createElement(
	                                        'i',
	                                        { className: 'arrow' },
	                                        '>'
	                                    ) : '',
	                                    ' '
	                                );
	                            }) : '',
	                            data.itemId ? React.createElement(
	                                'a',
	                                { href: 'javascript:;', className: 'edit-category', onClick: this.editCategory.bind(this, data.itemId) },
	                                '    '
	                            ) : ''
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '标题 ',
	                            React.createElement(
	                                'b',
	                                { className: 'high' },
	                                '*'
	                            ),
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(Title, { title: data.title })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '简述 ',
	                            React.createElement(
	                                'b',
	                                { className: 'high' },
	                                '*'
	                            ),
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(Desc, { desc: data.desc })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '标签 ',
	                            data.needFillDetail ? React.createElement(
	                                'b',
	                                { className: 'high' },
	                                '*'
	                            ) : '',
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(GoodsTags, { data: data.tags })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '设置店铺分类'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(GoodsClassify, { data: data.classify, hasCategoryPri: data.hasCategoryPri })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '减库存方式'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(StockMode, { data: data.stockMode })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '封面图 ',
	                            React.createElement(
	                                'b',
	                                { className: 'high' },
	                                '*'
	                            ),
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(CoverImages, { data: data.coverImages })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            'SKU设置 ',
	                            React.createElement(
	                                'b',
	                                { className: 'high' },
	                                '*'
	                            ),
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(SkuSetting, { data: data.skuSetting, isActivityItem: data.isActivityItem, isEditPage: data.isEditPage, activityMsg: data.activityMsg, isShowVolumeWeight: isShowVolumeWeight })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '库存 ',
	                            React.createElement(
	                                'b',
	                                { className: 'high' },
	                                '*'
	                            ),
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(Stock, { stock: data.stock, skuSetting: data.skuSetting })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '价格 ',
	                            React.createElement(
	                                'b',
	                                { className: 'high' },
	                                '*'
	                            ),
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(Price, { price: data.price, skuSetting: data.skuSetting,
	                                presale: this.handlePresale,
	                                presaleData: data })
	                        )
	                    ),
	                    data.counterPrice && data.counterPrice.isShow ? React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '国内专柜价'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(CounterPrice, { counterPrice: data.counterPrice })
	                        )
	                    ) : null,
	                    data.brand && data.brand.isBrandShow ? React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '品牌 ',
	                            data.brand.isBrandRequired ? React.createElement(
	                                'b',
	                                { className: 'high' },
	                                '*'
	                            ) : null,
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(Brand, { data: data.brand })
	                        )
	                    ) : null,
	                    isShowVolumeWeight ? React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '运费'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(Postage, { postage: data.postage, skuType: skuType, isShowVolumeWeight: isShowVolumeWeight, volume: data.volume, weight: data.weight, hasPostagePri: data.hasPostagePri }),
	                            React.createElement(PostageInfo, { postage: data.postage })
	                        )
	                    ) : null,
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '编码',
	                            data.bondzones && data.bondzones.visible ? React.createElement(
	                                'b',
	                                { className: 'high' },
	                                ' *'
	                            ) : null
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(Code, { code: data.code })
	                        )
	                    ),
	                    data.bondzones && data.bondzones.visible ? React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '保税区 ',
	                            React.createElement(
	                                'b',
	                                { className: 'high' },
	                                '*'
	                            )
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(BondZones, { bondZones: data.bondzones })
	                        )
	                    ) : null,
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '商品属性 ',
	                            data.needFillDetail ? React.createElement('b', { className: 'high' }) : '',
	                            ' '
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(GoodsProp, { data: data.properties })
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'field clearfix' },
	                        React.createElement(
	                            'label',
	                            { className: 'fl' },
	                            '商品详情'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'field-content fl' },
	                            React.createElement(GoodsDetail, { detailImages: data.detailImages, skuSetting: data.skuSetting, isSizeInfoNeedUploadImage: data.is_size_info_detail_need, needFillDetail: data.needFillDetail })
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'publish-action' },
	                data.showAutoOnline ? React.createElement(
	                    'a',
	                    { className: 'xd-btn primary', onClick: this.saveAndSale.bind(this, 1) },
	                    '保存并上架'
	                ) : '',
	                React.createElement(
	                    'a',
	                    { className: 'save-btn xd-btn default', onClick: this.save.bind(this, 0) },
	                    '保存'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'hide' },
	                React.createElement('iframe', { name: 'J_UploadImageFrame', id: 'J_UploadImageFrame', src: 'about:blank' })
	            )
	        );
	    }
	});

	React.render(React.createElement(ContentView, null), document.getElementById('J_Page'));
	/*保税区*/ /*<div className="field clearfix">
	           <label className="fl">自定义模块</label>
	           <div className="field-content fl">
	               <CustomModule />
	           </div>
	        </div>*/ /*<div className="field clearfix">
	                    <label className="fl">&nbsp;</label>
	                    <div className="field-content fl">
	                        <MoreBar needFillDetail={data.needFillDetail} />
	                    </div>
	                 </div>*/

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(659);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(934)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/base/less/calendar.less", function() {
			var newContent = require("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/base/less/calendar.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = window.React;

/***/ },

/***/ 5:
/***/ function(module, exports) {

	module.exports = window._;

/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var Calendar = __webpack_require__(909);
	var DatePicker = Calendar.Picker;
	var zhCn = __webpack_require__(896);
	var DateTimeFormat = __webpack_require__(889);
	var GregorianCalendar = __webpack_require__(894);
	var CalendarLocale = __webpack_require__(913);

	module.exports = {
	    Calendar: Calendar,
	    DatePicker: DatePicker,
	    zhCn: zhCn,
	    DateTimeFormat: DateTimeFormat,
	    GregorianCalendar: GregorianCalendar,
	    CalendarLocale: CalendarLocale
	};

/***/ },

/***/ 13:
/***/ function(module, exports) {

	module.exports = window.PubSub;

/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(3);

	var FieldMixins = __webpack_require__(17);

	var DEFAULT_FORM = 'default';

	/**
	 * @author nanzhu
	 * @desc 表单组件 module/field/Field.jsx

	 props:
	 - label: label名
	 - type: (radio|checkbox|select|raw|...)
	 - name: 数据属性名
	 - [form]: field所属form名称，默认为"default"
	 - [options]: (radio|checkbox|select)必需字段
	 - [value]: 默认值，checkbox需传入对象，KEY为对应checkbox的value，VALUE为该checkbox是否选中(bool)
	 - [required]: 是否必填
	 - [format]: 数据格式
	 - [placeholder]: 默认值
	 - [errorText]: 错误时提示文案
	 - [onValidate]: 额外校验函数，[type='raw']时若未传入则该field需自行校验
	 - [onData]: 用于[type='raw']时，若未传入则该field包含数据需自行处理

	 静态方法:
	 - Field.validate([form]): 校验表单form数据合法性
	 - Field.getData([form]): 获取表单form的所有数据

	 */

	var returnTrue = function returnTrue() {
	    return true;
	};

	var Field = React.createClass({
	    displayName: 'Field',

	    statics: {
	        forms: {},

	        addField: function addField(field, form) {
	            if (Field.forms[form] === undefined) {
	                Field.forms[form] = {};
	            }

	            Field.forms[form][field._id] = field;
	        },

	        removeField: function removeField(field, form) {
	            delete Field.forms[form][field._id];
	        },

	        validate: function validate(form) {
	            form = form || DEFAULT_FORM;

	            return _.all(Field.forms[form], function (field) {
	                return field.validate();
	            });
	        },

	        getData: function getData(form) {
	            form = form || DEFAULT_FORM;

	            var data = {};
	            _.each(Field.forms[form], function (field, key) {
	                // use deep merge
	                _.merge(data, field.getData());
	            });

	            return data;
	        },

	        objectToOptions: function objectToOptions(optionObject) {
	            return _.map(optionObject, function (val, key) {
	                return {
	                    text: val,
	                    value: key
	                };
	            });
	        },

	        Mixins: FieldMixins
	    },

	    propTypes: {
	        label: React.PropTypes.string,
	        className: React.PropTypes.string,
	        type: React.PropTypes.string,
	        name: React.PropTypes.string,
	        form: React.PropTypes.string,
	        options: React.PropTypes.array,
	        //format: React.PropTypes.string,
	        placeholder: React.PropTypes.string,
	        errorText: React.PropTypes.string,
	        required: React.PropTypes.bool,
	        onValidate: React.PropTypes.func,
	        onData: React.PropTypes.func
	    },

	    getDefaultProps: function getDefaultProps() {
	        return {
	            type: 'text',
	            label: null,
	            form: DEFAULT_FORM,
	            required: false,
	            format: 'text',
	            options: [],
	            onValidate: returnTrue,
	            onData: function onData() {
	                return {};
	            }
	        };
	    },

	    getInitialState: function getInitialState() {
	        var props = this.props,
	            state = {
	            error: props.error,
	            errorText: props.errorText
	        };

	        switch (this.props.type) {
	            case 'raw':
	                state.value = null;
	                break;

	            case 'checkbox':
	                var checked = {},
	                    values = this.props.value;

	                if (_.isArray(this.props.options)) {
	                    this.props.options.forEach(function (option) {
	                        checked[option.value] = _.indexOf(values, option.value) > -1;
	                    });
	                    state.checked = checked;
	                }

	                state.value = values;
	                break;

	            case 'select':
	                var initialValue = this.props.value;
	                state.value = this.props.options.reduce(function (value, option) {
	                    return option.value == initialValue ? option.value : value;
	                }, (this.props.options[0] || { value: '' }).value);
	                break;

	            default:
	                state.value = this.props.value;
	        }

	        return state;
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        var changedProps = {};
	        _.each(props, function (prop, key) {
	            if (prop != this.props[key]) {
	                changedProps[key] = prop;
	            }
	        }, this);

	        this.setState(_.pick(changedProps, _.keys(this.state)));

	        if (this.props.type === 'raw' && this.props.onValidate !== returnTrue && this.state.error) {
	            this.validate();
	        }
	    },

	    componentWillMount: function componentWillMount() {
	        this._id = _.uniqueId('fd_');
	        Field.addField(this, this.props.form);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        Field.removeField(this, this.props.form);
	    },

	    handleChange: function handleChange(event) {
	        var value = event.target.value;
	        this.setState({
	            value: value
	        }, function () {
	            if (_.isFunction(this.props.onChange)) {
	                this.props.onChange(value);
	            }

	            if (this.state.error) {
	                this.validate();
	            }
	        });
	    },

	    handleCheckboxChange: function handleCheckboxChange(event) {
	        var newState = {};

	        if (_.isArray(this.props.options)) {
	            var checked = this.state.checked,
	                key = event.target.value;

	            checked[key] = event.target.checked;

	            newState.checked = checked;
	        } else {
	            newState.value = event.target.checked;
	        }

	        this.setState(newState, function () {
	            if (_.isFunction(this.props.onChange)) {
	                this.props.onChange(_.pick(this.state, ['value', 'checked']));
	            }

	            if (this.state.error) {
	                this.validate();
	            }
	        });
	    },

	    validate: function validate() {
	        var isValid = true;
	        var type = this.props.type;

	        if (type !== 'raw') {
	            var value = this.state.value;

	            if (type === 'checkbox') {
	                if (this.props.required) {
	                    var isOneChecked = false;
	                    for (var valueKey in value) {
	                        if (value.hasOwnProperty(valueKey)) {
	                            isOneChecked = isOneChecked || value[valueKey];
	                        }
	                    }

	                    isValid = isOneChecked;
	                }
	            } else {
	                value = value ? ('' + value).trim() : '';
	                if (value === '') {
	                    if (this.props.required) {
	                        isValid = false;
	                    }
	                } else {
	                    var format = this.props.format;
	                    isValid = FieldMixins.checkFormat(value, format);
	                }
	            }
	        }

	        isValid = isValid && (!this.props.required || this.props.onValidate());

	        this.setState({
	            error: !isValid
	        });

	        return isValid;
	    },

	    getData: function getData() {
	        var data = {};
	        switch (this.props.type) {
	            case 'checkbox':
	                var values;

	                if (_.isArray(this.props.options)) {
	                    values = [];
	                    var checked = this.state.checked;

	                    for (var valueKey in checked) {
	                        if (checked.hasOwnProperty(valueKey) && checked[valueKey]) {
	                            values.push(valueKey);
	                        }
	                    }
	                } else {
	                    values = this.state.value;
	                }

	                _.setValueAt(values, data, this.props.name);
	                break;

	            case 'raw':
	                data = this.props.onData();
	                break;

	            default:
	                _.setValueAt(this.state.value, data, this.props.name);
	                break;
	        }

	        return data;
	    },

	    renderChild: function renderChild() {
	        var eventHandlers = {};
	        _.each(this.props, function (value, key) {
	            if (key.indexOf('on') === 0 && key.toLowerCase() in window) {
	                eventHandlers[key] = value;
	            }
	        });

	        switch (this.props.type) {
	            case 'radio':
	                return this.props.options.map((function (option, index) {
	                    return React.createElement(
	                        'label',
	                        { className: 'xd-option', key: index },
	                        React.createElement('input', _extends({ className: 'xd-radio',
	                            type: 'radio',
	                            value: option.value,
	                            checked: this.state.value == option.value
	                        }, eventHandlers, {
	                            onChange: this.handleChange })),
	                        option.text
	                    );
	                }).bind(this));

	            case 'checkbox':
	                return _.isArray(this.props.options) ? this.props.options.map((function (option, index) {
	                    return React.createElement(
	                        'label',
	                        { className: 'xd-option', key: index },
	                        React.createElement('input', _extends({ className: 'xd-checkbox',
	                            type: 'checkbox',
	                            value: option.value,
	                            checked: this.state.checked[option.value]
	                        }, eventHandlers, {
	                            onChange: this.handleCheckboxChange })),
	                        option.text
	                    );
	                }).bind(this)) : React.createElement(
	                    'label',
	                    { className: 'xd-option' },
	                    React.createElement('input', _extends({ className: 'xd-checkbox',
	                        type: 'checkbox',
	                        checked: this.state.value
	                    }, eventHandlers, {
	                        onChange: this.handleCheckboxChange })),
	                    this.props.options
	                );

	            case 'select':
	                return React.createElement(
	                    'select',
	                    _extends({ className: 'xd-select',
	                        value: this.state.value
	                    }, eventHandlers, {
	                        onChange: this.handleChange }),
	                    this.props.options.map((function (option, index) {
	                        return React.createElement(
	                            'option',
	                            { key: index, value: option.value },
	                            option.text
	                        );
	                    }).bind(this))
	                );

	            case 'textarea':
	                return React.createElement('textarea', _extends({ className: 'xd-textarea',
	                    placeholder: this.props.placeholder,
	                    value: this.state.value
	                }, eventHandlers, {
	                    onChange: this.handleChange }));

	            case 'raw':
	                return this.props.children;

	            default:
	                return React.createElement('input', _extends({ className: 'xd-input', type: this.props.type,
	                    placeholder: this.props.placeholder,
	                    value: this.state.value
	                }, eventHandlers, {
	                    onChange: this.handleChange }));
	        }
	    },

	    render: function render() {
	        var props = this.props,
	            state = this.state,
	            classNames = ['xd-form-group', props.className];
	        if (state.error) {
	            classNames.push('invalid');
	        }

	        return React.createElement(
	            'div',
	            { className: classNames.join(' ') },
	            props.label ? React.createElement(
	                'label',
	                { className: props.required ? 'xd-label required' : 'xd-label' },
	                props.label
	            ) : null,
	            React.createElement(
	                'div',
	                { className: 'xd-field' },
	                this.renderChild()
	            ),
	            React.createElement(
	                'div',
	                { className: 'xd-form-tip' },
	                state.errorText
	            )
	        );
	    }
	});

	module.exports = Field;

	window.Field = Field;

/***/ },

/***/ 17:
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by neo on 13/4/15.
	 */

	var REGEX_EMAIL = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/;
	var REGEX_MOBILE = /^0?[1][34578][0-9]{9}$/;
	var REGEX_PHONE = /(\d{11})|((\d{3,4})-(\d{7,8}))$/;
	var REGEX_REALNAME = /^[\u4E00-\u9FA5\uf900-\ufa2d·]{2,30}$/i;
	var REGEX_PASSWORD = /^.{6,20}$/;

	_.mixin({
	    valueAt: function valueAt(obj, keyPath) {
	        if (keyPath === undefined || keyPath === null) {
	            return undefined;
	        }

	        var keys = keyPath.split('.');
	        if (keys.length === 1) {
	            return obj[keyPath];
	        }

	        var iterator = obj;
	        for (var i = 0, len = keys.length; i < len; i++) {
	            iterator = iterator[keys[i]];
	            if (!iterator) {
	                return undefined;
	            }
	        }

	        return iterator;
	    },

	    setValueAt: function setValueAt(val, obj, keyPath) {
	        if (keyPath === undefined || keyPath === null) {
	            return obj;
	        }

	        var keys = keyPath.split('.');
	        if (keys.length === 1) {
	            obj[keyPath] = val;
	            return obj;
	        }

	        var iterator = obj;
	        for (var i = 0, len = keys.length - 1; i < len; i++) {
	            var key = keys[i];
	            if (!iterator[key]) {
	                iterator[key] = {};
	            }
	            iterator = iterator[key];
	        }

	        iterator[keys[i]] = val;

	        return obj;
	    },

	    isPureObject: function isPureObject(obj) {
	        return Object.prototype.toString.call(obj) === '[object Object]';
	    },

	    merge: function merge(dest, src) {
	        for (var key in src) {
	            if (!src.hasOwnProperty(key)) {
	                continue;
	            }

	            var destVal = dest[key],
	                srcVal = src[key];
	            if (destVal === srcVal) {
	                continue;
	            }

	            if (destVal && _.isPureObject(destVal) && _.isPureObject(srcVal)) {
	                _.merge(destVal, srcVal);
	            } else {
	                dest[key] = srcVal;
	            }
	        }
	    }
	});

	/**
	 * Check whether value matches format; if no format passed in, just check whether value is empty;
	 * @param {string|number} value
	 * @param {string|RegExp} [format]
	 * @returns {boolean}
	 */
	function checkFormat(value, format) {
	    if (!value) {
	        return false;
	    }

	    if (_.isRegExp(format) && !format.test(value)) {
	        return false;
	    }

	    switch (format) {
	        case 'number':
	            return !isNaN(+value);

	        case 'int':
	            value = +value;
	            return !isNaN(value) && Math.floor(value) === value;

	        case '+int':
	            value = +value;
	            return !isNaN(value) && value > 0 && Math.floor(value) === value;

	        case 'mobile':
	            return REGEX_MOBILE.test(value);

	        case 'phone':
	            return REGEX_PHONE.test(value);

	        case 'email':
	            return REGEX_EMAIL.test(value);

	        case 'realname':
	            return REGEX_REALNAME.test(value);

	        case 'password':
	            return REGEX_PASSWORD.test(value);

	        default:
	            return value !== undefined && value !== null && ('' + value).length > 0;
	    }
	}

	function _validateField(fields) {
	    var state = this.state,
	        values = {};

	    if (_.isString(fields)) {
	        fields = [fields];
	    }

	    if (_.isArray(fields)) {
	        _.each(fields, function (keyPath) {
	            values[keyPath] = _.valueAt(state, keyPath);
	        });

	        return _.every(values);
	    } else {
	        _.each(fields, function (field, keyPath) {
	            values[keyPath] = _.valueAt(state, keyPath);
	        });

	        return _.every(values, function (value, key) {
	            return checkFormat(value, fields[key]);
	        });
	    }
	}

	function _getFieldData(fields) {
	    var state = this.state,
	        data = {};

	    if (_.isString(fields)) {
	        fields = [fields];
	    } else if (!_.isArray(fields)) {
	        fields = _.keys(fields);
	    }

	    _.each(fields, function (keyPath) {
	        _.setValueAt(_.valueAt(state, keyPath), data, keyPath);
	    });

	    return data;
	}

	function _handlePathChange(keyPath, valueExtractor, event) {
	    var paths = keyPath.split('.');

	    if (!_.isFunction(valueExtractor)) {
	        event = event === undefined ? valueExtractor : event;
	        valueExtractor = this.extractValue;
	    }

	    _.setValueAt(valueExtractor(event), this.state, keyPath);

	    this.setState(_.pick(this.state, paths[0]));
	}

	module.exports = {
	    /**
	     * Handle change on state for keyPath, which is a string like 'data.user.name'
	     * @param {string} keyPath
	     * @param {function} [valueExtractor]
	     */
	    handlePathChange: function handlePathChange(keyPath, valueExtractor) {
	        return _handlePathChange.bind(this, keyPath, valueExtractor);
	    },

	    extractValue: function extractValue(event) {
	        if (_.isString(event) || _.isNumber(event)) {
	            return event;
	        }

	        var target = event.target;
	        if (_.isElement(target)) {
	            if (target.tagName === 'INPUT' && target.type === 'checkbox') {

	                return target.checked;
	            }

	            return target.value;
	        }

	        return undefined;
	    },

	    /**
	     * 通用校验生成器
	     * @param {string|[string]|{}} fields 需要校验的state下的字段，多个则传入数组
	     * @returns {function}
	     */
	    validateField: function validateField(fields) {
	        return _validateField.bind(this, fields);
	    },

	    /**
	     * 通用获取数据生成器
	     * @param {string|[string]|{}} fields 需要获取的state下的字段，多个则传入数组
	     * @returns {function}
	     */
	    getFieldData: function getFieldData(fields) {
	        return _getFieldData.bind(this, fields);
	    },

	    checkFormat: checkFormat
	};

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);
	var _ = __webpack_require__(5);

	var styles = __webpack_require__(22);

	var ModalController = React.createClass({
	    displayName: 'ModalController',

	    statics: {
	        prefix: 'xd-',

	        instance: null,
	        modals: [],

	        layoutStyle: {},

	        /**
	         * Open a modal
	         * @param {object} options Modal设置（title、class、id等）
	         */
	        open: function open(options) {
	            var defaultOptions = {
	                // options for modal
	                title: null,
	                body: null,
	                className: null,
	                callback: null,
	                beforeClose: null,

	                // options for modal controller
	                isAbsolute: false,
	                showMask: true,
	                closeByMask: true
	            };

	            if (options.classes !== undefined) {
	                console.warn('Option `classes` is deprecated, use className instead');
	                options.className = options.classes;
	                delete options.classes;
	            }

	            options = _.extend(defaultOptions, options);

	            if (options.id !== undefined) {
	                options.id = String(options.id);
	                if (ModalController._findComponent(options.id) !== null) {
	                    console.warn('A modal with ID %s has existed', options.id);
	                    return null;
	                }
	            } else {
	                options.id = _.uniqueId('ReactModal-');
	            }

	            ModalController.modals.push(options);
	            ModalController._forceUpdate();

	            return options.id;
	        },

	        /**
	         * Close a modal
	         * @param {string} [id] - Modal ID (optional)
	         * @return {ModalController}
	         */
	        close: function close(id) {
	            var index = -1;

	            if (_.isString(id)) {
	                index = _.findIndex(ModalController.modals, function (modal) {
	                    return modal.id === id;
	                });

	                if (index < 0) {
	                    console.warn('modal with ID %s not found', id);
	                    return ModalController;
	                }
	            }

	            var modalComponent = ModalController._findComponent(id);
	            if (modalComponent && modalComponent.handleBeforeClose()) {
	                ModalController.modals.splice(index, 1);
	                ModalController._forceUpdate();
	            }

	            return ModalController;
	        },

	        closeAll: function closeAll() {
	            var activeComponent = ModalController._activeComponent();
	            if (activeComponent.handleBeforeClose()) {
	                ModalController.modals = [];
	                ModalController._forceUpdate();
	            }

	            return ModalController;
	        },

	        /**
	         * Open a alert modal
	         * @param {string} msg
	         * @param {function} [callback=Modal.close]
	         * @param {object} [options] Modal设置（title、class、id等）
	         */
	        alert: function alert(msg, callback, options) {
	            if (!_.isFunction(callback)) {
	                options = options || callback;
	                callback = ModalController.close;
	            }

	            var defaultOptions = {
	                body: React.createElement(
	                    'div',
	                    { style: styles.alertWrap },
	                    React.createElement(
	                        'div',
	                        { style: styles.alertContent },
	                        msg
	                    ),
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'button',
	                            { className: ModalController.prefix + 'btn primary', onClick: callback },
	                            '确认'
	                        )
	                    )
	                ),
	                closeByMask: false,
	                callback: callback
	            };

	            options = _.extend(defaultOptions, options);

	            return ModalController.open(options);
	        },

	        /**
	         * Open a confirm modal
	         * @param {string} msg
	         * @param {function} [callback=_.noop]
	         * @param {object} [options] Modal设置（title、class、id等）
	         */
	        confirm: function confirm(msg, callback, options) {
	            if (!_.isFunction(callback)) {
	                options = options || callback;
	                callback = _.noop;
	            }

	            var defaultOptions = {
	                body: React.createElement(
	                    'div',
	                    { style: styles.alertWrap },
	                    React.createElement(
	                        'div',
	                        { style: styles.alertContent },
	                        msg
	                    ),
	                    React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'button',
	                            { className: ModalController.prefix + 'btn primary',
	                                style: { marginRight: 20 }, onClick: callback },
	                            '确认'
	                        ),
	                        React.createElement(
	                            'button',
	                            { className: ModalController.prefix + 'btn', onClick: ModalController.close },
	                            '取消'
	                        )
	                    )
	                ),
	                closeByMask: false,
	                callback: callback
	            };

	            options = _.extend(defaultOptions, options);

	            return ModalController.open(options);
	        },

	        /**
	         * Open a tip modal
	         * @param {string} msg
	         * @param {function|int} [callback]
	         * @param {int|object} [delay=800] time before the tip dismisses
	         * @param {object} [options] Modal设置（title、class、id等）
	         */
	        tip: function tip(msg, callback, delay, options) {
	            if (!_.isFunction(callback)) {
	                options = delay;
	                delay = callback;
	                callback = _.noop;
	            }
	            if (!_.isNumber(delay)) {
	                options = delay;
	                delay = 800;
	            }

	            var defaultOptions = {
	                body: React.createElement(
	                    'div',
	                    { style: styles.alertWrap },
	                    msg
	                ),
	                closeByMask: false
	            };

	            options = _.extend(defaultOptions, options);

	            var modalId = ModalController.open(options);

	            callback = _.compose(callback, ModalController.close.bind(ModalController, modalId));

	            if (delay > 0) {
	                setTimeout(function () {
	                    callback();
	                }, delay);
	            }

	            return modalId;
	        },

	        update: function update(id) {
	            var modalComponent = ModalController._findComponent(id);

	            if (!modalComponent) {
	                return;
	            }

	            modalComponent.forceUpdate();
	        },

	        updateTitle: function updateTitle(title, id) {
	            var modalComponent = id ? ModalController._findComponent(id) : ModalController._activeComponent();

	            if (!modalComponent) {
	                return;
	            }

	            modalComponent.setState({
	                title: title
	            });
	        },

	        v: '0.2.0',
	        noConflict: function noConflict() {
	            window.ReactModal = _previousReactModal;

	            return ModalController;
	        },
	        withPrefix: function withPrefix(prefix) {
	            if (ModalController.prefix !== prefix) {
	                ModalController.prefix = prefix;
	                ModalController._forceUpdate();
	            }

	            return ModalController;
	        },

	        // Private method
	        _activeComponent: function _activeComponent() {
	            try {
	                var activeID = _.last(ModalController.modals).id;
	            } catch (e) {
	                return null;
	            }

	            return ModalController.instance.refs[activeID] || null;
	        },

	        _findComponent: function _findComponent(id) {
	            if (ModalController.instance === null) {
	                return null;
	            }

	            if (!_.isString(id)) {
	                try {
	                    id = _.last(ModalController.modals).id;
	                } catch (e) {
	                    return null;
	                }
	            }

	            return ModalController.instance.refs[id] || null;
	        },

	        _forceUpdate: function _forceUpdate() {
	            if (ModalController.instance === null) {
	                return;
	            }

	            ModalController.instance.forceUpdate();
	        }
	    },

	    componentDidMount: function componentDidMount() {
	        ModalController.instance = this;
	    },

	    componentWillUnmount: function componentWillUnmount() {
	        ModalController.instance = null;
	    },

	    /*componentWillUpdate() {
	        console.time('ModalController render');
	    },
	     componentDidUpdate() {
	        console.timeEnd('ModalController render');
	    },*/

	    render: function render() {
	        ModalController.layoutStyle = {};

	        var modals = ModalController.modals,
	            activeModal = _.last(modals),
	            modalsCount = modals.length;

	        var modalWrapStyle = _.extend({}, styles.modalWrap),
	            modalMaskStyle = _.extend({}, styles.modalMask);

	        if (modalsCount > 0) {
	            modalWrapStyle.display = 'block';

	            if (!activeModal.showMask) {
	                _.extend(modalMaskStyle, styles.modalWithoutMask);
	            }

	            if (activeModal.isAbsolute) {
	                modalWrapStyle.position = 'absolute';
	                var scrollTop = window.pageYOffset || document.body.scrollTop,
	                    windowHeight = window.innerHeight || document.documentElement.clientHeight;

	                ModalController.layoutStyle.top = scrollTop + windowHeight / 2;
	            }
	        }

	        return React.createElement(
	            'div',
	            { className: ModalController.prefix + 'modal-wrap', style: modalWrapStyle },
	            React.createElement('div', { style: modalMaskStyle, onClick: this.handleMaskClick }),
	            modals.map(function (modal) {
	                return React.createElement(Modal, { key: modal.id, ref: modal.id, data: modal, active: modal === activeModal });
	            }, this)
	        );
	    },

	    handleMaskClick: function handleMaskClick() {
	        var activeModal = _.last(ModalController.modals);
	        if (!activeModal.closeByMask) {
	            return;
	        }

	        ModalController.closeAll();
	    }
	});

	var Modal = React.createClass({
	    displayName: 'Modal',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            active: false
	        };
	    },

	    getInitialState: function getInitialState() {
	        var modal = this.props.data;

	        return {
	            title: modal.title,
	            body: modal.body,
	            style: {},
	            width: 0,
	            height: 0
	        };
	    },

	    componentDidMount: function componentDidMount() {
	        this.locate();
	    },

	    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	        if (nextProps.active !== this.props.active) {
	            return true;
	        }

	        var state = this.state;
	        if (nextState.title !== state.title || nextState.width !== state.width || nextState.height !== state.height) {
	            return true;
	        }

	        if (!_.isEqual(ModalController.layoutStyle, this.layoutStyle)) {
	            return true;
	        }

	        return false;
	    },

	    /*componentWillUpdate() {
	        //console.time('Modal ' + this.props.data.id + ' render');
	    },*/

	    componentDidUpdate: function componentDidUpdate() {
	        this.locate();
	        //console.timeEnd('Modal ' + this.props.data.id + ' render');
	    },

	    /*componentWillUnmount: function () {
	        //console.log('Modal with ID %s will unmount', this.props.data.id);
	    },*/

	    render: function render() {
	        var prefix = ModalController.prefix;

	        var _props$data = this.props.data;
	        var id = _props$data.id;
	        var className = _props$data.className;
	        var _state = this.state;
	        var title = _state.title;
	        var body = _state.body;
	        var style = _state.style;

	        this.layoutStyle = ModalController.layoutStyle;

	        var modalStyle = _.extend({}, styles.modal, ModalController.layoutStyle, style);

	        if (this.props.active) {
	            _.extend(modalStyle, styles.modalActive);
	        }

	        var modalClassName = _.compact([prefix + 'modal', className]).join(' ');

	        return React.createElement(
	            'div',
	            { id: id, className: modalClassName, style: modalStyle },
	            title && React.createElement(
	                'div',
	                { className: prefix + 'modal-header', style: styles.modalHeader },
	                React.createElement(
	                    'h2',
	                    { className: prefix + 'title', style: styles.modalTitle },
	                    title
	                ),
	                React.createElement(
	                    'a',
	                    { className: prefix + 'modal-close', style: styles.modalClose, href: 'javascript:',
	                        onClick: this.close },
	                    '×'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: prefix + 'modal-body', style: styles.modalBody },
	                body
	            )
	        );
	    },

	    locate: function locate() {
	        //console.time('Modal ' + this.props.data.id + ' locate');

	        var modalDOM = React.findDOMNode(this);
	        var height = modalDOM.offsetHeight,
	            width = modalDOM.offsetWidth;
	        var state = this.state;

	        if (Math.abs(width - state.width) > 3 || Math.abs(height - state.height) > 3) {
	            //console.log('Modal ' + this.props.data.id + ' need relocate');
	            var marginTop = height / -2;
	            if (marginTop + ModalController.layoutStyle.top < 0) {
	                marginTop = -ModalController.layoutStyle.top;
	            }

	            this.setState({
	                width: width,
	                height: height,
	                style: {
	                    marginTop: marginTop,
	                    marginLeft: width / -2
	                }
	            });
	        }

	        //console.timeEnd('Modal ' + this.props.data.id + ' locate');
	    },

	    close: function close() {
	        ModalController.close(this.props.data.id);
	    },

	    handleBeforeClose: function handleBeforeClose() {
	        var modal = this.props.data;
	        return !(modal.beforeClose && modal.beforeClose() === false);
	    }
	});

	var _previousReactModal = window.ReactModal;

	if (_previousReactModal === undefined || _previousReactModal !== ModalController) {
	    window.ReactModal = ModalController;

	    var modalContainer = document.createElement('div');

	    document.body.appendChild(modalContainer);
	    React.render(React.createElement(ModalController, null), modalContainer);
	}

	module.exports = ModalController;

/***/ },

/***/ 22:
/***/ function(module, exports) {

	'use strict';
	/**
	 * Created by neo on 27/7/15.
	 */

	module.exports = {
	    modalWrap: {
	        position: 'fixed',
	        display: 'none',
	        top: 0,
	        right: 0,
	        bottom: 0,
	        left: 0,
	        zIndex: 1000
	    },

	    modalWithoutMask: {
	        background: 'transparent'
	    },

	    modal: {
	        position: 'absolute',
	        minWidth: 400,
	        top: '50%',
	        left: '50%',
	        background: '#fff',
	        border: '1px solid #e8e8e8',
	        WebkitTransition: 'box-shadow 300ms ease',
	        MozTransition: 'box-shadow 300ms ease',
	        transition: 'box-shadow 300ms ease',
	        zIndex: 0
	    },

	    modalActive: {
	        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.4)',
	        zIndex: 10
	    },

	    modalMask: {
	        position: 'absolute',
	        top: 0,
	        bottom: 0,
	        left: 0,
	        right: 0,
	        background: '#000',
	        opacity: 0.5,
	        filter: 'alpha(opacity=50)',
	        zIndex: 5
	    },

	    modalClose: {
	        position: 'absolute',
	        display: 'block',
	        width: 40,
	        top: 0,
	        right: 0,
	        color: '#c4c4c4',
	        fontSize: 30,
	        fontFamily: 'SimSun, sans-serif',
	        textAlign: 'center'
	    },

	    modalHeader: {
	        position: 'relative',
	        height: 45,
	        paddingLeft: 20,
	        background: '#f4f5fa',
	        lineHeight: '44px',
	        WebkitUserSelect: 'none',
	        userSelect: 'none'
	    },
	    modalTitle: {
	        marginRight: 40,
	        fontSize: 16
	    },

	    modalBody: {
	        paddingTop: 40,
	        paddingBottom: 40
	    },

	    alertWrap: {
	        maxWidth: 600,
	        padding: '0 40px',
	        fontSize: 16,
	        textAlign: 'center'
	    },

	    alertContent: {
	        marginBottom: 20
	    }
	};

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Modal = __webpack_require__(21);

	// 多传接口地址
	var MULTIPLE_UPLOAD_URL = "/pc/shopadmin/tool/uploadimage";

	// 单传接口地址
	var SINGEL_UPLOAD_URL = "/pc/shopadmin/tool/addpic";

	// 图片CDN地址
	var CDN_URL = "http://s17.mogucdn.com";

	// 获取回调方法名（单传）
	var getCallBackFuncName = function getCallBackFuncName() {
	    var prefix = 'upload_callback_';
	    var rand = Math.floor(Math.random() * 99 + 1);
	    return prefix + rand;
	};

	var UploadImage = React.createClass({
	    displayName: 'UploadImage',

	    propTypes: {

	        // 默认批量上传
	        isMultiple: React.PropTypes.bool,

	        // 上传开始
	        onStart: React.PropTypes.func,

	        // 上传完成
	        onFinish: React.PropTypes.func,

	        // 上传失败
	        onFailed: React.PropTypes.func
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            callbackFuncName: getCallBackFuncName(),
	            isMultiple: true,
	            onStart: function onStart() {
	                return true;
	            },
	            onFinish: function onFinish() {
	                return true;
	            },
	            onFailed: function onFailed() {
	                return true;
	            }
	        };
	    },
	    handleChange: function handleChange(e) {
	        // 对于ie9以下的浏览器
	        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(e.target.value)) {
	            e.target.value = '';
	            Modal.tip('不支持此种格式的图片');
	            return;
	        }
	        // 开始回调
	        var me = this,
	            props = me.props,
	            beforeStart = props.beforeStart; //上传前的校验函数,内部可能是异步也可能是同步

	        var uploadHandler = function uploadHandler(e) {
	            // 判断是否支持多图上传
	            window.localStorage && window.WebSocket ? multipleUpload(e, this) : singleUpload(e, this);
	        };

	        var isPromise = function isPromise(func) {
	            //是否是promise
	            return func.then && typeof func.then === 'function';
	        };

	        if (beforeStart) {
	            var val = beforeStart(e);
	            if (val && isPromise(val)) {
	                //如果有返回值且返回值为promise则执行异步回调成功后上传
	                e.persist(); //保持event对象，防止setState时React recycles events objects将event的所有属性全部置为null
	                val.then(function () {
	                    //需要位置e在内存中
	                    me.props.onStart(e);
	                    uploadHandler.apply(me, [e]);
	                });
	            } else if (val === true) {
	                //校验结果返回false
	                me.props.onStart(e);
	                uploadHandler.apply(me, [e]);
	            }
	        } else {
	            me.props.onStart(e);
	            uploadHandler.apply(me, [e]);
	        }
	    },
	    render: function render() {
	        return React.createElement(
	            'form',
	            { action: SINGEL_UPLOAD_URL, method: 'post', encType: 'multipart/form-data', target: 'J_UploadImageFrame' },
	            this.props.isMultiple ? React.createElement('input', { type: 'file', name: 'image', className: 'file', onChange: this.handleChange, multiple: true, accept: 'image/png,image/jpg,image/jpeg,image/gif' }) : React.createElement('input', { type: 'file', name: 'image', className: 'file', onChange: this.handleChange, accept: 'image/png,image/jpg,image/jpeg,image/gif' }),
	            React.createElement('input', { type: 'hidden', value: this.props.callbackFuncName, name: 'callback' })
	        );
	    }
	});

	// 多传
	var multipleUpload = function multipleUpload(event, self) {
	    var paths = [];
	    var target = event.target;
	    var files = target.files;
	    uploadImgs(files, function (resultArr, i) {
	        if (resultArr && resultArr.length) {
	            _.map(resultArr, function (item, i) {
	                if (item.status.code == 1001) {
	                    paths.push(CDN_URL + item.result.path);
	                }
	            });

	            // 完成回调
	            self.props.onFinish(paths);
	        } else {
	            self.props.onFailed('上传失败');
	        }
	        target.value = '';
	    });
	};

	// 单传
	var singleUpload = function singleUpload(event, self) {
	    self.getDOMNode().submit();
	    window[self.props.callbackFuncName] = function (code, msg, imgId, path) {
	        if (code == 1001) {
	            // 完成回调
	            self.props.onFinish([path]);
	        } else {
	            self.props.onFailed(msg);
	        }
	    };
	    event.target.value = '';
	};

	/**
	 * 批量上传图片
	 * @param  {Array}   files
	 * @param  {Function} callback
	 */
	var uploadImgs = function uploadImgs(files, callback) {

	    var self = this,
	        _url = MULTIPLE_UPLOAD_URL,
	        i = 0,
	        length = files.length - 1,
	        resultArr = [];

	    // 这里是进度条 哇哈哈！HTML5的接口 靠谱！可以考虑 做 整体的 %分比 用Length + 当前 % 然后算总数 二期再搞。。。
	    var _uploadProgress = function _uploadProgress(ev) {

	        //判断a有没有超出范围
	        if (i < length && i != length) {

	            //此处的evt就是文件上传的所有信息。

	            //evt.lengthComputable,文件是否是空
	            if (ev.lengthComputable) {
	                //evt.loaded：文件上传的大小   evt.total：文件总的大小
	                var percentComplete = Math.round(ev.loaded * 100 / ev.total);

	                //如果上传的结果是100时才让加载下一个文件。如果不够100会继续上传原来的文档。
	                if (percentComplete == 100) {
	                    i++;
	                    //提交下一个文档
	                    _submit(files[i]);
	                }
	            }
	        }
	    };

	    // 提交
	    var _submit = function _submit(files) {
	        var fd = new FormData();
	        fd.append('image', files);

	        // 创建XMLHttpRequest 提交对象
	        var xhr = new XMLHttpRequest();
	        //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

	        // 监听的是上传进度条
	        xhr.upload.addEventListener("progress", _uploadProgress, false);

	        // XHR提交成功后的返回
	        xhr.addEventListener("load", function (e) {
	            // XHR 的 LOAD 返回事件 具体结构 建议CONSOLE E 的结构
	            var result = jQuery.parseJSON(e.target.responseText);

	            resultArr.push(result);

	            // 集齐全部图片返回值之后 执行回调
	            if (resultArr.length == length + 1) {
	                // CALLBACK 优先 传递值第二 默认值第三
	                if (callback) {
	                    callback(resultArr, i);
	                }
	            }
	        }, false);

	        xhr.open("POST", _url, true);

	        xhr.send(fd);
	    };

	    _submit(files[i]);
	};

	module.exports = UploadImage;

/***/ },

/***/ 171:
/***/ function(module, exports) {

	/**
	 * 商品列表页面接口配置
	 */
	'use strict';

	module.exports = {
	    //获得uni图库order列表***luoyang
	    getUniOrderList: function getUniOrderList(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/unipics', 'get', params, successFn, failFn);
	    },

	    //showUniPicsByOrder
	    getUniImgList: function getUniImgList(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/showunipicsbyorder', 'get', params, successFn, failFn);
	    },

	    // 获取商品列表
	    getGoodsList: function getGoodsList(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/list', 'get', params, successFn, failFn);
	    },

	    //获取浮窗数据
	    getTip: function getTip(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/similarInfo', 'get', params, successFn, failFn);
	    },

	    // 下架
	    offline: function offline(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/downShelf', 'post', params, successFn, failFn);
	    },

	    // 上架
	    online: function online(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/onShelf', 'post', params, successFn, failFn);
	    },

	    getGalleryGoods: function getGalleryGoods(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/onShelf', 'post', params, successFn, failFn);
	    },

	    // 加入橱窗
	    putGallery: function putGallery(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/XDPutGallery', 'post', params, successFn, failFn);
	    },

	    // 取消橱窗
	    cancelGallery: function cancelGallery(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/XDCancelGallery', 'post', params, successFn, failFn);
	    },

	    // 删除
	    del: function del(params, successFn, failFn) {
	        postData.call(this, '/pc/itemmanager/item/delete', 'post', params, successFn, failFn);
	    }
	};

	// 请求数据
	var postData = function postData(url, type, params, successFn, failFn) {
	    var that = this;
	    $.ajax({
	        url: url,
	        type: type,
	        dataType: 'json',
	        data: params
	    }).done(function (data) {
	        if (data.status.code == 1001) {
	            _.isFunction(successFn) && successFn.call(that, data);
	        } else {
	            _.isFunction(failFn) && failFn.call(that, data);
	        }
	    }).fail(function () {
	        //console.log("系统繁忙");
	    }).always(function () {
	        //console.log("complete："+ url);
	    });
	};

/***/ },

/***/ 172:
/***/ function(module, exports) {

	/**
	 * 商品编辑页面中链接配置
	 */
	'use strict';

	module.exports = {
	    // 商品详情页
	    GOODS_DETAIL_URL: 'http://shop.mogujie.com/detail/',

	    // 初审规则
	    CHUSHEN_RULE_URL: '',

	    // 图片说明文案
	    IMAGE_DESC_TEXT: '《蘑菇街商品封面图规格要求调整说明》',

	    // 图片说明地址
	    IMAGE_DESC_URL: 'http://www.mogujie.com/trade/faq/index?id=1k8&amp;type=2',

	    // 上传图片说明
	    UPLOAD_IMAGE_NUM_TEXT: '请至少上传6张封面图，有助于提升该商品的转化率',

	    // 上传图片说明
	    UPLOAD_IMAGE_DESC_TEXT: '图片宽高比例在9:16 - 16:9之间并且宽度大于等于640px'

	};

/***/ },

/***/ 173:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	    parseSkuData: function parseSkuData(skuData) {
	        var styles = [];
	        var sizes = [];
	        var images = [];

	        // 遍历使用的sku
	        skuData.map(function (item, i) {
	            item.style && styles.push(item.style);
	            item.size && sizes.push(item.size);
	            item.image && images.push(item.image);
	        });

	        // 数组去重
	        styles = _.unique(styles);
	        sizes = _.unique(sizes);
	        images = _.unique(images);

	        return {
	            styles: styles,
	            sizes: sizes,
	            images: images
	        };
	    },

	    /**
	     * 获取合并后的sku数据
	     * @param  {array} defaultData 默认sku数据
	     * @param  {object} skuData     用户选择过的sku数据
	     * @return {object}             合并后的sku数据
	     */
	    getMergeSkuData: function getMergeSkuData(defaultData, skuData) {
	        var styles = [];
	        var sizes = [];

	        // 解析sku数据
	        var _skuData = this.parseSkuData(skuData);

	        // 合并默认sku和使用的sku
	        if (defaultData.style && defaultData.style.values) {
	            styles = defaultData.style.values.concat(_skuData.styles);
	        }

	        if (defaultData.size && defaultData.size.values) {
	            sizes = defaultData.size.values.concat(_skuData.sizes);
	        }

	        // 数组去重
	        styles = _.unique(styles);
	        sizes = _.unique(sizes);

	        return {
	            styles: styles,
	            sizes: sizes
	        };
	    },

	    // 获取单层sku选项数据
	    getOneSkuOptions: function getOneSkuOptions(defaultData, skuData, skuType) {
	        var skuOptionData = {
	            styles: [],
	            styleName: ''
	        };

	        if (defaultData.style) {
	            skuOptionData.styleName = defaultData.style.name || '';
	        }

	        if (!defaultData.style) {
	            return skuOptionData;
	        }

	        // 如果是单层规格
	        if (skuType == 1) {
	            // 获取解析过的sku数据
	            var parseData = this.parseSkuData(skuData);

	            // 获取合并后的sku数据
	            var mergeData = this.getMergeSkuData(defaultData, skuData);

	            if (mergeData.styles.length) {
	                // 遍历style，设置选中
	                mergeData.styles.map(function (style, i) {
	                    var checked = false,
	                        image = '';
	                    parseData.styles.length && parseData.styles.map(function (item, j) {
	                        if (style == item) {
	                            checked = true;
	                            image = parseData.images[j] || '';
	                        }
	                    });
	                    skuOptionData.styles.push({
	                        'style': style,
	                        'checked': checked,
	                        'image': image
	                    });
	                });
	            } else {
	                parseData.styles.length && parseData.styles.map(function (item, i) {
	                    skuOptionData.styles.push({
	                        'style': item,
	                        'checked': true,
	                        'image': parseData.images[i] || ''
	                    });
	                });
	            }

	            // 如果是双层规格或默认规格
	        } else {

	                // 获取合并后的sku数据
	                var mergeData = this.getMergeSkuData(defaultData, []);

	                // 遍历style，设置选中
	                mergeData.styles.length && mergeData.styles.map(function (style, i) {
	                    skuOptionData.styles.push({
	                        'style': style,
	                        'checked': false,
	                        'image': ''
	                    });
	                });
	            }
	        return skuOptionData;
	    },

	    // 获取双层sku数据
	    getTwoSkuOptions: function getTwoSkuOptions(defaultData, skuData, skuType) {
	        var skuOptionData = {
	            styles: [],
	            sizes: [],
	            styleName: '',
	            sizeName: ''
	        };

	        if (defaultData.style) {
	            skuOptionData.styleName = defaultData.style.name || '';
	        }

	        if (defaultData.size) {
	            skuOptionData.sizeName = defaultData.size.name || '';
	        }

	        if (!defaultData.style) {
	            return skuOptionData;
	        }

	        // 如果是双层规格
	        if (skuType == 2) {
	            // 获取解析过的sku数据
	            var parseData = this.parseSkuData(skuData);

	            // 获取合并后的sku数据
	            var mergeData = this.getMergeSkuData(defaultData, skuData);

	            if (mergeData.styles.length) {
	                // 遍历style，设置选中
	                mergeData.styles.map(function (style, i) {
	                    var checked = false,
	                        image = '';
	                    parseData.styles.map(function (item, j) {
	                        if (style == item) {
	                            checked = true;
	                            image = parseData.images[j] || '';
	                        }
	                    });
	                    skuOptionData.styles.push({
	                        'style': style,
	                        'checked': checked,
	                        'image': image
	                    });
	                });
	            } else {
	                parseData.styles.length && parseData.styles.map(function (item, i) {
	                    skuOptionData.styles.push({
	                        'style': item,
	                        'checked': true,
	                        'image': parseData.images[i] || ''
	                    });
	                });
	            }

	            if (mergeData.sizes.length) {
	                // 遍历size，设置选中
	                mergeData.sizes.map(function (size, i) {
	                    var checked = false;
	                    parseData.sizes.map(function (item, j) {
	                        if (size == item) {
	                            checked = true;
	                        }
	                    });
	                    skuOptionData.sizes.push({
	                        'size': size,
	                        'checked': checked
	                    });
	                });
	            } else {
	                parseData.sizes.length && parseData.sizes.map(function (item, i) {
	                    skuOptionData.sizes.push({
	                        'size': item,
	                        'checked': true
	                    });
	                });
	            }

	            // 如果是单层规格或默认规格
	        } else {

	                // 获取合并后的sku数据
	                var mergeData = this.getMergeSkuData(defaultData, []);

	                // 遍历style，设置选中
	                mergeData.styles.length && mergeData.styles.map(function (style, i) {
	                    skuOptionData.styles.push({
	                        'style': style,
	                        'checked': false,
	                        'image': ''
	                    });
	                });

	                // 遍历size，设置选中
	                mergeData.sizes.length && mergeData.sizes.map(function (size, i) {
	                    skuOptionData.sizes.push({
	                        'size': size,
	                        'checked': false
	                    });
	                });
	            }

	        return skuOptionData;
	    }
	};

/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Modal = __webpack_require__(21);
	var ImageError = __webpack_require__(193);

	module.exports = {

	    imageError: {
	        10002: '图片地址不存在',
	        10003: '图片宽度必须大于等于640',
	        10004: '图片宽高比例必须在9:16-16:9之间'
	    },

	    /**
	     * 图片尺寸验证
	     * @param  {String} path
	     * @return {Number} code
	     */
	    checkUploadImage: function checkUploadImage(path) {
	        if (path == '' || path.indexOf('undefined') > -1) {
	            return 10002;
	        }

	        var size = XD.Util.getSizeByPath(path),
	            width = size[0],
	            height = size[1];

	        return this.checkImageSize(width, height);
	    },

	    // 验证图片大小
	    checkImageSize: function checkImageSize(width, height) {
	        // 图片宽高比
	        var wh = width / height;

	        // 如果宽度小于最大宽度
	        if (width < 640) {
	            return 10003;
	        }

	        if (9 / 16 > wh || wh > 16 / 9) {
	            return 10004;
	        }

	        return 10001;
	    },

	    // 图片错误提示
	    checkImageError: function checkImageError(images) {
	        var self = this;
	        var _images = [];
	        var errors = [];

	        images.length && _.map(images, function (image, i) {
	            var code = self.checkUploadImage(image);

	            if (code == 10001) {
	                _images.push(image);
	            } else {
	                errors.push({
	                    code: code,
	                    image: image
	                });
	            }
	        });

	        // 如果有图片错误信息
	        if (errors.length) {
	            Modal.alert(React.createElement(ImageError, { errors: errors }));
	        }

	        return _images;
	    },

	    // 验证标题
	    checkTitle: function checkTitle(title) {
	        var title = XD.Util.trim(title);
	        if (title == '') {
	            Modal.alert('请输入标题');
	            return false;
	        }

	        if (title.length > 30) {
	            Modal.alert('标题必须30字以内');
	            return false;
	        }
	        return true;
	    },

	    // 验证简述
	    checkDescription: function checkDescription(desc) {
	        var desc = XD.Util.trim(desc);
	        if (desc == '') {
	            Modal.alert('请输入简述');
	            return false;
	        }

	        if (desc.length > 256) {
	            Modal.alert('简述必须256字以内');
	            return false;
	        }
	        return true;
	    },

	    // 验证价格
	    checkPrice: function checkPrice(price) {
	        // 如果价格不是数字
	        if (isNaN(price) || price < 0.01) {
	            Modal.alert('请填写正确的价格，价格只能是大于0.01的数');
	            return false;
	        }
	        return true;
	    },

	    // 验证库存
	    checkStock: function checkStock(stock) {
	        // 如果库存不是数字
	        if (isNaN(stock) || stock <= 0) {
	            Modal.alert('请填写正确的库存，库存只能是大于0的正整数');
	            return false;
	        }
	        return true;
	    },

	    // 验证体积
	    checkVolume: function checkVolume(volume) {
	        if (volume != '') {
	            // 如果体积不是数字
	            if (isNaN(volume) || volume < 0.01 || !/^\d+(\.\d{1,2})?$/.test(volume)) {
	                Modal.alert('请正确填写体积，体积必须大于0，可精确到小数点后两位');
	                return false;
	            }
	        } else {
	            Modal.alert('该商品选择了体积计费的邮费模板，请填写商品体积后再保存');
	            return false;
	        }

	        return true;
	    },

	    // 验证重量
	    checkWeight: function checkWeight(weight) {
	        if (weight != '') {
	            // 如果重量不是数字
	            if (isNaN(weight) || weight < 0.01 || !/^\d+(\.\d{1,2})?$/.test(weight)) {
	                Modal.alert('请正确填写重量，重量必须大于0，可精确到小数点后两位');
	                return false;
	            }
	        } else {
	            Modal.alert('该商品选择了重量计费的邮费模板，请填写商品重量后再保存');
	            return false;
	        }

	        return true;
	    },

	    // 验证标签
	    checkTags: function checkTags(tags) {
	        var tags = tags || [];
	        tags = _.unique(tags);
	        if (tags.length < 3) {
	            Modal.alert('标签不能少于3个，请检查是否重复');
	            return false;
	        }
	        return true;
	    },

	    // 验证封面图
	    checkCoverImages: function checkCoverImages(coverImages) {
	        var coverImages = coverImages || [];
	        if (!coverImages.length) {
	            Modal.alert('至少上传一张封面图');
	            return false;
	        }
	        if (coverImages.length > 15) {
	            Modal.alert('最多只能上传15张封面图');
	            return false;
	        }

	        var images = this.checkImageError(coverImages);
	        if (coverImages.length != images.length) {
	            return false;
	        }

	        return true;
	    },

	    // 验证sku数据
	    checkSku: function checkSku(sku, skuType) {
	        if (skuType == 1 && !sku.length) {
	            Modal.alert('请填写单层规格');
	            return false;
	        }

	        if (skuType == 2 && !sku.length) {
	            Modal.alert('请填写双层规格');
	            return false;
	        }
	        return true;
	    },

	    // 验证skuImgInfo数据
	    checkSkuImgInfo: function checkSkuImgInfo(skuImgInfo, skuType) {

	        var hasImgLen = 0;
	        // 查找有多少sku图片
	        skuImgInfo.length && _.map(skuImgInfo, function (item, i) {
	            var _item = JSON.parse(item);
	            if (_item.img != '') {
	                hasImgLen++;
	            }
	        });

	        if (skuType == 1 && hasImgLen != skuImgInfo.length) {
	            Modal.alert('请上传单层规格图片');
	            return false;
	        }

	        if (skuType == 2 && hasImgLen != skuImgInfo.length) {
	            Modal.alert('请上传双层规格图片');
	            return false;
	        }
	        return true;
	    },

	    // 验证品牌
	    checkBrand: function checkBrand(brandId) {
	        if (!brandId || brandId == 0) {
	            Modal.alert('请选择品牌');
	            return false;
	        }
	        return true;
	    },
	    // 验证商品属性
	    checkProperties: function checkProperties(propertiesArr, defaultProperties) {
	        // console.log( propertiesArr)
	        var properties = {};
	        propertiesArr.map(function (ele, index) {
	            var obj = JSON.parse(ele);
	            properties[obj.name] = obj.values;
	        });

	        // console.log( properties)
	        var checked = true;
	        _.map(defaultProperties, function (value, key) {
	            // console.log(key,value.id, properties[key]);
	            if (checked && value.isRequired && !properties[key]) {
	                checked = false;
	                var str = '产品属性：' + key + ' 为必填项，请填写后重新提交';
	                Modal.alert(str);
	            }
	        });
	        return checked;
	    },
	    checkSkuProperties: function checkSkuProperties(skuProperties) {
	        var len = skuProperties.length;
	        if (len == 0) return true;

	        // 输入框已填写数目
	        var inputNum = 0;
	        skuProperties.map(function (ele) {
	            _.map(JSON.parse(ele), function (value, key) {
	                if (value) inputNum++;
	            });
	        });

	        // 至少填一个
	        if (inputNum == len) {
	            Modal.alert('请填写尺码说明');
	            return false;
	        }
	        return true;

	        /*必须全填
	        var isComplete = false ;
	        skuProperties.map(function(ele){
	            _.map(JSON.parse(ele),function(value,key){
	                console.log(value,key);
	                if(!isComplete && value ){
	                    isComplete = true ;
	                }
	            });
	        });
	        if(isComplete) return true ;
	        Modal.alert('请填写尺码说明');
	        return false ;*/
	    },
	    checkDetail: function checkDetail(details, categories) {
	        if (categories[0] === '服饰鞋包' && !details['size_info']) {
	            Modal.alert('尺码说明不能为空');
	            return false;
	        }
	        return true;
	    }
	};

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Field = __webpack_require__(16);
	var FieldMixins = __webpack_require__(17);

	var BondZones = React.createClass({
	    displayName: 'BondZones',

	    mixins: [FieldMixins],
	    statics: {
	        self: null,
	        getData: function getData() {
	            return BondZones.self.state.selected;
	        }
	    },
	    getInitialState: function getInitialState() {
	        return this.formatData(this.props.bondZones);
	    },
	    formatData: function formatData(bondZones) {
	        var data = bondZones || { selected: '', values: [] };
	        var options = (data.values || []).map(function (ele, index) {
	            return {
	                value: ele.bondedZoneId,
	                text: ele.name
	            };
	        });
	        options.unshift({
	            value: '',
	            text: '选择'
	        });

	        return {
	            options: options,
	            selected: data.selected
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        // console.log( props, props.bondZones );
	        this.setState(this.formatData(props.bondZones));
	    },
	    componentDidMount: function componentDidMount() {
	        BondZones.self = this;
	    },
	    onChange: function onChange(value) {
	        // console.log( value );
	        this.setState({
	            selected: value
	        });
	    },
	    render: function render() {
	        var state = this.state;
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(Field, { type: 'select',
	                options: state.options,
	                value: state.selected,
	                onChange: this.onChange })
	        );
	    }
	});

	module.exports = BondZones;

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	var Brand = React.createClass({
	    displayName: 'Brand',

	    statics: {
	        self: null,
	        getData: function getData() {
	            return Brand.self && Brand.self.state.brandId;
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            data: {},
	            brandId: this.props.data.chooseBrandId || 0
	        };
	    },
	    selectChange: function selectChange() {
	        var data = this.props.data || {};
	        var value = this.getDOMNode().value;

	        var brandId = 0;
	        // 查找id
	        data.shopBrandList && _.each(data.shopBrandList, function (item, key) {
	            if (value == item.name) {
	                brandId = item.id;
	            }
	        });

	        this.setState({
	            brandId: brandId
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        Brand.self = this;
	    },
	    render: function render() {
	        var data = this.props.data || {};

	        var options = [];
	        data.shopBrandList && _.each(data.shopBrandList, function (item, key) {
	            if (key == data.chooseBrandId) {
	                options.push(React.createElement(
	                    'option',
	                    { selected: true, id: item.id },
	                    item.name
	                ));
	            } else {
	                options.push(React.createElement(
	                    'option',
	                    { id: item.id },
	                    item.name
	                ));
	            }
	        });
	        return React.createElement(
	            'select',
	            { className: 'xd-select', onChange: this.selectChange },
	            React.createElement(
	                'option',
	                { value: '' },
	                '选择'
	            ),
	            options
	        );
	    }
	});

	module.exports = Brand;

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	var Code = React.createClass({
	    displayName: 'Code',

	    statics: {
	        self: null,
	        getData: function getData() {
	            return Code.self.state.code || '';
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            code: ''
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        Code.self = this;
	    },
	    // 值改变
	    valueChange: function valueChange(event) {
	        this.setState({
	            code: event.target.value
	        });
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            code: props.code
	        });
	    },
	    render: function render() {
	        var code = this.state.code || '';
	        return React.createElement('input', { className: 'goods-code xd-input primary', value: code, onChange: this.valueChange });
	    }
	});

	module.exports = Code;

/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);

	var CounterPrice = React.createClass({
	    displayName: 'CounterPrice',

	    statics: {
	        self: null,
	        getData: function getData() {
	            return CounterPrice.self.state.price || '';
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            price: this.props.counterPrice.price || '',
	            tip: ''
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        CounterPrice.self = this;
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            price: props.counterPrice.price
	        });
	    },
	    // 值改变
	    valueChange: function valueChange(event) {
	        var value = event.target.value;

	        var tip = '';
	        if (value != '') {
	            if (isNaN(value) || value < 0.01) {
	                tip = '请填写正确的专柜价格，专柜价格只能是大于0.01的数';
	            }
	        }

	        this.setState({
	            price: value,
	            tip: tip
	        });
	    },
	    render: function render() {
	        var price = this.state.price;
	        return React.createElement(
	            'div',
	            { className: 'goods-counter-price' },
	            React.createElement('input', { ref: 'price', className: 'xd-input primary', value: price, onChange: this.valueChange }),
	            React.createElement(
	                'span',
	                { className: 'high ml20' },
	                this.state.tip
	            )
	        );
	    }
	});

	module.exports = CounterPrice;

/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var UploadImage = __webpack_require__(45);
	var ImageCut = __webpack_require__(188);
	var Validator = __webpack_require__(174);
	var Modal = __webpack_require__(21);
	var Action = __webpack_require__(171);
	__webpack_require__(190);

	var CoverImages = React.createClass({
	    displayName: 'CoverImages',

	    statics: {
	        self: null,
	        getData: function getData() {
	            var coverImages = CoverImages.self.state.coverImages || [];
	            var _coverImages = [];
	            var _coverRelativeImages = [];

	            _.map(coverImages, function (image, i) {
	                _coverImages.push(XD.Util.filterOriPath(image));
	                _coverRelativeImages.push(image);
	            });

	            return {
	                "_coverImages": _coverImages,
	                "_coverRelativeImages": _coverRelativeImages
	            };
	        }
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            containerId: 'cover-image-cut'
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            coverImages: [],
	            datasource: [],
	            uploading: false,
	            uniImgChange: false,
	            unishowImgChangeIndex: 0,
	            dialogInfo: {
	                userDialog: false,
	                notuserDialog: false,
	                downDialog: false
	            },
	            ajaxdata: [],
	            ajaxdataOrigin: [],
	            checkedImgList: []
	        };
	    },
	    // 每次接收到新的props触发\
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            coverImages: props.data
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        CoverImages.self = this;
	        PubSub.subscribe('saveImageCut.update', this.saveImageCutUpdate);
	        PubSub.subscribe('saveImageRotate.update', this.saveImageRotateUpdate);
	        PubSub.subscribe('dialogInfo.update', this.dialogInfoUpdate);
	        PubSub.subscribe('coverImage.uploaded', (function (msg, url) {
	            //提供一个全局的回掉供图片添加测试使用，需求方子天，yuxin添加
	            var imageArr = _.isArray(url) ? url : [url];
	            this.uploadImageFinish(imageArr);
	        }).bind(this));
	    },
	    dialogInfoUpdate: function dialogInfoUpdate(topic, data) {
	        this.setState({
	            dialogInfo: data
	        });
	    },
	    // 编辑图片
	    editImage: function editImage(i) {
	        // 浏览器判断
	        if (!navigator.userAgent.match(/Chrome|Safari/i)) {
	            Modal.alert('很抱歉，图片裁剪和旋转目前只支持Chrome、Safari等高级浏览器！');
	            return;
	        }

	        PubSub.publish('editImage.update', {
	            i: i,
	            src: this.state.coverImages[i]
	        });
	    },
	    // 保存图片旋转回调
	    saveImageRotateUpdate: function saveImageRotateUpdate(msg, data) {
	        var coverImages = this.state.coverImages || [];

	        if (data.src == '') {
	            return;
	        }

	        coverImages[data.i] = data.src;
	        this.setState({
	            coverImages: coverImages
	        }, function () {
	            this.editImage(data.i);
	        });
	    },
	    // 保存图片裁剪回调
	    saveImageCutUpdate: function saveImageCutUpdate(msg, data) {
	        var coverImages = this.state.coverImages || [];

	        if (data.src == '') {
	            return;
	        }

	        coverImages[data.i] = data.src;
	        this.setState({
	            coverImages: coverImages
	        }, function () {
	            this.editImage(data.i);
	        });
	    },
	    uploadImageStart: function uploadImageStart() {
	        this.setState({
	            uploading: true
	        });
	    },
	    // 上传图片完成
	    uploadImageFinish: function uploadImageFinish(images) {
	        var coverImages = this.state.coverImages || [];
	        var datasource = this.state.datasource || [];
	        if (!images.length) {
	            return;
	        }
	        var localsource = [];
	        var maxCount = 14 - coverImages.length;
	        if (images.length > maxCount) {
	            var count = images.length - maxCount;
	            images.splice(0, count);
	        }
	        for (var i = 0; i < images.length; i++) {
	            localsource.push("local");
	        }

	        // 合并封面图数据
	        coverImages = coverImages.concat(images);
	        datasource = datasource.concat(localsource);

	        this.setState({
	            coverImages: coverImages,
	            datasource: datasource,
	            uploading: false
	        });
	    },
	    // 上传图片失败
	    uploadImageFailed: function uploadImageFailed(msg) {
	        Modal.alert(msg);
	    },
	    // 更换图片完成
	    changeImageFinish: function changeImageFinish(i, images) {
	        var coverImages = this.state.coverImages || [];

	        if (!images.length) {
	            return;
	        }

	        coverImages[i] = images[0];
	        this.setState({
	            coverImages: coverImages
	        });
	    },
	    // 更换图片失败
	    changeImageFailed: function changeImageFailed(msg) {
	        Modal.alert(msg);
	    },
	    // 删除封面图
	    delImage: function delImage(index, event) {
	        var coverImages = this.state.coverImages;
	        var datasource = this.state.datasource;

	        // 删除数据
	        coverImages.splice(index, 1);
	        datasource.splice(index, 1);
	        this.setState({
	            coverImages: coverImages,
	            datasource: datasource
	        });

	        PubSub.publish('delImage.update');
	    },
	    getUniImgList: function getUniImgList() {
	        this.state.uniImgChange = false;
	        this.state.checkedImgList = [];
	        this.searchOrderList();
	    },
	    // 读取订单信息
	    searchOrderList: function searchOrderList() {
	        var searchOrderData = this.searchOrderData;
	        var chooseImageFinish = this.chooseImageFinish;
	        var params = {};
	        var ajaxdata = [];
	        Action.getUniOrderList.call(this, params, function (data) {
	            $('body').css("overflow", "hidden");
	            var orderList = data.result.imgInfo.orders;
	            var imgList = data.result.imgInfo.images;
	            for (var i = 0; i < imgList.length; i++) {
	                imgList[i].checkedState = false;
	                imgList[i].mouseOverState = false;
	            }
	            var data = {
	                "orderImgList": imgList,
	                "orderImgCount": data.result.imgInfo.count
	            };
	            ajaxdata[0] = data;
	            Modal.open({
	                title: React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'span',
	                        { className: 'uni_modalTitle' },
	                        'uni图库'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'uni_modalTip' },
	                        '全部来自uni图库的商品图，能直接打实拍标，并且图墙排序加权哦！'
	                    )
	                ),
	                body: React.createElement(
	                    'div',
	                    { className: 'uni-gallery' },
	                    React.createElement(
	                        'div',
	                        { className: 'uni-gallery-nav' },
	                        React.createElement(
	                            'div',
	                            { className: 'nav-title' },
	                            '图库订单'
	                        ),
	                        React.createElement(
	                            'ul',
	                            { className: 'nav-items', id: 'uniOrderNav' },
	                            orderList.length ? orderList.map(function (item, index) {
	                                return React.createElement(
	                                    'li',
	                                    { className: index == 0 ? "orderChecked" : "", onClick: searchOrderData.bind(this, index, item.orderId) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        item.redsName
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        item.created
	                                    )
	                                );
	                            }) : ''
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { id: 'uni-gallery-box' },
	                        React.createElement(UniImageWall, { chooseImageFinish: chooseImageFinish, self: this })
	                    )
	                ),
	                beforeClose: function beforeClose() {
	                    $('body').css("overflow", "auto");
	                }
	            });
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderIndex: 0
	            });
	            this.setState({
	                ajaxdataOrigin: ajaxdata
	            });
	        }, function (data) {
	            var code = data.status.code;
	            if (code == 19100001) {
	                this.setState({
	                    dialogInfo: {
	                        userDialog: false,
	                        notuserDialog: false,
	                        downDialog: true
	                    }
	                });
	                {/*PubSub.publish('dialogInfo.update', {
	                       userDialog:false,
	                       notuserDialog:false,
	                       downDialog:true
	                    });*/}
	            } else if (code == 19100002) {
	                    this.setState({
	                        dialogInfo: {
	                            userDialog: false,
	                            notuserDialog: true,
	                            downDialog: false
	                        }
	                    });
	                    {/*PubSub.publish('dialogInfo.update', {
	                           userDialog:false,
	                           notuserDialog:true,
	                           downDialog:false
	                        });*/}
	                } else if (code == 19100003) {
	                        this.setState({
	                            dialogInfo: {
	                                userDialog: true,
	                                notuserDialog: false,
	                                downDialog: false
	                            }
	                        });
	                        {/*PubSub.publish('dialogInfo.update', {
	                              userDialog:true,
	                              notuserDialog:false,
	                              downDialog:false
	                            });*/}
	                    } else if (code == 4004) {
	                            Modal.alert(data.result.message);
	                        } else if (code == 19100010) {
	                            Modal.alert('uni系统升级中，升级时间：2015.09.16 02:00-04:00');
	                        }
	        });
	    },
	    //读取订单下的图库数据
	    searchOrderData: function searchOrderData(index, id, event) {
	        this.setState({
	            orderIndex: index
	        });

	        $("#uniOrderNav").find("li").removeClass("orderChecked");
	        var obj = event.currentTarget;
	        obj.className = "orderChecked";
	        var ajaxdata = this.state.ajaxdataOrigin;
	        if (ajaxdata[index] != null) {
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderIndex: index
	            });
	            return;
	        }
	        var params = {
	            orderId: id
	        };
	        Action.getUniImgList.call(this, params, function (data) {
	            var imgCount = data.result.count;
	            var data = data.result.images;
	            for (var i = 0; i < data.length; i++) {
	                data[i].checkedState = false;
	                data[i].mouseOverState = false;
	            }
	            ajaxdata[index] = {
	                "orderImgList": data,
	                "orderImgCount": imgCount
	            };
	            this.setState({
	                ajaxdataOrigin: ajaxdata
	            });
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderIndex: index
	            });
	        });
	    },
	    chooseImageFinish: function chooseImageFinish() {
	        Modal.close();
	        var coverImages = this.state.coverImages || [];
	        var datasource = this.state.datasource || [];
	        var localsource = [];
	        var imgList = this.state.checkedImgList;
	        var images = [];
	        for (var i = 0; i < imgList.length; i++) {
	            images.push(imgList[i]["wholePath"]);
	            localsource.push("uni");
	        }
	        //  过滤上传中有错误的图片
	        var images = Validator.checkImageError(images);
	        if (images && !images.length) {
	            return;
	        }
	        if (this.state.uniImgChange) {
	            var index = this.state.unishowImgChangeIndex;
	            coverImages[index] = images[0];
	        } else {
	            coverImages = coverImages.concat(images);
	            datasource = datasource.concat(localsource);
	        }
	        this.setState({
	            coverImages: coverImages,
	            datasource: datasource
	        });
	    },
	    closeDialog: function closeDialog() {
	        PubSub.publish('dialogInfo.update', {
	            userDialog: false,
	            notuserDialog: false,
	            downDialog: false
	        });
	    },

	    changeUniImgStart: function changeUniImgStart(i) {
	        this.state.uniImgChange = true;
	        this.state.unishowImgChangeIndex = i;
	        this.state.checkedImgList = [];
	        this.searchOrderList();
	    },
	    render: function render() {
	        var coverImages = this.state.coverImages || [];
	        var uploading = this.state.uploading;
	        var cx = React.addons.classSet;
	        var datasource = this.state.datasource || [];
	        var dialogInfo = this.state.dialogInfo;
	        return React.createElement(
	            'div',
	            { className: 'cover-images-wrap' },
	            dialogInfo.userDialog || dialogInfo.notuserDialog || dialogInfo.downDialog ? React.createElement('div', { className: 'dialog-mask' }) : '',
	            dialogInfo.notuserDialog ? React.createElement(
	                'div',
	                { className: 'dialog_notUser' },
	                React.createElement('div', { className: 'dialog_close', onClick: this.closeDialog }),
	                React.createElement('a', { className: 'dialog_link', href: 'http://www.mogujie.com/act/150813jiuzhi?source=50', target: '_blank', onClick: this.closeDialog })
	            ) : '',
	            dialogInfo.userDialog ? React.createElement(
	                'div',
	                { className: 'dialog_user' },
	                React.createElement('div', { className: 'dialog_close', onClick: this.closeDialog }),
	                React.createElement('div', { className: 'dialog_sure', onClick: this.closeDialog })
	            ) : '',
	            dialogInfo.downDialog ? React.createElement(
	                'div',
	                { className: 'dialog_download' },
	                React.createElement('div', { className: 'dialog_close', onClick: this.closeDialog }),
	                React.createElement('a', { className: 'dialog_link', href: 'http://www.mogujie.com/act/150813jiuzhi?source=50', target: '_blank', onClick: this.closeDialog })
	            ) : '',
	            coverImages.length > 0 ? React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'div',
	                    { className: 'cover-images' },
	                    React.createElement(
	                        'ul',
	                        { className: 'clearfix' },
	                        coverImages.length ? coverImages.map((function (src, i) {
	                            var code = Validator.checkUploadImage(src);
	                            var uploadImageClass = cx({
	                                'upload-image-error': code != 10001
	                            });
	                            if (datasource[i] == "uni") {
	                                var unishow = "action unishow";
	                                var localshow = "action hide";
	                            } else {
	                                var unishow = "action hide";
	                                var localshow = "action";
	                            }
	                            return React.createElement(
	                                'li',
	                                { className: uploadImageClass },
	                                React.createElement(
	                                    'div',
	                                    { className: 'upload-image' },
	                                    src != '' ? React.createElement('img', { className: 'img', src: src + '_100x100.jpg', width: '100' }) : null,
	                                    React.createElement(
	                                        'div',
	                                        { className: unishow },
	                                        React.createElement(
	                                            'a',
	                                            { href: 'javascript:;', className: 'change-btn', onClick: this.changeUniImgStart.bind(this, i) },
	                                            '更换'
	                                        )
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: localshow },
	                                        React.createElement(
	                                            'a',
	                                            { href: 'javascript:;', className: 'edit-btn', onClick: this.editImage.bind(this, i) },
	                                            '编辑'
	                                        ),
	                                        React.createElement(
	                                            'a',
	                                            { href: 'javascript:;', className: 'change-btn' },
	                                            '更换',
	                                            React.createElement(UploadImage, { isMultiple: false, onFinish: this.changeImageFinish.bind(this, i), onFailed: this.changeImageFailed })
	                                        )
	                                    )
	                                ),
	                                React.createElement(
	                                    'a',
	                                    { href: 'javascript:;', className: 'close-btn', onClick: this.delImage.bind(this, i) },
	                                    'x'
	                                ),
	                                code != 10001 ? React.createElement(
	                                    'div',
	                                    { className: 'image-tip' },
	                                    React.createElement(
	                                        'p',
	                                        null,
	                                        React.createElement('i', { className: 'error-info' })
	                                    ),
	                                    React.createElement(
	                                        'div',
	                                        { className: 'image-tip-wrap' },
	                                        React.createElement(
	                                            'ul',
	                                            { className: 'image-tip-list' },
	                                            React.createElement(
	                                                'ol',
	                                                null,
	                                                React.createElement(
	                                                    'p',
	                                                    null,
	                                                    '图片尺寸不符合，请编辑图片或更换图片'
	                                                ),
	                                                React.createElement(
	                                                    'p',
	                                                    null,
	                                                    '图片宽高比例在9:16-16:9之间且宽度大于等640px'
	                                                )
	                                            )
	                                        )
	                                    )
	                                ) : null
	                            );
	                        }).bind(this)) : null
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'cover-upload-choose' },
	                    coverImages.length == 14 ? React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'span',
	                            { style: { color: "#ff6666" } },
	                            '*'
	                        ),
	                        ' 14张图已满，可更换或删除重传哦'
	                    ) : React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'a',
	                            { className: 'xd-btn primary' },
	                            '上传图片',
	                            React.createElement(UploadImage, { onStart: this.uploadImageStart, onFinish: this.uploadImageFinish, onFailed: this.uploadImageFailed })
	                        ),
	                        React.createElement(
	                            'a',
	                            { className: 'xd-btn primary xd-btn-uni', onClick: this.getUniImgList },
	                            '上传uni图库图',
	                            React.createElement('i', null)
	                        ),
	                        React.createElement(
	                            'div',
	                            null,
	                            React.createElement(
	                                'span',
	                                { style: { color: "#ff6666" } },
	                                '*'
	                            ),
	                            ' 最多可传14张图哦'
	                        )
	                    )
	                )
	            ) : React.createElement(
	                'div',
	                { className: 'cover-upload-choose0' },
	                React.createElement(
	                    'a',
	                    { className: 'xd-btn primary' },
	                    '上传图片',
	                    React.createElement(UploadImage, { onStart: this.uploadImageStart, onFinish: this.uploadImageFinish, onFailed: this.uploadImageFailed })
	                ),
	                React.createElement(
	                    'a',
	                    { className: 'xd-btn primary xd-btn-uni', onClick: this.getUniImgList },
	                    '上传uni图库图',
	                    React.createElement('i', null)
	                ),
	                React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'span',
	                        { style: { color: "#ff6666" } },
	                        '*'
	                    ),
	                    ' 最多可传14张图哦'
	                )
	            ),
	            React.createElement(ImageCut, { containerId: this.props.containerId })
	        );
	    }
	});
	var UniImageWall = React.createClass({
	    displayName: 'UniImageWall',

	    getInitialState: function getInitialState() {
	        var self = this.props.self;
	        return {
	            moveLeftCount: 0,
	            uniImgChange: self.state.uniImgChange,
	            ajaxdata: []
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('orderData.update', this.orderDataUpdate);
	    },
	    orderDataUpdate: function orderDataUpdate(topic, data, index) {
	        this.setState(data);
	    },
	    setChecked: function setChecked(index, src, id, width, height) {
	        var self = this.props.self;
	        var orderIndex = this.state.orderIndex;
	        var ajaxdata = this.state.ajaxdata;
	        var curajaxdata = ajaxdata[orderIndex];
	        var coverImages = self.state.coverImages || [];
	        var checkedImgList = self.state.checkedImgList;
	        var maxCount = 14 - coverImages.length;
	        var uniImgChange = self.state.uniImgChange;
	        var unishowImgChangeIndex = self.state.uniImgChange;
	        if (checkedImgList.length < maxCount || uniImgChange) {
	            if (uniImgChange) {
	                var count = checkedImgList.length;
	                for (var i = 0; i < ajaxdata.length; i++) {
	                    if (ajaxdata[i] != null) {
	                        var imglistlength = ajaxdata[i].orderImgList.length;
	                        for (var j = 0; j < imglistlength; j++) {
	                            ajaxdata[i].orderImgList[j].checkedState = 0;
	                        }
	                    };
	                }
	                for (var i = 0; i < ajaxdata[orderIndex].orderImgList.length; i++) {
	                    if (i != index) ajaxdata[orderIndex].orderImgList[i].checkedState = 0;else ajaxdata[orderIndex].orderImgList[i].checkedState = 1;
	                }
	                checkedImgList = [];
	            } else {
	                ajaxdata[orderIndex].orderImgList[index].checkedState = !ajaxdata[orderIndex].orderImgList[index].checkedState;
	            }
	            this.setState({
	                ajaxdata: ajaxdata
	            });
	            if (ajaxdata[orderIndex].orderImgList[index].checkedState) {

	                checkedImgList.push(ajaxdata[orderIndex].orderImgList[index]);
	            } else {
	                var count = checkedImgList.length;
	                for (var i = 0; i < count; i++) {
	                    if (checkedImgList[i]["id"] == id) {
	                        checkedImgList.splice(i, 1);
	                        break;
	                    }
	                }
	                if (count == 9) {
	                    this.setState({
	                        moveLeftCount: 0
	                    });
	                }
	            }
	            self.setState({
	                checkedImgList: checkedImgList
	            });
	        } else {
	            Modal.alert("封面图最多可传14张图,可删除重传哦");
	        }
	    },
	    moveLeft: function moveLeft() {
	        var self = this.props.self;
	        var currentCount = self.state.checkedImgList.length;
	        var moveLeftCount = this.state.moveLeftCount;
	        if (-currentCount < 8 && -moveLeftCount < currentCount - 8) {
	            this.setState({
	                moveLeftCount: moveLeftCount - 1
	            });
	        }
	    },
	    moveRight: function moveRight() {
	        var moveLeftCount = this.state.moveLeftCount;
	        if (moveLeftCount < 0) {
	            this.setState({
	                moveLeftCount: moveLeftCount + 1
	            });
	        }
	    },
	    mouseOver: function mouseOver(index) {
	        var self = this.props.self;
	        var orderIndex = this.state.orderIndex;
	        var ajaxdata = this.state.ajaxdata;
	        var curajaxdata = ajaxdata[orderIndex];
	        var count = ajaxdata[orderIndex].orderImgList.length;
	        for (var i = 0; i < count; i++) {
	            ajaxdata[orderIndex].orderImgList[i].mouseOverState = false;
	        }
	        ajaxdata[orderIndex].orderImgList[index].mouseOverState = !ajaxdata[orderIndex].orderImgList[index].mouseOverState;
	        this.setState({
	            ajaxdata: ajaxdata
	        });
	    },
	    mouseOut: function mouseOut(index) {
	        var self = this.props.self;
	        var orderIndex = this.state.orderIndex;
	        var ajaxdata = this.state.ajaxdata;
	        var curajaxdata = ajaxdata[orderIndex];
	        ajaxdata[orderIndex].orderImgList[index].mouseOverState = !ajaxdata[orderIndex].orderImgList[index].mouseOverState;
	        this.setState({
	            ajaxdata: ajaxdata
	        });
	    },
	    render: function render() {
	        var self = this.props.self;
	        var orderIndex = this.state.orderIndex;
	        var ajaxdata = this.state.ajaxdata;
	        var curajaxdata = ajaxdata[orderIndex];
	        if (curajaxdata) {
	            var data = curajaxdata["orderImgList"];
	            var imgCount = curajaxdata["orderImgCount"];
	        } else {
	            var data = [];
	            var imgCount = 0;
	        }
	        var setChecked = this.setChecked;
	        var moveLeft = this.moveLeft;
	        var moveRight = this.moveRight;
	        var mouseOver = this.mouseOver;
	        var mouseOut = this.mouseOut;
	        var chooseImageFinish = this.chooseImageFinish;
	        var moveLeftCount = this.state.moveLeftCount;
	        var checkedImgList = self.state.checkedImgList;
	        return React.createElement(
	            'div',
	            { className: 'uni-gallery-cont' },
	            React.createElement(
	                'div',
	                { className: 'cont-imgInfo' },
	                React.createElement(
	                    'div',
	                    { className: 'cont-capacity' },
	                    '共有',
	                    imgCount,
	                    '张精修片'
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'cont-imgWall' },
	                    data.length > 0 ? data.map(function (item, index) {
	                        var width = parseInt(item.wide),
	                            height = parseInt(item.length);
	                        if (width / 100 >= height / 150) {
	                            var curStyle = {
	                                width: "100px",
	                                height: "auto",
	                                "margin-top": (150 - height / (width / 100)) / 2 + "px"
	                            };
	                        } else {
	                            var curStyle = {
	                                width: "auto",
	                                height: "150px",
	                                "margin-left": (100 - width / (height / 150)) / 2 + "px"
	                            };
	                        }
	                        return React.createElement(
	                            'li',
	                            { onClick: setChecked.bind(this, index, item.wholePath, item.id, item.width, item.height), onMouseOver: mouseOver.bind(this, index) },
	                            React.createElement(
	                                'div',
	                                { className: 'imgArea' },
	                                React.createElement('img', { style: curStyle, 'data-checked': 'false', src: item.wholePath + '_220x330.jpg', 'data-id': item.id })
	                            ),
	                            item.checkedState ? React.createElement('i', { className: 'checked', 'data-checked': '1' }) : React.createElement('i', { className: 'unchecked' }),
	                            item.checkedState || item.mouseOverState ? React.createElement('div', { className: 'uniImg-mask', onMouseOut: mouseOut.bind(this, index) }) : '',
	                            React.createElement(
	                                'div',
	                                { className: 'title' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    item.title
	                                )
	                            )
	                        );
	                    }) : ''
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'cont-bottom' },
	                React.createElement(
	                    'div',
	                    { className: 'bottom-imgList' },
	                    checkedImgList.length > 0 ? React.createElement('div', { className: 'arrow-left', onClick: moveLeft }) : '',
	                    React.createElement(
	                        'div',
	                        { className: 'imgArea' },
	                        React.createElement(
	                            'ul',
	                            { className: 'checked-imgList', style: { width: checkedImgList.length * 66, marginLeft: moveLeftCount * 66 } },
	                            checkedImgList.length > 0 ? checkedImgList.map(function (item) {

	                                return React.createElement(
	                                    'li',
	                                    null,
	                                    React.createElement('img', { src: item.wholePath + '_100x100.jpg' })
	                                );
	                            }) : ''
	                        )
	                    ),
	                    checkedImgList.length > 0 ? React.createElement('div', { className: 'arrow-right', onClick: moveRight }) : ''
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'bottom-btn' },
	                    React.createElement(
	                        'div',
	                        { className: 'checked-count' },
	                        React.createElement(
	                            'span',
	                            { id: 'checkedCount' },
	                            '已选',
	                            checkedImgList.length,
	                            '张'
	                        )
	                    ),
	                    checkedImgList.length > 0 ? React.createElement(
	                        'a',
	                        { href: 'javascript:;', className: 'checked-btn disabled', onClick: this.props.chooseImageFinish },
	                        '确定'
	                    ) : React.createElement(
	                        'a',
	                        { href: 'javascript:;', className: 'checked-btn' },
	                        '确定'
	                    )
	                )
	            )
	        );
	    }
	});
	module.exports = CoverImages;
	/* return (
	   <div className="cover-images-wrap">
	       <div className="cover-images">
	           <ul className="clearfix">
	               {coverImages.length ? coverImages.map(function(src, i) {
	                   var code = Validator.checkUploadImage(src);
	                   var uploadImageClass = cx({
	                       'upload-image-error': code != 10001
	                   });
	                   return (
	                       <li className={uploadImageClass}>
	                           <div className="upload-image">
	                               {src != '' ? <img className="img" src={src+ '_100x100.jpg'} width="100" /> : null}
	                               <div className="action">
	                                   <a href="javascript:;" className="edit-btn" onClick={this.editImage.bind(this, i)}>编辑</a>
	                                   <a href="javascript:;" className="change-btn">
	                                       更换
	                                       <UploadImage isMultiple={false} onFinish={this.changeImageFinish.bind(this, i)} onFailed={this.changeImageFailed} />
	                                   </a>
	                               </div>
	                           </div>
	                           <a href="javascript:;" className="close-btn" onClick={this.delImage.bind(this, i)}>x</a>
	                           {code != 10001 ?
	                               <div className="image-tip">
	                                   <p><i className="error-info"></i></p>
	                                   <div className="image-tip-wrap">
	                                       <ul className="image-tip-list">
	                                           <ol>
	                                               <p>图片尺寸不符合，请编辑图片或更换图片</p>
	                                               <p>图片宽高比例在9:16-16:9之间且宽度大于等640px</p>
	                                           </ol>
	                                       </ul>
	                                   </div>
	                               </div> : null}
	                       </li>
	                   );
	               }.bind(this)) : null}
	               {coverImages.length < 15 ?
	                   <li>
	                       <div className="upload-image">
	                           {uploading ?
	                               <div className="loading-wrap">
	                                   <img src="//s17.mogujie.com/img/fpay/ubzlo_ieyden3fha3teobtmiytambqgqyde_24x24.gif" width="24" height="24" />
	                               </div>
	                               : <span>＋上传图片</span>}
	                           <UploadImage onStart={this.uploadImageStart} onFinish={this.uploadImageFinish} onFailed={this.uploadImageFailed} />
	                       </div>
	                   </li>
	                   : null}
	           </ul>
	       </div>*/

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);

	var CustomModule = React.createClass({
	    displayName: 'CustomModule',

	    getInitialState: function getInitialState() {
	        return {
	            moduleName: '',
	            tip: ''
	        };
	    },
	    // 值改变
	    valueChange: function valueChange(event) {
	        var value = event.target.value;
	        value = XD.Util.trim(value);

	        this.setState({
	            moduleName: value,
	            tip: value.length > 6 ? '模块名称不能超过6字' : ''
	        });
	    },
	    // 添加自定义模块
	    addCustomModule: function addCustomModule() {
	        var moduleName = this.refs.moduleName.getDOMNode().value;
	        moduleName = XD.Util.trim(moduleName);

	        if (moduleName == '') {
	            Modal.alert('请输入模块名称');
	            return;
	        }

	        PubSub.publish('addCustomModule.update', {
	            moduleName: moduleName,
	            maxModuleNum: 4
	        });

	        this.refs.moduleName.getDOMNode().value = '';
	    },
	    render: function render() {
	        var moduleName = this.state.moduleName || '';
	        return React.createElement(
	            'div',
	            { className: 'custom-module' },
	            React.createElement('input', { ref: 'moduleName', className: 'xd-input primary', placeholder: '模块名称最多不超过6个字', value: moduleName, onChange: this.valueChange }),
	            React.createElement(
	                'a',
	                { className: 'xd-btn default ml10', onClick: this.addCustomModule },
	                '添加自定义模块'
	            ),
	            React.createElement(
	                'span',
	                { className: 'high ml20' },
	                this.state.tip
	            )
	        );
	    }
	});

	module.exports = CustomModule;

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	var Desc = React.createClass({
	    displayName: 'Desc',

	    statics: {
	        self: null,
	        getData: function getData() {
	            return Desc.self.state.desc;
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            desc: '',
	            tip: ''
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        Desc.self = this;
	    },
	    // 值改变
	    valueChange: function valueChange(event) {
	        var value = event.target.value;
	        // console.log(value.length);
	        // value = XD.Util.trim(value);

	        this.setState({
	            desc: value,
	            tip: value.length > 256 ? '简述不能超过256字' : ''
	        });
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            desc: props.desc
	        });
	    },
	    render: function render() {
	        var desc = this.state.desc || '';
	        return React.createElement(
	            'div',
	            { className: 'goods-desc' },
	            React.createElement('textarea', { className: 'desc-input xd-textarea', placeholder: '请描述您的商品，对应手机端商品简介部分，256个汉字以内', value: desc, onChange: this.valueChange }),
	            React.createElement(
	                'span',
	                { className: 'high' },
	                this.state.tip
	            )
	        );
	    }
	});

	module.exports = Desc;

/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var UploadImage = __webpack_require__(45);
	var Modal = __webpack_require__(21);
	var SizeDesc = __webpack_require__(200);
	var Link = __webpack_require__(172);
	var Validator = __webpack_require__(174);
	var Action = __webpack_require__(171);

	var OperateMask = React.createClass({
	    displayName: 'OperateMask',

	    getInitialState: function getInitialState() {
	        return {
	            data: {},
	            dialogInfo: {
	                userDialog: false,
	                notuserDialog: false,
	                downDialog: false
	            },
	            ajaxdata: [],
	            ajaxdataOrigin: [],
	            checkedImgList: []
	        };
	    },

	    // 移动图片
	    moveImage: function moveImage(type) {
	        var moduleIndex = this.props.moduleIndex;
	        var imageIndex = this.props.imageIndex;
	        var self = this.props.self;
	        var detailImages = self.state.detailImages;
	        var images = detailImages[moduleIndex].images;

	        // 上移下移
	        switch (type) {
	            case 'up':
	                (function () {
	                    if (imageIndex == 0) {
	                        return;
	                    }
	                    images[imageIndex] = images.splice(imageIndex - 1, 1, images[imageIndex])[0];
	                })();break;
	            case 'down':
	                (function () {
	                    if (imageIndex == images.length - 1) {
	                        return;
	                    }
	                    images[imageIndex] = images.splice(imageIndex + 1, 1, images[imageIndex])[0];
	                })();break;
	        }

	        detailImages[moduleIndex].images = images;

	        self.setState({
	            detailImages: detailImages
	        });
	    },
	    // 删除图片
	    delImage: function delImage() {
	        var moduleIndex = this.props.moduleIndex;
	        var imageIndex = this.props.imageIndex;
	        var self = this.props.self;
	        var detailImages = self.state.detailImages;
	        detailImages[moduleIndex].images.splice(imageIndex, 1);
	        self.setState({
	            detailImages: detailImages
	        });
	    },
	    // 上传图片
	    uploadImageFinish: function uploadImageFinish(images) {
	        if (images.length) {

	            // 过滤上传中有错误的图片
	            var images = Validator.checkImageError(images);
	            if (images && !images.length) {
	                return;
	            }

	            var moduleIndex = this.props.moduleIndex;
	            var imageIndex = this.props.imageIndex;
	            var self = this.props.self;
	            var detailImages = self.state.detailImages;
	            console.log("local-upload", images);
	            detailImages[moduleIndex].images[imageIndex].img = images[0];
	            self.setState({
	                detailImages: detailImages
	            });
	        }
	    },
	    //读取uni图库数据
	    getUniImgList: function getUniImgList() {
	        this.searchOrderList();
	    },
	    chooseImageFinish: function chooseImageFinish() {
	        Modal.close();
	        var imgList = this.state.checkedImgList;
	        var images = [];
	        for (var i = 0; i < imgList.length; i++) {
	            images.push(imgList[i]["wholePath"]);
	        }
	        // 过滤上传中有错误的图片
	        var images = Validator.checkImageError(images);
	        if (images && !images.length) {
	            return;
	        }
	        var moduleIndex = this.props.moduleIndex;
	        var imageIndex = this.props.imageIndex;
	        var self = this.props.self;
	        var detailImages = self.state.detailImages;
	        console.log("uni--upload", images);
	        detailImages[moduleIndex].images[imageIndex].img = images[0];
	        self.setState({
	            detailImages: detailImages
	        });
	    },
	    // 读取订单信息
	    searchOrderList: function searchOrderList() {
	        var searchOrderData = this.searchOrderData;
	        var chooseImageFinish = this.chooseImageFinish;
	        var params = {};
	        var ajaxdata = [];
	        Action.getUniOrderList.call(this, params, function (data) {
	            $('body').css("overflow", "hidden");
	            var orderList = data.result.imgInfo.orders;
	            var imgList = data.result.imgInfo.images;
	            for (var i = 0; i < imgList.length; i++) {
	                imgList[i].checkedState = false;
	                imgList[i].mouseOverState = false;
	                imgList[i].source = "uni";
	            }
	            var data = {
	                "orderImgList": imgList,
	                "orderImgCount": data.result.imgInfo.count
	            };
	            ajaxdata[0] = data;
	            Modal.open({
	                title: React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'span',
	                        { className: 'uni_modalTitle' },
	                        'uni图库'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'uni_modalTip' },
	                        '全部来自uni图库的商品图，能直接打实拍标，并且图墙排序加权哦！'
	                    )
	                ),
	                body: React.createElement(
	                    'div',
	                    { className: 'uni-gallery' },
	                    React.createElement(
	                        'div',
	                        { className: 'uni-gallery-nav' },
	                        React.createElement(
	                            'div',
	                            { className: 'nav-title' },
	                            '图库订单'
	                        ),
	                        React.createElement(
	                            'ul',
	                            { className: 'nav-items', id: 'uniOrderNav' },
	                            orderList.length ? orderList.map(function (item, index) {
	                                return React.createElement(
	                                    'li',
	                                    { className: index == 0 ? "orderChecked" : "", onClick: searchOrderData.bind(this, index, item.orderId) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        item.redsName
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        item.created
	                                    )
	                                );
	                            }) : ''
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { id: 'uni-gallery-box' },
	                        React.createElement(UniImageWall, { chooseImageFinish: chooseImageFinish, self: this, uniImgChange: 'true' })
	                    )
	                ),
	                beforeClose: function beforeClose() {
	                    $('body').css("overflow", "auto");
	                }
	            });
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderIndex: 0
	            });
	            this.setState({
	                ajaxdataOrigin: ajaxdata
	            });
	        }, function (data) {
	            var code = data.status.code;
	            if (code == 19100001) {
	                PubSub.publish('dialogInfo.update', {
	                    userDialog: false,
	                    notuserDialog: false,
	                    downDialog: true
	                });
	            } else if (code == 19100002) {
	                PubSub.publish('dialogInfo.update', {
	                    userDialog: false,
	                    notuserDialog: true,
	                    downDialog: false
	                });
	            } else if (code == 19100003) {
	                PubSub.publish('dialogInfo.update', {
	                    userDialog: true,
	                    notuserDialog: false,
	                    downDialog: false
	                });
	            } else if (code == 4004) {
	                Modal.alert(data.result.message);
	            } else if (code == 19100010) {
	                Modal.alert('uni系统升级中，升级时间：2015.09.16 02:00-04:00');
	            }
	        });
	    },
	    //读取订单下的图库数据
	    searchOrderData: function searchOrderData(index, id, event) {
	        this.setState({
	            orderIndex: index
	        });

	        $("#uniOrderNav").find("li").removeClass("orderChecked");
	        var obj = event.currentTarget;
	        obj.className = "orderChecked";
	        var ajaxdata = this.state.ajaxdataOrigin;
	        if (ajaxdata[index] != null) {
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderIndex: index
	            });
	            return;
	        }
	        var params = {
	            orderId: id
	        };
	        Action.getUniImgList.call(this, params, function (data) {
	            var imgCount = data.result.count;
	            var data = data.result.images;
	            for (var i = 0; i < data.length; i++) {
	                data[i].checkedState = false;
	                data[i].mouseOverState = false;
	                data[i].source = "uni";
	            }
	            ajaxdata[index] = {
	                "orderImgList": data,
	                "orderImgCount": imgCount
	            };
	            this.setState({
	                ajaxdataOrigin: ajaxdata
	            });
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderIndex: index
	            });
	        });
	    },
	    render: function render() {
	        if (this.props.desc == "uni") {
	            return React.createElement(
	                'div',
	                { className: 'operate-mask hide' },
	                React.createElement(
	                    'div',
	                    { className: 'action' },
	                    React.createElement(
	                        'a',
	                        { href: 'javascript:;', onClick: this.moveImage.bind(this, 'up') },
	                        '上移'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'javascript:;', onClick: this.moveImage.bind(this, 'down') },
	                        '下移'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'javascript:;', onClick: this.getUniImgList },
	                        '重新上传'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'javascript:;', onClick: this.delImage },
	                        '删除'
	                    )
	                ),
	                React.createElement('div', { className: 'mask' })
	            );
	        } else {
	            return React.createElement(
	                'div',
	                { className: 'operate-mask hide' },
	                React.createElement(
	                    'div',
	                    { className: 'action' },
	                    React.createElement(
	                        'a',
	                        { href: 'javascript:;', onClick: this.moveImage.bind(this, 'up') },
	                        '上移'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'javascript:;', onClick: this.moveImage.bind(this, 'down') },
	                        '下移'
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'javascript:;' },
	                        '重新上传',
	                        React.createElement(UploadImage, { onFinish: this.uploadImageFinish })
	                    ),
	                    React.createElement(
	                        'a',
	                        { href: 'javascript:;', onClick: this.delImage },
	                        '删除'
	                    )
	                ),
	                React.createElement('div', { className: 'mask' })
	            );
	        }
	    }
	});

	// 有封面图
	var DetailImage = React.createClass({
	    displayName: 'DetailImage',

	    getInitialState: function getInitialState() {
	        return {
	            content: ''
	        };
	    },
	    imageMouseMove: function imageMouseMove(index) {
	        this.getDOMNode().querySelectorAll('.operate-mask')[index].className = 'operate-mask';
	    },
	    imageMouseLeave: function imageMouseLeave(index) {
	        this.getDOMNode().querySelectorAll('.operate-mask')[index].className = 'operate-mask hide';
	    },
	    contentChange: function contentChange(moduleIndex, event) {
	        var self = this.props.self;
	        var detailImages = self.state.detailImages;
	        detailImages[moduleIndex].desc = event.target.value;
	        self.setState({
	            detailImages: detailImages
	        });
	    },

	    render: function render() {
	        var self = this.props.self;
	        var moduleIndex = this.props.moduleIndex;
	        var detailImage = this.props.detailImage || {};
	        var title = detailImage.title || '';
	        var images = detailImage.images || [];
	        var content = detailImage.desc || '';

	        return React.createElement(
	            'div',
	            { className: 'detail-image' },
	            React.createElement(
	                'div',
	                { className: 'desc-content' },
	                React.createElement(
	                    'p',
	                    null,
	                    title
	                ),
	                React.createElement('textarea', { className: 'xd-textarea', placeholder: title + "描述", value: content || '', onChange: this.contentChange.bind(this, moduleIndex) })
	            ),
	            React.createElement(
	                'ul',
	                { className: 'clearfix' },
	                images.length ? images.map((function (item, i) {
	                    return React.createElement(
	                        'li',
	                        { onMouseMove: this.imageMouseMove.bind(this, i), onMouseLeave: this.imageMouseLeave.bind(this, i) },
	                        React.createElement(
	                            'div',
	                            { className: 'item' },
	                            React.createElement('img', { src: item.img }),
	                            React.createElement(OperateMask, { moduleIndex: moduleIndex, imageIndex: i, self: self, desc: item.desc })
	                        )
	                    );
	                }).bind(this)) : ''
	            )
	        );
	    }
	});

	// 上传图片
	var UploadBtn = React.createClass({
	    displayName: 'UploadBtn',

	    getInitialState: function getInitialState() {
	        return {
	            data: {},
	            dialogInfo: {
	                userDialog: false,
	                notuserDialog: false,
	                downDialog: false
	            },
	            ajaxdata: [],
	            ajaxdataOrigin: [],
	            checkedImgList: []
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('dialogInfo.update', this.dialogInfoUpdate);
	        PubSub.subscribe('detailImage.uploaded', (function (msg, data) {
	            //提供一个全局的回掉供图片添加测试使用，需求方子天，yuxin添加
	            var me = this,
	                moduleIndex = me.props.moduleIndex,
	                index = data.index,
	                url = data.url,
	                imageArr = _.isArray(url) ? url : [url];

	            if (index == moduleIndex) {
	                me.uploadImageFinish(moduleIndex, imageArr);
	            }
	        }).bind(this));
	    },
	    dialogInfoUpdate: function dialogInfoUpdate(topic, data) {
	        this.setState({
	            dialogInfo: data
	        });
	    },
	    // 图片上传完成
	    uploadImageFinish: function uploadImageFinish(moduleIndex, images) {
	        var self = this.props.self;
	        var detailImages = self.state.detailImages;
	        if (images.length) {

	            // 过滤上传中有错误的图片
	            var images = Validator.checkImageError(images);
	            if (images && !images.length) {
	                return;
	            }

	            _.map(images, function (image, i) {
	                detailImages[moduleIndex].images.push({
	                    img: image,
	                    desc: ''
	                });
	            });
	            console.log("uni——upload", images);
	            self.setState({
	                detailImages: detailImages
	            });
	        }
	    },
	    uploadImageFailed: function uploadImageFailed(msg) {
	        Modal.alert(msg);
	    },
	    closeDialog: function closeDialog() {
	        PubSub.publish('dialogInfo.update', {
	            userDialog: false,
	            notuserDialog: false,
	            downDialog: false
	        });
	    },
	    chooseImageFinish: function chooseImageFinish() {
	        Modal.close();
	        var self = this.props.self;
	        var detailImages = self.state.detailImages;
	        var moduleIndex = this.props.moduleIndex;
	        var imgList = this.state.checkedImgList;
	        var images = [];
	        for (var i = 0; i < imgList.length; i++) {
	            images.push(imgList[i]["wholePath"]);
	        }
	        // 过滤上传中有错误的图片
	        var images = Validator.checkImageError(images);
	        if (images && !images.length) {
	            return;
	        }
	        if (images.length) {
	            _.map(images, function (image, i) {
	                console.log(image);
	                detailImages[moduleIndex].images.push({
	                    img: image,
	                    desc: 'uni'
	                });
	            });

	            self.setState({
	                detailImages: detailImages
	            });
	        }
	    },
	    //读取uni图库数据
	    getUniImgList: function getUniImgList(moduleIndex) {
	        this.state.checkedImgList = [];
	        this.searchOrderList();
	    },
	    // 读取订单信息
	    searchOrderList: function searchOrderList() {
	        var searchOrderData = this.searchOrderData;
	        var chooseImageFinish = this.chooseImageFinish;
	        var params = {};
	        var ajaxdata = [];
	        Action.getUniOrderList.call(this, params, function (data) {
	            $('body').css("overflow", "hidden");
	            var orderList = data.result.imgInfo.orders;
	            var imgList = data.result.imgInfo.images;
	            for (var i = 0; i < imgList.length; i++) {
	                imgList[i].checkedState = false;
	                imgList[i].mouseOverState = false;
	                imgList[i].source = "uni";
	            }
	            var data = {
	                "orderImgList": imgList,
	                "orderImgCount": data.result.imgInfo.count
	            };
	            ajaxdata[0] = data;
	            Modal.open({
	                title: React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'span',
	                        { className: 'uni_modalTitle' },
	                        'uni图库'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'uni_modalTip' },
	                        '全部来自uni图库的商品图，能直接打实拍标，并且图墙排序加权哦！'
	                    )
	                ),
	                body: React.createElement(
	                    'div',
	                    { className: 'uni-gallery' },
	                    React.createElement(
	                        'div',
	                        { className: 'uni-gallery-nav' },
	                        React.createElement(
	                            'div',
	                            { className: 'nav-title' },
	                            '图库订单'
	                        ),
	                        React.createElement(
	                            'ul',
	                            { className: 'nav-items', id: 'uniOrderNav' },
	                            orderList.length ? orderList.map(function (item, index) {
	                                return React.createElement(
	                                    'li',
	                                    { className: index == 0 ? "orderChecked" : "", onClick: searchOrderData.bind(this, index, item.orderId) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        item.redsName
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        item.created
	                                    )
	                                );
	                            }) : ''
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { id: 'uni-gallery-box' },
	                        React.createElement(UniImageWall, { chooseImageFinish: chooseImageFinish, self: this })
	                    )
	                ),
	                beforeClose: function beforeClose() {
	                    $('body').css("overflow", "auto");
	                }
	            });
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderIndex: 0
	            });
	            this.setState({
	                ajaxdataOrigin: ajaxdata
	            });
	        }, function (data) {
	            var code = data.status.code;
	            if (code == 19100001) {
	                this.setState({
	                    dialogInfo: {
	                        userDialog: false,
	                        notuserDialog: false,
	                        downDialog: true
	                    }
	                });
	            } else if (code == 19100002) {
	                this.setState({
	                    dialogInfo: {
	                        userDialog: false,
	                        notuserDialog: true,
	                        downDialog: false
	                    }
	                });
	            } else if (code == 19100003) {
	                this.setState({
	                    dialogInfo: {
	                        userDialog: true,
	                        notuserDialog: false,
	                        downDialog: false
	                    }
	                });
	            } else if (code == 4004) {
	                Modal.alert(data.result.message);
	            } else if (code == 19100010) {
	                Modal.alert('uni系统升级中，升级时间：2015.09.16 02:00-04:00');
	            }
	        });
	    },
	    // 读取订单下的图库数据
	    searchOrderData: function searchOrderData(index, id, event) {
	        this.setState({
	            orderIndex: index
	        });

	        $("#uniOrderNav").find("li").removeClass("orderChecked");
	        var obj = event.currentTarget;
	        obj.className = "orderChecked";
	        var ajaxdata = this.state.ajaxdataOrigin;
	        if (ajaxdata[index] != null) {
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderIndex: index
	            });
	            return;
	        }
	        var params = {
	            orderId: id
	        };
	        Action.getUniImgList.call(this, params, function (data) {
	            var imgCount = data.result.count;
	            var data = data.result.images;
	            for (var i = 0; i < data.length; i++) {
	                data[i].checkedState = false;
	                data[i].mouseOverState = false;
	                data[i].source = "uni";
	            }
	            ajaxdata[index] = {
	                "orderImgList": data,
	                "orderImgCount": imgCount
	            };
	            this.setState({
	                ajaxdataOrigin: ajaxdata
	            });
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderIndex: index
	            });
	        });
	    },

	    render: function render() {
	        var moduleIndex = this.props.moduleIndex;
	        var dialogInfo = this.state.dialogInfo;
	        return React.createElement(
	            'div',
	            { className: 'upload-image-wrap' },
	            React.createElement(
	                'div',
	                { className: 'upload-image' },
	                React.createElement(
	                    'a',
	                    { className: 'xd-btn primary' },
	                    '上传图片',
	                    React.createElement(UploadImage, { onFinish: this.uploadImageFinish.bind(this, moduleIndex), onFailed: this.uploadImageFailed })
	                ),
	                React.createElement(
	                    'a',
	                    { className: 'xd-btn primary xd-btn-uni', onClick: this.getUniImgList.bind(this, moduleIndex) },
	                    '上传uni图库图',
	                    React.createElement('i', null)
	                )
	            ),
	            React.createElement(
	                'p',
	                null,
	                Link.UPLOAD_IMAGE_DESC_TEXT
	            ),
	            dialogInfo.userDialog || dialogInfo.notuserDialog || dialogInfo.downDialog ? React.createElement('div', { className: 'dialog-mask' }) : '',
	            dialogInfo.notuserDialog ? React.createElement(
	                'div',
	                { className: 'dialog_notUser' },
	                React.createElement('div', { className: 'dialog_close', onClick: this.closeDialog }),
	                React.createElement('a', { className: 'dialog_link', href: 'http://www.mogujie.com/act/150813jiuzhi?source=50', target: '_blank', onClick: this.closeDialog })
	            ) : '',
	            dialogInfo.userDialog ? React.createElement(
	                'div',
	                { className: 'dialog_user' },
	                React.createElement('div', { className: 'dialog_close', onClick: this.closeDialog }),
	                React.createElement('div', { className: 'dialog_sure', onClick: this.closeDialog })
	            ) : '',
	            dialogInfo.downDialog ? React.createElement(
	                'div',
	                { className: 'dialog_download' },
	                React.createElement('div', { className: 'dialog_close', onClick: this.closeDialog }),
	                React.createElement('a', { className: 'dialog_link', href: 'http://www.mogujie.com/act/150813jiuzhi?source=50', target: '_blank', onClick: this.closeDialog })
	            ) : ''
	        );
	    }
	});

	var UniImageWall = React.createClass({
	    displayName: 'UniImageWall',

	    getInitialState: function getInitialState() {
	        var self = this.props.self;
	        return {
	            moveLeftCount: 0,
	            ajaxdata: []
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('orderData.update', this.orderDataUpdate);
	    },
	    orderDataUpdate: function orderDataUpdate(topic, data, index) {
	        this.setState(data);
	    },
	    setChecked: function setChecked(index, src, id, width, height) {
	        var self = this.props.self;
	        var orderIndex = this.state.orderIndex;
	        var ajaxdata = this.state.ajaxdata;
	        var curajaxdata = ajaxdata[orderIndex];
	        var checkedImgList = self.state.checkedImgList;
	        var uniImgChange = this.props.uniImgChange || false;
	        var unishowImgChangeIndex = self.state.uniImgChange;
	        if (uniImgChange) {
	            var count = checkedImgList.length;
	            for (var i = 0; i < ajaxdata.length; i++) {
	                if (ajaxdata[i] != null) {
	                    var imglistlength = ajaxdata[i].orderImgList.length;
	                    for (var j = 0; j < imglistlength; j++) {
	                        ajaxdata[i].orderImgList[j].checkedState = 0;
	                    }
	                };
	            }
	            for (var i = 0; i < ajaxdata[orderIndex].orderImgList.length; i++) {
	                if (i != index) ajaxdata[orderIndex].orderImgList[i].checkedState = 0;else ajaxdata[orderIndex].orderImgList[i].checkedState = 1;
	            }
	            checkedImgList = [];
	        } else {
	            ajaxdata[orderIndex].orderImgList[index].checkedState = !ajaxdata[orderIndex].orderImgList[index].checkedState;
	        }
	        this.setState({
	            ajaxdata: ajaxdata
	        });
	        if (ajaxdata[orderIndex].orderImgList[index].checkedState) {

	            checkedImgList.push(ajaxdata[orderIndex].orderImgList[index]);
	        } else {
	            var count = checkedImgList.length;
	            for (var i = 0; i < count; i++) {
	                if (checkedImgList[i]["id"] == id) {
	                    checkedImgList.splice(i, 1);
	                    break;
	                }
	            }
	            if (count == 9) {
	                this.setState({
	                    moveLeftCount: 0
	                });
	            }
	        }
	        self.setState({
	            checkedImgList: checkedImgList
	        });
	    },
	    moveLeft: function moveLeft() {
	        var self = this.props.self;
	        var currentCount = self.state.checkedImgList.length;
	        var moveLeftCount = this.state.moveLeftCount;
	        if (-currentCount < 8 && -moveLeftCount < currentCount - 8) {
	            this.setState({
	                moveLeftCount: moveLeftCount - 1
	            });
	        }
	    },
	    moveRight: function moveRight() {
	        var moveLeftCount = this.state.moveLeftCount;
	        if (moveLeftCount < 0) {
	            this.setState({
	                moveLeftCount: moveLeftCount + 1
	            });
	        }
	    },
	    mouseOver: function mouseOver(index) {
	        var self = this.props.self;
	        var orderIndex = this.state.orderIndex;
	        var ajaxdata = this.state.ajaxdata;
	        var curajaxdata = ajaxdata[orderIndex];
	        var count = ajaxdata[orderIndex].orderImgList.length;
	        for (var i = 0; i < count; i++) {
	            ajaxdata[orderIndex].orderImgList[i].mouseOverState = false;
	        }
	        ajaxdata[orderIndex].orderImgList[index].mouseOverState = !ajaxdata[orderIndex].orderImgList[index].mouseOverState;
	        this.setState({
	            ajaxdata: ajaxdata
	        });
	    },
	    mouseOut: function mouseOut(index) {
	        var self = this.props.self;
	        var orderIndex = this.state.orderIndex;
	        var ajaxdata = this.state.ajaxdata;
	        var curajaxdata = ajaxdata[orderIndex];
	        ajaxdata[orderIndex].orderImgList[index].mouseOverState = !ajaxdata[orderIndex].orderImgList[index].mouseOverState;
	        this.setState({
	            ajaxdata: ajaxdata
	        });
	    },
	    render: function render() {
	        var self = this.props.self;
	        var orderIndex = this.state.orderIndex;
	        var ajaxdata = this.state.ajaxdata;
	        var curajaxdata = ajaxdata[orderIndex];
	        if (curajaxdata) {
	            var data = curajaxdata["orderImgList"];
	            var imgCount = curajaxdata["orderImgCount"];
	        } else {
	            var data = [];
	            var imgCount = 0;
	        }
	        var setChecked = this.setChecked;
	        var moveLeft = this.moveLeft;
	        var moveRight = this.moveRight;
	        var mouseOver = this.mouseOver;
	        var mouseOut = this.mouseOut;
	        var chooseImageFinish = this.chooseImageFinish;
	        var moveLeftCount = this.state.moveLeftCount;
	        var checkedImgList = self.state.checkedImgList;
	        return React.createElement(
	            'div',
	            { className: 'uni-gallery-cont' },
	            React.createElement(
	                'div',
	                { className: 'cont-imgInfo' },
	                React.createElement(
	                    'div',
	                    { className: 'cont-capacity' },
	                    '共有',
	                    imgCount,
	                    '张精修片'
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'cont-imgWall' },
	                    data.length > 0 ? data.map(function (item, index) {
	                        var width = parseInt(item.wide),
	                            height = parseInt(item.length);
	                        if (width / 100 >= height / 150) {
	                            var curStyle = {
	                                width: "100px",
	                                height: "auto",
	                                "margin-top": (150 - height / (width / 100)) / 2 + "px"
	                            };
	                        } else {
	                            var curStyle = {
	                                width: "auto",
	                                height: "150px",
	                                "margin-left": (100 - width / (height / 150)) / 2 + "px"
	                            };
	                        }
	                        return React.createElement(
	                            'li',
	                            { onClick: setChecked.bind(this, index, item.wholePath, item.id, item.width, item.height), onMouseOver: mouseOver.bind(this, index) },
	                            React.createElement(
	                                'div',
	                                { className: 'imgArea' },
	                                React.createElement('img', { style: curStyle, 'data-checked': 'false', src: item.wholePath + '_220x330.jpg', 'data-id': item.id })
	                            ),
	                            item.checkedState ? React.createElement('i', { className: 'checked', 'data-checked': '1' }) : React.createElement('i', { className: 'unchecked' }),
	                            item.checkedState || item.mouseOverState ? React.createElement('div', { className: 'uniImg-mask', onMouseOut: mouseOut.bind(this, index) }) : '',
	                            React.createElement(
	                                'div',
	                                { className: 'title' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    item.title
	                                )
	                            )
	                        );
	                    }) : ''
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'cont-bottom' },
	                React.createElement(
	                    'div',
	                    { className: 'bottom-imgList' },
	                    checkedImgList.length > 0 ? React.createElement('div', { className: 'arrow-left', onClick: moveLeft }) : '',
	                    React.createElement(
	                        'div',
	                        { className: 'imgArea' },
	                        React.createElement(
	                            'ul',
	                            { className: 'checked-imgList', style: { width: checkedImgList.length * 66, marginLeft: moveLeftCount * 66 } },
	                            checkedImgList.length > 0 ? checkedImgList.map(function (item) {

	                                return React.createElement(
	                                    'li',
	                                    null,
	                                    React.createElement('img', { src: item.wholePath + '_100x100.jpg' })
	                                );
	                            }) : ''
	                        )
	                    ),
	                    checkedImgList.length > 0 ? React.createElement('div', { className: 'arrow-right', onClick: moveRight }) : ''
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'bottom-btn' },
	                    React.createElement(
	                        'div',
	                        { className: 'checked-count' },
	                        React.createElement(
	                            'span',
	                            { id: 'checkedCount' },
	                            '已选',
	                            checkedImgList.length,
	                            '张'
	                        )
	                    ),
	                    checkedImgList.length > 0 ? React.createElement(
	                        'a',
	                        { href: 'javascript:;', className: 'checked-btn disabled', onClick: this.props.chooseImageFinish },
	                        '确定'
	                    ) : React.createElement(
	                        'a',
	                        { href: 'javascript:;', className: 'checked-btn' },
	                        '确定'
	                    )
	                )
	            )
	        );
	    }
	});

	var DetailImageWrap = React.createClass({
	    displayName: 'DetailImageWrap',

	    handleDelete: function handleDelete(detailImage) {
	        // 删除用户自定义的模块
	        PubSub.publish('deleteCustomModule.delete', {
	            detailImage: detailImage
	        });
	    },
	    render: function render() {
	        var self = this.props.self;
	        var skuSetting = this.props.skuSetting;
	        var moduleIndex = this.props.moduleIndex;
	        var detailImage = this.props.detailImage;
	        var isSizeInfoNeedUploadImage = this.props.isSizeInfoNeedUploadImage;

	        // 如果是尺码说明
	        if (detailImage.slug == 'size_info') {
	            return React.createElement(
	                'div',
	                { className: 'detail-image-wrap' },
	                React.createElement(SizeDesc, { detailImage: detailImage, moduleIndex: moduleIndex, skuSetting: skuSetting, self: self }),
	                React.createElement(DetailImage, { detailImage: detailImage, moduleIndex: moduleIndex, self: self }),
	                isSizeInfoNeedUploadImage && React.createElement(UploadBtn, { moduleIndex: moduleIndex, self: self })
	            );
	        } else {
	            return React.createElement(
	                'div',
	                { className: 'detail-image-wrap' },
	                React.createElement(DetailImage, { detailImage: detailImage, moduleIndex: moduleIndex, self: self }),
	                React.createElement(UploadBtn, { moduleIndex: moduleIndex, self: self }),
	                detailImage.slug.indexOf('custom_module_') > -1 ? React.createElement(
	                    'div',
	                    { style: { textAlign: 'center' } },
	                    React.createElement(
	                        'button',
	                        { className: 'xd-btn',
	                            onClick: this.handleDelete.bind(this, detailImage) },
	                        '删除自定义模块'
	                    )
	                ) : null
	            );
	        }
	    }
	});

	module.exports = DetailImageWrap;

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	var GoodsClassify = React.createClass({
	    displayName: 'GoodsClassify',

	    statics: {
	        self: null,
	        getData: function getData() {
	            var data = [];
	            _.map(GoodsClassify.self.getDOMNode().querySelectorAll('.xd-checkbox'), function (elem, i) {
	                elem.checked && data.push(elem.value);
	            });
	            return data.length ? data.join(',') : '';
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            data: []
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        GoodsClassify.self = this;
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            data: props.data
	        });
	    },
	    // 选择分类
	    selectClassify: function selectClassify(i, event) {
	        var data = this.state.data;
	        data[i].checked = event.target.checked;
	        this.setState({
	            data: data
	        });
	    },
	    addClassify: function addClassify() {
	        this.refs.refreshClassify.getDOMNode().className = 'refresh-data-tip';
	    },
	    // 刷新分类
	    refreshClassify: function refreshClassify() {
	        $.get('/pc/itemmanager/item/classify', { itemId: window.XD.PHPBridge.getItem('itemId') || '' }, (function (data) {
	            if (data.status.code == 1001) {
	                this.setState({
	                    data: data.result.classify || []
	                });
	            } else {
	                Modal.alert(data.status.msg);
	            }
	        }).bind(this), 'json');
	        this.refs.refreshClassify.getDOMNode().className = 'refresh-data-tip hide';
	    },
	    render: function render() {
	        var classify = this.state.data || [];
	        var hasCategoryPri = this.props.hasCategoryPri;

	        // 如果有权限
	        if (hasCategoryPri) {
	            // 如果有分类数据
	            if (classify.length) {
	                return React.createElement(
	                    'div',
	                    { className: 'goods-classify' },
	                    classify.map((function (item, i) {
	                        return React.createElement(
	                            'label',
	                            null,
	                            React.createElement('input', { name: 'cat', className: 'xd-checkbox', type: 'checkbox', checked: item.checked, value: item.id, onClick: this.selectClassify.bind(this, i) }),
	                            React.createElement(
	                                'span',
	                                null,
	                                item.name
	                            )
	                        );
	                    }).bind(this)),
	                    React.createElement(
	                        'span',
	                        { className: 'add-classify' },
	                        React.createElement(
	                            'a',
	                            { href: '/pc/itemmanager/category', target: '_blank', onClick: this.addClassify },
	                            '新增分类'
	                        ),
	                        React.createElement(
	                            'a',
	                            { ref: 'refreshClassify', className: 'refresh-data-tip hide', href: 'javascript:;', onClick: this.refreshClassify },
	                            React.createElement('i', { className: 'arrow' }),
	                            '点击刷新店铺分类'
	                        )
	                    )
	                );
	            } else {
	                return React.createElement(
	                    'span',
	                    { className: 'add-classify' },
	                    React.createElement(
	                        'a',
	                        { href: '/pc/itemmanager/category', target: '_blank', onClick: this.addClassify },
	                        '新增分类'
	                    ),
	                    React.createElement(
	                        'a',
	                        { ref: 'refreshClassify', className: 'refresh-data-tip hide', href: 'javascript:;', onClick: this.refreshClassify },
	                        React.createElement('i', { className: 'arrow' }),
	                        '点击刷新店铺分类'
	                    )
	                );
	            }
	        } else {
	            return React.createElement(
	                'span',
	                null,
	                '没有权限设置分类'
	            );
	        }
	    }
	});

	module.exports = GoodsClassify;

/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var DetailImage = __webpack_require__(182);
	var CustomModule = __webpack_require__(180);
	var MoreBar = __webpack_require__(195);
	var Modal = __webpack_require__(21);

	var GoodsDetail = React.createClass({
	    displayName: 'GoodsDetail',

	    statics: {
	        self: null,
	        getData: function getData() {
	            var detailImages = GoodsDetail.self.state.detailImages;

	            // 收集数据
	            var _detailImages = {};
	            _.map(detailImages, function (detailImage, i) {

	                _detailImages[detailImage.slug] = [];
	                _detailImages[detailImage.slug].push(detailImage.desc);

	                _.map(detailImage.images, function (image, j) {
	                    // 插入的是相对路径，后面加有三个###
	                    _detailImages[detailImage.slug].push(XD.Util.filterOriPath(image.img) + '###');
	                    // 插入相对路径
	                    // _detailImages[detailImage.slug].push( XD.Util.filterOriPath(image.img) );
	                });
	            });
	            return JSON.stringify(_detailImages);
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            detailImages: [],
	            skuSetting: {},
	            needFillDetail: true
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        GoodsDetail.self = this;
	        PubSub.subscribe('addCustomModule.update', this.addCustomModuleUpdate);
	        PubSub.subscribe('deleteCustomModule.delete', this.deleteCustomModuleUpdate);
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            detailImages: props.detailImages,
	            skuSetting: props.skuSetting
	        });
	    },
	    // 删除自定义模块
	    deleteCustomModuleUpdate: function deleteCustomModuleUpdate(msg, data) {
	        var detailImages = this.state.detailImages;
	        var newDetailImages = detailImages.filter(function (ele) {
	            if (ele.slug !== data.detailImage.slug) {
	                return true;
	            }
	        });
	        this.setState({
	            detailImages: newDetailImages
	        });
	    },
	    // 添加自定义模块回调
	    addCustomModuleUpdate: function addCustomModuleUpdate(msg, data) {
	        var detailImages = this.state.detailImages;

	        var moduleNum = 0,
	            isRepeat = false;
	        detailImages.length && _.map(detailImages, function (item, i) {
	            if (item.title == data.moduleName) {
	                isRepeat = true;
	            }

	            if (item.slug.indexOf('custom_module') > -1) {
	                moduleNum++;
	            }
	        });

	        if (isRepeat) {
	            Modal.alert('请不要重复添加模块');
	            return;
	        }

	        if (moduleNum >= data.maxModuleNum) {
	            Modal.alert('最多只能添加' + data.maxModuleNum + '个自定义模块');
	            return;
	        }

	        detailImages.push({
	            "slug": "custom_module_" + moduleNum + "_" + data.moduleName,
	            "desc": "",
	            "title": data.moduleName,
	            "images": []
	        });

	        this.setState({
	            detailImages: detailImages
	        });
	    },
	    render: function render() {
	        var detailImages = this.state.detailImages;
	        var skuSetting = this.state.skuSetting;
	        var needFillDetail = this.state.needFillDetail;

	        // 尺码说明是否需要上传图片
	        var isSizeInfoNeedUploadImage = this.props.isSizeInfoNeedUploadImage;

	        var cx = React.addons.classSet;
	        return React.createElement(
	            'div',
	            { className: 'goods-detail' },
	            React.createElement(
	                'div',
	                { className: 'xd-panel' },
	                React.createElement(
	                    'div',
	                    { className: 'xd-panel-header' },
	                    React.createElement(
	                        'h2',
	                        { className: 'xd-title' },
	                        '请详细地说明您的商品'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'detail-body xd-panel-body' },
	                    detailImages.length ? detailImages.map((function (item, i) {
	                        var panelClass = cx({
	                            'xd-panel': true,
	                            'hide': i != 0 && !needFillDetail
	                        });
	                        return React.createElement(
	                            'div',
	                            { className: panelClass },
	                            React.createElement(
	                                'div',
	                                { className: 'xd-panel-body' },
	                                React.createElement(DetailImage, { detailImage: item, skuSetting: skuSetting, moduleIndex: i, self: this, isSizeInfoNeedUploadImage: isSizeInfoNeedUploadImage })
	                            )
	                        );
	                    }).bind(this)) : null,
	                    React.createElement(CustomModule, { needFillDetail: needFillDetail }),
	                    React.createElement(MoreBar, { needFillDetail: needFillDetail })
	                )
	            )
	        );
	    }
	});

	module.exports = GoodsDetail;
	/*<div className="xd-panel-header">
	   <h2 className="xd-title">{item.title || ''}</h2>
	</div>*/

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);

	// 属性下拉框
	var PropSelect = React.createClass({
	    displayName: 'PropSelect',

	    // 选择下拉框
	    selectProp: function selectProp(key) {
	        // @zikong 此处有坑，ie下无法获取到 text 值，除非为每个option设置value，这里先用jQuery替代
	        // var value = this.refs.selectProp.getDOMNode().value;
	        var value = $(this.refs.selectProp.getDOMNode()).val();
	        var propertiesData = this.props.propertiesData;
	        propertiesData[key] = [];
	        propertiesData[key].push(value);
	        // 打印
	        // console.log(key,value);

	        GoodsProp.self.setState({
	            propertiesData: propertiesData
	        });
	    },
	    // 添加选项
	    addOption: function addOption(key) {
	        var optionName = this.refs.optionName.getDOMNode().value;
	        optionName = XD.Util.trim(optionName);

	        // 如果选项名称为空
	        if (optionName == '') {
	            return;
	        }

	        var defaultData = this.props.defaultData || {};
	        var propertiesData = this.props.propertiesData || {};

	        var _props = propertiesData[key] || [];
	        var _defaults = defaultData[key] || {};
	        var _defaultProps = _defaults.values || [];

	        // 查找是否已经存在
	        if (_.indexOf(_props, optionName) > -1 || _.indexOf(_defaultProps, optionName) > -1) {
	            Modal.alert('请不要重复添加');
	            return;
	        }

	        // 如果有属性
	        if (propertiesData[key]) {
	            propertiesData[key].push(optionName);
	        } else {
	            propertiesData[key] = [];
	            propertiesData[key].push(optionName);
	        }

	        // 如果有默认属性
	        if (defaultData[key]) {
	            defaultData[key].values && defaultData[key].values.push(optionName);
	        } else {
	            defaultData[key]['isMultiple'] = 0;
	            defaultData[key]['values'] = [];
	            defaultData[key].values.push(optionName);
	        }

	        GoodsProp.self.setState({
	            propertiesData: propertiesData
	        });

	        this.refs.optionName.getDOMNode().value = '';
	    },
	    render: function render() {
	        var name = this.props.name;
	        var item = this.props.item || {};
	        var list = item.values || [];
	        var propertiesData = this.props.propertiesData || {};
	        return React.createElement(
	            'div',
	            { className: 'prop-select' },
	            React.createElement(
	                'select',
	                { ref: 'selectProp', className: 'xd-select', onChange: this.selectProp.bind(this, name) },
	                React.createElement(
	                    'option',
	                    { value: '' },
	                    '选择'
	                ),
	                list.length ? list.map(function (_item, i) {
	                    return propertiesData[name] && propertiesData[name] == _item ? React.createElement(
	                        'option',
	                        { selected: true },
	                        _item || ''
	                    ) : React.createElement(
	                        'option',
	                        null,
	                        _item || ''
	                    );
	                }) : null
	            ),
	            item.isCustomizable ? React.createElement('input', { ref: 'optionName', type: 'text', className: 'add-text ml20 xd-input primary' }) : '',
	            item.isCustomizable ? React.createElement(
	                'a',
	                { href: 'javascript:;', className: 'add-btn', onClick: this.addOption.bind(this, name) },
	                '添加',
	                name
	            ) : ''
	        );
	    }
	});

	// 属性标签
	var PropTag = React.createClass({
	    displayName: 'PropTag',

	    // 添加标签
	    addTag: function addTag(key) {
	        var tagName = this.refs.tagName.getDOMNode().value;
	        tagName = XD.Util.trim(tagName);

	        // 如果标签名称为空
	        if (tagName == '') {
	            return;
	        }

	        var defaultData = this.props.defaultData || {};
	        var propertiesData = this.props.propertiesData || {};

	        var _props = propertiesData[key] || [];
	        var _defaults = defaultData[key] || {};
	        var _defaultProps = _defaults.values || [];

	        // 查找是否已经存在
	        if (_.indexOf(_props, tagName) > -1 || _.indexOf(_defaultProps, tagName) > -1) {
	            Modal.alert('请不要重复添加');
	            return;
	        }

	        propertiesData[key] = propertiesData[key] || [];
	        // 判断选择的标签数量是否达到上限
	        if (this.state.maxInput != undefined && propertiesData[key].length >= this.state.maxInput) {
	            Modal.tip('选择已经达到上限');
	            return;
	        }

	        // 如果有属性
	        if (propertiesData[key]) {
	            propertiesData[key].push(tagName);
	        } else {
	            propertiesData[key] = [];
	            propertiesData[key].push(tagName);
	        }

	        // 如果有默认属性
	        if (defaultData[key]) {
	            defaultData[key].values && defaultData[key].values.push(tagName);
	        } else {
	            defaultData[key]['isMultiple'] = 1;
	            defaultData[key]['values'] = [];
	            defaultData[key].values.push(tagName);
	        }

	        GoodsProp.self.setState({
	            propertiesData: propertiesData
	        });

	        this.refs.tagName.getDOMNode().value = '';
	    },
	    getInitialState: function getInitialState() {
	        var maxInput = this.props.defaultData[this.props.name].maxInput;
	        if (maxInput < 1) {
	            maxInput = undefined;
	        }
	        return {
	            maxInput: maxInput
	        };
	    },
	    // 选择标签
	    selectTag: function selectTag(key, value, checked) {
	        var propertiesData = this.props.propertiesData || {};
	        // 如果选中，则取消
	        if (checked) {
	            var index = -1;
	            _.map(propertiesData[key], function (prop, i) {
	                if (prop == value) {
	                    index = i;
	                }
	            });
	            index > -1 && propertiesData[key].splice(index, 1);
	        } else {
	            propertiesData[key] = propertiesData[key] || [];
	            // 判断选择的标签数量是否达到上限
	            if (this.state.maxInput != undefined && propertiesData[key].length >= this.state.maxInput) {
	                Modal.tip('选择已经达到上限');
	                return;
	            }
	            //
	            propertiesData[key].push(value);
	        }

	        GoodsProp.self.setState({
	            propertiesData: propertiesData
	        });
	    },
	    render: function render() {
	        var name = this.props.name;
	        var item = this.props.item || {};
	        var list = item.values || [];
	        var propertiesData = this.props.propertiesData;

	        // 遍历默认数据和用户选择数据，设置选中效果
	        var tags = [];
	        list.length && list.map((function (item, i) {
	            var className = 'xd-tag',
	                checked = false;
	            propertiesData[name] && propertiesData[name].length && propertiesData[name].map(function (prop, j) {
	                if (prop == item) {
	                    checked = true;
	                    className = 'xd-tag c';
	                }
	            });
	            tags.push(React.createElement(
	                'a',
	                { href: 'javascript:;', className: className, onClick: this.selectTag.bind(this, name, item, checked) },
	                item || ''
	            ));
	        }).bind(this));

	        propertiesData[name] = propertiesData[name] || [];
	        var limitNum = this.props.defaultData[name].maxInput - propertiesData[name].length;

	        return React.createElement(
	            'div',
	            { className: 'prop-tag' },
	            tags,
	            item.isCustomizable ? React.createElement('input', { ref: 'tagName', type: 'text', className: 'add-text xd-input primary' }) : '',
	            item.isCustomizable ? React.createElement(
	                'a',
	                { href: 'javascript:;', className: 'add-btn', onClick: this.addTag.bind(this, name) },
	                '添加',
	                name
	            ) : '',
	            this.state.maxInput != undefined && this.state.maxInput < tags.length ? React.createElement(
	                'span',
	                null,
	                ' 还可以选择',
	                React.createElement(
	                    'span',
	                    { style: { color: '#ff5555' } },
	                    limitNum
	                ),
	                '个'
	            ) : null
	        );
	    }
	});

	// 添加属性
	var AddProp = React.createClass({
	    displayName: 'AddProp',

	    addProp: function addProp() {
	        var propName = this.refs.propName.getDOMNode().value;
	        propName = XD.Util.trim(propName);

	        // 如果属性名称为空
	        if (propName == '') {
	            return;
	        }

	        var defaultData = this.props.defaultData || {};

	        var isRepeat = false;
	        // 查找是否有重复的属性
	        _.each(defaultData, function (item, key) {
	            if (key == propName) {
	                isRepeat = true;
	            }
	        });

	        if (isRepeat) {
	            Modal.alert('请不要重复添加属性');
	            return;
	        }

	        defaultData[propName] = {
	            isMultiple: 1,
	            isCustomizable: 1,
	            name: propName,
	            values: []
	        };

	        GoodsProp.self.setState({
	            defaultData: defaultData
	        });

	        this.refs.propName.getDOMNode().value = '';
	    },
	    render: function render() {
	        // 去除自定义上商品属性
	        return null;
	        return React.createElement(
	            'div',
	            { className: 'add-prop' },
	            React.createElement('input', { ref: 'propName', type: 'text', className: 'add-text xd-input primary' }),
	            React.createElement(
	                'a',
	                { href: 'javascript:;', className: 'add-btn', onClick: this.addProp },
	                '添加商品属性'
	            )
	        );
	    }
	});

	var PropRow = React.createClass({
	    displayName: 'PropRow',

	    render: function render() {
	        var name = this.props.name;
	        var item = this.props.item;
	        var defaultData = this.props.defaultData || {};
	        var propertiesData = this.props.propertiesData || {};

	        return React.createElement(
	            'div',
	            { className: 'prop clearfix' },
	            React.createElement(
	                'label',
	                { className: 'fl' },
	                name + ' ',
	                React.createElement(
	                    'span',
	                    { className: 'high' },
	                    defaultData[name].isRequired ? '*' : ''
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'prop-content fl' },
	                !item.isMultiple ? React.createElement(PropSelect, { name: name, item: item, defaultData: defaultData, propertiesData: propertiesData }) : React.createElement(PropTag, { name: name, item: item, defaultData: defaultData, propertiesData: propertiesData })
	            )
	        );
	    }
	});

	var GoodsProp = React.createClass({
	    displayName: 'GoodsProp',

	    statics: {
	        self: null,
	        getData: function getData() {
	            // 数据结构变为[{id: ,name: , value: }]
	            var propertiesData = GoodsProp.self.state.propertiesData || {};
	            var defaultData = GoodsProp.self.state.defaultData || {};
	            var _propertiesData = [];

	            _.each(propertiesData, function (list, key, i) {
	                var obj = {};
	                obj.id = defaultData[key].id;
	                obj.name = key;
	                obj.values = list.join(',');
	                // 改为数组形式
	                // obj.values = list.length ? list : '' ;
	                _propertiesData.push(JSON.stringify(obj));
	            });
	            return _propertiesData;
	        },
	        getDataObj: function getDataObj() {
	            // 原来的{ 'shuxing': '111','ssss':'bbbb'}
	            // 先保留着用来做数据校验
	            var propertiesData = GoodsProp.self.state.propertiesData || {};
	            var _propertiesData = {};

	            _.each(propertiesData, function (list, key, i) {
	                _propertiesData[key] = list.join(',');
	            });
	            return JSON.stringify(_propertiesData);
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            defaultData: {},
	            propertiesData: {}
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        GoodsProp.self = this;
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            defaultData: props.data.defaultData,
	            propertiesData: props.data.propertiesData
	        });
	    },
	    render: function render() {
	        var rows = [];
	        var defaultData = this.state.defaultData || {};
	        var propertiesData = this.state.propertiesData || {};

	        _.each(defaultData, function (item, i, list) {
	            rows.push(React.createElement(PropRow, { item: item, name: item.name, defaultData: defaultData, propertiesData: propertiesData }));
	        });

	        return React.createElement(
	            'div',
	            { className: 'goods-prop' },
	            React.createElement(
	                'p',
	                { className: 'mb10' },
	                '商品属性纳入搜索范围'
	            ),
	            React.createElement(
	                'div',
	                { className: 'props' },
	                rows,
	                React.createElement(AddProp, { defaultData: defaultData })
	            )
	        );
	    }
	});

	module.exports = GoodsProp;

/***/ },

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);

	var UsedTags = React.createClass({
	    displayName: 'UsedTags',

	    statics: {
	        self: null
	    },
	    getInitialState: function getInitialState() {
	        return {
	            data: []
	        };
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            data: props.data
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        UsedTags.self = this;
	        PubSub.subscribe('addHotTag.update', this.addHotTagUpdate);
	    },
	    // 添加标签
	    addTag: function addTag() {
	        var tagName = this.refs.tagName.getDOMNode().value;
	        if (!tagName.length || tagName == '') {
	            alert('请输入标签名称');
	            return;
	        }

	        var data = this.state.data;

	        if (data.length >= 7) {
	            Modal.alert('标签最多添加7个');
	            return;
	        }

	        // 查找是否已经存在
	        if (_.indexOf(data, tagName) > -1) {
	            Modal.alert('请不要重复添加');
	            return;
	        }

	        data.push(tagName);
	        this.setState({ data: data });
	        this.refs.tagName.getDOMNode().value = '';
	    },
	    // 删除标签
	    delTag: function delTag(index) {
	        var data = this.state.data;
	        data.splice(index, 1);
	        this.setState({
	            data: data
	        });
	    },
	    // 添加热门标签
	    addHotTagUpdate: function addHotTagUpdate(msg, data) {
	        var _data = this.state.data;
	        _data.push(data.tagName);
	        this.setState({ data: _data });
	    },
	    render: function render() {
	        var usedTags = this.state.data || [];
	        return React.createElement(
	            'ul',
	            null,
	            usedTags.length ? usedTags.map((function (item, i) {
	                return React.createElement(
	                    'li',
	                    null,
	                    item,
	                    React.createElement(
	                        'a',
	                        { href: 'javascript:;', className: 'close-btn', onClick: this.delTag.bind(this, i) },
	                        'x'
	                    )
	                );
	            }).bind(this)) : '',
	            React.createElement(
	                'li',
	                { className: 'action' },
	                React.createElement('input', { ref: 'tagName', className: 'goods-tag-name xd-input primary', placeholder: '请输入标签名称' }),
	                React.createElement(
	                    'a',
	                    { className: 'add-btn', onClick: this.addTag },
	                    '添加'
	                )
	            )
	        );
	    }
	});

	var HotTags = React.createClass({
	    displayName: 'HotTags',

	    getInitialState: function getInitialState() {
	        return {
	            data: []
	        };
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            data: props.data
	        });
	    },
	    addTag: function addTag(event) {
	        var tagName = event.target.textContent || event.target.innerHTML;
	        var usedTags = UsedTags.self.state.data || [];

	        if (usedTags.length >= 7) {
	            Modal.alert('标签最多添加7个');
	            return;
	        }
	        // 查找是否已经存在
	        if (_.indexOf(usedTags, tagName) > -1) {
	            Modal.alert('请不要重复添加标签');
	            return;
	        }

	        PubSub.publish('addHotTag.update', {
	            tagName: tagName
	        });
	    },
	    render: function render() {
	        var hotTags = this.state.data;
	        return React.createElement(
	            'ul',
	            null,
	            hotTags.length ? hotTags.map((function (item, i) {
	                return React.createElement(
	                    'li',
	                    { onClick: this.addTag },
	                    item
	                );
	            }).bind(this)) : ''
	        );
	    }
	});

	var GoodsTags = React.createClass({
	    displayName: 'GoodsTags',

	    statics: {
	        getData: function getData() {
	            var data = UsedTags.self.state.data;
	            return data;
	        }
	    },
	    render: function render() {
	        var tags = this.props.data || {};
	        var usedTags = tags.usedTags || [];
	        var hotTags = tags.hotTags || [];

	        var cx = React.addons.classSet;
	        var classes = cx({
	            'hot-tags clearfix': true,
	            'hot-tags clearfix hide': !hotTags.length
	        });

	        return React.createElement(
	            'div',
	            { className: 'goods-tags' },
	            React.createElement(
	                'div',
	                { className: 'add-tag' },
	                React.createElement(UsedTags, { data: usedTags })
	            ),
	            React.createElement(
	                'p',
	                { className: 'desc' },
	                '标签纳入搜索, 正确标签越多曝光量越高, 建议商品标签不少于3个, 不多于7个'
	            ),
	            React.createElement(
	                'div',
	                { className: classes },
	                React.createElement(
	                    'span',
	                    { className: 'title fl' },
	                    '热门标签'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'list fl' },
	                    React.createElement(HotTags, { data: hotTags })
	                )
	            )
	        );
	    }
	});

	module.exports = GoodsTags;

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Modal = __webpack_require__(21);

	var CutRatio = React.createClass({
	    displayName: 'CutRatio',

	    getInitialState: function getInitialState() {
	        return {
	            aspectRatio: 2 / 3,
	            crop: null,
	            isShowPanel: true
	        };
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            crop: props.crop,
	            isShowPanel: props.isShowPanel
	        });

	        if (props.crop) {
	            props.crop.setAspectRatio(this.state.aspectRatio);
	        }
	    },

	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('rotateMode.update', this.rotateModeUpdate);
	    },

	    // 更改裁剪比例
	    changeCutImageRatio: function changeCutImageRatio(aspectRatio, event) {
	        if (!this.state.isShowPanel) {
	            this.togglePanel();
	        }

	        if (this.state.crop && aspectRatio) {
	            this.state.crop.setAspectRatio(aspectRatio);
	            this.setState({ aspectRatio: aspectRatio });
	        }
	    },

	    // 切换面板
	    togglePanel: function togglePanel() {
	        var self = this;
	        var $container = $('#' + self.props.containerId);
	        var $rotateImage = $container.find('.rotate-image');
	        var submitData = {};
	        submitData['rotate'] = $rotateImage.attr('angle');
	        submitData['flop'] = $rotateImage.attr('flop');
	        submitData['flip'] = $rotateImage.attr('flip');

	        // 如果有旋转，则需要保存
	        if (submitData.rotate || submitData.flop || submitData.flip) {
	            Modal.confirm('确定要保存当前旋转的修改，并切换到裁剪操作吗？', function () {
	                Modal.close();
	                self.props.toggleSaveCallback(true);

	                // 重置旋转
	                $rotateImage.removeAttr('style angle flop flip');
	                PubSub.publish('resetRotate.update');
	            });
	            return;
	        }
	        self.props.toggleCutPanelCallback();
	    },

	    render: function render() {
	        var aspectRatio = this.state.aspectRatio;
	        var isShowPanel = this.state.isShowPanel;
	        var cx = React.addons.classSet;
	        var panelClass = cx({
	            'xd-panel-body clearfix': true,
	            'hide': false //!this.state.isShowPanel
	        });

	        var ratioClass1 = cx({
	            'ratio-change fl': true,
	            'c': aspectRatio == 1 && isShowPanel
	        });

	        var ratioClass2 = cx({
	            'ratio-change fl': true,
	            'c': aspectRatio == 2 / 3 && isShowPanel
	        });

	        var ratioClass3 = cx({
	            'ratio-change fl': true,
	            'c': aspectRatio == 4 / 3 && isShowPanel
	        });

	        return React.createElement(
	            'div',
	            { className: 'xd-panel cut-panel' },
	            React.createElement(
	                'div',
	                { className: 'xd-panel-header' },
	                React.createElement(
	                    'h2',
	                    { className: 'xd-title' },
	                    React.createElement('i', null),
	                    '裁剪'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: panelClass },
	                React.createElement(
	                    'a',
	                    { href: 'javascript:;', className: ratioClass1, onClick: this.changeCutImageRatio.bind(this, 1 / 1) },
	                    React.createElement('i', { className: 'r1' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '1:1'
	                    )
	                ),
	                React.createElement(
	                    'a',
	                    { href: 'javascript:;', className: ratioClass2, onClick: this.changeCutImageRatio.bind(this, 2 / 3) },
	                    React.createElement('i', { className: 'r2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '2:3'
	                    )
	                ),
	                React.createElement(
	                    'a',
	                    { href: 'javascript:;', className: ratioClass3, onClick: this.changeCutImageRatio.bind(this, 4 / 3) },
	                    React.createElement('i', { className: 'r3' }),
	                    React.createElement(
	                        'span',
	                        { className: 's3' },
	                        '4:3'
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = CutRatio;

/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * 罪过，如果你看到了jquery，请不要惊讶，那是我没忍住犯下的错。
	 */

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);
	var CutRatio = __webpack_require__(187);
	var RotateMode = __webpack_require__(189);
	var Validator = __webpack_require__(174);

	var crop = null;

	var ImageCut = React.createClass({
	    displayName: 'ImageCut',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            containerWidth: 588,
	            containerHeight: 398
	        };
	    },
	    getInitialState: function getInitialState() {
	        var containerId = this.props.containerId || 'image-cut' + +new Date();
	        return {
	            containerId: containerId,
	            isShowImageCut: false,
	            isShowCutArea: true,
	            isShowRotateArea: false,
	            src: '',
	            i: 0
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('editImage.update', this.editImageUpdate);
	        PubSub.subscribe('delImage.update', this.delImageUpdate);
	    },
	    // 编辑图片回调
	    editImageUpdate: function editImageUpdate(msg, data) {
	        this.resetEditImage();

	        // 初始化图片裁剪
	        this.initImageCut(data.src);

	        // 初始化图片旋转
	        this.initRotateImage(data.src);

	        this.setState({
	            src: data.src,
	            i: data.i,
	            isShowImageCut: true,
	            isShowCutArea: true,
	            isShowRotateArea: false
	        });
	    },
	    // 删除图片回调
	    delImageUpdate: function delImageUpdate() {
	        this.resetEditImage();
	        this.setState({
	            isShowImageCut: false
	        });
	    },
	    // 初始化图片裁剪
	    initImageCut: function initImageCut(src) {
	        var container = this.refs[this.state.containerId].getDOMNode();
	        var cropImage = this.refs.cropImage.getDOMNode();
	        cropImage.setAttribute('data-src', src);

	        // 初始化裁剪
	        crop = $(cropImage).crop({
	            containerWidth: this.props.containerWidth,
	            containerHeight: this.props.containerHeight
	        });
	    },
	    // 初始化图片旋转
	    initRotateImage: function initRotateImage(src) {
	        var self = this;
	        var rotateImage = this.refs.rotateImage.getDOMNode();
	        var $rotateImage = $(rotateImage);

	        var img = new Image();
	        img.onload = function () {
	            var imgData = XD.Util.getZoomImage(this.width, this.height, self.props.containerWidth, self.props.containerHeight);
	            $rotateImage.attr({
	                width: imgData.zoomWidth,
	                height: imgData.zoomHeight,
	                'data-width': imgData.zoomWidth,
	                'data-height': imgData.zoomHeight
	            });
	        };
	        img.src = src;

	        rotateImage.src = src;
	    },
	    // 重置编辑图片
	    resetEditImage: function resetEditImage() {
	        var rotateImage = this.refs.rotateImage.getDOMNode();
	        $(rotateImage).removeAttr('style angle flop flip data-width data-height');

	        crop && crop.remove();

	        PubSub.publish('resetRotate.update');
	    },
	    toggleCutPanelCallback: function toggleCutPanelCallback(isShowPanel) {
	        this.setState({
	            isShowCutArea: true,
	            isShowRotateArea: false
	        });
	    },
	    toggleSaveCallback: function toggleSaveCallback() {
	        this.save();
	    },
	    toggleRotatePanelCallback: function toggleRotatePanelCallback() {
	        this.setState({
	            isShowCutArea: false,
	            isShowRotateArea: true
	        });
	    },
	    save: function save() {

	        // 如果是裁图
	        if (this.state.isShowCutArea) {
	            this.saveImageCut();
	        }

	        // 如果是旋转
	        if (this.state.isShowRotateArea) {
	            this.saveImageRotate();
	        }
	    },
	    // 保存图片裁剪
	    saveImageCut: function saveImageCut() {
	        var $cropImage = crop.$elem;
	        var submitData = {};

	        submitData['url'] = this.state.src;

	        // 坐标位置和大小
	        submitData['pos'] = $cropImage.attr('data-pos');

	        // 图片比例
	        submitData['ratio'] = $cropImage.attr('data-ratio');

	        if (!submitData.pos) {
	            Modal.alert('无任何操作');
	            return;
	        }

	        var pos = submitData.pos.split(',');
	        submitData['x'] = pos[0] || 0;
	        submitData['y'] = pos[1] || 0;
	        submitData['w'] = pos[2] || 0;
	        submitData['h'] = pos[3] || 0;

	        var width = Math.ceil(submitData.w * submitData.ratio);
	        var height = Math.ceil(submitData.h * submitData.ratio);

	        // 验证图片大小
	        var code = Validator.checkImageSize(width, height);
	        if (code != 10001) {
	            Modal.alert(Validator.imageError[code]);
	            return;
	        }

	        $.post('/pc/itemmanager/item/cutimg', submitData, (function (data) {
	            if (data.status.code == 1001) {
	                PubSub.publish('saveImageCut.update', {
	                    src: data.result.url || '',
	                    i: this.state.i
	                });
	            } else {
	                Modal.alert(data.result || data.status.msg);
	            }
	        }).bind(this), 'json');
	    },
	    // 保存图片旋转
	    saveImageRotate: function saveImageRotate() {
	        var rotateImage = this.refs.rotateImage.getDOMNode();
	        var $rotateImage = $(rotateImage);
	        var submitData = {};

	        submitData['url'] = this.state.src || '';
	        submitData['rotate'] = $rotateImage.attr('angle') || 0;
	        submitData['flop'] = $rotateImage.attr('flop') || 0;
	        submitData['flip'] = $rotateImage.attr('flip') || 0;

	        // 获取原图大小
	        var imageSize = XD.Util.getSizeByPath(submitData.url),
	            width = imageSize[0],
	            height = imageSize[1];

	        var rotateImageWidth = 0;
	        var rotateImageHeight = 0;

	        // 如果旋转的是奇数，则图片宽度等于图片高度，图片高度等于图片宽度
	        if (submitData.rotate / 90 % 2 != 0) {
	            rotateImageWidth = height;
	            rotateImageHeight = width;
	        } else {
	            rotateImageWidth = width;
	            rotateImageHeight = height;
	        }

	        // 验证图片大小
	        var code = Validator.checkImageSize(rotateImageWidth, rotateImageHeight);
	        if (code != 10001) {
	            Modal.alert(Validator.imageError[code]);
	            return;
	        }

	        // 如果有旋转，则需要保存
	        if (submitData.rotate || submitData.flop || submitData.flip) {
	            $.post('/pc/itemmanager/item/rotateimg', submitData, (function (data, textStatus, xhr) {
	                if (data.status.code == 1001) {
	                    PubSub.publish('saveImageRotate.update', {
	                        src: data.result.url || '',
	                        i: this.state.i
	                    });
	                } else {
	                    Modal.alert(data.result || data.status.msg);
	                }
	            }).bind(this), 'json');
	        } else {
	            Modal.alert('无任何操作');
	        }
	    },
	    cannel: function cannel() {
	        this.setState({
	            isShowImageCut: false
	        });
	    },
	    render: function render() {
	        var cx = React.addons.classSet;
	        var imageCutClass = cx({
	            'image-cut': true,
	            'hide': !this.state.isShowImageCut
	        });

	        var cutAreaClass = cx({
	            'cut-area fl': true,
	            'hide': !this.state.isShowCutArea
	        });

	        var rotateAreaClass = cx({
	            'rotate-area fl': true,
	            'vh': !this.state.isShowRotateArea
	        });

	        var containerId = this.state.containerId;

	        return React.createElement(
	            'div',
	            { id: containerId, ref: containerId, className: imageCutClass },
	            React.createElement(
	                'div',
	                { className: 'image-cut-box clearfix' },
	                React.createElement(
	                    'div',
	                    { className: 'func-area fl' },
	                    React.createElement(CutRatio, { crop: crop, isShowPanel: this.state.isShowCutArea, containerId: containerId, toggleCutPanelCallback: this.toggleCutPanelCallback, toggleSaveCallback: this.toggleSaveCallback }),
	                    React.createElement(RotateMode, { crop: crop, isShowPanel: this.state.isShowRotateArea, containerId: containerId, toggleRotatePanelCallback: this.toggleRotatePanelCallback, toggleSaveCallback: this.toggleSaveCallback })
	                ),
	                React.createElement(
	                    'div',
	                    { className: cutAreaClass },
	                    React.createElement(
	                        'button',
	                        { className: 'middle' },
	                        React.createElement('img', { ref: 'cropImage', className: 'crop-image' })
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: rotateAreaClass },
	                    React.createElement(
	                        'button',
	                        { className: 'middle' },
	                        React.createElement('img', { ref: 'rotateImage', className: 'rotate-image' })
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'operate' },
	                React.createElement(
	                    'a',
	                    { className: 'xd-btn primary', onClick: this.save },
	                    '保存'
	                ),
	                React.createElement(
	                    'a',
	                    { className: 'save-btn xd-btn default', onClick: this.cannel },
	                    '取消'
	                )
	            )
	        );
	    }
	});

	module.exports = ImageCut;

/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Modal = __webpack_require__(21);

	var RotateMode = React.createClass({
	    displayName: 'RotateMode',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            containerWidth: 588,
	            containerHeight: 398
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {

	            // 2d旋转度数
	            angle: 0,

	            // 水平翻转度数
	            flip: 0,

	            // 垂直翻转度数
	            flop: 0,

	            isShowPanel: true,

	            crop: null
	        };
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            crop: props.crop,
	            isShowPanel: props.isShowPanel
	        });
	    },

	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('resetRotate.update', this.resetRotateUpdate);
	        // PubSub.subscribe('editImage.update', this.editImageUpdate);
	    },

	    editImageUpdate: function editImageUpdate(msg, data) {
	        this.resetRotate();
	    },

	    resetRotateUpdate: function resetRotateUpdate(msg, data) {
	        this.resetRotate();
	    },

	    resetRotate: function resetRotate() {
	        this.setState({
	            // 2d旋转度数
	            angle: 0,

	            // 水平翻转度数
	            flip: 0,

	            // 垂直翻转度数
	            flop: 0
	        });
	    },

	    //更改旋转方式
	    changeRotateMode: function changeRotateMode(i, event) {
	        var $container = $('#' + this.props.containerId);
	        var $rotateImage = $container.find('.rotate-image');

	        if (!this.state.isShowPanel) {
	            this.togglePanel();
	        }

	        var angle = this.state.angle;
	        var flip = this.state.flip;
	        var flop = this.state.flop;

	        switch (i) {
	            case 1:
	                angle -= 90;break;
	            case 2:
	                angle += 90;break;
	            case 3:
	                flip += 180;break;
	            case 4:
	                flop += 180;break;
	        }

	        this.reviseRotateImageSize($rotateImage, angle);
	        this.rotateAnimate($rotateImage, angle, flip, flop);
	    },

	    // 修正旋转图片的大小
	    reviseRotateImageSize: function reviseRotateImageSize($elem, angle) {
	        var containerWidth = this.props.containerWidth;
	        var containerHeight = this.props.containerHeight;
	        var width = +$elem.attr('data-width');
	        var height = +$elem.attr('data-height');
	        var rotateImageWidth = 0;
	        var rotateImageHeight = 0;

	        // 如果旋转的是奇数，则图片宽度等于图片高度，图片高度等于图片宽度
	        if (angle / 90 % 2 != 0) {
	            rotateImageWidth = height;
	            rotateImageHeight = width;
	            // 如果旋转后，图片宽度大于容器宽度 || 图片高度大于容器高度
	            if (rotateImageWidth > containerWidth || rotateImageHeight > containerHeight) {
	                var imgData = XD.Util.getZoomImage(rotateImageWidth, rotateImageHeight, containerWidth, containerHeight);
	                $elem.attr({ width: imgData.zoomHeight, height: imgData.zoomWidth, ratio: imgData.ratio });
	            }
	        } else {
	            $elem.attr({ width: width, height: height });
	        }
	    },

	    // 旋转动画
	    rotateAnimate: function rotateAnimate($elem, angle, flip, flop, type) {
	        var dummy = document.createElement('div'),
	            eventNameHash = { webkit: 'webkitTransitionEnd', Moz: 'transitionend', O: 'oTransitionEnd', ms: 'MSTransitionEnd' },
	            transitionEnd = (function _getTransitionEndEventName() {
	            var retValue = 'transitionend';
	            Object.keys(eventNameHash).some(function (vendor) {
	                if (vendor + 'TransitionProperty' in dummy.style) {
	                    retValue = eventNameHash[vendor];
	                    return true;
	                }
	            });
	            return retValue;
	        })();

	        $elem.addClass('rotate-animate').css({
	            '-webkit-transform': 'rotate(' + angle + 'deg) rotateX(' + flop + 'deg) rotateY(' + flip + 'deg)',
	            '-moz-transform': 'rotate(' + angle + 'deg) rotateX(' + flop + 'deg) rotateY(' + flip + 'deg)',
	            '-o-transform': 'rotate(' + angle + 'deg) rotateX(' + flop + 'deg) rotateY(' + flip + 'deg)',
	            '-ms-transform': 'rotate(' + angle + 'deg) rotateX(' + flop + 'deg) rotateY(' + flip + 'deg)',
	            'transform': 'rotate(' + angle + 'deg) rotateX(' + flop + 'deg) rotateY(' + flip + 'deg)'
	        }).on(transitionEnd, function () {
	            $elem.removeClass('rotate-animate').attr({
	                angle: angle,
	                flop: flop,
	                flip: flip
	            });
	        });

	        this.setState({
	            angle: angle,
	            flop: flop,
	            flip: flip
	        });
	    },

	    // 切换面板
	    togglePanel: function togglePanel() {
	        var self = this;
	        var $container = $('#' + self.props.containerId);
	        var crop = this.state.crop;
	        var $cropImage = crop.$elem;
	        var submitData = {};

	        // 坐标位置和大小
	        submitData['pos'] = $cropImage.attr('data-pos');

	        // 图片比例
	        submitData['ratio'] = $cropImage.attr('data-ratio');

	        // 如果有裁剪数据，则需要保存
	        if (submitData.pos) {
	            Modal.confirm('确定要保存当前裁剪的修改，并切换到旋转操作吗？', function () {
	                Modal.close();
	                self.props.toggleSaveCallback(true);

	                // 重置裁剪
	                crop.resetCrop();
	            });
	            return;
	        }

	        // 切换旋转回调
	        self.props.toggleRotatePanelCallback();
	        return;
	    },

	    render: function render() {
	        var cx = React.addons.classSet;

	        var panelClass = cx({
	            'xd-panel rotate-panel': true
	        });

	        var panelBodyClass = cx({
	            'xd-panel-body clearfix': true,
	            'hide': false //!this.state.isShowPanel
	        });

	        return React.createElement(
	            'div',
	            { className: panelClass },
	            React.createElement(
	                'div',
	                { className: 'xd-panel-header' },
	                React.createElement(
	                    'h2',
	                    { className: 'xd-title' },
	                    React.createElement('i', null),
	                    '旋转'
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: panelBodyClass },
	                React.createElement(
	                    'a',
	                    { href: 'javascript:;', className: 'rotate-change fl', onClick: this.changeRotateMode.bind(this, 1) },
	                    React.createElement('i', { className: 'r1' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '左旋'
	                    )
	                ),
	                React.createElement(
	                    'a',
	                    { href: 'javascript:;', className: 'rotate-change fl', onClick: this.changeRotateMode.bind(this, 2) },
	                    React.createElement('i', { className: 'r2' }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '右旋'
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = RotateMode;
	/*<a href="javascript:;" className="rotate-change fl" onClick={this.changeRotateMode.bind(this, 3)}>
	   <i className="r3"></i> 
	   <span>左右</span>
	</a>
	<a href="javascript:;" className="rotate-change fl" onClick={this.changeRotateMode.bind(this, 4)}>
	   <i className="r4"></i> 
	   <span>上下</span>
	</a>*/

/***/ },

/***/ 190:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(736);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(934)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/pages/goods/edit/image-cut/style/image-cut.less", function() {
			var newContent = require("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/pages/goods/edit/image-cut/style/image-cut.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 191:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);

	// 裁剪比例
	var CROP_RATIO = 9 / 16;

	// 最小裁剪宽度
	var MIN_CROP_WIDTH = 640;

	// 最小裁剪高度
	var MIN_CROP_HEIGHT = Math.ceil(MIN_CROP_WIDTH / CROP_RATIO);

	var CropImageModal = React.createClass({
	    displayName: 'CropImageModal',

	    // 裁剪图片
	    cropImage: function cropImage() {
	        var image = this.props.image;
	        var cropImage = this.refs.cropImage.getDOMNode();
	        var $cropImage = $(cropImage);

	        var params = {};
	        var pos = $cropImage.attr('data-pos');
	        if (!pos || pos == '') {
	            return;
	        }

	        pos = pos.split(',');
	        params['x'] = pos[0];
	        params['y'] = pos[1];
	        params['w'] = pos[2];
	        params['h'] = pos[3];
	        params['img_src'] = image;

	        var w = params.w,
	            h = params.h;

	        // 如果有裁剪比例
	        if ($cropImage.attr('data-ratio')) {
	            params['ratio'] = $cropImage.attr('data-ratio');
	            w = Math.ceil(params.w * params.ratio);
	            h = Math.ceil(params.h * params.ratio);
	        }

	        // 判断裁剪大小
	        if (w < MIN_CROP_WIDTH || h < MIN_CROP_HEIGHT) {
	            Modal.alert('图片裁剪的宽度必须大于等于' + MIN_CROP_WIDTH + '，并且高度大于等于' + MIN_CROP_HEIGHT);
	            return;
	        }

	        $.post('/pc/shopadmin/tool/cutimage', params, function (data, textStatus, xhr) {
	            if (data.status.code == 1001) {
	                if (data.result) {
	                    Modal.closeAll();
	                    Modal.tip(data.result.msg, function () {
	                        PubSub.publish('cropImage.update', {
	                            url: data.result.url || ''
	                        });
	                    });
	                }
	            } else {
	                Modal.alert(data.result && data.result.msg);
	            }
	        }, 'json');
	    },
	    componentDidMount: function componentDidMount() {
	        var cropImage = this.refs.cropImage.getDOMNode();

	        // 初始化图片裁剪
	        $(cropImage).hide().crop({
	            src: this.props.image || '',
	            containerWidth: 800,
	            containerHeight: 500,
	            cropWidth: MIN_CROP_WIDTH,
	            cropHeight: MIN_CROP_HEIGHT,
	            aspectRatio: CROP_RATIO,
	            initComplete: function initComplete() {
	                Modal.update();
	            }
	        });
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'crop-image-modal' },
	            React.createElement('img', { ref: 'cropImage', src: this.props.image }),
	            React.createElement(
	                'p',
	                { className: 'mt20' },
	                React.createElement(
	                    'a',
	                    { className: 'xd-btn primary', onClick: this.cropImage },
	                    '确定'
	                ),
	                React.createElement(
	                    'a',
	                    { className: 'xd-btn default', onClick: Modal.close },
	                    '取消'
	                )
	            )
	        );
	    }
	});

	module.exports = CropImageModal;

/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);
	__webpack_require__(208);

	var EditCategoryModal = React.createClass({
	    displayName: 'EditCategoryModal',

	    modify: function modify() {
	        var itemId = this.props.itemId;
	        location.href = '/pc/itemmanager/item/category?itemId=' + itemId;
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'edit-category-modal' },
	            React.createElement(
	                'p',
	                { className: 'high' },
	                '温馨提示'
	            ),
	            React.createElement(
	                'p',
	                null,
	                '请谨慎修改类目，修改类目之后需要重新'
	            ),
	            React.createElement(
	                'p',
	                null,
	                '填写属性等信息并且需要重新进行审核！'
	            ),
	            React.createElement(
	                'p',
	                { className: 'mt20' },
	                React.createElement(
	                    'a',
	                    { className: 'xd-btn primary', onClick: this.modify },
	                    '修改'
	                ),
	                React.createElement(
	                    'a',
	                    { className: 'xd-btn default', onClick: Modal.close },
	                    '不修改'
	                )
	            )
	        );
	    }
	});

	module.exports = EditCategoryModal;

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Modal = __webpack_require__(21);
	var CropImageModal = __webpack_require__(191);

	var IMAGE_ERROR = {
	    10002: '图片地址不存在',
	    10003: '图片宽度必须大于等于640',
	    10004: '图片宽高比例必须在9:16-16:9之间'
	};

	var CDN_URL = 'http://s17.mogucdn.com';

	var ImageError = React.createClass({
	    displayName: 'ImageError',

	    // 打开裁剪图片弹窗
	    showCropImageBox: function showCropImageBox(image) {
	        Modal.open({
	            title: '裁剪图片',
	            id: 'J_CropImage',
	            body: React.createElement(CropImageModal, { modal: Modal, image: image })
	        });
	    },
	    render: function render() {
	        var errors = this.props.errors || [];

	        // 裁剪图片需要的最小高度
	        // var minHeight = Math.round(640 / (9/16));

	        // 如果图片比例不对 && 满足最小高度 && 只支持Chrome浏览器
	        // var isNeedCropImage = (code == 10004 && h > minHeight && navigator.userAgent.indexOf('Chrome') > 0);
	        var isNeedCropImage = false;
	        return React.createElement(
	            'div',
	            null,
	            errors.length ? errors.map((function (item, index) {
	                // 获取图片大小
	                var imageSize = item.image != '' ? XD.Util.getSizeByPath(item.image) : [];
	                var w = imageSize[0] || 0;
	                var h = imageSize[1] || 0;
	                var sizeText = '【' + w + 'x' + h + '】';
	                return React.createElement(
	                    'p',
	                    { className: 'mb10' },
	                    imageSize.length && sizeText,
	                    IMAGE_ERROR[item.code] || '',
	                    '  ',
	                    React.createElement(
	                        'a',
	                        { href: item.image, target: '_blank' },
	                        '查看'
	                    ),
	                    ' ',
	                    isNeedCropImage ? React.createElement(
	                        'a',
	                        { href: 'javascript:;', onClick: this.showCropImageBox.bind(this, item.image) },
	                        '裁剪'
	                    ) : null
	                );
	            }).bind(this)) : null
	        );
	    }
	});

	module.exports = ImageError;

/***/ },

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(3);

	var SaveError = React.createClass({
	    displayName: "SaveError",

	    render: function render() {
	        var msg = this.props.msg;
	        return React.createElement(
	            "p",
	            { className: "mb10" },
	            msg
	        );
	    }
	});

	module.exports = SaveError;

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	var MoreBar = React.createClass({
	    displayName: 'MoreBar',

	    getInitialState: function getInitialState() {
	        return {
	            isShowMore: true
	        };
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            isShowMore: props.needFillDetail
	        });
	        props.needFillDetail ? this.showMore() : this.hideMore();
	    },
	    showMore: function showMore() {
	        $('.goods-detail').find('.detail-body .xd-panel').removeClass('hide');
	        $('.custom-module').show();
	        this.setState({ isShowMore: true });
	    },
	    hideMore: function hideMore() {
	        $('.goods-detail').find('.detail-body .xd-panel').addClass('hide').eq(0).removeClass('hide');
	        $('.custom-module').hide();
	        this.setState({ isShowMore: false });
	    },
	    render: function render() {
	        var isShowMore = this.state.isShowMore;
	        return React.createElement(
	            'div',
	            { className: 'more-bar' },
	            !isShowMore ? React.createElement(
	                'a',
	                { href: 'javascript:;', onClick: this.showMore },
	                React.createElement('i', { className: 'arrow-show' }),
	                '展开更多'
	            ) : React.createElement(
	                'a',
	                { href: 'javascript:;', onClick: this.hideMore },
	                React.createElement('i', { className: 'arrow-hide' }),
	                '收起'
	            )
	        );
	    }
	});

	module.exports = MoreBar;

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Volume = __webpack_require__(210);
	var Weight = __webpack_require__(211);

	var Postage = React.createClass({
	    displayName: 'Postage',

	    statics: {
	        self: null,
	        getData: function getData() {
	            var self = Postage.self;
	            var postage = self.props.postage;
	            var postageId = self.state.postageId;
	            var postageType = self.state.postageType;

	            postageType = self.getPostageType(postageId);

	            return {
	                postageId: postageId,
	                postageType: postageType
	            };
	        }
	    },
	    getInitialState: function getInitialState() {
	        var postage = this.props.postage || {};
	        return {
	            postage: postage || {},
	            postageId: postage.choosePostageId || 100,
	            postageType: 0
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        Postage.self = this;
	    },
	    // 获取运费类型
	    getPostageType: function getPostageType(choosePostageId) {
	        var postage = this.state.postage;
	        var postageType = 0;

	        // 查找运费类型
	        postage && postage.postageList && _.each(postage.postageList, function (item, key) {
	            if (choosePostageId == item.tplId) {
	                postageType = item.billingMethods;
	            }
	        });

	        return postageType;
	    },
	    // 选择运费
	    changePostage: function changePostage() {
	        var choosePostageId = this.refs.postage.getDOMNode().value;

	        // 获取运费类型
	        var postageType = this.getPostageType(choosePostageId);

	        this.setState({
	            postageId: choosePostageId,
	            postageType: postageType
	        });

	        PubSub.publish('postageChange.update', {
	            postageType: postageType
	        });
	    },
	    // 添加运费
	    addPostage: function addPostage() {
	        this.refs.refresPostage.getDOMNode().className = 'refresh-data-tip';
	    },
	    // 刷新运费（默认选择全国包邮）
	    refresPostage: function refresPostage() {
	        $.get('/pc/itemmanager/item/postage', {}, (function (data) {
	            if (data.status.code == 1001) {
	                var postage = data.result.postage || {};
	                var postageList = postage.postageList || [];
	                var defaultPostage = postageList['100'] || {};
	                this.setState({
	                    postage: postage,
	                    postageId: defaultPostage.tplId || 0,
	                    postageType: defaultPostage.billingMethods || 0
	                });

	                PubSub.publish('refresPostage.update', {
	                    postageType: defaultPostage.billingMethods || 0
	                });
	            } else {
	                Modal.alert(data.status.msg);
	            }
	        }).bind(this), 'json');
	        this.refs.refresPostage.getDOMNode().className = 'refresh-data-tip hide';
	    },
	    render: function render() {
	        var postage = this.state.postage || {};
	        var postageType = this.getPostageType(this.state.postageId) || 0;
	        var hasPostagePri = this.props.hasPostagePri;

	        var isShowVolumeWeight = this.props.isShowVolumeWeight;
	        var skuType = this.props.skuType;
	        var volume = this.props.volume;
	        var weight = this.props.weight;

	        var options = [];
	        postage.postageList && _.each(postage.postageList, function (item, key) {
	            if (key == postage.choosePostageId) {
	                options.push(React.createElement(
	                    'option',
	                    { selected: true, value: item.tplId },
	                    item.tplName
	                ));
	            } else {
	                options.push(React.createElement(
	                    'option',
	                    { value: item.tplId },
	                    item.tplName
	                ));
	            }
	        });

	        if (hasPostagePri) {
	            if (postage.postageList) {
	                return React.createElement(
	                    'div',
	                    { className: 'postage' },
	                    React.createElement(
	                        'select',
	                        { ref: 'postage', className: 'postage-select xd-select', onChange: this.changePostage },
	                        options
	                    ),
	                    isShowVolumeWeight ? React.createElement(Volume, { skuType: skuType, postageType: postageType, volume: volume }) : null,
	                    isShowVolumeWeight ? React.createElement(Weight, { skuType: skuType, postageType: postageType, weight: weight }) : null,
	                    React.createElement(
	                        'span',
	                        { className: 'add-postage' },
	                        React.createElement(
	                            'a',
	                            { className: 'ml20', href: '/pc/trade/logistics/express', target: '_blank', onClick: this.addPostage },
	                            '新建运费模板'
	                        ),
	                        React.createElement(
	                            'a',
	                            { ref: 'refresPostage', className: 'refresh-data-tip hide', href: 'javascript:;', onClick: this.refresPostage },
	                            React.createElement('i', { className: 'arrow' }),
	                            '点击刷新运费模板'
	                        )
	                    )
	                );
	            } else {
	                return React.createElement(
	                    'span',
	                    { className: 'add-postage' },
	                    React.createElement(
	                        'a',
	                        { className: 'ml20', href: '/pc/trade/logistics/express', target: '_blank', onClick: this.addPostage },
	                        '新建运费模板'
	                    ),
	                    React.createElement(
	                        'a',
	                        { ref: 'refresPostage', className: 'refresh-data-tip hide', href: 'javascript:;', onClick: this.refresPostage },
	                        React.createElement('i', { className: 'arrow' }),
	                        '点击刷新运费模板'
	                    )
	                );
	            }
	        } else {
	            return React.createElement(
	                'span',
	                null,
	                '没有权限设置运费'
	            );
	        }
	    }
	});

	module.exports = Postage;

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	var PostageInfo = React.createClass({
	    displayName: 'PostageInfo',

	    getInitialState: function getInitialState() {
	        return {
	            postageType: this.getPostageType(this.props.postage.choosePostageId || 100) || 0
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('postageChange.update', this.postageChangeUpdate);
	        PubSub.subscribe('refresPostage.update', this.refresPostageUpdate);
	    },
	    // 获取运费类型
	    getPostageType: function getPostageType(choosePostageId) {
	        var postage = this.props.postage;
	        var postageType = 0;

	        // 查找运费类型
	        postage && postage.postageList && _.each(postage.postageList, function (item, key) {
	            if (choosePostageId == item.tplId) {
	                postageType = item.billingMethods;
	            }
	        });

	        return postageType;
	    },
	    postageChangeUpdate: function postageChangeUpdate(msg, data) {
	        this.setState({
	            postageType: data.postageType
	        });
	    },
	    refresPostageUpdate: function refresPostageUpdate(msg, data) {
	        this.setState({
	            postageType: data.postageType
	        });
	    },
	    render: function render() {
	        var postageType = this.state.postageType;
	        var cx = React.addons.classSet;
	        var postageInfoClass = cx({
	            'postage-info': true,
	            'hide': postageType < 1
	        });
	        return React.createElement(
	            'div',
	            { className: postageInfoClass },
	            React.createElement(
	                'p',
	                null,
	                '计费方式：按',
	                postageType == 1 && '件数',
	                postageType == 2 && '重量',
	                postageType == 3 && '体积',
	                '计费'
	            )
	        );
	    }
	});

	module.exports = PostageInfo;
	/*<div className="clearfix">
	   <span className="fl">发货地：浙江省 杭州市 西湖区</span>
	   <a href="/pc/trade/logistics/express" target="_blank" className="fr">查看详情</a>
	</div>*/

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var Modal = __webpack_require__(21);

	var CalendarMod = __webpack_require__(10);
	var DateTimeFormat = CalendarMod.DateTimeFormat;
	var DatePicker = CalendarMod.DatePicker;
	var GregorianCalendar = CalendarMod.GregorianCalendar;
	var CalendarLocale = CalendarMod.CalendarLocale;
	var zhCn = CalendarMod.zhCn;
	var Calendar = CalendarMod.Calendar;

	var FieldMixins = __webpack_require__(17);

	var PreSalePrice = React.createClass({
	    displayName: 'PreSalePrice',

	    mixins: [FieldMixins],
	    getDefaultProps: function getDefaultProps() {
	        // 时间格式
	        return {
	            formatter: new DateTimeFormat('yyyy-MM-dd HH:mm:ss')
	        };
	    },
	    getInitialState: function getInitialState() {
	        // 预售信息都保存在 this.presale上
	        this.presale = this.props.presaleData || {};

	        return {
	            mainShow: false,
	            isStaticTime: true, // 是否把预售时间设定成固定值
	            conditions: {},
	            // 预售价格信息提示
	            price: {
	                tip: !this.presale.price ? '' : ''
	            },
	            // 定金价格信息提示
	            deposit: {
	                tip: !this.presale.deposit ? '*定金必须是商品售价的20%' : ''
	            }
	        };
	    },
	    mainShow: function mainShow() {
	        this.setState({
	            mainShow: true
	        });
	    },
	    mainHide: function mainHide() {
	        this.setState({
	            mainShow: false
	        });
	    },
	    handleMoneyChange: function handleMoneyChange(event) {
	        // 只读不可写
	        if (this.presale.readonly) {
	            return;
	        }
	        // 预售价格、定金价格更改
	        var dom = event.target;
	        if (dom.id == "xd-psp-price") {
	            // 价格
	            var price = parseFloat(dom.value);
	            var deposit = parseFloat(React.findDOMNode(this.refs.deposit).value);
	            this.checkPriceDeposit(price, deposit);
	            this.presale['price'] = dom.value;
	        } else if (dom.id == "xd-psp-deposit") {
	            // 定金
	            var price = parseFloat(React.findDOMNode(this.refs.price).value);
	            var deposit = parseFloat(dom.value);
	            this.checkPriceDeposit(price, deposit);
	            this.presale['deposit'] = dom.value;
	        }
	    },
	    checkPriceDeposit: function checkPriceDeposit(price, deposit) {
	        price = parseFloat(price);
	        deposit = parseFloat(deposit);
	        // 校验预售价格、定金价格
	        if (!price || price < 0.01) {
	            this.setState({
	                price: {
	                    tip: '*请填写正确的价格，价格只能是大于0.01的数'
	                }
	            });
	        } else {
	            this.setState({
	                price: {
	                    tip: ''
	                }
	            });
	        }
	        if (!deposit || price && (price * 0.2 < deposit || Math.floor(price * 0.2) > deposit)) {
	            this.setState({
	                deposit: {
	                    tip: '*定金必须是商品售价的20%'
	                }
	            });
	        } else {
	            this.setState({
	                deposit: {
	                    tip: ''
	                }
	            });
	        }
	    },
	    handleSave: function handleSave() {
	        // 只读不可写
	        if (this.presale.readonly) {
	            return;
	        }
	        // 保存
	        // console.log('PreSale组件数据',this.presale)
	        if (!this.cheackSubmitItem('price', '请填写预售价格')) return;
	        if (!this.cheackSubmitItem('deposit', '请填写定金价格')) return;
	        if (!this.lastCheck()) return;
	        Modal.tip('保存成功');
	        // 复制数据，将其传递到主页面
	        var presaleData = {};
	        _.map(this.presale, function (ele, key) {
	            presaleData[key] = ele;
	        });

	        // 双十一时间定死
	        if (this.state.isStaticTime) {
	            presaleData.start = presaleData.start || 1446307200;
	            presaleData.end = presaleData.end || 1447084799;
	            presaleData.priceStart = presaleData.priceStart || 1447084800;
	            presaleData.priceEnd = presaleData.priceEnd || 1447343999;
	        }

	        // 这里之所以不直接传递this.presale是因为有坑
	        this.props.onSave(presaleData);
	        // 隐藏组件
	        this.setState({ mainShow: false });

	        // console.log('PreSale传递到了主页面的数据',presaleData);
	    },
	    lastCheck: function lastCheck() {
	        // 最后校验，负责【时间前后对比，定金与预售价格的对比】
	        if (this.presale.price * 0.2 < this.presale.deposit || Math.floor(this.presale.price * 0.2) > this.presale.deposit) {
	            return false;
	        }
	        return true;
	    },
	    cheackSubmitItem: function cheackSubmitItem(item, msg) {
	        // 校验每个属性，是否存在值，如果没有就弹框
	        if (!this.presale[item]) {
	            return false;
	        }
	        return true;
	    },
	    handleStart: function handleStart(date) {
	        var time = Math.floor(date.time / 1000);
	        this.presale.start = time;
	        // console.log('开始时间', time);
	    },
	    handleEnd: function handleEnd(date) {
	        var time = Math.floor(date.time / 1000);
	        this.presale.end = time;
	        // console.log('结束时间', time);
	    },
	    handlePriceStart: function handlePriceStart(date) {
	        var time = Math.floor(date.time / 1000);
	        this.presale.priceStart = time;
	        // console.log('尾金开始时间', time);
	    },
	    handlePriceEnd: function handlePriceEnd(date) {
	        var time = Math.floor(date.time / 1000);
	        this.presale.priceEnd = time;
	        // console.log('尾金结束时间', time);
	    },
	    getTimeStr: function getTimeStr(time) {
	        // console.log('被调用')
	        if (!time) return '';

	        var calendarValue = new GregorianCalendar(zhCn),
	            today = new Date(time * 1000);
	        calendarValue.setTimezoneOffset(8 * 60);
	        calendarValue.setTime(today);
	        return calendarValue;
	    },
	    render: function render() {
	        // 事件对象
	        var calendarValue = new GregorianCalendar(zhCn),
	            today = new Date();
	        calendarValue.setTimezoneOffset(8 * 60);
	        today.setHours(0);
	        today.setMinutes(0);
	        today.setSeconds(0);
	        calendarValue.setTime(today);
	        var calendar = React.createElement(Calendar, { prefixCls: 'xd-calendar', locale: CalendarLocale, defaultValue: calendarValue,
	            showTime: true, showToday: false });

	        var state = this.state,
	            conditions = state.conditions;

	        var layer = React.createElement(
	            'div',
	            { className: 'xd-psp-layer' },
	            React.createElement('div', { className: 'xd-psp-layer-mask' }),
	            React.createElement(
	                'div',
	                { className: 'xd-psp-layer-main' },
	                React.createElement(
	                    'p',
	                    { className: 'xd-psp-title' },
	                    '创建双十一预售价:'
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'field clearfix' },
	                    React.createElement(
	                        'label',
	                        { className: 'fl' },
	                        '预售价'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: ' fl' },
	                        React.createElement(
	                            'div',
	                            { className: 'goods-price fl' },
	                            React.createElement('input', { ref: 'price', id: 'xd-psp-price', className: 'xd-input primary', onChange: this.handleMoneyChange,
	                                type: 'number',
	                                value: this.presale.price ? this.presale.price : null }),
	                            React.createElement(
	                                'span',
	                                { className: 'high ml20' },
	                                this.state.price.tip
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'field clearfix' },
	                    React.createElement(
	                        'label',
	                        { className: 'fl' },
	                        '定金'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: ' fl' },
	                        React.createElement(
	                            'div',
	                            { className: 'goods-price fl' },
	                            React.createElement('input', { ref: 'deposit', id: 'xd-psp-deposit', className: 'xd-input primary', onChange: this.handleMoneyChange,
	                                type: 'number',
	                                value: this.presale.deposit ? this.presale.deposit : null }),
	                            React.createElement(
	                                'span',
	                                { className: 'high ml20' },
	                                this.state.deposit.tip
	                            )
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'field clearfix' },
	                    React.createElement(
	                        'label',
	                        { className: 'fl' },
	                        '预售时间'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: ' fl' },
	                        React.createElement(
	                            'div',
	                            { className: 'xd-field' },
	                            this.state.isStaticTime ? React.createElement('input', { ref: 'start', className: 'xd-input', style: { width: '300px' },
	                                placeholder: '2015年11月1日 - 2015年11月9日', disabled: 'disabled' }) : React.createElement(
	                                'div',
	                                null,
	                                React.createElement(
	                                    DatePicker,
	                                    { formatter: this.props.formatter,
	                                        calendar: calendar,
	                                        onChange: this.handleStart,
	                                        defaultValue: this.getTimeStr(this.presale.start) },
	                                    React.createElement('input', { className: 'xd-input', placeholder: '开始日期' })
	                                ),
	                                ' 至 ',
	                                React.createElement(
	                                    DatePicker,
	                                    { formatter: this.props.formatter,
	                                        calendar: calendar,
	                                        onChange: this.handleEnd,
	                                        defaultValue: this.getTimeStr(this.presale.end) },
	                                    React.createElement('input', { className: 'xd-input', placeholder: '结束日期',
	                                        value: this.getTimeStr(this.presale.end) })
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'xd-psp-calendar-tip' },
	                            '日历'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'field clearfix' },
	                    React.createElement(
	                        'label',
	                        { className: 'fl' },
	                        '尾款时间'
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: ' fl' },
	                        React.createElement(
	                            'div',
	                            { className: 'xd-field' },
	                            this.state.isStaticTime ? React.createElement('input', { ref: 'priceStart', className: 'xd-input', style: { width: '300px' },
	                                placeholder: '2015年11月10日 - 2015年11月12日', disabled: 'disabled' }) : React.createElement(
	                                'div',
	                                null,
	                                React.createElement(
	                                    DatePicker,
	                                    { formatter: this.props.formatter,
	                                        calendar: calendar,
	                                        onChange: this.handlePriceStart,
	                                        defaultValue: this.getTimeStr(this.presale.priceStart) },
	                                    React.createElement('input', { className: 'xd-input', placeholder: '开始日期',
	                                        value: this.getTimeStr(this.presale.priceStart) })
	                                ),
	                                ' 至 ',
	                                React.createElement(
	                                    DatePicker,
	                                    { formatter: this.props.formatter,
	                                        calendar: calendar,
	                                        onChange: this.handlePriceEnd,
	                                        defaultValue: this.getTimeStr(this.presale.priceEnd) },
	                                    React.createElement('input', { className: 'xd-input', placeholder: '结束日期',
	                                        value: this.getTimeStr(this.presale.priceEnd) })
	                                )
	                            )
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'xd-psp-calendar-tip' },
	                            '日历'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'psp-save' },
	                    React.createElement(
	                        'a',
	                        { className: "xd-btn primary " + (this.presale.readonly ? "disabled" : ""), onClick: this.handleSave },
	                        '保存'
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'psp-close', onClick: this.mainHide },
	                    '关闭'
	                )
	            )
	        );

	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'a',
	                { className: 'xd-btn primary', onClick: this.mainShow },
	                '设置双十一预售价'
	            ),
	            this.state.mainShow ? layer : null
	        );
	    }
	});

	module.exports = PreSalePrice;
	/* 预售价格 */ /* 定金价格 */ /* 预售时间 */ /* 尾金时间 */

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var SkuTable = __webpack_require__(203);
	var Modal = __webpack_require__(21);

	var PreSalePrice = __webpack_require__(198);

	var Price = React.createClass({
	    displayName: 'Price',

	    statics: {
	        self: null,
	        value: '',
	        getData: function getData() {
	            return Price.self.state.price || '';
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            price: '',
	            tip: ''
	        };
	    },
	    // 值改变
	    valueChange: function valueChange(event) {
	        var value = event.target.value;

	        var tip = '';
	        if (value != '') {
	            if (isNaN(value) || value < 0.01) {
	                tip = '请填写正确的价格，价格只能是大于0.01的数';
	            }
	        }

	        this.setState({
	            price: value,
	            tip: tip
	        });

	        Price.value = value;
	    },
	    // 选择sku类型回调
	    selectSkuTypeUpdate: function selectSkuTypeUpdate(msg, data) {
	        // 如果不设置规格
	        if (data.skuType == 0) {
	            var price = Price.value || '';
	            this.refs.price.getDOMNode().removeAttribute('disabled');
	            this.refs.price.getDOMNode().value = price;
	            this.setState({ price: price });
	        } else {
	            this.refs.price.getDOMNode().setAttribute('disabled', 'disabled');

	            // 回显价格
	            var skuData = [];
	            if (data.skuType == 1) {
	                skuData = SkuTable.self.state.oneSkuData;
	            } else if (data.skuType == 2) {
	                skuData = SkuTable.self.state.twoSkuData;
	            }

	            // 收集价格
	            var prices = [];
	            skuData.length && _.map(skuData, function (item, i) {
	                prices.push(+item.price);
	            });

	            this.priceStockUpdate('', { prices: prices });
	        }
	    },

	    // 价格一键填写回调
	    autoFillPriceUpdate: function autoFillPriceUpdate(msg, data) {
	        this.setState({
	            price: data.price
	        });
	    },
	    // 价格库存回调
	    priceStockUpdate: function priceStockUpdate(msg, data) {
	        var prices = data.prices;
	        if (prices.length) {
	            var minPrice = Math.min.apply(null, prices);
	            this.refs.price.getDOMNode().value = minPrice;
	            this.setState({ price: minPrice });
	        } else {
	            this.refs.price.getDOMNode().value = '';
	            this.setState({ price: '' });
	        }
	    },

	    // 选择尺码回调
	    selectSizeUpdate: function selectSizeUpdate(msg, data) {
	        var twoSkuOptionData = data.twoSkuOptionData || {};
	        var sizes = twoSkuOptionData.sizes || [];

	        var checkedLen = 0;
	        // 查找所有尺码是否有选中项
	        sizes.length && _.map(sizes, function (item, i) {
	            if (item.checked) {
	                checkedLen++;
	            }
	        });

	        // 如果都没有选中
	        if (!checkedLen) {
	            this.setState({
	                price: ''
	            });
	        }
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            price: props.price
	        });

	        var skuType = props.skuSetting.skuType;

	        // 如果是单层或双层规格
	        if (props.skuSetting.skuType > 0) {
	            this.refs.price.getDOMNode().setAttribute('disabled', 'disabled');
	        } else {
	            Price.value = props.price;
	        }
	    },
	    // 在挂载结束之后马上被调用
	    componentDidMount: function componentDidMount() {
	        Price.self = this;
	        PubSub.subscribe('selectStyle.update', this.selectStyleUpdate);
	        PubSub.subscribe('selectSkuType.update', this.selectSkuTypeUpdate);
	        PubSub.subscribe('autoFillPrice.update', this.autoFillPriceUpdate);
	        PubSub.subscribe('priceStock.update', this.priceStockUpdate);
	    },
	    render: function render() {
	        var price = this.state.price;
	        var presaleData = this.props.presaleData.presale;

	        // console.log('presaleData路过价格组件',presaleData);
	        return React.createElement(
	            'div',
	            { className: 'clearfix' },
	            React.createElement(
	                'div',
	                { className: 'goods-price fl' },
	                React.createElement('input', { ref: 'price', className: 'xd-input primary', value: price, onChange: this.valueChange }),
	                React.createElement(
	                    'span',
	                    { className: 'high ml20' },
	                    this.state.tip
	                )
	            ),
	            this.props.presaleData.presale_hidden === false ? React.createElement(PreSalePrice, { presaleData: presaleData, onSave: this.props.presale }) : null
	        );
	    }
	});

	module.exports = Price;

/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	var SizeTD = React.createClass({
	    displayName: 'SizeTD',

	    // 值改变
	    valueChange: function valueChange(skuSizeName, sizeName, propName, event) {
	        var self = this.props.self;
	        var skuSetting = self.state.skuSetting;
	        var skuProperties = skuSetting.skuProperties;
	        skuProperties[skuSizeName][sizeName] = skuProperties[skuSizeName][sizeName] || {};
	        skuProperties[skuSizeName][sizeName][propName] = '';
	        skuProperties[skuSizeName][sizeName][propName] = event.target.value;
	        skuSetting.skuProperties = skuProperties;
	        self.setState({
	            skuSetting: skuSetting
	        });
	    },
	    render: function render() {
	        var skuSizeName = this.props.skuSizeName;
	        var sizeName = this.props.sizeName;
	        var propName = this.props.propName;
	        var value = this.props.value;
	        return React.createElement(
	            'td',
	            null,
	            React.createElement('input', { type: 'text', className: 'xd-input primary', value: value, onChange: this.valueChange.bind(this, skuSizeName, sizeName, propName) })
	        );
	    }
	});

	var SizeTR = React.createClass({
	    displayName: 'SizeTR',

	    render: function render() {
	        var self = this.props.self;
	        var item = this.props.item || {};
	        var skuSizeName = this.props.skuSizeName;
	        var sizeName = this.props.sizeName;
	        var defaultSizeProperties = this.props.defaultSizeProperties || [];

	        var tds = [];
	        tds.push(React.createElement(
	            'td',
	            null,
	            sizeName
	        ));
	        defaultSizeProperties.length && defaultSizeProperties.map(function (key, j) {
	            tds.push(React.createElement(SizeTD, { sizeName: sizeName, skuSizeName: skuSizeName, value: item[key] || '', propName: key, self: self }));
	        });

	        return React.createElement(
	            'tr',
	            null,
	            tds
	        );
	    }
	});

	var SizeDesc = React.createClass({
	    displayName: 'SizeDesc',

	    statics: {
	        self: null,
	        getData: function getData() {
	            var GoodsDetail = SizeDesc.self;
	            if (!GoodsDetail) {
	                return [];
	            }

	            var skuSetting = GoodsDetail.state.skuSetting;
	            var skuProperties = skuSetting.skuProperties || {};
	            var skuSizeName = skuSetting.two.size.name;
	            var sizeData = skuProperties[skuSizeName];
	            var defaultSizeProperties = skuSetting.two.size.properties || [];

	            var newSizeData = [];

	            // 如果运营没有配sku属性 那么就返回空 不需要校验
	            if (defaultSizeProperties.length > 0) {
	                _.each(sizeData, function (item, key) {
	                    var size = {};
	                    if (item) {
	                        size[skuSizeName] = key;
	                        size = _.extend(size, item);
	                        newSizeData.push(JSON.stringify(size));
	                    }
	                });
	            }
	            return newSizeData;
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            skuProperties: {},
	            defaultData: {},
	            desc: ''
	        };
	    },
	    valueChange: function valueChange(event) {
	        var desc = event.target.value;
	        this.setState({
	            desc: desc
	        });

	        // 更新数据
	        var self = this.props.self;
	        var moduleIndex = this.props.moduleIndex;
	        var detailImages = self.state.detailImages;
	        detailImages[moduleIndex].desc = desc;
	    },
	    // 选择尺码回调
	    selectSizeUpdate: function selectSizeUpdate(msg, data) {
	        var sizeName = data.size;
	        var checked = data.checked;
	        var GoodsDetail = SizeDesc.self;
	        var skuSetting = GoodsDetail.state.skuSetting;
	        var skuProperties = skuSetting.skuProperties || {};
	        var skuSizeName = skuSetting.two.size.name;
	        var defaultSizeProperties = skuSetting.two.size.properties || [];

	        // 如果没有默认尺码属性
	        if (!defaultSizeProperties.length) {
	            return;
	        }

	        // 如果是选中
	        if (checked) {
	            if (!skuProperties[skuSizeName]) {
	                skuProperties[skuSizeName] = {};
	            }
	            skuProperties[skuSizeName][sizeName] = {};
	            defaultSizeProperties.length && _.map(defaultSizeProperties, function (name, i) {
	                skuProperties[skuSizeName][sizeName][name] = '';
	            });
	        } else {
	            delete skuProperties[skuSizeName][sizeName];
	        }

	        skuSetting.skuProperties = skuProperties;
	        GoodsDetail.setState({
	            skuSetting: skuSetting
	        });
	    },
	    componentDidMount: function componentDidMount() {
	        SizeDesc.self = this.props.self;
	        PubSub.subscribe('selectSize.update', this.selectSizeUpdate);
	        // sku切换的时候，尺码说明对应也要切换
	        PubSub.subscribe('selectSkuType.update', this.selectSkuTypeUpdate);
	    },
	    selectSkuTypeUpdate: function selectSkuTypeUpdate(msg, data) {
	        // sku类型变化后，尺码说明的列表也需要切换
	        var skuType = data.skuType;
	        var self = this.props.self;
	        var skuSetting = self.state.skuSetting || {};

	        this.stateClone = this.stateClone || {};
	        // 保存当前数据
	        this.stateClone[skuSetting.skuType] = _.clone(skuSetting.skuProperties);
	        skuSetting.skuType = skuType;
	        // 获取新的skuType的数据
	        skuSetting.skuProperties = this.stateClone[skuType] || {};
	        self.setState({
	            skuSetting: skuSetting
	        });
	    },
	    render: function render() {
	        var self = this.props.self;
	        var skuSetting = self.state.skuSetting || {};
	        var skuProperties = skuSetting.skuProperties || {};
	        var skuSizeName = skuSetting.two.size.name;
	        var sizeData = skuProperties[skuSizeName];
	        var defaultSizeProperties = skuSetting.two.size.properties || [];
	        var desc = this.state.desc || '';

	        var sizeRow = [];
	        _.each(sizeData, function (item, key) {
	            sizeRow.push(React.createElement(SizeTR, { item: item, defaultSizeProperties: defaultSizeProperties, skuSizeName: skuSizeName, sizeName: key, self: self }));
	        });

	        var cx = React.addons.classSet;
	        var classes = cx({
	            'xd-table size-table': true,
	            'hide': !sizeRow.length
	        });

	        return React.createElement(
	            'div',
	            { className: 'size-desc' },
	            defaultSizeProperties.length ? React.createElement(
	                'table',
	                { className: classes },
	                React.createElement(
	                    'thead',
	                    null,
	                    React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                            'td',
	                            null,
	                            skuSizeName
	                        ),
	                        defaultSizeProperties.length ? defaultSizeProperties.map(function (item, i) {
	                            return React.createElement(
	                                'td',
	                                null,
	                                item
	                            );
	                        }) : ''
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    sizeRow
	                )
	            ) : null
	        );
	    }
	});

	module.exports = SizeDesc;

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var UploadImage = __webpack_require__(45);
	var Modal = __webpack_require__(21);
	var SKU = __webpack_require__(173);
	var Validator = __webpack_require__(174);
	var Link = __webpack_require__(172);
	var Action = __webpack_require__(171);

	// sku图片
	var SkuImage = React.createClass({
	    displayName: 'SkuImage',

	    getInitialState: function getInitialState() {
	        return {
	            oneSkuOptionData: {},
	            twoSkuOptionData: {},
	            skuType: 0
	        };
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            oneSkuOptionData: props.oneSkuOptionData,
	            twoSkuOptionData: props.twoSkuOptionData,
	            skuType: props.data.skuType
	        });
	    },
	    selectSpecUpdate: function selectSpecUpdate(msg, data) {
	        this.setState({
	            oneSkuOptionData: data.oneSkuOptionData
	        });
	    },
	    selectStyleUpdate: function selectStyleUpdate(msg, data) {
	        this.setState({
	            twoSkuOptionData: data.twoSkuOptionData
	        });
	    },
	    selectSkuTypeUpdate: function selectSkuTypeUpdate(msg, data) {
	        this.setState({
	            oneSkuOptionData: data.oneSkuOptionData,
	            twoSkuOptionData: data.twoSkuOptionData,
	            skuType: data.skuType
	        });
	    },
	    // 在挂载结束之后马上被调用
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('selectStyle.update', this.selectStyleUpdate);
	        PubSub.subscribe('selectSpec.update', this.selectSpecUpdate);
	        PubSub.subscribe('selectSkuType.update', this.selectSkuTypeUpdate);
	        PubSub.subscribe('skuImage.uploaded', (function (msg, data) {
	            //提供一个全局的回掉供图片添加测试使用，需求方子天，予心添加
	            var me = this,
	                style = data.style,
	                url = data.url,
	                imageArr = _.isArray(url) ? url : [url];

	            this.uploadImageFinish(style, imageArr);
	        }).bind(this));
	    },
	    // 编辑图片
	    editImage: function editImage(i) {
	        var skuType = this.state.skuType;
	        var src = '';

	        // 如果是单层规格
	        if (skuType == 1) {
	            var oneSkuOptionData = this.state.oneSkuOptionData;
	            src = oneSkuOptionData.styles[i].image;
	            // 如果是双层规格
	        } else if (skuType == 2) {
	                var twoSkuOptionData = this.state.twoSkuOptionData;
	                src = twoSkuOptionData.styles[i].image;
	            }

	        PubSub.publish('editImage.update', {
	            i: i,
	            src: src
	        });
	    },
	    // 上传图片完成 (修改请同步修改 chooseImageFinish)
	    uploadImageFinish: function uploadImageFinish(styleName, images) {
	        var skuType = this.state.skuType;

	        // 过滤上传中有错误的图片
	        var images = Validator.checkImageError(images);
	        if (images && !images.length) {
	            return;
	        }

	        // 如果是单层规格
	        if (skuType == 1) {
	            var oneSkuOptionData = this.state.oneSkuOptionData;

	            // 更换图片
	            var index = -1;
	            _.map(oneSkuOptionData.styles, function (style, i) {
	                if (style.style == styleName) {
	                    index = i;
	                }
	            });

	            oneSkuOptionData.styles[index].image = images[0];

	            this.setState({
	                oneSkuOptionData: oneSkuOptionData
	            });
	            PubSub.publish('uploadSkuImage.update', {
	                image: images[0],
	                styleName: styleName
	            });

	            // 如果是双层规格
	        } else if (skuType == 2) {
	                var twoSkuOptionData = this.state.twoSkuOptionData;

	                // 更换图片
	                var index = -1;
	                _.map(twoSkuOptionData.styles, function (style, i) {
	                    if (style.style == styleName) {
	                        index = i;
	                    }
	                });

	                twoSkuOptionData.styles[index].image = images[0];

	                this.setState({
	                    twoSkuOptionData: twoSkuOptionData
	                });
	                PubSub.publish('uploadSkuImage.update', {
	                    image: images[0],
	                    styleName: styleName
	                });
	            }
	    },
	    uploadImageFailed: function uploadImageFailed(msg) {
	        Modal.alert(msg);
	    },
	    render: function render() {
	        var state = this.state;
	        var oneSkuOptionData = state.oneSkuOptionData || {};
	        var twoSkuOptionData = state.twoSkuOptionData || {};

	        var styles = [];
	        if (state.skuType == 1) {
	            styles = oneSkuOptionData.styles || [];
	        } else if (state.skuType == 2) {
	            styles = twoSkuOptionData.styles || [];
	        }

	        // 选中的集合
	        var checkedItems = [];
	        return React.createElement(
	            'div',
	            { className: 'sku-image' },
	            React.createElement(
	                'ul',
	                { className: 'clearfix' },
	                styles.length ? styles.map((function (item, i) {
	                    var cx = React.addons.classSet;
	                    var changeUploadImageClassName = cx({
	                        'change-upload-image': true,
	                        'hide': !item.image
	                    });

	                    item.checked && checkedItems.push(item);
	                    return item.checked ? React.createElement(
	                        'li',
	                        null,
	                        React.createElement(
	                            'p',
	                            null,
	                            item.style,
	                            '：'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'upload-image' },
	                            item.image != '' ? React.createElement('img', { className: 'img', src: item.image + '_100x100.jpg', width: '100' }) : '',
	                            React.createElement(
	                                'span',
	                                null,
	                                '＋上传图片'
	                            ),
	                            React.createElement(UploadImage, { isMultiple: false, onStart: this.uploadImageStart, onFinish: this.uploadImageFinish.bind(this, item.style), onFailed: this.uploadImageFailed }),
	                            React.createElement(
	                                'div',
	                                { className: changeUploadImageClassName },
	                                React.createElement(
	                                    'div',
	                                    { className: 'action' },
	                                    React.createElement(
	                                        'a',
	                                        { href: 'javascript:;', className: 'change-btn' },
	                                        '更换',
	                                        React.createElement(UploadImage, { isMultiple: false, onFinish: this.uploadImageFinish.bind(this, item.style), onFailed: this.uploadImageFailed })
	                                    )
	                                )
	                            )
	                        ),
	                        React.createElement(UniImageDialog, { isChange: !item.image, chooseImageFinish: this.chooseImageFinish.bind(this, item.style) })
	                    ) : null;
	                }).bind(this)) : null
	            ),
	            checkedItems.length ? React.createElement(
	                'p',
	                null,
	                Link.UPLOAD_IMAGE_DESC_TEXT
	            ) : null
	        );
	    },

	    // 选择uni图库图片完成 将图片写入uploadSkuImage
	    chooseImageFinish: function chooseImageFinish(styleName, uniImage) {
	        var skuType = this.state.skuType;

	        // 如果是单层规格
	        if (skuType == 1) {
	            var oneSkuOptionData = this.state.oneSkuOptionData;

	            // 更换图片
	            var index = -1;
	            _.map(oneSkuOptionData.styles, function (style, i) {
	                if (style.style == styleName) {
	                    index = i;
	                }
	            });

	            oneSkuOptionData.styles[index].image = uniImage.wholePath;

	            this.setState({
	                oneSkuOptionData: oneSkuOptionData
	            });
	            PubSub.publish('uploadSkuImage.update', {
	                image: uniImage.wholePath,
	                styleName: styleName
	            });

	            // 如果是双层规格
	        } else if (skuType == 2) {
	                var twoSkuOptionData = this.state.twoSkuOptionData;

	                // 更换图片
	                var index = -1;
	                _.map(twoSkuOptionData.styles, function (style, i) {
	                    if (style.style == styleName) {
	                        index = i;
	                    }
	                });

	                twoSkuOptionData.styles[index].image = uniImage.wholePath;

	                this.setState({
	                    twoSkuOptionData: twoSkuOptionData
	                });
	                PubSub.publish('uploadSkuImage.update', {
	                    image: uniImage.wholePath,
	                    styleName: styleName
	                });
	            }
	    }

	});

	// sku-uni图库btn @tusi #2015-09-21
	var UniImageDialog = React.createClass({
	    displayName: 'UniImageDialog',

	    getInitialState: function getInitialState() {
	        return {
	            orderCurIndex: 0
	        };
	    },

	    render: function render() {
	        var isChange = this.props.isChange;
	        return React.createElement(
	            'div',
	            { className: 'xd-btn helper unload-img-uni', onClick: this.getUniImgList },
	            isChange ? '上传uni图库图' : '更换uni图库图'
	        );
	    },

	    chooseImageFinish: function chooseImageFinish(item) {
	        Modal.close();
	        this.props.chooseImageFinish(item);
	    },
	    //读取uni图库数据
	    getUniImgList: function getUniImgList(moduleIndex) {
	        this.state.checkedImgList = [];
	        this.searchOrderList();
	    },
	    // 读取订单信息
	    searchOrderList: function searchOrderList() {
	        var $this = this,
	            state = $this.state;
	        var params = {};
	        var ajaxdata = [];
	        var orderCurIndex = state.orderCurIndex;

	        Action.getUniOrderList.call(this, params, function (json) {
	            $('body').css("overflow", "hidden");
	            var orderList = json.result.imgInfo.orders,
	                imgList = json.result.imgInfo.images;

	            for (var i = 0; i < imgList.length; i++) {
	                imgList[i].checkedState = false;
	                imgList[i].mouseOverState = false;
	                imgList[i].source = "uni";
	            }
	            var data = {
	                "orderImgList": imgList,
	                "orderImgCount": json.result.imgInfo.count
	            };
	            ajaxdata[0] = data;
	            Modal.open({
	                title: React.createElement(
	                    'div',
	                    null,
	                    React.createElement(
	                        'span',
	                        { className: 'uni_modalTitle' },
	                        'uni图库'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'uni_modalTip' },
	                        '全部来自uni图库的商品图，能直接打实拍标，并且图墙排序加权哦！'
	                    )
	                ),
	                body: React.createElement(
	                    'div',
	                    { className: 'uni-gallery' },
	                    React.createElement(
	                        'div',
	                        { className: 'uni-gallery-nav' },
	                        React.createElement(
	                            'div',
	                            { className: 'nav-title' },
	                            '图库订单'
	                        ),
	                        React.createElement(
	                            'ul',
	                            { className: 'nav-items', id: 'uniOrderNav' },
	                            orderList.length ? orderList.map(function (item, index) {
	                                return React.createElement(
	                                    'li',
	                                    { key: index, className: index == orderCurIndex ? "orderChecked" : "", onClick: $this.searchOrderData.bind(this, index, item.orderId) },
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        item.redsName
	                                    ),
	                                    React.createElement(
	                                        'span',
	                                        null,
	                                        item.created
	                                    )
	                                );
	                            }) : ''
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { id: 'uni-gallery-box' },
	                        React.createElement(UniImageWall, { chooseImageFinish: $this.chooseImageFinish })
	                    )
	                ),
	                beforeClose: function beforeClose() {
	                    $('body').css("overflow", "auto");
	                }
	            });
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderCurIndex: 0
	            });
	            this.setState({
	                ajaxdataOrigin: ajaxdata
	            });
	        }, function (data) {
	            var code = data.status.code;
	            if (code == 19100001) {
	                Modal.open({
	                    title: '',
	                    id: 'uniTip',
	                    body: React.createElement(
	                        'div',
	                        { className: 'dialog_download' },
	                        React.createElement('div', { className: 'dialog_close', onClick: Modal.close }),
	                        React.createElement('a', { className: 'dialog_link', href: 'http://www.mogujie.com/act/150813jiuzhi?source=50', target: '_blank', onClick: Modal.close })
	                    )
	                });
	            } else if (code == 19100002) {
	                Modal.open({
	                    title: '',
	                    id: 'uniTip',
	                    body: React.createElement(
	                        'div',
	                        { className: 'dialog_notUser' },
	                        React.createElement('div', { className: 'dialog_close', onClick: Modal.close }),
	                        React.createElement('a', { className: 'dialog_link', href: 'http://www.mogujie.com/act/150813jiuzhi?source=50', target: '_blank', onClick: Modal.close })
	                    )
	                });
	            } else if (code == 19100003) {
	                Modal.open({
	                    title: '',
	                    id: 'uniTip',
	                    body: React.createElement(
	                        'div',
	                        { className: 'dialog_user' },
	                        React.createElement('div', { className: 'dialog_close', onClick: Modal.close }),
	                        React.createElement('div', { className: 'dialog_sure', onClick: Modal.close })
	                    )
	                });
	            } else if (code == 4004) {
	                Modal.alert(data.result.message);
	            } else if (code == 19100010) {
	                Modal.alert('uni系统升级中，升级时间：2015.09.16 02:00-04:00');
	            }
	        });
	    },
	    // 读取订单下的图库数据
	    searchOrderData: function searchOrderData(index, id, event) {
	        this.setState({
	            orderCurIndex: index
	        });

	        $("#uniOrderNav").find("li").removeClass("orderChecked");
	        var obj = event.currentTarget;
	        obj.className = "orderChecked";
	        var ajaxdata = this.state.ajaxdataOrigin;
	        if (ajaxdata[index] != null) {
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderCurIndex: index
	            });
	            return;
	        }
	        var params = {
	            orderId: id
	        };
	        Action.getUniImgList.call(this, params, function (data) {
	            var imgCount = data.result.count;
	            var data = data.result.images;
	            for (var i = 0; i < data.length; i++) {
	                data[i].checkedState = false;
	                data[i].mouseOverState = false;
	                data[i].source = "uni";
	            }
	            ajaxdata[index] = {
	                "orderImgList": data,
	                "orderImgCount": imgCount
	            };
	            this.setState({
	                ajaxdataOrigin: ajaxdata
	            });
	            PubSub.publish('orderData.update', {
	                ajaxdata: ajaxdata,
	                orderCurIndex: index
	            });
	        });
	    }

	});

	// uni image wall @tusi #2015-09-21
	var UniImageWall = React.createClass({
	    displayName: 'UniImageWall',

	    getInitialState: function getInitialState() {
	        return {
	            ajaxdata: []
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('orderData.update', this.orderDataUpdate);
	    },
	    orderDataUpdate: function orderDataUpdate(topic, data, index) {
	        this.setState(data);
	    },
	    render: function render() {
	        var $this = this,
	            state = $this.state,
	            props = $this.props;

	        var orderCurIndex = state.orderCurIndex,
	            ajaxdata = state.ajaxdata;

	        var curajaxdata = ajaxdata[orderCurIndex];
	        if (curajaxdata) {
	            var data = curajaxdata["orderImgList"];
	            var imgCount = curajaxdata["orderImgCount"];
	        } else {
	            var data = [];
	            var imgCount = 0;
	        }

	        return React.createElement(
	            'div',
	            { className: 'uni-gallery-cont' },
	            React.createElement(
	                'div',
	                { className: 'cont-imgInfo' },
	                React.createElement(
	                    'div',
	                    { className: 'cont-capacity' },
	                    '共有',
	                    imgCount,
	                    '张精修片'
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'cont-imgWall' },
	                    data.length > 0 ? data.map(function (item, index) {
	                        var width = parseInt(item.wide),
	                            height = parseInt(item.length);
	                        if (width / 100 >= height / 150) {
	                            var curStyle = {
	                                width: "100px",
	                                height: "auto",
	                                "margin-top": (150 - height / (width / 100)) / 2 + "px"
	                            };
	                        } else {
	                            var curStyle = {
	                                width: "auto",
	                                height: "150px",
	                                "margin-left": (100 - width / (height / 150)) / 2 + "px"
	                            };
	                        }
	                        return React.createElement(
	                            'li',
	                            { key: index, onClick: props.chooseImageFinish.bind($this, item) },
	                            React.createElement(
	                                'div',
	                                { className: 'imgArea' },
	                                React.createElement('img', { style: curStyle, src: item.wholePath + '_220x330.jpg', 'data-id': item.id })
	                            ),
	                            React.createElement(
	                                'div',
	                                { className: 'title' },
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    item.title
	                                )
	                            )
	                        );
	                    }) : ''
	                )
	            )
	        );
	    }
	});

	module.exports = SkuImage;

/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);
	var SKU = __webpack_require__(173);

	// sku选项
	var SkuOption = React.createClass({
	    displayName: 'SkuOption',

	    getInitialState: function getInitialState() {
	        return {
	            oneSkuOptionData: {},
	            twoSkuOptionData: {},
	            style: '',
	            size: '',
	            skuType: 0
	        };
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            oneSkuOptionData: props.oneSkuOptionData,
	            twoSkuOptionData: props.twoSkuOptionData,
	            style: props.data.style,
	            size: props.data.size,
	            skuType: props.data.skuType
	        });
	        this.skuTypeUpdate(props.data.skuType, props.oneSkuOptionData, props.twoSkuOptionData);
	    },
	    // 选择sku类型回调
	    selectSkuTypeUpdate: function selectSkuTypeUpdate(msg, data) {
	        this.skuTypeUpdate(data.skuType, data.oneSkuOptionData, data.twoSkuOptionData);
	    },
	    // sku类型更新
	    skuTypeUpdate: function skuTypeUpdate(skuType, oneSkuOptionData, twoSkuOptionData) {
	        switch (skuType) {
	            case 1:
	                this.singleSkuUpdate(oneSkuOptionData, skuType);break;
	            case 2:
	                this.doubleSkuUpdate(twoSkuOptionData, skuType);break;
	        }
	    },
	    singleSkuUpdate: function singleSkuUpdate(oneSkuOptionData, skuType) {

	        // 隐藏选项
	        this.refs.specList.getDOMNode().style.display = 'block';
	        this.refs.styleList.getDOMNode().style.display = 'none';
	        this.refs.sizeList.getDOMNode().style.display = 'none';
	    },
	    doubleSkuUpdate: function doubleSkuUpdate(twoSkuOptionData, skuType) {

	        // 显示选项
	        this.refs.specList.getDOMNode().style.display = 'none';
	        this.refs.styleList.getDOMNode().style.display = 'block';
	        this.refs.sizeList.getDOMNode().style.display = 'block';
	    },
	    // 在挂载结束之后马上被调用
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('selectSkuType.update', this.selectSkuTypeUpdate);
	    },
	    // 选择规格
	    selectSpec: function selectSpec(checked, index, event) {
	        var oneSkuOptionData = this.state.oneSkuOptionData;
	        oneSkuOptionData.styles[index].checked = !checked;
	        this.setState({
	            oneSkuOptionData: oneSkuOptionData
	        });

	        PubSub.publish('selectSpec.update', {
	            oneSkuOptionData: oneSkuOptionData,
	            style: oneSkuOptionData.styles[index].style,
	            checked: !checked
	        });
	    },
	    // 添加规格选项
	    addSpecOption: function addSpecOption() {
	        var specName = this.refs.specName.getDOMNode().value;
	        if (!specName.length || specName == '') {
	            Modal.alert('请输入名称');
	            return;
	        }

	        // 合并数据
	        var oneSkuOptionData = this.state.oneSkuOptionData;

	        // 是否有重复选项
	        var isRepeat = false;
	        oneSkuOptionData.styles.length && _.map(oneSkuOptionData.styles, function (item, i) {
	            if (specName == item.style) {
	                isRepeat = true;
	            }
	        });

	        if (isRepeat) {
	            Modal.alert('请不要重复添加');
	            return;
	        }

	        oneSkuOptionData.styles.push({
	            style: specName,
	            image: '',
	            checked: true
	        });

	        this.setState({
	            oneSkuOptionData: oneSkuOptionData
	        });

	        PubSub.publish('selectSpec.update', {
	            oneSkuOptionData: oneSkuOptionData,
	            style: specName,
	            checked: true
	        });
	        this.refs.specName.getDOMNode().value = '';
	    },
	    // 选择颜色
	    selectStyle: function selectStyle(checked, index, event) {
	        var twoSkuOptionData = this.state.twoSkuOptionData;
	        twoSkuOptionData.styles[index].checked = !checked;
	        this.setState({
	            twoSkuOptionData: twoSkuOptionData
	        });

	        PubSub.publish('selectStyle.update', {
	            twoSkuOptionData: twoSkuOptionData,
	            style: twoSkuOptionData.styles[index].style,
	            checked: !checked
	        });
	    },
	    // 添加颜色选项
	    addStyleOption: function addStyleOption() {
	        var styleName = this.refs.styleName.getDOMNode().value;
	        if (!styleName.length || styleName == '') {
	            Modal.alert('请输入名称');
	            return;
	        }

	        // 合并数据
	        var twoSkuOptionData = this.state.twoSkuOptionData;

	        // 是否有重复选项
	        var isRepeat = false;
	        twoSkuOptionData.styles.length && _.map(twoSkuOptionData.styles, function (item, i) {
	            if (styleName == item.style) {
	                isRepeat = true;
	            }
	        });

	        if (isRepeat) {
	            Modal.alert('请不要重复添加');
	            return;
	        }

	        twoSkuOptionData.styles.push({
	            style: styleName,
	            image: '',
	            checked: true
	        });

	        this.setState({
	            twoSkuOptionData: twoSkuOptionData
	        });

	        PubSub.publish('selectStyle.update', {
	            twoSkuOptionData: twoSkuOptionData,
	            style: styleName,
	            checked: true
	        });
	        this.refs.styleName.getDOMNode().value = '';
	    },
	    // 选择尺码
	    selectSize: function selectSize(checked, index, event) {
	        var twoSkuOptionData = this.state.twoSkuOptionData;
	        twoSkuOptionData.sizes[index].checked = !checked;
	        this.setState({
	            twoSkuOptionData: twoSkuOptionData
	        });

	        PubSub.publish('selectSize.update', {
	            twoSkuOptionData: twoSkuOptionData,
	            size: twoSkuOptionData.sizes[index].size,
	            checked: !checked
	        });
	    },
	    // 添加尺码选项
	    addSizeOption: function addSizeOption() {
	        var sizeName = this.refs.sizeName.getDOMNode().value;
	        if (!sizeName.length || sizeName == '') {
	            Modal.alert('请输入名称');
	            return;
	        }

	        // 合并数据
	        var twoSkuOptionData = this.state.twoSkuOptionData;

	        // 是否有重复选项
	        var isRepeat = false;
	        twoSkuOptionData.sizes.length && _.map(twoSkuOptionData.sizes, function (item, i) {
	            if (sizeName == item.size) {
	                isRepeat = true;
	            }
	        });

	        if (isRepeat) {
	            Modal.alert('请不要重复添加');
	            return;
	        }

	        twoSkuOptionData.sizes.push({
	            size: sizeName,
	            checked: true
	        });

	        this.setState({
	            twoSkuOptionData: twoSkuOptionData
	        });
	        PubSub.publish('selectSize.update', {
	            twoSkuOptionData: twoSkuOptionData,
	            size: sizeName,
	            checked: true
	        });
	        this.refs.sizeName.getDOMNode().value = '';
	    },
	    render: function render() {
	        var oneSkuOptionData = this.state.oneSkuOptionData || {};
	        var twoSkuOptionData = this.state.twoSkuOptionData || {};
	        var oneStyles = oneSkuOptionData.styles || [];
	        var twoStyles = twoSkuOptionData.styles || [];
	        var twoSizes = twoSkuOptionData.sizes || [];

	        var cx = React.addons.classSet;
	        var skuDataClass = cx({
	            'sku-data': true,
	            'hide': this.props.isActivity
	        });

	        return React.createElement(
	            'div',
	            { className: skuDataClass },
	            React.createElement(
	                'div',
	                { ref: 'specList', className: 'spec-list list clearfix' },
	                React.createElement(
	                    'label',
	                    { className: 'fl' },
	                    oneSkuOptionData.styleName
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'fl' },
	                    oneStyles.length ? oneStyles.map((function (item, i) {
	                        var cx = React.addons.classSet;
	                        var classes = cx({
	                            'xd-tag': true,
	                            'xd-tag c': item.checked
	                        });
	                        return React.createElement(
	                            'li',
	                            { className: classes, onClick: this.selectSpec.bind(this, item.checked, i) },
	                            item.style
	                        );
	                    }).bind(this)) : '',
	                    React.createElement(
	                        'li',
	                        { className: 'sku-add' },
	                        React.createElement('input', { ref: 'specName', type: 'text', className: 'add-text xd-input primary' }),
	                        React.createElement(
	                            'a',
	                            { className: 'add-btn', onClick: this.addSpecOption },
	                            '添加'
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { ref: 'styleList', className: 'style-list list clearfix' },
	                React.createElement(
	                    'label',
	                    { className: 'fl' },
	                    twoSkuOptionData.styleName
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'fl' },
	                    twoStyles.length ? twoStyles.map((function (item, i) {
	                        var cx = React.addons.classSet;
	                        var classes = cx({
	                            'xd-tag': true,
	                            'xd-tag c': item.checked
	                        });
	                        return React.createElement(
	                            'li',
	                            { className: classes, onClick: this.selectStyle.bind(this, item.checked, i) },
	                            item.style
	                        );
	                    }).bind(this)) : '',
	                    React.createElement(
	                        'li',
	                        { className: 'sku-add' },
	                        React.createElement('input', { ref: 'styleName', type: 'text', className: 'add-text xd-input primary' }),
	                        React.createElement(
	                            'a',
	                            { className: 'add-btn', onClick: this.addStyleOption },
	                            '添加'
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                'div',
	                { ref: 'sizeList', className: 'size-list list clearfix' },
	                React.createElement(
	                    'label',
	                    { className: 'fl' },
	                    twoSkuOptionData.sizeName
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'fl' },
	                    twoSizes.length ? twoSizes.map((function (item, i) {
	                        var cx = React.addons.classSet;
	                        var classes = cx({
	                            'xd-tag': true,
	                            'xd-tag c': item.checked
	                        });
	                        return React.createElement(
	                            'li',
	                            { className: classes, onClick: this.selectSize.bind(this, item.checked, i) },
	                            item.size
	                        );
	                    }).bind(this)) : '',
	                    React.createElement(
	                        'li',
	                        { className: 'sku-add' },
	                        React.createElement('input', { ref: 'sizeName', type: 'text', className: 'add-text xd-input primary' }),
	                        React.createElement(
	                            'a',
	                            { className: 'add-btn', onClick: this.addSizeOption },
	                            '添加'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = SkuOption;

/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var SKU = __webpack_require__(173);
	var Modal = __webpack_require__(21);
	var Validator = __webpack_require__(174);

	// sku表格
	var SkuTable = React.createClass({
	    displayName: 'SkuTable',

	    statics: {
	        self: null,
	        isShowVolumeWeight: false,
	        getData: function getData() {
	            var state = SkuTable.self.state;
	            var skuType = state.skuType;
	            var oneSkuData = state.oneSkuData || [];
	            var twoSkuData = state.twoSkuData || [];
	            var skuSetting = SkuTable.self.props.data;

	            // 重构数据，兼容老后台保存数据
	            var result = {
	                sku: [],
	                skuImgInfo: [],
	                skuType: skuType
	            };

	            // 如果不设置规格
	            if (skuType == 0) {
	                if (skuSetting.skuType == 0) {
	                    var defaultSku = {};
	                    if (skuSetting.skuData && skuSetting.skuData.length) {
	                        defaultSku['id'] = skuSetting.skuData[0].stockId || '';
	                    }
	                    result.sku.push(JSON.stringify(defaultSku));
	                }
	                return result;
	            }

	            // 如果是单层规格
	            if (skuType == 1) {
	                oneSkuData.length && _.map(oneSkuData, function (sku, i) {
	                    var oneSku = {};
	                    oneSku[skuSetting.one.style.name] = sku.style;
	                    oneSku['id'] = sku.stockId || '';
	                    oneSku['stock'] = sku.stock || 0;
	                    oneSku['price'] = sku.price || 0;
	                    oneSku['code'] = sku.code || '';
	                    oneSku['volume'] = sku.volume || '';
	                    oneSku['weight'] = sku.weight || '';
	                    oneSku['img'] = sku.image ? sku.image + '_100x100.jpg+++' + XD.Util.filterOriPath(sku.image) : '';
	                    result.sku.push(JSON.stringify(oneSku));

	                    // sku图片数据
	                    var oneSkuImgInfo = {};
	                    oneSkuImgInfo[skuSetting.one.style.name] = sku.style;
	                    oneSkuImgInfo['img'] = sku.image ? XD.Util.filterOriPath(sku.image) : '';
	                    result.skuImgInfo.push(JSON.stringify(oneSkuImgInfo));
	                });

	                // 如果是双层规格
	            } else if (skuType == 2) {
	                    twoSkuData.length && _.map(twoSkuData, function (sku, i) {
	                        var twoSku = {};
	                        twoSku[skuSetting.two.style.name] = sku.style;
	                        twoSku[skuSetting.two.size.name] = sku.size;
	                        twoSku['id'] = sku.stockId || '';
	                        twoSku['stock'] = sku.stock || 0;
	                        twoSku['price'] = sku.price || 0;
	                        twoSku['code'] = sku.code || '';
	                        twoSku['volume'] = sku.volume || '';
	                        twoSku['weight'] = sku.weight || '';
	                        // 传给了一个相对路径和绝对路径
	                        twoSku['img'] = sku.image ? sku.image + '_100x100.jpg+++' + XD.Util.filterOriPath(sku.image) : '';
	                        // 只传递绝对路径
	                        // twoSku['img'] = sku.image ;
	                        result.sku.push(JSON.stringify(twoSku));

	                        // sku图片数据
	                        var twoSkuImgInfo = {};
	                        twoSkuImgInfo[skuSetting.two.style.name] = sku.style;
	                        twoSkuImgInfo['img'] = sku.image ? XD.Util.filterOriPath(sku.image) : '';
	                        result.skuImgInfo.push(JSON.stringify(twoSkuImgInfo));
	                    });
	                }

	            return result;
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            oneSkuData: [],
	            twoSkuData: [],
	            skuType: 0,
	            isShowTable: true,
	            isShowSize: true
	        };
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        var skuData = props.skuData || [];
	        var skuType = props.data.skuType;

	        if (skuType == 1) {
	            this.setState({
	                oneSkuData: skuData,
	                skuType: skuType,
	                isShowSize: false,
	                isShowTable: skuData.length > 0
	            });
	        } else if (skuType == 2) {
	            this.setState({
	                twoSkuData: skuData,
	                skuType: skuType,
	                isShowSize: true,
	                isShowTable: skuData.length > 0
	            });
	        }
	    },
	    // 选择sku类型回调
	    selectSkuTypeUpdate: function selectSkuTypeUpdate(msg, data) {
	        this.skuTypeUpdate(data.skuType, data.oneSkuOptionData, data.twoSkuOptionData);
	        this.setState({
	            skuType: data.skuType
	        });
	    },
	    // sku类型更新
	    skuTypeUpdate: function skuTypeUpdate(skuType, oneSkuOptionData, twoSkuOptionData) {
	        switch (skuType) {
	            case 1:
	                this.singleSkuUpdate(oneSkuOptionData, skuType);break;
	            case 2:
	                this.doubleSkuUpdate(twoSkuOptionData, skuType);break;
	        }
	    },
	    // 单层sku
	    singleSkuUpdate: function singleSkuUpdate(oneSkuOptionData, skuType) {
	        var newSkuData = this.state.oneSkuData || [];

	        if (!newSkuData.length) {
	            // 重构颜色数据
	            _.map(oneSkuOptionData.styles, function (style) {
	                if (style.checked) {
	                    newSkuData.push({
	                        style: style.style,
	                        image: style.image,
	                        price: '',
	                        stock: '',
	                        code: '',
	                        volume: '',
	                        weight: '',
	                        stockId: ''
	                    });
	                }
	            });
	        }

	        this.setState({
	            isShowTable: newSkuData.length > 0,
	            isShowSize: false,
	            oneSkuData: newSkuData,
	            skuType: skuType
	        });
	    },
	    // 双层sku
	    doubleSkuUpdate: function doubleSkuUpdate(twoSkuOptionData, skuType) {
	        var sizeLen = 0;
	        _.map(twoSkuOptionData.sizes, function (size) {
	            if (size.checked) {
	                sizeLen++;
	            }
	        });

	        // 如果没有选择尺码，隐藏表格
	        if (!sizeLen) {
	            this.setState({
	                isShowTable: false
	            });
	        } else {
	            var newSkuData = this.state.twoSkuData;
	            if (!newSkuData.length) {
	                // 如果有尺码，重构双层sku数据
	                _.map(twoSkuOptionData.styles, function (style, i) {
	                    _.map(twoSkuOptionData.sizes, function (size, i) {
	                        if (style.checked && size.checked) {
	                            newSkuData.push({
	                                style: style.style,
	                                size: size.size,
	                                image: style.image,
	                                price: '',
	                                stock: '',
	                                code: '',
	                                volume: '',
	                                weight: '',
	                                stockId: ''
	                            });
	                        }
	                    });
	                });
	            }

	            this.setState({
	                isShowTable: sizeLen > 0,
	                isShowSize: true,
	                twoSkuData: newSkuData,
	                skuType: skuType
	            });
	        }
	    },

	    // 选择规格回调
	    selectSpecUpdate: function selectSpecUpdate(msg, data) {
	        var newSkuData = this.state.oneSkuData || [];

	        // 如果选中
	        if (data.checked) {
	            newSkuData.push({
	                style: data.style,
	                image: '',
	                price: 0,
	                stock: 0,
	                code: '',
	                volume: '',
	                weight: '',
	                stockId: ''
	            });
	        } else {
	            var _newSkuData = [];
	            _.map(newSkuData, function (sku, i) {
	                if (sku.style && sku.style != data.style) {
	                    _newSkuData.push(sku);;
	                }
	            });
	            newSkuData = _newSkuData;
	        }

	        this.setState({
	            isShowTable: newSkuData.length > 0,
	            oneSkuData: newSkuData
	        });
	    },

	    // 选择颜色回调
	    selectStyleUpdate: function selectStyleUpdate(msg, data) {
	        var newSkuData = this.state.twoSkuData || [];

	        var sizeLen = 0;
	        _.map(newSkuData, function (sku) {
	            if (sku.size) {
	                sizeLen++;
	            }
	        });

	        // 如果选中
	        if (data.checked) {
	            var sizeLen = 0;
	            // 如果有尺码
	            _.map(data.twoSkuOptionData.sizes, function (item, i) {
	                if (item.checked) {
	                    newSkuData.push({
	                        style: data.style,
	                        size: item.size,
	                        image: '',
	                        price: 0,
	                        stock: 0,
	                        code: '',
	                        volume: '',
	                        weight: '',
	                        stockId: ''
	                    });
	                    sizeLen++;
	                }
	            });

	            // 如果没有尺码
	            if (!sizeLen) {
	                newSkuData.push({
	                    style: data.style,
	                    image: '',
	                    price: 0,
	                    stock: 0,
	                    code: '',
	                    volume: '',
	                    weight: '',
	                    stockId: ''
	                });
	            }
	        } else {
	            var _newSkuData = [];
	            _.map(newSkuData, function (sku, i) {
	                if (sku.style && sku.style != data.style) {
	                    _newSkuData.push(sku);;
	                }
	            });
	            newSkuData = _newSkuData;
	        }

	        this.setState({
	            twoSkuData: newSkuData
	        });
	    },

	    // 选择尺码回调
	    selectSizeUpdate: function selectSizeUpdate(msg, data) {
	        var newSkuData = [];
	        var twoSkuData = this.state.twoSkuData || [];
	        var styles = data.twoSkuOptionData.styles || [];
	        var sizes = data.twoSkuOptionData.sizes || [];

	        // 重构数据
	        styles.length && _.map(styles, function (style, i) {
	            sizes.length && _.map(sizes, function (size, j) {
	                if (style.checked && size.checked) {

	                    var price = '',
	                        stock = '',
	                        code = '',
	                        volume = '',
	                        weight = '',
	                        stockId = '';
	                    // 寻找原数据
	                    _.map(twoSkuData, function (sku, k) {
	                        if (sku.style == style.style && sku.size == size.size) {
	                            price = sku.price;
	                            stock = sku.stock;
	                            code = sku.code;
	                            volume = sku.volume || '';
	                            weight = sku.weight || '';
	                            stockId = sku.stockId;
	                        }
	                    });

	                    newSkuData.push({
	                        style: style.style,
	                        size: size.size,
	                        image: style.image,
	                        price: price,
	                        stock: stock,
	                        code: code,
	                        volume: volume,
	                        weight: weight,
	                        stockId: stockId
	                    });
	                }
	            });
	        });

	        this.setState({
	            isShowTable: this.state.skuType > 0,
	            isShowSize: this.state.skuType == 2,
	            twoSkuData: newSkuData
	        });
	    },
	    // 值改变
	    valueChange: function valueChange(key, index, event) {
	        var skuType = this.state.skuType;
	        var value = event.target.value;
	        var skuData = [];

	        // 如果价格变化
	        if (key == 'price') {
	            // 如果价格不是数字
	            if (isNaN(value)) {
	                Modal.alert('请填写正确的价格');
	                return;
	            }
	        }

	        // 如果库存变化
	        if (key == 'stock') {

	            // 如果库存不是数字
	            if (isNaN(value)) {
	                Modal.alert('请填写正确的库存');
	                return;
	            }
	        }

	        // 如果是单层规格
	        if (skuType == 1) {
	            skuData = this.state.oneSkuData;
	            skuData[index][key] = value;

	            this.setState({
	                oneSkuData: skuData
	            });
	            // 如果是双层规格
	        } else if (skuType == 2) {
	                skuData = this.state.twoSkuData;
	                skuData[index][key] = value;
	                this.setState({
	                    twoSkuData: skuData
	                });
	            }

	        // 收集价格和库存
	        var prices = [],
	            stocks = [];
	        skuData.length && _.map(skuData, function (item, i) {
	            prices.push(+item.price);
	            stocks.push(+item.stock);
	        });

	        PubSub.publish('priceStock.update', {
	            prices: prices,
	            stocks: stocks
	        });
	    },
	    // 上传sku图片回调
	    uploadSkuImageUpdate: function uploadSkuImageUpdate(msg, data) {
	        var skuType = this.state.skuType;
	        if (skuType == 1) {
	            var oneSkuData = this.state.oneSkuData;
	            _.map(oneSkuData, function (item, i) {
	                if (item.style == data.styleName) {
	                    item.image = data.image;
	                }
	            });
	            this.setState({
	                oneSkuData: oneSkuData
	            });
	        } else if (skuType == 2) {
	            var twoSkuData = this.state.twoSkuData;
	            _.map(twoSkuData, function (item, i) {
	                if (item.style == data.styleName) {
	                    item.image = data.image;
	                }
	            });
	            this.setState({
	                twoSkuData: twoSkuData
	            });
	        }
	    },
	    // 在挂载结束之后马上被调用
	    componentDidMount: function componentDidMount() {
	        SkuTable.self = this;
	        PubSub.subscribe('selectStyle.update', this.selectStyleUpdate);
	        PubSub.subscribe('selectSize.update', this.selectSizeUpdate);
	        PubSub.subscribe('selectSpec.update', this.selectSpecUpdate);
	        PubSub.subscribe('selectSkuType.update', this.selectSkuTypeUpdate);
	        PubSub.subscribe('uploadSkuImage.update', this.uploadSkuImageUpdate);
	    },
	    // 自动填充
	    autoFill: function autoFill() {
	        var stock = XD.Util.trim(this.refs.stock.getDOMNode().value);
	        var price = XD.Util.trim(this.refs.price.getDOMNode().value);

	        var volume = '';
	        if (this.refs.volume) {
	            volume = XD.Util.trim(this.refs.volume.getDOMNode().value);
	        };

	        var weight = '';
	        if (this.refs.weight) {
	            weight = XD.Util.trim(this.refs.weight.getDOMNode().value);
	        };
	        var skuType = this.state.skuType;

	        // 验证库存
	        if (stock != '' && !Validator.checkStock(stock)) {
	            return;
	        }

	        // 验证价格
	        if (price != '' && !Validator.checkPrice(price)) {
	            return;
	        }

	        // 如果体积不为空
	        if (volume != '' && !Validator.checkVolume(volume)) {
	            return;
	        }

	        // 如果重量不为空
	        if (weight != '' && !Validator.checkWeight(weight)) {
	            return;
	        }

	        if (skuType == 1) {
	            var oneSkuData = this.state.oneSkuData;
	            _.map(oneSkuData, function (sku, i) {
	                stock != '' ? sku.stock = ~ ~stock : '';
	                price != '' ? sku.price = price : '';
	                volume != '' ? sku.volume = volume : '';
	                weight != '' ? sku.weight = weight : '';
	            });

	            this.setState({
	                oneSkuData: oneSkuData
	            });

	            stock != '' && PubSub.publish('autoFillStock.update', { stock: stock * oneSkuData.length });
	            price != '' && PubSub.publish('autoFillPrice.update', { price: price });
	        } else if (skuType == 2) {
	            var twoSkuData = this.state.twoSkuData;
	            _.map(twoSkuData, function (sku, i) {
	                stock != '' ? sku.stock = ~ ~stock : '';
	                price != '' ? sku.price = price : '';
	                volume != '' ? sku.volume = volume : '';
	                weight != '' ? sku.weight = weight : '';
	            });

	            this.setState({
	                twoSkuData: twoSkuData
	            });

	            stock != '' && PubSub.publish('autoFillStock.update', { stock: stock * twoSkuData.length });
	            price != '' && PubSub.publish('autoFillPrice.update', { price: price });
	        }
	    },
	    render: function render() {
	        var skuSetting = this.props.data || {};
	        var skuType = this.state.skuType;
	        var skuData = [],
	            styleName = '',
	            sizeName = '';
	        if (skuType == 1) {
	            skuData = this.state.oneSkuData || [];
	            styleName = skuSetting.one.style.name || '';
	        } else if (skuType == 2) {
	            skuData = this.state.twoSkuData || [];
	            styleName = skuSetting.two.style.name || '';
	            sizeName = skuSetting.two.size.name || '';
	        }
	        var cx = React.addons.classSet;
	        var classes = cx({
	            'sku-table': true,
	            'sku-table hide': !this.state.isShowTable || !skuType
	        });

	        // 是否需要显示体积和重量
	        var isShowVolumeWeight = SkuTable.isShowVolumeWeight;
	        isShowVolumeWeight = false; // 暂时不针对SKU级别，不显示

	        return React.createElement(
	            'div',
	            { className: classes },
	            React.createElement(
	                'table',
	                { className: 'xd-table' },
	                React.createElement(
	                    'thead',
	                    null,
	                    React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                            'td',
	                            { className: 'style' },
	                            styleName
	                        ),
	                        this.state.isShowSize && React.createElement(
	                            'td',
	                            { className: 'size' },
	                            sizeName
	                        ),
	                        React.createElement(
	                            'td',
	                            { className: 'stock' },
	                            '库存'
	                        ),
	                        React.createElement(
	                            'td',
	                            { className: 'price' },
	                            '价格'
	                        ),
	                        React.createElement(
	                            'td',
	                            { className: 'code' },
	                            '编码'
	                        ),
	                        isShowVolumeWeight ? React.createElement(
	                            'td',
	                            { className: 'volume' },
	                            '体积（m3）'
	                        ) : null,
	                        isShowVolumeWeight ? React.createElement(
	                            'td',
	                            { className: 'weight' },
	                            '重量（kg）'
	                        ) : null
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    skuData.length ? skuData.map((function (item, index) {
	                        return React.createElement(
	                            'tr',
	                            null,
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    { className: 'style-text' },
	                                    item.style || ''
	                                )
	                            ),
	                            this.state.isShowSize && React.createElement(
	                                'td',
	                                null,
	                                React.createElement(
	                                    'span',
	                                    { className: 'size-text' },
	                                    item.size || ''
	                                )
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement('input', { type: 'text', className: 'stock-text xd-input primary', value: item.stock, onChange: this.valueChange.bind(this, 'stock', index) })
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement('input', { type: 'text', className: 'price-text xd-input primary', value: item.price, onChange: this.valueChange.bind(this, 'price', index) })
	                            ),
	                            React.createElement(
	                                'td',
	                                null,
	                                React.createElement('input', { type: 'text', className: 'code-text xd-input primary', value: item.code || '', onChange: this.valueChange.bind(this, 'code', index) })
	                            ),
	                            isShowVolumeWeight ? React.createElement(
	                                'td',
	                                null,
	                                React.createElement('input', { type: 'text', className: 'volume-text xd-input primary', value: item.volume || '', onChange: this.valueChange.bind(this, 'volume', index) })
	                            ) : null,
	                            isShowVolumeWeight ? React.createElement(
	                                'td',
	                                null,
	                                React.createElement('input', { type: 'text', className: 'weight-text xd-input primary', value: item.weight || '', onChange: this.valueChange.bind(this, 'weight', index) })
	                            ) : null
	                        );
	                    }).bind(this)) : null
	                )
	            ),
	            React.createElement(
	                'div',
	                { className: 'auto-fill' },
	                '一键填写： 库存 ',
	                React.createElement('input', { ref: 'stock', type: 'text', className: 'stock xd-input primary' }),
	                '  价格 ',
	                React.createElement('input', { ref: 'price', type: 'text', className: 'price xd-input primary' }),
	                '  ',
	                isShowVolumeWeight ? React.createElement(
	                    'span',
	                    null,
	                    '体积 ',
	                    React.createElement('input', { ref: 'volume', type: 'text', className: 'volume xd-input primary' })
	                ) : null,
	                '  ',
	                isShowVolumeWeight ? React.createElement(
	                    'span',
	                    null,
	                    '重量 ',
	                    React.createElement('input', { ref: 'weight', type: 'text', className: 'weight xd-input primary' })
	                ) : null,
	                '  ',
	                React.createElement(
	                    'a',
	                    { className: 'ok-btn xd-btn helper', onClick: this.autoFill },
	                    '添加'
	                )
	            )
	        );
	    }
	});

	module.exports = SkuTable;

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	// sku类型
	var SkuType = React.createClass({
	    displayName: 'SkuType',

	    getInitialState: function getInitialState() {
	        return {
	            oneSkuOptionData: {},
	            twoSkuOptionData: {},
	            skuType: 0
	        };
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            oneSkuOptionData: props.oneSkuOptionData,
	            twoSkuOptionData: props.twoSkuOptionData,
	            skuType: props.skuType
	        });
	    },
	    // 选择sku类型
	    skuTypeChange: function skuTypeChange(skuType, event) {
	        console.log(skuType);
	        this.setState({
	            skuType: skuType
	        });

	        PubSub.publish('selectSkuType.update', {
	            oneSkuOptionData: this.state.oneSkuOptionData,
	            twoSkuOptionData: this.state.twoSkuOptionData,
	            skuType: skuType
	        });
	    },
	    // 上传sku图片回调
	    uploadSkuImageUpdate: function uploadSkuImageUpdate(msg, data) {
	        if (data.skuType == 1) {
	            this.setState({ oneSkuOptionData: data.skuOptionData });
	        } else if (data.skuType == 2) {
	            this.setState({ twoSkuOptionData: data.skuOptionData });
	        }
	    },
	    // 在挂载结束之后马上被调用
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('uploadSkuImage.update', this.uploadSkuImageUpdate);
	    },
	    render: function render() {
	        var skuType = this.state.skuType;
	        var classes = {
	            className0: 'xd-tag',
	            className1: 'xd-tag',
	            className2: 'xd-tag'
	        };
	        classes['className' + skuType] += ' c';
	        return React.createElement(
	            'div',
	            { className: 'tabs' },
	            React.createElement(
	                'div',
	                { className: 'clearfix' },
	                React.createElement(
	                    'a',
	                    { href: 'javascript:;', className: classes.className0, onClick: this.skuTypeChange.bind(this, 0) },
	                    '默认规格'
	                ),
	                React.createElement(
	                    'a',
	                    { href: 'javascript:;', className: classes.className1, onClick: this.skuTypeChange.bind(this, 1) },
	                    '单层规格'
	                ),
	                React.createElement(
	                    'a',
	                    { href: 'javascript:;', className: classes.className2, onClick: this.skuTypeChange.bind(this, 2) },
	                    '双层规格'
	                )
	            )
	        );
	    }
	});

	module.exports = SkuType;

/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var SkuType = __webpack_require__(204);
	var SkuOption = __webpack_require__(202);
	var SkuImage = __webpack_require__(201);
	var SkuTable = __webpack_require__(203);
	var SKU = __webpack_require__(173);

	var SkuSetting = React.createClass({
	    displayName: 'SkuSetting',

	    statics: {
	        getData: function getData() {
	            return SkuTable.getData();
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            skuSetting: {},
	            skuType: 0
	        };
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            skuSetting: props.data,
	            skuType: props.data.skuType
	        });

	        SkuTable.isShowVolumeWeight = props.isShowVolumeWeight;
	    },
	    selectSkuTypeUpdate: function selectSkuTypeUpdate(msg, data) {
	        this.switchSkuSetting(data.skuType);
	    },
	    switchSkuSetting: function switchSkuSetting(skuType) {
	        var className = !skuType ? 'setting-content hide' : 'setting-content';
	        this.refs.settingContent.getDOMNode().className = className;
	    },
	    // 在挂载结束之后马上被调用
	    componentDidMount: function componentDidMount() {
	        PubSub.subscribe('selectSkuType.update', this.selectSkuTypeUpdate);
	    },
	    render: function render() {
	        var skuSetting = this.state.skuSetting;
	        var skuType = this.state.skuType;
	        var oneSkuData = skuSetting.one || {};
	        var twoSkuData = skuSetting.two || {};
	        var skuData = skuSetting.skuData || [];
	        var oneSkuOptionData = SKU.getOneSkuOptions(oneSkuData, skuData, skuType);
	        var twoSkuOptionData = SKU.getTwoSkuOptions(twoSkuData, skuData, skuType);

	        // 如果是活动商品 && 编辑商品中
	        var isActivity = this.props.isActivityItem && this.props.isEditPage;

	        var cx = React.addons.classSet;
	        var settingContentClassName = cx({
	            'setting-content': true,
	            'hide': !skuType && !isActivity
	        });

	        return React.createElement(
	            'div',
	            { className: 'sku-setting' },
	            isActivity ? null : React.createElement(SkuType, { skuType: skuType, oneSkuOptionData: oneSkuOptionData, twoSkuOptionData: twoSkuOptionData }),
	            React.createElement(
	                'div',
	                { ref: 'settingContent', className: settingContentClassName },
	                React.createElement(SkuOption, { isActivity: isActivity, data: skuSetting, oneSkuOptionData: oneSkuOptionData, twoSkuOptionData: twoSkuOptionData }),
	                isActivity ? React.createElement(
	                    'p',
	                    { className: 'high mt10 mb10' },
	                    this.props.activityMsg
	                ) : null,
	                React.createElement(
	                    'div',
	                    { className: 'sku-other' },
	                    React.createElement(
	                        'div',
	                        { className: 'img-list' },
	                        React.createElement(SkuImage, { data: skuSetting, oneSkuOptionData: oneSkuOptionData, twoSkuOptionData: twoSkuOptionData, skuData: skuData })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'sku-meta' },
	                        React.createElement(SkuTable, { data: skuSetting, oneSkuOptionData: oneSkuOptionData, twoSkuOptionData: twoSkuOptionData, skuData: skuData })
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = SkuSetting;

/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var SkuTable = __webpack_require__(203);
	var Modal = __webpack_require__(21);

	var Stock = React.createClass({
	    displayName: 'Stock',

	    statics: {
	        self: null,
	        value: '',
	        getData: function getData() {
	            return Stock.self.state.stock || '';
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            stock: '',
	            tip: ''
	        };
	    },
	    // 值改变
	    valueChange: function valueChange(event) {
	        var value = event.target.value;

	        var tip = '';
	        if (value != '') {
	            if (isNaN(value) || value <= 0) {
	                tip = '请填写正确的库存，库存只能是大于0的正整数';
	            }
	        }

	        this.setState({
	            stock: value,
	            tip: tip
	        });

	        Stock.value = value;
	    },
	    // 选择sku类型回调
	    selectSkuTypeUpdate: function selectSkuTypeUpdate(msg, data) {
	        // 如果不设置规格
	        if (data.skuType == 0) {
	            var stock = Stock.value || '';
	            this.refs.stock.getDOMNode().removeAttribute('disabled');
	            this.refs.stock.getDOMNode().value = stock;
	            this.setState({ stock: stock });
	        } else {
	            this.refs.stock.getDOMNode().setAttribute('disabled', 'disabled');

	            // 回显库存
	            var skuData = [];
	            if (data.skuType == 1) {
	                skuData = SkuTable.self.state.oneSkuData;
	            } else if (data.skuType == 2) {
	                skuData = SkuTable.self.state.twoSkuData;
	            }

	            // 收集库存
	            var stocks = [];
	            skuData.length && _.map(skuData, function (item, i) {
	                stocks.push(+item.stock);
	            });

	            this.priceStockUpdate('', { stocks: stocks });
	        }
	    },

	    // 库存一键填写回调
	    autoFillStockUpdate: function autoFillStockUpdate(msg, data) {
	        this.setState({
	            stock: data.stock
	        });
	    },
	    // 价格库存回调
	    priceStockUpdate: function priceStockUpdate(msg, data) {
	        var stocks = data.stocks;
	        if (stocks.length) {
	            var sumStock = 0;
	            for (var i = 0; i < stocks.length; i++) {
	                sumStock += parseInt(stocks[i]);
	            }
	            this.refs.stock.getDOMNode().value = sumStock;
	            this.setState({
	                stock: sumStock
	            });
	        } else {
	            this.refs.stock.getDOMNode().value = '';
	            this.setState({ stock: '' });
	        }
	    },
	    // 选择尺码回调
	    selectSizeUpdate: function selectSizeUpdate(msg, data) {
	        var twoSkuOptionData = data.twoSkuOptionData || {};
	        var sizes = twoSkuOptionData.sizes || [];

	        var checkedLen = 0;
	        // 查找所有尺码是否有选中项
	        sizes.length && _.map(sizes, function (item, i) {
	            if (item.checked) {
	                checkedLen++;
	            }
	        });

	        // 如果都没有选中
	        if (!checkedLen) {
	            this.setState({
	                stock: ''
	            });
	        }
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            stock: props.stock
	        });

	        var skuType = props.skuSetting.skuType;

	        // 如果是单层或双层规格
	        if (skuType > 0) {
	            this.refs.stock.getDOMNode().setAttribute('disabled', 'disabled');
	        } else {
	            Stock.value = props.stock;
	        }
	    },
	    // 在挂载结束之后马上被调用
	    componentDidMount: function componentDidMount() {
	        Stock.self = this;
	        PubSub.subscribe('selectSize.update', this.selectSizeUpdate);
	        PubSub.subscribe('selectSkuType.update', this.selectSkuTypeUpdate);
	        PubSub.subscribe('autoFillStock.update', this.autoFillStockUpdate);
	        PubSub.subscribe('priceStock.update', this.priceStockUpdate);
	    },
	    render: function render() {
	        var stock = isNaN(this.state.stock) ? '' : this.state.stock;

	        return React.createElement(
	            'div',
	            { className: 'goods-stock' },
	            React.createElement('input', { ref: 'stock', className: 'xd-input primary', value: stock, onChange: this.valueChange }),
	            React.createElement(
	                'span',
	                { className: 'high ml20' },
	                this.state.tip
	            )
	        );
	    }
	});

	module.exports = Stock;

/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	var StockMode = React.createClass({
	    displayName: 'StockMode',

	    statics: {
	        self: null,
	        getData: function getData() {
	            return StockMode.self.state.stockMode;
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            stockMode: 1
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        StockMode.self = this;
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            stockMode: props.data
	        });
	    },
	    // 切换库存方式
	    stockModeChange: function stockModeChange(type, event) {
	        this.setState({
	            stockMode: type
	        });
	    },
	    render: function render() {
	        var stockMode = this.state.stockMode;
	        return React.createElement(
	            'div',
	            { className: 'stock-mode' },
	            React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'label',
	                    null,
	                    React.createElement('input', { name: 'stock', className: 'xd-radio', type: 'radio', checked: stockMode ? true : false, onChange: this.stockModeChange.bind(this, 1) }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '下单减库存'
	                    )
	                ),
	                React.createElement(
	                    'label',
	                    null,
	                    React.createElement('input', { name: 'stock', className: 'xd-radio', type: 'radio', checked: stockMode ? false : true, onChange: this.stockModeChange.bind(this, 0) }),
	                    React.createElement(
	                        'span',
	                        null,
	                        '付款减库存'
	                    )
	                )
	            ),
	            React.createElement(
	                'p',
	                null,
	                '下单后',
	                stockMode ? '30分钟' : '24小时',
	                '未付款订单自动关闭。'
	            )
	        );
	    }
	});

	module.exports = StockMode;

/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(737);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(934)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/pages/goods/edit/style/index.less", function() {
			var newContent = require("!!/data/app/gitlab/f-day/node_modules/css-loader/index.js!/data/app/gitlab/f-day/node_modules/less-loader/index.js!/data/app/gitlab/f-day/app/pages/goods/edit/style/index.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);

	var Title = React.createClass({
	    displayName: 'Title',

	    statics: {
	        self: null,
	        getData: function getData() {
	            return Title.self.state.title;
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            title: '',
	            tip: ''
	        };
	    },
	    componentDidMount: function componentDidMount() {
	        Title.self = this;
	    },
	    // 值改变
	    valueChange: function valueChange(event) {
	        var value = event.target.value;
	        // value = XD.Util.trim(value);

	        this.setState({
	            title: value,
	            tip: value.length > 30 ? '标题不能超过30字' : ''
	        });
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            title: props.title
	        });
	    },
	    render: function render() {
	        var title = this.state.title || '';
	        return React.createElement(
	            'div',
	            { className: 'goods-title' },
	            React.createElement('input', { className: 'title-input xd-input primary', placeholder: '请简洁的说明这是什么商品，标题30字以内。', value: title, onChange: this.valueChange }),
	            React.createElement(
	                'span',
	                { className: 'high ml20' },
	                this.state.tip
	            )
	        );
	    }
	});

	module.exports = Title;

/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);

	var Volume = React.createClass({
	    displayName: 'Volume',

	    statics: {
	        self: null,
	        value: '',
	        getData: function getData() {
	            return Volume.self.state.volume || '';
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            volume: this.props.volume || '',
	            tip: '',
	            postageType: this.props.postageType || 0,
	            skuType: this.props.skuType || 0
	        };
	    },
	    // 值改变
	    valueChange: function valueChange(event) {
	        var value = event.target.value;

	        var tip = '';
	        if (value != '') {
	            if (isNaN(value) || value < 0.01 || !/^\d+(\.\d{1,2})?$/.test(value)) {
	                tip = '请正确填写体积，体积必须大于0，可精确到小数点后两位';
	            }
	        }

	        this.setState({
	            volume: value,
	            tip: tip
	        });

	        Volume.value = value;
	    },
	    componentDidMount: function componentDidMount() {
	        Volume.self = this;
	        PubSub.subscribe('postageChange.update', this.postageChangeUpdate);
	        // PubSub.subscribe('selectSkuType.update', this.selectSkuTypeUpdate);
	    },
	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            postageType: props.postageType
	        });
	    },
	    postageChangeUpdate: function postageChangeUpdate(msg, data) {
	        this.setState({
	            postageType: data.postageType
	        });
	    },
	    selectSkuTypeUpdate: function selectSkuTypeUpdate(msg, data) {
	        this.setState({
	            skuType: data.skuType
	        });
	    },
	    render: function render() {
	        var volume = this.state.volume;
	        var postageType = this.state.postageType;
	        var skuType = this.state.skuType;

	        var cx = React.addons.classSet;
	        var volumeClass = cx({
	            'goods-volume ml20': true,
	            'hide': postageType != 3
	        });
	        return React.createElement(
	            'div',
	            { className: volumeClass },
	            React.createElement('input', { ref: 'volume', className: 'xd-input primary', value: volume, onChange: this.valueChange }),
	            ' m',
	            React.createElement(
	                'sup',
	                null,
	                '3'
	            ),
	            React.createElement(
	                'span',
	                { className: 'high ml20' },
	                this.state.tip
	            )
	        );
	    }
	});

	module.exports = Volume;

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);
	var PubSub = __webpack_require__(13);
	var Modal = __webpack_require__(21);

	var Weight = React.createClass({
	    displayName: 'Weight',

	    statics: {
	        self: null,
	        value: '',
	        getData: function getData() {
	            return Weight.self.state.weight || '';
	        }
	    },
	    getInitialState: function getInitialState() {
	        return {
	            weight: this.props.weight || '',
	            tip: '',
	            postageType: this.props.postageType || 0,
	            skuType: this.props.skuType || 0
	        };
	    },
	    // 值改变
	    valueChange: function valueChange(event) {
	        var value = event.target.value;

	        var tip = '';
	        if (value != '') {
	            if (isNaN(value) || value < 0.01 || !/^\d+(\.\d{1,2})?$/.test(value)) {
	                tip = '请正确填写重量，重量必须大于0，可精确到小数点后两位';
	            }
	        }

	        this.setState({
	            weight: value,
	            tip: tip
	        });

	        Weight.value = value;
	    },

	    componentDidMount: function componentDidMount() {
	        Weight.self = this;
	        PubSub.subscribe('postageChange.update', this.postageChangeUpdate);
	        // PubSub.subscribe('selectSkuType.update', this.selectSkuTypeUpdate);
	    },

	    // 每次接收到新的props触发
	    componentWillReceiveProps: function componentWillReceiveProps(props) {
	        this.setState({
	            postageType: props.postageType
	        });
	    },

	    postageChangeUpdate: function postageChangeUpdate(msg, data) {
	        this.setState({
	            postageType: data.postageType
	        });
	    },

	    selectSkuTypeUpdate: function selectSkuTypeUpdate(msg, data) {
	        this.setState({
	            skuType: data.skuType
	        });
	    },

	    render: function render() {
	        var weight = this.state.weight;
	        var postageType = this.state.postageType;
	        var skuType = this.state.skuType;

	        var cx = React.addons.classSet;
	        var weightClass = cx({
	            'goods-weight ml20': true,
	            'hide': postageType != 2
	        });
	        return React.createElement(
	            'div',
	            { className: weightClass },
	            React.createElement('input', { ref: 'weight', className: 'xd-input primary', value: weight, onChange: this.valueChange }),
	            ' kg',
	            React.createElement(
	                'span',
	                { className: 'high ml20' },
	                this.state.tip
	            )
	        );
	    }
	});

	module.exports = Weight;

/***/ },

/***/ 658:
/***/ function(module, exports) {

	"use strict";

	module.exports = function () {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	};

/***/ },

/***/ 659:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(658)();
	exports.push([module.id, "/* 日期组件 */\n.rc-calendar-picker {\n  position: relative;\n}\n.rc-calendar-picker .xd-calendar {\n  position: absolute;\n  display: none;\n  left: -9999px;\n  top: -9999px;\n  z-index: 9;\n}\n.rc-calendar-picker-open .xd-calendar {\n  display: block;\n}\n.xd-calendar {\n  background: #ffffff;\n  border: 1px solid #c4c4c4;\n  width: 260px;\n  outline: none;\n  position: relative;\n}\n.xd-calendar * {\n  box-sizing: border-box;\n}\n.xd-calendar .xd-calendar-calendar-body,\n.xd-calendar .xd-calendar-month-panel-body,\n.xd-calendar .xd-calendar-year-panel-body {\n  padding: 10px 20px;\n}\n.xd-calendar .xd-calendar-header,\n.xd-calendar .xd-calendar-month-panel-header,\n.xd-calendar .xd-calendar-year-panel-header,\n.xd-calendar .xd-calendar-decade-panel-header {\n  border-bottom: 1px solid #ccc;\n  height: 50px;\n  line-height: 50px;\n  position: relative;\n  text-align: center;\n}\n.xd-calendar .xd-calendar-hidden,\n.xd-calendar .xd-calendar-month-panel-hidden,\n.xd-calendar .xd-calendar-year-panel-hidden,\n.xd-calendar .xd-calendar-decade-panel-hidden,\n.xd-calendar .xd-calendar-month-panel-year-select-arrow,\n.xd-calendar .xd-calendar-year-panel-decade-select-arrow,\n.xd-calendar .xd-calendar-month-select-arrow {\n  display: none;\n}\n.xd-calendar .xd-calendar-prev-month-btn,\n.xd-calendar .xd-calendar-next-month-btn,\n.xd-calendar .xd-calendar-prev-year-btn,\n.xd-calendar .xd-calendar-next-year-btn,\n.xd-calendar .xd-calendar-month-panel-prev-year-btn,\n.xd-calendar .xd-calendar-month-panel-next-year-btn,\n.xd-calendar .xd-calendar-year-panel-prev-decade-btn,\n.xd-calendar .xd-calendar-year-panel-next-decade-btn,\n.xd-calendar .xd-calendar-decade-panel-prev-century-btn,\n.xd-calendar .xd-calendar-decade-panel-next-century-btn {\n  color: #888;\n  font-size: 26px;\n  width: 26px;\n  height: 26px;\n  line-height: 26px;\n  top: 10px;\n  position: absolute;\n}\n.xd-calendar .xd-calendar-prev-month-btn,\n.xd-calendar .xd-calendar-month-panel-prev-year-btn,\n.xd-calendar .xd-calendar-year-panel-prev-decade-btn,\n.xd-calendar .xd-calendar-decade-panel-prev-century-btn {\n  left: 24px;\n}\n.xd-calendar .xd-calendar-prev-year-btn {\n  display: none;\n  left: 0;\n}\n.xd-calendar .xd-calendar-next-month-btn,\n.xd-calendar .xd-calendar-month-panel-next-year-btn,\n.xd-calendar .xd-calendar-year-panel-next-decade-btn,\n.xd-calendar .xd-calendar-decade-panel-next-century-btn {\n  right: 24px;\n}\n.xd-calendar .xd-calendar-next-year-btn {\n  display: none;\n  right: 0;\n}\n.xd-calendar .xd-calendar-month-select,\n.xd-calendar .xd-calendar-month-panel-year-select-content,\n.xd-calendar .xd-calendar-year-panel-decade-select-content {\n  color: #333;\n}\n.xd-calendar .xd-calendar-column-header {\n  width: 25px;\n  color: black;\n  font-weight: bold;\n  text-align: center;\n  padding: 4px 0;\n}\n.xd-calendar .xd-calendar-table {\n  width: 100%;\n}\n.xd-calendar .xd-calendar-column-header-inner {\n  display: block;\n  color: #ff5555;\n}\n.xd-calendar .xd-calendar-cell,\n.xd-calendar .xd-calendar-month-panel-cell,\n.xd-calendar .xd-calendar-year-panel-cell,\n.xd-calendar .xd-calendar-decade-panel-cell {\n  text-align: center;\n}\n.xd-calendar .xd-calendar-date {\n  color: #333;\n  line-height: 22px;\n  display: inline-block;\n  border-radius: 50%;\n  outline: none;\n  height: 26px;\n  width: 26px;\n  line-height: 26px;\n  cursor: pointer;\n  margin-bottom: 5px;\n}\n.xd-calendar .xd-calendar-last-month-cell .xd-calendar-date,\n.xd-calendar .xd-calendar-disabled-cell .xd-calendar-date,\n.xd-calendar .xd-calendar-next-month-btn-day .xd-calendar-date {\n  color: #bfbfbf;\n}\n.xd-calendar .xd-calendar-date:hover,\n.xd-calendar .xd-calendar-month-panel-month:hover,\n.xd-calendar .xd-calendar-year-panel-year:hover,\n.xd-calendar .xd-calendar-decade-panel-decade:hover,\n.xd-calendar .xd-calendar-selected-day .xd-calendar-date,\n.xd-calendar .xd-calendar-month-panel-selected-cell .xd-calendar-month-panel-month,\n.xd-calendar .xd-calendar-year-panel-selected-cell .xd-calendar-year-panel-year,\n.xd-calendar .xd-calendar-decade-panel-selected-cell .xd-calendar-decade-panel-decade {\n  background-color: #ff5555;\n  color: #fff;\n}\n.xd-calendar .xd-calendar-disabled-cell .xd-calendar-date:hover {\n  background-color: #ffffff;\n  border-color: transparent;\n}\n.xd-calendar .xd-calendar-selected-day .xd-calendar-date,\n.xd-calendar .xd-calendar-month-panel-selected-cell .xd-calendar-month-panel-month,\n.xd-calendar .xd-calendar-year-panel-selected-cell .xd-calendar-year-panel-year {\n  color: #fff;\n  background-color: #ff5555;\n}\n.xd-calendar .xd-calendar-month-panel,\n.xd-calendar .xd-calendar-year-panel,\n.xd-calendar .xd-calendar-decade-panel {\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  z-index: 10;\n  background: #ffffff;\n  position: absolute;\n  outline: none;\n}\n.xd-calendar .xd-calendar .xd-calendar-month-panel-year-select,\n.xd-calendar .xd-calendar-year-panel-decade-select,\n.xd-calendar .xd-calendar-decade-panel-century {\n  color: #333;\n}\n.xd-calendar .xd-calendar-month-panel-table,\n.xd-calendar .xd-calendar-year-panel-table,\n.xd-calendar .xd-calendar-decade-panel-table {\n  margin-top: 5px;\n  table-layout: fixed;\n  width: 100%;\n  border-collapse: separate;\n}\n.xd-calendar .xd-calendar-month-panel-month {\n  color: #333;\n  width: 45px;\n  line-height: 45px;\n  height: 45px;\n  display: inline-block;\n  border-radius: 50%;\n  margin-bottom: 5px;\n}\n.xd-calendar .xd-calendar-year-panel {\n  z-index: 20;\n}\n.xd-calendar .xd-calendar-year-panel-year,\n.xd-calendar .xd-calendar-decade-panel-decade {\n  color: #333;\n  line-height: 30px;\n  display: block;\n  border-radius: 2px;\n  margin-bottom: 20px;\n  margin-right: 10px;\n}\n.xd-calendar .xd-calendar-year-panel-last-decade-cell .xd-calendar-year-panel-year,\n.xd-calendar .xd-calendar-year-panel-next-decade-cell .xd-calendar-year-panel-year,\n.xd-calendar .xd-calendar-decade-panel-last-century-cell .xd-calendar-decade-panel-decade,\n.xd-calendar .xd-calendar-decade-panel-next-century-cell .xd-calendar-decade-panel-decade {\n  color: #bfbfbf;\n}\n.xd-calendar .xd-calendar-decade-panel {\n  z-index: 30;\n}\n.xd-calendar .xd-calendar-decade-panel-decade {\n  line-height: 20px;\n}\n.xd-calendar .xd-calendar-footer {\n  text-align: center;\n  padding-bottom: 10px;\n}\n.xd-calendar .xd-calendar-footer .xd-calendar-time-input {\n  width: 30px;\n  text-align: center;\n  border: 1px solid #d7d7d7;\n  border-radius: 3px;\n  padding: 7px 0;\n}\n.xd-calendar .xd-calendar-footer .xd-calendar-time-panel .xd-calendar-time-panel-body {\n  padding: 0 10px;\n}\n.xd-calendar .xd-calendar-footer .xd-calendar-time-panel .xd-calendar-time-panel-table {\n  width: 100%;\n}\n.xd-calendar .xd-calendar-footer .xd-calendar-time-panel .xd-calendar-time-panel-table .xd-calendar-time-panel-time {\n  color: #333;\n}\n.xd-calendar .xd-calendar-footer .xd-calendar-today-btn {\n  color: #333;\n}\n", ""]);

/***/ },

/***/ 736:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(658)();
	exports.push([module.id, ".image-cut {\n  border-top: 1px solid #e2e2e2;\n  padding: 15px 20px;\n  background: url(http://s7.mogujie.cn/pic/130912/2r6z_kqyuwuckkfbdozcugfjeg5sckzsew_20x20.png);\n}\n.image-cut .image-cut-box {\n  height: 400px;\n  overflow: hidden;\n}\n.image-cut .vh {\n  visibility: hidden;\n}\n.image-cut .border-top-none {\n  border-top: none !important;\n}\n.image-cut .func-area {\n  width: 208px;\n  height: 400px;\n  border: 1px solid #e2e2e2;\n  border-right: none;\n  background-color: #fff;\n}\n.image-cut .func-area .cut-panel {\n  margin-bottom: 0;\n  border: none;\n}\n.image-cut .func-area .cut-panel .xd-panel-header {\n  cursor: pointer;\n  line-height: 20px;\n}\n.image-cut .func-area .cut-panel .xd-title i {\n  display: inline-block;\n  background: url('http://s17.mogucdn.com/p1/150724/upload_iezggnjthbrdknjzgizdambqmmyde_168x100.png') 0 -46px no-repeat;\n  width: 19px;\n  height: 18px;\n  margin-right: 10px;\n  vertical-align: middle;\n}\n.image-cut .func-area .cut-panel .xd-title span {\n  vertical-align: middle;\n}\n.image-cut .func-area .cut-panel .xd-panel-body {\n  height: 110px;\n  padding: 20px;\n}\n.image-cut .func-area .cut-panel .ratio-change {\n  text-align: center;\n  margin-right: 20px;\n  height: 50px;\n}\n.image-cut .func-area .cut-panel .ratio-change.c i {\n  border-color: #ff5555;\n}\n.image-cut .func-area .cut-panel .ratio-change.c span {\n  color: #ff5555;\n}\n.image-cut .func-area .cut-panel .ratio-change i {\n  display: block;\n  border: 1px solid #c4c4c4;\n}\n.image-cut .func-area .cut-panel .ratio-change span {\n  color: #666;\n  font-size: 14px;\n  line-height: 14px;\n  margin-top: 8px;\n  display: block;\n}\n.image-cut .func-area .cut-panel .ratio-change .r1 {\n  width: 30px;\n  height: 30px;\n}\n.image-cut .func-area .cut-panel .ratio-change .r2 {\n  width: 20px;\n  height: 30px;\n}\n.image-cut .func-area .cut-panel .ratio-change .r3 {\n  width: 30px;\n  height: 24px;\n  margin-top: 3px;\n}\n.image-cut .func-area .cut-panel .ratio-change .s3 {\n  margin-top: 11px;\n}\n.image-cut .func-area .rotate-panel {\n  margin-bottom: 0;\n  border: none;\n  border-top: 1px solid #e2e2e2;\n}\n.image-cut .func-area .rotate-panel .xd-panel-header {\n  cursor: pointer;\n  line-height: 20px;\n}\n.image-cut .func-area .rotate-panel .xd-title i {\n  display: inline-block;\n  background: url('http://s17.mogucdn.com/p1/150724/upload_iezggnjthbrdknjzgizdambqmmyde_168x100.png') -30px -46px no-repeat;\n  width: 19px;\n  height: 18px;\n  margin-right: 10px;\n  vertical-align: middle;\n}\n.image-cut .func-area .rotate-panel .xd-title span {\n  vertical-align: middle;\n}\n.image-cut .func-area .rotate-panel .xd-panel-body {\n  height: 197px;\n  padding: 20px;\n  margin-right: -15px;\n}\n.image-cut .func-area .rotate-panel .rotate-change {\n  text-align: center;\n  margin-right: 10px;\n}\n.image-cut .func-area .rotate-panel .rotate-change i {\n  display: block;\n  background: url('http://s17.mogucdn.com/p1/150724/upload_iezggnjthbrdknjzgizdambqmmyde_168x100.png') no-repeat;\n  width: 35px;\n  height: 35px;\n}\n.image-cut .func-area .rotate-panel .rotate-change span {\n  color: #666;\n  font-size: 14px;\n  line-height: 14px;\n  margin-top: 10px;\n  display: block;\n}\n.image-cut .func-area .rotate-panel .rotate-change .r1 {\n  background-position: 0 0;\n}\n.image-cut .func-area .rotate-panel .rotate-change .r2 {\n  background-position: -44px 0;\n}\n.image-cut .func-area .rotate-panel .rotate-change .r3 {\n  background-position: -89px 0;\n}\n.image-cut .func-area .rotate-panel .rotate-change .r4 {\n  background-position: -133px 0;\n}\n.image-cut .func-area a.xd-btn {\n  min-width: 30px;\n  margin-right: 10px;\n  margin-bottom: 10px;\n}\n.image-cut .cut-area,\n.image-cut .rotate-area {\n  width: 590px;\n  height: 400px;\n  text-align: center;\n  border: 1px solid #e2e2e2;\n  background: #f4f4f4 url(http://s18.mogucdn.com/p1/150725/upload_iezdemrrgmytmyjzgizdambqmmyde_24x24.gif) center no-repeat;\n}\n.image-cut .cut-area button.middle,\n.image-cut .rotate-area button.middle {\n  width: 100%;\n  height: 100%;\n  border: none;\n  background: none;\n  outline: none;\n  padding: 0;\n}\n.image-cut .rotate-animate {\n  -webkit-transition: all 0.5s ease-out;\n  -moz-transition: all 0.5s ease-out;\n  -ms-transition: all 0.5s ease-out;\n  -o-transition: all 0.5s ease-out;\n  transition: all 0.5s ease-out;\n}\n", ""]);

/***/ },

/***/ 737:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(658)();
	exports.push([module.id, ".xd-manage-slide {\n  display: none;\n}\n.xd-goods-edit {\n  margin-left: 0 !important;\n  border-left: 0 !important;\n}\n.xd-goods-edit .high {\n  color: #ff5555;\n}\n.xd-goods-edit .xd-form-group {\n  margin-bottom: 0 ;\n}\n.xd-goods-edit .xd-input {\n  height: 30px;\n  line-height: 30px;\n}\n.xd-goods-edit .xd-textarea {\n  resize: none;\n}\n.xd-goods-edit .add-btn {\n  padding: 0 10px;\n  color: #333;\n  border: 1px solid #c4c4c4;\n  font-size: 14px;\n  line-height: 28px;\n  display: inline-block;\n  background: #fff url(\"//s7.mogucdn.com/pic/150420/sp1ku_ie2gknlbmvrdazlbgazdambqgiyde_50x200.png\") no-repeat;\n  background-position: 10px -25px;\n  padding-left: 25px;\n}\n.xd-goods-edit .loading-wrap {\n  line-height: 98px;\n  text-align: center;\n}\n.xd-goods-edit .loading-wrap img {\n  vertical-align: middle;\n}\n.xd-goods-edit .image-tip {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.xd-goods-edit .image-tip:hover .image-tip-wrap {\n  display: block;\n}\n.xd-goods-edit .image-tip > p {\n  color: #888;\n}\n.xd-goods-edit .image-tip .icon {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  margin-right: 3px;\n  background-color: #ccc;\n  border-radius: 50%;\n  color: #fff;\n  font-size: 12px;\n  font-weight: bold;\n  line-height: 16px;\n  text-align: center;\n}\n.xd-goods-edit .image-tip-wrap {\n  display: none;\n  position: absolute;\n  top: -5px;\n  left: -20px;\n  padding: 30px 20px;\n  z-index: 10;\n  width: 300px;\n}\n.xd-goods-edit .image-tip-list {\n  padding: 10px 0 0;\n  background: #fff;\n  border: 1px solid #c4c4c4;\n  font-size: 13px;\n  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);\n}\n.xd-goods-edit .image-tip-list ol {\n  margin: 0 0 10px -1px;\n  padding: 0 10px;\n  border-left: 2px solid transparent;\n}\n.xd-goods-edit .image-tip-list ol p {\n  line-height: 18px;\n}\n.xd-goods-edit .refresh-data-tip {\n  position: absolute;\n  top: 30px;\n  left: -60px;\n  padding: 5px 20px;\n  border: 1px solid #e2e2e2;\n  white-space: nowrap;\n  color: #666;\n  background-color: #fff;\n}\n.xd-goods-edit .arrow {\n  /*background: url(//s8.mogucdn.com/pic/150421/13t2zv_iezgezlfmyztemtcgazdambqmmyde_19x11.png) no-repeat 0 0;\n        display: block;\n        width: 20px;\n        height: 20px;\n        position: absolute;\n        top: -11px;\n        left: 50%;\n        z-index: 2;\n        margin-left: -10px;*/\n}\n.xd-goods-edit .desc-content p {\n  line-height: 14px;\n  margin-bottom: 10px;\n}\n.xd-goods-edit .desc-content textarea {\n  width: 100%;\n}\n.xd-goods-edit .header-notice {\n  background-color: #f4f5fa;\n  color: #888;\n  padding: 15px 20px;\n  margin-top: -30px;\n}\n.xd-goods-edit .footer-notice {\n  padding: 30px 15px;\n  border: 1px solid #e2e2e2;\n  margin-left: 110px;\n  margin-right: 48px;\n}\n.xd-goods-edit .footer-notice li {\n  color: #888;\n}\n.xd-goods-edit .publish-content .xd-tag {\n  padding: 0 10px;\n  color: #333;\n  border: 1px solid #c4c4c4;\n  display: inline-block;\n  background-color: #fff;\n}\n.xd-goods-edit .publish-content .xd-tag.c {\n  border-color: #ff5555;\n  color: #333;\n  background: #fff url(//s21.mogucdn.com/pic/150408/AAA2222_iezdkmdfgbswgzjwgazdambqmmyde_13x13.png) no-repeat right bottom;\n}\n.xd-goods-edit .publish-content .form .field {\n  margin-bottom: 20px;\n}\n.xd-goods-edit .publish-content .form .field label {\n  width: 90px;\n  text-align: right;\n  margin-right: 20px;\n  line-height: 30px;\n}\n.xd-goods-edit .publish-content .form .field .field-content {\n  line-height: 28px;\n  width: 980px;\n}\n.xd-goods-edit .publish-content .form .field .arrow {\n  color: #e3e3e3;\n}\n.xd-goods-edit .publish-content .form .field input {\n  margin-bottom: 0;\n}\n.xd-goods-edit .publish-content .form .field:last-child {\n  margin-bottom: 0;\n}\n.xd-goods-edit .publish-content .form .edit-category {\n  background: url(\"http://s16.mogucdn.com/p1/150629/upload_ie2tizdegjtdsnjrgizdambqhayde_20x320.png\") no-repeat;\n  width: 16px;\n  height: 16px;\n  background-position: 0 -124px;\n}\n.xd-goods-edit .publish-content .form .title-input,\n.xd-goods-edit .publish-content .form .desc-input {\n  width: 800px;\n}\n.xd-goods-edit .publish-content .form .desc-input {\n  padding: 5px 10px;\n  height: 75px;\n}\n.xd-goods-edit .publish-content .form .postage .add-postage {\n  position: relative;\n}\n.xd-goods-edit .publish-content .form .postage .add-postage .refresh-data-tip {\n  left: -30px;\n}\n.xd-goods-edit .publish-content .form .postage-select {\n  vertical-align: middle;\n}\n.xd-goods-edit .publish-content .form .postage-info {\n  background-color: #efefef;\n  font-size: 14px;\n  width: 500px;\n  padding: 10px 20px;\n  margin-top: 10px;\n}\n.xd-goods-edit .publish-content .form .goods-weight,\n.xd-goods-edit .publish-content .form .goods-volume {\n  display: inline-block;\n  vertical-align: middle;\n}\n.xd-goods-edit .publish-content .form .goods-weight input,\n.xd-goods-edit .publish-content .form .goods-volume input {\n  width: 100px;\n}\n.xd-goods-edit .publish-content .form .goods-weight sup,\n.xd-goods-edit .publish-content .form .goods-volume sup {\n  position: relative;\n  top: -5px;\n}\n.xd-goods-edit .publish-content .form .goods-tags .add-tag li {\n  border: 1px solid #c4c4c4;\n  color: #333;\n  padding: 0 10px;\n  display: inline-block;\n  margin-right: 10px;\n  cursor: pointer;\n  line-height: 28px;\n  position: relative;\n  margin-bottom: 10px;\n}\n.xd-goods-edit .publish-content .form .goods-tags .add-tag li .close-btn {\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  background: url(\"//s7.mogucdn.com/pic/150420/sp1ku_ie2gknlbmvrdazlbgazdambqgiyde_50x200.png\") no-repeat;\n  background-position: 0 0;\n  top: -7px;\n  right: -5px;\n  font: 0/0 a;\n}\n.xd-goods-edit .publish-content .form .goods-tags .add-tag li.action {\n  border: 0;\n  padding-left: 0;\n}\n.xd-goods-edit .publish-content .form .goods-tags .add-tag li.action .goods-tag-name {\n  width: 120px;\n}\n.xd-goods-edit .publish-content .form .goods-tags .add-tag li.action .add-btn {\n  margin-right: 0;\n  margin-left: 10px;\n}\n.xd-goods-edit .publish-content .form .goods-tags .hot-tags {\n  margin-top: 20px;\n}\n.xd-goods-edit .publish-content .form .goods-tags .hot-tags li {\n  color: #333;\n  background-color: #f4f5fa;\n  padding: 0 10px;\n  display: inline-block;\n  cursor: pointer;\n  margin-left: 10px;\n  margin-bottom: 10px;\n}\n.xd-goods-edit .publish-content .form .goods-tags .hot-tags .title {\n  color: #888;\n}\n.xd-goods-edit .publish-content .form .goods-tags .hot-tags .list {\n  width: 900px;\n}\n.xd-goods-edit .publish-content .form .goods-tags .desc {\n  color: #888;\n  line-height: 14px;\n}\n.xd-goods-edit .publish-content .form .goods-classify .add-classify {\n  position: relative;\n}\n.xd-goods-edit .publish-content .form .stock-mode p {\n  color: #888;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap {\n  width: 840px;\n  border: 1px solid #e2e2e2;\n  color: #666;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap .cover-images {\n  padding: 20px 20px 10px 20px;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap .cover-upload-choose0 {\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n  width: 800px;\n  height: 115px;\n  margin: 0 auto;\n  padding-top: 40px;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap .cover-upload-choose0 .xd-btn-uni {\n  background: #00cc99;\n  border-color: #00cc99;\n  position: relative;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap .cover-upload-choose0 .xd-btn-uni i {\n  position: absolute;\n  background: url(http://s18.mogucdn.com/p1/150806/upload_ie2dkmbtgazwkolegizdambqgiyde_33x33.png);\n  display: block;\n  width: 33px;\n  height: 33px;\n  right: -1px;\n  top: -1px;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap .cover-upload-choose0 .file {\n  position: absolute;\n  font-size: 30px;\n  opacity: 0;\n  border: 0 none;\n  top: 35px;\n  filter: alpha(opacity=0);\n  left: 263px;\n  width: 120px;\n  cursor: pointer;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap .cover-upload-choose {\n  text-align: center;\n  position: relative;\n  overflow: hidden;\n  border-top: 2px solid #eee;\n  width: 800px;\n  height: 115px;\n  margin: 0 auto;\n  padding-top: 40px;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap .cover-upload-choose .xd-btn-uni {\n  background: #00cc99;\n  border-color: #00cc99;\n  position: relative;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap .cover-upload-choose .xd-btn-uni i {\n  position: absolute;\n  background: url(http://s18.mogucdn.com/p1/150806/upload_ie2dkmbtgazwkolegizdambqgiyde_33x33.png);\n  display: block;\n  width: 33px;\n  height: 33px;\n  right: -1px;\n  top: -1px;\n}\n.xd-goods-edit .publish-content .form .cover-images-wrap .cover-upload-choose .file {\n  position: absolute;\n  font-size: 30px;\n  opacity: 0;\n  border: 0 none;\n  top: 35px;\n  filter: alpha(opacity=0);\n  left: 263px;\n  width: 120px;\n  cursor: pointer;\n}\n.xd-goods-edit .publish-content .form .cover-images .upload-image,\n.xd-goods-edit .publish-content .form .sku-image .upload-image {\n  position: relative;\n  border: 1px solid #c4c4c4;\n  width: 100px;\n  height: 100px;\n  background-color: #fff;\n  text-align: center;\n  line-height: 100px;\n  overflow: hidden;\n}\n.xd-goods-edit .publish-content .form .cover-images .upload-image .img,\n.xd-goods-edit .publish-content .form .sku-image .upload-image .img {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1;\n}\n.xd-goods-edit .publish-content .form .cover-images .upload-image .change-btn .file,\n.xd-goods-edit .publish-content .form .sku-image .upload-image .change-btn .file {\n  top: 0;\n  font-size: 14px;\n  left: 45px;\n  width: 52px;\n}\n.xd-goods-edit .publish-content .form .cover-images .upload-image .action,\n.xd-goods-edit .publish-content .form .sku-image .upload-image .action {\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  z-index: 3;\n  height: 20px;\n  line-height: 20px;\n}\n.xd-goods-edit .publish-content .form .cover-images .upload-image .edit-btn,\n.xd-goods-edit .publish-content .form .sku-image .upload-image .edit-btn,\n.xd-goods-edit .publish-content .form .cover-images .upload-image .change-btn,\n.xd-goods-edit .publish-content .form .sku-image .upload-image .change-btn {\n  display: inline-block;\n  width: 50%;\n  background-color: rgba(0, 0, 0, 0.5);\n  color: #fff;\n}\n.xd-goods-edit .publish-content .form .cover-images .upload-image .unishow .change-btn,\n.xd-goods-edit .publish-content .form .sku-image .upload-image .unishow .change-btn {\n  display: inline-block;\n  width: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  color: #fff;\n}\n.xd-goods-edit .publish-content .form .cover-images .upload-image-error .upload-image,\n.xd-goods-edit .publish-content .form .sku-image .upload-image-error .upload-image {\n  border-color: #FF5555;\n}\n.xd-goods-edit .publish-content .form .cover-images .upload-image-error .error-info,\n.xd-goods-edit .publish-content .form .sku-image .upload-image-error .error-info {\n  position: absolute;\n  top: 5px;\n  left: 5px;\n  background: url(//s18.mogucdn.com/p1/150725/upload_ieztkmtdmiyteyjzgizdambqgyyde_50x200.png) 0 -63px no-repeat;\n  z-index: 2;\n  width: 16px;\n  height: 16px;\n}\n.xd-goods-edit .publish-content .form .cover-images .file,\n.xd-goods-edit .publish-content .form .sku-image .file {\n  position: absolute;\n  font-size: 30px;\n  opacity: 0;\n  border: 0 none;\n  top: 32px;\n  filter: alpha(opacity=0);\n  left: 0;\n  width: 100%;\n}\n.xd-goods-edit .publish-content .form .cover-images li,\n.xd-goods-edit .publish-content .form .sku-image li {\n  float: left;\n  margin-right: 10px;\n  margin-bottom: 10px;\n  position: relative;\n}\n.xd-goods-edit .publish-content .form .cover-images li p,\n.xd-goods-edit .publish-content .form .sku-image li p {\n  color: #888;\n  margin-bottom: 10px;\n}\n.xd-goods-edit .publish-content .form .cover-images li .close-btn,\n.xd-goods-edit .publish-content .form .sku-image li .close-btn {\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  background: url(//s18.mogucdn.com/p1/150725/upload_ieztkmtdmiyteyjzgizdambqgyyde_50x200.png) no-repeat;\n  background-position: 0 0;\n  top: -7px;\n  right: -5px;\n  font: 0/0 a;\n  z-index: 2;\n}\n.xd-goods-edit .publish-content .form .cover-images .unload-img-uni,\n.xd-goods-edit .publish-content .form .sku-image .unload-img-uni {\n  background-color: #fff;\n  border-color: #c4c4c4;\n  color: #333;\n  width: 100px;\n  padding: 6px 0;\n  text-align: center;\n  margin-top: 5px;\n}\n.xd-goods-edit .publish-content .form .operate {\n  text-align: center;\n  padding: 25px 25px 10px 25px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .tabs {\n  margin-bottom: 20px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .tabs a {\n  float: left;\n  margin-right: 10px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .tabs p {\n  color: #888;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content {\n  background-color: #f4f5fa;\n  border: 1px solid #e2e2e2;\n  padding: 20px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-data .list {\n  margin-bottom: 20px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-data .list label {\n  width: auto;\n  margin-right: 10px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-data .list ul {\n  width: 900px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-data .list li {\n  float: left;\n  cursor: pointer;\n  margin-right: 10px;\n  margin-bottom: 10px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-data .add-text {\n  width: 100px;\n  margin-right: 10px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-other {\n  margin-left: 35px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-other p {\n  line-height: 14px;\n  color: #888;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-image .change-btn {\n  width: 100%;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-image .change-btn .file {\n  left: 22px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-meta .xd-input {\n  height: 24px;\n  line-height: 24px;\n  width: 80px;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-meta table {\n  border-top: 1px solid #ddd;\n  margin-top: 20px;\n  padding-top: 20px;\n  background-color: #fff;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-meta table thead {\n  background-color: #fff;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-meta table td {\n  text-align: center;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-meta .auto-fill {\n  line-height: 50px;\n  padding: 0 20px;\n  background-color: #f9fafc;\n  border: 1px solid #ddd;\n  border-top: none;\n}\n.xd-goods-edit .publish-content .form .sku-setting .setting-content .sku-meta .auto-fill .ok-btn {\n  margin-left: 20px;\n}\n.xd-goods-edit .publish-content .form .goods-prop .props {\n  padding: 20px 0;\n  background-color: #f4f5fa;\n  border: 1px solid #e2e2e2;\n}\n.xd-goods-edit .publish-content .form .goods-prop .props .prop {\n  margin-bottom: 20px;\n}\n.xd-goods-edit .publish-content .form .goods-prop .props .prop-content {\n  width: 860px;\n}\n.xd-goods-edit .publish-content .form .goods-prop .props .prop-select * {\n  vertical-align: middle;\n}\n.xd-goods-edit .publish-content .form .goods-prop .props label {\n  width: 80px;\n  margin-right: 10px;\n}\n.xd-goods-edit .publish-content .form .goods-prop .props .xd-tag {\n  margin-right: 10px;\n  margin-bottom: 10px;\n}\n.xd-goods-edit .publish-content .form .goods-prop .props .add-text {\n  width: 100px;\n  margin-right: 10px;\n}\n.xd-goods-edit .publish-content .form .goods-prop .props .add-prop {\n  margin-left: 50px;\n  border-top: 1px dashed #cbcbcb;\n  padding-top: 20px;\n  margin-right: 50px;\n}\n.xd-goods-edit .publish-content .form .goods-detail .xd-panel:last-child {\n  margin-bottom: 0;\n}\n.xd-goods-edit .publish-content .form .goods-detail .xd-panel-body {\n  background: url(//s7.mogujie.cn/pic/130912/2r6z_kqyuwuckkfbdozcugfjeg5sckzsew_20x20.png);\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-body {\n  background: #f4f5fa;\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-image li {\n  text-align: center;\n  margin-bottom: 20px;\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-image li img {\n  vertical-align: middle;\n  max-width: 896px;\n  height: auto;\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-image li .item {\n  position: relative;\n  overflow: hidden;\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-image .operate-mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-image .operate-mask .action {\n  position: absolute;\n  right: 0;\n  top: 10px;\n  z-index: 1;\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-image .operate-mask .action a {\n  display: inline-block;\n  padding: 0 10px;\n  background-color: #fff;\n  color: #333;\n  margin-right: 10px;\n  border-radius: 2px;\n  position: relative;\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-image .operate-mask .action a .file {\n  position: absolute;\n  font-size: 30px;\n  opacity: 0;\n  border: 0 none;\n  top: -4px;\n  filter: alpha(opacity=0);\n  left: 0;\n  width: 76px;\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-image .operate-mask .mask {\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.7;\n}\n.xd-goods-edit .publish-content .form .goods-detail .detail-image .desc-content {\n  margin-bottom: 20px;\n}\n.xd-goods-edit .publish-content .form .goods-detail .upload-image-wrap {\n  padding: 20px 0;\n}\n.xd-goods-edit .publish-content .form .goods-detail .upload-image-wrap .upload-image {\n  text-align: center;\n  position: relative;\n  margin-bottom: 20px;\n  overflow: hidden;\n}\n.xd-goods-edit .publish-content .form .goods-detail .upload-image-wrap .upload-image .xd-btn-uni {\n  background: #00cc99;\n  border-color: #00cc99;\n  position: relative;\n}\n.xd-goods-edit .publish-content .form .goods-detail .upload-image-wrap .upload-image .xd-btn-uni i {\n  position: absolute;\n  background: url(http://s18.mogucdn.com/p1/150806/upload_ie2dkmbtgazwkolegizdambqgiyde_33x33.png);\n  display: block;\n  width: 33px;\n  height: 33px;\n  right: -1px;\n  top: -1px;\n}\n.xd-goods-edit .publish-content .form .goods-detail .upload-image-wrap .upload-image .file {\n  position: absolute;\n  font-size: 30px;\n  opacity: 0;\n  border: 0 none;\n  top: -2px;\n  filter: alpha(opacity=0);\n  left: 327px;\n  width: 120px;\n  cursor: pointer;\n}\n.xd-goods-edit .publish-content .form .goods-detail .upload-image-wrap p {\n  text-align: center;\n  line-height: 14px;\n  margin-bottom: 10px;\n  color: #888;\n}\n.xd-goods-edit .publish-content .form .size-desc {\n  overflow-x: auto;\n}\n.xd-goods-edit .publish-content .form .size-desc .size-table {\n  padding-bottom: 10px;\n  margin-bottom: 20px;\n  border-bottom: 1px solid #dddddd;\n}\n.xd-goods-edit .publish-content .form .size-desc .size-table td {\n  width: 60px;\n  background-color: #fff;\n  text-align: center;\n}\n.xd-goods-edit .publish-content .form .size-desc .size-table td .xd-input {\n  width: 60px;\n}\n.xd-goods-edit .publish-content .form .size-desc .size-table thead td {\n  line-height: 20px;\n}\n.xd-goods-edit .publish-content .form .size-desc .size-table tbody td {\n  height: 30px;\n}\n.xd-goods-edit .publish-content .form .more-bar {\n  display: block;\n  text-align: center;\n  border-top: 1px dashed #cdcdcd;\n  margin-top: 20px;\n}\n.xd-goods-edit .publish-content .form .more-bar a {\n  color: #333;\n}\n.xd-goods-edit .publish-content .form .more-bar a i,\n.xd-goods-edit .publish-content .form .more-bar a span {\n  vertical-align: middle;\n  font-size: 18px;\n}\n.xd-goods-edit .publish-content .form .more-bar .arrow-show,\n.xd-goods-edit .publish-content .form .more-bar .arrow-hide {\n  background: url(http://s17.mogucdn.com/p1/150802/upload_ieytsmjvgezwmm3dgizdambqmeyde_50x100.png) no-repeat;\n  width: 17px;\n  height: 17px;\n  display: inline-block;\n  margin-right: 5px;\n}\n.xd-goods-edit .publish-content .form .more-bar .arrow-show {\n  background-position: 0 -40px;\n}\n.xd-goods-edit .publish-content .form .more-bar .arrow-hide {\n  background-position: 0 -62px;\n}\n.xd-goods-edit .publish-action {\n  margin-top: 40px;\n  text-align: center;\n  margin-bottom: 100px;\n}\n.xd-goods-edit .publish-action .save-btn {\n  margin-left: 20px;\n}\n#J_EditCategoryModal .high {\n  color: #ff5555;\n}\n#J_EditCategoryModal p {\n  text-align: center;\n}\n#J_CropImage {\n  text-align: center;\n}\n#J_CropImage .xd-modal-body {\n  padding: 20px 0!important;\n}\n.uni_modalTitle {\n  display: inline-block;\n  color: #333;\n  font-size: 18px;\n}\n.uni_modalTip {\n  display: inline-block;\n  width: 394px;\n  height: 20px;\n  color: #333;\n  font-size: 12px;\n  line-height: 20px;\n  padding-left: 15px;\n  margin-left: 10px;\n  background: url(http://s16.mogucdn.com/p1/150811/upload_ieytezjrgq2tqmtggizdambqmeyde_394x20.png);\n}\n.unvisible {\n  visibility: hidden;\n}\n.edit-alertIcon {\n  text-align: center;\n}\n.edit-alertText {\n  text-align: center;\n  font-size: 16px;\n  color: #333;\n  padding: 20px;\n}\n.edit-alertText span {\n  display: block;\n  width: 300px;\n  margin-left: 30px;\n}\n.edit-alertText .alert_1 {\n  font-size: 20px;\n  color: #ff6666;\n}\n.edit-alertText .alert_2 {\n  font-size: 14px;\n  color: #666;\n}\n.edit-alertText a {\n  color: #666;\n  font-size: 14px;\n  display: inline-block;\n  border: 1px solid #ccc;\n  width: 100px;\n  height: 30px;\n  line-height: 30px;\n  margin-top: 30px;\n}\n.uni-gallery {\n  width: 960px;\n  height: 600px;\n  border-top: 1px solid #ccc;\n  margin-top: -40px;\n  margin-bottom: -40px;\n}\n.uni-gallery .uni-gallery-nav {\n  width: 224px;\n  border-right: 1px solid #ccc;\n  height: 100%;\n  float: left;\n}\n.uni-gallery .uni-gallery-nav .nav-title {\n  padding-left: 20px;\n  border-bottom: 1px solid #ccc;\n  line-height: 55px;\n  height: 55px;\n  font-size: 14px;\n  color: #999;\n}\n.uni-gallery .uni-gallery-nav .nav-items {\n  height: 545px;\n  overflow: scroll;\n}\n.uni-gallery .uni-gallery-nav .nav-items li {\n  cursor: pointer;\n  width: 100%;\n  height: 70px;\n  line-height: 25px;\n  padding: 10px;\n  padding-left: 20px;\n  border-bottom: 1px solid #ccc;\n  font-size: 14px;\n  color: #333;\n}\n.uni-gallery .uni-gallery-nav .nav-items li span {\n  display: block;\n}\n.uni-gallery .uni-gallery-cont {\n  width: 735px;\n  height: 100%;\n  margin-left: 225px;\n}\n.uni-gallery .uni-gallery-cont .cont-imgInfo {\n  height: 490px;\n  overflow: scroll;\n}\n.uni-gallery .uni-gallery-cont .cont-capacity {\n  height: 55px;\n  line-height: 55px;\n  padding-left: 30px;\n  font-size: 14px;\n  color: #333;\n}\n.uni-gallery .uni-gallery-cont .cont-imgWall {\n  overflow: auto;\n  padding-left: 30px;\n}\n.uni-gallery .uni-gallery-cont .cont-imgWall li {\n  width: 114px;\n  float: left;\n  height: 180px;\n  padding-right: 14px;\n  margin-bottom: 10px;\n  position: relative;\n  cursor: pointer;\n}\n.uni-gallery .uni-gallery-cont .cont-imgWall li .imgArea {\n  width: 100px;\n  height: 150px;\n  cursor: pointer;\n  background: #f6f6f6;\n  overflow: hidden;\n}\n.uni-gallery .uni-gallery-cont .cont-imgWall li .imgArea img {\n  width: 100%;\n  height: 100%;\n}\n.uni-gallery .uni-gallery-cont .cont-imgWall li .title {\n  height: 30px;\n  line-height: 30px;\n  font-size: 12px;\n  color: #666;\n  overflow: hidden;\n}\n.uni-gallery .uni-gallery-cont .cont-imgWall li .uniImg-mask {\n  width: 100px;\n  height: 150px;\n  left: 0;\n  top: 0;\n  background: #000;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  position: absolute;\n  z-index: 5;\n}\n.uni-gallery .uni-gallery-cont .cont-imgWall li .checked {\n  z-index: 10;\n  cursor: pointer;\n  width: 31px;\n  height: 31px;\n  display: block;\n  position: absolute;\n  top: 9px;\n  right: 23px;\n  background: url(http://s18.mogucdn.com/p1/150805/upload_iezgmnlemuztsnlegizdambqmmyde_31x31.png);\n}\n.uni-gallery .uni-gallery-cont .cont-imgWall li .unchecked {\n  z-index: 10;\n  cursor: pointer;\n  width: 28px;\n  height: 28px;\n  display: block;\n  position: absolute;\n  top: 10px;\n  right: 24px;\n  background: url(http://s18.mogucdn.com/p1/150805/upload_ie2tkytggq2dsnlegizdambqhayde_28x28.png);\n}\n.uni-gallery .uni-gallery-cont .cont-bottom {\n  height: 110px;\n  width: 100%;\n  background: #eee;\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-imgList .arrow-left {\n  cursor: pointer;\n  width: 12px;\n  height: 20px;\n  margin: 45px 10px 45px 20px;\n  float: left;\n  background: url(http://s18.mogucdn.com/p1/150805/upload_ie2tizdegy2dqnlegizdambqhayde_12x20.png);\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-imgList .imgArea {\n  margin-top: 25px;\n  width: 528px;\n  height: 60px;\n  overflow: hidden;\n  float: left;\n  position: relative;\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-imgList .checked-imgList {\n  margin-left: 0px;\n  position: absolute;\n  width: auto;\n  height: 60px;\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-imgList .checked-imgList li {\n  float: left;\n  width: 66px;\n  height: 66px;\n  background: #ccc;\n  overflow: hidden;\n  text-align: center;\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-imgList .checked-imgList li img {\n  width: 66px;\n  height: 66px;\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-imgList .arrow-right {\n  cursor: pointer;\n  width: 12px;\n  height: 20px;\n  margin: 45px 10px 45px 4px;\n  float: left;\n  background: url(http://s16.mogucdn.com/p1/150805/upload_iezwmmjwg42dqnlegizdambqgyyde_12x20.png);\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-btn {\n  float: left;\n  margin-top: 20px;\n  width: 130px;\n  height: 80px;\n  text-align: center;\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-btn .checked-count {\n  font-size: 12px;\n  color: #333;\n  line-height: 32px;\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-btn .checked-btn {\n  line-height: 30px;\n  background: #ccc;\n  color: #fff;\n  font-size: 14px;\n  width: 90px;\n  height: 30px;\n  margin-left: 20px;\n  display: block;\n}\n.uni-gallery .uni-gallery-cont .cont-bottom .bottom-btn .disabled {\n  background: #00cc99;\n}\n.dialog-mask {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: #000;\n  opacity: 0.5;\n  filter: alpha(opacity=50);\n  z-index: 5;\n}\n.uploadEntry {\n  display: none;\n  background: url(http://s17.mogucdn.com/p1/150811/upload_ieztgnjsmiydmm3ggizdambqgyyde_508x388.png);\n  width: 508px;\n  height: 388px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -254px;\n  margin-top: -199px;\n  z-index: 10;\n}\n.uploadEntry .uploadEntry_close {\n  width: 50px;\n  height: 50px;\n  float: right;\n  cursor: pointer;\n}\n.uploadEntry .file {\n  opacity: 0;\n  width: 290px;\n  height: 55px;\n  margin-top: 9px;\n  margin-left: 110px;\n  cursor: pointer;\n}\n.uploadEntry .uploadEntry_uni {\n  width: 290px;\n  height: 55px;\n  margin-left: 110px;\n  margin-top: 209px;\n  cursor: pointer;\n}\n.orderChecked {\n  background: #eee;\n}\n.dialog_close {\n  width: 50px;\n  height: 50px;\n  float: right;\n  cursor: pointer;\n}\n.dialog_notUser {\n  width: 440px;\n  height: 352px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -220px;\n  margin-top: -176px;\n  z-index: 10;\n  background: url(http://s16.mogucdn.com/p1/150813/upload_ieztizdbmqytky3ggizdambqgyyde_440x352.png) no-repeat;\n}\n.dialog_notUser .dialog_link {\n  display: block;\n  top: 280px;\n  left: 160px;\n  width: 120px;\n  height: 35px;\n  cursor: pointer;\n  position: absolute;\n}\n.dialog_user {\n  width: 440px;\n  height: 352px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -220px;\n  margin-top: -176px;\n  z-index: 10;\n  background: url(http://s18.mogucdn.com/p1/150812/upload_ieywkolggyzdaodggizdambqmeyde_440x352.png) no-repeat;\n}\n.dialog_user .dialog_sure {\n  width: 120px;\n  height: 38px;\n  cursor: pointer;\n  margin-top: 276px;\n  margin-left: 160px;\n}\n.dialog_download {\n  width: 440px;\n  height: 619px;\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  margin-left: -220px;\n  margin-top: -309px;\n  z-index: 10;\n  background: url(http://s16.mogucdn.com/p1/150813/upload_ie2winzzmuytky3ggizdambqhayde_440x619.png) no-repeat;\n}\n.dialog_download .dialog_link {\n  display: block;\n  top: 548px;\n  left: 160px;\n  width: 120px;\n  height: 35px;\n  cursor: pointer;\n  position: absolute;\n}\n.xd-psp-layer {\n  position: fixed ;\n  top: 0;\n  left: 0;\n  z-index: 100;\n  height: 100%;\n  width: 100%;\n}\n.xd-psp-layer .xd-psp-layer-mask {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  background: #000;\n  opacity: 0.5;\n}\n.xd-psp-layer .xd-psp-title {\n  margin: 30px 0 20px ;\n}\n.xd-psp-layer .xd-psp-layer-main {\n  padding: 0 30px 0px;\n  position: absolute;\n  z-index: 101;\n  background-color: #ffffff ;\n  top: 50% ;\n  left: 50% ;\n  width: 700px;\n  transform: translate(-50%, -50%);\n  margin: -191px 0 0 -350px \\9;\n}\n.xd-psp-layer .xd-psp-calendar-tip {\n  background: #e1e1e1 ;\n  display: inline-block;\n  padding: 0 6px ;\n  margin-left: 10px;\n}\n.xd-psp-layer .psp-save {\n  margin: 40px 0 20px;\n  text-align: center;\n}\n.xd-psp-layer .psp-close {\n  cursor: pointer;\n  position: absolute;\n  top: 0;\n  right: 0;\n  height: 40px;\n  width: 40px;\n  line-height: 40px;\n}\n", ""]);

/***/ },

/***/ 889:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(890);

/***/ },

/***/ 890:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @ignore
	 * DateTimeFormat for
	 * Inspired by DateTimeFormat from JDK.
	 * @author yiminghe@gmail.com
	 */

	'use strict';

	var GregorianCalendar = __webpack_require__(894);
	var enUsLocale = __webpack_require__(891);
	var MAX_VALUE = Number.MAX_VALUE;
	/**
	 * date or time style enum
	 * @enum {Number} Date.Formatter.Style
	 */
	var DateTimeStyle = {
	  /**
	   * full style
	   */
	  FULL: 0,
	  /**
	   * long style
	   */
	  LONG: 1,
	  /**
	   * medium style
	   */
	  MEDIUM: 2,
	  /**
	   * short style
	   */
	  SHORT: 3
	};

	/*
	 Letter    Date or Time Component    Presentation    Examples
	 G    Era designator    Text    AD
	 y    Year    Year    1996; 96
	 M    Month in year    Month    July; Jul; 07
	 w    Week in year    Number    27
	 W    Week in month    Number    2
	 D    Day in year    Number    189
	 d    Day in month    Number    10
	 F    Day of week in month    Number    2
	 E    Day in week    Text    Tuesday; Tue
	 a    Am/pm marker    Text    PM
	 H    Hour in day (0-23)    Number    0
	 k    Hour in day (1-24)    Number    24
	 K    Hour in am/pm (0-11)    Number    0
	 h    Hour in am/pm (1-12)    Number    12
	 m    Minute in hour    Number    30
	 s    Second in minute    Number    55
	 S    Millisecond    Number    978
	 x z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00
	 Z    Time zone    RFC 822 time zone    -0800
	 */

	var patternChars = new Array(GregorianCalendar.DAY_OF_WEEK_IN_MONTH + 2).join('1');
	var ERA = 0;
	var calendarIndexMap = {};

	patternChars = patternChars.split('');
	patternChars[ERA] = 'G';
	patternChars[GregorianCalendar.YEAR] = 'y';
	patternChars[GregorianCalendar.MONTH] = 'M';
	patternChars[GregorianCalendar.DAY_OF_MONTH] = 'd';
	patternChars[GregorianCalendar.HOUR_OF_DAY] = 'H';
	patternChars[GregorianCalendar.MINUTES] = 'm';
	patternChars[GregorianCalendar.SECONDS] = 's';
	patternChars[GregorianCalendar.MILLISECONDS] = 'S';
	patternChars[GregorianCalendar.WEEK_OF_YEAR] = 'w';
	patternChars[GregorianCalendar.WEEK_OF_MONTH] = 'W';
	patternChars[GregorianCalendar.DAY_OF_YEAR] = 'D';
	patternChars[GregorianCalendar.DAY_OF_WEEK_IN_MONTH] = 'F';

	(function () {
	  for (var index in patternChars) {
	    calendarIndexMap[patternChars[index]] = index;
	  }
	})();

	function mix(t, s) {
	  for (var p in s) {
	    t[p] = s[p];
	  }
	}

	var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g;
	var EMPTY = '';

	function substitute(str, o, regexp) {
	  if (typeof str !== 'string' || !o) {
	    return str;
	  }

	  return str.replace(regexp || SUBSTITUTE_REG, function (match, name) {
	    if (match.charAt(0) === '\\') {
	      return match.slice(1);
	    }
	    return o[name] === undefined ? EMPTY : o[name];
	  });
	}

	patternChars = patternChars.join('') + 'ahkKZE';

	function encode(lastField, count, compiledPattern) {
	  compiledPattern.push({
	    field: lastField,
	    count: count
	  });
	}

	function compile(pattern) {
	  var length = pattern.length;
	  var inQuote = false;
	  var compiledPattern = [];
	  var tmpBuffer = null;
	  var count = 0;
	  var lastField = -1;

	  for (var i = 0; i < length; i++) {
	    var c = pattern.charAt(i);

	    if (c === '\'') {
	      // '' is treated as a single quote regardless of being
	      // in a quoted section.
	      if (i + 1 < length) {
	        c = pattern.charAt(i + 1);
	        if (c === '\'') {
	          i++;
	          if (count !== 0) {
	            encode(lastField, count, compiledPattern);
	            lastField = -1;
	            count = 0;
	          }
	          if (inQuote) {
	            tmpBuffer += c;
	          }
	          continue;
	        }
	      }
	      if (!inQuote) {
	        if (count !== 0) {
	          encode(lastField, count, compiledPattern);
	          lastField = -1;
	          count = 0;
	        }
	        tmpBuffer = '';
	        inQuote = true;
	      } else {
	        compiledPattern.push({
	          text: tmpBuffer
	        });
	        inQuote = false;
	      }
	      continue;
	    }
	    if (inQuote) {
	      tmpBuffer += c;
	      continue;
	    }
	    if (!(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z')) {
	      if (count !== 0) {
	        encode(lastField, count, compiledPattern);
	        lastField = -1;
	        count = 0;
	      }
	      compiledPattern.push({
	        text: c
	      });
	      continue;
	    }

	    if (patternChars.indexOf(c) === -1) {
	      throw new Error('Illegal pattern character "' + c + '"');
	    }

	    if (lastField === -1 || lastField === c) {
	      lastField = c;
	      count++;
	      continue;
	    }
	    encode(lastField, count, compiledPattern);
	    lastField = c;
	    count = 1;
	  }

	  if (inQuote) {
	    throw new Error('Unterminated quote');
	  }

	  if (count !== 0) {
	    encode(lastField, count, compiledPattern);
	  }

	  return compiledPattern;
	}

	var zeroDigit = '0';

	// TODO zeroDigit localization??
	function zeroPaddingNumber(_x, _x2, _x3, _x4) {
	  var _again = true;

	  _function: while (_again) {
	    var value = _x,
	        minDigits = _x2,
	        maxDigits = _x3,
	        buffer = _x4;
	    _again = false;

	    // Optimization for 1, 2 and 4 digit numbers. This should
	    // cover most cases of formatting date/time related items.
	    // Note: This optimization code assumes that maxDigits is
	    // either 2 or Integer.MAX_VALUE (maxIntCount in format()).
	    buffer = buffer || [];
	    maxDigits = maxDigits || MAX_VALUE;
	    if (value >= 0) {
	      if (value < 100 && minDigits >= 1 && minDigits <= 2) {
	        if (value < 10 && minDigits === 2) {
	          buffer.push(zeroDigit);
	        }
	        buffer.push(value);
	        return buffer.join('');
	      } else if (value >= 1000 && value < 10000) {
	        if (minDigits === 4) {
	          buffer.push(value);
	          return buffer.join('');
	        }
	        if (minDigits === 2 && maxDigits === 2) {
	          _x = value % 100;
	          _x2 = 2;
	          _x3 = 2;
	          _x4 = buffer;
	          _again = true;
	          continue _function;
	        }
	      }
	    }
	    buffer.push(value + '');
	    return buffer.join('');
	  }
	}

	/**
	 *
	 * date time formatter for GregorianCalendar
	 *
	 *      @example
	 *
	 *          var calendar = new GregorianCalendar(2013,9,24);
	 *          // ' to escape
	 *          var formatter = new GregorianCalendarFormat("'today is' ''yyyy/MM/dd a''");
	 *          document.write(formatter.format(calendar));
	 *
	 * @class GregorianCalendarFormat
	 * @param {String} pattern patter string of date formatter
	 *
	 * <table border="1">
	 * <thead valign="bottom">
	 * <tr><th class="head">Letter</th>
	 * <th class="head">Date or Time Component</th>
	 * <th class="head">Presentation</th>
	 * <th class="head">Examples</th>
	 * </tr>
	 * </thead>
	 * <tbody valign="top">
	 * <tr><td>G</td>
	 * <td>Era designator</td>
	 * <td>Text</td>
	 * <td>AD</td>
	 * </tr>
	 * <tr><td>y</td>
	 * <td>Year</td>
	 * <td>Year</td>
	 * <td>1996; 96</td>
	 * </tr>
	 * <tr><td>M</td>
	 * <td>Month in year</td>
	 * <td>Month</td>
	 * <td>July; Jul; 07</td>
	 * </tr>
	 * <tr><td>w</td>
	 * <td>Week in year</td>
	 * <td>Number</td>
	 * <td>27</td>
	 * </tr>
	 * <tr><td>W</td>
	 * <td>Week in month</td>
	 * <td>Number</td>
	 * <td>2</td>
	 * </tr>
	 * <tr><td>D</td>
	 * <td>Day in year</td>
	 * <td>Number</td>
	 * <td>189</td>
	 * </tr>
	 * <tr><td>d</td>
	 * <td>Day in month</td>
	 * <td>Number</td>
	 * <td>10</td>
	 * </tr>
	 * <tr><td>F</td>
	 * <td>Day of week in month</td>
	 * <td>Number</td>
	 * <td>2</td>
	 * </tr>
	 * <tr><td>E</td>
	 * <td>Day in week</td>
	 * <td>Text</td>
	 * <td>Tuesday; Tue</td>
	 * </tr>
	 * <tr><td>a</td>
	 * <td>Am/pm marker</td>
	 * <td>Text</td>
	 * <td>PM</td>
	 * </tr>
	 * <tr><td>H</td>
	 *       <td>Hour in day (0-23)</td>
	 * <td>Number</td>
	 * <td>0</td>
	 * </tr>
	 * <tr><td>k</td>
	 *       <td>Hour in day (1-24)</td>
	 * <td>Number</td>
	 * <td>24</td>
	 * </tr>
	 * <tr><td>K</td>
	 * <td>Hour in am/pm (0-11)</td>
	 * <td>Number</td>
	 * <td>0</td>
	 * </tr>
	 * <tr><td>h</td>
	 * <td>Hour in am/pm (1-12)</td>
	 * <td>Number</td>
	 * <td>12</td>
	 * </tr>
	 * <tr><td>m</td>
	 * <td>Minute in hour</td>
	 * <td>Number</td>
	 * <td>30</td>
	 * </tr>
	 * <tr><td>s</td>
	 * <td>Second in minute</td>
	 * <td>Number</td>
	 * <td>55</td>
	 * </tr>
	 * <tr><td>S</td>
	 * <td>Millisecond</td>
	 * <td>Number</td>
	 * <td>978</td>
	 * </tr>
	 * <tr><td>x/z</td>
	 * <td>Time zone</td>
	 * <td>General time zone</td>
	 * <td>Pacific Standard Time; PST; GMT-08:00</td>
	 * </tr>
	 * <tr><td>Z</td>
	 * <td>Time zone</td>
	 * <td>RFC 822 time zone</td>
	 * <td>-0800</td>
	 * </tr>
	 * </tbody>
	 * </table>

	 * @param {Object} locale format locale
	 */
	function DateTimeFormat(pattern, locale) {
	  this.locale = locale || enUsLocale;
	  this.originalPattern = pattern;
	  this.pattern = compile(pattern);
	}

	function formatField(field, count, locale, calendar) {
	  var current, value;
	  switch (field) {
	    case 'G':
	      value = calendar.getYear() > 0 ? 1 : 0;
	      current = locale.eras[value];
	      break;
	    case 'y':
	      value = calendar.getYear();
	      if (value <= 0) {
	        value = 1 - value;
	      }
	      current = zeroPaddingNumber(value, 2, count !== 2 ? MAX_VALUE : 2);
	      break;
	    case 'M':
	      value = calendar.getMonth();
	      if (count >= 4) {
	        current = locale.months[value];
	      } else if (count === 3) {
	        current = locale.shortMonths[value];
	      } else {
	        current = zeroPaddingNumber(value + 1, count);
	      }
	      break;
	    case 'k':
	      current = zeroPaddingNumber(calendar.getHourOfDay() || 24, count);
	      break;
	    case 'E':
	      value = calendar.getDayOfWeek();
	      current = count >= 4 ? locale.weekdays[value] : locale.shortWeekdays[value];
	      break;
	    case 'a':
	      current = locale.ampms[calendar.getHourOfDay() >= 12 ? 1 : 0];
	      break;
	    case 'h':
	      current = zeroPaddingNumber(calendar.getHourOfDay() % 12 || 12, count);
	      break;
	    case 'K':
	      current = zeroPaddingNumber(calendar.getHourOfDay() % 12, count);
	      break;
	    case 'Z':
	      var offset = calendar.getTimezoneOffset();
	      var parts = [offset < 0 ? '-' : '+'];
	      offset = Math.abs(offset);
	      parts.push(zeroPaddingNumber(Math.floor(offset / 60) % 100, 2), zeroPaddingNumber(offset % 60, 2));
	      current = parts.join('');
	      break;
	    default:
	      // case 'd':
	      // case 'H':
	      // case 'm':
	      // case 's':
	      // case 'S':
	      // case 'D':
	      // case 'F':
	      // case 'w':
	      // case 'W':
	      var index = calendarIndexMap[field];
	      value = calendar.get(index);
	      current = zeroPaddingNumber(value, count);
	  }
	  return current;
	}

	function matchField(dateStr, startIndex, matches) {
	  var matchedLen = -1;
	  var index = -1;
	  var i;
	  var len = matches.length;
	  for (i = 0; i < len; i++) {
	    var m = matches[i];
	    var mLen = m.length;
	    if (mLen > matchedLen && matchPartString(dateStr, startIndex, m, mLen)) {
	      matchedLen = mLen;
	      index = i;
	    }
	  }
	  return index >= 0 ? {
	    value: index,
	    startIndex: startIndex + matchedLen
	  } : null;
	}

	function matchPartString(dateStr, startIndex, match, mLen) {
	  for (var i = 0; i < mLen; i++) {
	    if (dateStr.charAt(startIndex + i) !== match.charAt(i)) {
	      return false;
	    }
	  }
	  return true;
	}

	function getLeadingNumberLen(str) {
	  var i, c;
	  var len = str.length;
	  for (i = 0; i < len; i++) {
	    c = str.charAt(i);
	    if (c < '0' || c > '9') {
	      break;
	    }
	  }
	  return i;
	}

	function matchNumber(dateStr, startIndex, count, obeyCount) {
	  var str = dateStr;
	  var n;
	  if (obeyCount) {
	    if (dateStr.length <= startIndex + count) {
	      return null;
	    }
	    str = dateStr.slice(startIndex, startIndex + count);
	    if (!str.match(/^\d+$/)) {
	      throw new Error('GregorianCalendarFormat parse error, dateStr: ' + dateStr + ', patter: ' + this.originalPattern);
	    }
	  } else {
	    str = str.slice(startIndex);
	  }
	  n = parseInt(str, 10);
	  if (isNaN(n)) {
	    throw new Error('GregorianCalendarFormat parse error, dateStr: ' + dateStr + ', patter: ' + this.originalPattern);
	  }
	  return {
	    value: n,
	    startIndex: startIndex + getLeadingNumberLen(str)
	  };
	}

	function parseField(calendar, dateStr, startIndex, field, count, obeyCount, tmp) {
	  var match, year, hour;
	  if (dateStr.length <= startIndex) {
	    return startIndex;
	  }
	  var locale = this.locale;
	  switch (field) {
	    case 'G':
	      if (match = matchField(dateStr, startIndex, locale.eras)) {
	        if (calendar.isSetYear()) {
	          if (match.value === 0) {
	            year = calendar.getYear();
	            calendar.setYear(1 - year);
	          }
	        } else {
	          tmp.era = match.value;
	        }
	      }
	      break;
	    case 'y':
	      if (match = matchNumber.call(this, dateStr, startIndex, count, obeyCount)) {
	        year = match.value;
	        if ('era' in tmp) {
	          if (tmp.era === 0) {
	            year = 1 - year;
	          }
	        }
	        calendar.setYear(year);
	      }
	      break;
	    case 'M':
	      var month;
	      if (count >= 3) {
	        if (match = matchField(dateStr, startIndex, locale[count === 3 ? 'shortMonths' : 'months'])) {
	          month = match.value;
	        }
	      } else {
	        if (match = matchNumber.call(this, dateStr, startIndex, count, obeyCount)) {
	          month = match.value - 1;
	        }
	      }
	      if (match) {
	        calendar.setMonth(month);
	      }
	      break;
	    case 'k':
	      if (match = matchNumber.call(this, dateStr, startIndex, count, obeyCount)) {
	        calendar.setHourOfDay(match.value % 24);
	      }
	      break;
	    case 'E':
	      if (match = matchField(dateStr, startIndex, locale[count > 3 ? 'weekdays' : 'shortWeekdays'])) {
	        calendar.setDayOfWeek(match.value);
	      }
	      break;
	    case 'a':
	      if (match = matchField(dateStr, startIndex, locale.ampms)) {
	        if (calendar.isSetHourOfDay()) {
	          if (match.value) {
	            hour = calendar.getHourOfDay();
	            if (hour < 12) {
	              calendar.setHourOfDay((hour + 12) % 24);
	            }
	          }
	        } else {
	          tmp.ampm = match.value;
	        }
	      }
	      break;
	    case 'h':
	      if (match = matchNumber.call(this, dateStr, startIndex, count, obeyCount)) {
	        hour = match.value %= 12;
	        if (tmp.ampm) {
	          hour += 12;
	        }
	        calendar.setHourOfDay(hour);
	      }
	      break;
	    case 'K':
	      if (match = matchNumber.call(this, dateStr, startIndex, count, obeyCount)) {
	        hour = match.value;
	        if (tmp.ampm) {
	          hour += 12;
	        }
	        calendar.setHourOfDay(hour);
	      }
	      break;
	    case 'Z':
	      var sign = 1;
	      var zoneChar = dateStr.charAt(startIndex);
	      if (zoneChar === '-') {
	        sign = -1;
	        startIndex++;
	      } else if (zoneChar === '+') {
	        startIndex++;
	      } else {
	        break;
	      }
	      if (match = matchNumber.call(this, dateStr, startIndex, 2, true)) {
	        var zoneOffset = match.value * 60;
	        startIndex = match.startIndex;
	        if (match = matchNumber.call(this, dateStr, startIndex, 2, true)) {
	          zoneOffset += match.value;
	        }
	        calendar.setTimezoneOffset(zoneOffset);
	      }
	      break;
	    default:
	      // case 'd':
	      // case 'H':
	      // case 'm':
	      // case 's':
	      // case 'S':
	      // case 'D':
	      // case 'F':
	      // case 'w':
	      // case 'W'
	      if (match = matchNumber.call(this, dateStr, startIndex, count, obeyCount)) {
	        var index = calendarIndexMap[field];
	        calendar.set(index, match.value);
	      }
	  }
	  if (match) {
	    startIndex = match.startIndex;
	  }
	  return startIndex;
	}

	mix(DateTimeFormat.prototype, {
	  /**
	   * format a GregorianDate instance according to specified pattern
	   * @param {GregorianCalendar} calendar GregorianDate instance
	   * @returns {string} formatted string of GregorianDate instance
	   */
	  format: function format(calendar) {
	    if (!calendar.isGregorianCalendar) {
	      throw new Error('calendar must be type of GregorianCalendar');
	    }
	    var i;
	    var ret = [];
	    var pattern = this.pattern;
	    var len = pattern.length;
	    for (i = 0; i < len; i++) {
	      var comp = pattern[i];
	      if (comp.text) {
	        ret.push(comp.text);
	      } else if ('field' in comp) {
	        ret.push(formatField(comp.field, comp.count, this.locale, calendar));
	      }
	    }
	    return ret.join('');
	  },

	  /**
	   * parse a formatted string of GregorianDate instance according to specified pattern
	   * @param {String} dateStr formatted string of GregorianDate
	   * @returns {GregorianCalendar}
	   */
	  parse: function parse(dateStr, calendarLocale) {
	    var calendar = new GregorianCalendar(calendarLocale);
	    var i;
	    var j;
	    var tmp = {};
	    var obeyCount = false;
	    var dateStrLen = dateStr.length;
	    var errorIndex = -1;
	    var startIndex = 0;
	    var oldStartIndex = 0;
	    var pattern = this.pattern;
	    var len = pattern.length;

	    loopPattern: {
	      for (i = 0; errorIndex < 0 && i < len; i++) {
	        var comp = pattern[i],
	            text,
	            textLen;
	        oldStartIndex = startIndex;
	        if (text = comp.text) {
	          textLen = text.length;
	          if (textLen + startIndex > dateStrLen) {
	            errorIndex = startIndex;
	          } else {
	            for (j = 0; j < textLen; j++) {
	              if (text.charAt(j) !== dateStr.charAt(j + startIndex)) {
	                errorIndex = startIndex;
	                break loopPattern;
	              }
	            }
	            startIndex += textLen;
	          }
	        } else if ('field' in comp) {
	          obeyCount = false;
	          var nextComp = pattern[i + 1];
	          if (nextComp) {
	            if ('field' in nextComp) {
	              obeyCount = true;
	            } else {
	              var c = nextComp.text.charAt(0);
	              if (c >= '0' && c <= '9') {
	                obeyCount = true;
	              }
	            }
	          }
	          startIndex = parseField.call(this, calendar, dateStr, startIndex, comp.field, comp.count, obeyCount, tmp);
	          if (startIndex === oldStartIndex) {
	            errorIndex = startIndex;
	          }
	        }
	      }
	    }

	    if (errorIndex >= 0) {
	      console.error('error when parsing date');
	      console.error(dateStr);
	      console.error(dateStr.slice(0, errorIndex) + '^');
	      return undefined;
	    }
	    return calendar;
	  }
	});

	mix(DateTimeFormat, {
	  Style: DateTimeStyle,

	  /**
	   * get a formatter instance of short style pattern.
	   * en-us: M/d/yy h:mm a
	   * zh-cn: yy-M-d ah:mm
	   * @param {Object} locale locale object
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getInstance: function getInstance(locale) {
	    return this.getDateTimeInstance(DateTimeStyle.SHORT, DateTimeStyle.SHORT, locale);
	  },

	  /**
	   * get a formatter instance of specified date style.
	   * @param {Date.Formatter.Style} dateStyle date format style
	   * @param {Object} locale
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getDateInstance: function getDateInstance(dateStyle, locale) {
	    return this.getDateTimeInstance(dateStyle, undefined, locale);
	  },

	  /**
	   * get a formatter instance of specified date style and time style.
	   * @param {Date.Formatter.Style} dateStyle date format style
	   * @param {Date.Formatter.Style} timeStyle time format style
	   * @param {Object} locale
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getDateTimeInstance: function getDateTimeInstance(dateStyle, timeStyle, locale) {
	    locale = locale || enUsLocale;
	    var datePattern = '';
	    if (dateStyle !== undefined) {
	      datePattern = locale.datePatterns[dateStyle];
	    }
	    var timePattern = '';
	    if (timeStyle !== undefined) {
	      timePattern = locale.timePatterns[timeStyle];
	    }
	    var pattern = datePattern;
	    if (timePattern) {
	      if (datePattern) {
	        pattern = substitute(locale.dateTimePattern, {
	          date: datePattern,
	          time: timePattern
	        });
	      } else {
	        pattern = timePattern;
	      }
	    }
	    return new DateTimeFormat(pattern, locale);
	  },

	  /**
	   * get a formatter instance of specified time style.
	   * @param {Date.Formatter.Style} timeStyle time format style
	   * @param {Object} locale
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getTimeInstance: function getTimeInstance(timeStyle, locale) {
	    return this.getDateTimeInstance(undefined, timeStyle, locale);
	  }
	});

	module.exports = DateTimeFormat;

	DateTimeFormat.version = '@VERSION@';

	// gc_format@163.com

/***/ },

/***/ 891:
/***/ function(module, exports) {

	/**
	 * en-us locale
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	'use strict';

	module.exports = {
	  eras: ['BC', 'AD'],
	  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	  weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	  shortWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	  veryShortWeekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	  ampms: ['AM', 'PM'],
	  datePatterns: ['EEEE, MMMM d, yyyy', 'MMMM d, yyyy', 'MMM d, yyyy', 'M/d/yy'],
	  timePatterns: ['h:mm:ss a \'GMT\'Z', 'h:mm:ss a', 'h:mm:ss a', 'h:mm a'],
	  dateTimePattern: '{date} {time}'
	};

/***/ },

/***/ 892:
/***/ function(module, exports) {

	/**
	 * zh-cn locale
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	'use strict';

	module.exports = {
	  eras: ['公元前', '公元'],
	  months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	  shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
	  weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	  shortWeekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
	  veryShortWeekdays: ['日', '一', '二', '三', '四', '五', '六'],
	  ampms: ['上午', '下午'],
	  /*jshint quotmark: false*/
	  datePatterns: ["yyyy'年'M'月'd'日' EEEE", "yyyy'年'M'月'd'日'", "yyyy-M-d", "yy-M-d"],
	  timePatterns: ["ahh'时'mm'分'ss'秒' 'GMT'Z", "ahh'时'mm'分'ss'秒'", "H:mm:ss", "ah:mm"],
	  dateTimePattern: '{date} {time}'
	};

/***/ },

/***/ 893:
/***/ function(module, exports) {

	/*
	 * @ignore
	 * const for gregorian date
	 * @author yiminghe@gmail.com
	 */

	"use strict";

	module.exports = {
	  /*
	   * Enum indicating sunday
	   * @type Number
	   * @member Date.Gregorian
	   */
	  SUNDAY: 0,
	  /*
	   * Enum indicating monday
	   * @type Number
	   * @member Date.Gregorian
	   */
	  MONDAY: 1,
	  /*
	   * Enum indicating tuesday
	   * @type Number
	   * @member Date.Gregorian
	   */
	  TUESDAY: 2,
	  /*
	   * Enum indicating wednesday
	   * @type Number
	   * @member Date.Gregorian
	   */
	  WEDNESDAY: 3,
	  /*
	   * Enum indicating thursday
	   * @type Number
	   * @member Date.Gregorian
	   */
	  THURSDAY: 4,
	  /*
	   * Enum indicating friday
	   * @type Number
	   * @member Date.Gregorian
	   */
	  FRIDAY: 5,
	  /*
	   * Enum indicating saturday
	   * @type Number
	   * @member Date.Gregorian
	   */
	  SATURDAY: 6,
	  /*
	   * Enum indicating january
	   * @type Number
	   * @member Date.Gregorian
	   */
	  JANUARY: 0,
	  /*
	   * Enum indicating february
	   * @type Number
	   * @member Date.Gregorian
	   */
	  FEBRUARY: 1,
	  /*
	   * Enum indicating march
	   * @type Number
	   * @member Date.Gregorian
	   */
	  MARCH: 2,
	  /*
	   * Enum indicating april
	   * @type Number
	   * @member Date.Gregorian
	   */
	  APRIL: 3,
	  /*
	   * Enum indicating may
	   * @type Number
	   * @member Date.Gregorian
	   */
	  MAY: 4,
	  /*
	   * Enum indicating june
	   * @type Number
	   * @member Date.Gregorian
	   */
	  JUNE: 5,
	  /*
	   * Enum indicating july
	   * @type Number
	   * @member Date.Gregorian
	   */
	  JULY: 6,
	  /*
	   * Enum indicating august
	   * @type Number
	   * @member Date.Gregorian
	   */
	  AUGUST: 7,
	  /*
	   * Enum indicating september
	   * @type Number
	   * @member Date.Gregorian
	   */
	  SEPTEMBER: 8,
	  /*
	   * Enum indicating october
	   * @type Number
	   * @member Date.Gregorian
	   */
	  OCTOBER: 9,
	  /*
	   * Enum indicating november
	   * @type Number
	   * @member Date.Gregorian
	   */
	  NOVEMBER: 10,
	  /*
	   * Enum indicating december
	   * @type Number
	   * @member Date.Gregorian
	   */
	  DECEMBER: 11
	};

/***/ },

/***/ 894:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * GregorianCalendar class
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	'use strict';

	var toInt = parseInt;
	var Utils = __webpack_require__(897);
	var defaultLocale = __webpack_require__(895);
	var Const = __webpack_require__(893);

	/*
	 * GregorianCalendar class.
	 *
	 * - no arguments:
	 *   Constructs a default GregorianCalendar using the current time
	 *   in the default time zone with the default locale.
	 * - one argument locale:
	 *   Constructs a GregorianCalendar
	 *   based on the current time in the default time zone with the given locale.
	 *
	 * @class Date.Gregorian
	 */
	function GregorianCalendar(loc) {
	  var locale = loc || defaultLocale;

	  this.locale = locale;

	  this.fields = [];

	  /*
	   * The currently set time for this date.
	   * @protected
	   * @type Number|undefined
	   */
	  this.time = undefined;
	  /*
	   * The timezoneOffset in minutes used by this date.
	   * @type Number
	   * @protected
	   */

	  this.timezoneOffset = locale.timezoneOffset;

	  /*
	   * The first day of the week
	   * @type Number
	   * @protected
	   */
	  this.firstDayOfWeek = locale.firstDayOfWeek;

	  /*
	   * The number of days required for the first week in a month or year,
	   * with possible values from 1 to 7.
	   * @@protected
	   * @type Number
	   */
	  this.minimalDaysInFirstWeek = locale.minimalDaysInFirstWeek;

	  this.fieldsComputed = false;
	}

	Utils.mix(GregorianCalendar, Const);

	Utils.mix(GregorianCalendar, {
	  Utils: Utils,

	  defaultLocale: defaultLocale,

	  /*
	   * Determines if the given year is a leap year.
	   * Returns true if the given year is a leap year. To specify BC year numbers,
	   * 1 - year number must be given. For example, year BC 4 is specified as -3.
	   * @param {Number} year the given year.
	   * @returns {Boolean} true if the given year is a leap year; false otherwise.
	   * @static
	   * @method
	   */
	  isLeapYear: Utils.isLeapYear,

	  /*
	   * Enum indicating year field of date
	   * @type Number
	   */
	  YEAR: 1,
	  /*
	   * Enum indicating month field of date
	   * @type Number
	   */
	  MONTH: 2,
	  /*
	   * Enum indicating the day of the month
	   * @type Number
	   */
	  DAY_OF_MONTH: 3,
	  /*
	   * Enum indicating the hour (24).
	   * @type Number
	   */
	  HOUR_OF_DAY: 4,
	  /*
	   * Enum indicating the minute of the day
	   * @type Number
	   */
	  MINUTES: 5,
	  /*
	   * Enum indicating the second of the day
	   * @type Number
	   */
	  SECONDS: 6,
	  /*
	   * Enum indicating the millisecond of the day
	   * @type Number
	   */
	  MILLISECONDS: 7,
	  /*
	   * Enum indicating the week number within the current year
	   * @type Number
	   */
	  WEEK_OF_YEAR: 8,
	  /*
	   * Enum indicating the week number within the current month
	   * @type Number
	   */
	  WEEK_OF_MONTH: 9,

	  /*
	   * Enum indicating the day of the day number within the current year
	   * @type Number
	   */
	  DAY_OF_YEAR: 10,
	  /*
	   * Enum indicating the day of the week
	   * @type Number
	   */
	  DAY_OF_WEEK: 11,
	  /*
	   * Enum indicating the day of the ordinal number of the day of the week
	   * @type Number
	   */
	  DAY_OF_WEEK_IN_MONTH: 12,

	  /*
	   * Enum indicating am
	   * @type Number
	   */
	  AM: 0,
	  /*
	   * Enum indicating pm
	   * @type Number
	   */
	  PM: 1
	});

	var FIELDS = ['', 'Year', 'Month', 'DayOfMonth', 'HourOfDay', 'Minutes', 'Seconds', 'Milliseconds', 'WeekOfYear', 'WeekOfMonth', 'DayOfYear', 'DayOfWeek', 'DayOfWeekInMonth'];

	var YEAR = GregorianCalendar.YEAR;
	var MONTH = GregorianCalendar.MONTH;
	var DAY_OF_MONTH = GregorianCalendar.DAY_OF_MONTH;
	var HOUR_OF_DAY = GregorianCalendar.HOUR_OF_DAY;
	var MINUTE = GregorianCalendar.MINUTES;
	var SECONDS = GregorianCalendar.SECONDS;

	var MILLISECONDS = GregorianCalendar.MILLISECONDS;
	var DAY_OF_WEEK_IN_MONTH = GregorianCalendar.DAY_OF_WEEK_IN_MONTH;
	var DAY_OF_YEAR = GregorianCalendar.DAY_OF_YEAR;
	var DAY_OF_WEEK = GregorianCalendar.DAY_OF_WEEK;

	var WEEK_OF_MONTH = GregorianCalendar.WEEK_OF_MONTH;
	var WEEK_OF_YEAR = GregorianCalendar.WEEK_OF_YEAR;

	var MONTH_LENGTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based
	var LEAP_MONTH_LENGTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based

	var ONE_SECOND = 1000;
	var ONE_MINUTE = 60 * ONE_SECOND;
	var ONE_HOUR = 60 * ONE_MINUTE;
	var ONE_DAY = 24 * ONE_HOUR;
	var ONE_WEEK = ONE_DAY * 7;

	var EPOCH_OFFSET = 719163; // Fixed date of January 1, 1970 (Gregorian)

	var mod = Utils.mod;
	var _isLeapYear = Utils.isLeapYear;
	var floorDivide = Math.floor;

	var MIN_VALUES = [undefined, 1, // YEAR
	GregorianCalendar.JANUARY, // MONTH
	1, // DAY_OF_MONTH
	0, // HOUR_OF_DAY
	0, // MINUTE
	0, // SECONDS
	0, // MILLISECONDS

	1, // WEEK_OF_YEAR
	undefined, // WEEK_OF_MONTH

	1, // DAY_OF_YEAR
	GregorianCalendar.SUNDAY, // DAY_OF_WEEK
	1];

	// DAY_OF_WEEK_IN_MONTH
	var MAX_VALUES = [undefined, 292278994, // YEAR
	GregorianCalendar.DECEMBER, // MONTH
	undefined, // DAY_OF_MONTH
	23, // HOUR_OF_DAY
	59, // MINUTE
	59, // SECONDS
	999, // MILLISECONDS
	undefined, // WEEK_OF_YEAR
	undefined, // WEEK_OF_MONTH
	undefined, // DAY_OF_YEAR
	GregorianCalendar.SATURDAY, // DAY_OF_WEEK
	undefined];

	// ------------------- private start

	// DAY_OF_WEEK_IN_MONTH
	function getMonthLength(year, month) {
	  return _isLeapYear(year) ? LEAP_MONTH_LENGTH[month] : MONTH_LENGTH[month];
	}

	function getYearLength(year) {
	  return _isLeapYear(year) ? 366 : 365;
	}

	function adjustDayOfMonth(self) {
	  var fields = self.fields;
	  var year = fields[YEAR];
	  var month = fields[MONTH];
	  var monthLen = getMonthLength(year, month);
	  var dayOfMonth = fields[DAY_OF_MONTH];
	  if (dayOfMonth > monthLen) {
	    self.set(DAY_OF_MONTH, monthLen);
	  }
	}

	function getDayOfWeekDateOnOrBefore(fixedDate, dayOfWeek) {
	  // 1.1.1 is monday
	  // one week has 7 days
	  return fixedDate - mod(fixedDate - dayOfWeek, 7);
	}

	function getWeekNumber(self, fixedDay1, fixedDate) {
	  var fixedDay1st = getDayOfWeekDateOnOrBefore(fixedDay1 + 6, self.firstDayOfWeek);
	  var nDays = fixedDay1st - fixedDay1;
	  if (nDays >= self.minimalDaysInFirstWeek) {
	    fixedDay1st -= 7;
	  }
	  var normalizedDayOfPeriod = fixedDate - fixedDay1st;
	  return floorDivide(normalizedDayOfPeriod / 7) + 1;
	}

	// ------------------- private end

	GregorianCalendar.prototype = {
	  constructor: GregorianCalendar,

	  isGregorianCalendar: 1,

	  /*
	   * Determines if current year is a leap year.
	   * Returns true if the given year is a leap year. To specify BC year numbers,
	   * 1 - year number must be given. For example, year BC 4 is specified as -3.
	   * @returns {Boolean} true if the given year is a leap year; false otherwise.
	   * @method
	   * @member Date.Gregorian
	   */
	  isLeapYear: function isLeapYear() {
	    return _isLeapYear(this.getYear());
	  },

	  /*
	   * Return local info for current date instance
	   * @returns {Object}
	   */
	  getLocale: function getLocale() {
	    return this.locale;
	  },

	  /*
	   * Returns the minimum value for
	   * the given calendar field of this GregorianCalendar instance.
	   * The minimum value is defined as the smallest value
	   * returned by the get method for any possible time value,
	   * taking into consideration the current values of the getFirstDayOfWeek,
	   * getMinimalDaysInFirstWeek.
	   * @param field the calendar field.
	   * @returns {Number} the minimum value for the given calendar field.
	   */
	  getActualMinimum: function getActualMinimum(field) {
	    if (MIN_VALUES[field] !== undefined) {
	      return MIN_VALUES[field];
	    }
	    if (field === WEEK_OF_MONTH) {
	      var cal = this.clone();
	      cal.clear();
	      cal.set(this.fields[YEAR], this.fields[MONTH], 1);
	      return cal.get(WEEK_OF_MONTH);
	    }

	    throw new Error('minimum value not defined!');
	  },

	  /*
	   * Returns the maximum value for the given calendar field
	   * of this GregorianCalendar instance.
	   * The maximum value is defined as the largest value returned
	   * by the get method for any possible time value, taking into consideration
	   * the current values of the getFirstDayOfWeek, getMinimalDaysInFirstWeek methods.
	   * @param field the calendar field.
	   * @returns {Number} the maximum value for the given calendar field.
	   */
	  getActualMaximum: function getActualMaximum(field) {
	    if (MAX_VALUES[field] !== undefined) {
	      return MAX_VALUES[field];
	    }
	    var value = undefined;
	    var fields = this.fields;
	    switch (field) {
	      case DAY_OF_MONTH:
	        value = getMonthLength(fields[YEAR], fields[MONTH]);
	        break;

	      case WEEK_OF_YEAR:
	        var endOfYear = this.clone();
	        endOfYear.clear();
	        endOfYear.set(fields[YEAR], GregorianCalendar.DECEMBER, 31);
	        value = endOfYear.get(WEEK_OF_YEAR);
	        if (value === 1) {
	          value = 52;
	        }
	        break;

	      case WEEK_OF_MONTH:
	        var endOfMonth = this.clone();
	        endOfMonth.clear();
	        endOfMonth.set(fields[YEAR], fields[MONTH], getMonthLength(fields[YEAR], fields[MONTH]));
	        value = endOfMonth.get(WEEK_OF_MONTH);
	        break;

	      case DAY_OF_YEAR:
	        value = getYearLength(fields[YEAR]);
	        break;

	      case DAY_OF_WEEK_IN_MONTH:
	        value = toInt((getMonthLength(fields[YEAR], fields[MONTH]) - 1) / 7) + 1;
	        break;
	      default:
	        break;
	    }
	    if (value === undefined) {
	      throw new Error('maximum value not defined!');
	    }
	    return value;
	  },

	  /*
	   * Determines if the given calendar field has a value set,
	   * including cases that the value has been set by internal fields calculations
	   * triggered by a get method call.
	   * @param field the calendar field to be cleared.
	   * @returns {boolean} true if the given calendar field has a value set; false otherwise.
	   */
	  isSet: function isSet(field) {
	    return this.fields[field] !== undefined;
	  },

	  /*
	   * Converts the time value (millisecond offset from the Epoch)
	   * to calendar field values.
	   * @protected
	   */
	  computeFields: function computeFields() {
	    var time = this.time;
	    var timezoneOffset = this.timezoneOffset * ONE_MINUTE;
	    var fixedDate = toInt(timezoneOffset / ONE_DAY);
	    var timeOfDay = timezoneOffset % ONE_DAY;
	    fixedDate += toInt(time / ONE_DAY);
	    timeOfDay += time % ONE_DAY;
	    if (timeOfDay >= ONE_DAY) {
	      timeOfDay -= ONE_DAY;
	      fixedDate++;
	    } else {
	      while (timeOfDay < 0) {
	        timeOfDay += ONE_DAY;
	        fixedDate--;
	      }
	    }

	    fixedDate += EPOCH_OFFSET;

	    var date = Utils.getGregorianDateFromFixedDate(fixedDate);

	    var year = date.year;

	    var fields = this.fields;
	    fields[YEAR] = year;
	    fields[MONTH] = date.month;
	    fields[DAY_OF_MONTH] = date.dayOfMonth;
	    fields[DAY_OF_WEEK] = date.dayOfWeek;

	    if (timeOfDay !== 0) {
	      fields[HOUR_OF_DAY] = toInt(timeOfDay / ONE_HOUR);
	      var r = timeOfDay % ONE_HOUR;
	      fields[MINUTE] = toInt(r / ONE_MINUTE);
	      r %= ONE_MINUTE;
	      fields[SECONDS] = toInt(r / ONE_SECOND);
	      fields[MILLISECONDS] = r % ONE_SECOND;
	    } else {
	      fields[HOUR_OF_DAY] = fields[MINUTE] = fields[SECONDS] = fields[MILLISECONDS] = 0;
	    }

	    var fixedDateJan1 = Utils.getFixedDate(year, GregorianCalendar.JANUARY, 1);
	    var dayOfYear = fixedDate - fixedDateJan1 + 1;
	    var fixDateMonth1 = fixedDate - date.dayOfMonth + 1;

	    fields[DAY_OF_YEAR] = dayOfYear;
	    fields[DAY_OF_WEEK_IN_MONTH] = toInt((date.dayOfMonth - 1) / 7) + 1;

	    var weekOfYear = getWeekNumber(this, fixedDateJan1, fixedDate);

	    // 本周没有足够的时间在当前年
	    if (weekOfYear === 0) {
	      // If the date belongs to the last week of the
	      // previous year, use the week number of "12/31" of
	      // the "previous" year.
	      var fixedDec31 = fixedDateJan1 - 1;
	      var prevJan1 = fixedDateJan1 - getYearLength(year - 1);
	      weekOfYear = getWeekNumber(this, prevJan1, fixedDec31);
	    } else
	      // 本周是年末最后一周，可能有足够的时间在新的一年
	      if (weekOfYear >= 52) {
	        var nextJan1 = fixedDateJan1 + getYearLength(year);
	        var nextJan1st = getDayOfWeekDateOnOrBefore(nextJan1 + 6, this.firstDayOfWeek);
	        var nDays = nextJan1st - nextJan1;
	        // 本周有足够天数在新的一年
	        if (nDays >= this.minimalDaysInFirstWeek &&
	        // 当天确实在本周，weekOfYear === 53 时是不需要这个判断
	        fixedDate >= nextJan1st - 7) {
	          weekOfYear = 1;
	        }
	      }

	    fields[WEEK_OF_YEAR] = weekOfYear;
	    fields[WEEK_OF_MONTH] = getWeekNumber(this, fixDateMonth1, fixedDate);

	    this.fieldsComputed = true;
	  },

	  /*
	   * Converts calendar field values to the time value
	   * (millisecond offset from the Epoch).
	   * @protected
	   */
	  computeTime: function computeTime() {
	    if (!this.isSet(YEAR)) {
	      throw new Error('year must be set for GregorianCalendar');
	    }

	    var fields = this.fields;

	    var year = fields[YEAR];
	    var timeOfDay = 0;
	    if (this.isSet(HOUR_OF_DAY)) {
	      timeOfDay += fields[HOUR_OF_DAY];
	    }
	    timeOfDay *= 60;
	    timeOfDay += fields[MINUTE] || 0;
	    timeOfDay *= 60;
	    timeOfDay += fields[SECONDS] || 0;
	    timeOfDay *= 1000;
	    timeOfDay += fields[MILLISECONDS] || 0;

	    var fixedDate = 0;

	    fields[YEAR] = year;

	    fixedDate = fixedDate + this.getFixedDate();

	    // millis represents local wall-clock time in milliseconds.
	    var millis = (fixedDate - EPOCH_OFFSET) * ONE_DAY + timeOfDay;

	    millis -= this.timezoneOffset * ONE_MINUTE;

	    this.time = millis;

	    this.computeFields();
	  },

	  /*
	   * Fills in any unset fields in the calendar fields. First,
	   * the computeTime() method is called if the time value (millisecond offset from the Epoch)
	   * has not been calculated from calendar field values.
	   * Then, the computeFields() method is called to calculate all calendar field values.
	   * @protected
	   */
	  complete: function complete() {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    if (!this.fieldsComputed) {
	      this.computeFields();
	    }
	  },

	  getFixedDate: function getFixedDate() {
	    var self = this;

	    var fields = self.fields;

	    var firstDayOfWeekCfg = self.firstDayOfWeek;

	    var year = fields[YEAR];

	    var month = GregorianCalendar.JANUARY;

	    if (self.isSet(MONTH)) {
	      month = fields[MONTH];
	      if (month > GregorianCalendar.DECEMBER) {
	        year += toInt(month / 12);
	        month %= 12;
	      } else if (month < GregorianCalendar.JANUARY) {
	        year += floorDivide(month / 12);
	        month = mod(month, 12);
	      }
	    }

	    // Get the fixed date since Jan 1, 1 (Gregorian). We are on
	    // the first day of either `month' or January in 'year'.
	    var fixedDate = Utils.getFixedDate(year, month, 1);
	    var firstDayOfWeek = undefined;
	    var dayOfWeek = self.firstDayOfWeek;

	    if (self.isSet(DAY_OF_WEEK)) {
	      dayOfWeek = fields[DAY_OF_WEEK];
	    }

	    if (self.isSet(MONTH)) {
	      if (self.isSet(DAY_OF_MONTH)) {
	        fixedDate += fields[DAY_OF_MONTH] - 1;
	      } else {
	        if (self.isSet(WEEK_OF_MONTH)) {
	          firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);

	          // If we have enough days in the first week, then
	          // move to the previous week.
	          if (firstDayOfWeek - fixedDate >= self.minimalDaysInFirstWeek) {
	            firstDayOfWeek -= 7;
	          }

	          if (dayOfWeek !== firstDayOfWeekCfg) {
	            firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
	          }

	          fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_MONTH] - 1);
	        } else {
	          var dowim = undefined;
	          if (self.isSet(DAY_OF_WEEK_IN_MONTH)) {
	            dowim = fields[DAY_OF_WEEK_IN_MONTH];
	          } else {
	            dowim = 1;
	          }
	          var lastDate = 7 * dowim;
	          if (dowim < 0) {
	            lastDate = getMonthLength(year, month) + 7 * (dowim + 1);
	          }
	          fixedDate = getDayOfWeekDateOnOrBefore(fixedDate + lastDate - 1, dayOfWeek);
	        }
	      }
	    } else {
	      // We are on the first day of the year.
	      if (self.isSet(DAY_OF_YEAR)) {
	        fixedDate += fields[DAY_OF_YEAR] - 1;
	      } else {
	        firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);
	        // If we have enough days in the first week, then move
	        // to the previous week.
	        if (firstDayOfWeek - fixedDate >= self.minimalDaysInFirstWeek) {
	          firstDayOfWeek -= 7;
	        }
	        if (dayOfWeek !== firstDayOfWeekCfg) {
	          firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
	        }
	        fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_YEAR] - 1);
	      }
	    }

	    return fixedDate;
	  },

	  /*
	   * Returns this Calendar's time value in milliseconds
	   * @member Date.Gregorian
	   * @returns {Number} the current time as UTC milliseconds from the epoch.
	   */
	  getTime: function getTime() {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    return this.time;
	  },

	  /*
	   * Sets this Calendar's current time from the given long value.
	   * @param time the new time in UTC milliseconds from the epoch.
	   */
	  setTime: function setTime(time) {
	    this.time = time;
	    this.fieldsComputed = false;
	    this.complete();
	  },

	  /*
	   * Returns the value of the given calendar field.
	   * @param field the given calendar field.
	   * @returns {Number} the value for the given calendar field.
	   */
	  get: function get(field) {
	    this.complete();
	    return this.fields[field];
	  },

	  /*
	   * Returns the year of the given calendar field.
	   * @method getYear
	   * @returns {Number} the year for the given calendar field.
	   */

	  /*
	   * Returns the month of the given calendar field.
	   * @method getMonth
	   * @returns {Number} the month for the given calendar field.
	   */

	  /*
	   * Returns the day of month of the given calendar field.
	   * @method getDayOfMonth
	   * @returns {Number} the day of month for the given calendar field.
	   */

	  /*
	   * Returns the hour of day of the given calendar field.
	   * @method getHourOfDay
	   * @returns {Number} the hour of day for the given calendar field.
	   */

	  /*
	   * Returns the minute of the given calendar field.
	   * @method getMinute
	   * @returns {Number} the minute for the given calendar field.
	   */

	  /*
	   * Returns the second of the given calendar field.
	   * @method getSecond
	   * @returns {Number} the second for the given calendar field.
	   */

	  /*
	   * Returns the millisecond of the given calendar field.
	   * @method getMilliSecond
	   * @returns {Number} the millisecond for the given calendar field.
	   */

	  /*
	   * Returns the week of year of the given calendar field.
	   * @method getWeekOfYear
	   * @returns {Number} the week of year for the given calendar field.
	   */

	  /*
	   * Returns the week of month of the given calendar field.
	   * @method getWeekOfMonth
	   * @returns {Number} the week of month for the given calendar field.
	   */

	  /*
	   * Returns the day of year of the given calendar field.
	   * @method getDayOfYear
	   * @returns {Number} the day of year for the given calendar field.
	   */

	  /*
	   * Returns the day of week of the given calendar field.
	   * @method getDayOfWeek
	   * @returns {Number} the day of week for the given calendar field.
	   */

	  /*
	   * Returns the day of week in month of the given calendar field.
	   * @method getDayOfWeekInMonth
	   * @returns {Number} the day of week in month for the given calendar field.
	   */

	  /*
	   * Sets the given calendar field to the given value.
	   * @param field the given calendar field.
	   * @param v the value to be set for the given calendar field.
	   */
	  set: function set(field, v) {
	    var len = arguments.length;
	    if (len === 2) {
	      this.fields[field] = v;
	    } else if (len < MILLISECONDS + 1) {
	      for (var i = 0; i < len; i++) {
	        this.fields[YEAR + i] = arguments[i];
	      }
	    } else {
	      throw new Error('illegal arguments for GregorianCalendar set');
	    }
	    this.time = undefined;
	  },

	  /*
	   * Set the year of the given calendar field.
	   * @method setYear
	   */

	  /*
	   * Set the month of the given calendar field.
	   * @method setMonth
	   */

	  /*
	   * Set the day of month of the given calendar field.
	   * @method setDayOfMonth
	   */

	  /*
	   * Set the hour of day of the given calendar field.
	   * @method setHourOfDay
	   */

	  /*
	   * Set the minute of the given calendar field.
	   * @method setMinute
	   */

	  /*
	   * Set the second of the given calendar field.
	   * @method setSecond
	   */

	  /*
	   * Set the millisecond of the given calendar field.
	   * @method setMilliSecond
	   */

	  /*
	   * Set the week of year of the given calendar field.
	   * @method setWeekOfYear
	   */

	  /*
	   * Set the week of month of the given calendar field.
	   * @method setWeekOfMonth
	   */

	  /*
	   * Set the day of year of the given calendar field.
	   * @method setDayOfYear
	   */

	  /*
	   * Set the day of week of the given calendar field.
	   * @method setDayOfWeek
	   */

	  /*
	   * Set the day of week in month of the given calendar field.
	   * @method setDayOfWeekInMonth
	   */

	  /*
	   * add for specified field based on two rules:
	   *
	   *  - Add rule 1. The value of field after the call minus the value of field before the
	   *  call is amount, modulo any overflow that has occurred in field
	   *  Overflow occurs when a field value exceeds its range and,
	   *  as a result, the next larger field is incremented or
	   *  decremented and the field value is adjusted back into its range.
	   *
	   *  - Add rule 2. If a smaller field is expected to be invariant,
	   *  but it is impossible for it to be equal to its
	   *  prior value because of changes in its minimum or maximum after
	   *  field is changed, then its value is adjusted to be as close
	   *  as possible to its expected value. A smaller field represents a
	   *  smaller unit of time. HOUR_OF_DAY is a smaller field than
	   *  DAY_OF_MONTH. No adjustment is made to smaller fields
	   *  that are not expected to be invariant. The calendar system
	   *  determines what fields are expected to be invariant.
	   *
	   *
	   *      @example
	   *      use('date/gregorian',function(S, GregorianCalendar){
	   *          const d = new GregorianCalendar();
	   *          d.set(2012, GregorianCalendar.JANUARY, 31);
	   *          d.add(Gregorian.MONTH,1);
	   *          // 2012-2-29
	   *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
	   *          d.add(Gregorian.MONTH,12);
	   *          // 2013-2-28
	   *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
	   *      });
	   *
	   * @param field the calendar field.
	   * @param {Number} amount he amount of date or time to be added to the field.
	   */
	  add: function add(field, a) {
	    if (!a) {
	      return;
	    }
	    var amount = a;
	    var self = this;
	    var fields = self.fields;
	    // computer and retrieve original value
	    var value = self.get(field);
	    if (field === YEAR) {
	      value += amount;
	      self.set(YEAR, value);
	      adjustDayOfMonth(self);
	    } else if (field === MONTH) {
	      value += amount;
	      var yearAmount = floorDivide(value / 12);
	      value = mod(value, 12);
	      if (yearAmount) {
	        self.set(YEAR, fields[YEAR] + yearAmount);
	      }
	      self.set(MONTH, value);
	      adjustDayOfMonth(self);
	    } else {
	      switch (field) {
	        case HOUR_OF_DAY:
	          amount *= ONE_HOUR;
	          break;
	        case MINUTE:
	          amount *= ONE_MINUTE;
	          break;
	        case SECONDS:
	          amount *= ONE_SECOND;
	          break;
	        case MILLISECONDS:
	          break;
	        case WEEK_OF_MONTH:
	        case WEEK_OF_YEAR:
	        case DAY_OF_WEEK_IN_MONTH:
	          amount *= ONE_WEEK;
	          break;
	        case DAY_OF_WEEK:
	        case DAY_OF_YEAR:
	        case DAY_OF_MONTH:
	          amount *= ONE_DAY;
	          break;
	        default:
	          throw new Error('illegal field for add');
	      }
	      self.setTime(self.time + amount);
	    }
	  },

	  /*
	   * add the year of the given calendar field.
	   * @method addYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the month of the given calendar field.
	   * @method addMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the day of month of the given calendar field.
	   * @method addDayOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the hour of day of the given calendar field.
	   * @method addHourOfDay
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the minute of the given calendar field.
	   * @method addMinute
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the second of the given calendar field.
	   * @method addSecond
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the millisecond of the given calendar field.
	   * @method addMilliSecond
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the week of year of the given calendar field.
	   * @method addWeekOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the week of month of the given calendar field.
	   * @method addWeekOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the day of year of the given calendar field.
	   * @method addDayOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the day of week of the given calendar field.
	   * @method addDayOfWeek
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the day of week in month of the given calendar field.
	   * @method addDayOfWeekInMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * Get rolled value for the field
	   * @protected
	   */
	  getRolledValue: function getRolledValue(value, a, min, max) {
	    var amount = a;
	    var diff = value - min;
	    var range = max - min + 1;
	    amount %= range;
	    return min + (diff + amount + range) % range;
	  },

	  /*
	   * Adds a signed amount to the specified calendar field without changing larger fields.
	   * A negative roll amount means to subtract from field without changing
	   * larger fields. If the specified amount is 0, this method performs nothing.
	   *
	   *
	   *
	   *      @example
	   *      const d = new GregorianCalendar();
	   *      d.set(1999, GregorianCalendar.AUGUST, 31);
	   *      // 1999-4-30
	   *      // Tuesday June 1, 1999
	   *      d.set(1999, GregorianCalendar.JUNE, 1);
	   *      d.add(Gregorian.WEEK_OF_MONTH,-1); // === d.add(Gregorian.WEEK_OF_MONTH,
	   *      d.get(Gregorian.WEEK_OF_MONTH));
	   *      // 1999-06-29
	   *
	   *
	   * @param field the calendar field.
	   * @param {Number} amount the signed amount to add to field.
	   */
	  roll: function roll(field, amount) {
	    if (!amount) {
	      return;
	    }
	    var self = this;
	    // computer and retrieve original value
	    var value = self.get(field);
	    var min = self.getActualMinimum(field);
	    var max = self.getActualMaximum(field);
	    value = self.getRolledValue(value, amount, min, max);

	    self.set(field, value);

	    // consider compute time priority
	    switch (field) {
	      case MONTH:
	        adjustDayOfMonth(self);
	        break;
	      default:
	        // other fields are set already when get
	        self.updateFieldsBySet(field);
	        break;
	    }
	  },

	  /*
	   * keep field stable.
	   *
	   * 2015-09-29 setMonth 2 vs rollSetMonth 2
	   *
	   */
	  rollSet: function rollSet(field, v) {
	    this.set(field, v);
	    switch (field) {
	      case MONTH:
	        adjustDayOfMonth(this);
	        break;
	      default:
	        // other fields are set already when get
	        this.updateFieldsBySet(field);
	        break;
	    }
	  },

	  /*
	   * roll the year of the given calendar field.
	   * @method rollYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the month of the given calendar field.
	   * @param {Number} amount the signed amount to add to field.
	   * @method rollMonth
	   */

	  /*
	   * roll the day of month of the given calendar field.
	   * @method rollDayOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the hour of day of the given calendar field.
	   * @method rollHourOfDay
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the minute of the given calendar field.
	   * @method rollMinute
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the second of the given calendar field.
	   * @method rollSecond
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the millisecond of the given calendar field.
	   * @method rollMilliSecond
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the week of year of the given calendar field.
	   * @method rollWeekOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the week of month of the given calendar field.
	   * @method rollWeekOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the day of year of the given calendar field.
	   * @method rollDayOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the day of week of the given calendar field.
	   * @method rollDayOfWeek
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * remove other priority fields when call getFixedDate
	   * precondition: other fields are all set or computed
	   * @protected
	   */
	  updateFieldsBySet: function updateFieldsBySet(field) {
	    var fields = this.fields;
	    switch (field) {
	      case WEEK_OF_MONTH:
	        fields[DAY_OF_MONTH] = undefined;
	        break;
	      case DAY_OF_YEAR:
	        fields[MONTH] = undefined;
	        break;
	      case DAY_OF_WEEK:
	        fields[DAY_OF_MONTH] = undefined;
	        break;
	      case WEEK_OF_YEAR:
	        fields[DAY_OF_YEAR] = undefined;
	        fields[MONTH] = undefined;
	        break;
	      default:
	        break;
	    }
	  },

	  /*
	   * get current date instance's timezone offset
	   * @returns {Number}
	   */
	  getTimezoneOffset: function getTimezoneOffset() {
	    return this.timezoneOffset;
	  },

	  /*
	   * set current date instance's timezone offset
	   */
	  setTimezoneOffset: function setTimezoneOffset(timezoneOffset) {
	    if (this.timezoneOffset !== timezoneOffset) {
	      this.fieldsComputed = undefined;
	      this.timezoneOffset = timezoneOffset;
	    }
	  },

	  /*
	   * set first day of week for current date instance
	   */
	  setFirstDayOfWeek: function setFirstDayOfWeek(firstDayOfWeek) {
	    if (this.firstDayOfWeek !== firstDayOfWeek) {
	      this.firstDayOfWeek = firstDayOfWeek;
	      this.fieldsComputed = false;
	    }
	  },

	  /*
	   * Gets what the first day of the week is; e.g., SUNDAY in the U.S., MONDAY in France.
	   * @returns {Number} the first day of the week.
	   */
	  getFirstDayOfWeek: function getFirstDayOfWeek() {
	    return this.firstDayOfWeek;
	  },

	  /*
	   * Sets what the minimal days required in the first week of the year are; For example,
	   * if the first week is defined as one that contains the first day of the first month of a year,
	   * call this method with value 1.
	   * If it must be a full week, use value 7.
	   * @param minimalDaysInFirstWeek the given minimal days required in the first week of the year.
	   */
	  setMinimalDaysInFirstWeek: function setMinimalDaysInFirstWeek(minimalDaysInFirstWeek) {
	    if (this.minimalDaysInFirstWeek !== minimalDaysInFirstWeek) {
	      this.minimalDaysInFirstWeek = minimalDaysInFirstWeek;
	      this.fieldsComputed = false;
	    }
	  },

	  /*
	   * Gets what the minimal days required in the first week of the year are; e.g.,
	   * if the first week is defined as one that contains the first day of the first month of a year,
	   * this method returns 1.
	   * If the minimal days required must be a full week, this method returns 7.
	   * @returns {Number} the minimal days required in the first week of the year.
	   */
	  getMinimalDaysInFirstWeek: function getMinimalDaysInFirstWeek() {
	    return this.minimalDaysInFirstWeek;
	  },

	  /*
	   * Returns the number of weeks in the week year
	   * represented by this GregorianCalendar.
	   *
	   * For example, if this GregorianCalendar's date is
	   * December 31, 2008 with the ISO
	   * 8601 compatible setting, this method will return 53 for the
	   * period: December 29, 2008 to January 3, 2010
	   * while getActualMaximum(WEEK_OF_YEAR) will return
	   * 52 for the period: December 31, 2007 to December 28, 2008.
	   *
	   * @return {Number} the number of weeks in the week year.
	   */
	  getWeeksInWeekYear: function getWeeksInWeekYear() {
	    var weekYear = this.getWeekYear();
	    if (weekYear === this.get(YEAR)) {
	      return this.getActualMaximum(WEEK_OF_YEAR);
	    }
	    // Use the 2nd week for calculating the max of WEEK_OF_YEAR
	    var gc = this.clone();
	    gc.clear();
	    gc.setWeekDate(weekYear, 2, this.get(DAY_OF_WEEK));
	    return gc.getActualMaximum(WEEK_OF_YEAR);
	  },

	  /*
	   * Returns the week year represented by this GregorianCalendar.
	   * The dates in the weeks between 1 and the
	   * maximum week number of the week year have the same week year value
	   * that may be one year before or after the calendar year value.
	   *
	   * @return {Number} the week year represented by this GregorianCalendar.
	   */
	  getWeekYear: function getWeekYear() {
	    var year = this.get(YEAR); // implicitly  complete
	    var weekOfYear = this.get(WEEK_OF_YEAR);
	    var month = this.get(MONTH);
	    if (month === GregorianCalendar.JANUARY) {
	      if (weekOfYear >= 52) {
	        --year;
	      }
	    } else if (month === GregorianCalendar.DECEMBER) {
	      if (weekOfYear === 1) {
	        ++year;
	      }
	    }
	    return year;
	  },
	  /*
	   * Sets this GregorianCalendar to the date given by the date specifiers - weekYear,
	   * weekOfYear, and dayOfWeek. weekOfYear follows the WEEK_OF_YEAR numbering.
	   * The dayOfWeek value must be one of the DAY_OF_WEEK values: SUNDAY to SATURDAY.
	   *
	   * @param weekYear    the week year
	   * @param weekOfYear  the week number based on weekYear
	   * @param dayOfWeek   the day of week value
	   */
	  setWeekDate: function setWeekDate(weekYear, weekOfYear, dayOfWeek) {
	    if (dayOfWeek < GregorianCalendar.SUNDAY || dayOfWeek > GregorianCalendar.SATURDAY) {
	      throw new Error('invalid dayOfWeek: ' + dayOfWeek);
	    }
	    var fields = this.fields;
	    // To avoid changing the time of day fields by date
	    // calculations, use a clone with the GMT time zone.
	    var gc = this.clone();
	    gc.clear();
	    gc.setTimezoneOffset(0);
	    gc.set(YEAR, weekYear);
	    gc.set(WEEK_OF_YEAR, 1);
	    gc.set(DAY_OF_WEEK, this.getFirstDayOfWeek());
	    var days = dayOfWeek - this.getFirstDayOfWeek();
	    if (days < 0) {
	      days += 7;
	    }
	    days += 7 * (weekOfYear - 1);
	    if (days !== 0) {
	      gc.add(DAY_OF_YEAR, days);
	    } else {
	      gc.complete();
	    }
	    fields[YEAR] = gc.get(YEAR);
	    fields[MONTH] = gc.get(MONTH);
	    fields[DAY_OF_MONTH] = gc.get(DAY_OF_MONTH);
	    this.complete();
	  },
	  /*
	   * Creates and returns a copy of this object.
	   * @returns {Date.Gregorian}
	   */
	  clone: function clone() {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    var cal = new GregorianCalendar(this.locale);
	    cal.setTimezoneOffset(cal.getTimezoneOffset());
	    cal.setFirstDayOfWeek(cal.getFirstDayOfWeek());
	    cal.setMinimalDaysInFirstWeek(cal.getMinimalDaysInFirstWeek());
	    cal.setTime(this.time);
	    return cal;
	  },

	  /*
	   * Compares this GregorianCalendar to the specified Object.
	   * The result is true if and only if the argument is a GregorianCalendar object
	   * that represents the same time value (millisecond offset from the Epoch)
	   * under the same Calendar parameters and Gregorian change date as this object.
	   * @param {Date.Gregorian} obj the object to compare with.
	   * @returns {boolean} true if this object is equal to obj; false otherwise.
	   */
	  equals: function equals(obj) {
	    return this.getTime() === obj.getTime() && this.firstDayOfWeek === obj.firstDayOfWeek && this.timezoneOffset === obj.timezoneOffset && this.minimalDaysInFirstWeek === obj.minimalDaysInFirstWeek;
	  },

	  /*
	   * Sets all the calendar field values or specified field and the time value
	   * (millisecond offset from the Epoch) of this Calendar undefined.
	   * This means that isSet() will return false for all the calendar fields,
	   * and the date and time calculations will treat the fields as if they had never been set.
	   * @param [field] the calendar field to be cleared.
	   */
	  clear: function clear(field) {
	    if (field === undefined) {
	      this.field = [];
	    } else {
	      this.fields[field] = undefined;
	    }
	    this.time = undefined;
	    this.fieldsComputed = false;
	  }
	};

	var GregorianCalendarProto = GregorianCalendar.prototype;

	Utils.each(FIELDS, function (f, index) {
	  if (f) {
	    GregorianCalendarProto['get' + f] = function get() {
	      return this.get(index);
	    };

	    GregorianCalendarProto['isSet' + f] = function isSet() {
	      return this.isSet(index);
	    };

	    GregorianCalendarProto['set' + f] = function set(v) {
	      return this.set(index, v);
	    };

	    GregorianCalendarProto['add' + f] = function add(v) {
	      return this.add(index, v);
	    };

	    GregorianCalendarProto['roll' + f] = function roll(v) {
	      return this.roll(index, v);
	    };

	    GregorianCalendarProto['rollSet' + f] = function rollSet(v) {
	      return this.rollSet(index, v);
	    };
	  }
	});

	module.exports = GregorianCalendar;
	/*
	 http://docs.oracle.com/javase/7/docs/api/java/util/GregorianCalendar.html

	 TODO
	 - day saving time
	 - i18n
	 - julian calendar
	 */

/***/ },

/***/ 895:
/***/ function(module, exports) {

	/*
	 * en-us locale
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	"use strict";

	module.exports = {
	  // in minutes
	  timezoneOffset: -8 * 60,
	  firstDayOfWeek: 0,
	  minimalDaysInFirstWeek: 1
	};

/***/ },

/***/ 896:
/***/ function(module, exports) {

	/*
	 * zh-cn locale
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	"use strict";

	module.exports = {
	  // in minutes
	  timezoneOffset: 8 * 60,
	  firstDayOfWeek: 1,
	  minimalDaysInFirstWeek: 1
	};

/***/ },

/***/ 897:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * utils for gregorian date
	 * @ignore
	 * @author yiminghe@gmail.com
	 */

	'use strict';

	var Const = __webpack_require__(893);
	var floor = Math.floor;
	var ACCUMULATED_DAYS_IN_MONTH
	//   1/1 2/1 3/1 4/1 5/1 6/1 7/1 8/1 9/1 10/1 11/1 12/1
	= [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

	var ACCUMULATED_DAYS_IN_MONTH_LEAP
	//   1/1 2/1   3/1   4/1   5/1   6/1   7/1   8/1   9/1
	// 10/1   11/1   12/1
	= [0, 31, 59 + 1, 90 + 1, 120 + 1, 151 + 1, 181 + 1, 212 + 1, 243 + 1, 273 + 1, 304 + 1, 334 + 1];

	var DAYS_OF_YEAR = 365;
	var DAYS_OF_4YEAR = 365 * 4 + 1;
	var DAYS_OF_100YEAR = DAYS_OF_4YEAR * 25 - 1;
	var DAYS_OF_400YEAR = DAYS_OF_100YEAR * 4 + 1;
	var _exports = {};

	function getDayOfYear(year, month, dayOfMonth) {
	  return dayOfMonth + (_exports.isLeapYear(year) ? ACCUMULATED_DAYS_IN_MONTH_LEAP[month] : ACCUMULATED_DAYS_IN_MONTH[month]);
	}

	function getDayOfWeekFromFixedDate(fixedDate) {
	  // The fixed day 1 (January 1, 1 Gregorian) is Monday.
	  if (fixedDate >= 0) {
	    return fixedDate % 7;
	  }
	  return _exports.mod(fixedDate, 7);
	}

	function getGregorianYearFromFixedDate(fixedDate) {
	  var d0 = undefined;
	  var d1 = undefined;
	  var d2 = undefined;
	  var d3 = undefined;
	  var n400 = undefined;
	  var n100 = undefined;
	  var n4 = undefined;
	  var n1 = undefined;
	  var year = undefined;
	  d0 = fixedDate - 1;

	  n400 = floor(d0 / DAYS_OF_400YEAR);
	  d1 = _exports.mod(d0, DAYS_OF_400YEAR);
	  n100 = floor(d1 / DAYS_OF_100YEAR);
	  d2 = _exports.mod(d1, DAYS_OF_100YEAR);
	  n4 = floor(d2 / DAYS_OF_4YEAR);
	  d3 = _exports.mod(d2, DAYS_OF_4YEAR);
	  n1 = floor(d3 / DAYS_OF_YEAR);

	  year = 400 * n400 + 100 * n100 + 4 * n4 + n1;

	  // ?
	  if (!(n100 === 4 || n1 === 4)) {
	    ++year;
	  }

	  return year;
	}

	_exports = module.exports = {
	  each: function each(arr, fn) {
	    for (var i = 0, len = arr.length; i < len; i++) {
	      if (fn(arr[i], i, arr) === false) {
	        break;
	      }
	    }
	  },

	  mix: function mix(t, s) {
	    for (var p in s) {
	      if (s.hasOwnProperty(p)) {
	        t[p] = s[p];
	      }
	    }
	  },

	  isLeapYear: function isLeapYear(year) {
	    if ((year & 3) !== 0) {
	      return false;
	    }
	    return year % 100 !== 0 || year % 400 === 0;
	  },

	  mod: function mod(x, y) {
	    // 负数时不是镜像关系
	    return x - y * floor(x / y);
	  },

	  // month: 0 based
	  getFixedDate: function getFixedDate(year, month, dayOfMonth) {
	    var prevYear = year - 1;
	    // 考虑公元前
	    return DAYS_OF_YEAR * prevYear + floor(prevYear / 4) - floor(prevYear / 100) + floor(prevYear / 400) + getDayOfYear(year, month, dayOfMonth);
	  },

	  getGregorianDateFromFixedDate: function getGregorianDateFromFixedDate(fixedDate) {
	    var year = getGregorianYearFromFixedDate(fixedDate);
	    var jan1 = _exports.getFixedDate(year, Const.JANUARY, 1);
	    var isLeap = _exports.isLeapYear(year);
	    var ACCUMULATED_DAYS = isLeap ? ACCUMULATED_DAYS_IN_MONTH_LEAP : ACCUMULATED_DAYS_IN_MONTH;
	    var daysDiff = fixedDate - jan1;
	    var month = undefined;

	    for (var i = 0; i < ACCUMULATED_DAYS.length; i++) {
	      if (ACCUMULATED_DAYS[i] <= daysDiff) {
	        month = i;
	      } else {
	        break;
	      }
	    }

	    var dayOfMonth = fixedDate - jan1 - ACCUMULATED_DAYS[month] + 1;
	    var dayOfWeek = getDayOfWeekFromFixedDate(fixedDate);

	    return {
	      year: year,
	      month: month,
	      dayOfMonth: dayOfMonth,
	      dayOfWeek: dayOfWeek,
	      isLeap: isLeap
	    };
	  }
	};

/***/ },

/***/ 909:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(910);
	module.exports.Picker = __webpack_require__(915);

/***/ },

/***/ 910:
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Calendar ui component for React
	 */
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(3);
	var DATE_ROW_COUNT = 6;
	var DATE_COL_COUNT = 7;
	var DateTimeFormat = __webpack_require__(889);
	var GregorianCalendar = __webpack_require__(894);
	var rcUtil = __webpack_require__(922);
	var KeyCode = rcUtil.KeyCode;
	var MonthPanel = __webpack_require__(914);
	var Time = __webpack_require__(917);

	function noop() {}

	function getIdFromDate(d) {
	  return 'rc-calendar-' + d.getYear() + '-' + d.getMonth() + '-' + d.getDayOfMonth();
	}

	function goStartMonth() {
	  var next = this.state.value.clone();
	  next.setDayOfMonth(1);
	  this.setState({ value: next });
	}

	function goEndMonth() {
	  var next = this.state.value.clone();
	  next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
	  this.setState({ value: next });
	}

	function goMonth(direction) {
	  var next = this.state.value.clone();
	  next.addMonth(direction);
	  this.setState({ value: next });
	}

	function goYear(direction) {
	  var next = this.state.value.clone();
	  next.addYear(direction);
	  this.setState({ value: next });
	}

	function goWeek(direction) {
	  var next = this.state.value.clone();
	  next.addWeekOfYear(direction);
	  this.setState({ value: next });
	}

	function goDay(direction) {
	  var next = this.state.value.clone();
	  next.addDayOfMonth(direction);
	  this.setState({ value: next });
	}

	function isSameDay(one, two) {
	  return one.getYear() === two.getYear() && one.getMonth() === two.getMonth() && one.getDayOfMonth() === two.getDayOfMonth();
	}

	function beforeCurrentMonthYear(current, today) {
	  if (current.getYear() < today.getYear()) {
	    return 1;
	  }
	  return current.getYear() === today.getYear() && current.getMonth() < today.getMonth();
	}

	function afterCurrentMonthYear(current, today) {
	  if (current.getYear() > today.getYear()) {
	    return 1;
	  }
	  return current.getYear() === today.getYear() && current.getMonth() > today.getMonth();
	}

	function onFocus() {
	  if (this._blurTimer) {
	    clearTimeout(this._blurTimer);
	    this._blurTimer = null;
	  } else {
	    this.props.onFocus();
	  }
	}

	function onBlur() {
	  var _this = this;

	  if (this._blurTimer) {
	    clearTimeout(this._blurTimer);
	  }
	  this._blurTimer = setTimeout(function () {
	    _this.props.onBlur();
	  }, 100);
	}

	function chooseToday() {
	  var today = this.state.value.clone();
	  today.setTime(Date.now());
	  this.handleSelect(today);
	}

	function handleDayClick(current) {
	  this.handleSelect(current);
	}

	function handleSelect(current, keyDownEvent) {
	  var props = this.props;
	  this.setState({
	    value: current
	  });
	  if (!keyDownEvent) {
	    props.onSelect(current);
	  }
	}

	function clear() {
	  this.props.onClear();
	}

	function onMonthPanelSelect(current) {
	  this.setState({
	    value: current,
	    showMonthPanel: 0
	  });
	}

	function handleKeyDown(e) {
	  var keyCode = e.keyCode;
	  // mac
	  var ctrlKey = e.ctrlKey || e.metaKey;
	  switch (keyCode) {
	    case KeyCode.DOWN:
	      goWeek.call(this, 1);
	      e.preventDefault();
	      return true;
	    case KeyCode.UP:
	      goWeek.call(this, -1);
	      e.preventDefault();
	      return true;
	    case KeyCode.LEFT:
	      if (ctrlKey) {
	        this.previousYear();
	      } else {
	        goDay.call(this, -1);
	      }
	      e.preventDefault();
	      return true;
	    case KeyCode.RIGHT:
	      if (ctrlKey) {
	        this.nextYear();
	      } else {
	        goDay.call(this, 1);
	      }
	      e.preventDefault();
	      return true;
	    case KeyCode.HOME:
	      goStartMonth.call(this);
	      e.preventDefault();
	      return true;
	    case KeyCode.END:
	      goEndMonth.call(this);
	      e.preventDefault();
	      return true;
	    case KeyCode.PAGE_DOWN:
	      this.nextMonth();
	      e.preventDefault();
	      return true;
	    case KeyCode.PAGE_UP:
	      this.previousMonth();
	      e.preventDefault();
	      return true;
	    case KeyCode.ENTER:
	      this.props.onSelect(this.state.value);
	      e.preventDefault();
	      return true;
	  }
	  this.props.onKeyDown(e);
	}

	function showMonthPanel() {
	  this.setState({
	    showMonthPanel: 1
	  });
	}

	var Calendar = (function (_React$Component) {
	  _inherits(Calendar, _React$Component);

	  function Calendar(props) {
	    _classCallCheck(this, Calendar);

	    _get(Object.getPrototypeOf(Calendar.prototype), 'constructor', this).call(this, props);
	    var value = props.value || props.defaultValue;
	    if (!value) {
	      value = new GregorianCalendar();
	      value.setTime(Date.now());
	    }
	    this.dateFormatter = new DateTimeFormat(props.locale.dateFormat);
	    this.state = {
	      orient: props.orient,
	      prefixCls: props.prefixCls || 'rc-calendar',
	      value: value
	    };
	    // bind methods
	    this.onBlur = onBlur.bind(this);
	    this.onFocus = onFocus.bind(this);
	    this.prefixClsFn = __webpack_require__(916).bind(this);
	    this.nextMonth = goMonth.bind(this, 1);
	    this.previousMonth = goMonth.bind(this, -1);
	    this.nextYear = goYear.bind(this, 1);
	    this.previousYear = goYear.bind(this, -1);
	    this.chooseToday = chooseToday.bind(this);
	    this.clear = clear.bind(this);
	    this.handleSelect = handleSelect.bind(this);
	    this.onMonthPanelSelect = onMonthPanelSelect.bind(this);
	    this.handleKeyDown = handleKeyDown.bind(this);
	    this.showMonthPanel = showMonthPanel.bind(this);
	  }

	  _createClass(Calendar, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return rcUtil.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var value = nextProps.value;
	      if (value !== undefined) {
	        if (!value) {
	          value = this.state.value.clone();
	          value.setTime(Date.now());
	        }
	        this.setState({
	          value: value
	        });
	      }
	      if (nextProps.orient) {
	        this.setState({
	          orient: nextProps.orient
	        });
	      }
	      if (nextProps.locale !== this.props.locale) {
	        this.dateFormatter = new DateTimeFormat(nextProps.locale.dateFormat);
	      }
	    }
	  }, {
	    key: 'renderDates',
	    value: function renderDates() {
	      var props = this.props;
	      var i, j, current;
	      var dateTable = [];
	      var showWeekNumber = props.showWeekNumber;
	      var value = this.state.value;
	      var today = value.clone();
	      var prefixClsFn = this.prefixClsFn;
	      var cellClass = prefixClsFn('cell');
	      var weekNumberCellClass = prefixClsFn('week-number-cell');
	      var dateClass = prefixClsFn('date');
	      var dateRender = props.dateRender;
	      var disabledDate = props.disabledDate;
	      var dateFormatter = this.dateFormatter;
	      var todayClass = prefixClsFn('today');
	      var selectedClass = prefixClsFn('selected-day');
	      var lastMonthDayClass = prefixClsFn('last-month-cell');
	      var nextMonthDayClass = prefixClsFn('next-month-btn-day');
	      var disabledClass = prefixClsFn('disabled-cell');
	      today.setTime(Date.now());
	      var month1 = value.clone();
	      month1.set(value.getYear(), value.getMonth(), 1);
	      var day = month1.getDayOfWeek();
	      var lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
	      // calculate last month
	      var lastMonth1 = month1.clone();
	      lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
	      var passed = 0;
	      for (i = 0; i < DATE_ROW_COUNT; i++) {
	        for (j = 0; j < DATE_COL_COUNT; j++) {
	          current = lastMonth1;
	          if (passed) {
	            current = current.clone();
	            current.addDayOfMonth(passed);
	          }
	          dateTable.push(current);
	          passed++;
	        }
	      }
	      var tableHtml = [];
	      passed = 0;
	      for (i = 0; i < DATE_ROW_COUNT; i++) {
	        var weekNumberCell;
	        var dateCells = [];
	        if (showWeekNumber) {
	          weekNumberCell = React.createElement(
	            'td',
	            { key: dateTable[passed].getWeekOfYear(), role: 'gridcell', className: weekNumberCellClass },
	            dateTable[passed].getWeekOfYear()
	          );
	        }
	        for (j = 0; j < DATE_COL_COUNT; j++) {
	          current = dateTable[passed];
	          var cls = cellClass;
	          var disabled = false;
	          var selected = false;

	          if (isSameDay(current, today)) {
	            cls += ' ' + todayClass;
	          }
	          if (isSameDay(current, value)) {
	            cls += ' ' + selectedClass;
	            selected = true;
	          }
	          if (beforeCurrentMonthYear(current, value)) {
	            cls += ' ' + lastMonthDayClass;
	          }
	          if (afterCurrentMonthYear(current, value)) {
	            cls += ' ' + nextMonthDayClass;
	          }
	          if (disabledDate && disabledDate(current, value)) {
	            cls += ' ' + disabledClass;
	            disabled = true;
	          }

	          var dateHtml;
	          if (!(dateRender && (dateHtml = dateRender(current, value)))) {
	            dateHtml = React.createElement(
	              'span',
	              {
	                key: getIdFromDate(current),
	                className: dateClass,
	                'aria-selected': selected,
	                'aria-disabled': disabled },
	              current.getDayOfMonth()
	            );
	          }

	          dateCells.push(React.createElement(
	            'td',
	            { key: passed, onClick: disabled ? noop : handleDayClick.bind(this, current), role: 'gridcell', title: dateFormatter.format(current), className: cls },
	            dateHtml
	          ));

	          passed++;
	        }
	        tableHtml.push(React.createElement(
	          'tr',
	          {
	            key: i,
	            role: 'row' },
	          weekNumberCell,
	          dateCells
	        ));
	      }
	      this.dateTable = dateTable;
	      return tableHtml;
	    }
	  }, {
	    key: 'getTodayTime',
	    value: function getTodayTime() {
	      var value = this.state.value;
	      var today = value.clone();
	      today.setTime(Date.now());
	      return this.dateFormatter.format(today);
	    }
	  }, {
	    key: 'getMonthYear',
	    value: function getMonthYear() {
	      var locale = this.props.locale;
	      var value = this.state.value;
	      return new DateTimeFormat(locale.monthYearFormat).format(value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // console.log('re render');
	      var showWeekNumberEl;
	      var props = this.props;
	      var locale = props.locale;
	      var state = this.state;
	      var value = state.value;
	      var veryShortWeekdays = [];
	      var weekDays = [];
	      var firstDayOfWeek = value.getFirstDayOfWeek();
	      var prefixCls = state.prefixCls;
	      var prefixClsFn = this.prefixClsFn;

	      for (var i = 0; i < DATE_COL_COUNT; i++) {
	        var index = (firstDayOfWeek + i) % DATE_COL_COUNT;
	        veryShortWeekdays[i] = locale.format.veryShortWeekdays[index];
	        weekDays[i] = locale.format.weekdays[index];
	      }

	      if (props.showWeekNumber) {
	        showWeekNumberEl = React.createElement(
	          'th',
	          { role: 'columnheader', className: prefixClsFn("column-header", "week-number-header") },
	          React.createElement(
	            'span',
	            { className: prefixClsFn("column-header-inner") },
	            'x'
	          )
	        );
	      }
	      var weekDaysEls = weekDays.map(function (value, xindex) {
	        return React.createElement(
	          'th',
	          { key: xindex, role: 'columnheader', title: value, className: prefixClsFn("column-header") },
	          React.createElement(
	            'span',
	            { className: prefixClsFn("column-header-inner") },
	            veryShortWeekdays[xindex]
	          )
	        );
	      });
	      var footerEl;
	      if (props.showToday || props.showTime) {
	        var todayEl;
	        if (props.showToday) {
	          todayEl = React.createElement(
	            'a',
	            { className: prefixClsFn("today-btn"),
	              role: 'button',
	              onClick: this.chooseToday,
	              title: this.getTodayTime() },
	            locale.today
	          );
	        }
	        var clearEl;
	        if (props.showClear) {
	          clearEl = React.createElement(
	            'a',
	            { className: prefixClsFn("clear-btn"),
	              role: 'button',
	              onClick: this.clear },
	            locale.clear
	          );
	        }
	        var footerBtn;
	        if (todayEl || clearEl) {
	          footerBtn = React.createElement(
	            'div',
	            { className: prefixClsFn("footer-btn") },
	            todayEl,
	            ' ',
	            clearEl
	          );
	        }
	        var timeEl;
	        if (props.showTime) {
	          timeEl = React.createElement(Time, { value: value, rootPrefixCls: prefixCls, prefixClsFn: prefixClsFn, locale: locale, onChange: this.handleSelect });
	        }
	        footerEl = React.createElement(
	          'div',
	          { className: prefixClsFn("footer") },
	          timeEl,
	          footerBtn
	        );
	      }

	      var monthPanel;
	      if (state.showMonthPanel) {
	        monthPanel = React.createElement(MonthPanel, { locale: locale, value: value, rootPrefixCls: state.prefixCls, onSelect: this.onMonthPanelSelect });
	      }

	      var className = prefixCls;
	      if (props.className) {
	        className += ' ' + props.className;
	      }
	      var orient = state.orient;
	      if (orient) {
	        orient.forEach(function (o) {
	          className += ' ' + prefixClsFn('orient-' + o);
	        });
	      }
	      return React.createElement(
	        'div',
	        { className: className, tabIndex: '0', onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.handleKeyDown },
	        React.createElement(
	          'div',
	          { style: { outline: 'none' } },
	          React.createElement(
	            'div',
	            { className: prefixClsFn("header") },
	            React.createElement(
	              'a',
	              { className: prefixClsFn("prev-year-btn"),
	                role: 'button',
	                onClick: this.previousYear,
	                title: locale.previousYear },
	              '«'
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn("prev-month-btn"),
	                role: 'button',
	                onClick: this.previousMonth,
	                title: locale.previousMonth },
	              '‹'
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn("month-select"),
	                role: 'button',
	                onClick: this.showMonthPanel,
	                title: locale.monthSelect },
	              React.createElement(
	                'span',
	                { className: prefixClsFn("month-select-content") },
	                this.getMonthYear()
	              ),
	              React.createElement(
	                'span',
	                { className: prefixClsFn("month-select-arrow") },
	                'x'
	              )
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn("next-month-btn"),
	                onClick: this.nextMonth,
	                title: locale.nextMonth },
	              '›'
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn("next-year-btn"),
	                onClick: this.nextYear,
	                title: locale.nextYear },
	              '»'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: prefixClsFn("calendar-body") },
	            React.createElement(
	              'table',
	              { className: prefixClsFn("table"), cellSpacing: '0', role: 'grid' },
	              React.createElement(
	                'thead',
	                null,
	                React.createElement(
	                  'tr',
	                  { role: 'row' },
	                  showWeekNumberEl,
	                  weekDaysEls
	                )
	              ),
	              React.createElement(
	                'tbody',
	                { className: prefixClsFn("tbody") },
	                this.renderDates()
	              )
	            )
	          ),
	          footerEl
	        ),
	        monthPanel
	      );
	    }
	  }]);

	  return Calendar;
	})(React.Component);

	Calendar.propTypes = {
	  value: React.PropTypes.object,
	  defaultValue: React.PropTypes.object,
	  className: React.PropTypes.string,
	  orient: React.PropTypes.arrayOf(React.PropTypes.oneOf(['left', 'top', 'right', 'bottom'])),
	  locale: React.PropTypes.object,
	  showWeekNumber: React.PropTypes.bool,
	  showToday: React.PropTypes.bool,
	  showTime: React.PropTypes.bool,
	  onSelect: React.PropTypes.func,
	  onBlur: React.PropTypes.func
	};

	Calendar.defaultProps = {
	  locale: __webpack_require__(912),
	  onKeyDown: noop,
	  className: '',
	  showToday: true,
	  onSelect: noop,
	  onFocus: noop,
	  onBlur: noop,
	  onClear: noop
	};

	module.exports = Calendar;

/***/ },

/***/ 911:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(3);
	var ROW = 3;
	var COL = 4;
	var cx = __webpack_require__(922).classSet;

	function goYear(direction) {
	  var next = this.state.value.clone();
	  next.addYear(direction);
	  this.setState({
	    value: next
	  });
	}

	function chooseDecade(year, e) {
	  var next = this.state.value.clone();
	  next.setYear(year);
	  this.props.onSelect(next);
	  e.preventDefault();
	}

	var DecadePanel = (function (_React$Component) {
	  _inherits(DecadePanel, _React$Component);

	  function DecadePanel(props) {
	    _classCallCheck(this, DecadePanel);

	    _get(Object.getPrototypeOf(DecadePanel.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      value: props.value,
	      prefixCls: props.rootPrefixCls + '-decade-panel'
	    };

	    // bind methods
	    this.prefixClsFn = __webpack_require__(916).bind(this);
	    this.nextCentury = goYear.bind(this, 100);
	    this.previousCentury = goYear.bind(this, -100);
	  }

	  _createClass(DecadePanel, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var value = this.state.value;
	      var locale = this.props.locale;
	      var currentYear = value.getYear();
	      var startYear = parseInt(currentYear / 100, 10) * 100;
	      var preYear = startYear - 10;
	      var endYear = startYear + 99;
	      var decades = [];
	      var index = 0;
	      var prefixClsFn = this.prefixClsFn;

	      for (var i = 0; i < ROW; i++) {
	        decades[i] = [];
	        for (var j = 0; j < COL; j++) {
	          decades[i][j] = {
	            startDecade: preYear + index * 10,
	            endDecade: preYear + index * 10 + 9
	          };
	          index++;
	        }
	      }

	      var decadesEls = decades.map(function (row, index) {
	        var tds = row.map(function (d) {
	          var startDecade = d.startDecade;
	          var endDecade = d.endDecade;
	          var classNameMap = {};
	          classNameMap[prefixClsFn('cell')] = 1;
	          classNameMap[prefixClsFn('selected-cell')] = startDecade <= currentYear && currentYear <= endDecade;
	          classNameMap[prefixClsFn('last-century-cell')] = startDecade < startYear;
	          classNameMap[prefixClsFn('next-century-cell')] = endDecade > endYear;
	          return React.createElement(
	            'td',
	            {
	              key: startDecade,
	              onClick: chooseDecade.bind(_this, startDecade),
	              role: 'gridcell',
	              className: cx(classNameMap)
	            },
	            React.createElement(
	              'a',
	              {
	                className: prefixClsFn('decade') },
	              startDecade,
	              React.createElement('br', null),
	              '-',
	              React.createElement('br', null),
	              endDecade
	            )
	          );
	        });
	        return React.createElement(
	          'tr',
	          { key: index, role: 'row' },
	          tds
	        );
	      });

	      return React.createElement(
	        'div',
	        { className: this.state.prefixCls },
	        React.createElement(
	          'div',
	          { className: prefixClsFn('header') },
	          React.createElement(
	            'a',
	            { className: prefixClsFn('prev-century-btn'),
	              role: 'button',
	              onClick: this.previousCentury,
	              title: locale.previousCentury },
	            '«'
	          ),
	          React.createElement(
	            'div',
	            { className: prefixClsFn('century') },
	            startYear,
	            '-',
	            endYear
	          ),
	          React.createElement(
	            'a',
	            { className: prefixClsFn('next-century-btn'),
	              role: 'button',
	              onClick: this.nextCentury,
	              title: locale.nextCentury },
	            '»'
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: prefixClsFn('body') },
	          React.createElement(
	            'table',
	            { className: prefixClsFn('table'), cellSpacing: '0', role: 'grid' },
	            React.createElement(
	              'tbody',
	              { className: prefixClsFn('tbody') },
	              decadesEls
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return DecadePanel;
	})(React.Component);

	DecadePanel.defaultProps = {
	  onSelect: function onSelect() {}
	};

	module.exports = DecadePanel;

/***/ },

/***/ 912:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * i18n resources for date-picker
	 * @ignore
	 * @author yiminghe@gmail.com
	 */
	'use strict';

	module.exports = {
	  today: 'Today',
	  clear: 'Clear',
	  hourPanelTitle: 'Select hour',
	  minutePanelTitle: 'Select minute',
	  secondPanelTitle: 'Select second',
	  monthSelect: 'Choose a month',
	  yearSelect: 'Choose a year',
	  decadeSelect: 'Choose a decade',
	  yearFormat: 'yyyy',
	  dateFormat: 'M/d/yyyy',
	  monthYearFormat: 'MMMM yyyy',
	  previousMonth: 'Previous month (PageUp)',
	  nextMonth: 'Next month (PageDown)',
	  hourInput: 'Last hour(Up), Next hour(Down)',
	  minuteInput: 'Last minute(Up), Next minute(Down)',
	  secondInput: 'Last second(Up), Next second(Down)',
	  previousYear: 'Last year (Control + left)',
	  nextYear: 'Next year (Control + right)',
	  previousDecade: 'Last decade',
	  nextDecade: 'Next decade',
	  previousCentury: 'Last century',
	  nextCentury: 'Next century',
	  format: __webpack_require__(891)
	};

/***/ },

/***/ 913:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * i18n resources for date-picker
	 * @ignore
	 * @author yiminghe@gmail.com
	 */

	'use strict';

	module.exports = {
	  today: '今天',
	  clear: '清除',
	  previousMonth: '上个月 (翻页上键)',
	  nextMonth: '下个月 (翻页下键)',
	  monthSelect: '选择月份',
	  yearSelect: '选择年份',
	  decadeSelect: '选择年代',
	  hourInput: '上一小时(上方向键), 下一小时(下方向键)',
	  minuteInput: '上一分钟(上方向键), 下一分钟(下方向键)',
	  secondInput: '上一秒(上方向键), 下一小时(下方向键)',
	  hourPanelTitle: '选择小时',
	  minutePanelTitle: '选择分钟',
	  secondPanelTitle: '选择秒',
	  /*jshint quotmark: false*/
	  yearFormat: "yyyy'年'",
	  monthYearFormat: "yyyy'年'M'月'",
	  dateFormat: "yyyy'年'M'月'd'日'",
	  previousYear: '上一年 (Control键加左方向键)',
	  nextYear: '下一年 (Control键加右方向键)',
	  previousDecade: '上一年代',
	  nextDecade: '下一年代',
	  previousCentury: '上一世纪',
	  nextCentury: '下一世纪',
	  format: __webpack_require__(892)
	};

/***/ },

/***/ 914:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(3);
	var DateTimeFormat = __webpack_require__(889);
	var ROW = 3;
	var COL = 4;
	var cx = __webpack_require__(922).classSet;
	var YearPanel = __webpack_require__(919);

	function goYear(direction) {
	  var next = this.state.value.clone();
	  next.addYear(direction);
	  this.setState({
	    value: next
	  });
	}

	function showYearPanel() {
	  this.setState({
	    showYearPanel: 1
	  });
	}

	function chooseMonth(month) {
	  var next = this.state.value.clone();
	  next.setMonth(month);
	  this.props.onSelect(next);
	}

	function onYearPanelSelect(current) {
	  this.setState({
	    value: current,
	    showYearPanel: 0
	  });
	}

	var MonthPanel = (function (_React$Component) {
	  _inherits(MonthPanel, _React$Component);

	  function MonthPanel(props) {
	    _classCallCheck(this, MonthPanel);

	    _get(Object.getPrototypeOf(MonthPanel.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      value: this.props.value,
	      prefixCls: this.props.rootPrefixCls + '-month-panel'

	    };
	    // bind methods
	    this.nextYear = goYear.bind(this, 1);
	    this.previousYear = goYear.bind(this, -1);
	    this.showYearPanel = showYearPanel.bind(this);
	    this.onYearPanelSelect = onYearPanelSelect.bind(this);
	    this.prefixClsFn = __webpack_require__(916).bind(this);
	  }

	  _createClass(MonthPanel, [{
	    key: 'getMonths',
	    value: function getMonths() {
	      var props = this.props;
	      var value = this.state.value;
	      var current = value.clone();
	      var locale = props.locale;
	      var monthYearFormat = locale.monthYearFormat;
	      var dateFormatter = new DateTimeFormat(monthYearFormat);
	      var months = [];
	      var shortMonths = locale.format.shortMonths;
	      var index = 0;
	      for (var i = 0; i < ROW; i++) {
	        months[i] = [];
	        for (var j = 0; j < COL; j++) {
	          current.setMonth(index);
	          months[i][j] = {
	            value: index,
	            content: shortMonths[index],
	            title: dateFormatter.format(current)
	          };
	          index++;
	        }
	      }

	      return months;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var props = this.props;
	      var value = this.state.value;
	      var locale = props.locale;
	      var months = this.getMonths();
	      var year = value.getYear();
	      var currentMonth = value.getMonth();
	      var prefixClsFn = this.prefixClsFn;
	      var monthsEls = months.map(function (month, index) {
	        var tds = month.map(function (m) {
	          var classNameMap = {};
	          classNameMap[prefixClsFn('cell')] = 1;
	          classNameMap[prefixClsFn('selected-cell')] = m.value === currentMonth;
	          return React.createElement(
	            'td',
	            { role: 'gridcell',
	              key: m.value,
	              onClick: chooseMonth.bind(_this, m.value),
	              title: m.title,
	              className: cx(classNameMap) },
	            React.createElement(
	              'a',
	              {
	                className: prefixClsFn('month') },
	              m.content
	            )
	          );
	        });
	        return React.createElement(
	          'tr',
	          { key: index, role: 'row' },
	          tds
	        );
	      });

	      var yearPanel;
	      if (this.state.showYearPanel) {
	        yearPanel = React.createElement(YearPanel, { locale: locale, value: value, rootPrefixCls: props.rootPrefixCls, onSelect: this.onYearPanelSelect });
	      }

	      return React.createElement(
	        'div',
	        { className: this.state.prefixCls },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'div',
	            { className: prefixClsFn('header') },
	            React.createElement(
	              'a',
	              { className: prefixClsFn('prev-year-btn'),
	                role: 'button',
	                onClick: this.previousYear,
	                title: locale.previousYear },
	              '«'
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn('year-select'),
	                role: 'button',
	                onClick: this.showYearPanel,
	                title: locale.yearSelect },
	              React.createElement(
	                'span',
	                { className: prefixClsFn('year-select-content') },
	                year
	              ),
	              React.createElement(
	                'span',
	                { className: prefixClsFn('year-select-arrow') },
	                'x'
	              )
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn('next-year-btn'),
	                role: 'button',
	                onClick: this.nextYear,
	                title: locale.nextYear },
	              '»'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: prefixClsFn('body') },
	            React.createElement(
	              'table',
	              { className: prefixClsFn('table'), cellSpacing: '0', role: 'grid' },
	              React.createElement(
	                'tbody',
	                { className: prefixClsFn('tbody') },
	                monthsEls
	              )
	            )
	          )
	        ),
	        yearPanel
	      );
	    }
	  }]);

	  return MonthPanel;
	})(React.Component);

	MonthPanel.defaultProps = {
	  onSelect: function onSelect() {}
	};

	module.exports = MonthPanel;

/***/ },

/***/ 915:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(3);
	var DateTimeFormat = __webpack_require__(889);
	var rcUtil = __webpack_require__(922);
	var KeyCode = __webpack_require__(922).KeyCode;
	var domAlign = __webpack_require__(920);
	var orientMap = {
	  tl: ['top', 'left'],
	  tr: ['top', 'right'],
	  bl: ['bottom', 'left'],
	  br: ['bottom', 'right']
	};

	function getImmutableOrient(orient) {
	  if (orient) {
	    for (var i in orientMap) {
	      var original = orientMap[i];
	      if (original[0] === orient[0] && original[1] === orient[1]) {
	        return original;
	      }
	    }
	  }
	}

	function refFn(field, component) {
	  this[field] = component;
	}

	/**
	 * DatePicker = wrap input using Calendar
	 */

	var Picker = (function (_React$Component) {
	  _inherits(Picker, _React$Component);

	  function Picker(props) {
	    var _this = this;

	    _classCallCheck(this, Picker);

	    _get(Object.getPrototypeOf(Picker.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      open: props.open,
	      value: props.value || props.defaultValue
	    };

	    // bind methods
	    ['handleInputClick', 'handleCalendarBlur', 'handleCalendarClear', 'handleCalendarKeyDown', 'handleKeyDown', 'handleCalendarSelect'].forEach(function (m) {
	      _this[m] = _this[m].bind(_this);
	    });
	    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
	    this.saveInputRef = refFn.bind(this, 'inputInstance');
	  }

	  _createClass(Picker, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.value) {
	        this.setState({
	          value: nextProps.value
	        });
	      }
	    }
	  }, {
	    key: 'open',
	    value: function open(callback) {
	      this.setState({
	        open: true
	      }, callback);
	    }
	  }, {
	    key: 'close',
	    value: function close(callback) {
	      this.setState({
	        open: false
	      }, callback);
	    }
	  }, {
	    key: 'handleInputClick',
	    value: function handleInputClick() {
	      this.open();
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
	      // down
	      if (e.keyCode === KeyCode.DOWN) {
	        e.preventDefault();
	        this.handleInputClick();
	      }
	    }
	  }, {
	    key: 'handleCalendarKeyDown',
	    value: function handleCalendarKeyDown(e) {
	      var _this2 = this;

	      if (e.keyCode === KeyCode.ESC) {
	        e.stopPropagation();
	        this.close(function () {
	          React.findDOMNode(_this2.inputInstance).focus();
	        });
	      }
	    }
	  }, {
	    key: 'handleCalendarSelect',
	    value: function handleCalendarSelect(value) {
	      var _this3 = this;

	      this.props.calendar.props.onSelect(value);
	      var currentValue = this.state.value;
	      if (this.props.calendar.props.showTime) {
	        this.setState({
	          value: value
	        });
	      } else {
	        this.setState({
	          value: value,
	          open: false
	        }, function () {
	          React.findDOMNode(_this3.inputInstance).focus();
	        });
	      }
	      if (!currentValue || currentValue.getTime() !== value.getTime()) {
	        this.props.onChange(value);
	      }
	    }
	  }, {
	    key: 'handleCalendarBlur',
	    value: function handleCalendarBlur() {
	      // if invisible, will not trigger blur
	      this.setState({
	        open: false
	      });
	    }
	  }, {
	    key: 'handleCalendarClear',
	    value: function handleCalendarClear() {
	      var _this4 = this;

	      this.props.calendar.props.onClear();
	      this.setState({
	        open: false,
	        value: null
	      }, function () {
	        React.findDOMNode(_this4.inputInstance).focus();
	      });
	      if (this.state.value !== null) {
	        this.props.onChange(null);
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.componentDidUpdate();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      if (this.state.open && !this._lastOpen) {
	        var orient = this._cacheCalendar.props.orient;
	        var points = ['tl', 'bl'];
	        var offset = [0, 5];
	        if (orient.indexOf('top') !== -1 && orient.indexOf('left') !== -1) {
	          points = ['tl', 'bl'];
	        } else if (orient.indexOf('top') !== -1 && orient.indexOf('right') !== -1) {
	          points = ['tr', 'br'];
	        } else if (orient.indexOf('bottom') !== -1 && orient.indexOf('left') !== -1) {
	          points = ['bl', 'tl'];
	          offset = [0, -5];
	        } else if (orient.indexOf('bottom') !== -1 && orient.indexOf('right') !== -1) {
	          points = ['br', 'tr'];
	          offset = [0, -5];
	        }

	        var align = domAlign(React.findDOMNode(this.calendarInstance), React.findDOMNode(this.inputInstance), {
	          points: points,
	          offset: offset,
	          overflow: {
	            adjustX: 1,
	            adjustY: 1
	          }
	        });
	        points = align.points;
	        var newOrient = orientMap[points[0]];
	        this.calendarInstance.setState({
	          orient: newOrient
	        });
	        React.findDOMNode(this.calendarInstance).focus();
	      }
	      this._lastOpen = this.state.open;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      // var input = React.Children.only(props.children); bug 0.13.0
	      /*
	       children: Object
	       .0: (...)
	       get .0: function () {
	       set .0: function (value) {
	       _reactDidWarn: false
	       _reactFragment: Object
	       __proto__: Object
	       */
	      var input = props.children;
	      if (!React.isValidElement(input)) {
	        var children = input;
	        React.Children.forEach(children, function (m) {
	          input = m;
	        });
	      }
	      var state = this.state;
	      var value = state.value;
	      var calendar = this._cacheCalendar;
	      if (state.open) {
	        var calendarInstance = this.calendarInstance;
	        var calendarProp = props.calendar;
	        this._cacheCalendar = calendar = React.cloneElement(calendarProp, {
	          ref: rcUtil.createChainedFunction(calendarProp.props.ref, this.saveCalendarRef),
	          value: value,
	          // focused: true,
	          orient: calendarInstance && calendarInstance.state.orient || getImmutableOrient(calendarProp.props.orient) || orientMap.tl,
	          onBlur: this.handleCalendarBlur,
	          onKeyDown: this.handleCalendarKeyDown,
	          onSelect: this.handleCalendarSelect,
	          onClear: this.handleCalendarClear
	        });
	      }
	      var inputValue = '';
	      if (value) {
	        inputValue = props.formatter.format(value);
	      }
	      input = React.cloneElement(input, {
	        ref: rcUtil.createChainedFunction(input.props.ref, this.saveInputRef),
	        readOnly: true,
	        onClick: this.handleInputClick,
	        value: inputValue,
	        onKeyDown: this.handleKeyDown
	      });
	      var classes = [props.prefixCls];
	      if (state.open) {
	        classes.push(props.prefixCls + '-open');
	      }
	      return React.createElement(
	        'span',
	        { className: classes.join(' ') },
	        [input, calendar]
	      );
	    }
	  }]);

	  return Picker;
	})(React.Component);

	Picker.propTypes = {
	  onChange: React.PropTypes.func
	};

	Picker.defaultProps = {
	  prefixCls: 'rc-calendar-picker',
	  onChange: function onChange() {},
	  formatter: new DateTimeFormat('yyyy-MM-dd')
	};

	module.exports = Picker;

/***/ },

/***/ 916:
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
	  var prefixCls = this.state.prefixCls;
	  var args = Array.prototype.slice.call(arguments, 0);
	  return args.map(function (s) {
	    return prefixCls + '-' + s;
	  }).join(' ');
	};

/***/ },

/***/ 917:
/***/ function(module, exports, __webpack_require__) {

	

	/**
	 * time component for Calendar
	 */

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(3);
	var rcUtil = __webpack_require__(922);
	var KeyCode = __webpack_require__(922).KeyCode;
	var TimePanel = __webpack_require__(918);

	function padding(number) {
	  if (number < 10) {
	    number = '0' + number;
	  }
	  return number;
	}

	function loop(value, min, max) {
	  if (value === min - 1) {
	    value = max;
	  } else if (value === max + 1) {
	    value = min;
	  }
	  return value;
	}

	function keyDownWrap(method, min, max) {
	  return function (e) {
	    var value = e.target.value;
	    var number = parseInt(value, 10);
	    var keyCode = e.keyCode;
	    var handled;
	    if (keyCode === KeyCode.DOWN) {
	      number++;
	      e.stopPropagation();
	      e.preventDefault();
	      handled = 1;
	    } else if (keyCode === KeyCode.UP) {
	      number--;
	      e.stopPropagation();
	      e.preventDefault();
	      handled = 1;
	    }
	    if (handled) {
	      number = loop(number, min, max);
	      var time = this.props.value.clone();
	      time[method](number);
	      this.props.onChange(time, e);
	    }
	  };
	}

	var Time = (function (_React$Component) {
	  _inherits(Time, _React$Component);

	  function Time(props) {
	    var _this = this;

	    _classCallCheck(this, Time);

	    _get(Object.getPrototypeOf(Time.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      showHourPanel: 0,
	      showMinutePanel: 0,
	      showSecondPanel: 0
	    };
	    ['onHourKeyDown', 'onMinuteKeyDown', 'onSecondKeyDown', 'onHourClick', 'onMinuteClick', 'onSecondClick', 'onSelectPanel'].forEach(function (m) {
	      _this[m] = _this[m].bind(_this);
	    });
	  }

	  _createClass(Time, [{
	    key: 'onSelectPanel',
	    value: function onSelectPanel(value) {
	      this.setState({
	        showHourPanel: 0,
	        showMinutePanel: 0,
	        showSecondPanel: 0
	      });
	      this.props.onChange(value);
	    }
	  }, {
	    key: 'onHourClick',
	    value: function onHourClick() {
	      this.setState({
	        showHourPanel: 1,
	        showMinutePanel: 0,
	        showSecondPanel: 0
	      });
	    }
	  }, {
	    key: 'onMinuteClick',
	    value: function onMinuteClick() {
	      this.setState({
	        showHourPanel: 0,
	        showMinutePanel: 1,
	        showSecondPanel: 0
	      });
	    }
	  }, {
	    key: 'onSecondClick',
	    value: function onSecondClick() {
	      this.setState({
	        showHourPanel: 0,
	        showMinutePanel: 0,
	        showSecondPanel: 1
	      });
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return rcUtil.PureRenderMixin.shouldComponentUpdate.apply(this, arguments);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var state = this.state;
	      var props = this.props;
	      var prefixClsFn = props.prefixClsFn;
	      var value = props.value;
	      var locale = props.locale;
	      var hour = value.getHourOfDay();
	      var minute = value.getMinutes();
	      var second = value.getSeconds();
	      var panel;
	      var commonProps = {
	        value: value,
	        onSelect: this.onSelectPanel,
	        rootPrefixCls: props.rootPrefixCls
	      };
	      if (state.showHourPanel) {
	        panel = React.createElement(TimePanel, _extends({ rowCount: 6, colCount: 4, getter: 'getHourOfDay', setter: 'setHourOfDay',
	          title: locale.hourPanelTitle
	        }, commonProps));
	      } else if (state.showMinutePanel) {
	        panel = React.createElement(TimePanel, _extends({ rowCount: 6, colCount: 10, getter: 'getMinutes', setter: 'setMinutes',
	          title: locale.minutePanelTitle
	        }, commonProps));
	      } else if (state.showSecondPanel) {
	        panel = React.createElement(TimePanel, _extends({ rowCount: 6, colCount: 10, getter: 'getSeconds', setter: 'setSeconds',
	          title: locale.secondPanelTitle
	        }, commonProps));
	      }
	      return React.createElement(
	        'div',
	        null,
	        React.createElement('input', { className: prefixClsFn("time-input"), title: locale.hourInput, readOnly: true, value: padding(hour),
	          onClick: this.onHourClick,
	          onKeyDown: this.onHourKeyDown }),
	        React.createElement(
	          'span',
	          null,
	          ' : '
	        ),
	        React.createElement('input', { className: prefixClsFn("time-input"), title: locale.minuteInput, readOnly: true, value: padding(minute),
	          onClick: this.onMinuteClick,
	          onKeyDown: this.onMinuteKeyDown }),
	        React.createElement(
	          'span',
	          null,
	          ' : '
	        ),
	        React.createElement('input', { className: prefixClsFn("time-input"), title: locale.secondInput, readOnly: true, value: padding(second),
	          onClick: this.onSecondClick,
	          onKeyDown: this.onSecondKeyDown }),
	        panel
	      );
	    }
	  }]);

	  return Time;
	})(React.Component);

	Time.prototype.onHourKeyDown = keyDownWrap('setHourOfDay', 0, 23);
	Time.prototype.onMinuteKeyDown = keyDownWrap('setMinutes', 0, 59);
	Time.prototype.onSecondKeyDown = keyDownWrap('setSeconds', 0, 59);

	module.exports = Time;

/***/ },

/***/ 918:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(3);
	var cx = __webpack_require__(922).classSet;

	function choose(hour, e) {
	  var next = this.state.value.clone();
	  var method = this.props.setter;
	  next[method](hour);
	  this.props.onSelect(next);
	  e.preventDefault();
	}

	var TimePanel = (function (_React$Component) {
	  _inherits(TimePanel, _React$Component);

	  function TimePanel(props) {
	    _classCallCheck(this, TimePanel);

	    _get(Object.getPrototypeOf(TimePanel.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      value: props.value,
	      prefixCls: props.rootPrefixCls + '-time-panel'
	    };
	    this.prefixClsFn = __webpack_require__(916).bind(this);
	  }

	  _createClass(TimePanel, [{
	    key: 'render',
	    value: function render() {
	      var _this = this;

	      var value = this.state.value;
	      var props = this.props;
	      var method = props.getter;
	      var currentHour = value[method]();
	      var data = [];
	      var prefixClsFn = this.prefixClsFn;
	      var ROW = props.rowCount;
	      var COL = props.colCount;

	      for (var i = 0; i < ROW; i++) {
	        data[i] = [];
	        for (var j = 0; j < COL; j++) {
	          data[i][j] = i * COL + j;
	        }
	      }

	      var hoursEls = data.map(function (row, index) {
	        var tds = row.map(function (d) {
	          var classNameMap = {};
	          classNameMap[prefixClsFn('cell')] = 1;
	          classNameMap[prefixClsFn('selected-cell')] = d === currentHour;
	          return React.createElement(
	            'td',
	            {
	              key: d,
	              onClick: choose.bind(_this, d),
	              role: 'gridcell',
	              className: cx(classNameMap) },
	            React.createElement(
	              'a',
	              {
	                className: prefixClsFn('time') },
	              d
	            )
	          );
	        });
	        return React.createElement(
	          'tr',
	          { key: index, role: 'row' },
	          tds
	        );
	      });

	      return React.createElement(
	        'div',
	        { className: this.state.prefixCls },
	        React.createElement(
	          'div',
	          { className: prefixClsFn('header') },
	          React.createElement(
	            'div',
	            { className: prefixClsFn('title') },
	            props.title
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: prefixClsFn('body') },
	          React.createElement(
	            'table',
	            { className: prefixClsFn('table'), cellSpacing: '0', role: 'grid' },
	            React.createElement(
	              'tbody',
	              { className: prefixClsFn('tbody') },
	              hoursEls
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return TimePanel;
	})(React.Component);

	TimePanel.defaultProps = {
	  onSelect: function onSelect() {}
	};

	module.exports = TimePanel;

/***/ },

/***/ 919:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var React = __webpack_require__(3);
	var DateTimeFormat = __webpack_require__(889);
	var ROW = 3;
	var COL = 4;
	var cx = __webpack_require__(922).classSet;
	var DecadePanel = __webpack_require__(911);

	function goYear(direction) {
	  var next = this.state.value.clone();
	  next.addYear(direction);
	  this.setState({ value: next });
	}

	function chooseYear(year) {
	  var next = this.state.value.clone();
	  next.setYear(year);
	  this.props.onSelect(next);
	}

	var YearPanel = (function (_React$Component) {
	  _inherits(YearPanel, _React$Component);

	  function YearPanel(props) {
	    var _this = this;

	    _classCallCheck(this, YearPanel);

	    _get(Object.getPrototypeOf(YearPanel.prototype), 'constructor', this).call(this, props);
	    this.prefixClsFn = __webpack_require__(916).bind(this);
	    this.state = {
	      value: props.value,
	      prefixCls: props.rootPrefixCls + '-year-panel'
	    };
	    this.nextDecade = goYear.bind(this, 10);
	    this.previousDecade = goYear.bind(this, -10);
	    ['showDecadePanel', 'onDecadePanelSelect'].forEach(function (m) {
	      _this[m] = _this[m].bind(_this);
	    });
	  }

	  _createClass(YearPanel, [{
	    key: 'showDecadePanel',
	    value: function showDecadePanel() {
	      this.setState({
	        showDecadePanel: 1
	      });
	    }
	  }, {
	    key: 'onDecadePanelSelect',
	    value: function onDecadePanelSelect(current) {
	      this.setState({
	        value: current,
	        showDecadePanel: 0
	      });
	    }
	  }, {
	    key: 'getYears',
	    value: function getYears() {
	      var value = this.state.value;
	      var currentYear = value.getYear();
	      var startYear = parseInt(currentYear / 10, 10) * 10;
	      var preYear = startYear - 1;
	      var current = value.clone();
	      var locale = this.props.locale;
	      var yearFormat = locale.yearFormat;
	      var dateFormatter = new DateTimeFormat(yearFormat);
	      var years = [];
	      var index = 0;
	      for (var i = 0; i < ROW; i++) {
	        years[i] = [];
	        for (var j = 0; j < COL; j++) {
	          current.setYear(preYear + index);
	          years[i][j] = {
	            content: preYear + index,
	            title: dateFormatter.format(current)
	          };
	          index++;
	        }
	      }
	      return years;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var props = this.props;
	      var value = this.state.value;
	      var locale = props.locale;
	      var years = this.getYears();
	      var currentYear = value.getYear();
	      var startYear = parseInt(currentYear / 10, 10) * 10;
	      var endYear = startYear + 9;
	      var prefixClsFn = this.prefixClsFn;

	      var yeasEls = years.map(function (row, index) {
	        var tds = row.map(function (y) {
	          var classNameMap = {};
	          classNameMap[prefixClsFn('cell')] = 1;
	          classNameMap[prefixClsFn('selected-cell')] = y.content === currentYear;
	          classNameMap[prefixClsFn('last-decade-cell')] = y.content < startYear;
	          classNameMap[prefixClsFn('next-decade-cell')] = y.content > endYear;
	          return React.createElement(
	            'td',
	            { role: 'gridcell',
	              title: y.title,
	              key: y.content,
	              onClick: chooseYear.bind(_this2, y.content),
	              className: cx(classNameMap)
	            },
	            React.createElement(
	              'a',
	              {
	                className: prefixClsFn('year') },
	              y.content
	            )
	          );
	        });
	        return React.createElement(
	          'tr',
	          { key: index, role: 'row' },
	          tds
	        );
	      });

	      var decadePanel;
	      if (this.state.showDecadePanel) {
	        decadePanel = React.createElement(DecadePanel, { locale: locale, value: value, rootPrefixCls: props.rootPrefixCls, onSelect: this.onDecadePanelSelect });
	      }

	      return React.createElement(
	        'div',
	        { className: this.state.prefixCls },
	        React.createElement(
	          'div',
	          null,
	          React.createElement(
	            'div',
	            { className: prefixClsFn('header') },
	            React.createElement(
	              'a',
	              { className: prefixClsFn('prev-decade-btn'),
	                role: 'button',
	                onClick: this.previousDecade,
	                title: locale.previousDecade },
	              '«'
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn('decade-select'),
	                role: 'button',
	                onClick: this.showDecadePanel,
	                title: locale.decadeSelect },
	              React.createElement(
	                'span',
	                { className: prefixClsFn('decade-select-content') },
	                startYear,
	                '-',
	                endYear
	              ),
	              React.createElement(
	                'span',
	                { className: prefixClsFn('decade-select-arrow') },
	                'x'
	              )
	            ),
	            React.createElement(
	              'a',
	              { className: prefixClsFn('next-decade-btn'),
	                role: 'button',
	                onClick: this.nextDecade,
	                title: locale.nextDecade },
	              '»'
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: prefixClsFn('body') },
	            React.createElement(
	              'table',
	              { className: prefixClsFn('table'), cellSpacing: '0', role: 'grid' },
	              React.createElement(
	                'tbody',
	                { className: prefixClsFn('tbody') },
	                yeasEls
	              )
	            )
	          )
	        ),
	        decadePanel
	      );
	    }
	  }]);

	  return YearPanel;
	})(React.Component);

	YearPanel.defaultProps = {
	  onSelect: function onSelect() {}
	};

	module.exports = YearPanel;

/***/ },

/***/ 920:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * align dom node flexibly
	 * @author yiminghe@gmail.com
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _utils = __webpack_require__(921);

	var _utils2 = _interopRequireDefault(_utils);

	// http://yiminghe.iteye.com/blog/1124720

	/**
	 * 获取 node 上的 align 对齐点 相对于页面的坐标
	 */

	function getAlignOffset(region, align) {
	  var V = align.charAt(0);
	  var H = align.charAt(1);
	  var w = region.width;
	  var h = region.height;
	  var x = undefined;
	  var y = undefined;

	  x = region.left;
	  y = region.top;

	  if (V === 'c') {
	    y += h / 2;
	  } else if (V === 'b') {
	    y += h;
	  }

	  if (H === 'c') {
	    x += w / 2;
	  } else if (H === 'r') {
	    x += w;
	  }

	  return {
	    left: x,
	    top: y
	  };
	}

	/**
	 * 得到会导致元素显示不全的祖先元素
	 */

	function getOffsetParent(element) {
	  // ie 这个也不是完全可行
	  /*
	   <div style="width: 50px;height: 100px;overflow: hidden">
	   <div style="width: 50px;height: 100px;position: relative;" id="d6">
	   元素 6 高 100px 宽 50px<br/>
	   </div>
	   </div>
	   */
	  // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
	  //  In other browsers it only includes elements with position absolute, relative or
	  // fixed, not elements with overflow set to auto or scroll.
	  //        if (UA.ie && ieMode < 8) {
	  //            return element.offsetParent;
	  //        }
	  // 统一的 offsetParent 方法
	  var doc = element.ownerDocument;
	  var body = doc.body;
	  var parent = undefined;
	  var positionStyle = _utils2['default'].css(element, 'position');
	  var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

	  if (!skipStatic) {
	    return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
	  }

	  for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
	    positionStyle = _utils2['default'].css(parent, 'position');
	    if (positionStyle !== 'static') {
	      return parent;
	    }
	  }
	  return null;
	}

	/**
	 * 获得元素的显示部分的区域
	 */

	function getVisibleRectForElement(element) {
	  var visibleRect = {
	    left: 0,
	    right: Infinity,
	    top: 0,
	    bottom: Infinity
	  };
	  var el = element;
	  var scrollX = undefined;
	  var scrollY = undefined;
	  var winSize = undefined;
	  var doc = element.ownerDocument;
	  var win = doc.defaultView || doc.parentWindow;
	  var body = doc.body;
	  var documentElement = doc.documentElement;

	  // Determine the size of the visible rect by climbing the dom accounting for
	  // all scrollable containers.
	  while (el) {
	    // clientWidth is zero for inline block elements in ie.
	    if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) && (
	    // body may have overflow set on it, yet we still get the entire
	    // viewport. In some browsers, el.offsetParent may be
	    // document.documentElement, so check for that too.
	    el !== body && el !== documentElement && _utils2['default'].css(el, 'overflow') !== 'visible')) {
	      var pos = _utils2['default'].offset(el);
	      // add border
	      pos.left += el.clientLeft;
	      pos.top += el.clientTop;
	      visibleRect.top = Math.max(visibleRect.top, pos.top);
	      visibleRect.right = Math.min(visibleRect.right,
	      // consider area without scrollBar
	      pos.left + el.clientWidth);
	      visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
	      visibleRect.left = Math.max(visibleRect.left, pos.left);
	    } else if (el === body || el === documentElement) {
	      break;
	    }
	    el = getOffsetParent(el);
	  }

	  // Clip by window's viewport.
	  scrollX = _utils2['default'].getWindowScrollLeft(win);
	  scrollY = _utils2['default'].getWindowScrollTop(win);
	  visibleRect.left = Math.max(visibleRect.left, scrollX);
	  visibleRect.top = Math.max(visibleRect.top, scrollY);
	  winSize = {
	    width: _utils2['default'].viewportWidth(win),
	    height: _utils2['default'].viewportHeight(win)
	  };
	  visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
	  visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
	  return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
	}

	function getElFuturePos(elRegion, refNodeRegion, points, offset) {
	  var xy = undefined;
	  var diff = undefined;
	  var p1 = undefined;
	  var p2 = undefined;

	  xy = {
	    left: elRegion.left,
	    top: elRegion.top
	  };

	  p1 = getAlignOffset(refNodeRegion, points[1]);
	  p2 = getAlignOffset(elRegion, points[0]);

	  diff = [p2.left - p1.left, p2.top - p1.top];

	  return {
	    left: xy.left - diff[0] + +offset[0],
	    top: xy.top - diff[1] + +offset[1]
	  };
	}

	function isFailX(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
	}

	function isFailY(elFuturePos, elRegion, visibleRect) {
	  return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
	}

	function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
	  var pos = _utils2['default'].clone(elFuturePos);
	  var size = {
	    width: elRegion.width,
	    height: elRegion.height
	  };

	  if (overflow.adjustX && pos.left < visibleRect.left) {
	    pos.left = visibleRect.left;
	  }

	  // Left edge inside and right edge outside viewport, try to resize it.
	  if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
	    size.width -= pos.left + size.width - visibleRect.right;
	  }

	  // Right edge outside viewport, try to move it.
	  if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
	    // 保证左边界和可视区域左边界对齐
	    pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
	  }

	  // Top edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top < visibleRect.top) {
	    pos.top = visibleRect.top;
	  }

	  // Top edge inside and bottom edge outside viewport, try to resize it.
	  if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
	    size.height -= pos.top + size.height - visibleRect.bottom;
	  }

	  // Bottom edge outside viewport, try to move it.
	  if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
	    // 保证上边界和可视区域上边界对齐
	    pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
	  }

	  return _utils2['default'].mix(pos, size);
	}

	function flip(points, reg, map) {
	  var ret = [];
	  _utils2['default'].each(points, function (p) {
	    ret.push(p.replace(reg, function (m) {
	      return map[m];
	    }));
	  });
	  return ret;
	}

	function flipOffset(offset, index) {
	  offset[index] = -offset[index];
	  return offset;
	}

	function getRegion(node) {
	  var offset = undefined;
	  var w = undefined;
	  var h = undefined;
	  if (!_utils2['default'].isWindow(node) && node.nodeType !== 9) {
	    offset = _utils2['default'].offset(node);
	    w = _utils2['default'].outerWidth(node);
	    h = _utils2['default'].outerHeight(node);
	  } else {
	    var win = _utils2['default'].getWindow(node);
	    offset = {
	      left: _utils2['default'].getWindowScrollLeft(win),
	      top: _utils2['default'].getWindowScrollTop(win)
	    };
	    w = _utils2['default'].viewportWidth(win);
	    h = _utils2['default'].viewportHeight(win);
	  }
	  offset.width = w;
	  offset.height = h;
	  return offset;
	}

	/*
	 * align node
	 * @param {Element} node current dom node
	 * @param {Object} align align config
	 *
	 *    @example
	 *    {
	 *      node: null,         // 参考元素, falsy 或 window 为可视区域, 'trigger' 为触发元素, 其他为指定元素
	 *      points: ['cc','cc'], // ['tr', 'tl'] 表示 overlay 的 tr 与参考节点的 tl 对齐
	 *      offset: [0, 0]      // 有效值为 [n, m]
	 *    }
	 */
	function domAlign(el, refNode, align) {
	  var points = align.points;
	  var offset = align.offset;
	  var overflow = align.overflow;
	  offset = offset && [].concat(offset) || [0, 0];
	  overflow = overflow || {};
	  var newOverflowCfg = {};

	  var fail = 0;
	  // 当前节点可以被放置的显示区域
	  var visibleRect = getVisibleRectForElement(el);
	  // 当前节点所占的区域, left/top/width/height
	  var elRegion = getRegion(el);
	  // 参照节点所占的区域, left/top/width/height
	  var refNodeRegion = getRegion(refNode);
	  // 当前节点将要被放置的位置
	  var elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
	  // 当前节点将要所处的区域
	  var newElRegion = _utils2['default'].merge(elRegion, elFuturePos);

	  // 如果可视区域不能完全放置当前节点时允许调整
	  if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
	    if (overflow.adjustX) {
	      // 如果横向不能放下
	      if (isFailX(elFuturePos, elRegion, visibleRect)) {
	        fail = 1;
	        // 对齐位置反下
	        points = flip(points, /[lr]/ig, {
	          l: 'r',
	          r: 'l'
	        });
	        // 偏移量也反下
	        offset = flipOffset(offset, 0);
	      }
	    }

	    if (overflow.adjustY) {
	      // 如果纵向不能放下
	      if (isFailY(elFuturePos, elRegion, visibleRect)) {
	        fail = 1;
	        // 对齐位置反下
	        points = flip(points, /[tb]/ig, {
	          t: 'b',
	          b: 't'
	        });
	        // 偏移量也反下
	        offset = flipOffset(offset, 1);
	      }
	    }

	    // 如果失败，重新计算当前节点将要被放置的位置
	    if (fail) {
	      elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset);
	      _utils2['default'].mix(newElRegion, elFuturePos);
	    }

	    // 检查反下后的位置是否可以放下了
	    // 如果仍然放不下只有指定了可以调整当前方向才调整
	    newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);

	    newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);

	    // 确实要调整，甚至可能会调整高度宽度
	    if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
	      newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
	    }
	  }

	  // https://github.com/kissyteam/kissy/issues/190
	  // http://localhost:8888/kissy/src/overlay/demo/other/relative_align/align.html
	  // 相对于屏幕位置没变，而 left/top 变了
	  // 例如 <div 'relative'><el absolute></div>
	  _utils2['default'].offset(el, { left: newElRegion.left, top: newElRegion.top });

	  // need judge to in case set fixed with in css on height auto element
	  if (newElRegion.width !== elRegion.width) {
	    _utils2['default'].css(el, 'width', el.width() + newElRegion.width - elRegion.width);
	  }

	  if (newElRegion.height !== elRegion.height) {
	    _utils2['default'].css(el, 'height', el.height() + newElRegion.height - elRegion.height);
	  }

	  return {
	    points: points,
	    offset: offset,
	    overflow: newOverflowCfg
	  };
	}

	domAlign.__getOffsetParent = getOffsetParent;

	domAlign.__getVisibleRectForElement = getVisibleRectForElement;

	exports['default'] = domAlign;

	/**
	 *  2012-04-26 yiminghe@gmail.com
	 *   - 优化智能对齐算法
	 *   - 慎用 resizeXX
	 *
	 *  2011-07-13 yiminghe@gmail.com note:
	 *   - 增加智能对齐，以及大小调整选项
	 **/
	module.exports = exports['default'];

/***/ },

/***/ 921:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

	var getComputedStyleX = undefined;

	function css(el, name, v) {
	  var value = v;
	  if (typeof name === 'object') {
	    for (var i in name) {
	      if (name.hasOwnProperty(i)) {
	        css(el, i, name[i]);
	      }
	    }
	    return undefined;
	  }
	  if (typeof value !== 'undefined') {
	    if (typeof value === 'number') {
	      value = value + 'px';
	    }
	    el.style[name] = value;
	    return undefined;
	  }
	  return getComputedStyleX(el, name);
	}

	function getClientPosition(elem) {
	  var box = undefined;
	  var x = undefined;
	  var y = undefined;
	  var doc = elem.ownerDocument;
	  var body = doc.body;
	  var docElem = doc && doc.documentElement;
	  // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
	  box = elem.getBoundingClientRect();

	  // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
	  // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
	  // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

	  x = box.left;
	  y = box.top;

	  // In IE, most of the time, 2 extra pixels are added to the top and left
	  // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
	  // IE6 standards mode, this border can be overridden by setting the
	  // document element's border to zero -- thus, we cannot rely on the
	  // offset always being 2 pixels.

	  // In quirks mode, the offset can be determined by querying the body's
	  // clientLeft/clientTop, but in standards mode, it is found by querying
	  // the document element's clientLeft/clientTop.  Since we already called
	  // getClientBoundingRect we have already forced a reflow, so it is not
	  // too expensive just to query them all.

	  // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
	  // 窗口边框标准是设 documentElement ,quirks 时设置 body
	  // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
	  // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
	  // 标准 ie 下 docElem.clientTop 就是 border-top
	  // ie7 html 即窗口边框改变不了。永远为 2
	  // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

	  x -= docElem.clientLeft || body.clientLeft || 0;
	  y -= docElem.clientTop || body.clientTop || 0;

	  return { left: x, top: y };
	}

	function getScroll(w, top) {
	  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
	  var method = 'scroll' + (top ? 'Top' : 'Left');
	  if (typeof ret !== 'number') {
	    var d = w.document;
	    // ie6,7,8 standard mode
	    ret = d.documentElement[method];
	    if (typeof ret !== 'number') {
	      // quirks mode
	      ret = d.body[method];
	    }
	  }
	  return ret;
	}

	function getScrollLeft(w) {
	  return getScroll(w);
	}

	function getScrollTop(w) {
	  return getScroll(w, true);
	}

	function getOffset(el) {
	  var pos = getClientPosition(el);
	  var doc = el.ownerDocument;
	  var w = doc.defaultView || doc.parentWindow;
	  pos.left += getScrollLeft(w);
	  pos.top += getScrollTop(w);
	  return pos;
	}
	function _getComputedStyle(elem, name, cs) {
	  var computedStyle = cs;
	  var val = '';
	  var d = elem.ownerDocument;

	  // https://github.com/kissyteam/kissy/issues/61
	  if (computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null)) {
	    val = computedStyle.getPropertyValue(name) || computedStyle[name];
	  }

	  return val;
	}

	var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
	var RE_POS = /^(top|right|bottom|left)$/;
	var CURRENT_STYLE = 'currentStyle';
	var RUNTIME_STYLE = 'runtimeStyle';
	var LEFT = 'left';
	var PX = 'px';

	function _getComputedStyleIE(elem, name) {
	  // currentStyle maybe null
	  // http://msdn.microsoft.com/en-us/library/ms535231.aspx
	  var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

	  // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
	  // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
	  // 在 ie 下不对，需要直接用 offset 方式
	  // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

	  // From the awesome hack by Dean Edwards
	  // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	  // If we're not dealing with a regular pixel number
	  // but a number that has a weird ending, we need to convert it to pixels
	  // exclude left right for relativity
	  if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
	    // Remember the original values
	    var style = elem.style;
	    var left = style[LEFT];
	    var rsLeft = elem[RUNTIME_STYLE][LEFT];

	    // prevent flashing of content
	    elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

	    // Put in the new values to get a computed value out
	    style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
	    ret = style.pixelLeft + PX;

	    // Revert the changed values
	    style[LEFT] = left;

	    elem[RUNTIME_STYLE][LEFT] = rsLeft;
	  }
	  return ret === '' ? 'auto' : ret;
	}

	if (typeof window !== 'undefined') {
	  getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
	}

	// 设置 elem 相对 elem.ownerDocument 的坐标
	function setOffset(elem, offset) {
	  // set position first, in-case top/left are set even on static elem
	  if (css(elem, 'position') === 'static') {
	    elem.style.position = 'relative';
	  }
	  var preset = -9999;
	  if ('left' in offset) {
	    elem.style.left = preset + 'px';
	  }
	  if ('top' in offset) {
	    elem.style.top = preset + 'px';
	  }
	  var old = getOffset(elem);
	  var ret = {};
	  var key = undefined;
	  for (key in offset) {
	    if (offset.hasOwnProperty(key)) {
	      ret[key] = preset + offset[key] - old[key];
	    }
	  }
	  css(elem, ret);
	}

	function each(arr, fn) {
	  for (var i = 0; i < arr.length; i++) {
	    fn(arr[i]);
	  }
	}

	function isBorderBoxFn(elem) {
	  return getComputedStyleX(elem, 'boxSizing') === 'border-box';
	}

	var BOX_MODELS = ['margin', 'border', 'padding'];
	var CONTENT_INDEX = -1;
	var PADDING_INDEX = 2;
	var BORDER_INDEX = 1;
	var MARGIN_INDEX = 0;

	function swap(elem, options, callback) {
	  var old = {};
	  var style = elem.style;
	  var name = undefined;

	  // Remember the old values, and insert the new ones
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      old[name] = style[name];
	      style[name] = options[name];
	    }
	  }

	  callback.call(elem);

	  // Revert the old values
	  for (name in options) {
	    if (options.hasOwnProperty(name)) {
	      style[name] = old[name];
	    }
	  }
	}

	function getPBMWidth(elem, props, which) {
	  var value = 0;
	  var prop = undefined;
	  var j = undefined;
	  var i = undefined;
	  for (j = 0; j < props.length; j++) {
	    prop = props[j];
	    if (prop) {
	      for (i = 0; i < which.length; i++) {
	        var cssProp = undefined;
	        if (prop === 'border') {
	          cssProp = prop + which[i] + 'Width';
	        } else {
	          cssProp = prop + which[i];
	        }
	        value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
	      }
	    }
	  }
	  return value;
	}

	/**
	 * A crude way of determining if an object is a window
	 * @member util
	 */
	function isWindow(obj) {
	  // must use == for ie8
	  /* eslint eqeqeq:0 */
	  return obj !== null && obj !== undefined && obj == obj.window;
	}

	var domUtils = {};

	each(['Width', 'Height'], function (name) {
	  domUtils['doc' + name] = function (refWin) {
	    var d = refWin.document;
	    return Math.max(
	    // firefox chrome documentElement.scrollHeight< body.scrollHeight
	    // ie standard mode : documentElement.scrollHeight> body.scrollHeight
	    d.documentElement['scroll' + name],
	    // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
	    d.body['scroll' + name], domUtils['viewport' + name](d));
	  };

	  domUtils['viewport' + name] = function (win) {
	    // pc browser includes scrollbar in window.innerWidth
	    var prop = 'client' + name;
	    var doc = win.document;
	    var body = doc.body;
	    var documentElement = doc.documentElement;
	    var documentElementProp = documentElement[prop];
	    // 标准模式取 documentElement
	    // backcompat 取 body
	    return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
	  };
	});

	/*
	 得到元素的大小信息
	 @param elem
	 @param name
	 @param {String} [extra]  'padding' : (css width) + padding
	 'border' : (css width) + padding + border
	 'margin' : (css width) + padding + border + margin
	 */
	function getWH(elem, name, ex) {
	  var extra = ex;
	  if (isWindow(elem)) {
	    return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
	  } else if (elem.nodeType === 9) {
	    return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
	  }
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
	  var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
	  var computedStyle = getComputedStyleX(elem);
	  var isBorderBox = isBorderBoxFn(elem, computedStyle);
	  var cssBoxValue = 0;
	  if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
	    borderBoxValue = undefined;
	    // Fall back to computed then un computed css if necessary
	    cssBoxValue = getComputedStyleX(elem, name);
	    if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
	      cssBoxValue = elem.style[name] || 0;
	    }
	    // Normalize '', auto, and prepare for extra
	    cssBoxValue = parseFloat(cssBoxValue) || 0;
	  }
	  if (extra === undefined) {
	    extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
	  }
	  var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
	  var val = borderBoxValue || cssBoxValue;
	  if (extra === CONTENT_INDEX) {
	    if (borderBoxValueOrIsBorderBox) {
	      return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
	    }
	    return cssBoxValue;
	  } else if (borderBoxValueOrIsBorderBox) {
	    if (extra === BORDER_INDEX) {
	      return val;
	    }
	    return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
	  }
	  return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
	}

	var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };

	// fix #119 : https://github.com/kissyteam/kissy/issues/119
	function getWHIgnoreDisplay() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var val = undefined;
	  var elem = args[0];
	  // in case elem is window
	  // elem.offsetWidth === undefined
	  if (elem.offsetWidth !== 0) {
	    val = getWH.apply(undefined, args);
	  } else {
	    swap(elem, cssShow, function () {
	      val = getWH.apply(undefined, args);
	    });
	  }
	  return val;
	}

	each(['width', 'height'], function (name) {
	  var first = name.charAt(0).toUpperCase() + name.slice(1);
	  domUtils['outer' + first] = function (el, includeMargin) {
	    return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
	  };
	  var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

	  domUtils[name] = function (elem, v) {
	    var val = v;
	    if (val !== undefined) {
	      if (elem) {
	        var computedStyle = getComputedStyleX(elem);
	        var isBorderBox = isBorderBoxFn(elem);
	        if (isBorderBox) {
	          val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
	        }
	        return css(elem, name, val);
	      }
	      return undefined;
	    }
	    return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
	  };
	});

	function mix(to, from) {
	  for (var i in from) {
	    if (from.hasOwnProperty(i)) {
	      to[i] = from[i];
	    }
	  }
	  return to;
	}

	var utils = {
	  getWindow: function getWindow(node) {
	    if (node && node.document && node.setTimeout) {
	      return node;
	    }
	    var doc = node.ownerDocument || node;
	    return doc.defaultView || doc.parentWindow;
	  },
	  offset: function offset(el, value) {
	    if (typeof value !== 'undefined') {
	      setOffset(el, value);
	    } else {
	      return getOffset(el);
	    }
	  },
	  isWindow: isWindow,
	  each: each,
	  css: css,
	  clone: function clone(obj) {
	    var i = undefined;
	    var ret = {};
	    for (i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        ret[i] = obj[i];
	      }
	    }
	    var overflow = obj.overflow;
	    if (overflow) {
	      for (i in obj) {
	        if (obj.hasOwnProperty(i)) {
	          ret.overflow[i] = obj.overflow[i];
	        }
	      }
	    }
	    return ret;
	  },
	  mix: mix,
	  getWindowScrollLeft: function getWindowScrollLeft(w) {
	    return getScrollLeft(w);
	  },
	  getWindowScrollTop: function getWindowScrollTop(w) {
	    return getScrollTop(w);
	  },
	  merge: function merge() {
	    var ret = {};

	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    for (var i = 0; i < args.length; i++) {
	      utils.mix(ret, args[i]);
	    }
	    return ret;
	  },
	  viewportWidth: 0,
	  viewportHeight: 0
	};

	mix(utils, domUtils);

	exports['default'] = utils;
	module.exports = exports['default'];

/***/ },

/***/ 922:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  guid: __webpack_require__(929),
	  classSet: __webpack_require__(925),
	  joinClasses: __webpack_require__(930),
	  KeyCode: __webpack_require__(931),
	  PureRenderMixin: __webpack_require__(932),
	  shallowEqual: __webpack_require__(933),
	  createChainedFunction: __webpack_require__(926),
	  Dom: {
	    addEventListener: __webpack_require__(927),
	    contains: __webpack_require__(928)
	  },
	  Children: {
	    toArray: __webpack_require__(924),
	    mapSelf: __webpack_require__(923)
	  }
	};

/***/ },

/***/ 923:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	function mirror(o) {
	  return o;
	}

	module.exports = function (children) {
	  // return ReactFragment
	  return React.Children.map(children, mirror);
	};

/***/ },

/***/ 924:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(3);

	module.exports = function (children) {
	  var ret = [];
	  React.Children.forEach(children, function (c) {
	    ret.push(c);
	  });
	  return ret;
	};

/***/ },

/***/ 925:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/cx.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	'use strict';

	function cx(classNames) {
	  if (typeof classNames === 'object') {
	    return Object.keys(classNames).filter(function (className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}

	module.exports = cx;

/***/ },

/***/ 926:
/***/ function(module, exports) {

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @returns {function|null}
	 */
	"use strict";

	function createChainedFunction() {
	  var args = arguments;

	  return function chainedFunction() {
	    for (var i = 0; i < args.length; i++) {
	      if (args[i] && args[i].apply) {
	        args[i].apply(this, arguments);
	      }
	    }
	  };
	}

	module.exports = createChainedFunction;

/***/ },

/***/ 927:
/***/ function(module, exports) {

	'use strict';

	module.exports = function (target, eventType, callback) {
	  if (target.addEventListener) {
	    target.addEventListener(eventType, callback, false);
	    return {
	      remove: function remove() {
	        target.removeEventListener(eventType, callback, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventType, callback);
	    return {
	      remove: function remove() {
	        target.detachEvent('on' + eventType, callback);
	      }
	    };
	  }
	};

/***/ },

/***/ 928:
/***/ function(module, exports) {

	"use strict";

	module.exports = function (root, node) {
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }

	  return false;
	};

/***/ },

/***/ 929:
/***/ function(module, exports) {

	'use strict';

	var seed = 0;
	module.exports = function () {
	  return Date.now() + '_' + seed++;
	};

/***/ },

/***/ 930:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/utils/joinClasses.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */

	"use strict";

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */

	function joinClasses(className /*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;

/***/ },

/***/ 931:
/***/ function(module, exports) {

	/**
	 * @ignore
	 * some key-codes definition and utils from closure-library
	 * @author yiminghe@gmail.com
	 */

	'use strict';

	var KeyCode = {
	  /**
	   * MAC_ENTER
	   */
	  MAC_ENTER: 3,
	  /**
	   * BACKSPACE
	   */
	  BACKSPACE: 8,
	  /**
	   * TAB
	   */
	  TAB: 9,
	  /**
	   * NUMLOCK on FF/Safari Mac
	   */
	  NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
	  /**
	   * ENTER
	   */
	  ENTER: 13,
	  /**
	   * SHIFT
	   */
	  SHIFT: 16,
	  /**
	   * CTRL
	   */
	  CTRL: 17,
	  /**
	   * ALT
	   */
	  ALT: 18,
	  /**
	   * PAUSE
	   */
	  PAUSE: 19,
	  /**
	   * CAPS_LOCK
	   */
	  CAPS_LOCK: 20,
	  /**
	   * ESC
	   */
	  ESC: 27,
	  /**
	   * SPACE
	   */
	  SPACE: 32,
	  /**
	   * PAGE_UP
	   */
	  PAGE_UP: 33, // also NUM_NORTH_EAST
	  /**
	   * PAGE_DOWN
	   */
	  PAGE_DOWN: 34, // also NUM_SOUTH_EAST
	  /**
	   * END
	   */
	  END: 35, // also NUM_SOUTH_WEST
	  /**
	   * HOME
	   */
	  HOME: 36, // also NUM_NORTH_WEST
	  /**
	   * LEFT
	   */
	  LEFT: 37, // also NUM_WEST
	  /**
	   * UP
	   */
	  UP: 38, // also NUM_NORTH
	  /**
	   * RIGHT
	   */
	  RIGHT: 39, // also NUM_EAST
	  /**
	   * DOWN
	   */
	  DOWN: 40, // also NUM_SOUTH
	  /**
	   * PRINT_SCREEN
	   */
	  PRINT_SCREEN: 44,
	  /**
	   * INSERT
	   */
	  INSERT: 45, // also NUM_INSERT
	  /**
	   * DELETE
	   */
	  DELETE: 46, // also NUM_DELETE
	  /**
	   * ZERO
	   */
	  ZERO: 48,
	  /**
	   * ONE
	   */
	  ONE: 49,
	  /**
	   * TWO
	   */
	  TWO: 50,
	  /**
	   * THREE
	   */
	  THREE: 51,
	  /**
	   * FOUR
	   */
	  FOUR: 52,
	  /**
	   * FIVE
	   */
	  FIVE: 53,
	  /**
	   * SIX
	   */
	  SIX: 54,
	  /**
	   * SEVEN
	   */
	  SEVEN: 55,
	  /**
	   * EIGHT
	   */
	  EIGHT: 56,
	  /**
	   * NINE
	   */
	  NINE: 57,
	  /**
	   * QUESTION_MARK
	   */
	  QUESTION_MARK: 63, // needs localization
	  /**
	   * A
	   */
	  A: 65,
	  /**
	   * B
	   */
	  B: 66,
	  /**
	   * C
	   */
	  C: 67,
	  /**
	   * D
	   */
	  D: 68,
	  /**
	   * E
	   */
	  E: 69,
	  /**
	   * F
	   */
	  F: 70,
	  /**
	   * G
	   */
	  G: 71,
	  /**
	   * H
	   */
	  H: 72,
	  /**
	   * I
	   */
	  I: 73,
	  /**
	   * J
	   */
	  J: 74,
	  /**
	   * K
	   */
	  K: 75,
	  /**
	   * L
	   */
	  L: 76,
	  /**
	   * M
	   */
	  M: 77,
	  /**
	   * N
	   */
	  N: 78,
	  /**
	   * O
	   */
	  O: 79,
	  /**
	   * P
	   */
	  P: 80,
	  /**
	   * Q
	   */
	  Q: 81,
	  /**
	   * R
	   */
	  R: 82,
	  /**
	   * S
	   */
	  S: 83,
	  /**
	   * T
	   */
	  T: 84,
	  /**
	   * U
	   */
	  U: 85,
	  /**
	   * V
	   */
	  V: 86,
	  /**
	   * W
	   */
	  W: 87,
	  /**
	   * X
	   */
	  X: 88,
	  /**
	   * Y
	   */
	  Y: 89,
	  /**
	   * Z
	   */
	  Z: 90,
	  /**
	   * META
	   */
	  META: 91, // WIN_KEY_LEFT
	  /**
	   * WIN_KEY_RIGHT
	   */
	  WIN_KEY_RIGHT: 92,
	  /**
	   * CONTEXT_MENU
	   */
	  CONTEXT_MENU: 93,
	  /**
	   * NUM_ZERO
	   */
	  NUM_ZERO: 96,
	  /**
	   * NUM_ONE
	   */
	  NUM_ONE: 97,
	  /**
	   * NUM_TWO
	   */
	  NUM_TWO: 98,
	  /**
	   * NUM_THREE
	   */
	  NUM_THREE: 99,
	  /**
	   * NUM_FOUR
	   */
	  NUM_FOUR: 100,
	  /**
	   * NUM_FIVE
	   */
	  NUM_FIVE: 101,
	  /**
	   * NUM_SIX
	   */
	  NUM_SIX: 102,
	  /**
	   * NUM_SEVEN
	   */
	  NUM_SEVEN: 103,
	  /**
	   * NUM_EIGHT
	   */
	  NUM_EIGHT: 104,
	  /**
	   * NUM_NINE
	   */
	  NUM_NINE: 105,
	  /**
	   * NUM_MULTIPLY
	   */
	  NUM_MULTIPLY: 106,
	  /**
	   * NUM_PLUS
	   */
	  NUM_PLUS: 107,
	  /**
	   * NUM_MINUS
	   */
	  NUM_MINUS: 109,
	  /**
	   * NUM_PERIOD
	   */
	  NUM_PERIOD: 110,
	  /**
	   * NUM_DIVISION
	   */
	  NUM_DIVISION: 111,
	  /**
	   * F1
	   */
	  F1: 112,
	  /**
	   * F2
	   */
	  F2: 113,
	  /**
	   * F3
	   */
	  F3: 114,
	  /**
	   * F4
	   */
	  F4: 115,
	  /**
	   * F5
	   */
	  F5: 116,
	  /**
	   * F6
	   */
	  F6: 117,
	  /**
	   * F7
	   */
	  F7: 118,
	  /**
	   * F8
	   */
	  F8: 119,
	  /**
	   * F9
	   */
	  F9: 120,
	  /**
	   * F10
	   */
	  F10: 121,
	  /**
	   * F11
	   */
	  F11: 122,
	  /**
	   * F12
	   */
	  F12: 123,
	  /**
	   * NUMLOCK
	   */
	  NUMLOCK: 144,
	  /**
	   * SEMICOLON
	   */
	  SEMICOLON: 186, // needs localization
	  /**
	   * DASH
	   */
	  DASH: 189, // needs localization
	  /**
	   * EQUALS
	   */
	  EQUALS: 187, // needs localization
	  /**
	   * COMMA
	   */
	  COMMA: 188, // needs localization
	  /**
	   * PERIOD
	   */
	  PERIOD: 190, // needs localization
	  /**
	   * SLASH
	   */
	  SLASH: 191, // needs localization
	  /**
	   * APOSTROPHE
	   */
	  APOSTROPHE: 192, // needs localization
	  /**
	   * SINGLE_QUOTE
	   */
	  SINGLE_QUOTE: 222, // needs localization
	  /**
	   * OPEN_SQUARE_BRACKET
	   */
	  OPEN_SQUARE_BRACKET: 219, // needs localization
	  /**
	   * BACKSLASH
	   */
	  BACKSLASH: 220, // needs localization
	  /**
	   * CLOSE_SQUARE_BRACKET
	   */
	  CLOSE_SQUARE_BRACKET: 221, // needs localization
	  /**
	   * WIN_KEY
	   */
	  WIN_KEY: 224,
	  /**
	   * MAC_FF_META
	   */
	  MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
	  /**
	   * WIN_IME
	   */
	  WIN_IME: 229
	};

	/*
	 whether text and modified key is entered at the same time.
	 */
	KeyCode.isTextModifyingKeyEvent = function (e) {
	  var keyCode = e.keyCode;
	  if (e.altKey && !e.ctrlKey || e.metaKey ||
	  // Function keys don't generate text
	  keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
	    return false;
	  }

	  // The following keys are quite harmless, even in combination with
	  // CTRL, ALT or SHIFT.
	  switch (keyCode) {
	    case KeyCode.ALT:
	    case KeyCode.CAPS_LOCK:
	    case KeyCode.CONTEXT_MENU:
	    case KeyCode.CTRL:
	    case KeyCode.DOWN:
	    case KeyCode.END:
	    case KeyCode.ESC:
	    case KeyCode.HOME:
	    case KeyCode.INSERT:
	    case KeyCode.LEFT:
	    case KeyCode.MAC_FF_META:
	    case KeyCode.META:
	    case KeyCode.NUMLOCK:
	    case KeyCode.NUM_CENTER:
	    case KeyCode.PAGE_DOWN:
	    case KeyCode.PAGE_UP:
	    case KeyCode.PAUSE:
	    case KeyCode.PRINT_SCREEN:
	    case KeyCode.RIGHT:
	    case KeyCode.SHIFT:
	    case KeyCode.UP:
	    case KeyCode.WIN_KEY:
	    case KeyCode.WIN_KEY_RIGHT:
	      return false;
	    default:
	      return true;
	  }
	};

	/*
	 whether character is entered.
	 */
	KeyCode.isCharacterKey = function (keyCode) {
	  if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
	    return true;
	  }

	  if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
	    return true;
	  }

	  if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
	    return true;
	  }

	  // Safari sends zero key code for non-latin characters.
	  if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
	    return true;
	  }

	  switch (keyCode) {
	    case KeyCode.SPACE:
	    case KeyCode.QUESTION_MARK:
	    case KeyCode.NUM_PLUS:
	    case KeyCode.NUM_MINUS:
	    case KeyCode.NUM_PERIOD:
	    case KeyCode.NUM_DIVISION:
	    case KeyCode.SEMICOLON:
	    case KeyCode.DASH:
	    case KeyCode.EQUALS:
	    case KeyCode.COMMA:
	    case KeyCode.PERIOD:
	    case KeyCode.SLASH:
	    case KeyCode.APOSTROPHE:
	    case KeyCode.SINGLE_QUOTE:
	    case KeyCode.OPEN_SQUARE_BRACKET:
	    case KeyCode.BACKSLASH:
	    case KeyCode.CLOSE_SQUARE_BRACKET:
	      return true;
	    default:
	      return false;
	  }
	};

	module.exports = KeyCode;

/***/ },

/***/ 932:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule ReactComponentWithPureRenderMixin
	*/

	"use strict";

	var shallowEqual = __webpack_require__(933);

	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
	  }
	};

	module.exports = ReactComponentWithPureRenderMixin;

/***/ },

/***/ 933:
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */

	"use strict";

	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = shallowEqual;

/***/ },

/***/ 934:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ }

/******/ });