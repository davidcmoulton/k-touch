# k-touch
Not content with a traditional [Konami-code](http://en.wikipedia.org/wiki/List_of_Konami_code_games)-activated easter egg on your site?

Troubled that touch screen users are locked out of such geek essentials?

Then your worries are over: here is some ***touch-enabled Konami code action!***

## What it does
k-touch provides touch-screen-actuated Konami-code-driven functionality, ***and*** throws in the traditional keyboard-entered Konami code mechanism for extra fun.

This implentation plays audio using html5 audio.

If you're using it on a touch device, it also uses canvas. And touch events, obviously.


## How to use it
1. Copy the js, css and assets directories to your site;

2. include a reference to k-code.js and k-code.css in your html file (see demo.html for an example);

3. then either:

    a. load your page in a desktop browser and enter the Konami code, or:

    b. load your page on a touch-enabled device, and begin to swipe the Konami code (swipe up for up... you get the idea). You should be given the facility to enter B and A at the right moment, assuming you've got it right up to that point.

Try this [live demo](http://davidcmoulton.github.io/k-touch/demo.html). (It will be a blank page if touch isn't supported; it will say "touch supported" and echo the touch to the screen if touch is supported.)


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

This also doesn't currently work on Chrome on Android. The swipe gestures are received, but the touch event on the canvas B and A buttons isn't detected for reasons I haven't got to the bottom of yet.

It won't work on proxy browsers, like Opera Mini and Dolphin Mini.

## Notes
Currently this logs keycodes to the console, and records the swipe gestures and button presses received in-page within <code>div#debug</code>.

It also uses <code>div#msg</code> to indicate if touch support has been detected.

This hasn't been tested on devices that support both touch and have a keyboard, so I'll be interested to see how it works on, say, a Chromebook Pixel.

This could be improved by using some kind of formal logger, but that's not a priority. Actually, this could be improved in many ways, but it was built for fun :-) That said, if there's something specific you'd like to see in, fork it and send me a pull request :-)

## Licence
This work is available under the MIT licence: http://davidcmoulton.mit-license.org

