$(function() {
  
  var update_counter = 1, barchart, linechart;

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

  var render_bar_chart = function () {
    var bar_ctx = $("#barChart").get(0).getContext("2d");
    //$('#barChart').attr("width", $('#barChartContainer').innerWidth());
    var bar_data = {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets : [
        {
          label: "Happiness",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: monthly_data[0]["happy"]
        }
      ]
    };

    barchart = new Chart(bar_ctx).Bar(bar_data);
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

  var update_barchart = function () {
    var curr_data = monthly_data[update_counter%4];
    $.each(curr_data["happy"], function(idx, val){
        barchart.datasets[happy_series_idx].bars[idx].value = val;
    })
    barchart.update();
    
  }
  
  var init = function () {
    Chart.defaults.global.scaleLineColor = "#646464";
    Chart.defaults.global.scaleFontColor = "#8c8c8c";

    render_line_chart();
    render_bar_chart();
    
    window.setInterval(function(){
      update_linechart();
      //update_barchart();
      update_counter += 1;
    }, 3000);
  }  

  init();  

});