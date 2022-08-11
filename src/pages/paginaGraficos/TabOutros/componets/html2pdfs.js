
function h2p(documento, texto, nome, subsistema){ 


    function dataAtualFormatada(){
        var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length === 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length === 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
        }

    var data = dataAtualFormatada()
    //console.log(grafico)

    var grafico = document.getElementById('printThis').innerHTML

var html = `
    <div style="font-family:Arial; width:100%">
    <h1 style="margin-left:260px" >Relatório: ${documento} - NK422 </h1>
    <h3 style="margin-left:480px" >${data}</h3>
    <br></br>
    <br></br>
    <br></br>
    <h3 >Nome: ${nome}</h3>
    <h3>Subsistema: ${subsistema}</h3>
    <br></br>
    <br></br>
    <br></br>
    <h2 style="margin-left:50px;font-size:20px">1.DESCRIÇÃO</h2>
    <br></br>
    <p>${texto}</p>
    <br></br>
    <br></br>
    <h2 style="margin-left:50px;font-size:20px">2.GRÁFICOS</h2>
    
    </div>`;
    console.log(html)
    var tela_impressao = window.open('about:blank');
    tela_impressao.document.write(html);
    tela_impressao.document.write(grafico);
    tela_impressao.window.print();
    tela_impressao.window.close();
    

//pdfMake.createPdf(dd).download(documento)
}
export default h2p;
