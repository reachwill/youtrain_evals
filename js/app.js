//declare object to store data to be displayed in charts based on latest search results
var liveData = {}; //trainer led live data
var liveMidData = {}; //apprenticeship mid live data
var liveFinalData = {}; //apprenticeship final live data

var preparedDataPattern = function(label) {
    return {
        labels: [
            "Very Poor",
            "Poor",
            "Fair",
            "Good",
            "Very Good",
            "Excellent"
        ],
        datasets: [{
            label: '',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: [
                "#d33333",
                "#4eafc6",
                "#d8c5ad",
                "#758c37",
                "#9fc44e",
                "#efd90a"
            ]
        }]
    }
};

//create prepared data for each chart using this model
var preparedData = new preparedDataPattern(); //for trainer led eval summary
var preparedMidData = new preparedDataPattern(); //for apprenticeship MID eval summary
var preparedFinalData = new preparedDataPattern(); //for apprenticeship FINAL eval summary

function getAverageScore(numFields,numResults,sumOfAll){
  var max = numFields * 6;
  var maxTotalScore = max * numResults;
  return (sumOfAll +'/'+ maxTotalScore +' which as a percentage = '+((sumOfAll/maxTotalScore)*100).toFixed(2) +'%');
}


$(function() {


    //CHARTING LOGIC ***********************************************************

    $('#charting').hide();

    $('.chartLink').click(function(e) {
        e.preventDefault();
        var raw = [];

        if ($(this).hasClass('trainer')) {
            $.each(liveData[$(this).attr('rel')], function(key, value) {
                //console.log(key + ": " + value);
                raw.push(value);
            });
            preparedData.datasets[0].label = $(this).attr('rel');
            preparedData.datasets[0].data = raw;
            // console.log(liveData[$(this).attr('rel')]);
            // console.log(preparedData.datasets[0].data);
            buildChart(preparedData);
        } else if ($(this).hasClass('mid')) {
            $.each(liveMidData[$(this).attr('rel')], function(key, value) {
                //console.log(key + ": " + value);
                raw.push(value);
            });
            preparedMidData.datasets[0].label = $(this).attr('rel');
            preparedMidData.datasets[0].data = raw;
            // console.log(liveData[$(this).attr('rel')]);
            // console.log(preparedData.datasets[0].data);
            buildMidChart(preparedMidData);
        } else if ($(this).hasClass('final')) {
            $.each(liveFinalData[$(this).attr('rel')], function(key, value) {
                //console.log(key + ": " + value);
                raw.push(value);
            });
            preparedFinalData.datasets[0].label = $(this).attr('rel');
            preparedFinalData.datasets[0].data = raw;
            // console.log(liveData[$(this).attr('rel')]);
            // console.log(preparedData.datasets[0].data);
            buildFinalChart(preparedFinalData);
        }

        $(this).closest('div').find('.chartLink').each(function() {
            $(this).removeClass('selected');
        });
        $(this).addClass('selected');
    });

    function buildFinalChart(preparedFinalData) {
        $('#chartHolderFinal').html('').html('<canvas id="myFinalChart" ></canvas>');
        var ctx = document.getElementById("myFinalChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: preparedFinalData,
            responsive: true
        });
        $('#chartingFinal').fadeIn();
        $(window).scrollTop(1500); //fixes jump in window when chart being rebuilt
    }

    function buildMidChart(preparedMidData) {
        $('#chartHolderMid').html('').html('<canvas id="myMidChart" ></canvas>');
        var ctx = document.getElementById("myMidChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: preparedMidData,
            responsive: true
        });
        $('#chartingMid').fadeIn();
        $(window).scrollTop(1500); //fixes jump in window when chart being rebuilt
    }

    function buildChart(preparedData) {
        $('#chartHolder').html('').html('<canvas id="myChart" ></canvas>');
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: preparedData,
            responsive: true
        });
        $('#charting').fadeIn();
        $(window).scrollTop(1500); //fixes jump in window when chart being rebuilt
    }

    //END CHARTING LOGIC ***********************************************************



    // jQueryUI configuration **************************************************************//
    $('.datepicker').datepicker({
        dateFormat: 'yy-mm-dd'
    });
    $('.today').datepicker("setDate", new Date());

    $('.tabs').tabs({
        //activate: function(event, ui) {}
    });

    $('#evalDetailsDialog,#apprenticeDetailsDialog,#noresults').dialog({
        modal: true,
        autoOpen: false,
        title: 'Evaluation',
        width: '90%'
    });
    // END jQueryUI configuration **************************************************************//

    // START Interface navigation *************************************************************//


    $('#trainerled').fadeIn();
    $('.tabs,#urls,#searchByDelCo').hide();
    $('#trainerLink').click(function(e) {
        e.preventDefault();
        $('#trainerled').fadeIn();
        $('#apprenticeship,#urls').hide();

    });
    $('#apprenticeLink').click(function(e) {
        e.preventDefault();
        $('#trainerled,#urls').hide();
        $('#apprenticeship').fadeIn();
    });
    $('#urlsLink').click(function(e) {
        e.preventDefault();
        $('#trainerled,#apprenticeship').hide();
        $('#urls').fadeIn();
    });

    $('#displaySearchByCourse').click(function(e) {
        e.preventDefault();
        $('#searchByCourse').show()
        $('#searchByDelCo').hide();
    });
    $('#displaySearchByDelCo').click(function(e) {
        e.preventDefault();
        $('#searchByCourse').hide()
        $('#searchByDelCo').show();
    });

    // END Interface navigation *************************************************************//


    //CHOSEN SELECTOR SETTINGS **********************************************************//
    var config = {
            '.chosen-select': {},
            '.chosen-select-deselect': {
                allow_single_deselect: true
            },
            '.chosen-select-no-single': {
                disable_search_threshold: 10
            },
            '.chosen-select-no-results': {
                no_results_text: 'Oops, nothing found!'
            },
            '.chosen-select-width': {
                width: "95%"
            }
        }
        //END CHOSEN SELECTOR SETTINGS **********************************************************//

    //hide all tables by default when page loads
    $('table').hide();



    //VIEW EVAL DETAILS LOGIC*****************************************************************//
    //dynamic event handler assigned to all <a class="details"></a> links found in results tables
    $('table').on('click', '.details', function(e) {
        e.preventDefault();
        //grab the eval id
        var id = $(this).data('id');
        //grab reference to eval type eg apprenticeMid
        var evalType = $(this).closest('table').attr('id');
        // go get the eval details
        getEval(id, evalType);
    });

    // function to send AJAX request for an individual eval
    function getEval(id, evalType) {
        data = {
            id: id,
            evalType: evalType
        };
        $.ajax({
            url: 'php/getEval.php',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(data) {
                displayEval(data, evalType)
            },
            error: function(x, m, s) {
                console.log(s)
            }
        });
    }

    // function to display eval details in evalDetailsDialog
    function displayEval(data, evalType) {

        //$('#evalDetailsDialog > ul').html('');
        $.each(data[0], function(key, value) {
            $('#detail-' + key).find('span').text(unescape(value));
            //$('#evalDetailsDialog > ul').append('<li id="detail-'+key+'"><strong>'+key+': </strong><span>'+unescape(value)+'</span></li>')
        });

        var dialogId;
        switch (evalType) {
            case 'resultsByCourse':
                $.each(data[0], function(key, value) {
                    $('#detail-' + key).find('span').text(unescape(value));
                    //$('#evalDetailsDialog > ul').append('<li id="detail-'+key+'"><strong>'+key+': </strong><span>'+unescape(value)+'</span></li>')
                });

                dialogId = 'evalDetailsDialog';

                break;
            case 'resultsByAwardMid':
                $.each(data[0], function(key, value) {
                    $('#detail-app-' + key).find('span').text(unescape(value));
                    //$('#evalDetailsDialog > ul').append('<li id="detail-'+key+'"><strong>'+key+': </strong><span>'+unescape(value)+'</span></li>')
                });
                dialogId = 'apprenticeDetailsDialog';
                break;

        }

        $('#' + dialogId).dialog('open');
    }


    //END VIEW EVAL DETAILS LOGIC*****************************************************************//


    //GET TRAINER LED EVALS LOGIC*****************************************************************//
    // listen for user clicking form submit buttons
    $('#searchByDelCoBtn,#searchByCourseBtn').click(function(e) {
        e.preventDefault();
        $('#charting').hide();
        getTrainerLedEvals($(this).attr('id'))
    });

    function getTrainerLedEvals(buttClicked) {
        var searchType;
        //check which button was clicked
        switch (buttClicked) {
            case 'searchByDelCoBtn':
                searchType = 'delco';
                //configure data object for a search by delegate/company details
                var data = {
                    firstname: $('#firstname').val(),
                    lastname: $('#lastname').val(),
                    company: $('#company').val(),
                    trainer: $('#trainerInput').val(),
                    from: $('#from2').val(),
                    to: $('#to2').val(),
                    searchType: searchType
                }
                break;
            case 'searchByCourseBtn':
                searchType = 'course';
                //configure data object for a search by course details
                var data = {
                    courseId: $('#course').val(),
                    from: $('#from').val(),
                    to: $('#to').val(),
                    searchType: searchType
                }
                break;
        }

        //send the AJAX request
        $.ajax({
            url: 'php/getTrainerLedEvals.php',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(data) {
                //call function to display the results in HTML table
                switch (searchType) {
                    case 'course':
                        buildResults(data, 'resultsByCourse');
                        break;
                    case 'delco':
                        buildResults(data, 'resultsByCourse');
                        break;
                }
            },
            error: function(x, m, s) {
                console.log(m)
            }
        });
    }

    function buildResults(data, displayTable) {

        //hide table to be used
        $('#' + displayTable).hide();
        //target appropriate table based on displayTable parameter
        $('#' + displayTable + ' tbody').html('');



        //clear
        resetLiveData();

        if(data.length==0){
          $('#noresults').dialog('open');
          return;
        }

        var sumOfAll = 0;

        //loop thru results of AJAX request
        var numResults = data.length;
        for (var i = 0; i < numResults; i++) {
            var str = '<tr>';
            str += '<td>' + data[i].lastname + '</td>';
            str += '<td>' + data[i].firstname + '</td>';
            str += '<td>' + data[i].course_name + '</td>';
            var total = Number(data[i].activities) +
                Number(data[i].classroom) +
                Number(data[i].communicates) +
                Number(data[i].confirmation) +
                Number(data[i].enthusiastic) +
                Number(data[i].equipment) +
                Number(data[i].knowledgeable) +
                Number(data[i].objectives) +
                Number(data[i].organised) +
                Number(data[i].pace) +
                Number(data[i].participation) +
                Number(data[i].prepared);
            sumOfAll += total;//sent to calculate average
            str += '<td>' + total + '</td>';
            str += '<td><a href="#" class="details" data-id="' + data[i].id + '">View</a></td>';
            str += '</tr>';
            $('#' + displayTable + ' tbody').append(str);
            $('#' + displayTable).fadeIn();

            //organise data for pie Chart

            liveData.enthusiastic[data[i].enthusiastic]++;
            liveData.classroom[data[i].classroom]++;
            liveData.activities[data[i].activities]++;
            liveData.communicates[data[i].communicates]++;
            liveData.confirmation[data[i].confirmation]++;
            liveData.equipment[data[i].equipment]++;
            liveData.knowledgeable[data[i].knowledgeable]++;
            liveData.objectives[data[i].objectives]++;
            liveData.organised[data[i].organised]++;
            liveData.pace[data[i].pace]++;
            liveData.participation[data[i].participation]++;
            liveData.prepared[data[i].prepared]++;




        }
        $('#chartButtons').fadeIn();

        $('#trainerAverage').text(getAverageScore(Object.keys(liveData).length,numResults,sumOfAll));
        // $('#myChart').hide();

    }





    //END GET TRAINER LED EVALS LOGIC*****************************************************************//


    //GET COURSES FOR SELECT LOGIC **********************************************************//
    //function to extract URL params
    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    //function to get courses from DB and display in courses select menu
    function getCourses() {
        //create data object which will act as payload in AJAX request to server side code
        var data = {};
        //check if there is a URL param to act as a filter server side
        if (getParameterByName('c') != undefined) {
            //if there is a URL param called c add it to the data payload
            data.c = getParameterByName('c');
        }
        //send AJAX request to server to retrieve courses
        $.ajax({
            url: 'php/getCourses.php',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(data) {

                /*
                data model returned is an array of objects. each object is modelled like so:
                {
                  courseTypeId:NUMBER,
                  courseTypeTitle:STRING,
                  courses:ARRAY[
                    {
                      courseId:NUMBER,
                      courseTitle:STRING
                    }
                  ]
                }
                */

                //clear the course select menu of exisitng options
                $('#course').html('');
                //start adding elements to the #course select menu
                $('#course').append('<option value="">Select a course...</option>');
                //loop thru each object in the array of results of AJAX request
                var numCourseTypes = data.length;
                for (var i = 0; i < numCourseTypes; i++) {
                    //start concatenating the optgroup string
                    var optGroup = '<optgroup label="' + data[i].courseTypeTitle + '">';
                    //now loop thru each course in the objects's courses array
                    var numCourses = data[i].courses.length;
                    for (var c = 0; c < numCourses; c++) {
                        //add an option for each course
                        optGroup += '<option value="' + data[i].courses[c].courseId + '">' + data[i].courses[c].courseTitle + '</option>';
                    }
                    //complete the optgroup string
                    optGroup += '</optgroup>';
                    //add it to the select menu
                    $('#course').append(optGroup);

                }
                //add 'chosen' jquery plugin functionality to the select menu
                //$('#course').chosen(config);
                $("#course").selectmenu();
            },
            error: function(h, m, s) {
                console.log(m);
            }
        });
    }
    getCourses();

    //END GET COURSES FOR SELECT LOGIC **********************************************************//



    //GET COURSE TYPES LOGIC ********************************************************
    function getCourseTypes() {
        $.ajax({
            url: 'php/getCourseTypes.php',
            type: 'get',
            dataType: 'json',

            success: function(data) {
                $('#courseType').html(''); //clear the select menu
                var numCourseTypes = data.length;
                for (var i = 0; i < numCourseTypes; i++) {
                    var str = '<option value="' + data[i].id + '">' + data[i].course_type + '</option>'
                    $('#courseType').append(str);
                }
            },
            error: function(x, m, s) {
                console.log(s)
            }
        });
    }
    getCourseTypes();
    //END GET COURSE TYPES LOGIC ********************************************************

    //ADD NEW COURSE TYPE LOGIC *************************************************************
    $('#addCourseTypeBtn').click(function(e) {
        e.preventDefault();
        var data = {
            courseType: $('#newCourseType').val()
        }
        $.ajax({
            url: 'php/addNewCourseType.php',
            type: 'post',
            dataType: 'text',
            data: data,
            success: function(data) {
                getCourseTypes();
            },
            error: function(x, m, s) {
                console.log(s)
            }
        });
    });
    //END ADD NEW COURSE TYPE LOGIC *************************************************************

    //ADD NEW COURSE LOGIC ********************************************************
    $('#addCourseBtn').click(function(e) {
        e.preventDefault();
        var data = {
            courseTypeId: $('#courseType').val(),
            courseName: $('#courseName').val()
        }
        $.ajax({
            url: 'php/addNewCourse.php',
            type: 'post',
            dataType: 'text',
            data: data,
            success: function(data) {
                console.log(data);
            },
            error: function(x, m, s) {
                console.log(s)
            }
        });
    });
    //END ADD NEW COURSE LOGIC ********************************************************

    //GET AWARDS LOGIC ********************************************************
    function getAwards() {
        $.ajax({
            url: 'php/getAwards.php',
            type: 'get',
            dataType: 'json',

            success: function(data) {
                //start adding elements to the #course select menu
                $('#awardMid,#awardFinal').append('<option value="">Select award...</option>');
                var numAwards = data.length;
                for (var i = 0; i < numAwards; i++) {
                    var str = '<option value="' + data[i].award_id + '">' + data[i].award_title + '</option>'
                    $('#awardMid,#awardFinal').append(str);
                }
                //$('#awardMid').chosen(config);
                $("#awardMid,#awardFinal").selectmenu();
            },
            error: function(x, m, s) {
                console.log(s)
            }
        });
    }
    getAwards();
    //END GET AWARDS LOGIC ********************************************************

    //GET Apprenticeship EVALS LOGIC*****************************************************************//
    // listen for user clicking form submit buttons
    $('#searchByAwardMidBtn,#searchByAwardFinalBtn').click(function(e) {
        e.preventDefault();
        getApprenticeshipEvals($(this).attr('id'));
    });

    function getApprenticeshipEvals(buttClicked) {
        var searchType;
        var interval;
        var displayTable;
        //check which button was clicked

        switch (buttClicked) {
            case 'searchByAwardFinalBtn':
                searchType = 'award';
                interval = 'final';
                displayTable = 'resultsByAwardFinal';
                $('#chartingFinal').hide();
                //configure data object for a search by delegate/company details
                var data = {
                    awardId: $('#awardFinal').val(),
                    from: $('#fromFinal').val(),
                    to: $('#toFinal').val(),
                    searchType: searchType,
                    interval: interval
                }
                break;
            case 'searchByAwardMidBtn':
                searchType = 'award';
                interval = 'mid';
                displayTable = 'resultsByAwardMid';
                $('#chartingMid').hide();
                //configure data object for a search by course details
                var data = {
                    awardId: $('#awardMid').val(),
                    from: $('#fromMid').val(),
                    to: $('#toMid').val(),
                    searchType: searchType,
                    interval: interval
                }

                break;
        }

        //send the AJAX request
        $.ajax({
            url: 'php/getApprenticeshipEvals.php',
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(data) {
                //console.log(data)
                //call function to display the results in HTML table
                switch (searchType) {
                    case 'award':
                        buildApprenticeResults(data, displayTable, interval);
                        break;
                }
            },
            error: function(x, m, s) {
                console.log(m)
            }
        });
    }

    function buildApprenticeResults(data, displayTable, interval) {
        //console.log(data);
        //hide table to be used
        $('#' + displayTable).hide();
        //target appropriate table based on displayTable parameter
        $('#' + displayTable + ' tbody').html('');

        //clear currently stored data
        interval=='mid'?resetLiveMidData():resetLiveFinalData();

        if(data.length==0){
          $('#noresults').dialog('open');
          return;
        }

        var sumOfAll = 0;//for averaging Callback

        //loop thru results of AJAX request
        var numResults = data.length;
        for (var i = 0; i < numResults; i++) {
            var str = '<tr>';
            str += '<td>' + data[i].lastname + '</td>';
            str += '<td>' + data[i].firstname + '</td>';
            str += '<td>' + data[i].award_title + '</td>';
            var total = Number(data[i].relevance) +
                Number(data[i].content) +
                Number(data[i].format) +
                Number(data[i].duration) +
                Number(data[i].induction) +
                Number(data[i].ongoing) +
                Number(data[i].clarity) +
                Number(data[i].frequency) +
                Number(data[i].helpfulness);
            sumOfAll += total;//sent to calculate average
            str += '<td>' + total + '</td>';
            str += '<td><a href="#" class="details" data-id="' + data[i].id + '">View</a></td>';
            str += '</tr>';
            $('#' + displayTable + ' tbody').append(str);
            $('#' + displayTable).fadeIn();

            //organise data for Chart




            if (interval == 'mid') {

                //populate
                liveMidData.relevance[data[i].relevance]++;
                liveMidData.content[data[i].content]++;
                liveMidData.format[data[i].format]++;
                liveMidData.duration[data[i].duration]++;
                liveMidData.induction[data[i].induction]++;
                liveMidData.ongoing[data[i].ongoing]++;
                liveMidData.clarity[data[i].clarity]++;
                liveMidData.frequency[data[i].frequency]++;
                liveMidData.helpfulness[data[i].helpfulness]++;
                $('#chartingMid').fadeIn();
            } else if (interval == 'final') {

                //populate
                liveFinalData.relevance[data[i].relevance]++;
                liveFinalData.content[data[i].content]++;
                liveFinalData.format[data[i].format]++;
                liveFinalData.duration[data[i].duration]++;
                liveFinalData.induction[data[i].induction]++;
                liveFinalData.ongoing[data[i].ongoing]++;
                liveFinalData.clarity[data[i].clarity]++;
                liveFinalData.frequency[data[i].frequency]++;
                liveFinalData.helpfulness[data[i].helpfulness]++;
                $('#chartingFinal').fadeIn();
            }





        }

        //display average score
        interval=='mid'?$('#midAverage').text(getAverageScore(Object.keys(liveMidData).length,numResults,sumOfAll)):$('#finalAverage').text(getAverageScore(Object.keys(liveFinalData).length,numResults,sumOfAll));
        // $('#myChart').hide();

    }





    //END GET TRAINER LED EVALS LOGIC*****************************************************************//

});
