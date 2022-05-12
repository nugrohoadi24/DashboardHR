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
  name: "PieChart",
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
      labels: String,
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
      type: "pie",
      data: {
        labels: this.chart.labels,
        datasets: [{
            label: 'My First Dataset',
            data: this.chart.datasets[0].data,
            backgroundColor: [
            'rgb(71, 164, 38)',
            'rgb(49, 87, 164)',
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
          intersect: false,
          mode: "index",
        },
      },
    });
  },
};
</script>