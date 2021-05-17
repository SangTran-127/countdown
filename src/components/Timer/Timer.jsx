import React, {useCallback, useEffect, useState} from 'react';
import './index.css'

function Timer() {
    const [label, setLabel] = useState({
        noti: 'Sat, 15 May 2021 00:00:00 07:00GMT',
        status: 'Event start in'
    })
    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const [deadline, setDeadline] = useState('2021-05-15')
    const [change, setChange] = useState(deadline)
    const renderItems = (time, value) => (
        <div className = "timer_items">
            <div className = "timer_time">{time}</div>
            <div className = "timer_tag">{value}</div>
        </div>
    )
    const formatDate = (date) => {
        const utc = new Date(date).toUTCString();
        setLabel({noti: utc, status:'Event start in'})
    }
    const handleChange = (event) => {
        const newChange = event.target.value;
        setChange(newChange)
        console.log(newChange);
    }
    const updateDeadline = () => {
        setDeadline(change)
    }
 
    const countDown = useCallback((deadline) => {
        const time = Date.parse(deadline) - Date.parse(new Date())
        if (time < 0) {
            setLabel({status: 'EVENT PASSED !!!'})
        } else {
            const seconds = Math.floor((time / 1000) % 60)
            const minutes = Math.floor((time / 1000 / 60) % 60)
            const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
            const days = Math.floor((time / (1000 * 60 * 60 * 24)))
            setTime({
                days,
                hours,
                minutes,
                seconds
            })
            formatDate(deadline)
        }
    }, [])
        useEffect(() => {
            const countInterval = setInterval(()=> countDown(deadline), 1000)
            return () => {
                clearInterval(countInterval)
            }
        })
  return (
        <div className = "timer_wrapper">
            <div className = "timer_deadline">
                {label.noti}
            </div>
            <div className = "timer_top">
                {label.status}
            </div>
            <div className = "timer_bottom"> 
                {renderItems(time.days, 'days')}
                {renderItems(time.hours, 'hours')} 
                {renderItems(time.minutes, 'min')} 
                {renderItems(time.seconds, 'sec')} 
            </div>
            <div className = "timer_input">
                <label for="start">Start date:</label>
                <input type="date" id="start" name="trip-start"
                value={change} onChange={handleChange}
                min="2018-01-01" max="2077-12-31"/>
                <hr/>
                <button onClick = {updateDeadline}>Change Deadline</button>
            </div>
        </div>
  )
}
export default Timer;