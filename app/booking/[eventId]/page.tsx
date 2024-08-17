import React from 'react'

function Bookings({params}) {
  return (
    <div>
       <h1> Users Booking Page ..</h1> 
       <div> Booking Success for {params.eventId} </div>
    </div>
  )
}

export default Bookings;