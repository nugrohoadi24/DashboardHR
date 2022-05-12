<template>
  <div>
    <div class="p-3 pb-0 card-header">
      <div class="text-subheading">{{ title }}</div>
      <p v-if="description" class="text-sm" v-html="description" />
    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas :id="id" class="chart-canvas" :height="height"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "DoughnutChart",
  props: {
    id: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: "300",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    chart: {
      type: Object,
      required: true,
      labels: Array,
      datasets: {
        type: Array,
        label: String,
        data: Array,
      },
    },
  },

  mounted() {
    var ctx = document.getElementById(this.id).getContext("2d");

    let chartStatus = Chart.getChart(this.id);
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: this.chart.labels,
        datasets: [{
            label: 'My First Dataset',
            data: this.chart.datasets[0].data,
            backgroundColor: [
              'rgb(71, 164, 38)',
              'rgb(26, 188, 150)',
              'rgb(46, 204, 113)',
              'rgb(186, 220, 88)',
              'rgb(49, 87, 164)',
              'rgb(8, 109, 201)',
              'rgb(104, 109, 224)',
              'rgb(155, 89, 182)',
              'rgb(190, 46, 221)',
              'rgb(231, 76, 60)',
              'rgb(255, 121, 121)',
              'rgb(230, 126, 34)',
              'rgb(243, 156, 18)',
              'rgb(255, 214, 0)',
            ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
        },
        interaction: {
          mode: "index",
        },
      },
    });
  },
};
</script>