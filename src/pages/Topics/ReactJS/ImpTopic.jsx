import React from 'react'
import batchingimg from '../../../assets/batching.jpeg'

export default function ImpTopic() {
  return (
    <>
      <article className="real-dom-card highlight">
        <div>
          ⚡ Side Effect kya hota hai?

          Jo kaam UI ke bahar ka hai:

          API call 📡

          Timer ⏱️

          Event listener 🎧

          Local storage 💾
        </div>
      </article>
      <article className="real-dom-card highlight mt-2">
        <img src={batchingimg} alt="" width={500} />

      </article>
    </>
  )
}
