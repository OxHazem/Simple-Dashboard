document.addEventListener("DOMContentLoaded", () => {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            createSalesChart(data);
            createItemsChart(data);
            createAreaVsItemsChart(data);
            createAreaVsCustomerCountChart(data);
        });
});

function createSalesChart(data) {
    let root = am5.Root.new("sales-chart");
    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(am5xy.XYChart.new(root, {}));
    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "Store_ID",
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
        tooltip: am5.Tooltip.new(root, { labelText: "{categoryX}" })
    }));
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
    }));
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "Store_Sales", 
        categoryXField: "Store_ID", 
        tooltip: am5.Tooltip.new(root, { labelText: "Sales: {valueY}" })
    }));
    xAxis.data.setAll(data.map(item => ({ Store_ID: item.Store_ID })));  
    series.data.setAll(data);
    chart.set("cursor", am5xy.XYCursor.new(root, {}));
    chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal" }));
}


function createItemsChart(data) {
    let root = am5.Root.new("items-chart");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5percent.PieChart.new(root, {
        innerRadius: am5.percent(50) // Creates a donut chart
    }));

    let series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "Items_Available",
        categoryField: "Store_ID",
        tooltip: am5.Tooltip.new(root, { labelText: "{category}: {value}" })
    }));

    series.data.setAll(data);

    chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout
    }));
}


function createAreaVsItemsChart(data) {
    let root = am5.Root.new("area-vs-items-chart");
    root.setThemes([am5themes_Animated.new(root)]);

  
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        layout: root.verticalLayout
    }));


    let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
        tooltip: am5.Tooltip.new(root, { labelText: "{valueX}" })
    }));

 
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
    }));


    let series = chart.series.push(am5xy.XYSeries.new(root, {
        name: "Area vs Available Items",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "Store_Area", 
        valueYField: "Items_Available",
        tooltip: am5.Tooltip.new(root, { labelText: "Store Area: {valueX}\nAvailable Items: {valueY}" }),
        valueField: "Store_ID" 
    }));

   
    series.data.setAll(data);

    
    series.bullets.push(function() {
        return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
                radius: 5, 
                fill: am5.color(0x0000ff),  
                stroke: am5.color(0xffffff), 
                strokeWidth: 2  
            })
        });
    });

    
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    
    chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout
    }));
}


function createAreaVsCustomerCountChart(data) {
    let root = am5.Root.new("area-vs-customer-count-chart");
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        layout: root.verticalLayout
    }));

    let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
        tooltip: am5.Tooltip.new(root, { labelText: "{valueX}" })
    }));

    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
    }));

   
    let series = chart.series.push(am5xy.XYSeries.new(root, {
        name: "Store Area vs Customer Count",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "Store_Area", 
        valueYField: "Daily_Customer_Count", 
        tooltip: am5.Tooltip.new(root, { labelText: "Store Area: {valueX}\nCustomer Count: {valueY}" })
    }));

    
    series.data.setAll(data);

    
    series.bullets.push(function() {
        return am5.Bullet.new(root, {
            sprite: am5.Circle.new(root, {
                radius: 10, 
                fill: am5.color(0xFF0000),  
                stroke: am5.color(0xFFFFFF),  
                strokeWidth: 2  
            })
        });
    });

   
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    
    chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: root.horizontalLayout
    }));
}


