import Event from '/admin/preview-templates/event.js'
import Page from '/admin/preview-templates/page.js'
import { cs } from 'netlify-cms-locales'

CMS.registerLocale('cs', cs)

// Register the Event component as the preview for entries in the blog collection
CMS.registerPreviewTemplate("event", Event)
CMS.registerPreviewTemplate("pages", Page)

CMS.registerPreviewStyle("/_includes/assets/css/inline.css");
// Register any CSS file on the home page as a preview style
fetch("/")
  .then(response => response.text())
  .then(html => {
    const f = document.createElement("html");
    f.innerHTML = html;
    Array.from(f.getElementsByTagName("link")).forEach(tag => {
      if (tag.rel == "stylesheet" && !tag.media) {
        CMS.registerPreviewStyle(tag.href);
      }
    });
  });
