import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import html2pdf from 'html2pdf.js';
import { exportHtmlToDocx } from 'editor-to-word';
import { saveAs } from 'file-saver';
import ImageUploader from 'quill-image-uploader';

function Editor() {
	const navigate = useNavigate();
	const [docname, setdocname] = useState('');
	const [downloadformat, setdownloadformat] = useState('');
	const [isOpen, setisOpen] = useState(false);

	const wrapperRef = useCallback(
		(wrapper) => {
			if (wrapper == null) return;
			const editor = document.createElement('div');

			wrapper.innerHTML = '';

			wrapper.append(editor);

			const toolbarOptions = [
				[{ header: [1, 2, 3, 4, 5, false] }],
				[{ font: [] }],
				['bold', 'italic', 'underline'],
				[{ color: [] }, { background: [] }],
				[{ align: [] }],
				[
					{ list: 'ordered' },
					{ list: 'bullet' },
					{ indent: '-1' },
					{ indent: '+1' },
				],
				[{ 'direction': 'rtl' }],
				['link', 'image'],
			];
			Quill.register('modules/imageUploader', ImageUploader);
			const quill = new Quill(editor, {
				theme: 'snow',
				modules: {
					toolbar: toolbarOptions,
					imageUploader: {
						/* upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          fetch(
            "https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",
            {
              method: "POST",
              body: formData
            }
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              resolve(result.data.url);
            })
            .catch((error) => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      } */
						upload: (file) => {
							return new Promise((resolve, reject) => {
								// const unsignedUploadPreset = 'doc_codepen_example';
								const formData = new FormData();
								formData.append(
									'upload_preset',
									process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
								);
								formData.append('tags', 'browser_upload'); // Optional - add tags for image admin in Cloudinary
								formData.append('file', file);
								// visit https://cloudinary.com/pricing/compare-plans for details regarding free tier
								fetch(
									`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
									{
										method: 'POST',
										body: formData,
									}
								)
									.then((response) => response.json())
									.then((result) => {
										resolve(result.secure_url);
									})
									.catch((error) => {
										reject('Upload failed');
										console.error('Error:', error);
									});
							});
						},
					},
				},
			});
			const header = document.querySelector('.ql-toolbar.ql-snow');

			if (header) {
				const imgElement = document.createElement('img');
				imgElement.src = `${process.env.PUBLIC_URL}logo3.png`;
				imgElement.alt = 'Description of the image';
				imgElement.width = 80;
				imgElement.height = 80;

				imgElement.addEventListener('click', (event) => {
					navigate('/');
				});

				const documentname = document.createElement('input');
				documentname.id = 'name';
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

				documentname.addEventListener('mouseover', () => {
					documentname.style.border = '1px solid #2a63c5';
				});
				documentname.addEventListener('mouseout', () => {
					documentname.style.border = '1px solid transparent';
				});
				documentname.addEventListener('keydown', (event) => {
					setdocname(event.target.value);
					if (event.key === 'Enter') {
						document.getElementById('name').blur();
					}
				});

				const downloadInput = document.createElement('select');
				downloadInput.textContent = 'Download';
				downloadInput.padding = '1px';
				downloadInput.style.marginLeft = '10px';
				downloadInput.style.backgroundColor = '	#3b3b3b';
				downloadInput.style.border = '2px solid transparent';
				downloadInput.style.borderRadius = '7px';
				downloadInput.style.color = '#fff';
				downloadInput.style.cursor = 'pointer';
				downloadInput.style.width = '150px';
				downloadInput.style.height = '30px';

				downloadInput.addEventListener('change', (event) => {
					setdownloadformat(event.target.value);
				});

				downloadInput.addEventListener('mouseover', () => {
					downloadInput.style.backgroundColor = '#2a63c5';
				});

				downloadInput.addEventListener('mouseout', () => {
					downloadInput.style.backgroundColor = '#3b3b3b';
				});

				downloadInput.id = 'downloadOptions';
				const options = ['Download', '.pdf', '.docx', '.txt'];
				options.forEach((op) => {
					const option = document.createElement('option');
					option.value = op;
					option.textContent = op;
					downloadInput.appendChild(option);
					if (op !== 'Download') {
						option.addEventListener('click', () => {
							if (op === '.pdf')
								html2pdf()
									.from(quill.container)
									.save(document.getElementById('name').value);
							if (op === '.docx') {
								exportHtmlToDocx(
									quill.root.innerHTML.toString(),
									document.getElementById('name').value
								);
							}
							if (op === '.txt') {
								const blob = new Blob([quill.root.innerText], {
									type: 'text/plain',
								});

								saveAs(blob, `${document.getElementById('name').value}.txt`);
							}
						});
					}
				});
				header.appendChild(downloadInput);

				const sharebutton = document.createElement('button');
				sharebutton.textContent = 'Share';

				sharebutton.type = 'button';
				sharebutton.padding = '1px';
				sharebutton.style.marginLeft = '10px';
				sharebutton.style.backgroundColor = '	#3b3b3b';
				sharebutton.style.border = '2px solid transparent';
				sharebutton.style.borderRadius = '7px';
				sharebutton.style.color = '#fff';
				sharebutton.style.cursor = 'pointer';
				sharebutton.style.width = '150px';
				sharebutton.style.height = '30px';

				sharebutton.addEventListener('click', () => setisOpen(true));

				sharebutton.addEventListener('mouseover', () => {
					sharebutton.style.backgroundColor = '#2a63c5';
				});

				sharebutton.addEventListener('mouseout', () => {
					sharebutton.style.backgroundColor = '	#3b3b3b';
				});

				<Popup
					trigger={sharebutton}
					modal
					nested
				></Popup>;

				header.append(sharebutton);
			}
		},
		[navigate]
	);

	return (
		<div>
			<div
				className='container'
				ref={wrapperRef}
			></div>

			<Popup
				open={isOpen}
				onClose={() => setisOpen(false)}
				modal
				nested
			>
				<div
					style={{
						margin: '0',
						padding: '70px',
						textAlign: 'center',
						backgroundColor: 'rgb(243, 243, 243)',
						boxShadow: '2px 2px 4px #f2d273, -2px -2px 4px #f2d273',
					}}
				>
					<img
						src={`${process.env.PUBLIC_URL}logo3.png`}
						height={150}
						width={150}
					/>
					<h2>Share Document</h2>
					<p>Enter the email or link to share:</p>
					<input
						id='i1'
						type='text'
						placeholder='Enter email or link'
						style={{
							width: '80%',
							padding: '10px',
							margin: '10px 0',
							border: '1px solid #ccc',
							borderRadius: '7px',
						}}
						onMouseOver={() => {
							const in1 = document.getElementById('i1');
							in1.style.border = '2px solid #2a63c5';
						}}
						onMouseOut={() => {
							const in1 = document.getElementById('i1');
							in1.style.border = '2px solid #ccc';
						}}
					/>
					<br />
					<button
						id='share1'
						onClick={() => setisOpen(false)}
						style={{
							marginTop: '30px',
							padding: '10px 20px',
							backgroundColor: '#3b3b3b',
							color: '#fff',
							border: 'none',
							borderRadius: '5px',
							cursor: 'pointer',
						}}
						onMouseOver={() => {
							const share = document.getElementById('share1');
							share.style.backgroundColor = '#2a63c5';
						}}
						onMouseOut={() => {
							const share = document.getElementById('share1');
							share.style.backgroundColor = '#3b3b3b';
						}}
					>
						Share
					</button>
				</div>
			</Popup>
		</div>
	);
}

export default Editor;
