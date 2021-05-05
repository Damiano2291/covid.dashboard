fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json')
.then(response=>response.json())
.then(data=>{

    let sorted = data.reverse()
    let lastUpdated = sorted[0].data.split('T')[0].split('-').reverse().join(' ')
    document.querySelector('#lastDate').innerHTML = lastUpdated
    
    let lastDay = sorted.filter(el=> el.data == sorted[0].data)
    let totalDeath = lastDay.map(el=> el.deceduti).reduce((t,n)=> t+n)
    document.querySelector('#death').innerHTML = totalDeath

    let newInfected = lastDay.map(el=> el.nuovi_positivi).reduce((t,n)=> t+n)
    document.querySelector('#infect').innerHTML = newInfected

    let totCases = lastDay.map(el=> el.totale_positivi).reduce((t,n)=> t+n)
    document.querySelector('#cases').innerHTML = totCases

    let totRecovered = lastDay.map(el=> el.dimessi_guariti).reduce((t,n)=> t+n)
    document.querySelector('#recover').innerHTML = totRecovered

    let regionWrapper = document.querySelector('#regionWrapper')
    
    lastDay.forEach(el => {
        
        let option = document.createElement('option')
        option.classList.add('mb-3')
        option.value = el.denominazione_regione
        option.innerHTML = 
        `${el.denominazione_regione}`
        
        regionWrapper.appendChild(option)

        let regionDetails = document.querySelector('#regionDetails')
        
    });
    regionWrapper.addEventListener('change', function(){
        
        let regionSelected = regionWrapper.value

        let regionSelectedFilter = lastDay.filter(el => el.denominazione_regione == regionSelected)[0]

        console.log(regionSelectedFilter)
        
        regionDetails.innerHTML = 
        `
        <h2>${regionSelectedFilter.denominazione_regione}</h2>
        <p>Totale decessi: ${regionSelectedFilter.deceduti}</p>
        <p>Nuovi contagiati: ${regionSelectedFilter.nuovi_positivi}</p>
        <p>Attualmente positivi: ${regionSelectedFilter.totale_positivi}</p>
        <p>Totale guariti: ${regionSelectedFilter.dimessi_guariti}</p>
        
        `;
      });

    let regionMap = document.querySelectorAll('[data-region')




    regionMap.forEach(el => {
        el.addEventListener('click', function(){

            let regionSelected2 = el.dataset.region

            let regionSelectedFilter2 = lastDay.filter(el => el.denominazione_regione == regionSelected2)[0]
           
            
            regionDetails.innerHTML = 
            `
            <h2>${regionSelectedFilter2.denominazione_regione}</h2>
            <p>Totale decessi: ${regionSelectedFilter2.deceduti}</p>
            <p>Nuovi contagiati: ${regionSelectedFilter2.nuovi_positivi}</p>
            <p>Attualmente positivi: ${regionSelectedFilter2.totale_positivi}</p>
            <p>Totale guariti: ${regionSelectedFilter2.dimessi_guariti}</p>
            
            `;
        })
    })

 
    console.log(lastDay)

    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        
        // Add data
        chart.data = [
          {date:new Date(2019,5,12), value1:50, value2:48, previousDate:new Date(2019, 5, 5)},
          {date:new Date(2019,5,13), value1:53, value2:51, previousDate:new Date(2019, 5, 6)},
          {date:new Date(2019,5,14), value1:56, value2:58, previousDate:new Date(2019, 5, 7)},
          {date:new Date(2019,5,15), value1:52, value2:53, previousDate:new Date(2019, 5, 8)},
          {date:new Date(2019,5,16), value1:48, value2:44, previousDate:new Date(2019, 5, 9)},
          {date:new Date(2019,5,17), value1:47, value2:42, previousDate:new Date(2019, 5, 10)},
          {date:new Date(2019,5,18), value1:59, value2:55, previousDate:new Date(2019, 5, 11)}
        ]
        
        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 50;
        
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value1";
        series.dataFields.dateX = "date";
        series.strokeWidth = 2;
        series.minBulletDistance = 10;
        series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
        series.tooltip.pointerOrientation = "vertical";
        
        // Create series
        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueY = "value2";
        series2.dataFields.dateX = "date";
        series2.strokeWidth = 2;
        series2.strokeDasharray = "3,4";
        series2.stroke = series.stroke;
        
        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.xAxis = dateAxis;
        
        }); // end am4core.ready()
})