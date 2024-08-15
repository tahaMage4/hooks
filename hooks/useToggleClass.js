import { useEffect } from "react";

export const useToggleClass = (selector, className, condition) => {
   useEffect(() => {
      const elements = document.querySelectorAll(selector);

      if (elements) {
         elements.forEach((element) => {
            if (condition) {
               element.classList.add(className);
            } else {
               element.classList.remove(className);
            }
         });
      }
   }, [selector, className, condition]);
};

// Usage

import React, { useState } from "react";
import { useToggleClass } from "./hooks/useToggleClass"; // Adjust the path as needed

const MyComponent = () => {
   const [showError, setShowError] = useState(false);

   // Toggle class based on the condition
   useToggleClass(".my-element", "error", showError);

   return (
      <div>
         <button onClick={() => setShowError(!showError)}>
            {showError ? "Hide Error" : "Show Error"}
         </button>
         <div className="my-element">This is an element</div>
      </div>
   );
};

export default MyComponent;
