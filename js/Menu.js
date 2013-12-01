/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */


jQuery.extend(true, SGI, {

    menu_iconbar: function () {
        console.log("Start_Menue-Iconbar");

        $("#img_iconbar").tooltip();

        $("#menu").menu({position: {at: "left bottom"}});
        $("#m_neu").click(function () {
            SGI.clear();
        });
        $("#m_save").click(function () {
            if ($("body").find(".ui-dialog").length == 0) {
                SGI.save_ccu_io();
            }
        });
        $("#m_save_as").click(function () {
            if ($("body").find(".ui-dialog").length == 0) {
                SGI.save_as_ccu_io();
            }
        });
        $("#m_open").click(function () {
            if ($("body").find(".ui-dialog").length == 0) {
                SGI.open_ccu_io();
            }
        });

        $("#ul_theme li a").click(function () {
            $("#theme_css").remove();
            $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + $(this).data('info') + '/jquery-ui-1.10.3.custom.min.css"/>');

            //resize Event auslössen um Slider zu aktualisieren
            var evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);

            storage.set(SGI.str_theme, ($(this).data('info')))
            theme = $(this).data('info');
            SGI.scrollbar_h("", $(".scroll-pane"), $(".scroll-content"), $("#scroll_bar_h"));
            SGI.scrollbar_v("", $(".scroll-pane"), $(".scroll-content"), $("#scroll_bar_v"));
            SGI.scrollbar_v("", $("#toolbox_body"), $(".toolbox"), $("#scroll_bar_toolbox"));
        });


        $("#clear_cache").click(function () {
            storage.set(SGI.str_theme, null);
            storage.set(SGI.str_settings, null);
            storage.set(SGI.str_prog, null);
        });

        $("#m_make_struck").click(function () {
            SGI.make_struc()
        });
        $("#m_show_script").click(function () {

            var script = Compiler.make_prg();
            alert(script);
        });
        $("#m_save_script").click(function () {
            SGI.save_Script();
        });

        $("#log_prg").click(function () {
            console.log(PRG);
        });
        $("#log_info").click(function () {
            console.log("Zoom = " + SGI.zoom);
            console.log("fbs_n = " + SGI.fbs_n);
            console.log("mbs_n = " + SGI.mbs_n);
        });

        // Icon Bar XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        // Local
        $("#img_save_local").click(function () {
          SGI.make_savedata();

            storage.set(SGI.str_prog, PRG.valueOf());
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_open_local").click(function () {
            var data = storage.get(SGI.str_prog);

            SGI.clear();
            SGI.load_prg(data)

            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        // Ordnen
        $("#img_set_left").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {

                function SortByName(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().left;

                $.each(items, function () {
                    $(this).css("left", position);
                });

                SGI.inst_fbs.repaintEverything();
            }
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_right").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().left;

                $.each(items, function () {
                    $(this).css("left", position);
                });
                SGI.inst_fbs.repaintEverything();
            }
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_top").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().top ;

                $.each(items, function () {
                    $(this).css("top", position);
                });
                SGI.inst_fbs.repaintEverything();
            }
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_bottom").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().top ;

                $.each(items, function () {
                    $(this).css("top", position);
                });
                SGI.inst_fbs.repaintEverything();
            }
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_steps").click(function () {
            var items = $(".fbs_selected");
            if (items.length > 1) {
                function SortByTop(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                function SortByLeft(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                var top_list = items.sort(SortByTop);
                var left_list = items.sort(SortByLeft);
                var left = $(left_list[0]).position().left;
                var top = $(top_list[0]).position().top;

                var step = 0;


                $.each(items, function () {
                    $(this).css("left", left + step);
                    $(this).css("top", top + step);

                    top = top + parseInt($(this).css("height").split("px")[0]) + 2;


                    step = step + 30;
                });
                SGI.inst_fbs.repaintEverything(); // TODO Nicht alles
            }
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        // Scale
        $("#img_set_zoom").click(function () {
            SGI.zoom = 1;
            jsPlumb.setZoom(SGI.zoom);

            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_zoom_in").click(function () {
            SGI.zoom = SGI.zoom + 0.1;
            jsPlumb.setZoom(SGI.zoom);

            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_zoom_out").click(function () {
            SGI.zoom = SGI.zoom - 0.1;
            jsPlumb.setZoom(SGI.zoom);

            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });
            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_script_engine").click(function () {
            try {
                SGI.socket.emit("reloadScriptEngine");
            } catch (err) {
                alert("Keine Verbindung zu CCU.IO");
            }


            $(this).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#prg_panel").on("click", ".btn_min_trigger", function () {
            $($(this).parent().parent()).find(".div_hmid_trigger").toggle({
                progress: function(){SGI.inst_mbs.repaintEverything();}
            });

            $(this).effect("highlight");

        });

        console.log("Finish_Menue-Iconbar");
    },

    context_menu: function () {
        console.log("Start_Context_Menu");

        $(document).on('mouseenter', ".context-menu-item", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".context-menu-item", function () {
            $(this).toggleClass("ui-state-focus")

        });

        $(document).on('mouseenter', ".div_hmid_font", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".div_hmid_font", function () {
            $(this).toggleClass("ui-state-focus")

        });

// Body zum debuggen auskommentieren  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $.contextMenu({
            selector: 'body',
            items: {
                "body": {
                    name: "body"
                }
            }
        });
        $("body").contextMenu(false);

        // Codebox  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: '.titel_codebox',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: "Entfernen",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_codebox(opt)
                    }
                }
            }
        });

        // FBS_Element   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: '.fbs_element_varinput',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Eingang Hinzufügen",
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.add_input(opt)
                    }
                },
                "Del": {
                    name: "Entfernen",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });


        $.contextMenu({
            selector: '.fbs_element_simpel',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: "Entfernen",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });


        // Trigger   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: ".mbs_element_trigger",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Add ID",
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.add_trigger_hmid(opt.$trigger)
                    }
                },
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".div_hmid_font",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "Add ID",
                    className: "item_font ",
                    callback: function (key, opt) {
//                        SGI.add_trigger_hmid(opt.$trigger)  ToDo opt.$trigger referens auf parent anpassen
                    }
                },
                "Del_id": {
                    name: "Entferne ID",
                    className: "item_font",
                    callback: function (key, opt) {

                        SGI.del_trigger_hmid(opt)
                    }
                },
                "Del_elm": {
                    name: "Entferne Element",
                    className: "item_font",
                    callback: function (key, opt) {
//                        SGI.del_fbs(opt)                  ToDo opt referens auf parent anpassen
                    }
                }
            }
        });

// I/O´s   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: '.fbs_element_io',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: "ID Auswahl",
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.change_id(opt)
                    }
                },
                "Del": {
                    name: "Entfernen",
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });

    },

    del_fbs: function (opt) {
        var children = $(opt).attr("$trigger").find("div");
        $.each(children, function () {
            var ep =   SGI.inst_fbs.getEndpoints($(this).attr("id"));

           SGI.inst_fbs.detachAllConnections(this);

            if (ep != undefined) {
                SGI.inst_fbs.deleteEndpoint($(ep).attr("elementId"));
            }
        });
        $($(opt).attr("$trigger")).remove();
        delete PRG.fbs[$(opt).attr("$trigger").attr("id")];
    },

    del_mbs: function (opt) {
        var children = $(opt).attr("$trigger").find("div");
        $.each(children, function () {
            var ep = jsPlumb.getEndpoints($(this).attr("id"));

            jsPlumb.detachAllConnections(this);

            if (ep != undefined) {
                jsPlumb.deleteEndpoint($(ep).attr("elementId"));
            }
        });
        $($(opt).attr("$trigger")).remove();
        delete PRG.mbs[$(opt).attr("$trigger").attr("id")];
    },

    del_codebox: function (opt) {

      var  $this = $(opt).attr("$trigger");

        console.log($this.parent());

        var children = $($this.parent()).find("div");
        $.each(children, function () {
            var ep = jsPlumb.getEndpoints($(this).attr("id"));

            jsPlumb.detachAllConnections(this);

            if (ep != undefined) {
                jsPlumb.deleteEndpoint($(ep).attr("elementId"));
            }

            delete PRG.fbs[$(this).attr("id")];
        });
        $($this.parent()).remove();
        delete PRG.mbs[$($this.parent()).attr("id")];
    },

    change_id: function (opt) {
        hmSelect.show(homematic, this.jControl, function (obj, value) {

            PRG.fbs[$(opt.$trigger).attr("id")]["hmid"] = value;

            if (homematic.regaObjects[value]["TypeName"] == "VARDP") {

                $(opt.$trigger).find(".div_hmid").text(homematic.regaObjects[value]["Name"]);
                PRG.fbs[$(opt.$trigger).attr("id")]["name"] = homematic.regaObjects[value]["Name"];
            } else {
                var parent = homematic.regaObjects[value]["Parent"];
                var parent_data = homematic.regaObjects[parent];
                $(opt.$trigger).find(".div_hmid").text(parent_data.Name + "_" + homematic.regaObjects[value]["Type"]);
                PRG.fbs[$(opt.$trigger).attr("id")]["name"] = _name = parent_data.Name + "__" + homematic.regaObjects[value]["Type"];
            }

            jsPlumb.repaintEverything();

        });
    },

    del_trigger_hmid: function (opt) {
        var parrent = $(opt.$trigger).data("info");
        var name = $(opt.$trigger).text();
        var index = $.inArray(name, PRG.mbs[parrent]["name"]);

        PRG.mbs[parrent]["name"].splice(index, 1);
        PRG.mbs[parrent]["hmid"].splice(index, 1);

        $(opt.$trigger).remove();
        SGI.inst_mbs.repaintEverything()
    },

    save_as_ccu_io: function () {

        try {
            SGI.socket.emit("readdirStat", SGI.prg_store, function (data) {
                var files = [];
                var sel_file = "";

                $("body").append('\
                   <div id="dialog_save" style="text-align: center" title="Speichern als">\
                   <br>\
                       <table id="grid_save"></table>\
                        <br>\
                       <input  id="txt_save" type="text" /><br><br>\
                       <button id="btn_save_ok" >Speichern</button>\
                       <button id="btn_save_del" >Löschen</button>\
                       <button id="btn_save_abbrechen" >Abbrechen</button>\
                   </div>');

                $("#dialog_save").dialog({
                    height: 500,
                    width: 520,
                    resizable: false,
                    close: function () {
                        $("#dialog_save").remove();
                    }
                });

                if (data != undefined) {
                    $.each(data, function () {

                        var file = {
                            name: this["file"].split(".")[0],
                            typ: this["file"].split(".")[1],
                            date: this["stats"]["mtime"].split("T")[0],
                            size: this["stats"]["size"]
                        };
                        files.push(file);

                    });
                }
                    $("#grid_save").jqGrid({
                        datatype: "local",
                        width: 495,
                        height: 280,
                        data: files,
                        forceFit: true,
                        multiselect: false,
                        gridview: false,
                        shrinkToFit: false,
                        scroll: false,
                        colNames: ['Datei', 'Größe', 'Typ', "Datum" ],
                        colModel: [
                            {name: 'name', index: 'name', width: 245, sorttype: "name"},
                            {name: 'size', index: 'size', width: 80, align: "right", sorttype: "name"},
                            {name: 'typ', index: 'typ', width: 60, align: "center", sorttype: "name"},
                            {name: 'date', index: 'date', width: 110, sorttype: "name"}
                        ],
                        onSelectRow: function (file) {
                            sel_file = $("#grid_save").jqGrid('getCell', file, 'name') + "." + $("#grid_save").jqGrid('getCell', file, 'typ');
                            $("#txt_save").val($("#grid_save").jqGrid('getCell', file, 'name'));
                        }
                    });


                $("#btn_save_ok").button().click(function () {
                   SGI.make_savedata();
                    if ($("#txt_save").val() == "") {
                        alert("Bitte Dateiname eingeben")
                    } else {
                        try {
                            console.log(data);
                            SGI.socket.emit("writeRawFile", "www/ScriptGUI/prg_Store/" + $("#txt_save").val() + ".prg", JSON.stringify(PRG.valueOf()));
                            SGI.file_name = $("#txt_save").val();
                            $("#m_file").text(SGI.file_name);

                        } catch (err) {
                            alert("Keine Verbindung zu CCU.io")
                        }
                        $("#dialog_save").remove();
                    }
                });
                $("#btn_save_del").button().click(function () {
                    row_id = $("#grid_save").jqGrid('getGridParam', 'selrow');
                    console.log(SGI.prg_store + sel_file)
                    SGI.socket.emit("delRawFile", SGI.prg_store + sel_file, function (ok) {
                        if (ok == true) {
                            $("#grid_save").delRowData(row_id);
                            $("#txt_save").val("");
                        } else {
                            alert("Löschen nicht möglich");
                        }
                    })
                });

                $("#btn_save_abbrechen").button().click(function () {
                    $("#dialog_save").remove();
                });
            });

        } catch (err) {
            alert("Keine Verbindung zu CCU.IO");
        }
    },

    save_ccu_io: function () {
        if (SGI.file_name == "") {
            SGI.save_as_ccu_io()
        } else {
          SGI.make_savedata();
            try {
                SGI.socket.emit("writeRawFile", "www/ScriptGUI/prg_Store/" + SGI.file_name + ".prg", JSON.stringify(PRG.valueOf()));
            } catch (err) {
                alert("Keine Verbindung zu CCU.IO")
            }
        }
    },

    open_ccu_io: function () {
        var sel_file = "";

        try {
            SGI.socket.emit("readdirStat", SGI.prg_store, function (data) {
                var files = [];


                $("body").append('\
                   <div id="dialog_open" style="text-align: center" title="Öffnen">\
                   <br>\
                       <table id="grid_open"></table>\
                        <br>\
                       <button id="btn_open_ok" >Öffnen</button>\
                       <button id="btn_open_del" >Löschen</button>\
                       <button id="btn_open_abbrechen" >Abbrechen</button>\
                   </div>');
                $("#dialog_open").dialog({
                    height: 500,
                    width: 520,
                    resizable: false,
                    close: function () {
                        $("#dialog_open").remove();
                    }
                });

                if (data != undefined) {
                $.each(data, function () {

                    var file = {
                        name: this["file"].split(".")[0],
                        typ: this["file"].split(".")[1],
                        date: this["stats"]["mtime"].split("T")[0],
                        size: this["stats"]["size"]
                    };
                    files.push(file);

                });
                }

                $("#grid_open").jqGrid({
                    datatype: "local",
                    width: 500,
                    height: 330,
                    data: files,
                    forceFit: true,
                    multiselect: false,
                    gridview: false,
                    shrinkToFit: false,
                    scroll: false,
                    colNames: ['Datei', 'Größe', 'Typ', "Datum"],
                    colModel: [
                        {name: 'name', index: 'name', width: 240, sorttype: "name"},
                        {name: 'size', index: 'size', width: 80, align: "right", sorttype: "name"},
                        {name: 'typ', index: 'typ', width: 60, align: "center", sorttype: "name"},
                        {name: 'date', index: 'date', width: 100, sorttype: "name"}
                    ],
                    onSelectRow: function (file) {
                        sel_file = $("#grid_open").jqGrid('getCell', file, 'name') + "." + $("#grid_open").jqGrid('getCell', file, 'typ');
                    }
                });


                $("#btn_open_abbrechen").button().click(function () {
                    $("#dialog_open").remove();
                });

                $("#btn_open_del").button().click(function () {
                    row_id = $("#grid_open").jqGrid('getGridParam', 'selrow');
                    SGI.socket.emit("delRawFile", SGI.prg_store + sel_file, function (ok) {
                        if (ok == true) {
                            $("#grid_open").delRowData(row_id);
                        } else {
                            alert("Löschen nicht möglich");
                        }
                    })
                });

                $("#btn_open_ok").button().click(function () {
                    SGI.socket.emit("readJsonFile", SGI.prg_store + sel_file, function (data) {
                        SGI.clear();
                        SGI.load_prg(data);
                        SGI.file_name = sel_file.split(".")[0];
                        $("#m_file").text(SGI.file_name);
                    });
                    $("#dialog_open").remove();
                });
            });
        } catch (err) {
            alert("Keine Verbindung zu CCU.IO");
        }
    },

    save_Script: function () {
        var script = Compiler.make_prg();
        if (SGI.file_name == undefined || SGI.file_name == "Neu" || SGI.file_name == "") {
            alert("Bitte erst Programm Speichern")
        } else {
            try {
                SGI.socket.emit("writeRawFile", "scripts/" + SGI.file_name + ".js", script);
            } catch (err) {
                alert("Keine Verbindung zu CCU.IO")
            }
        }
    },

    info_box: function (data) {

        var _data = data.split("\n").join("<br />");

        $("body").append('\
                   <div id="dialog_info" style="text-align: center" title="Info">\
                   <br>\
                   <span>' + _data + '</span>\
                   <br>\
                   <button id="btn_info_close" >Schliesen</button>\
                   </div>');

        $("#dialog_info").dialog({
//            modal: true,
            dialogClass: "info_box",
            maxHeight: "80%",

            close: function () {
                $("#dialog_info").remove();
            }
        });
        $("#btn_info_close").button().click(function () {
            $("#dialog_open").remove();
        });


    }


});