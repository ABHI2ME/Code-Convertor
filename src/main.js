import './style.css'

const apiKey = import.meta.env.VITE_API_KEY;
const copyBtn = document.querySelector('.code-convertor-output-btn') ;

import { GoogleGenerativeAI } from "@google/generative-ai";
// require('dotenv').config(); 
// const { GoogleGenerativeAI } = require("@google/generative-ai");


const btn = document.querySelector('.hero-convert-code-btn') ;
const lan = document.querySelector('.hero-convert-btn-select') ;
const input = document.querySelector('.code-convertor-editor-input') ;
const output = document.querySelector('.code-convertor-editor-output') ;
window.onload = function(){
    btn.addEventListener('click' , ()=>{
        getText() ;
       
        
    })
}



function getText(){
    if(input.value === ""){
        alert("please enter the code") ;
    }else{
        callGemini(input.value , lan.value) ;
    }
    
}

async function callGemini(inputValue , codeLan){
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `convert the given code ${inputValue} to the code in language of ${codeLan} . Do not give me additionals comments . only give me the converted code that's it . If user type anything other than code then respond by saying please enter the code to get reply .`  ;

    const result = await model.generateContent(prompt);
    
    output.value = result.response.text() ;

    console.log(result.response.text());

}

window.onload = function(){
    copyBtn.addEventListener('click' , ()=>{
         const textToCopy = output.value ;
         if(textToCopy != ""){
            const copyContent = async () => {
                try {
                  await navigator.clipboard.writeText(textToCopy);
                  copyBtn.
                  console.log('Content copied to clipboard');
                } catch (err) {
                  console.error('Failed to copy: ', err);
                }
              }
         }
         else{
            console.log("nothing to copy") ;
         }
    })
}
