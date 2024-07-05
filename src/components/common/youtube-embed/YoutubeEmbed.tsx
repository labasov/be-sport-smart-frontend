import React from "react";

import { useDynamicTranslation } from "../../../hooks/UseTranslation";
import "./YoutubeEmbed.css";

interface YoutubeEmbedProps {
  embedId: string;
  titleKey: string;
}

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ embedId, titleKey }) => (
  <div className="video-responsive">
    <iframe
      // width="100%"
      // height="100%"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title={useDynamicTranslation().t(titleKey)}
    />
  </div>
);