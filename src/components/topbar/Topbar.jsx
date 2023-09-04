import "./topbar.css";
import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import defaultuser from '../../assets/img/defaultuser.png'

export default function Topbar() {
  return (
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logo">admin</span>
            </div>
            <div className="topRight">
                <div className="topbarIconContainer" hidden>
                    <NotificationsNone />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer" hidden>
                    <Language />
                    <span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer" hidden>
                    <Settings />
                </div>
                <img src={defaultuser} alt="" className="topAvatar bg-info border border-2 border-info" />
            </div>
        </div>
    </div>
  )
}

