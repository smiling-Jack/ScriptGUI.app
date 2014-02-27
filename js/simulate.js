/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */


function stopsim () {
    for(i=0; i<100; i++)
    {

        window.clearTimeout(i);
        $.each( $("#sim_output").children(), function(){
            $(this).remove();
        })

    }

    $.each(SGI.plumb_inst, function(){

        var con = this.getConnections();

        $.each(con, function(){
            var $con = this
            var over = this.getOverlays();
            $.each(over,function(){

                $con.removeOverlay("sim")
            });

        });


    });
}


function simulate(callback) {
    var datapoints = {};


    function getState(id) {

        return homematic.uiState["_" + id]["Value"]
    }

    function log(data) {
        var t = new Date();
        $("#sim_output").prepend("<tr><td style='width: 100px'>"+t.getHours()+":"+ t.getMinutes()+":"+ t.getSeconds()+":"+ t.getMilliseconds()+"</td><td>" +data+"</td></tr>");

    }

    function simout(key, data) {
        var output = key.split("_");
        var fbs = output[0] + "_" + output[1];
        var codebox = $("#" + PRG.fbs[fbs]["parent"]).parent().attr("id");
        var cons = SGI.plumb_inst["inst_" + codebox].getConnections({source:key}) ;

        var err_text ="";

        if (cons.length <1){
     cons = SGI.plumb_inst.inst_mbs.getConnections({source:key})
        }

        cons[0].addOverlay(
            ["Custom", {
                create: function () {
                    return $('<div>\
                    <p class="sim_overlay ui-corner-all">'+data+'</p>\
                    </div>\
                                            ');
                },
               id: "sim"
            }]
            );


    }

    try{
        var script = Compiler.make_prg(true);
    }
    catch (err){

        if (err == "TypeError: this.output[0] is undefined"){
           err_text = " <b style='color: red'>Error:</b> Offene ausgänge gefunden"
        }else{
            err_text = err
        }


        var t = new Date();
        $("#sim_output").prepend("<tr><td  style='width: 100px'>"+t.getHours()+":"+ t.getMinutes()+":"+ t.getSeconds()+":"+ t.getMilliseconds()+"</td><td>" +err_text+"</td></tr>");
    }



// console.log(script);
    try{
    eval(script)
    }
    catch (err){
        console.log(err)
        $("#sim_output").val(t.getHours()+":"+ t.getMinutes()+":"+ t.getSeconds()+":"+ t.getMilliseconds()+" " +err+"\n" +$("#sim_output").val()).trigger('autosize.resize');
    }


    return callback
}

