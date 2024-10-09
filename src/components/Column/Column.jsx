import React, { useMemo } from 'react';
import Card from '../Card/Card.jsx';
import './Column.css';
import { getPriorityIcon, getStatusIcon } from '../../utils/helper.jsx';
import addIcon from '../../icons/add.svg';
import dotMenuIcon from '../../icons/3 dot menu.svg'
import userProfilePic from "../../icons/user.png";

function Column({ tickets, grouping, groupBy, userIdToData }) {
    const title = useMemo(() => {
        if (grouping === 'status') return groupBy;
        if (grouping === 'priority') return groupBy;
        if (grouping === 'user') return userIdToData[groupBy]?.name;
    }, [grouping, groupBy, userIdToData]);

    const icon = useMemo(() => {
        if (grouping === 'status') return getStatusIcon(groupBy);
        if (grouping === 'priority') return getPriorityIcon(groupBy);
        if (grouping === 'user') {
            const user = userIdToData[groupBy];
            return user ? <div className="user-avatar-wrapper">
            <img src={userProfilePic} alt="User" className="user-avatar" />
            <span className={`active-status ${userIdToData[groupBy].available ? "active" : ""}`}></span>
          </div> : null;
        }
    }, [grouping, groupBy, userIdToData]);

    return (
        <div className='column'>
            <div className='column-header'>
                <div className='column-header-left-container'>
                    {icon}
                    <div className='column-title'>
                        {title}
                        <span className='count'>{tickets.length}</span>
                    </div>
                </div>
                <div className='column-header-right-container'>
                    <img src={addIcon} alt="addIcon" />
                    <img src={dotMenuIcon} alt="dotMenuIcon" />
                </div>
            </div>
            <div className='cards-container'>
                {tickets.map((ticket) => (
                    <Card
                        key={ticket.id}
                        userData={userIdToData[ticket.userId]}
                        ticket={ticket}
                        hideStatusIcon={grouping === 'status'}
                        hideProfileIcon={grouping === 'user'}
                        hidePriorityIcon={grouping === 'priority'}
                    />
                ))}
            </div>
        </div>
    );
}

export default Column;
