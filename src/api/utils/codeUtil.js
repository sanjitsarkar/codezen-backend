const Code = require("../models/Code")
const saveCode = async (title, code, format, lang, user_id,id) => {
  
  
     
      if (!id) {
        let _code = await Code.create({ lang, title, code, format, user_id })
        return _code
      }
      else {

       let _code =  await Code.updateOne({_id:id } , { lang, title, code, format })

        return _code
      }
    
 
  
}




const handleDeleteCode = async (id,path) => {
  try {
    await Code.deleteOne({ _id: id })
    return { "status": "success", "errors": "" };

  }
  catch (e) {
    return { "status": "failure", "errors": e };
  }
}

async function exists (path) {  
  try {
    await Fs.access(path)
    return true
  } catch {
    return false
  }
}
module.exports = { saveCode,handleDeleteCode,exists}