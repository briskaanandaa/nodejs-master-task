const fs = require("node:fs");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};

// contoh script pembuatan folder
app.makeFolder = () => {
  rl.question("Masukan Nama Folder : ", (folderName) => {
    fs.mkdir(__dirname + `/${folderName}`, () => {
      console.log("Berhasil membuat folder baru");
    });
    rl.close();
  });
};

// Membuat File
app.makeFile = () => {
  rl.question(
    "Masukkan Nama File (beserta ekstensinya contoh : file.js) : ",
    (fileName) => {
      fs.writeFile(path.join(__dirname, fileName), "", (err) => {
        if (err) {
          console.error("Kesalahan saat membuat file:", err);
        } else {
          console.log("Berhasil membuat file baru");
        }
        rl.close();
      });
    }
  );
};

// Merapikan File
app.extSorter = () => {
  const unorganizedFolder = path.join(__dirname, "unorganize_folder");

  fs.readdir(unorganizedFolder, (err, files) => {
    if (err) {
      return console.error("Tidak dapat memindai direktori:", err);
    }

    files.forEach((file) => {
      const ext = path.extname(file).slice(1);
      const extFolder = path.join(__dirname, ext);

      if (!fs.existsSync(extFolder)) {
        fs.mkdirSync(extFolder);
      }

      fs.rename(
        path.join(unorganizedFolder, file),
        path.join(extFolder, file),
        (err) => {
          if (err) {
            console.error("Kesalahan saat memindahkan file:", err);
          }
        }
      );
    });
    console.log("File telah diatur berdasarkan ekstensi.");
  });
};

module.exports = app;
