import axios from 'axios';

export default function install(Vue, options) {
    let apiurls = {
        // 登录
        login: '/Api/authapi/login_pwd',
        api: {
            st: {
                // 当前是否正在进行商家活动
                getAct: '/api/st/getAct',
                // 获取所以活动商家的信息
                getActShops: '/api/st/getActShops',
                // 获取活动商家详细信息
                getActShop: '/api/st/getActShop',
                // 获取所以附近活动商家的信息
                getNearActShops: '/api/st/getNearActShops',
                // 分享活动商家详情页
                shareActShop: '/api/st/shareActShop',
            }
        }
    }

    Vue.prototype.LinkerShow = {
        login: function(args) {
            Vue.prototype.request({
                url: apiurls.login,
                data: args.data,
                success: args.success,
                fail: args.fail
            });
        },
        api: {
            st: {
                getAct: function(args) {
                    Vue.prototype.request({
                        url: apiurls.api.st.getAct,
                        success: args.success,
                        fail: args.fail
                    });
                },
                getActShops: function(args) {
                    Vue.prototype.request({
                        url: apiurls.api.st.getActShops,
                        success: args.success,
                        fail: args.fail
                    });
                },
                getActShop: function(args) {
                    Vue.prototype.request({
                        url: apiurls.api.st.getActShop,
                        data: args.data,
                        success: args.success,
                        fail: args.fail
                    });
                },
                getNearActShops: function(args) {
                    Vue.prototype.request({
                        url: apiurls.api.st.getNearActShops,
                        success: args.success,
                        fail: args.fail
                    });
                },
                shareActShop: function(args) {
                    Vue.prototype.request({
                        url: apiurls.api.st.shareActShop,
                        data: args.data,
                        success: args.success,
                        fail: args.fail
                    });
                },
            }
        }
    }

    Vue.prototype.request = function(args) {
        let success = args.success || function() {};
        let fail = args.fail || function() {};
        let headers = args.headers || {};

        this.baserequest({
            url: args.url,
            method: args.method,
            headers: headers,
            data: args.data,
            params: args.params,
            success: function(response) {
                success(response.data.data);
            },
            fail: function(error) {
                let err;
                if (error.response) {
                    err = '失败，接口异常！状态:' + error.response.status;
                } else {
                    err = '失败，接口异常！' + error.message;
                }
                fail(err);
            }
        });
    }

    Vue.prototype.baserequest = function(args) {
        if (!args) { throw new Error('参数不能为空'); }
        let method = args.method || 'post'
        if (method != 'post') method = 'get';
        let headers = args.headers || {};
        let data = args.data || {};
        let success = args.success || function() {};
        let fail = args.fail || function() {};
        axios.request({
                url: args.url,
                method: method, // 默认是 get
                headers: headers,
                data: data,
                params: args.params,
            })
            .then(function(response) {
                args.success(response);
            })
            .catch(function(error) {
                args.fail(error);
            });
    }
}