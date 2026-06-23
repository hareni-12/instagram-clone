import React, { useState, useEffect } from "react";
import StoryViewer from "./StoryViewer";

export default function Stories() {

  const [stories, setStories] = useState([]);
  const [viewedIds, setViewedIds] = useState([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerStartIndex, setViewerStartIndex] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3000/stories")
      .then(res => res.json())
      .then(data => setStories(data))
      .catch(err => console.log("Error loading stories:", err));
  }, []);
  const markViewed = (id) => {
    setViewedIds(prev => {
      if(prev.includes(id)){
        return prev;
      }
      return [...prev, id];
    });
  };
  const openViewer = (index) => {
    setViewerStartIndex(index);
    setViewerOpen(true);
  };
  return (
    <>
      <div className="container mt-4 d-flex justify-content-center">
        <div
          className="d-flex flex-row py-2"
          style={{
            overflowX:"auto",
            whiteSpace:"nowrap",
            width:"100%",
            maxWidth:"470px",
            gap:"16px",
            scrollbarWidth:"none",
            msOverflowStyle:"none"
          }}
        >
        {
          stories.length > 0 ?
          stories.map((story,index)=>{
            const viewed = viewedIds.includes(story.id);
            return (
              <div
                key={story.id}
                className="d-flex flex-column align-items-center"
                style={{
                  cursor:"pointer",
                  minWidth:"72px"
                }}
                onClick={()=>openViewer(index)}
              >
                {/* Story ring */}
                <div
                  className={
                    viewed
                    ? "story-grey-ring"
                    : "story-gradient-ring"
                  }
                >
                  {/* Inner gap */}
                  <div className="story-gap">
                    <img
                      src={story.profilePic}
                      alt={story.username}
                      className="story-profile-image"
                    />
                  </div>
                </div>
                {/* Username */}
                <span className="story-username">
                  {story.username}
                </span>
              </div>
            )
          })
          :
          (
            <p className="text-muted">
              Loading Stories...
            </p>
          )
        }
        </div>
      </div>
      {/* Story Viewer */}
      {
        viewerOpen && (
          <StoryViewer
            stories={stories}
            startIndex={viewerStartIndex}
            onClose={()=>setViewerOpen(false)}
            onMarkViewed={markViewed}
          />
        )
      }
    </>
  );
}