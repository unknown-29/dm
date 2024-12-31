import React, {useCallback, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "quill/dist/quill.snow.css"
import Quill from 'quill';
import Popup from 'reactjs-popup';

function Editor() {
  const navigate = useNavigate();
  const [docname, setdocname] = useState('');
  const [downloadformat, setdownloadformat] = useState('');
    const wrapperRef = useCallback(wrapper => {
        if(wrapper == null) return 
        const editor = document.createElement ("div")
 
        wrapper.innerHTML = ""
        

        wrapper.append(editor)
        
        const toolbarOptions = [
            [{ header: [1, 2, 3, 4, 5, false] }], 
            [{ font: [] }],
            ["bold", "italic", "underline"], 
            [{ color: [] }, { background: [] }], 
            [{ align: [] }], 
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            [{ 'direction': 'rtl' }],          
            ["link", "image"],
            
        ]
  
        new Quill(editor, {theme: "snow", 
            modules: {
                toolbar: toolbarOptions,
              },
        })
        const header = document.querySelector('.ql-toolbar.ql-snow')

        if(header){
            const imgElement = document.createElement('img');
            imgElement.src = `${process.env.PUBLIC_URL}logo3.png`
            imgElement.alt = 'Description of the image';
            imgElement.width = 80; 
            imgElement.height = 80;
           
            imgElement.addEventListener('click', (event) => {
              navigate('/')
            })
           
            const documentname = document.createElement('input')
            documentname.id = 'name'
            documentname.type = 'text';
            documentname.readOnly = false;
            documentname.disabled = false;
            documentname.placeholder = 'Untitled Document';
            documentname.style.margin = '5px';
            documentname.style.textAlign = 'center';
            documentname.style.height = '30px';
            documentname.style.border = '1px solid transparent';
            documentname.style.borderRadius = '7px';
            documentname.style.padding = '3px';
            documentname.value = docname;
            header.prepend(documentname);
            header.prepend(imgElement);
            
            documentname.addEventListener('mouseover', ()=>{
              documentname.style.border = "1px solid #2a63c5"
            })
            documentname.addEventListener('mouseout', ()=>{
              documentname.style.border = "1px solid transparent"
            })
            documentname.addEventListener('keydown', (event)=>{
              if(event.key === 'Enter'){
                setdocname(event.target.value)
                document.getElementById("name").blur();
                
              }
            })


            const downloadInput = document.createElement('input');
            downloadInput.type = 'text';
            downloadInput.setAttribute('list', 'downloadOptions');
            downloadInput.style.textAlign = 'center';
            downloadInput.placeholder = 'Download';
            downloadInput.style.marginLeft = '130px';
            downloadInput.style.padding = '3px';
            downloadInput.style.borderRadius = '7px';
            downloadInput.style.border = '1px solid transparent';
            downloadInput.style.height = '30px';
            downloadInput.style.backgroundColor = '	#3b3b3b'
            downloadInput.style.color = 'black'
            downloadInput.style.fontWeight = 'bold'
            downloadInput.addEventListener('change', (event)=>{
              setdownloadformat(event.target.value);

            })

            downloadInput.addEventListener('mouseover', () => {
              
              downloadInput.style.backgroundColor = '#2a63c5'; 
            })

            downloadInput.addEventListener('mouseout', () => {
              
              downloadInput.style.backgroundColor = '#3b3b3b'; 
            })

            const download = document.createElement('datalist');
            download.id = 'downloadOptions';
            
            const options = ['.pdf', '.docx', '.txt'];
            options.forEach((op) => {
              const optionElement = document.createElement('option');
              optionElement.value = op;

              optionElement.className = 'option'

              download.appendChild(optionElement);
            });

            header.appendChild(downloadInput);
            header.appendChild(download);

            

            const sharebutton = document.createElement('button');
            sharebutton.textContent = 'Share'
            sharebutton.style.fontWeight = 'bold';
            sharebutton.type = "button";
            sharebutton.padding = '1px';
            sharebutton.style.marginLeft = '10px';
            sharebutton.style.backgroundColor = '	#3b3b3b';
            sharebutton.style.border = '2px solid transparent';
            sharebutton.style.borderRadius = '7px';
            sharebutton.style.color = 'black';
            sharebutton.style.cursor = 'pointer';
            sharebutton.style.width = '150px';
            sharebutton.style.height = '30px';

            sharebutton.addEventListener('mouseover', () => {
              sharebutton.style.backgroundColor = '#2a63c5'; 
            });
            
            sharebutton.addEventListener('mouseout', () => {
              sharebutton.style.backgroundColor = '	#3b3b3b'; 
            });

            <Popup trigger = {sharebutton} modal nested>
              

            </Popup>
            

            header.append(sharebutton);
          }

    }, [navigate])



  return (
    <div>
       
    <div className = "container" ref = {wrapperRef}>
     
    </div>
    </div>

  )
}

export default Editor
