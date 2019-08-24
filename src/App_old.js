import React from 'react';
// import logo from './logo.svg';
import './App.css';
import placeholder from './placeholder'
// import marked from 'https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.js'

const renderer = new window.marked.Renderer();
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
    if (window.marked){
      window.marked.setOptions({
        breaks: true,
      });
       preview = window.marked(this.state.placeholder,{renderer: renderer})
      //  {{__html: marked(props.markdown, { renderer: renderer })}}
      //  console.log('preview :' + preview)
    }else{
      // console.log('preview else :'+ typeof preview)
    }
    // console.log(window.marked)
    return (
      <div >
        <textarea id="editor" value={this.state.placeholder} onChange={this.handleChange}/>
        <div id="preview" dangerouslySetInnerHTML={{__html: preview}}></div>
        
        {/* <div id="preview">{preview}</div> */}
      </div>
    );
  }
  
}


export default App;
