// components/IframeContentReader.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

interface IframeContentReaderProps {
  url: string;
}

const IframeContentReader: React.FC<IframeContentReaderProps> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        if (iframe.contentDocument) {
          // Attempt to read the iframe's content
          const iframeContent =
            iframe.contentDocument.documentElement.outerHTML;
          setContent(iframeContent);

          // Attempt to find and extract the image src
          const imgElement = iframe.contentDocument.querySelector(
            "img.img-fluid.responsive-img"
          ) as HTMLImageElement;
          if (imgElement && imgElement.src) {
            console.log("Found image src:", imgElement.src);
          } else {
            console.log("Image not found in iframe content");
          }
        } else {
          setError(
            "Unable to access iframe content. This may be due to security restrictions."
          );
        }
      } catch (err) {
        setError(
          "Error accessing iframe content: " +
            (err instanceof Error ? err.message : String(err))
        );
      }
    };

    iframe.addEventListener("load", handleLoad);

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [url]);

  return (
    <div>
      <iframe
        ref={iframeRef}
        src={url}
        style={{ width: "100%", height: "500px", border: "none" }}
        sandbox="allow-same-origin"
      />
      {error && <p>Error: {error}</p>}
      {content && (
        <div>
          <h3>Iframe Content:</h3>
          <pre style={{ maxHeight: "200px", overflow: "auto" }}>{content}</pre>
        </div>
      )}
    </div>
  );
};

export default IframeContentReader;
