# k-touch
Not content with a traditional Konami-code-activated easter egg on your site?

Troubled that touch screen users are locked out of such geek essentials?

Then your worries are over: here is some ***touch-enabled Konami code action***!

## What it does
konami-touch provides touch-screen-actuated Konami code driven functionality, ***and*** additionally throws in the traditional keyboard-entered Konami code mechanism for extra fun.

This implentation plays audio using html5 audio.

If you're using it on a touch device, it also uses canvas.


## How to use it
1. Copy the js, css and assets directories to your site;

2. include a reference to k-code.js and k-code.css in your html file (see demo.html for an example);

3. then either:

    a. load your page in a desktop browser and enter the Konami code, or:

    b. load your page on a touch-enabled device, and begin to swipe the Konami code. You should be given the facility to enter B and A at the right moment, assuming you've got it right up to that point.


## Where does it work? 
This should work on all desktop browsers that support html5 audio.

It has also been tested sucessfully on:
    
+ Firefox on Android ICS & Jellybean

+ Opera mobile (webkit version) on Android ICS & Jellybean

+ Built in browser on Android ICS

+ Dolphin browser on Android ICS & Jellybean

+ Safari on iPad iOS 6


## Where doesn't it work?
This won't work on browsers that don't support html5 audio (and canvas touch events, for touch devices). Polyfilled IE 8 hasn't been tested, so you'll have to try it and see. 

This also doesn't currently work on Chrome on Android. The swipe guestures are received, but the touch event on the canvas B and A buttons isn't detected for reasons I haven't got to the bottom of yet.

It won't work on proxy browsers (Opera Mini and Dolphin Mini).


