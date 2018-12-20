
const St = imports.gi.St;
const Main = imports.ui.main;
const Util = imports.misc.util;
//const GLib = imports.gi.GLib;

let button, status;

function _toggleBacklight(){
    if (status) {
        Util.spawn(['xset', 'led', 'named', 'Scroll Lock']);
    } else {
        Util.spawn(['xset', '-led', 'named', 'Scroll Lock']);
    }
    status = !status
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'keyboard',
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _toggleBacklight);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 3);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
