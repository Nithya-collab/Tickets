import Link from 'next/link';
import React from 'react';

const MyComponent = () =>{
    return (
      <div>
          <div> Welcome to Events for Public  </div>
          <div style={{display:'grid',gridTemplate:'column',padding:'10px'}}>
            <Link href={`/events/concert`}>Concert</Link>
            <Link href={'/events/conference'}>Conference</Link>
            <Link href={'/events/sports'}>Sports</Link>
            <Link href={'/events/music'}>Music</Link>
            <Link href={'/events/live'}>Live-Interviews</Link>
          </div>
      </div>

    );
}

export default MyComponent;