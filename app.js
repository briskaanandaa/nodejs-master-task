const fs = require("node:fs");
const path = require("node:path");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};

// Membuat Folder
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
  rl.question("Masukan Nama Folder : ", (folderName) => {
    const pathFolder = `${__dirname}/${folderName}`;

    // Kita cek apakah foldernya udah ada atau belum
    if (!fs.existsSync(pathFolder)) {
      // Foldernya belum ada, jadi kita buat baru
      fs.mkdirSync(pathFolder);
      console.log("Berhasil Membuat Folder Baru");
    } else {
      console.log("folder already exists");
    }

    rl.question("Masukan Nama File : ", (fileName) => {
      rl.question("Masukan ekstensi file : ", (extName) => {
        rl.question("Masukan isi file : ", (fileData) => {
          fs.writeFileSync(
            `${pathFolder}/${fileName}.${extName}`,
            `${fileData}`
          );
          console.log("Berhasil membuat file baru");
          rl.close();
        });
      });
    });
  });
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

// Membaca Folder
app.readFolder = () => {
  rl.question("Masukkan Nama Folder: ", (folderName) => {
    const folderPath = path.join(__dirname, folderName);

    fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error("Tidak dapat membaca direktori:", err);
        rl.close();
        return;
      }

      const fileDetails = files.map((file) => {
        const stats = fs.statSync(path.join(folderPath, file.name));
        return {
          namaFile: file.name,
          extensi: path.extname(file.name).slice(1),
          jenisFile: file.isDirectory() ? "folder" : "file",
          tanggalDibuat: stats.birthtime.toISOString().split("T")[0],
          ukuranFile: `${(stats.size / 1024).toFixed(2)}kb`,
        };
      });

      console.log(JSON.stringify(fileDetails, null, 4));
      rl.close();
    });
  });
};

// Membaca File
app.readFile = () => {
  rl.question("Masukkan Nama File: ", (fileName) => {
    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Tidak dapat membaca file:", err);
      } else {
        console.log(`Isi dari file ${fileName}\n\n${data}`);
      }
      rl.close();
    });
  });
};

module.exports = app;
