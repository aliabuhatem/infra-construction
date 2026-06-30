import React from "react";

// Fix for: "JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists"
//
// This project has TS enabled (strict: true) but may be missing the standard Next/React
// JSX type declarations in some environments. Providing a minimal IntrinsicElements
// unblocks compilation while still preserving React's component typing.

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};

