const chalk = require('chalk');
const fs = require('fs')

const getNotes = function(){
    return 'Your notes...'
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse(' New note added '))            
    }else{
        console.log(chalk.red.inverse(' Note title taken '))
    }

}

const removeNotes = (title) => {
    const notes = loadNotes()
    const check = false
    //console.log('Removing Notes with title : '+title)
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length){
        console.log(chalk.bgGreen(' Note Removed '))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.bgRed(' No Note Found '))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.magenta.inverse.underline(' Your Notes '))        
    notes.forEach(note => {
        console.log(chalk.bgBlue.bold(' '+note.title+' ')+' => '+chalk.blue(' '+note.body+' '))
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)
    if(findNote){
        console.log(chalk.blue.inverse.bold(' '+findNote.title+' ')+' : '+findNote.body)
    }else{
        console.log(chalk.red.inverse.bold(' No Note Found? '))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)        
    } catch (e) {
        return []
    }
}


module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}