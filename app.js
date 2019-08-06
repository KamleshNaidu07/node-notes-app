const chalk = require('chalk')
//const validator = require('validator')
const yargs = require('yargs')
const notes = require('./notes.js')

//console.log(process.argv)
console.log("Notes App")
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        // console.log('Adding a note')
        // console.log('Title = '+argv.title)
        // console.log('Body = '+argv.body)
        notes.addNotes(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true
        }
    },
    handler(argv){
        //console.log('Removing a note');
        notes.removeNotes(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List a note',
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title:{
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        //console.log('Reading a note');
        notes.readNote(argv.title)
    }
})

yargs.parse()