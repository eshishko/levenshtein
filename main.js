$( document ).ready(function() {
$('#string1').keyup(function() { //or on change?
  draw();
});

$('#string2').keyup(function() {// or on change?
  draw();
});

function draw() {
  clearTable();
  var string1Input = $('#string1').val();
  var string2Input = $('#string2').val();
  var lev = levenshtein(string1Input, string2Input);

  if (lev > 3) {
    printLevResult(lev);
    showTable();
  } else {
    hideTableAndResult();
  }
}

function clearTable() {
  $("#table tr").remove();
}

function showTable() {
  $('table').show();
}

function printLevResult(result) {
  $('#result-txt').show().html('Levenshtein Distance: ' + result);
}

function hideTableAndResult() {
  $('#result-txt').hide();
  $('table').hide();
}

function levenshtein(a, b) {
  if(a.length === 0) {
    return b.length;
  }
  if(b.length === 0) {
    return a.length;
  }

  var matrix = [];
  var tr = document.createElement('tr');
  var thead = $('#table thead').append($(tr).append('<td></td>').append('<td>i  &darr;</td>'));
  var trJ = document.createElement('tr');
  trJ.setAttribute('id', 'j-0');
  var tbody = $('#table tbody');
  tbody.append($(trJ).append('<td>j &rarr; </td>'));

  var i;
  for (i = 0; i <= b.length; i++) {
    if (i != b.length) {
      var showI = i + 1;
      $(tr).append('<td>' + b[i] + '</td>');
    }
    matrix[i] = [i];
  }
  
  var j;
  for (j = 0; j <= a.length; j++) {
    if (j != a.length) {
      var tr = document.createElement('tr');
      var id = j + 1;
      tr.setAttribute('id', 'j-' + id);
      $(tr).append('<td>' + a[j]  + '</td>');
      tbody.append(tr);
    }
    matrix[0][j] = j;
  }

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) == a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min( // substitution
            matrix[i-1][j-1] + 1, 
              Math.min(
                matrix[i][j-1] + 1, // insertion
                matrix[i-1][j] + 1 // deletion
              )
            ); 
        }
    }
  }
  console.log(matrix);
  printMatrix(matrix);

  return matrix[b.length][a.length];
}

function printMatrix(matrix) {
  var i, iLen;
  for (i = 0, iLen = matrix.length; i < iLen; i++) {
    var j, jLen;
    for (j = 0, jLen = matrix[i].length; j < jLen; j++) {
      var id = 'tr#j-' + j;
      $(id).append('<td>' + matrix[i][j] + '</td>');
    }
  }
}
});