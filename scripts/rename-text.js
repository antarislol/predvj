const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
        callback(dirPath);
      }
    }
  });
}

const dirsToSearch = ['components', 'app', 'lib', 'hooks'];
const cwd = process.cwd();

dirsToSearch.forEach(d => {
  const fullPath = path.join(cwd, d);
  if (fs.existsSync(fullPath)) {
    walkDir(fullPath, (filePath) => {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      // Preserve system strings/routes/ids by not doing a blind replace, 
      // but for "Pré-inscrições" vs "Confirmações de presença":
      content = content.replace(/pré-inscrições/g, "confirmações de presença");
      content = content.replace(/Pré-inscrições/g, "Confirmações de presença");
      content = content.replace(/pré-inscrição/g, "confirmação de presença");
      content = content.replace(/Pré-inscrição/g, "Confirmação de presença");
      content = content.replace(/Pré-inscriçao/g, "Confirmação de presença");
      content = content.replace(/pré-inscrita/g, "confirmada");
      
      // Adjust specific phrases
      content = content.replace(/fazer minha confirmação de presença/gi, "confirmar minha presença");
      content = content.replace(/fazer a confirmação de presença/gi, "confirmar presença");
      content = content.replace(/Faça sua confirmação de presença/gi, "Confirme sua presença");
      content = content.replace(/sua confirmação de presença/gi, "sua presença");
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    });
  }
});
