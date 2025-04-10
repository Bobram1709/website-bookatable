import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";

export default function ContentWrapper({ htmlContent }) {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (htmlContent) {
      setSanitizedContent(htmlContent);
    }
  }, [htmlContent]);

  return (
    <>
      {sanitizedContent ? (
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      ) : (
        <></>
      )}
    </>
  );
}
