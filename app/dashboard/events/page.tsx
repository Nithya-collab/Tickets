import Link from 'next/link';
import React from 'react';

const MyComponent = () =>{
    return (
      <div> 
        <h1> Current Events you Posted ... </h1>
        <div style={{display:'grid',gridTemplate:'column',padding:'10px'}}>
            <Link href={`/events/concert`}>Concert</Link>
            <Link href={'/events/conference'}>Conference</Link>
            <Link href={'/events/sports'}>Sports</Link>
        </div>
      </div>

    );
}

export default MyComponent;