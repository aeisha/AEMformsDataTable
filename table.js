
//datatable using JSON data on server is woking on text box and Root panel (but the empty table appears) initialization. DataTable not called when using on section at all


$(document).ready(function(){ 
try{
var tableDefinition = "<div id='#guideContainer-rootPanel-panel-guidetextbox___guide-item' class='datatableContentContainer' width='80%'><table id='jsonDataTable' class='display' width='100%'></table></div>"; 
  
    //<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
  
try {
        var dtph = $("#guideContainer-rootPanel-panel-guidetextbox___guide-item");
        dtph.replaceWith(tableDefinition);
  		console.log("%%%%%%%%%");
    } catch (e) {
        console.log("Error updating element: " + e);
    }
var urlDailyExcess = Granite.HTTP.externalize("/content/CWBFormsApp/tableData.json");

var detailsTableDailyExcess =  $('#jsonDataTable').DataTable({
          dom: "Bfrtip",
  		buttons:['test'],
  		pageLength: "50",
          ajax: {
              url: urlDailyExcess,
              type: "GET",
              async: false,
              dataSrc: ""
          },
          columns: [ 
              { title: "Institution", mData:"institution"},
              { title: "Region", mData:"region"},
              { title: "Branch", mData:"branch"},
              { title: "RGM", mData:"rgm"},
              { title: "CRM", mData:"crm"},
              {  
                mData:"ID",
        		mRender: function (ID,type) {
            		return  '<button class="btn-delete" type="button">Delete</button> <button class="btn-cancel" type="button">Cancel</button>';
        		}	
              }       
          ],
  		 
          select: true
        });
}  catch (e) {
        console.log("Error updating element%%%: " + e);
    }
  
	
//add button (yet to add functionality to take and post the data)
	var button = '<button type="button" id="guideContainer-rootPanel-panel-guidebutton___widget">Add</button>';
	var idButton =  $("#guideContainer-rootPanel-panel-guidebutton___widget");  
  	idButton.replaceWith(button);
	$("#guideContainer-rootPanel-panel-guidebutton___widget").on('click',function(){
      //debugger;
      var institutionV = [
		"CIHR", 
		"CWB", 
		"Tiger Nixon", 
		"CRA", 
		];
      detailsTableDailyExcess.row.add( {
        "institution":        	
        {
            	"render": function(){
                	 var dropdown = $('#jsonDataTable tbody tr td:nth-child(1)').append("Test");
                  		return dropdown;
                    }
        },   
        "region": "",
        "branch": "",
        "rgm": "",
        "crm": "",
        "ID":  "",
    } ).draw();
    });
  
//delete row here # is not working, itr works but only once
$('.btn-delete').on('click',function(e){
  	 debugger; 
  	 detailsTableDailyExcess    
  		.row($(this).parents('tr'))
        .remove()
        .draw(false);
    });
  
  
//cancel the edit of a row
$('.btn-cancel').on('click',function(){
  	  
      var html = $(this).html();
      var currentRow = $(this).closest("tr");
  	  var $row = currentRow;

     //debugger;
      var $tds = $row.find("td").not(':last');// this is finding all the td in the row except the last child
  	//debugger;
 	  $.each($tds, function(i, el) {
        var txt = $(this).find("textarea").val();
       //debugger;
      $(this).html(txt);
     });     	
 });
//      $row = currentRow;

  
  
//Setup - add a text input to each footer cell - this creates a box on top of the table.  tr:eq(1) th is the location of the serach box
    $('#jsonDataTable thead tr:lt(3)').clone(true).appendTo( '#jsonDataTable thead' );
   
      $('#jsonDataTable thead tr:eq(1) th').replaceWith(function(){
            return $("<td/>").append($(this).contents());
    });

//Setting up the name in the search box  
    $('#jsonDataTable thead tr:eq(1) td:lt(3)').each( function (i) {
          var title = $(this).text();
          $(this).html( '<input type="text" id="searchRow" placeholder="Search '+title+'" />' );

//Searching the boxes 
          $('#searchRow', this ).on( 'keyup change', function () {
              if (detailsTableDailyExcess.column(i).search() !== this.value ) {
                  detailsTableDailyExcess
                      .column(i)
                      .search( this.value )
                      .draw();
              }
         }); 


    });

//editing first column  
$('#jsonDataTable tbody').on('click','tr td:nth-child(1)',function () {
              var html = $(this).html();
              var currentRow = $(this).closest("tr");
              var data = $('#jsonDataTable').DataTable().row(currentRow).data();  
 
	var input = $('<textarea style="min-height:50px;width:100%">' + data.institution + '</textarea>');
                
	$(this).html(input);

       });;
  
$('#jsonDataTable tbody').on('click','tr td:nth-child(2)',function () {
              var html = $(this).html();
              var currentRow = $(this).closest("tr");
              var data = $('#jsonDataTable').DataTable().row(currentRow).data();  
 
	var input = $('<textarea style="min-height:50px;width:100%">' + data.region + '</textarea>');
                
	$(this).html(input);

       });;
  
  $('#jsonDataTable tbody').on('click','tr td:nth-child(3)',function () {
              var html = $(this).html();
              var currentRow = $(this).closest("tr");
              var data = $('#jsonDataTable').DataTable().row(currentRow).data();  
 
	var input = $('<textarea style="min-height:50px;width:100%">' + data.branch + '</textarea>');
                
	$(this).html(input);

       });;
  
  $('#jsonDataTable tbody').on('click','tr td:nth-child(4)',function () {
              var html = $(this).html();
              var currentRow = $(this).closest("tr");
              var data = $('#jsonDataTable').DataTable().row(currentRow).data();  
 
	var input = $('<textarea style="min-height:50px;width:100%">' + data.rgm + '</textarea>');
                
	$(this).html(input);

       });;
  
  $('#jsonDataTable tbody').on('click','tr td:nth-child(5)',function () {
              var html = $(this).html();
              var currentRow = $(this).closest("tr");
              var data = $('#jsonDataTable').DataTable().row(currentRow).data();  
 
	var input = $('<textarea style="min-height:50px;width:100%">' + data.crm + '</textarea>');
                
	$(this).html(input);

       });;
});    
