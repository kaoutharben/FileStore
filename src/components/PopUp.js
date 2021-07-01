import React from "react";
import "./../assets/css/PopUp.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LinkIcon from "@material-ui/icons/Link";
import GetAppIcon from "@material-ui/icons/GetApp";

import { db, storage, auth } from "./../util/firebase";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const getReadableFileSizeString = (fileSizeInBytes) => {
    let i = -1;
    const byteUnits = [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };


function PopUp({ id, fonction, name, timestamp, fileUrl, size }) {
  const fileDate = `${timestamp?.toDate().getDate()} ${
    monthNames[timestamp?.toDate().getMonth() + 1]
  } ${timestamp?.toDate().getFullYear()}`;

  
  const deleteFile = (e) => {
    e.preventDefault();
    // Create a reference to the file to delete
    var desertRef = storage.ref(`files/${auth?.currentUser.uid}/${name}`);

    // Delete the file
    desertRef
      .delete()
      .then(() => {
        var ref = db
          .collection("userFiles")
          .doc(auth?.currentUser?.uid)
          .collection("files")
          .doc(id);

        ref

          .delete()
          .then(() => {
            alert("Document successfully deleted!");
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
     const generateLink=(e)=>{
         e.preventDefault();
         navigator.clipboard.writeText(fileUrl);
         alert('Link to "'+name+'" is successfully copied')

     }

  return (
    <div className="popUp__comp">
      <div className="upside">
        <div className="close" onClick={fonction}>
          &times;
        </div>
        <div className="pop__buttons">
          <LinkIcon onClick={generateLink} className="buttons__pop" />

          <a href={fileUrl} className="anchor__pop" target="_blank" download>
            <GetAppIcon />
          </a>

          <DeleteForeverIcon className="buttons__pop" onClick={deleteFile} />
        </div>
      </div>
      <div className="dowSide">
        <div className="cases__pop">
          <h5>Name :</h5>
          <span>{name} </span>
        </div>
        <div className="cases__pop">
          <h5>Created :</h5>
          <span>{fileDate}</span>
        </div>
        <div className="cases__pop">
          <h5>Size :</h5>
          <span>{getReadableFileSizeString(size)} </span>
        </div>
      </div>
    </div>
  );
}
export {getReadableFileSizeString};
export default PopUp;
