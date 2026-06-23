import React from 'react'
import Stories from './Stories'
import Posts from './Posts'
function Feed({darkMode})
 {
  return (
  <div>
    <Stories/> 
    <Posts darkMode={darkMode}/>
  </div>
  );
}

export default Feed;