let DOMnaam, DOMacases, DOMavgcases, DOMavgcasesper, DOMavgdeaths, DOMavgdeathsper;
window.myChart;
let isoland;

const verwerkCases = function (data) {
    Result = data.result;

    let cases = [];

    for(let i = 0; i < Result.length; i++){
        cases[i] = Result[i].confirmed;
    }

    let hulp = cases.length - 1;
    let hulp2 = cases.length - 2;

    let acases = cases[hulp] - cases[hulp2];

    countUp(0, acases, "js-a-cases");
}

const VerwerkData = function (data)
{
    let htmlcodeNaam = '';
    let htmlcodeavgcases = '';
    let htmlcodeavgcasesper = '';
    let htmlcodeavgdeaths = '';
    let htmlcodeavgdeathsper = '';

    let naam = '';
    let avgcasesper;
    let avgdeaths, avgdeathsper;


    Result = data.result;
    console.log(Result[0].confirmed)
    let cases = [];
    let datums = [];
    let deaths = [];
    for(let i = 0; i < Result.length; i++){
        cases[i] = Result[i].confirmed;
        datums[i] = Result[i].date;
        deaths[i] = Result[i].deaths;
    }
    let hulp = cases.length - 1;
    let hulp2 = cases.length - 2;
    let hulp1 = cases.length - 8;
    let hulp3 = cases.length - 15;
    console.log(deaths);


    let acases = cases[hulp] - cases[hulp2];
    console.log(acases);
    
    casesweek = cases[hulp] - cases[hulp1];
    avgcases = casesweek / 7;
    avgcases = Math.round(avgcases);

    deathsweek = deaths[hulp] - deaths[hulp1];
    avgdeaths = deathsweek / 7;
    avgdeaths = Math.round(avgdeaths);

    casesweekp = cases[hulp1] - cases[hulp3];
    avgcasesp = casesweekp / 7;
    avgcasesp = Math.round(avgcasesp);

    deathsweekp = deaths[hulp1] - deaths[hulp3];
    avgdeathsp = deathsweekp / 7;
    avgdeathsp = Math.round(avgdeathsp);

    avgcasesper = avgcases / avgcasesp;
    avgdeathsper = avgdeaths / avgdeathsp;

    avgcasesper = avgcasesper - 1;
    avgcasesper = avgcasesper * 100;
    avgcasesper = Math.round(avgcasesper);

    avgdeathsper = avgdeathsper - 1;
    avgdeathsper = avgdeathsper * 100;
    avgdeathsper = Math.round(avgdeathsper);

    let colorcasesper;

    if(isoland == "BEL")
    {
        naam = "Belgium";
    }

    if(isoland == "NLD")
    {
        naam = "Netherlands";
    }

    if(isoland == "DEU")
    {
        naam = "Germany";
    }

    if(avgcasesper > 0)
    {
        colorcasesper = "#BA463F";
    }
    else
    {
        colorcasesper = "#46a11f";
    }

    if(avgdeathsper > 0)
    {
        colordeathsper = "#BA463F";
    }
    else
    {
        colordeathsper = "#46a11f";
    }

    htmlcodeNaam = `
    <span id="js-naam" class="c-app__location-label">Covid statistics ${naam}</span>
    `
    htmlcodeavgcases = `
    <div id="js-avgcases" class="c-app__cijfers u-grid-column-1">${avgcases}</div>
    `
    htmlcodeavgcasesper = `
    <div id="js-avgcasesper" style="color: ${colorcasesper}" class="c-app__cijfers u-grid-column-1">${avgcasesper} %</div>
    `
    htmlcodeavgdeaths = `
    <div id="js-avgdeaths" class="c-app__cijfers u-grid-column-1">${avgdeaths}</div>
    `
    htmlcodeavgdeathsper = `
    <div id="js-avgdeathsper" style="color: ${colordeathsper}" class="c-app__cijfers u-grid-column-1">${avgdeathsper} %</div>
    `

    DOMnaam.innerHTML = htmlcodeNaam;
    DOMavgcases.innerHTML = htmlcodeavgcases;
    DOMavgcasesper.innerHTML = htmlcodeavgcasesper;
    DOMavgdeaths.innerHTML = htmlcodeavgdeaths;
    DOMavgdeathsper.innerHTML = htmlcodeavgdeathsper;

    if(window.myChart instanceof Chart)
    {
        window.myChart.destroy();
    }

    let borderred = "#BA463F";
    let color = "rgba(186, 70, 63, 0.75)"

    var ctx = document.getElementById('myChart').getContext('2d');
    var gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, color);
    gradientFill.addColorStop(1, "transparent");
    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datums,
            datasets: [{
                data: cases,
                backgroundColor: gradientFill,
                borderColor: borderred,
                pointRadius: 0
            }, 
        ]
        },
        options: {
            legend: {
                display: false
            },
            
            responsive:true,
            maintainAspectRatio:false
        }
    });

    
}

const getCases = function (datum,iso) {
    handleData(
        `https://covidapi.info/api/v1/country/${iso}/timeseries/${datum}/2021-08-16`,
        verwerkCases
    )
}


const getData = function (datum, iso){
    handleData(
        `https://covidapi.info/api/v1/country/${iso}/timeseries/${datum}/2021-08-16`,
        VerwerkData
    )
}

const init = function(){
    isoland = "NLD";
    DOMnaam = document.getElementById('js-naam');
    DOMavgcases = document.getElementById('js-avgcases');
    DOMavgcasesper = document.getElementById('js-avgcasesper');
    DOMavgdeaths = document.getElementById('js-avgdeaths');
    DOMavgdeathsper = document.getElementById('js-avgdeathsper');
    getData('2020-08-01',isoland);
    getCases('2020-08-01',isoland);
    document.getElementById('js-m').addEventListener('click', function () {   
        getData('2021-07-15', isoland)
        //document.getElementById('loader-wrapper').style.display = "flex"; 
        //Loader();
        document.getElementById('js-m').classList.remove('is-selected');
        document.getElementById('js-m').classList.add('is-selected');
        document.getElementById('js-m6').classList.remove('is-selected');
        document.getElementById('js-y1').classList.remove('is-selected');
        document.getElementById('js-y2').classList.remove('is-selected');
    })
    document.getElementById('js-m6').addEventListener('click', function () {
        getData('2021-02-01',isoland)
        //document.getElementById('loader-wrapper').style.display = "flex"; 
        //Loader();
        document.getElementById('js-m6').classList.remove('is-selected');
        document.getElementById('js-m6').classList.add('is-selected');
        document.getElementById('js-m').classList.remove('is-selected');
        document.getElementById('js-y1').classList.remove('is-selected');
        document.getElementById('js-y2').classList.remove('is-selected');
    })
    document.getElementById('js-y1').addEventListener('click', function () {
        getData('2020-08-01',isoland)
        //document.getElementById('loader-wrapper').style.display = "flex"; 
        //Loader();
        document.getElementById('js-y1').classList.remove('is-selected');
        document.getElementById('js-y1').classList.add('is-selected');
        document.getElementById('js-m').classList.remove('is-selected');
        document.getElementById('js-m6').classList.remove('is-selected');
        document.getElementById('js-y2').classList.remove('is-selected');
    })
    document.getElementById('js-y2').addEventListener('click', function () {
        getData('2020-01-01',isoland)
        //document.getElementById('loader-wrapper').style.display = "flex"; 
        //Loader();
        document.getElementById('js-y2').classList.remove('is-selected');
        document.getElementById('js-y2').classList.add('is-selected');
        document.getElementById('js-m').classList.remove('is-selected');
        document.getElementById('js-m6').classList.remove('is-selected');
        document.getElementById('js-y1').classList.remove('is-selected');
    })
    document.getElementById('js-bel').addEventListener('click', function() {
        isoland = "BEL";
        document.getElementById('js-bel').classList.add('animated');
        document.getElementById('js-bel').classList.add('bounce');
        getData('2020-08-01', isoland);
        getCases('2020-08-01', isoland);
        document.getElementById('js-y1').classList.remove('is-selected');
        document.getElementById('js-y1').classList.add('is-selected');
        document.getElementById('js-m').classList.remove('is-selected');
        document.getElementById('js-m6').classList.remove('is-selected');
        document.getElementById('js-y2').classList.remove('is-selected');
        
        document.getElementById('js-bel').classList.remove('is-selected-land');
        document.getElementById('js-bel').classList.add('is-selected-land');
        document.getElementById('js-nl').classList.remove('is-selected-land');
        document.getElementById('js-deu').classList.remove('is-selected-land');

        setTimeout(() => {
            document.getElementById('js-bel').classList.remove('animated');
            document.getElementById('js-bel').classList.remove('bounce');;
        }, 1100);
    })
    document.getElementById('js-nl').addEventListener('click', function() {
        isoland = "NLD";
        document.getElementById('js-nl').classList.add('animated');
        document.getElementById('js-nl').classList.add('bounce');
        getData('2020-08-01', isoland);
        getCases('2020-08-01', isoland);
        document.getElementById('js-y1').classList.remove('is-selected');
        document.getElementById('js-y1').classList.add('is-selected');
        document.getElementById('js-m').classList.remove('is-selected');
        document.getElementById('js-m6').classList.remove('is-selected');
        document.getElementById('js-y2').classList.remove('is-selected');

        document.getElementById('js-nl').classList.remove('is-selected-land');
        document.getElementById('js-nl').classList.add('is-selected-land');
        document.getElementById('js-bel').classList.remove('is-selected-land');
        document.getElementById('js-deu').classList.remove('is-selected-land');

        setTimeout(() => {
            document.getElementById('js-nl').classList.remove('animated');
            document.getElementById('js-nl').classList.remove('bounce');;
        }, 1100);
    })
    document.getElementById('js-deu').addEventListener('click', function() {
        isoland = "DEU";
        document.getElementById('js-deu').classList.add('animated');
        document.getElementById('js-deu').classList.add('bounce');
        getData('2020-08-01', isoland);
        getCases('2020-08-01', isoland);
        document.getElementById('js-y1').classList.remove('is-selected');
        document.getElementById('js-y1').classList.add('is-selected');
        document.getElementById('js-m').classList.remove('is-selected');
        document.getElementById('js-m6').classList.remove('is-selected');
        document.getElementById('js-y2').classList.remove('is-selected');

        document.getElementById('js-deu').classList.remove('is-selected-land');
        document.getElementById('js-deu').classList.add('is-selected-land');
        document.getElementById('js-nl').classList.remove('is-selected-land');
        document.getElementById('js-bel').classList.remove('is-selected-land');

        setTimeout(() => {
            document.getElementById('js-deu').classList.remove('animated');
            document.getElementById('js-deu').classList.remove('bounce');;
        }, 1050);
    })
}

document.addEventListener('DOMContentLoaded', init);