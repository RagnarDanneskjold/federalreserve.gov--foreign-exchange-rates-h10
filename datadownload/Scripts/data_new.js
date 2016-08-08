// Data Global Variables
var _series = [],
    chart,
    _plotSeriesCollection = [],
    _minDate,
    _maxDate,
    _freqLabel = '',
    _seriesColor = ['blue', 'red', 'orange', 'green', 'purple', 'black'],
    _axes = [],
    _recessions = [],
    _rawData,
    _numObs = 10,
    fullscreen = false,
    startPicker,
    endPicker,
    numUnits = 0,
    navVisible = true,
    background = new Image();
background.src = 'styles/seal-transparent.png';

// Ajax call to load and parse the json data
function parseData(file) {
    'use strict';
    $.ajax({
        url: file,
        dataType: 'json',
        async: false
    }).success(function(returnedData) {
        loadData(returnedData);
    }).fail(function() {
        hideProgressAnimation();
        modal.open({
            content: 'Error occurred while loading chart data!'
        });
    });
}

// Load the chart data for the very first time.
function loadData(data) {
    'use strict';
    var index = 0;
    var release = data.Data.Release[0];
    var format = '{0}';

    release.DataSet.forEach(function(dataSet) {
        dataSet.Series.forEach(function(seriesNum) {
            _freqLabel = seriesNum.SeriesKey.FREQ;

            var units = seriesNum.Attributes.UNIT;
            switch (units.toLowerCase()) {
                case 'number':
                    units = '';
                    break;
                case 'currency':
                    units = seriesNum.Attributes.CURRENCY;
                    format = '{0:n0}';
                    break;
                default:
                    units = seriesNum.Attributes.UNIT_DESC;
                    break;
            }

            var unitMult;
            if (typeof seriesNum.Attributes.UNIT_MULT_DESC !== 'undefined' && seriesNum.Attributes.UNIT_MULT_DESC.toLowerCase() === 'one') {
                unitMult = '';
            } else {
                unitMult = ' (' + seriesNum.Attributes.UNIT_MULT_DESC + ')';
            }

            var series = {
                color: '',
                dataSetID: dataSet.ID,
                description: seriesNum.Attributes.DESCRIPTION,
                embargoDate: seriesNum.EmbargoDate,
                endDate: seriesNum.DataRanges.EndDate,
                seriesTypeID: seriesNum.SeriesTypeID,
                lineType: 'straight',
                Name: seriesNum.Attributes.SERIES_NAME,
                releaseType: release.ID,
                startDate: seriesNum.DataRanges.StartDate,
                sortIndex: index++,
                unitMult: unitMult,
                units: units,
                format: format
            };

            series.id = series.releaseType + '/' + series.dataSetID + '/' + series.Name + ' ' + getShortDate(series.embargoDate);

            if (seriesNum.Observations.length === 0) {
                series.observations = [];
                _series.push(series);
            } else {
                loadObservations(seriesNum.Observations, series, true);
                if (series.observations.length < 2) {
                    modal.open({
                        content: 'This chart has fewer than two data points. To see the values you may have to hover over the left vertical axis.'
                    });
                    navVisible = false;
                }
                series.color = _seriesColor.shift();
                _plotSeriesCollection.push(series);
            }
        });
    });

    parseRecession();

    numUnits++;
    var axisType = {
        lineType: 'straight',
        label: _plotSeriesCollection[0].units + _plotSeriesCollection[0].unitMult
    };
    if (format !== null) {
        axisType.format = format;
    }
    _axes.push(axisType);
}

function unitExists(unit) {
    'use strict';
    return (_axes.some(function(element) {
        return element.label === unit;
    }));
}

function parseRecession() {
    'use strict';
    var recessionFile = $('#hidRecession').val();
    if (recessionFile) {
        $.ajax({
            url: recessionFile,
            dataType: 'json'
        }).done(function(returnedData) {
            returnedData.Data.forEach(function(series) {
                if (series.Frequency.name === _freqLabel) {
                    series.Frequency.Recessions.forEach(function(recession) {
                        _recessions.push({
                            from: new Date(recession.start),
                            to: new Date(recession.end),
                            color: 'silver',
                            opacity: 0.7
                        });
                    });
                }
            });
        });
    }
}

// Called when a new series is selected from the series list
function newJsonData(data) {
    'use strict';
    var seriesName,
        seriesID,
        embargoDate;

    data.Release[0].DataSet.forEach(function(dataSet) {
        dataSet.Series.forEach(function(series) {
            seriesName = series.Attributes.SERIES_NAME;
            embargoDate = series.EmbargoDate;
            seriesID = (seriesName + ' ' + getShortDate(embargoDate));
            for (var i = _series.length - 1; i >= 0; i--) {
                if (_series[i].id === seriesID) {
                    var newSeries = {};
                    newSeries.id = seriesID;

                    loadObservations(series.Observations, newSeries, false);
                    if (newSeries.minDate.getTime() < _minDate.getTime()) {
                        _minDate = newSeries.minDate;
                        startPicker.min(_minDate);
                    }
                    if (newSeries.maxDate > _maxDate) {
                        _maxDate = newSeries.maxDate;
                        endPicker.max(_maxDate);
                    }
                    _series[i].observations = newSeries.observations;
                    _series[i].color = _seriesColor.shift();
                    _series[i].minDate = newSeries.minDate;
                    _series[i].maxDate = newSeries.maxDate;

                    if (numUnits < 2 && !unitExists(_series[i].units + _series[i].unitMult)) {
                        numUnits++;
                        var axisType = {
                            lineType: 'dashed',
                            label: _series[i].units + _series[i].unitMult
                        };
                        if (_series[i].format !== null) {
                            axisType.format = _series[i].format;
                        }
                        if (_axes[0].lineType === 'dashed') {
                            axisType.lineType = 'straight';
                            _axes.unshift(axisType);
                            chart.options.valueAxis[0].visible = true;

                        } else {
                            chart.options.valueAxis[1].visible = true;
                            _axes.push(axisType);
                        }
                    }
                    if ((numUnits === 2 && (_series[i].units + _series[i].unitMult) === _axes[1].label) || ((_series[i].units + _series[i].unitMult) === _axes[0].label && _axes[0].lineType === 'dashed')) {
                        _series[i].lineType = 'dashed';
                    }
                    for (var h = _series[i].observations.length - 1; h >= 0; h--) {
                        _rawData.options.data.push(_series[i].observations[h]);
                    }
                    _rawData.read();
                    _plotSeriesCollection.push(_series[i]);
                    setColor();
                    setSeriesType();
                    if ($('#LogScale').prop('checked')) {
                        for (var j = chart.options.series.length - 1; j >= 0; j--) {
                            chart.options.series[j].field = 'log';
                        }
                    }
                    _series.splice(i, 1);
                }
            }
        });
    });
    $('#listView').data('kendoListView').dataSource.data(_series);
    $('#legendView').data('kendoListView').dataSource.data(_plotSeriesCollection);
    chart.redraw();
    initChartNav();
    hideProgressAnimation();
    if (!navVisible) {
        $('svg g [x=-24]').attr('x', 80);
    }
}

function tooltipTemplate() {
    if (_freqLabel === 'Q') {
        return '' +
            '#: category.getFullYear() #' +
            '# if(category.getMonth() <= 2) { #-Q1' +
            '# } else if(category.getMonth() <= 5) { #-Q2' +
            '# } else if(category.getMonth() <= 8) { #-Q3' +
            '# } else if(category.getMonth() <= 11) { #-Q4' +
            '# } #' +
            '<br>' +
            '# points.sort(function(a, b){  var a1= a.value, b1= b.value; if(a1== b1) return 0;  return a1> b1? -1: 1;  }); ' +
            'for (var p = 0; p < points.length; p++) { #' +
            '# for (var i = 0; i < _plotSeriesCollection.length; i++) { #' +
            '# if(_plotSeriesCollection[i].id === points[p].series.name) { #' +

            '<div class="left" style="max-width: 600px; white-space:normal; color:#: points[p].series.color#">' +

            '# var point = points[p].value; #' +
            '# if(document.getElementById("LogScale").checked) { #' +
            '# point = points[p].dataItem.log; #' +
            '# } #' +

            '<b>#: point # ' +
            '#: _plotSeriesCollection[i].units #' +
            '#: _plotSeriesCollection[i].unitMult #</b> - ' +
            '#: _plotSeriesCollection[i].description #: ' +

            '# if(document.getElementById("show-series").checked) { #' +
            '<br> (#: points[p].series.name #)' +
            '# } # </div><br>' +
            '# } #' +
            '# } #' +
            '# } #';
    } else if (_freqLabel === 'M') {
        return '' +
            '# if(category.getMonth() === 0) { #January ' +
            '# } else if(category.getMonth() === 1) { #February ' +
            '# } else if(category.getMonth() === 2) { #March ' +
            '# } else if(category.getMonth() === 3) { #April ' +
            '# } else if(category.getMonth() === 4) { #May ' +
            '# } else if(category.getMonth() === 5) { #June ' +
            '# } else if(category.getMonth() === 6) { #July ' +
            '# } else if(category.getMonth() === 7) { #August ' +
            '# } else if(category.getMonth() === 8) { #September ' +
            '# } else if(category.getMonth() === 9) { #October' +
            '# } else if(category.getMonth() === 10) { #November ' +
            '# } else if(category.getMonth() === 11) { #December ' +
            '# } # ' +
            '#: category.getFullYear() #<br>' +
            '# points.sort(function(a, b){  var a1= a.value, b1= b.value; if(a1== b1) return 0;  return a1> b1? -1: 1;  }); ' +
            'for (var p = 0; p < points.length; p++) { #' +
            '# for (var i = 0; i < _plotSeriesCollection.length; i++) { #' +
            '#if(_plotSeriesCollection[i].id === points[p].series.name) { #' +

            '<div class="left" style="max-width: 600px; white-space:normal; color:#: points[p].series.color#">' +

            '# var point = points[p].value; #' +
            '# if(document.getElementById("LogScale").checked) { #' +
            '# point = points[p].dataItem.log; #' +
            '# } #' +
            '<b>#: point # ' +
            '#: _plotSeriesCollection[i].units #' +
            '#: _plotSeriesCollection[i].unitMult # </b> - ' +
            '#: _plotSeriesCollection[i].description #: ' +

            '# if(document.getElementById("show-series").checked) { #' +
            '<br> (#: points[p].series.name #)' +
            '# } # </div><br>' +
            '# } #' +
            '# } #' +
            '# } #';
    } else if (_freqLabel === 'A') {
        return '' +
            '#: category.getFullYear() #<br>' +
            '# points.sort(function(a, b){  var a1= a.value, b1= b.value; if(a1== b1) return 0;  return a1> b1? -1: 1;  }); ' +
            'for (var p = 0; p < points.length; p++) { #' +
            '# for (var i = 0; i < _plotSeriesCollection.length; i++) { #' +
            '#if(_plotSeriesCollection[i].id === points[p].series.name) { #' +

            '<div class="left" style="max-width: 600px; white-space:normal; color:#: points[p].series.color#">' +
            '# var point = points[p].value; #' +
            '# if(document.getElementById("LogScale").checked) { #' +
            '# point = points[p].dataItem.log; #' +
            '# } #' +
            '<b>#: point # ' +
            '#: _plotSeriesCollection[i].units #' +
            '#: _plotSeriesCollection[i].unitMult #</b> - ' +
            '#: _plotSeriesCollection[i].description #: ' +

            '# if(document.getElementById("show-series").checked) { #' +
            '<br> (#: points[p].series.name #)' +
            '# } # </div><br>' +
            '# } #' +
            '# } #' +
            '# } #';
    } else {
        return '' +
            '# var day = category.getDate(); #' +
            '# var month = category.getMonth() + 1; #' +
            '# var year = category.getFullYear(); #' +

            '# if (month < 10) { month="0" + month }; #' +
            '# if (day < 10) { day="0" + day }; #' +
            '#: year #-' +
            '# if(month - 1 === 0) {      #Jan-' +
            '# } else if(month-1 === 1) { #Feb-' +
            '# } else if(month-1 === 2) { #Mar-' +
            '# } else if(month-1 === 3) { #Apr-' +
            '# } else if(month-1 === 4) { #May-' +
            '# } else if(month-1 === 5) { #Jun-' +
            '# } else if(month-1 === 6) { #Jul-' +
            '# } else if(month-1 === 7) { #Aug-' +
            '# } else if(month-1 === 8) { #Sep-' +
            '# } else if(month-1 === 9) { #Oct-' +
            '# } else if(month === 11) {  #Nov-' +
            '# } else if(month === 12) {  #Dec-' +
            '# } #' +
            '#: day #<br> ' +
            '# points.sort(function(a, b){  var a1= a.value, b1= b.value; if(a1== b1) return 0;  return a1> b1? -1: 1;  }); ' +
            'for (var p = 0; p < points.length; p++) { #' +
            '# for (var i = 0; i < _plotSeriesCollection.length; i++) { #' +
            '# if(_plotSeriesCollection[i].id === points[p].series.name) { #' +

            '# var point = points[p].value; #' +
            '# if(document.getElementById("LogScale").checked) { #' +
            '# point = points[p].dataItem.log; #' +
            '# } #' +

            '<div class="left" style="max-width: 600px; white-space:normal; color:#: points[p].series.color#">' +
            '<b>#: point # ' +
            '#: _plotSeriesCollection[i].units #' +
            '#: _plotSeriesCollection[i].unitMult #</b> - ' +
            '#: _plotSeriesCollection[i].description #' +

            '# if(document.getElementById("show-series").checked) { #' +
            '<br> (#: points[p].series.name #)' +
            '# } # </div><br>' +
            '# } #' +
            '# } #' +
            '# } #';
    }
}

function showProgressAnimation() {
    'use strict';
    $('#processing-div-background').show();
}

function hideProgressAnimation() {
    'use strict';
    $('#processing-div-background').hide();
}

// Function to load the observation points for the chart
function loadObservations(observationColl, series, isInitialLoad) {
    'use strict';
    var observations = [],
        seriesObs;

    observationColl.forEach(function(observation) {

        var dateParts = observation.Period.split('-');
        var obsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        if (dateParts.length === 1) {
            dateParts = observation.Period.split('/');
            obsDate = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
        }
        seriesObs = {
            date: obsDate,
            value: Number(observation.Value),
            id: series.id
        };

        if (observation.Value <= 0) {
            seriesObs.log = null;
        } else {
            seriesObs.log = seriesObs.value;
        }
        if (observation.Status !== 'ND') {
            observations.push(seriesObs);
        }
    });
    var minDate = new Date(observations[0].date);
    var maxDate = new Date(observations[observations.length - 1].date);
    if (isInitialLoad) {
        _rawData = new kendo.data.DataSource({
            data: observations,
            group: {
                field: 'id',
                dir: 'asc'
            },
            schema: {
                id: 'id',
                fields: {
                    value: {
                        type: 'number'
                    },
                    log: {
                        type: 'number'
                    },
                    date: {
                        type: 'date'
                    }
                }
            }
        });
        _maxDate = maxDate;
        _minDate = minDate;
        _numObs = observations.length;
        if (_numObs > 600) {
            _numObs = 600;
        } else if (_numObs < 5) {
            _numObs = 5;
        }
    }
    series.minDate = minDate;
    series.maxDate = maxDate;
    series.observations = observations;
}

// The date passed in has the format of '2/25/2014 9:45:00 AM'
// Return only the date not the time.
function getShortDate(date) {
    'use strict';
    var dateParts = date.split(' ');
    return dateParts.length > 0 ? dateParts[0] : date;
}

$('#LogScale').change(function(e) {
    showProgressAnimation();
    if (e.target.checked) {
        var min = Math.min.apply(null, _rawData.data().map(function(a) {
            if (a.log) {
                return a.log;
            } else {
                return Infinity;
            }
        }));
        for (var i = chart.options.valueAxis.length - 1; i >= 0; i--) {
            if (chart.options.valueAxis[i].name !== '_navigator') {
                chart.options.valueAxis[i].axisCrossingValue = 0.000000000000001;
                chart.options.valueAxis[i].min = min * 0.1;
                chart.options.valueAxis[i].type = 'log';
            }
        }
        for (var j = chart.options.series.length - 1; j >= 0; j--) {
            chart.options.series[j].field = 'log';
        }

    } else {
        for (var k = chart.options.series.length - 1; k >= 0; k--) {
            chart.options.series[k].field = 'value';
        }
        for (var l = chart.options.valueAxis.length - 1; l >= 0; l--) {
            chart.options.valueAxis[l].axisCrossingValue = -Infinity;
            chart.options.valueAxis[l].min = undefined;
            chart.options.valueAxis[l].type = '';
        }
    }
    // read updated data and redraw chart
    setColor();
    chart.redraw();
    initChartNav();
    hideProgressAnimation();
});

function createDateFormats() {
    var dateFormats = {};
    switch (_freqLabel) {
        case 'M':
            dateFormats = {
                years: 'yyyy',
                months: 'MM/yy',
                weeks: 'MM/yy',
                days: 'MM/yy',
                hours: 'MM/yy',
                minutes: 'MM/yy',
                seconds: 'MM/yy'
            };
            break;
        case 'A':
            dateFormats = {
                years: 'yyyy',
                months: 'yyyy',
                weeks: 'yyyy',
                days: 'yyyy',
                hours: 'yyyy',
                minutes: 'yyyy',
                seconds: 'yyyy'
            };
            break;
        case 'Q':
            dateFormats = {
                years: 'yyyy',
                months: 'MM/yy',
                weeks: 'MM/yy',
                days: 'MM/yy',
                hours: 'MM/yy',
                minutes: 'MM/yy',
                seconds: 'MM/yy'
            };
            break;
        case 'D':
            dateFormats = {
                years: 'yyyy',
                months: 'MM/yy',
                weeks: 'MM/yy',
                days: 'MM/dd/yy',
                hours: 'MM/dd/yy',
                minutes: 'MM/dd/yy',
                seconds: 'MM/dd/yy'
            };
            break;
    }
    return dateFormats;
}

function createChart() {
    var dateFormats = createDateFormats();
    var options = {
        seriesDefaults: {
            gap: 0.2,
            spacing: 0,
            stack: false
        },
        // dateField: 'date',
        categoryAxis: {
            maxDateGroups: _numObs, // limit the number of visible points to the set value by summarized points.
            baseUnit: 'fit', // Need to set to fit in order to use maxDateGroups
            // justified: true,
            max: _maxDate,
            crosshair: {
                visible: true
            },
            labels: {
                skip: 0,
                step: Math.ceil(_numObs / 5),
                dateFormats: dateFormats
            },
            axisCrossingValue: [0, 300000000],
            majorTicks: {
                visible: true,
                step: Math.ceil(_numObs / 5),
                skip: 0
            },
            plotBands: []
        },
        valueAxes: [{
            majorUnit: undefined,
            name: 'straight',
            labels: {
                format: _axes[0].format
            },
            visible: true,
            axisCrossingValue: -4500000000000000000,
            title: {
                text: _axes[0].label
            }
        }, {
            name: 'dashed',
            labels: {
                format: ''
            },
            title: {
                text: ''
            },
            visible: false,
            axisCrossingValue: -450000000000000000
        }],
        dataSource: _rawData,
        series: [{
            type: 'line',
            categoryField: 'date',
            field: 'value',
            markers: {
                visible: false
            }
        }],
        tooltip: {
            visible: true,
            shared: true,
            background: '#FFF',
            sharedTemplate: tooltipTemplate()
        },
        chartArea: {
            background: ''
        },
        navigator: {
            pane: {
                padding: {
                    top: 30
                },
                height: 140
            },
            series: [{
                type: 'line',
                categoryField: 'date',
                field: 'value'
            }],
            categoryAxis: {
                max: _maxDate,
                // min: _minDate,
                baseUnit: 'fit',
                justified: true,
                // categoryField: 'Date',
                majorTicks: {
                    visible: true
                },
                labels: {
                    visible: true,
                    dateFormats: {
                        years: 'yyyy',
                        months: 'MM/yy',
                        weeks: 'MM/dd/yy',
                        days: 'MM/dd/yy',
                        hours: 'MM/dd/yy',
                        minutes: 'MM/dd/yy',
                        seconds: 'MM/dd/yy'
                    }
                }
            },
            hint: {
                visible: false
            },

            valueAxes: [{
                name: 'straight',
                labels: {
                    format: ''
                },
                axisCrossingValue: -4500000000000000000,
                title: {
                    text: ''
                }
            }, {
                name: 'dashed',
                labels: {
                    format: ''
                },
                title: {
                    text: ''
                },
                visible: false,
                axisCrossingValue: -4500000000000000000
            }]
        },
        transitions: false,
        selectEnd: onSelectEnd

    };
    if (_freqLabel == 'Q') {
        options.categoryAxis.labels.template = kendo.template("#if(_freqLabel == 'Q'){##:data.value.getFullYear()#-Q#if(data.value.getMonth() <= 2){#1#}else if(data.value.getMonth() > 2 && data.value.getMonth() < 6){#2#} else if(data.value.getMonth() >= 7 && data.value.getMonth() < 10) {#3#} else {#4#}}else {}#");
        if (_maxDate.getFullYear() - _minDate.getFullYear() < 3) {
            options.navigator.categoryAxis.labels.template = kendo.template("#if(_freqLabel == 'Q'){##:data.value.getFullYear()#-Q#if(data.value.getMonth() <= 2){#1#}else if(data.value.getMonth() > 2 && data.value.getMonth() < 6){#2#} else if(data.value.getMonth() >= 7 && data.value.getMonth() < 10) {#3#} else {#4#}}else {}#");
        }

        options.navigator.categoryAxis.autoBaseUnitSteps = { "months": [3] };
        // options.navigator.categoryAxis.baseUnitStep = 4;
    } else if (_freqLabel == "D" && _numObs < 40) {
        options.navigator.categoryAxis.labels.step = 2;
    }
    $('#chart').kendoStockChart(options);
    chart = $('#chart').data('kendoStockChart');
    setColor();
    chart.refresh();
}

function onSelectEnd(e) {
    showProgressAnimation();
    startPicker.max(e.to);
    startPicker.value(e.from);
    endPicker.min(e.from);
    endPicker.value(e.to);
    adjustChart(e.from, e.to);
    chart.refresh();
    initChartNav();
    setRecession();
    hideProgressAnimation();
}

//adjust the height of the listview
function updateSections() {
    if ($('#show-series').prop('checked')) {
        $('.seriesID').css('display', 'block');
    } else {
        $('.seriesID').css('display', 'none');
    }
    var seriesH = parseInt($('#aside').css('height')) - parseInt($('#legend').css('height')) - parseInt($('.list-reader > h2').css('height')) - 25;
    $('#listView').css('height', seriesH);
}

function createSeriesList() {
    $('#listView').kendoListView({
        dataSource: _series,
        selectable: false,
        navigatable: true,
        template: kendo.template($('#listTemp').html()),
        dataBound: function() {
            this.element.find('.checkbox').on('change', addSeries);
            updateSections();
        }
    });
    $('#legendView').kendoListView({
        dataSource: _plotSeriesCollection,
        selectable: false,
        navigatable: true,
        template: kendo.template($('#legendTemp').html()),
        dataBound: function() {
            this.element.find('.nocheckbox').on('change', removeSeries);
            updateSections();
            this.element.find('.legendItem').hover(legendHover);
        }
    });
    var tabStrip = $('#tabstrip').kendoTabStrip({
        select: onSelect
    }).data('kendoTabStrip');

    tabStrip.append([{
        text: '1mo'
    }, {
        text: '3mo'
    }, {
        text: '6mo'
    }, {
        text: '1yr'
    }, {
        text: 'max'
    }]);
}
// Disable the buttons "1mo, 3mo, or 6mo" depending on the frquency of the data
function disableTabStrip() {
    var tabStrip = $('#tabstrip').data('kendoTabStrip');
    if (!navVisible) {
        tabStrip.enable(tabStrip.tabGroup.children('li:eq(3)'), false);
        tabStrip.enable(tabStrip.tabGroup.children('li:eq(2)'), false);
        tabStrip.enable(tabStrip.tabGroup.children('li:eq(1)'), false);
        tabStrip.enable(tabStrip.tabGroup.children('li:eq(0)'), false);
    } else {
        switch (_freqLabel) {
            case 'A':
                tabStrip.enable(tabStrip.tabGroup.children('li:eq(3)'), false);
                break;
            case 'Q':
            case 'M':
                tabStrip.enable(tabStrip.tabGroup.children('li:eq(0)'), false);
                break;
            default:
                break;
        }
    }
}
/**************************************************
 * Update canvas
 **************************************************/

function updateCanvas(isImage) {
    var chartWidth, chartHeight, yOffset, seriesLength;
    // length used to calculate chart height and series text offset
    seriesLength = $('.legendItem .description').length;

    // create the svg
    var svg = chart.svg();
    // scale the svg by adding viewbox, width, and height
    // add 110px for additional series;
    chartWidth = 2800; // 4x chart width
    chartHeight = 2000 + (seriesLength * 110); // 4x chart height + ...
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    svg = svg.replace('<svg ', '<svg viewBox="0 0 700 500" width="' + chartWidth + 'px" height="' + chartHeight + 'px" ');

    canvas.width = chartWidth;
    canvas.height = chartHeight;
    context.drawImage(background, (chartWidth - 500) / 2, (chartHeight - 1250) / 2, background.width * 2.5, background.height * 2.5);
    // move svg onto canvas
    canvg('canvas', svg, {
        ignoreClear: true,
        ignoreDimensions: true
    });

    // get context of canvas
    context.restore();
    context.clearRect(0, chartHeight - (seriesLength * 40) - 550, chartWidth, 550);
    context.fillStyle = '#000000';
    context.textBaseline = 'top';
    context.font = '40px sans-serif';

    var text;
    var image;

    yOffset = 20;

    // add the series text
    $('.legendItem > label').each(function() {
        // get location of arrow image
        text = $(this).find('.arrow').attr('src');
        image = $(this).find('img')[0];
        loadAndDrawImage(image, context, yOffset);

        // get the series text
        text = $(this).find('.description').text();
        // arbitrary X offset to align series text with edge of y-axis
        context.fillText(text, 160, yOffset);
        // arbitrary Y offset to space series text
        yOffset += 60;
    });

    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    // save canvas into temp canvas
    tempCanvas.getContext('2d').drawImage(canvas, 0, 0);

    // resize canvas as needed
    canvas.height = chartHeight - (seriesLength * 40) - 550;

    // draw temp canvas back into canvas, scaled as needed
    canvas.getContext('2d').drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, tempCanvas.width, tempCanvas.height);
    if (isImage) {
        context.fillStyle = '#000000';
        context.textBaseline = 'top';
        var dt = new Date();
        context.fillText('Source: Federal Reserve Board ' + dt.getFullYear().toString(), 160, canvas.height - 45);
    }
    //create the data url
    var img = canvas.toDataURL('image/png');
    // adds the data to a container so server can grab it
    document.getElementById('chartImage').value = img;
}

/**************************************************
 * Load and draws image onto canvas
 **************************************************/

function loadAndDrawImage($image, context, yOffset) {
    // draw the image
    context.drawImage($image, 140, yOffset + 5, 20, 20);
}

$('#btnImage').click(function() {
    if (fullscreen) {
        $('#btnFullscreen').click();
        $.when(fSHandler()).then(updateCanvas(true));
    } else {
        updateCanvas(true);
    }
});

$('#btnPDF').click(function() {
    if (fullscreen) {
        $('#btnFullscreen').click();
        $.when(fSHandler()).then(updateCanvas(false));
    } else {
        updateCanvas(false);
    }
});

$('.export').click(function() {
    var svgString = encodeURI(chart.svg());
    var exportFormat = $(this).data('format');
    $('#exportString').val(svgString);
    $('#exportFormat').val(exportFormat);
    $('#exportForm').submit();
});

function adjustChart(startDate, endDate) {

    if (startDate === undefined) {
        startDate = endDate;
    }
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var days = Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / (oneDay))) + 1;
    switch (_freqLabel) {
        case 'M':
            _numObs = Math.ceil(days / 30);
            break;
        case 'D':
            _numObs = days;
            break;
        case 'Q':
            _numObs = Math.ceil(days / 91.25);
            break;
        case 'A':
            _numObs = Math.ceil(days / 365);
            break;
    }
    if (_numObs > 600) {
        _numObs = 600;
    }
    chart.options.categoryAxis[0].maxDateGroups = _numObs;
    chart.options.categoryAxis[0].labels.step = Math.ceil(_numObs / 5);
    chart.options.categoryAxis[0].majorTicks.step = Math.ceil(_numObs / 5);
}

function onSelect(e) {
    //showProgressAnimation();
    var newMinDate = new Date(endPicker.value()); // maxDisplayDate
    var sSelected = $(e.item).text();
    switch (sSelected) {
        case '1mo':
            newMinDate.setMonth(newMinDate.getMonth() - 1);
            break;
        case '3mo':
            newMinDate.setMonth(newMinDate.getMonth() - 3);
            break;
        case '6mo':
            newMinDate.setMonth(newMinDate.getMonth() - 6);
            break;
        case '1yr':
            newMinDate.setMonth(newMinDate.getMonth() - 12);
            break;
        case 'max':
            newMinDate = _minDate;
            chart._navigator.options.select.from = undefined;
            chart._navigator.options.select.to = undefined;
            $('#start').val(kendo.toString(_minDate, 'd'));
            $('#end').val(kendo.toString(_maxDate, 'd'));
            break;
        default:
            break;
    }
    // if the new low date is greater than the current start date
    // we move our start date up
    // otherwise, we have hit the lowest possible dated and move the start date to that
    if (sSelected !== 'max') {
        if (newMinDate.getTime() > _minDate.getTime()) {
            $('#start').val(kendo.toString(newMinDate, 'd'));
            chart._navigator.options.select.from = newMinDate;
        } else if (newMinDate.getTime() <= _minDate.getTime()) {
            chart._navigator.options.select.from = undefined;
            if (chart._navigator.options.select.to !== '') {
                var tempDt = _minDate.getTime() - newMinDate.getTime();
                var to = new Date(chart._navigator.options.select.to.getTime() + tempDt);
                if (to < _maxDate) {
                    chart._navigator.options.select.to = to;
                } else {
                    chart._navigator.options.select.to = undefined;
                }
            }
            $('#start').val(kendo.toString(chart._navigator.options.select.from === '' ? _minDate : chart._navigator.options.select.from, 'd'));
            $('#end').val(kendo.toString(chart._navigator.options.select.to === '' ? _maxDate : chart._navigator.options.select.to, 'd'));
        }
    }
    if (chart._navigator.options.select.from === undefined) {
        adjustChart(_minDate, _maxDate);
    } else {
        adjustChart(chart._navigator.options.select.from, chart._navigator.options.select.to);
    }
    chart.refresh();
    setSeriesType();
    initChartNav();
    setRecession();
    //hideProgressAnimation();
}

function fSHandler() {
    if ((document.webkitFullscreenElement || document.mozFullScreenElement ||
            document.msFullscreenElement)) {
        $('#serieslist, #printThis, #top, #BreadCrumbContainer, .footer-wrapper, #footnote, .legend-header').css('display', 'none');
        $('#aside').css({
            height: 'auto',
            width: '100%'
        });
        $('#modifiers').css({
            'margin-left': '0',
            'text-align': 'right',
            'padding-right': '10px'
        });
        $('#legendView').unwrap();

        $('#legendView').wrap('<div id="content"></div>');

        $('#chart').css('width', '100%');
        $('#ddp').css({
            width: '100%',
            height: 'auto'
        });
        $('#main').css('height', 'auto');

        $('body').css('overflow', 'hidden');

        $('#chart > svg').css({
            width: ($(window).width() - 15),
            height: ($(window).height() - $('#legend').height() - 75)
        });
        chart.resize();
        initChartNav();
    } else {
        $('#legendView').unwrap();
        $('#legendView, .legend-header').wrapAll('<div class="legend-reader"></div>');
        //Remove all styles added to the DOM when the window went full screen
        $('#serieslist, body, #printThis, #top, #BreadCrumbContainer, .footer-wrapper, #footnote, #main, #ddp, #modifiers, #aside, .legend-header').removeAttr('style');
        //Reset the chart svg to its original size
        $('#chart > svg').css({
            width: '700px',
            height: '500px'
        });
        chart.resize();
        initChartNav();
        updateSections();
        fullscreen = false;
        $('#btnFullscreen').attr('value', 'Fullscreen');
    }
}
/**************************************************
 * Fullscreen
 **************************************************/
$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', fullscreenSetup);

$('#btnFullscreen').click(function(e) {
    e.preventDefault();
    if (!(document.webkitFullscreenElement || document.mozFullScreenElement ||
            document.msFullscreenElement)) {
        var i = document.documentElement;

        if (i.requestFullscreen) {
            i.requestFullscreen();
        } else if (i.webkitRequestFullscreen) {
            i.webkitRequestFullscreen();
        } else if (i.mozRequestFullScreen) {
            i.mozRequestFullScreen();
        } else if (i.msRequestFullscreen) {
            i.msRequestFullscreen();
        } else {
            fSHandler();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            fSHandler();
        }
    }
});

function fullscreenSetup(e) {
    // the name of the fullscreen button
    var buttonName;
    // prevent the default action of following the link
    e.preventDefault();
    if ((document.webkitFullscreenElement || document.mozFullScreenElement ||
            document.msFullscreenElement)) {

        buttonName = 'Exit Fullscreen';
        $('#btnFullscreen').attr('value', buttonName);
        if ($('#serieslist').is(':visible')) {
            fSHandler();
        }
        //Select the whole document to go fullscreen
        // go full-screen using the new HTML5 fullscreen API

    } else {
        // change button name to 'enter'
        buttonName = 'Fullscreen';

        // Exit the fullscreen mode

        if ($('#serieslist').is(':hidden')) {
            fSHandler();
        }
        // Change button name back to 'Fullscreen'
        $('#btnFullscreen').attr('value', buttonName);
    }
}

function setRecession() {

    showProgressAnimation();
    var min = chart.options.categoryAxis[0].min.getTime();
    var max = chart.options.categoryAxis[0].max.getTime();
    chart.options.categoryAxis[0].plotBands = [];
    if ($('#Recession').is(':checked')) {
        for (var i = _recessions.length - 1; i >= 0; i--) {
            if (_recessions[i].to.getTime() < max && _recessions[i].to.getTime() > min || _recessions[i].from.getTime() < max && _recessions[i].to.getTime() > min) {
                chart.options.categoryAxis[0].plotBands.push(_recessions[i]);
            }
        };

    }
    chart.refresh();
    hideProgressAnimation();
}
$('#Recession').change(setRecession);

//Perform the ajax request to get new data from the server to be graphed
function callService(item) {
    'use strict';
    $.ajax({
        //The URL to process the request
        'url': 'GetJasonData.aspx',
        //The type of request, also known as the 'method' in HTML forms
        //Can be 'GET' or 'POST'
        'type': 'GET',
        //Expected data format from server
        'dataType': 'text',
        //Any post-data/get-data parameters
        //This is optional
        'data': {
            'rel': item.releaseType,
            'id': item.dataSetID,
            'embargo': item.embargoDate,
            'tid': item.seriesTypeID,
            'from': item.startDate,
            'to': item.endDate
        },
        success: function(msg) {
            msg = msg.replace('Thread was being aborted.', '');
            try {
                var data = $.parseJSON(msg);
                //call this function from data.js
                if (typeof data === 'undefined') {
                    modal.open({
                        content: 'There is no data from the selected series.'
                    });
                } else {
                    newJsonData(data.Data);

                }
            } catch (e) {

            }
        },
        error: function(result) {
            hideProgressAnimation();
            // alert('Service call failed: ' + result.status + ' ' + result.statusText);
            modal.open({
                content: 'Request Failed.'
            });
        }
    });
}

function initChartNav() {
    var outerBgHeight, left, top;
    var navOffset = $('.k-selector').offset();

    if ($('.chart-nav-bg').length !== 0) {
        $('.chart-nav-bg').remove();
        $('.chart-nav-border').remove();
    }
    if (navOffset !== null) {
        // DATE-SECTION =========================================================
        // left align = Position of target
        left = navOffset.left;
        // top align = position of target - height of object - pseudo margins
        top = Math.ceil(navOffset.top - $('.demo-section').height() - 2);
        $('.demo-section').css({
            'left': left,
            'top': top
        });

        // TAB-SECTION ==========================================================
        // right align = position of target + width of target - width of object
        left = navOffset.left + $('.k-selector').width() - $('#tabstrip').width();
        // top align = position of target - height of object
        top = navOffset.top - $('#tabstrip').height();
        // modify properties
        $('#tabstrip').css({
            'left': left,
            'top': top
        });

        // INNER-BG ============================================================
        navOffset = $('.k-selector').position();
        $('svg').after('<div class="chart-nav-bg"></div>');
        $('.chart-nav-bg').css({
            'width': $('.k-selector').width(),
            'height': $('.k-selector').height(),
            'left': navOffset.left,
            'top': navOffset.top
        });

        // OUTER-BG ============================================================
        //navOffset = $('.demo-section').offset();
        // height of inner bg + margins for top and bottom
        outerBgHeight = $('.k-selector').height() + $('#tabstrip').height() * 2;
        $('svg').after('<div class="chart-nav-border"></div>');
        $('.chart-nav-border').css({
            //'height': $('.k-selector').height(),
            'top': navOffset.top - $('#tabstrip').height(),
            'height': outerBgHeight
        });
    }
}

$('#show-series').click(updateSections);
/**************************************************
 * Returns series line type
 **************************************************/
function getSeriesType() {
    return $('select').val() === 'column' ? 'column' : 'line';
}

/**************************************************
 * Returns series line style
 **************************************************/
function getSeriesStyle() {
    if ($('select').val() === 'step' || $('select').val() === 'smooth') {
        return $('select').val();
    }
}

/**************************************************
 * Updates chart based on select value:
 * Linear, Smooth, Step, Column
 **************************************************/
$('select').on('change', setSeriesType);

function setSeriesType() {
    showProgressAnimation();
    chart.options.series.forEach(function(series) {
        series.type = getSeriesType();
        series.style = getSeriesStyle();
    });
    if (getSeriesType() === 'column') {
        $('#btnImage').attr('disabled', 'disabled');
        $('#btnPDF').attr('disabled', 'disabled');
    } else {
        $('#btnImage').removeAttr('disabled');
        $('#btnPDF').removeAttr('disabled');
    }
    chart.refresh();
    if (!navVisible) {
        $('svg g [x=-24]').attr('x', 80);
    }
    hideProgressAnimation();
}

function setColor() {
    chart.options.series.forEach(function(series) {
        _plotSeriesCollection.forEach(function(plot) {
            if (plot.id === series.name) {
                series.color = plot.color;
                if (typeof plot.lineType !== 'undefined' && plot.lineType === 'dashed') {
                    series.dashType = 'dash';
                    if (series.categoryAxis !== '_navigator') {
                        series.axis = 'dashed';
                    }
                }
            }
        });
    });

    if (chart.options.valueAxis[1].visible) {
        chart.options.valueAxis[1].title.text = _axes[_axes.length - 1].label;
        chart.options.valueAxis[1].labels.format = _axes[_axes.length - 1].format;
    }
    if (chart.options.valueAxis[0].visible) {
        chart.options.valueAxis[0].title.text = _axes[0].label;
        chart.options.valueAxis[0].labels.format = _axes[0].format;
    }

    chart.options.categoryAxis[0].max = _maxDate;
    setRecession();
}

function legendHover(e) {
    var getHoveredElUid = $(this).attr('data-uid'),
        listView = $('#legendView').data('kendoListView'),
        ds = listView.dataSource,
        getDSItem = ds.getByUid(getHoveredElUid);
    // if (getDSItem !== null && !fullscreen) {
    var series = chart.options.series;
    series.forEach(function(item) {
        var itemOpacity = 'path[stroke=' + item.color + ']';
        if (item.name !== getDSItem.id) {
            if (e.type === 'mouseenter') {
                $(itemOpacity).css('opacity', 0.3);
                //         item.opacity = 0.3;
            } else {
                $(itemOpacity).css('opacity', 1);
                //         item.opacity = 1.0;
            }
        } else {
            $(itemOpacity).css('opacity', 1);
            //       item.opacity = 1.0;
        }
    });
    //    createChart();
    // }
}

function removeSeries(e) {
    // if (!fullscreen) {
    showProgressAnimation();
    var item = $(e.target).closest('.listItem');
    if (_plotSeriesCollection.length === 1) {
        modal.open({
            content: 'You must have at least one series on the chart.'
        });
    } else {
        var currentID = item.context.value;
        var currentObject;
        for (var i = _plotSeriesCollection.length - 1; i >= 0; i--) {
            if (_plotSeriesCollection[i].id == currentID) {
                currentObject = _plotSeriesCollection[i];
                _plotSeriesCollection.splice(i, 1);
                var unitExists = _plotSeriesCollection.some(function(element) {
                    return element.units + element.unitMult === currentObject.units + currentObject.unitMult;
                });
                if (!unitExists) {
                    if (currentObject.lineType === 'straight') {
                        _axes.splice(0, 1);
                        chart.options.valueAxis[0].visible = false;
                    } else if (currentObject.lineType === 'dashed') {
                        _axes.splice(1, 1);
                        chart.options.valueAxis[1].visible = false;
                    }
                    numUnits--;

                }
                _seriesColor.push(currentObject.color);
            }
        }
        //     var minDT = new Date();
        //     var maxDT = new Date('1900', '1', "1");
        //     var index = -1;
        //       if (_plotSeriesCollection[olditem].id === currentID) {
        //         _seriesColor.push(_plotSeriesCollection[olditem].color);
        //         index = olditem;
        //        } else {
        //         if (minDT > _plotSeriesCollection[olditem].minDate) {
        //           minDT = _plotSeriesCollection[olditem].minDate;
        //         }
        //         if (maxDT < _plotSeriesCollection[olditem].maxDate) {
        //           maxDT = _plotSeriesCollection[olditem].maxDate;
        //         }
        //       }
        //     }
        //     _minDate = minDT;
        //     _maxDate = maxDT;

        if (currentObject.sortIndex > _series.length) {
            _series.splice(_series.length, 0, currentObject);
        } else {
            if (_series.length === 0) {
                _series.push(currentObject);
            } else {
                for (var j = 0; j < _series.length; j++) {
                    if (_series[j].sortIndex > currentObject.sortIndex) {
                        _series.splice(j, 0, currentObject);
                        break;
                    }
                }
            }
        }

        $('#listView').data('kendoListView').dataSource.data(_series);
        $('#legendView').data('kendoListView').dataSource.data(_plotSeriesCollection);

        var temp = _rawData.options.data.filter(function(index) {
            if (index.id !== currentObject.id) {
                return index;
            }
        });
        _rawData.options.data.length = 0;
        temp.forEach(function(value) {
            _rawData.options.data.push(value);
        });

        _rawData.read();

        var tempMin = new Date(8640000000000000);
        var tempMax = new Date(-8640000000000000);
        _plotSeriesCollection.forEach(function(item) {
            if (tempMax.getTime() < item.maxDate) {
                tempMax = item.maxDate;
            }
            if (tempMin.getTime() > item.minDate) {
                tempMin = item.minDate;
            }
        });

        _minDate = tempMin;
        _maxDate = tempMax;
        if (startPicker.value() < _minDate) {
            startPicker.max(_maxDate);
            startPicker.min(_minDate);
            startPicker.value(_minDate);
            endPicker.min(_minDate);
            chart._navigator.options.select.from = undefined;
        }
        if (endPicker.value() < startPicker.value()) {
            startPicker.max(_maxDate);
            endPicker.max(_maxDate);
            endPicker.value(_maxDate);
            chart._navigator.options.select.to = undefined;
        }
        setColor();
        setSeriesType();
        chart.refresh();
        initChartNav();
        //adjustChart(_minDate, _maxDate);
        //     var axisArray = [];
        //     for (item in _plotSeriesCollection) {
        //       axisArray.push(_plotSeriesCollection[item].lineType);
        //     }
        //     var ar2 = arrNoDupe(axisArray);
        //     if (ar2.length < 2) {
        //       if (ar2[0] === "straight") {
        //         for (var axis in _axes) {
        //           if (_axes[axis].lineType === "dashed") {
        //             _axes.splice(axis, 1);
        //             for (var va in config.valueAxes) {
        //               if (config.valueAxes[va].name === "dashed") {
        //                 config.valueAxes[va].visible = false;
        //                 config.valueAxes[va].title.text = "";
        //               }
        //             }
        //           }
        //         }
        //       } else if (ar2[0] === "dashed") {
        //         for (var axis1 in _axes) {
        //           if (_axes[axis1].lineType === "straight") {
        //             _axes.splice(axis1, 1);
        //             for (var va1 in config.valueAxes) {
        //               if (config.valueAxes[va1].name === "straight") {
        //                 config.valueAxes[va1].visible = false;
        //                 config.valueAxes[va1].title.text = "";
        //               }
        //             }
        //           }
        //         }
        //       }
        //     }
        //     _rawData.length = 0;
        //     for (var _item in _plotSeriesCollection) {
        //       for (var _itm in _plotSeriesCollection[_item].observations) {
        //         _rawData.push({
        //           Date: _plotSeriesCollection[_item].observations[_itm].obsTime,
        //           ObsValue: _plotSeriesCollection[_item].observations[_itm].obsValue,
        //           Name: _plotSeriesCollection[_item].id,
        //           Axis: _plotSeriesCollection[_item].lineType
        //         });
        //       }
        //     }
        //     ds.options.data.length = 0;
        //     for (item in _rawData) {
        //       ds.options.data.push(_rawData[item]);
        //     }
        //     if (isLogChecked()) {
        //       toLogScale(ds.options.data);
        //     }
        //     ds.read();

        //     hideProgressAnimation();
        //   } else {
    }
    hideProgressAnimation();
    //     alert("You must have at least 1 series on the chart.");
    //   }
    //   setDatePickerMinMax(config);
    // }
    //console.log(_minDate);
    //console.log(_maxDate);
    if (!navVisible) {
        $('svg g [x=-24]').attr('x', 80);
    }
}

function addSeries(e) {
    showProgressAnimation();
    e.target.checked = false;
    var item = $(e.target).closest('.checkbox');

    if (_plotSeriesCollection.length === 6) {
        hideProgressAnimation();
        modal.open({
            content: 'You may only plot six series at a time.'
        });
    } else {
        _series.forEach(function(series) {
            if (series.id === item.context.value) {
                if (numUnits === 2 && !unitExists(series.units + series.unitMult)) {
                    hideProgressAnimation();
                    modal.open({
                        content: 'You may only plot two units at a time.'
                    });

                } else {
                    callService(series);
                }
            }
        });
    }
    //     } else if (_plotSeriesCollection.length === 6) {
    //       hideProgressAnimation();
    //       alert("You may only plot 6 series at a time.");
    //     } else {
    //       for ( i = 0; i < _plotSeriesCollection.length; i++) {
    //         // Grab dataName and seriesname for comparison
    //         dataName = _series[newitem].units + _series[newitem].unitMult;
    //         seriesName = _plotSeriesCollection[i].units + _plotSeriesCollection[i].unitMult;
    //         // Does the unitvalue for axis already exist?
    //         // if so, just stick this series on that valueaxis
    //         if (dataName === seriesName) {
    //           // Since an axis for this series already exists,
    //           // Add this series to it
    //           _series[newitem].lineType = _plotSeriesCollection[i].lineType;
    //           // This series has no data
    //           // It needs to get data from the server
    //           if (_series[newitem].observations.length === 0) {
    //             if (_series[newitem].startDate === "0001-01-01") {
    //               hideProgressAnimation();
    //               alert("There is no data from the selected series");
    //             } else
    //               callService(_series[newitem]);
    //           } else {
    //             // This series already has its data
    //             // Go ahead and plot it to chart

    //             _series[newitem].color = _seriesColor.shift();
    //             _plotSeriesCollection.push(_series[newitem]);
    //             _rawData.length = 0;
    //             startDT = new Date(_series[newitem].startDate);
    //             startDT.setDate(startDT.getDate() + 1);
    //             if (startDT < _minDate) {
    //               _minDate = startDT;
    //             }

    //             endDT = new Date(_series[newitem].endDate);
    //             endDT.setDate(endDT.getDate() + 1);
    //             if (endDT > _maxDate) {
    //               _maxDate = endDT;
    //             }
    //             _series.splice(newitem, 1);
    //             for ( _item in _plotSeriesCollection) {
    //               for (var _itm in _plotSeriesCollection[_item].observations) {
    //                 if (_plotSeriesCollection[_item].observations) {
    //                   _rawData.push({
    //                     Date: _plotSeriesCollection[_item].observations[_itm].obsTime,
    //                     ObsValue: _plotSeriesCollection[_item].observations[_itm].obsValue,
    //                     Name: _plotSeriesCollection[_item].id,
    //                     Axis: _plotSeriesCollection[_item].lineType
    //                   });
    //                 }
    //               }
    //             }
    //             $("#listView").data("kendoListView").dataSource.data(_series);
    //             $("#legendView").data("kendoListView").dataSource.data(_plotSeriesCollection);

    //             ds.options.data.length = 0;
    //             for (item in _rawData) {
    //               ds.options.data.push(_rawData[item]);
    //             }
    //             if (isLogChecked()) {
    //               toLogScale(ds.options.data);
    //             }
    //             ds.read();

    //             hideProgressAnimation();
    //           }
    //           newItem = false;
    //           break;
    //         } else if (dataName !== seriesName) {
    //           // There are no axis that exists for this series");
    //           // For every series in the _plotSeriesCollection array
    //           // Add its dataname to the unitArray to see which axis
    //           // We need to add to the chart
    //           for (var j in _plotSeriesCollection) {
    //             itemName = _plotSeriesCollection[j].units + _plotSeriesCollection[j].unitMult;
    //             unitArray.push(itemName);
    //           }
    //           newItem = true;
    //         }
    //       }
    //       if (newItem) {
    //         var unitTypesUniq = [];
    //         // Add all datanames in the unitTypesUniq array
    //         // To remove any duplicates
    //         for (var dataChartType in unitArray) {
    //           if (unitTypesUniq.indexOf(dataChartType) === -1) {
    //             unitTypesUniq.push(unitArray[dataChartType]);
    //           }
    //         }
    //         // Remove all duplicates
    //         unitTypesUniq = arrNoDupe(unitTypesUniq);
    //         // After removing duplicates, there should only be either
    //         // One or two axes in the array, dashed or straight
    //         if (unitTypesUniq.length > 1) {
    //           // If there are more than one unique axis
    //           hideProgressAnimation();
    //           alert("You may only plot two units at a time.");
    //           newItem = false;
    //         } else if (unitTypesUniq.length < 2) {
    //           // If there is less than two unique axis
    //           var axisType = {};
    //           if (_axes[0].lineType === "straight") {
    //             axisType.lineType = "dashed";
    //             axisType.label = _series[newitem].units + _series[newitem].unitMult;
    //             axisType.format = _series[newitem].units;
    //             _series[newitem].lineType = axisType.lineType;
    //             _axes.push(axisType);

    //             for (var va in config.valueAxes) {
    //               if (config.valueAxes[va].name === "dashed") {
    //                 config.valueAxes[va].visible = true;
    //                 config.valueAxes[va].title.text = axisType.label;
    //                 if (axisType.format === "USD") {
    //                   config.valueAxes[va].labels.format = "{0:n0}";
    //                 } else if (axisType.format === "Percent") {
    //                   config.valueAxes[va].labels.format = "{0}";
    //                 } else {
    //                   config.valueAxes[va].labels.format = "{0}";
    //                 }
    //               }
    //             }
    //           } else if (_axes[0].lineType === "dashed") {
    //             axisType = {};
    //             axisType.lineType = "straight";
    //             axisType.label = _series[newitem].units + _series[newitem].unitMult;
    //             axisType.format = _series[newitem].units;
    //             _series[newitem].lineType = axisType.lineType;
    //             _axes.push(axisType);

    //             for (var va1 in config.valueAxes) {
    //               if (config.valueAxes[va1].name === "straight") {
    //                 config.valueAxes[va1].visible = true;
    //                 config.valueAxes[va1].title.text = axisType.label;
    //                 if (axisType.format === "USD") {
    //                   config.valueAxes[va1].labels.format = "{0:n0}";
    //                 } else if (axisType.format === "Percent") {
    //                   config.valueAxes[va1].labels.format = "{0}";
    //                 } else {
    //                   config.valueAxes[va1].labels.format = "{0}";
    //                 }
    //               }
    //             }
    //           }

    //           // This series needs to get data from server
    //           if (_series[newitem].observations.length === 0) {
    //             if (_series[newitem].startDate === "0001-01-01") {
    //               hideProgressAnimation();
    //               alert("There is no data from the selected series");
    //             } else
    //               callService(_series[newitem]);
    //           } else {
    //             // This series already has its data
    //             _series[newitem].color = _seriesColor[0];
    //             _seriesColor.shift();
    //             _plotSeriesCollection.push(_series[newitem]);
    //             _series.splice(newitem, 1);
    //             _rawData.length = 0;
    //             tmpMin = _series[newitem].startDate.split("-");
    //             startDT = new Date(tmpMin[0], tmpMin[1] - 1);
    //             if (startDT < _minDate) {
    //               _minDate = startDT;
    //             }
    //             tmpMax = _series[newitem].endDate.split("-");
    //             endDT = new Date(tmpMax[0], tmpMax[1] - 1);
    //             if (endDT > _maxDate) {
    //               _maxDate = endDT;
    //             }
    //             for (var k in _plotSeriesCollection) {
    //               for (var l in _plotSeriesCollection[k].observations) {
    //                 _rawData.push({
    //                   Date: _plotSeriesCollection[k].observations[l].obsTime,
    //                   ObsValue: _plotSeriesCollection[k].observations[l].obsValue,
    //                   Name: _plotSeriesCollection[k].id,
    //                   Axis: _plotSeriesCollection[k].lineType
    //                 });
    //               }
    //             }
    //             $("#listView").data("kendoListView").dataSource.data(_series);
    //             $("#legendView").data("kendoListView").dataSource.data(_plotSeriesCollection);
    //             ds.options.data.length = 0;
    //             for (var m in _rawData) {
    //               ds.options.data.push(_rawData[m]);
    //             }
    //             if (isLogChecked()) {
    //               toLogScale(ds.options.data);
    //             }
    //             ds.read();

    //hideProgressAnimation();
    //           }
    //         }
    //       }
    //     }
    //     break;
    //   }
    // }
    // setDatePickerMinMax(config);

}
// Date picker
function startChange(e) {
    chart._navigator.options.select.from = e.sender._value;
    endPicker.min(e.sender._value);
    adjustChart(new Date(startPicker.value()), new Date(endPicker.value()));
    chart.refresh();
}

function endChange(e) {
    chart._navigator.options.select.to = e.sender._value;
    startPicker.max(e.sender._value);
    adjustChart(new Date(startPicker.value()), new Date(endPicker.value()));
    chart.refresh();
}
var modal = (function() {
    var method = {},
        $overlay,
        $modal,
        $content,
        $close;

    // Center the modal in the viewport
    method.center = function() {
        var top, left;

        top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
        left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

        $modal.css({
            top: top + $(window).scrollTop(),
            left: left + $(window).scrollLeft()
        });
    };

    // Open the modal
    method.open = function(settings) {
        $content.empty().append(settings.content);

        $modal.css({
            width: settings.width || 'auto',
            height: settings.height || 'auto'
        });

        method.center();
        $(window).bind('resize.modal', method.center);
        $modal.show();
        $overlay.show();
        $close.focus();
    };

    // Close the modal
    method.close = function() {
        $modal.hide();
        $overlay.hide();
        $content.empty();
        $(window).unbind('resize.modal');
    };

    // Generate the HTML and add it to the document
    $overlay = $('<div id="overlay"></div>');
    $modal = $('<div id="modal"></div>');
    $content = $('<div id="content"></div>');
    $close = $('<a id="close" href="#">close</a>');

    $modal.hide();
    $overlay.hide();
    $modal.append($content, $close);

    $(document).ready(function() {
        $('body').append($overlay, $modal);
    });

    $close.click(function(e) {
        e.preventDefault();
        method.close();
    });
    $overlay.click(function(e) {
        e.preventDefault();
        method.close();
    });
    return method;
}());

$(function() {
    'use strict';
    parseData($('#hidDataFile').val());
    createChart();
    createSeriesList();

    startPicker = $('#start').kendoDatePicker({
        change: startChange,
        min: _minDate,
        value: _minDate,
        max: _maxDate
    }).data('kendoDatePicker');

    endPicker = $('#end').kendoDatePicker({
        change: endChange,
        min: _minDate,
        max: _maxDate,
        value: _maxDate
    }).data('kendoDatePicker');
    $('#start, #end').attr('maxLength', 0);
    initChartNav();
    disableTabStrip();
    $(window).resize(fSHandler);
    hideProgressAnimation();
    if (!navVisible) {
        $('svg g [x=-24]').attr('x', 80);
    }
});
