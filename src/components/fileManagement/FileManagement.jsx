import { useEffect, useState } from "react";
import { folderStructure } from "../../data";
import FileTab from "./FileTab";

const FileManagement = () => {
    const [folders, setFolders] = useState(folderStructure)

    useEffect(() => { setFolders(folderStructure) }, [folderStructure])
    return (
        <div>
            <h1 className="text-[40px] mb-4 font-bold text-indigo-500">File Management</h1>
            {folders?.map((folder) => (
                <FileTab setFolders={setFolders} folder={folder} key={folder.id} />
            ))}
        </div>
    )
}

export default FileManagement