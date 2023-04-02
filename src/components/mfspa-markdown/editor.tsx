import React, { useEffect, useRef, useState } from "react";
import MfspaMarkdown from ".";
import "./editor.less";
const MfspaMarkdownEditor = (props: MfspaMarkdownProps) => {
    let {content, onEditorChange} = props;
    content = content.replace(/\\n/g, '<br/>');
    const [_content, setContent] = useState<string>(content); 
    const ref = useRef(null);
    const inputChange = () => {
        console.log(ref.current.innerText);
        const innerText = ref.current.innerText;
        if(innerText === _content) {
            return;
        }
        setContent(innerText);
        onEditorChange(innerText);
    }

    useEffect(()=> {
        let content = "";
        if(props.content){
            content = props.content.replace(/\\n/g, '<br/>');
        }
        ref.current.innerHTML = content;
        setContent(ref.current.innerText);
    }, [props.content])

    return <div className="mfspa-md-editor">
        <div ref={ref} suppressContentEditableWarning contentEditable onKeyUp={inputChange} className="mfspa-md-editor-input"></div>
        <div className="mfspa-md-editor-preview">
            <MfspaMarkdown content={_content}></MfspaMarkdown>
        </div>
    </div>
}
export default MfspaMarkdownEditor;