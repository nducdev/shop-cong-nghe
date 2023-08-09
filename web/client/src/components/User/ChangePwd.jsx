import { useState } from 'react'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'
import '../../styles/ChangePwd.scss'
import { useDispatch, useSelector } from 'react-redux'
import { changePwd } from '../../api/userApi'

const ChangePwd = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [oldPwd, setOldPwd] = useState()
    const [pwd, setPwd] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = JSON.stringify({
                oldPassword: oldPwd,
                password: pwd
            })

            await changePwd(data, auth?.accessToken, axiosJWT)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="change-pwd-container">
            <div className="change-pwd-header">
                <span>Change Password</span>
                <span>Change your password here.</span>
            </div>
            <div className="change-pwd-field">
                <form onSubmit={handleSubmit}>
                    <div className="form-wrapper">
                        <table>
                            <tr>
                                <td className="label-name">
                                    <label htmlFor="">Current Password</label>
                                </td>
                                <td className="input-field">
                                    <input
                                        type="password"
                                        placeholder="Enter current password."
                                        onChange={(e) => setOldPwd(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="label-name">
                                    <label htmlFor="">New Password</label>
                                </td>
                                <td className="input-field">
                                    <input
                                        type="password"
                                        placeholder="Enter new password."
                                        onChange={(e) => setPwd(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="form-btn">
                        <button>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePwd
