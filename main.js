var rankingNamen = [];
var rankingScores = [];

function main() {
    var DATA = PropertiesService.getScriptProperties().getProperty('sheetId');
    var data = SpreadsheetApp.openById(DATA);

    var BUFFER = data.getSheets()[0];
    var FaceRepo_META = data.getSheets()[1];
    var FaceRepo_RAW = data.getSheets()[2];

    var RAW = FaceRepo_RAW;
    var META = FaceRepo_META;

    var STARTDATUM = new Date("May 14, 2016 0:00:00");
    var progstart = new Date();
    var timezone = 'GMT';

    var date = Utilities.formatDate(progstart, timezone, 'dd-MM-yyyy');
    var row = time_dayDiff(STARTDATUM, progstart) + 1;

    var i = 1;

    while (sheet_getValue(0, i, RAW) != undefined) {
        updateRaw(RAW, META, BUFFER, row, i, date);
        i += 1;
    }

    // TODO BUBBLESORT (before updating chart legend)
    for (var j = 1; j < i; j++) {
        updateChartLegend(RAW, row, j);
    }

    sheet_setValue(row, 0, RAW, date);
    sheet_setValue(0, 1, META, Utilities.formatDate(new Date(), timezone,
        "yyyy-MM-dd' at 'HH:mm:ss' (" + timezone + ")'"));
}
