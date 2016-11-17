var currentChapter = 0;
var currentChapterSplit = 0;
var split = false;
var splitFocus = false;
var isChrome = !!window.chrome;


$('document').ready(function(){
  //Local files don't load in chrome, they disabled it :(
  //if(!isChrome){
    for (i = 1; i < 6; i++) {
      $('#chapter'+i.toString()).load("chapters/chapter" + i.toString() + ".txt");
    }
//  }
  /*else {
    $('body').hide();
    alert("This webpage will NOT work on chrome unless you have a local web server to run it on. Security Issues :(\n Confirmed working on Safari and Firefox")
  }
  console.log("These Errors are security errors since we are loading local files and browser doesn't like that");*/
  updatePagination();
});

$(".chapter-thumbnail").click(function(){
  var chapName = $(this).attr('id');
  chapName = Number(chapName.substring('chapter'.length));
  splitFocus ? currentChapterSplit = chapName : currentChapter = chapName;
  updatePagination();
});
$(".control").click(function(){
  if (!splitFocus){
    $(this).attr('id') == 'forward' ?
    (currentChapter < 5 ? currentChapter++ : currentChapter = 0) :
    (currentChapter > 0 ? currentChapter-- : currentChapter = 5);
  }
  else {
    $(this).attr('id') == 'forward' ?
    (currentChapterSplit < 5 ? currentChapterSplit++ : currentChapterSplit = 0) :
    (currentChapterSplit > 0 ? currentChapterSplit-- : currentChapterSplit = 5);
  }
  updatePagination();
});
$('.pag').click(function(){
  var id = $(this).attr('id');
  splitFocus ? currentChapterSplit = id : currentChapter = id;
  updatePagination();
});
$('#split').click(function(){
  split = !split;
  var split1 = $('#split1').attr('class'), split2 = $('#split2').attr('class');
  $('#split1').attr('class', split2);
  $('#split2').attr('class', split1);
  $('#splitViewer').html($("#chapter"+currentChapterSplit.toString()).html());
  splitDisplay();
  changeSplitFocus();
});
$('#mainViewer, #splitViewer').click(function(){
  if (split){
    $(this).attr('id')==='splitViewer' ? splitFocus = true: splitFocus = false;
    changeSplitFocus();
    updatePagination();
  }
});
function updatePagination(){
  if (!splitFocus){
    $("#mainViewer").html($("#chapter" + currentChapter.toString()).html());
    for(i = 0; i < 6; i++){
      $("#"+i.toString()).attr('class', '');
    }
    $("#"+currentChapter.toString()).addClass("active");
  }
  else {
    $("#splitViewer").html($("#chapter" + currentChapterSplit.toString()).html());
    for(i = 0; i < 6; i++){
      $("#"+i.toString()).attr('class', '');
    }
    $("#"+currentChapterSplit.toString()).addClass("active");
  }
}
function splitDisplay(){
  if (split){
    $('.colMed').attr('class', 'colMed col-md-5');
    $('#colSmall').attr('class', 'col-md-2');
    $('#hid').attr('style', 'display:block;');
  }
  else {
    $('.colMed').attr('class', 'colMed col-md-9');
    $('#colSmall').attr('class', 'col-md-3');
    $('#hid').attr('style', 'display:none');
    splitFocus = false;
  }
}
function changeSplitFocus(){
  if(splitFocus){
    $("#mainViewer").attr('style', 'outline: 0px dashed black');
    $("#splitViewer").attr('style', 'outline: 3px dashed black');
  }
  else if (!splitFocus){
    $("#mainViewer").attr('style', 'outline: 3px dashed black');
    $("#splitViewer").attr('style', 'outline: 0px dashed black');
  }
  if (!split){
    $("#mainViewer").attr('style', 'outline: 0px dashed black');
    $("#splitViewer").attr('style', 'outline: 0px dashed black');
  }
}
function updateSplitHeight(){
  if (split){
    $('#splitViewer').animate({
      'height' : $('#mainViewer').innerHeight().toString() + 'px'
    }, 0);
  }
}
