---
title: "Gallery"
layout: "single"
showToc: true
TocOpen: true
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/css/lightgallery-bundle.min.css" />

### Category 1 {.section-header}

<div class="category-gallery content-grid">
  {{< gallery-card image="images/1.jpg" title="To-be-filled" desc="To-be-filled" sub="Emergent bilinguals in STEM." >}}
  {{< gallery-card image="images/3.jpg" title="To-be-filled" desc="To-be-filled" sub="Digital wikis in ESL." >}}
</div>

### Category 2 {.section-header}

<div class="category-gallery content-grid">
  {{< gallery-card image="images/2.jpg" title="To-be-filled" desc="To-be-filled" sub="Identity construction." >}}
  {{< gallery-card image="images/4.jpg" title="To-be-filled" desc="To-be-filled" sub="Sharing research insights." >}}
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
