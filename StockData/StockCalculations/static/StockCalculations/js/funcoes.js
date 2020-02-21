var x;

var ListaOpcoes = ['Ativos','Periodo','Operacoes'];
var TiposSelecionados = ['Default1','Default2','Default3'];

function constroiOpcoes(id){
   var CaixaDeOpcoes = '<select id ="selectTipo'+id.toString()+'" class="form-control classOpcoes">';
   CaixaDeOpcoes += '<option selected disabled hidden>Choose here</option>';
   for (x in ListaOpcoes)
   {
      if(!TiposSelecionados.includes(ListaOpcoes[x]))
      {
          CaixaDeOpcoes+='<option>'+ListaOpcoes[x]+'</option>';
      }
   }
   CaixaDeOpcoes += '</select>';
   return CaixaDeOpcoes;
}

var Ativos = [];

function constroiAtivos()
{
   var CaixaDeAtivos = '<select class="form-control classAtivos">';
   for (x in Ativos){
      CaixaDeAtivos+='<option>'+Ativos[x]+'</option>';
   }
   CaixaDeAtivos += '</select>';
   return CaixaDeAtivos;
}


var Operacoes = [];


function constroiOperacoes()
{
   var CaixaDeOperacoes = '<select class="form-control classOperacoes">';
   for (x in Operacoes){
      CaixaDeOperacoes+='<option>'+Operacoes[x]+'</option>';
   }
   CaixaDeOperacoes += '</select>';
   return CaixaDeOperacoes;
}


function constroiPeriodos()
{
   var CaixaDePeriodos = '<div>' +
                            '<input class="classPeriodoInicial" type="date">' +
                            '<input class="classPeriodoFinal" type="date">' +
                         '</div>';
   return CaixaDePeriodos;
}


function constroiSelecao(opcaoSelecionada)
{
  switch(opcaoSelecionada)
  {  case '': return ('<p></p>');break;
     case "Ativos": return constroiAtivos(); break;
     case "Periodo": return constroiPeriodos(); break;
     case "Operacoes": return constroiOperacoes(); break;
  }
}


function deleteLinhas()
{
    var x = document.getElementsByClassName("classRow");
    while(x.length > 1)
    {
      rows = x.length-1;
      $(x[rows]).remove();
    }
}


function constroiOpcoesDiferentes(id)
{
  var d = document.getElementById("selectTipo"+id.toString());
  var OptionDisabled = '<option selected disabled hidden>Choose here</option>';
  $("#selectTipo"+id.toString()).append(OptionDisabled);

  for(x in ListaOpcoes)
  {
    switch(id)
    {
      case 2:
        if(ListaOpcoes[x]!=TiposSelecionados[0])
        {
          var option = document.createElement("option");
          option.text = ListaOpcoes[x];
          d.add(option);
        }
      break;
      case 3:
        if(ListaOpcoes[x]!=TiposSelecionados[0] && ListaOpcoes[x]!=TiposSelecionados[1])
        {
          var option = document.createElement("option");
          option.text = ListaOpcoes[x];
          d.add(option);
        }
        break;
    }
  }
}

var CountChanges=[0,0,0];

function constroiCaixaDeTipos1(id)
{
       $("#idColunaT"+(id).toString()).html(constroiOpcoes(id));
}

function AtualizaCaixaDeTipos(id)
{
   $("#selectTipo"+(id).toString()).empty();
   constroiOpcoesDiferentes(id);
}

var countRows = 1;
function ConstroiRecursivamente(id)
{
      constroiCaixaDeTipos1(id);
      $("#selectTipo"+(id).toString()).change(function(){
         var data = $("#selectTipo"+id.toString()).children("option").filter(":selected").text();
         CountChanges[id-1]+=1;
         TiposSelecionados[id-1] = data;
         $("#idColunaS"+id.toString()).html(constroiSelecao(data));
         if(CountChanges[id-1]>1)
         { console.log('Olar'+id.toString());
            AtualizaCaixaDeTipos(id+1);
            if(id==1)
            {
            $("#idColunaT3").empty();
            $("#idColunaS3").empty();
              CountChanges[1]=0;
              $("#idColunaS2").empty();
            }

            if(id==2){
              $("#idColunaS3").empty();
                CountChanges[2]=0;
            }
         }

         if(CountChanges[id-1]==1)
         {
            ConstroiRecursivamente(id+1);
         }

         if((id==1||id==2) && countRows>1){
           deleteLinhas();
           countRows=1;
         }

      })
}


ConstroiRecursivamente(1);

function AdicionaLinha(){
var NovaLinha = '<div class="container classRow">' +
                    '<div class = "row justify-content-md-center">'+
                       '<div class = "col-sm-4"></div>'+
                       '<div class = "col-sm-4">'+
                          '<div class="col-sm-10 classItem">'+'</div>'+
                       '</div>'+
                       '<div class = "col-sm-4">'+
                          '<div class="col-sm-10 classItem">'+'</div>'+
                       '</div>'+
                    '</div>'+
                  '</div>';
return NovaLinha;
}


function AdicionaLinhaBotao1()
{
     countRows+=1;
     $('#Inputs').append(AdicionaLinha());
     var opcao1 = $("#selectTipo2").children("option").filter(":selected").text();
     var opcao2 = $("#selectTipo3").children("option").filter(":selected").text();
     var itens = document.getElementsByClassName("classRow")[countRows-1].querySelectorAll('.classItem');
     $(itens[0]).append(constroiSelecao(opcao1));
     $(itens[1]).append(constroiSelecao(opcao2));
}


function AdicionaLinhaBotao2()
{
  countRows+=1;
  $('#Inputs').append(AdicionaLinha());
  var opcao = $("#selectTipo3").children("option").filter(":selected").text();
  var itens = document.getElementsByClassName("classRow")[countRows-1].querySelectorAll('.classItem');
  $(itens[1]).append(constroiSelecao(opcao));
}


function inputSelecionado(row,item){

  var selecao2;
  var itens = document.getElementsByClassName("classRow")[row].querySelectorAll('.classItem')

  if (!($(itens[item]).is(':empty')))
  {
      switch (TiposSelecionados[item+1]) {
        case 'Ativos': return $(itens[item].childNodes).children("option").filter(":selected").text();
          break;
         case 'Periodo':
         return [$(itens[item].childNodes).children()[0].value, $(itens[item].childNodes).children()[1].value];
         break;
         case 'Operacoes': return $(itens[item].childNodes).children("option").filter(":selected").text();
         break;
      }
  }
}

var lista = [];


function selecionadoS1(){
  var Tipo1 = TiposSelecionados[0];
  switch(Tipo1){
    case 'Ativos': return $('#idColunaS1').children()[0].value;
    break;
    case 'Periodo': return [$('#idColunaS1').children()[0].childNodes[0].value,$('#idColunaS1').children()[0].childNodes[1].value];
    break;
    case 'Operacoes': return $('#idColunaS1').children()[0].value;
    break;
  }
}




function constroiObjeto(row){
  console.log(row);
  var obj = {};
  obj[TiposSelecionados[0]] = selecionadoS1();
  var itens = document.getElementsByClassName("classRow")[row].querySelectorAll('.classItem');
  var ant = TiposSelecionados[1];
  if (!($(itens[0]).is(':empty')))
  {obj[TiposSelecionados[1]] = inputSelecionado(row,0);}
  else{
    obj[TiposSelecionados[1]] = lista[row-2][TiposSelecionados[1]];
  }

  obj[TiposSelecionados[2]] = inputSelecionado(row,1);
  return obj;
}



function constroiLista(){
lista = [];
var length = document.getElementsByClassName('classRow').length;
for(var i = 1; i < length; i++){
  var obj = constroiObjeto(i);
  lista.push(obj);
}
return lista;
}

var listaResultante = [];
function CreateBlog()
{
  var a = constroiLista();
  $.ajax({
    type : "POST",
    url : "/printaDict",
    async : true,
    dataType: 'json',
    data : {
        dict : JSON.stringify(a),

    },
     success : function(listaComResultado){
       listaResultante = JSON.parse(listaComResultado['inputsConvertidos']);
       count = JSON.parse(listaComResultado['count']);
       console.log(listaResultante);
       $('#resultado').html(constroiResultado(count));
     }
  });
}

function LoadLists()
{
  $.ajax({
    type : "POST",
    url : "/LoadLists",
    async : true,
    dataType: 'json',
    success : function(ativos){
        Ativos = JSON.parse(ativos['ativos']);
        Operacoes = JSON.parse(ativos['operacoes']);
     }
  });
}
LoadLists()


function constroiLinhaDaTabela(numeroLinha){
  var linha = '<tr> <th scope="row">'+(numeroLinha+1).toString()+'</th>';
  linha+='<td>'+listaResultante[numeroLinha]['Ativos']+'</td>';
  linha+='<td>'+listaResultante[numeroLinha]['Periodo']+'</td>';
  linha+='<td>'+listaResultante[numeroLinha]['Operacoes']+'</td>';
  linha+='<td>'+listaResultante[numeroLinha]['resultado']+'</td>';
  linha+='</tr>';
  return linha;
}

function constroiBotaoSave(){
var botao = '<div class="container">'+
             '<div class = "row justify-content-md-center botaoSubmit" id = "botaoSave">'+
               '<div class = "col-sm-4"></div>'+
               '<div class = "col-sm-4"></div>'+
              '<div class = "col-sm-4">'+
                ' <div class = "col-sm-10"></div>'+
                 '<div class = "col-sm-2">'+
                 '<input type="submit" value="Save" onclick = "Save()">'+
               '</div>'+
              '</div>'+
             '</div>'+
            '</div>';
return botao;
}


function constroiResultado(count){
var conteudo = '<table class="table tabelaResultado">'+
                '<thead>'+
                  '<tr>'+
                    '<th scope="col">#</th>'+
                    '<th scope="col">Ativo</th>'+
                    '<th scope="col">Período</th>'+
                    '<th scope="col">Operacao</th>'+
                    '<th scope="col">Resultado</th>'+
                  '</tr>'+
                 '</thead>'+
                '<tbody>';
                for(i=0; i < listaResultante.length;i++)
                {
                  conteudo+=constroiLinhaDaTabela(i);
                }
      conteudo+='</tbody>'+
              '</table>';
      conteudo+=constroiGraficos(count);
      conteudo+=constroiBotaoSave();
return conteudo;
}


function constroiGraficos(count){
  var Graficos;
  if (count > 0){
    Graficos= '<img src = "/Media/Atual/graph' + (1).toString() + '.png" style="margin-left:15%;width:750px;heigth:750px;margin-bottom:50px" class = "imagem"/>';
    for(i=2;i<=count;i++){
      Graficos+= '<img src = "/Media/Atual/graph' + i.toString() + '.png" style="margin-left:15%;width:750px;heigth:750px;margin-bottom:50px" class = "imagem"/>';
    }
    return Graficos;
  }
}



function Save()
{
  $.ajax({
    type : "POST",
    url : "/printainputAtual",
    async : true,
    dataType: 'json',
  });
}
