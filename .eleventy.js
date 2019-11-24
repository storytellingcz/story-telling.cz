const { DateTime } = require('luxon')
const Sass = require('node-sass')
const UglifyJS = require('uglify-es')
const htmlmin = require('html-minifier')

module.exports = function (config) {
  config.addLayoutAlias('event', 'layouts/event.njk')

  // Date formatting (human readable)
  config.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy')
  })

  // Date formatting (machine readable)
  config.addFilter('machineDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd')
  })

  // Convert Sass to CSS
  config.addFilter('sass', (data) => {
    return Sass.renderSync({ data })
  })

  // Minify JS
  config.addFilter('jsmin', (code) => {
    const minified = UglifyJS.minify(code)
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error)
      return code
    }
    return minified.code
  })

  // Minify HTML output
  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.indexOf('.html') > -1) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
    }
    return content
  })

  // only content in the `posts/` directory
  config.addCollection('posts', (collection) => {
    return collection.getAllSorted().filter((item) => {
      return item.inputPath.match(/^\.\/posts\//) !== null
    })
  })

  // Don't process folders with static assets e.g. images
  config.addPassthroughCopy('favicon.ico')
  config.addPassthroughCopy('imgs')
  config.addPassthroughCopy('admin')
  config.addPassthroughCopy('_includes/assets/')

  /* Markdown Plugins */
  const markdownIt = require('markdown-it')
  const markdownItAnchor = require('markdown-it-anchor')
  const options = {
    html: true,
    breaks: true,
    linkify: true,
  }
  const opts = {
    permalink: false,
  }

  config.setLibrary('md', markdownIt(options)
    .use(markdownItAnchor, opts)
  )

  return {
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use '' or '/' (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: '/',

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: 'dist',
    },
  }
}
