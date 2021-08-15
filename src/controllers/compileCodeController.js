const { spawn, exec } = require('child_process');
const process = require("process")
const path = require("path")
const Code = require("../models/Code")
const { exists} = require("../utils/codeUtil")
const fs = require("fs/promises")

const compileCodeController = async (req, res) => {
    const { id, input } = req.body
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.json({"status":"Invalid ID"})
}
    const _code = await Code.findOne({ _id: id })
    const rpath = path.join(__dirname, "..",id)
    if (!_code)
        res.json({"status":"Wrong ID"})
    if (await exists(rpath) === false && _code)
        await fs.mkdir(rpath)
    if (_code) {
        try {
        
    
            const title = _code.title
            const id = _code._id
            const lang = _code.lang
            const code = _code.code
            const format = _code.format
            var output = "";
            const file = new RegExp(rpath+"/", 'g')
            const filePath = path.join(rpath,title + "." + format)
            if (lang === "python") {
                var codes = `import sys
sys.stdin = open(r'${path.join(rpath, "input.txt")}', 'r')
${code}`
                
                await fs.writeFile(filePath, codes)
                var args = [filePath]
                var inputFile = path.join(rpath,"input.txt")
                var inputs = input.toString()
                var isKilled = false
                inputs = inputs.replace(/,/g, "\n")
                await fs.writeFile(inputFile, inputs)
  
                var errors = []
                console.log("args",args)
                const python = spawn('python3', args, { detached: true });
                const timeout = setTimeout(() => {
                    try {
                        process.kill(python.pid, 'SIGKILL');
                        isKilled = true
                    } catch (e) {

                        errors.push(e)
                    }
                }, 1000);
                python.on('error', err => {
                    errors.push(err.toString().replace(file,""))
                }
                );
                python.stdout.on('data', function (data) {
                    output = data.toString();
                });
                python.stderr.on('data', function (data) {
                    data = data.toString()
                    // if (data.includes(","))
                    //     data = data.split(",")[1]
                        
                    errors.push(data.toString().replace(file,""))

                });
   
                python.on('exit', () => {
                        
                    if (isKilled) {
                       
                        clearTimeout(timeout);
                    }
                });
                python.on('close', async (code) => {
                    await fs.rmdir(rpath, { recursive: true });
                    res.json({ "output": output.toString(), "errors": errors.toString() })

                });
            
            }
            else if (lang === "cpp" || lang === "c") {
                // console.log("codes",code);

                var inputFile = path.join(rpath,"input.txt")
                const _code = `main()
                {
                   ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
                   #ifndef ONLINE_JUDGE
                     freopen("${inputFile.replace(/\\/g,"\\\\")}", "r", stdin);
                   #endif
                `
                       
                         var codes = code.replace(`main() {`,
                         _code)
                        

                await fs.writeFile(filePath, codes)       
                var args = [filePath]
                var inputs = input.toString()
                // var isKilled = false
                inputs = inputs.replace(/,/g, "\n")
                await fs.writeFile(inputFile, inputs)
                var args = [filePath,'-o', rpath+"/"+title]
                var errors = []
                
                const cpp = spawn('g++', args, { detached: true });
                cpp.stdout.on('data', function (data) {
                    // output = data.toString();
                });
                cpp.stderr.on('data',async function (data) {
                   
                            errors.push(data.toString().replace(file,""))
                    await fs.rmdir(rpath, { recursive: true });
                    res.json({ "output": "", "errors": errors.toString() })

                });
                cpp.on('close', (code) => {
                
                   exec(path.join(rpath,title), { timeout: 100 * 2 ,}, async(error, stdout, stderr) => {
             
                        await fs.rmdir(rpath, { recursive: true });
                 
                    // console.log("stderr",stderr);
                        // if (error)
                        // errors.push(error.toString().replace(file,""))

                        // if (stderr)
                        // errors.push(stderr.toString().replace(file,""))


                        res.json({ "output": stdout, "errors": errors.toString() })
                        
                
                    });
                   

                });
            }
            else {
            

            }
        
        }
        catch (e) {
            console.log(e);
            res.status(501).send({ errors: e })
        }
    }
}

module.exports = compileCodeController