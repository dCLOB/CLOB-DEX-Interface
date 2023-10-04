<template>
  <div class="chart-pair-info mainBorderColor">
    <div class="chart-pair-wrapper primary">
      <div class="chart-pair-company">
        <div class="chart-company-logo">
          <img src="../../assets/img/tesla.svg" alt="company-image" />
        </div>
        <div class="chart-company-text">
          <h2 class="chart-company-title">Tesla Motors Inc.</h2>
          <h3 class="chart-company-subtitle">US Market</h3>
        </div>
      </div>
      <p class="chart-company-descriprion">{{ $t('teslaAboutText') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartPairInfo",
};
</script>

<style scoped>

.chart-pair-info {
  border-bottom: 1px solid;
  background-color: var(--v-primary-base) !important;
  border-color: var(--v-primary-base) !important;
}

.chart-pair-wrapper {
  padding: 20px 20px 22px 20px;
}

.chart-pair-company {
  display: flex;
  flex-wrap: wrap;
}
.chart-company-logo {
  width: 33px;
  margin: 0 14px 0 0;
}

.chart-company-logo img {
  width: 100%;
}
.chart-company-title {
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  line-height: 150%;
}
.chart-company-subtitle {
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  line-height: 150%;
  color: #a4a5af;
}
.chart-company-descriprion {
  margin: 16px 0 0 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 150%;
}
</style>