self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/index.js"
    ],
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/become-teacher": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/become-teacher.js"
    ],
    "/classes": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/classes.js"
    ],
    "/create-course": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/create-course.js"
    ],
    "/login": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/login.js"
    ],
    "/platform": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/platform.js"
    ],
    "/teacher-login": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/teacher-login.js"
    ],
    "/teacher-plans": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/teacher-plans.js"
    ],
    "/teacher-platform": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/teacher-platform.js"
    ],
    "/teachers": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/teachers.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];