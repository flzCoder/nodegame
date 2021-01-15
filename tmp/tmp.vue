<template>
<div id="app" class="wap-wrap">
  <div class="wap-header-wrap">
    <template v-for="item in topADData">
      <component v-bind:is="item.type" :yt-data="item"></component>
    </template>
  </div>
  <nav-bar :channel-config="channelConfig"></nav-bar>
  <router-view :focus-addata="focusAddata" :channel-config="channelConfig"></router-view>
</div>
</template>

<script type="text/javascript">
import '../../../assets/styles/reset.css';
import '../../../assets/styles/base-layout.less';
import './app.less';
import '../../../common/adservice/components/yt/style.less';
import '../../../components/newscard/style.less';
import scrollMonitor from '../../../common/util/scroll_monitor';
import adDataService from '../../../common/adservice/data/data';
import doNeteaseTracker from '../../../common/util/netease_tracker';
import navBar from '../../../components/channel/navbar/index';
const columsAD = () => import('../../../common/adservice/components/yt/colums');
const enlargeAD = () => import('../../../common/adservice/components/yt/enlarge');
const pushAD = () => import('../../../common/adservice/components/yt/push');
const floatAD = () => import('../../../common/adservice/components/yt/float');

export default {
  data() {
    return {
      topADData: [],
      focusAddata: {
        isReady: false,
        data: []
      },
      {
        "route": "/touch/sports/",
        "isHyperlink": 0,
        "alias": "sports",
        "name": "娱乐",
        "path": "https://3g.163.com/wap/special/0040ad/wap_ad_sports.js",
        "data": {
          "channelId": "0003"
        },
        "childroute": [{
          "route": "/touch/sports/",
          "name": "首页",
          "path": "https://3g.163.com/wap/special/0040ad/wap_ad_sports.js",
          "isHyperlink": 0,
          "alias": "index"
        }, {
          "route": "/touch/sports/sub/television/",
          "name": "电视",
          "path": "",
          "isHyperlink": 0,
          "alias": "television"
        }]
      },
      meta: null
    };
  },
  components: {
    navBar,
    columsAD,
    pushAD,
    enlargeAD,
    floatAD,
  },
  watch: {
    $route(to, from) {
      doNeteaseTracker({
        key: `channel2018_nav_${this.channelConfig.alias}_${to.name}/#click`,
        title: `导航点击${this.channelConfig.alias}_${to.name}`
      });
    }
  },
  methods: {},
  created() {},
  mounted() {
    scrollMonitor(100, () => {
      this.$root.$eventHub.$emit('adService:show:check', {});
    });

    adDataService
      .getYitouADDetailChannelData(this.channelConfig.path)
      .then(d => {
        this.topADData = d.banner.filter(item => {
          return item;
        });
        let newFocusAddata = {
          data: d.focus,
          isReady: true
        };
        this.focusAddata = newFocusAddata;
      })
      .catch(e => {
        this.focusADData = {
          data: [],
          isReady: true
        };
      });
  },

}
</script>

<style lang="less">
</style>
