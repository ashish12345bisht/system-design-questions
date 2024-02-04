import React, { useCallback, useState } from 'react'
import { AiFillFileAdd } from 'react-icons/ai'
import { FaChevronDown, FaFolderPlus } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';
import { CiFileOn, CiFolderOn } from "react-icons/ci";
import { errorToast } from '../../utils/toasts';

const FileTab = ({ folder, setFolders }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [fieldVisible, setFieldVisible] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [type, setType] = useState("");

    const toggleIsOpen = () => folder?.children?.length !== 0 ? setIsOpen(isOpen => !isOpen) : errorToast("This folder is empty")

    const handleFieldNameChange = (e) => setFieldName(e.target.value)

    const handleAdd = (type) => {
        setType(type);
        setFieldVisible(true)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            let obj = {
                name: fieldName,
                id: uuidv4(),
            }
            obj.isfolder = type === "folder" ? true : false;
            obj.children = type === "folder" ? [] : null;
            folder?.children?.unshift(obj)
            setIsOpen(true)
            setFieldVisible(false);
            setFieldName("");
        }
    }
    return (
        <div className='text-right'>
            <div className={`flex items-center justify-between ${folder?.isfolder ? "bg-slate-400" : "bg-slate-100"} p-2`}>
                <span className='flex-[0.9] text-left flex items-center'>{folder?.isfolder ? <CiFolderOn /> : <CiFileOn />}{folder?.name}</span>
                {
                    folder?.isfolder &&
                    <span className='flex-[0.1] flex items-center justify-around cursor-pointer'>
                        <FaFolderPlus onClick={() => handleAdd("folder")} />
                        <AiFillFileAdd onClick={() => handleAdd("file")} />
                        <FaChevronDown onClick={toggleIsOpen} className={`${!isOpen ? "rotate-180" : ""} transition-all`} />
                    </span>
                }
            </div>
            {fieldVisible && <input className='border-1 border-slate-950' placeholder={`enter ${type} name`} type='text' value={fieldName} onChange={handleFieldNameChange} onKeyDown={handleKeyDown} onBlur={() => setFieldVisible(false)} />}
            {<div className={`pl-8 transition-all ${isOpen ? "h-full" : "h-0 overflow-hidden"}`}>
                {folder?.children?.map(childFolder => (
                    <FileTab setFolders={setFolders} folder={childFolder} key={childFolder?.id} />
                ))}
            </div>}
        </div>
    )
}

export default FileTab