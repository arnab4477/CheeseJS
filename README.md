# CheeseJS

CheeseJS is a simple Web Component library for creating customizable Chess UI

# Usage

If you are using React, Vue or any other 3rd party library, then first install the CheeseJS package

    npm install @arnab7/cheesejs

Then in your index.js (or equivalent) file, type

    import { defineCustomElements } from '@arnab7/cheesejs'
    
    defineCustomElements(window)

After this, you will be able to use the components anywhere in the project. For example in React

    const App = () => {
        return (
            <div>
                <chess-board light="lightgray" dark="darkbrown" ><chess-board />
            <div/>
        )
      }

If you want to use the components in a Vanillajs project, or for further information, [read this article from the official documentation](https://stenciljs.com/docs/distribution)

# Caution

This library may not work with projects built with Vite. Vite has some unfixed bugs regarding dynamically imported libraries and can cause bugs. 
