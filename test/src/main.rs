use gtk::{Application, ApplicationWindow, Button};
use mpv::Mpv;

use gtk::prelude::*;

fn main() {
    let app = Application::new(
        Some("com.example.mpv-gtk"),
        Default::default(),
    )
    .expect("Initialization failed...");

    app.connect_activate(|app| {
        let window = ApplicationWindow::new(app);
        window.set_title("MPV Player");
        window.set_default_size(800, 600);

        let button = Button::with_label("Play Video");
        button.connect_clicked(|_| {
            let mut mpv = Mpv::new().expect("Failed to create MPV instance");
            mpv.set_property("vo", "gpu").expect("Failed to set property");
            mpv.command(&["loadfile", "dev/vid.mp4"])
                .expect("Failed to load file");
        });

        window.add(&button);

        window.show_all();
    });

    app.run(&[]);
}
