<template>
  <div class="pagebackground">
    <!-- card style -->
    <template v-for="(state, index) in statesObj">
      <div class="stateCard" :key="index">
        <view class="tableTitle">{{statesChineseName[state['State or territory']]}}</view>
          <view class="table">
            <view class="tr">
                <view class="th th1">日期</view>
                <view class="th th1">确诊</view>
                <view class="th th1">现存</view>
                <view class="th th1">死亡</view>
                <view class="th th1">治愈</view>
            </view>
            <view class="tr">
                <view class="td td1">今日</view>
                <view class="td td1">{{state['Confirmed cases (cumulative)']}}</view>
                <view class="td td1">{{stateExisting[state['State or territory']].currExist}}</view>
                <view class="td td1">{{state['Deaths']}}</view>
                <view class="td td1">{{state['Recovered']}}</view>
            </view>
            <view class="tr">
                <view class="td td1">较昨日</view>
                <view class="td td1" :class="[yesterdayChange[state['State or territory']]['total'] < 0 ? 'greenText' : 'redText']">
                  <span v-show="yesterdayChange[state['State or territory']]['total'] > 0">+</span>{{yesterdayChange[state['State or territory']]['total']}}</view>
                <view class="td td1" :class="[yesterdayChange[state['State or territory']]['existing'] < 0 ? 'greenText' : 'redText']">
                  <span v-show="yesterdayChange[state['State or territory']]['existing'] > 0">+</span>{{yesterdayChange[state['State or territory']]['existing']}}</view>
                <view class="td td1" :class="[yesterdayChange[state['State or territory']]['deaths'] < 0 ? 'greenText' : 'redText']">
                  <span v-show="yesterdayChange[state['State or territory']]['deaths'] > 0">+</span>{{yesterdayChange[state['State or territory']]['deaths']}}</view>
                <view class="td td1" :class="[yesterdayChange[state['State or territory']]['recovered'] < 0 ? 'redText' : 'greenText']">
                  <span v-show="yesterdayChange[state['State or territory']]['recovered'] > 0">+</span>{{yesterdayChange[state['State or territory']]['recovered']}}</view>
            </view>
          </view>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currState: {},
      stateExisting: {
        'VIC': {},
        'NSW': {},
        'QLD': {},
        'SA': {},
        'WA': {},
        'ACT': {},
        'TAS': {},
        'NT': {},
        'National': {}
      },
      yesterdayChange: {
        'VIC': {},
        'NSW': {},
        'QLD': {},
        'SA': {},
        'WA': {},
        'ACT': {},
        'TAS': {},
        'NT': {},
        'National': {}
      },
      statesChineseName: {
        'VIC': '维多利亚州',
        'NSW': '新南威尔士州',
        'QLD': '昆士兰州',
        'SA': '南澳',
        'WA': '西澳',
        'ACT': '首都领地',
        'TAS': '塔斯马尼亚州',
        'NT': '北领地',
        'National': '澳洲全国疫情'
      }
    }
  },
  created () {
    this.$store.dispatch('stats/getStatesData')
      .catch((message) => (console.log(message)))
  },
  computed: {
    statesObj () {
      const unorderedObj = this.$store.state.stats.statesObj
      let orderedObj = {}
      Object.keys(unorderedObj).sort((a, b) => {
        return unorderedObj[b]['Confirmed cases (cumulative)'] - unorderedObj[a]['Confirmed cases (cumulative)']
      }).forEach(function (key) {
        orderedObj[key] = unorderedObj[key]
      })
      return orderedObj
    },
    prevStateData () {
      return this.$store.state.stats.prevStates
    }
  },
  mounted () {
    this.existingCases()
    this.genYesterdayChange()
  },
  methods: {
    existingCases () {
      this.stateExisting = {
        'VIC': {},
        'NSW': {},
        'QLD': {},
        'SA': {},
        'WA': {},
        'ACT': {},
        'TAS': {},
        'NT': {},
        'National': {}
      }
      for (const austate in this.stateExisting) {
        this.stateExisting[austate].currExist = this.statesObj[austate]['Confirmed cases (cumulative)'] - this.statesObj[austate]['Deaths'] - this.statesObj[austate]['Recovered']
        this.stateExisting[austate].yesterdayExist = this.prevStateData[austate]['total'] - this.prevStateData[austate]['deaths'] - this.prevStateData[austate]['recovered']
      }
    },
    genYesterdayChange () {
      for (const austate in this.statesObj) {
        this.yesterdayChange[austate] = {}
        this.yesterdayChange[austate].total = this.statesObj[austate]['Confirmed cases (cumulative)'] - this.prevStateData[austate]['total']
        this.yesterdayChange[austate].existing = this.stateExisting[austate].currExist - this.stateExisting[austate].yesterdayExist
        this.yesterdayChange[austate].deaths = this.statesObj[austate]['Deaths'] - this.prevStateData[austate]['deaths']
        this.yesterdayChange[austate].recovered = this.statesObj[austate]['Recovered'] - this.prevStateData[austate]['recovered']
      }
    }
  }
}
</script>

<style>
.pagebackground{

}

.stateCard{
  align-items: center;
  font-weight: bold;
  border:1px solid #dadada;
  background: linear-gradient(0deg, rgba(255,255,255,1) 52%, rgba(208,213,247,1) 79%);
  border-radius: 20px;
  margin-left: 3%;
  margin-right: 3%;
  margin-bottom: 5%;
}

.table{
  border-right:0;
  border-bottom: 0;
  width: 98%;
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 2%;
  font-size: 15px;
}

.tr{
  width:100%;
  display: flex;
  justify-content: space-between;
}
.th,.td{
  text-align: center;
  width: 100%;
}
.th1,.th2,.td1,.td2{
  width: 40%;
}
.th{
  font-weight: 800;
  font-size: 30rpx;
}
.td{
  font-size: 30rpx;
}

.tableTitle {
  text-align:center;
  margin-bottom: 10rpx;
  margin-top: 10rpx;
  color: rgb(74, 74, 74);
}

.greenText {
  color: green
}

.redText {
  color: red
}
</style>