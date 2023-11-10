
# JSGame - log

A super system to log your applications

Start by making: 
```js
require("store").set("@jsgame/log.dir", __THE_DIRECTORY_WHERE_DO_YOU_WANT_TO_PUT_THE_LOGS)
```

and then, start logging !!!

BEFORE QUITTING YOUR APP: MAKE THAT:
```js
require("jsgame-log").quit(__CALLBACK__)
```

