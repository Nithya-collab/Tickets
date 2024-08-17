import Link from 'next/link'
import React from 'react'

function Event ({params}) {
  return (
    <div>
        <h1> Event Details for Event : {params.eventId} </h1> 
        <Link href={`/booking/${params.eventId}`}><button className='btn btn-success'> Booking </button></Link> 
    </div>
  )
}

export default Event