// see https://sashat.me/2017/01/11/list-of-20-simple-distinct-colors/
let colors= [
    "#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
    "#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
    "#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
    "#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
    "#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
    "#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
    "#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
    "#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
    "#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
    "#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf",
    "#f158bf", "#e145ba", "#ee91e3", "#05d371", "#5426e0", "#4834d0", "#802234",
    "#6749e8", "#0971f0", "#8fb413", "#b2b4f0", "#c3c89d", "#c9a941", "#41d158",
    "#fb21a3", "#51aed9", "#5bb32d", "#807fb", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#21538e", "#89d534", "#d36647",
    "#7fb411", "#0023b8", "#3b8c2a", "#986b53", "#f50422", "#983f7a", "#ea24a3",
    "#79352c", "#521250", "#c79ed2", "#d6dd92", "#e33e52", "#b2be57", "#fa06ec",
    "#1bb699", "#6b2e5f", "#64820f", "#1c271", "#9cb64a", "#996c48", "#9ab9b7",
    "#06e052", "#e3a481", "#0eb621", "#fc458e", "#b2db15", "#aa226d", "#792ed8",
    "#73872a", "#520d3a", "#cefcb8", "#a5b3d9", "#7d1d85", "#c4fd57", "#f1ae16",
    "#8fe22a", "#ef6e3c", "#243eeb", "#1dc18", "#dd93fd", "#3f8473", "#e7dbce",
    "#421f79", "#7a3d93", "#635f6d", "#93f2d7", "#9b5c2a", "#15b9ee", "#0f5997",
    "#409188", "#911e20", "#1350ce", "#10e5b1", "#fff4d7", "#cb2582", "#ce00be",
    "#32d5d6", "#17232", "#608572", "#c79bc2", "#00f87c", "#77772a", "#6995ba",
    "#fc6b57", "#f07815", "#8fd883", "#060e27", "#96e591", "#21d52e", "#d00043",
    "#b47162", "#1ec227", "#4f0f6f", "#1d1d58", "#947002", "#bde052", "#e08c56",
    "#28fcfd", "#bb09b", "#36486a", "#d02e29", "#1ae6db", "#3e464c", "#a84a8f",
    "#911e7e", "#3f16d9", "#0f525f", "#ac7c0a", "#b4c086", "#c9d730", "#30cc49",
    "#3d6751", "#fb4c03", "#640fc1", "#62c03e", "#d3493a", "#88aa0b", "#406df9",
    "#615af0", "#4be47", "#2a3434", "#4a543f", "#79bca0", "#a8b8d4", "#00efd4",
    "#7ad236", "#7260d8", "#1deaa7", "#06f43a", "#823c59", "#e3d94c", "#dc1c06",
    "#f53b2a", "#b46238", "#2dfff6", "#a82b89", "#1a8011", "#436a9f", "#1a806a",
    "#4cf09d", "#c188a2", "#67eb4b", "#b308d3", "#fc7e41", "#af3101", "#ff065",
    "#71b1f4", "#a2f8a5", "#e23dd0", "#d3486d", "#00f7f9", "#474893", "#3cec35",
    "#1c65cb", "#5d1d0c", "#2d7d2a", "#ff3420", "#5cdd87", "#a259a4", "#e4ac44",
    "#1bede6", "#8798a4", "#d7790f", "#b2c24f", "#de73c2", "#d70a9c", "#25b67",
    "#88e9b8", "#c2b0e2", "#86e98f", "#ae90e2", "#1a806b", "#436a9e", "#0ec0ff",
    "#f812b3", "#b17fc9", "#8d6c2f", "#d3277a", "#2ca1ae", "#9685eb", "#8a96c6",
    "#dba2e6", "#76fc1b", "#608fa4", "#20f6ba", "#07d7f6", "#dce77a", "#77ecca"]

let nodeChartLines = [];
let allLogLines = [];

$("#files").on("change", loadFiles);

function loadFiles() {
    $("#files").addClass("hidden");
    let filesval = $("#files").val();

    let files = $("#files")[0].files;
    $(".duration").text("Loading " + files.length + " files...");
    doAsyncParse(files, 0);
}

function doAsyncParse(files, fileIndex) {
    $(".duration").text("Parsing log file " + fileIndex + " of " + files.length + "...");
    let reader = new FileReader();
    reader.onload = function(e) {
        parseLogFile(e.target.result, fileIndex, files.length);
        if (fileIndex < files.length-1) {
            setTimeout(function() {
                doAsyncParse(files, fileIndex+1);
            }, 50);
        }
        let isLastLog = fileIndex == files.length-1;
        if (isLastLog) {
            displayEverything();
        }
    };
    reader.readAsText(files[fileIndex]);
}

function displayEverything() {
    $(".duration").text("Rendering display...");
    setTimeout(function() {
        $(".duration").text("Rendering display... sorting node order");
        setTimeout(function() {
            sortnodeOrder()
            $(".duration").text("Rendering display... creating log line elements");
            setTimeout(function() {
                createAllLogLines();
                $(".duration").text("Rendering display... sorting all log lines");
                setTimeout(function() {
                    sortAllLogLines();
                    $(".duration").text("Rendering display... rendering visual elements");
                    setTimeout(function() {
      
                        drawLines();
                        drawChart();
                          
                        bindDisplayFilters();
                    }, 50);
                }, 50);
            }, 50);
        }, 50);
    }, 50);
}

function parseLogFile(content, fileIndex, totalFiles) {

    // chart line for this node
    nodeIndex = nodeChartLines.length;
    lines = content.split("\n");
    let nodeChartLine = {};
    nodeChartLine.showLine = false;
    nodeChartLine.order = 2;
    nodeChartLine.data = [];

    let nodeSocket = "";

    let filterText = $("#filter-text").val();
    let logsSince = $("#logs-since").val();
    
    let limit_logs = logsSince != "";
    
    let networkEventFilter = new RegExp(".*");
    if (filterText != "") {
        try {
            networkEventFilter = new RegExp(filterText);
        }
        catch(e) {
            $("#lines").text(e);
            return;
        }
    }
    
    // parse lines
    for (let lineIndex=0; lineIndex<lines.length; lineIndex++) {
        let line = lines[lineIndex];
        let split = line.split(" ");
        let date = line.split(" ")[2];
        let logLevel = split[1];
        
        if (line.includes("Node connection info:") ){
            nodeSocket = split[split.length - 1 ].replaceAll('"', '');
        }
        
        let srcLine = split[3];
        
        // remove first parts of text
        split.shift();
        split.shift();
        split.shift();
        split.shift();
        let actual_text = split.join(" ");
        
        let time = Math.floor(new Date(date).getTime() / 1000);
        if (isNaN(time)) {
            continue
        }
        if (!("firstTime" in nodeChartLine)) {
            nodeChartLine["firstTime"] = time
        }
        let displayedLineIndex = nodeChartLine.data.length;
        let subseconds = date.split(".")[1].split(/[+-]/)[0];
        time = time + parseFloat("0." + subseconds);
        
        let showLine = true;
        if (filterText != "" && !line.match(networkEventFilter)){
            showLine = false;
        }
    
        if (limit_logs) {
            let limit = new Date(); 

            let [hours, minutes, seconds] = logsSince.split(':'); // Using ES6 destructuring

            // Set the hours, using implicit type coercion
            limit.setHours(+hours); 
            // You can pass Number or String. It doesn't really matter
            limit.setMinutes(minutes); 
            limit.setSeconds(seconds);

            let theLimit = Math.floor(new Date(limit).getTime() / 1000);

            if ( time < theLimit && showLine ) {
                showLine = false
            }
        }
        
        // chart point
        if (showLine) {
            nodeChartLine.data.push({
                x: time,
                // y is set after nodes are sorted
                text: actual_text,
                lineIndex: displayedLineIndex,
                date: date,
                showLine,
                nodeSocket,
                srcLine,
                logLevel
            });
        }
    }

    nodeChartLines.push(nodeChartLine);

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// this func sourced here: https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

let hasBoundFilters = false;
function bindDisplayFilters () {
    if (hasBoundFilters) {
        return;
    }
    function reParseData () {
        console.info("Reparse of data triggered.")
        nodeChartLines = [];
        allLogLines = [];
        window.chart=null;

        $("#lines").empty();
        $("#chart").empty();
        $("#chart").append('<canvas id="canvas"></canvas>')
        window.chart = null;
        loadFiles()

    };

    $("#invert-logs").change(reParseData);

    $("#filter-text").on('input',debounce( function(e) {
        console.log("debounced filter");
        reParseData()
    }, 250));
    $("#logs-since").on('input',debounce( function(e) {
        console.log("debounced filter");
        reParseData()
    }, 250));
    $("#format-text").on('input',debounce( function(e) {
        console.log("debounced format");
        reParseData()
    }, 250));
    hasBoundFilters = true;
}

function createAllLogLines() {
    for (let i=0; i<nodeChartLines.length; i++) {
        for (let j=0; j<nodeChartLines[i].data.length; j++) {
            let p = nodeChartLines[i].data[j];

            if( p.showLine ){

                // create log line
                allLogLines.push({
                    time: p.x,
                    text: p.text,
                    nodeIndex: i,
                    lineIndex: p.lineIndex,
                    logLevel: p.logLevel,
                    srcLine: p.srcLine,
                    nodeSocket: p.nodeSocket,
                    date: p.date,

                });

            }
            delete p.text;
        }
    }
}

function sortnodeOrder() {
    nodeChartLines.sort(function(a,b) {
        let invert = $("#invert-logs").is(':checked');

        return invert ? b.firstTime - a.firstTime : a.firstTime - b.firstTime;

        
    });
    // update node lines with their new index
    for (let nodeIndex=0; nodeIndex<nodeChartLines.length; nodeIndex++) {
        nodeChartLines[nodeIndex].pointBackgroundColor = colors[nodeIndex];
        nodeChartLines[nodeIndex].pointBorderColor = colors[nodeIndex];
        for (let j=0; j<nodeChartLines[nodeIndex].data.length; j++) {
            nodeChartLines[nodeIndex].data[j].y = -1 * nodeIndex;
        }
    }
}

function sortAllLogLines() {
    allLogLines.sort(function(a,b) {
        let invert = $("#invert-logs").is(':checked');

        return invert ? b.firstTime - a.firstTime : a.firstTime - b.firstTime;

    });
}

let linesEl = $("#lines");
function drawLines() {

    let lineTemplate = $("#format-text").val();
    for (let i=0; i<allLogLines.length; i++) {
        let line = allLogLines[i];
        // Add metadata to the chart points so hovering will allow the aggregated log
        // to be scrolled to that line.
        let nodeIndex = line.nodeIndex;
        let lineIndex = line.lineIndex;
        if ( nodeChartLines[nodeIndex].data[lineIndex] !== undefined )
        {

            nodeChartLines[nodeIndex].data[lineIndex].allLogLinesIndex = i;
        }
        else{ 
            console.log("THIS ONE broken us ", nodeChartLines[nodeIndex].data);
            console.log("index was", lineIndex);
        }
        // Display line
        let el = $($("#line-template").html());

        let socket = line.nodeSocket.length > 0 ? `[${line.nodeSocket}]` : '';
        let level = `${line.logLevel}`;
        let time = `${line.date}`;
        let src = `${line.srcLine}`;
        let text = `${line.text}`;
        let name = `<strong>NODE#${nodeIndex}</strong> `;
        let fullLine = eval("`" + lineTemplate + "`"); // don't hurt yourself
        el.find(".text").html(fullLine);
        el.css("background-color", colors[nodeIndex]);
        el.data("lineIndex", i);
        // calculate timings
        if (i > 0) {
            let beforetime = line.time - allLogLines[i-1].time;
            el.find(".beforetime").html(beforetime.toFixed(6) + " seconds");
            if (beforetime > 1) {
                // add longtime indicator to the previous log line
                let lt = document.createElement("div");
                lt.textContent = beforetime + " seconds";
                lt.classList.add("longtime");
                linesEl.children().last().append(lt);
            }
        }
        // events
        el.on("mouseenter", function() {
            showVertLineOnChart(el.data("lineIndex"))
        });
        linesEl.append(el);
    }
}

function showVertLineOnChart(lineIndex) {
    // show line on chart
    let line = allLogLines[lineIndex];
    if (chart && chart.drawPositionLine) {
        let point = nodeChartLines[line.nodeIndex].data[line.lineIndex];
        chart.drawPositionLine(point.x);
    }
}

function scrollLogToTime(t) {
    // find index for this time
    // could change this to binary search
    // but this way takes 100ms for 120K log lines
    // so is fine for now
    let lineIndex = 1;
    for (lineIndex; lineIndex < allLogLines.length; lineIndex++) {
        let thisTime = allLogLines[lineIndex].time;
        let prevTime = allLogLines[lineIndex-1].time;
        if (thisTime > t && prevTime <= t) {
            lineIndex = lineIndex - 1;
            break;
        }
    }
    linesEl.find(":nth-child(" + lineIndex + ")").get(0).scrollIntoView();
}
