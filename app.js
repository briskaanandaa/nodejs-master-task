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

module.exports = app;
