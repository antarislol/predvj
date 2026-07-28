const fs = require('fs');
let data = fs.readFileSync('components/public/FormularioSection.tsx', 'utf8');

data = data.replace('className="space-y-8 text-left"', 'className="space-y-8 text-center mx-auto max-w-xl"');
data = data.replace(/className="block text-sm font-semibold mb-2"/g, 'className="block text-sm font-semibold mb-2 text-center"');
data = data.replace('className="text-xs max-w-xs mt-1"', 'className="text-xs max-w-xs mt-1 mx-auto"');
data = data.replace('flex items-center gap-3 mb-6', 'flex items-center gap-3 mb-6 justify-center');
data = data.replace('flex items-center gap-3 mb-5', 'flex items-center gap-3 mb-5 justify-center');
data = data.replace('className="flex items-start gap-3 mt-8"', 'className="flex items-start gap-3 mt-8 justify-center"');
data = data.replace('className="flex flex-col gap-1.5"', 'className="flex flex-col gap-1.5 items-center text-center"');

fs.writeFileSync('components/public/FormularioSection.tsx', data);
console.log("Done");
