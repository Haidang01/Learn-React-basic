
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";

const Infor = (props) => {
    const { email, userName, role, previewImage, image, handleUpLoadImage, setUserName } = props;

    return (
        <>
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" disabled value={email} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <input type="text" className="form-control" disabled value={role} />
                </div>
                <div className='col-md-12'>
                    <label className="form-label label-upload" htmlFor='labelUpload' >
                        <FcPlus />
                        Uploand File Image
                        <input type="file" hidden id='labelUpload' onChange={(event) => handleUpLoadImage(event)} />
                    </label>
                </div>
                <div className="col-md-12 img-preview">
                    {previewImage ?
                        <img src={previewImage} width="100" height="100" />
                        :
                        <span>preview image</span>
                    }
                </div>
            </form>
        </>
    )
}
export default Infor;