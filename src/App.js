import React from 'react'
import './App.css'
const marked = require('marked')

const placeholder = `
# Welcome to my React Markdown Previewer !
## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}
class App extends React.Component{
 constructor(props){
   super(props)
    this.state={
      placeholder
    }
   this.handleChange = this.handleChange.bind(this)
 }
  handleChange(event){
    const ph = event.target.value
    this.setState({
      placeholder: ph
    })
  }

  render(){
  
    let preview =''
    if (marked){
      marked.setOptions({
        breaks: true,
      });
       preview = marked(this.state.placeholder,{renderer: renderer})
    }
    
    return (
      <div id="main-container">
        <Editor placeholder={this.state.placeholder} onChange={this.handleChange}/>
        <Previewer innerhtml={preview} />
      </div>
    );
  }
  
}

const Editor = (props) =>{
  return(
    <div id="editor_container">
      <h3>Markdown Editor</h3>
      <textarea id="editor" value={props.placeholder} onChange={props.onChange}></textarea>
    </div>
  )
}

const Previewer = (props) =>{
  const preview = props.innerhtml
  return (
    <div id="preview_container">
      <h3>Markdown preview</h3>
      <div id="preview" dangerouslySetInnerHTML={{__html: preview}}></div>
     </div>
  )
  
}
export default App


