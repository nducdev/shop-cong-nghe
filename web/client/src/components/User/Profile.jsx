import '../../styles/Profile.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'
import { updateUser, uploadImage } from '../../api/userApi'

const Profile = (props) => {
    const auth = useSelector((state) => state.auth.login.currentUser)

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [selectedImg, setSelectedImg] = useState(null)

    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const handleSelectFile = (e) => {
        const selectedFile = e.target.files[0]
        const imageSelectedFile = URL.createObjectURL(selectedFile)

        setImage(selectedFile)
        setSelectedImg(imageSelectedFile)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('image', image)

            const responsedImage = await uploadImage(formData, auth?.accessToken, axiosJWT)
            console.log(responsedImage?.imageUrl)

            if (responsedImage) {
                const data = JSON.stringify({
                    username: username,
                    email: email,
                    phone: phone,
                    name: name,
                    avatar: responsedImage?.imageUrl
                })

                const res = await updateUser(data, auth?.accessToken, axiosJWT)

                if (res?.status === 'success') {
                    const updatedAuth = {
                        ...auth,
                        data: {
                            ...auth.data,
                            username: username ? username : auth?.data?.username,
                            email: email ? email : auth?.data?.email,
                            phone: phone ? phone : auth?.data?.phone,
                            name: name ? name : auth?.data?.name,
                            avatar: responsedImage?.imageUrl ? responsedImage?.imageUrl : auth?.data?.avatar
                        }
                    }

                    dispatch(loginSuccess(updatedAuth))
                }
            }

            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <span>My Profile</span>
                <span>Manage your account to ensure account security.</span>
            </div>
            <div className="profile-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-wrapper">
                        <table>
                            <tr>
                                <td className="label-name">
                                    <label htmlFor="">Username</label>
                                </td>
                                <td className="input-field">
                                    <input
                                        type="text"
                                        placeholder={props.username ? props.username : 'Not set yet.'}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="label-name">
                                    <label htmlFor="">Name</label>
                                </td>
                                <td className="input-field">
                                    <input
                                        type="text"
                                        placeholder={
                                            props.name ? props.name : 'Not set yet. (First Name + Last Name)'
                                        }
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="label-name">
                                    <label htmlFor="">Email</label>
                                </td>
                                <td className="input-field">
                                    <input
                                        type="text"
                                        placeholder={props.email ? props.email : 'Not set yet.'}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="label-name">
                                    <label htmlFor="">Phone</label>
                                </td>
                                <td className="input-field">
                                    <input
                                        type="text"
                                        placeholder={props.phone ? props.phone : 'Not set yet.'}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </table>
                        <div className="profile-avatar">
                            {selectedImg ? (
                                <img src={selectedImg} alt="" />
                            ) : (
                                <img src={props?.avatar} alt="" />
                            )}
                            <label htmlFor="avatar-upload">
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    id="avatar-upload"
                                    onChange={handleSelectFile}
                                />
                                <button>Select Image</button>
                            </label>
                        </div>
                    </div>
                    <div className="form-btn">
                        <button>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
