"use client"
import { cache } from 'react'

// export const collectData = cache(async )

export const navToggle = (event: Event) => {
    let target = event.target; // cache this target assignment
    // target.toggleAttribute("aria-expanded", true);
    document.getElementById('main-nav-toggle')?.getAttribute("aria-expanded") === 'true' ?
    document.getElementById('main-nav-toggle')?.setAttribute("aria-expanded", "false") :
    document.getElementById('main-nav-toggle')?.setAttribute("aria-expanded", "true");
    // document.getElementById('svg-close')?.classList.toggle('hidden');
    // document.getElementById('svg-hamburger')?.classList.toggle('hidden');
    document.getElementById('main-nav-list')?.classList.toggle('invisible');
    // target.querySelector('svg-close').classList.toggle("hidden");
    // target.querySelector('svg-hamburger').classList.toggle("hidden");
    console.log(target)
}

export const sidebarToggle = (event: Event) => {
    if(document.getElementById('sidebar-toggle')?.getAttribute("aria-expanded") === 'true') {
        document.getElementById('sidebar-toggle')?.setAttribute("aria-expanded", "false");
        document.getElementById('sidebar-nav-list')?.classList.add('hidden');
    } else {
        document.getElementById('sidebar-toggle')?.setAttribute("aria-expanded", "true");
        document.getElementById('sidebar-nav-list')?.classList.remove('hidden');
    }
    
}