---
title: "Gallery"
layout: "single"
showToc: true
TocOpen: true
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/css/lightgallery-bundle.min.css" />

### Category 1 {.section-header}

<div class="category-gallery content-grid">

  <a href="images/1.jpg" data-sub-html="<div style='text-align: center;'><h4 style='color:#fff; margin-bottom: 5px;'>Science Inquiry</h4><p style='color:#ccc; margin: 0;'>Emergent bilinguals in STEM.</p></div>">
    <div class="content-card">
      <div class="card-media">
        <img src="images/1.jpg" alt="Science Inquiry">
      </div>
      <div class="card-body">
        <span class="card-title">To-be-filled</span>
        <p class="card-desc">To-be-filled</p>
      </div>
    </div>
  </a>

  <a href="images/3.jpg" data-sub-html="<div style='text-align: center;'><h4 style='color:#fff; margin-bottom: 5px;'>Collaborative Writing</h4><p style='color:#ccc; margin: 0;'>Digital wikis in ESL.</p></div>">
    <div class="content-card">
      <div class="card-media">
        <img src="images/3.jpg" alt="Collaborative Writing">
      </div>
      <div class="card-body">
        <span class="card-title">To-be-filled</span>
        <p class="card-desc">To-be-filled</p>
      </div>
    </div>
  </a>

</div>

### Category 2 {.section-header}

<div class="category-gallery content-grid">

  <a href="images/2.jpg" data-sub-html="<div style='text-align: center;'><h4 style='color:#fff; margin-bottom: 5px;'>Digital Storytelling</h4><p style='color:#ccc; margin: 0;'>Identity construction.</p></div>">
    <div class="content-card">
      <div class="card-media">
        <img src="images/2.jpg" alt="Digital Storytelling">
      </div>
      <div class="card-body">
        <span class="card-title">To-be-filled</span>
        <p class="card-desc">To-be-filled</p>
      </div>
    </div>
  </a>

  <a href="images/4.jpg" data-sub-html="<div style='text-align: center;'><h4 style='color:#fff; margin-bottom: 5px;'>Conference Dissemination</h4><p style='color:#ccc; margin: 0;'>Sharing research insights.</p></div>">
    <div class="content-card">
      <div class="card-media">
        <img src="images/4.jpg" alt="Conference Dissemination">
      </div>
      <div class="card-body">
        <span class="card-title">To-be-filled</span>
        <p class="card-desc">To-be-filled</p>
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
