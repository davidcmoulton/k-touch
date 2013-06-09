/* Plays an audio file using html5 audio API in response to the Konami code
 * being entered via the keyboard, or by swiping.
 * When swiping, a controller is displayed at the end to enable capture of
 * the B + A portion of the K code.
 */
(function () {
    "use strict";
    // keyCodes
    var UP = 38,
        DOWN = 40,
        LEFT = 37,
        RIGHT = 39,
        B = 66,
        A = 65,
        konami = [UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A],
        correctActionCount = 0,
        nextAction = konami[correctActionCount],
        usingTouch = false,
        buttonsLoaded = false,
        btns = null,

        // will contain starting and ending X and Y coords of touch gesture
        actionCoords = {
            startX: null,
            startY: null,

            endX: null,
            endY: null
        },

        audioFileRoot = 'assets/tones',
        aud = document.createElement('audio'),

        reset = function () {
            correctActionCount = 0;
            nextAction = konami[correctActionCount];
        },
        success = function () {
            aud.play();
            reset();
        },

        setHeight = function () {
            window.outerHeight = (window.screen.height / 3) * 2;
        },

        setupAudio = function () {
            var extension = '',
                kickoff = function () {
                    aud.play();
                    aud.pause();
                    document.documentElement.removeEventListener('click', kickoff, true);
                };

            if (aud.canPlayType('audio/mpeg')) {
                extension = 'mp3';
            } else if (aud.canPlayType('audio/ogg')) {
                extension = 'ogg';
            } else {
                return false;
            }
            aud.src = audioFileRoot + '.' + extension;
            aud.autobuffer = true;
            // needed for older UAs
            aud.load();
            document.documentElement.addEventListener('click', kickoff, true);
        },

        respondTo = function (input) {
            // current action was the next correct step in the sequence
            if (input === nextAction) {
                console.log('input: ' + input);
                // complete sequence correct
                if (correctActionCount === konami.length - 1) {
                    success();
                } else {
                    // sequence not yet complete
                    correctActionCount += 1;
                    nextAction = konami[correctActionCount];
                }
                // if using touch, display controller when ready for B A input
                if (usingTouch && (nextAction === B || nextAction === A) && buttonsLoaded) {
                    (document.getElementsByTagName('canvas')[0]).style.display = 'block';
                }
            // current action not next correct step in sequence
            } else {
                // reset sequence
                reset();
                // handle if incorrect key restarts sequence
                if (input === konami[0]) {
                    correctActionCount = 1;
                    nextAction = konami[correctActionCount];
                }
            }
        },

        // listen for konami key sequence
        setupKeyEvents = function () {
            document.addEventListener('keyup', function (e) {
                respondTo(e.keyCode);
            }, false);
        },

        // listen for konami touch sequence
        setupTouchEvents = function () {
            var determineSwipeDirection = function (action) {
                    var itm,
                        deltaX,
                        deltaY,
                        absDeltaX,
                        absDeltaY,
                        tmpXY,
                        threshold = 100, // tweak this value to fine tune swipe detection
                        dbg = document.getElementById('debug') || {};
                    // coord differences between start and end point of touch
                    deltaX = action.endX - action.startX;
                    deltaY = action.endY - action.startY;

                    absDeltaX = Math.abs(deltaX);
                    absDeltaY = Math.abs(deltaY);

                    // if differences > threshold in either plane, it's significant
                    if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
                        if (absDeltaY > 1.5 * absDeltaX) {
                            if (deltaY > threshold) {
                                respondTo(DOWN);
                                console.log('swipe down');
                                dbg.innerHTML = dbg.innerHTML + ', down';

                            } else if (deltaY < -threshold) {
                                respondTo(UP);
                                console.log('swipe up');
                                dbg.innerHTML = dbg.innerHTML + ', up';
                            }
                        } else if (absDeltaX > 1.5 * absDeltaY) {
                            if (deltaX > threshold) {
                                respondTo(RIGHT);
                                console.log('swipe right');
                                dbg.innerHTML = dbg.innerHTML + ', right';
                            } else if (deltaX < -threshold) {
                                respondTo(LEFT);
                                console.log('swipe left');
                                dbg.innerHTML = dbg.innerHTML + ', left';
                            }
                        }
                    }
                },
                terminateTouch = function (ev) {
                    // record ending X, Y of touch in the action object
                    actionCoords.endX = ev.changedTouches[0].screenX;
                    actionCoords.endY = ev.changedTouches[0].screenY;
                    determineSwipeDirection(actionCoords);

                };

            document.addEventListener('touchstart', function (e) {
                // record starting X, Y of touch in the action object
                e.preventDefault();
                actionCoords.startX = e.touches[0].screenX;
                actionCoords.startY = e.touches[0].screenY;
            }, false);

            document.addEventListener('touchend', function (e) {
                e.preventDefault();
                terminateTouch(e);
            }, false);

            document.addEventListener('touchcancel', function (e) {
                e.preventDefault();
                terminateTouch(e);
            }, false);
        },

        drawButtons = function (img, xPos, yPos, width, height) {
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                buttonsLoaded = true,
                dbg = document.getElementById('debug'),

                // An onclick handler for a canvas tag. Assumes a path is currently defined.
                hittest = function (canvas, xIn, yIn) {
                    var c = canvas.getContext("2d"),
                        // Get the canvas size and position
                        bb = canvas.getBoundingClientRect(),
                        // Convert mouse event coordinates to canvas coordinates
                        x = (xIn-bb.left)*(canvas.width/bb.width),
                        y = (yIn-bb.top)*(canvas.height/bb.height);

                    // Register button click
                    if (c.isPointInPath(x,y)) {
                        if (x < 340) { // button B
                            respondTo(B);
                            dbg.innerHTML += ', B';
                        } else {
                            respondTo(A);
                            dbg.innerHTML += ', A';
                        }
                    }};
            document.getElementsByTagName('body')[0].appendChild(canvas);

            canvas.width = width;
            canvas.height = height
            // insert the image
            ctx.drawImage(img, xPos, yPos);

            // create path overlays on the buttons, then detect clicks on these paths
            ctx.beginPath();
            ctx.strokeStyle = '#fd4d55';
            ctx.fillStyle = '#fd4d55';
            ctx.lineWidth = 5;
            ctx.arc(315, 165, 20, 0, (Math.PI/180)*360, false);
            ctx.moveTo(375, 165);
            ctx.arc(375, 165, 20, 0, (Math.PI/180)*360, false);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            canvas.addEventListener('click', function (e) {
                hittest(this, e.clientX, e.clientY); // 'this' is the canvas target of the event
            }, false);
            canvas.addEventListener('touchstart', function (e) {
                hittest(this, e.touches[0].screenX, e.touches[0].screenY); // 'this' is the canvas target of the event
            }, false);
        },

        setup = function () {
            btns = document.createElement('img');
            btns.className = 'controller';
            btns.src = 'assets/nintendo-controller.png';
            setHeight(); // why?
            setupAudio();
            setupKeyEvents();

            if (window.TouchEvent !== undefined) {
                usingTouch = true;
                setupTouchEvents();
                document.getElementById('msg').innerHTML = 'touch supported';
            }

            btns.onload = function () {
                // Passed arguments: btns, xPos, yPos, width, height
                //  where width and height are the intrinsic dimensions of
                //  the image loading into buttons.

                drawButtons(btns, 0, 0, btns.naturalWidth, btns.naturalHeight);
                buttonsLoaded = true;
            };

        };

    setup();
}());