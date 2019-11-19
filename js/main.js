document.addEventListener('DOMContentLoaded', assignClickHandler)

function assignClickHandler () {
  document.getElementById('addRec').addEventListener('click', function () {
    const startYear = document.getElementById('startYear').value
    if (startYear < 2000) {
      window.alert('Incorrect year: ' + startYear)
      return
    }
    const fullName = document.getElementById('fullName').value
    const major = document.getElementById('major').value

    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const time = hours + ':' + minutes

    const newEntry = time + ' - ' + fullName + ', ' + major + ', ' + startYear

    const enteredRecords = document.getElementById('enteredRecords')
    let newChild = document.createElement('li')
    newChild.appendChild(document.createTextNode(newEntry))

    enteredRecords.appendChild(newChild)
    var model = {
      "fullName": $("#fullName").val(),
      "major": $("#major").val(),
      "startYear": Number($("#startYear").val())
  };
  add(model);
   
  })
}
$(function(){
  search();
})

function search() {
  $.get("http://localhost:8081/data/entries.json", {}, function (data) {
      if (data.records && data.records.length > 0) {
          var htmlStr = "";
          var date = new Date()
          var hours = date.getHours().toString().padStart(2, '0')
          var minutes = date.getMinutes().toString().padStart(2, '0')
          var time = hours + ':' + minutes
          for (var i = 0; i < data.records.length; i++) {
              var deleteStr = "<button onclick='remove(\"" + data.records[i].id +"\")'>Delete</button>"
              htmlStr = htmlStr + "<li>" + time + ' - ' + data.records[i].fullName + ", " + data.records[i].major + ", " + data.records[i].startYear + ", " + deleteStr + "</li>"
          }
          $("#enteredRecords").html(htmlStr);
      }
  });
}

function add(inputData) {
  $.post("http://localhost:8081/user", inputData,function() {
      if (data) {
          alert("Add successfully"); 
          document.getElementById('inputs').reset()
          search();
      } else {
          alert("Fail to Add");
      }
  })
}

function remove(id) {
  $.get("http://localhost:8081/user/" + id, {}, function (data) {
      if (data) {
          alert("Delete Successfully");
      } else {
          alert("Fail to Delete");
      }
  })
}


