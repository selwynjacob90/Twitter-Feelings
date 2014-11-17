$(function() {
  
  var update_counter = 1, happy_series_idx = 0,
      linechart;

  var render_line_chart = function() {
    var line_ctx = $("#lineChart").get(0).getContext("2d");
    var line_data = {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
        {
            label: "Happy",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: monthly_data[0]["happy"]
        }
      ]
    };

    linechart = new Chart(line_ctx).Line(line_data);  
  }

  var update_series = function(new_data, series_idx) {
    $.each(new_data, function(idx, val){
      linechart.datasets[series_idx].points[idx].value = val;
    })
    linechart.update();
  }

  var update_linechart = function () {
    var curr_data = monthly_data[update_counter%4];
    update_series(curr_data["happy"], happy_series_idx);
    
    update_counter = update_counter + 1;  
  }

  var init = function () {
    render_line_chart();
    
    window.setInterval(function(){
      update_linechart();
    }, 3000);
  }  

  init();  

});