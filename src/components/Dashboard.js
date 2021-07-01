import React,{useState,useEffect} from 'react';
import{db,storage,auth} from './../util/firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import firebase from 'firebase';


import './../assets/css/Dashboard.css'
import SideIcon from './shared/SideIcon';
import FileView from './shared/FileView'
import {getReadableFileSizeString} from './PopUp';
import { useStateValue } from "./../StateProvider";


import DescriptionIcon from "@material-ui/icons/Description";
import FolderIcon from "@material-ui/icons/Folder";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";


function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



 function Dashboard() {
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false);
    const [filesStored,setFilesStored]=useState([]);
    const [sizeStr,setSizeStr]=useState(0);

    const [{ user }] = useStateValue();

   

  useEffect(() => {
    
      
      db.collection('userFiles').doc(user.uid)
        .collection('files').onSnapshot(snapshot => {
           
           
            setFilesStored(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            }
           )))

           
        })
       

    }, [user])
 useEffect(
     ()=>{
        if(filesStored.size!==0){
            let size=0;
            filesStored.forEach(e=>{
                size=size+e.item.size;
            }
               
            
            )
            
            setSizeStr(getReadableFileSizeString(size))
           
        }
      
     },[filesStored]
 )
 
    const handleOpen = () => {
      
        setOpen(true);
    };

    const handleClose = () => {

        setOpen(false);
    };

    const handleChange = (e) => {
       
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload  =(e)=>{
        e.preventDefault();
        
                
        setUploading(true);
        storage.ref(`files/${auth?.currentUser.uid}/${file?.name}`).put(file).then(snapshot => {
            storage.ref(`files/${auth?.currentUser?.uid}/${file?.name}`).getDownloadURL().then(url=>{
                db.collection('userFiles').doc(auth?.currentUser?.uid)
                .collection('files').add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: file?.name,
                    fileUrl: url,
                    size: snapshot._delegate.bytesTransferred,
                    type:snapshot._delegate.metadata.contentType
                })
                setUploading(false)
                setOpen(false)
                setFile(null)

            })


        })
    }


    return (
        <div className='dashboard'>
            
           <div className='sideBar'>
               
               <SideIcon icon={(<DescriptionIcon  style={{ fontSize: 35 }} />)} description={'File Upload'}  handler={handleOpen}/>
               <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <p>Select files you want to upload!</p>
                    {
                        uploading ? (
                            <p>Uploading...</p>
                        ) : (
                                <>
                                    <input type="file" onChange={handleChange} />
                                    <button onClick={handleUpload}>Upload</button>
                                </>
                            )
                    }
                </div>
            </Modal>
               <SideIcon icon={(<FolderIcon  style={{ fontSize: 35 }} />)} description={'Folder Upload'}/>
               <SideIcon icon={(<CreateNewFolderIcon  style={{ fontSize: 35 }} />)} description={'New Folder'}/>
               <SideIcon icon={(<BackupOutlinedIcon  style={{ fontSize: 35 }} />)} description={'Storage:'}/>
               <span className='storage__dash'>{sizeStr}</span>
               

           </div>
           <div className='files__dash'>
           {
                filesStored.map(({ id, item }) => (
                    <FileView id={id} name={item.caption} timestamp={item.timestamp} fileUrl={item.fileUrl} size={item.size} type={item.type}  />
                ))
            }
            </div>
            </div>
    )
}

export default Dashboard;
