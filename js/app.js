$(function() {
  
  var update_counter = 1, barchart, linechart, polarchart, doughnutchart;

  //series
  var happy_series_idx = 0,
      sad_series_idx = 1,
      fear_series_idx = 2,
      anger_series_idx = 3;

  //colors
  var blue_color = "rgba(52, 152, 219, 1)",
      yellow_color = "rgba(254, 225, 105, 1)",
      green_color = "rgba(69, 191, 85, 1)",
      red_color = "rgba(242, 89, 75, 1)";

  //weeks
  var weeks = [
     "OCT 18 - OCT 24",
     "OCT 25 - OCT 31",
     "NOV 1 - NOV 7",
     "NOV 8 - NOV 14"
  ]

  var array_sum = function(array) {
    var sum = array.reduce(function(previousValue, currentValue, index, array) {
       return previousValue + currentValue;
    });
    return sum;
  }

  var render_line_chart = function() {
    var line_ctx = $("#lineChart").get(0).getContext("2d");
    //$('#lineChart').attr("width", $('#lineChartContainer').innerWidth());
    var line_data = {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
            label: "Happy",
            fillColor: "rgba(52,152,219,0.2)",
            strokeColor: blue_color,
            pointColor: blue_color,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: blue_color,
            data: monthly_data[0]["happy"]
        },
        {
            label: "Sad",
            fillColor: "rgba(254,225,105,0.2)",
            strokeColor: yellow_color,
            pointColor: yellow_color,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: yellow_color,
            data: monthly_data[0]["sad"]
        },
        {
            label: "Fear",
            fillColor: "rgba(128, 64, 75, 0.2)",
            strokeColor: green_color,
            pointColor: green_color,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: green_color,
            data: monthly_data[0]["fear"]
        },
        {
            label: "Anger",
            fillColor: "rgba(242, 89, 75, 0.2)",
            strokeColor: red_color,
            pointColor: red_color,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: red_color,
            data: monthly_data[0]["anger"]
        }
      ]
    };

    linechart = new Chart(line_ctx).Line(line_data);  
  }

  var render_polar_chart = function () {
    var polar_ctx = $("#polarChart").get(0).getContext("2d");
    var polar_data = [
      {
        value: array_sum(monthly_data[0]["happy"]),
        color: blue_color,
        highlight: blue_color,
        label: "Happy"
      },
      {
        value: array_sum(monthly_data[0]["sad"]),
        color: yellow_color,
        highlight: yellow_color,
        label: "Sad"
      },
      {
        value: array_sum(monthly_data[0]["fear"]),
        color: green_color,
        highlight: green_color,
        label: "Fear"
      },
      {
        value: array_sum(monthly_data[0]["anger"]),
        color: red_color,
        highlight: red_color,
        label: "Anger"
      },
    ];
    var polar_options = {
      segmentStrokeColor : "#242424",
      scaleFontColor : "#e2e2e2",
      scaleShowLabelBackdrop : false,

    }

    polarchart = new Chart(polar_ctx).PolarArea(polar_data, polar_options);
  }

  var render_doughnut_chart = function () {
    var dn_ctx = $("#doughnutChart").get(0).getContext("2d");
    var dn_data = [
      {
        value: unique_tweets[0]["happy"],
        color:blue_color,
        highlight: blue_color,
        label: "Happy"
      },
      {
        value: unique_tweets[0]["sad"],
        color: yellow_color,
        highlight: yellow_color,
        label: "Sad"
      },
      {
        value: unique_tweets[0]["fear"],
        color: green_color,
        highlight: green_color,
        label: "Fear"
      },
      {
        value: unique_tweets[0]["anger"],
        color: red_color,
        highlight: red_color,
        label: "Anger"
      }
    ];
    doughnutchart = new Chart(dn_ctx).Doughnut(dn_data);

  }

  var render_bar_chart = function () {
    var bar_ctx = $("#barChart").get(0).getContext("2d");
    //$('#barChart').attr("width", $('#barChartContainer').innerWidth());
    var bar_data = {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets : [
        {
          label: "Happy",
          fillColor: blue_color,
          strokeColor: blue_color,
          highlightFill: blue_color,
          highlightStroke: blue_color,
          data: monthly_data[0]["happy"]
        },
        {
          label: "Sad",
          fillColor: yellow_color,
          strokeColor: yellow_color,
          highlightFill: yellow_color,
          highlightStroke: yellow_color,
          data: monthly_data[0]["sad"]
        },
                {
          label: "Fear",
          fillColor: green_color,
          strokeColor: green_color,
          highlightFill: green_color,
          highlightStroke: green_color,
          data: monthly_data[0]["fear"]
        },
                {
          label: "Anger",
          fillColor: red_color,
          strokeColor: red_color,
          highlightFill: red_color,
          highlightStroke: red_color,
          data: monthly_data[0]["anger"]
        }
      ]
    };

    barchart = new Chart(bar_ctx).Bar(bar_data);
  }

  var render_kpis = function () {
     var curr_data = monthly_data[0];
     $('.happy_val').html(array_sum(curr_data["happy"]));
     $('.sad_val').html(array_sum(curr_data["sad"]));
     $('.fear_val').html(array_sum(curr_data["fear"]));
     $('.anger_val').html(array_sum(curr_data["anger"]));
  }

  var update_kpis = function () {
    var curr_data = monthly_data[update_counter%4];
     $('.happy_val').html(array_sum(curr_data["happy"]));
     $('.sad_val').html(array_sum(curr_data["sad"]));
     $('.fear_val').html(array_sum(curr_data["fear"]));
     $('.anger_val').html(array_sum(curr_data["anger"]));
  }

  var update_series = function(new_data, series_idx) {
    $.each(new_data, function(idx, val){
      linechart.datasets[series_idx].points[idx].value = val;
    })
  }

  var update_linechart = function () {
    var curr_data = monthly_data[update_counter%4];
    update_series(curr_data["happy"], happy_series_idx);
    update_series(curr_data["sad"], sad_series_idx);
    update_series(curr_data["fear"], fear_series_idx);
    update_series(curr_data["anger"], anger_series_idx);
    
    linechart.update();
  }

  var update_polar_chart = function() {
    var curr_data = monthly_data[update_counter%4];
    polarchart.segments[happy_series_idx].value = array_sum(curr_data["happy"]);
    polarchart.segments[sad_series_idx].value = array_sum(curr_data["sad"]) * 0.5 * (update_counter%4 + 1);
    polarchart.segments[fear_series_idx].value = array_sum(curr_data["fear"]) * 0.5 * (update_counter%4 + 1);
    polarchart.segments[anger_series_idx].value = array_sum(curr_data["anger"]) * 0.5 * (update_counter%4 + 1);

    polarchart.update();
  }

  var update_doughnut_chart = function() {
    var curr_data = unique_tweets[update_counter%4];
    doughnutchart.segments[happy_series_idx].value = curr_data["happy"];
    doughnutchart.segments[sad_series_idx].value = curr_data["sad"] * 0.5 * (update_counter%4 + 1);
    doughnutchart.segments[fear_series_idx].value = curr_data["fear"] * 0.5 * (update_counter%4 + 1);
    doughnutchart.segments[anger_series_idx].value = curr_data["anger"] * 0.5 * (update_counter%4 + 1);

    doughnutchart.update();
  }

  var update_bar_series = function(new_data, series_idx) {
    $.each(new_data, function(idx, val){
      barchart.datasets[series_idx].bars[idx].value = val;
    })
  }
  var update_barchart = function () {
    var curr_data = monthly_data[update_counter%4];
    update_bar_series(curr_data["happy"], happy_series_idx)
    update_bar_series(curr_data["sad"], sad_series_idx)
    update_bar_series(curr_data["fear"], fear_series_idx)
    update_bar_series(curr_data["anger"], anger_series_idx)
    barchart.update();
  }
  
  var init = function () {
    Chart.defaults.global.scaleLineColor = "#646464";
    Chart.defaults.global.scaleFontColor = "#8c8c8c";

    render_line_chart();
    render_polar_chart();
    render_bar_chart();
    render_doughnut_chart();
    render_kpis();
    
    window.setInterval(function(){
      update_linechart();
      update_polar_chart();
      update_doughnut_chart();
      update_barchart();
      update_kpis();
      $('#weeks').html(weeks[update_counter%4]);
      update_counter += 1;
    }, 4000);
  }  

  init();  

});