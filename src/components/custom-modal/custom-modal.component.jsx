import React, { useEffect, useRef } from 'react';
import {createPortal} from 'react-dom';


import './custom-modal.styles.scss';


const CustomModal = ({children})=>{

    const el = useRef(document.createElement('div'));
    el.current.classList.add('modal-window');

    useEffect(()=>{
        const modalRoot = document.getElementById('modal-root'); 
        modalRoot.appendChild(el.current);
        const currentEl = el.current;
        return(()=>{
            currentEl.remove();
        });
    },[]);

    return(
        createPortal(children, el.current)
    );
}

export default CustomModal;