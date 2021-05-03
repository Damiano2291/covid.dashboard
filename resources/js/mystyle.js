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
        `${regionSelectedFilter.denominazione_regione}`;
      });



    
    
    
    console.log(lastDay)
})