---
title: "Gallery"
layout: "single"
showToc: true
TocOpen: true
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/css/lightgallery-bundle.min.css" />

<style>
  /* Force the theme to style the Markdown H3 headers in BC Maroon */
  h3 {
    color: #8a100b !important;
    margin-top: 50px !important;
    border-bottom: 2px solid #8a100b !important;
    padding-bottom: 10px !important;
    font-weight: 700 !important;
  }
</style>

# Research & Fieldwork Gallery
*Visualizing innovation in STEM and language education.*

<hr style="border: 0; height: 1px; background: #8a100b; margin: 20px 0; opacity: 0.2;">

### Category 1

<div class="category-gallery" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px; margin-bottom: 40px;">
  
  <a href="images/1.jpg" style="text-decoration: none !important; border: none !important;" data-sub-html="<div style='text-align: center;'><h4 style='color:#fff; margin-bottom: 5px;'>Science Inquiry</h4><p style='color:#ccc; margin: 0;'>Emergent bilinguals in STEM.</p></div>">
    <div style="background: #fdfdfd; border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <img src="images/1.jpg" style="width: 100%; height: 200px; object-fit: cover; display: block;">
      <div style="padding: 15px;">
        <strong style="color: #1a1a1a !important; display: block; margin-bottom: 5px; font-size: 1.05rem;">To-be-filled</strong>
        <span style="color: #4a4a4a; font-size: 0.9rem;">To-be-filled</span>
      </div>
    </div>
  </a>

  <a href="images/3.jpg" style="text-decoration: none !important; border: none !important;" data-sub-html="<div style='text-align: center;'><h4 style='color:#fff; margin-bottom: 5px;'>Collaborative Writing</h4><p style='color:#ccc; margin: 0;'>Digital wikis in ESL.</p></div>">
    <div style="background: #fdfdfd; border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <img src="images/3.jpg" style="width: 100%; height: 200px; object-fit: cover; display: block;">
      <div style="padding: 15px;">
        <strong style="color: #1a1a1a !important; display: block; margin-bottom: 5px; font-size: 1.05rem;">To-be-filled</strong>
        <span style="color: #4a4a4a; font-size: 0.9rem;">To-be-filled</span>
      </div>
    </div>
  </a>

</div>

### Category 2

<div class="category-gallery" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">

  <a href="images/2.jpg" style="text-decoration: none !important; border: none !important;" data-sub-html="<div style='text-align: center;'><h4 style='color:#fff; margin-bottom: 5px;'>Digital Storytelling</h4><p style='color:#ccc; margin: 0;'>Identity construction.</p></div>">
    <div style="background: #fdfdfd; border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <img src="images/2.jpg" style="width: 100%; height: 200px; object-fit: cover; display: block;">
      <div style="padding: 15px;">
        <strong style="color: #1a1a1a !important; display: block; margin-bottom: 5px; font-size: 1.05rem;">To-be-filled</strong>
        <span style="color: #4a4a4a; font-size: 0.9rem;">To-be-filled</span>
      </div>
    </div>
  </a>

  <a href="images/4.jpg" style="text-decoration: none !important; border: none !important;" data-sub-html="<div style='text-align: center;'><h4 style='color:#fff; margin-bottom: 5px;'>Conference Dissemination</h4><p style='color:#ccc; margin: 0;'>Sharing research insights.</p></div>">
    <div style="background: #fdfdfd; border-radius: 12px; overflow: hidden; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
      <img src="images/4.jpg" style="width: 100%; height: 200px; object-fit: cover; display: block;">
      <div style="padding: 15px;">
        <strong style="color: #1a1a1a !important; display: block; margin-bottom: 5px; font-size: 1.05rem;">To-be-filled</strong>
        <span style="color: #4a4a4a; font-size: 0.9rem;">To-be-filled</span>
      </div>
    </div>
  </a>

</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/lightgallery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/plugins/thumbnail/lg-thumbnail.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/plugins/zoom/lg-zoom.min.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const galleries = document.querySelectorAll('.category-gallery');
        galleries.forEach(gallery => {
            lightGallery(gallery, {
                selector: 'a', 
                plugins: [lgThumbnail, lgZoom],
                licenseKey: '0000-0000-000-0000',
                speed: 500,
                thumbnail: true,
                showThumbByDefault: true,
                download: false,
                getCaptionFromTitleOrAlt: false
            });
        });
    });
</script>