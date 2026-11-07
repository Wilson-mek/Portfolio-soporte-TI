(function(){
  var flows={
    pedido:{id:'OC-1042',tipo:'pedido'},
    despacho:{id:'DS-2087',tipo:'despacho'}
  };
  var reporte=[
    ['Windows','El Programador de tareas inicia el bot a la hora programada.'],
    ['Playwright','Inicia sesión en wms y descarga el inventario.'],
    ['Python','Procesa los datos y separa los pallets por cliente.'],
    ['Python','Genera un reporte en Excel por cliente.'],
    ['Telegram','Envía a cada cliente su resumen: 12 pallets, 11 conformes, 1 no conforme.','tg']
  ];
  var log=document.getElementById('log');
  var buttons=document.querySelectorAll('.demo button');
  var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var delay=calm?0:650;

  function line(src,text,cls){
    var li=document.createElement('li');
    var a=document.createElement('span');
    a.className=cls||'src';
    a.textContent=src;
    var b=document.createElement('span');
    b.textContent=text;
    li.appendChild(a);li.appendChild(b);
    log.appendChild(li);
  }

  function run(kind){
    var f=flows[kind]||flows.pedido;
    var steps=kind==='reporte'?reporte:[
      ['n8n','Correo nuevo del cliente: «Aviso de llegada, '+f.tipo+' '+f.id+'».'],
      ['n8n','Clasificación: '+f.tipo+'.'],
      ['Playwright','Abre la aplicación web del cliente.'],
      ['Python','Registra el aviso de llegada de '+f.id+'.'],
      ['Telegram','Mensaje enviado: «'+f.id+' registrado».','tg']
    ];
    log.innerHTML='';
    buttons.forEach(function(b){b.disabled=true});
    var i=0;
    (function next(){
      if(i<steps.length){
        line(steps[i][0],steps[i][1],steps[i][2]);
        i++;
        setTimeout(next,delay);
      }else{
        buttons.forEach(function(b){b.disabled=false});
      }
    })();
  }

  buttons.forEach(function(b){
    b.addEventListener('click',function(){run(b.getAttribute('data-kind'))});
  });
})();
