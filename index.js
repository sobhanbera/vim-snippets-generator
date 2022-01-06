const write = require('write')
// const {snippetsList} = require('./snippets.json.js') // the snippets list or object...
const jsSnippetsList = require('./snippets.json')
const tsSnippetsList = require('./ts-snippets.json')

// the function which will generate the snippets based on the input json file...
function generateSnippets(snippetsList, filename = '') {
    // fetching the key-value from the snippets
    const keys = Object.keys(snippetsList)
    const values = Object.values(snippetsList)
    // the actual snippets string which will be written to the snippet file
    let snippets = ""
    for (let i in keys) {
        // adding a comment so that it could be recognized later on too
        snippets += `\n# ${values[i].description || keys[i]}\n`
        // the actual snippet syntax starts from here
        snippets += `snippet ${values[i].prefix} "${values[i].description || keys[i]}" b\n`
        // the body might be of multiline so that could be a array datatype
        // so handling that case below...
        if (Array.isArray(values[i].body)) {
            for (let j in values[i].body) {
                snippets += `${values[i].body[j]}\n`
            }
        } else {
            // else write the body itself
            snippets += `${values[i].body}\n`
        }
        // end the snippet with its syntax
        snippets += `endsnippet\n`
        // to reduce the file size I have removed some newlines which looks cool though
        // by this the number of lines got reduced to 2000 instead or 2800+
    }

    // writing the javascript snippets to the snippets file
    write.sync(filename, snippets, {overwrite: true})
}

generateSnippets(jsSnippetsList, 'javascript.snippets')
generateSnippets(jsSnippetsList, 'javascriptreact.snippets')
generateSnippets(tsSnippetsList, 'typescript.snippets')
generateSnippets(tsSnippetsList, 'typescriptreact.snippets')
