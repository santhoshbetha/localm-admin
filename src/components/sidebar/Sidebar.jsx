import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Search,
    PlayCircleOutline,
    List,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
    AddToQueue,
    QueuePlayNext,
  } from '@mui/icons-material';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                <Link to="/" className="link">
                    <li className="sidebarListItem active">
                    <LineStyle className="sidebarIcon" />
                    Home
                    </li>
                </Link>
                <Link to="/users" className="link">
                    <li className="sidebarListItem">
                    <PermIdentity className="sidebarIcon" />
                    Users
                    </li>
                </Link>
                <Link to="/search" className="link">
                    <li className="sidebarListItem">
                    <Search className="sidebarIcon" />
                    Search User
                    </li>
                </Link>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Notifications</h3>
                <ul className="sidebarList">
                <li className="sidebarListItem">
                    <MailOutline className="sidebarIcon" />
                    Mail
                </li>
                <li className="sidebarListItem">
                    <DynamicFeed className="sidebarIcon" />
                    Feedback
                </li>
                <li className="sidebarListItem">
                    <ChatBubbleOutline className="sidebarIcon" />
                    Messages
                </li>
                </ul>
            </div>
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Staff</h3>
                <ul className="sidebarList">
                <li className="sidebarListItem">
                    <WorkOutline className="sidebarIcon" />
                    Manage
                </li>
                <li className="sidebarListItem">
                    <Report className="sidebarIcon" />
                    Reports
                </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

