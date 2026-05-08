---
layout: single
title: "Gallery"
permalink: /gallery/
author_profile: true
toc: true
toc_label: "Categories"
toc_sticky: true
---

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/css/lightgallery-bundle.min.css" />

### Classroom Research
{: .section-header}

{::nomarkdown}
<div class="category-gallery content-grid">
  {% include gallery-card.html image="/assets/images/gallery/1.jpg" title="Emergent Bilinguals in STEM" desc="Research moments from multilingual middle-school science classrooms." sub="Emergent bilinguals in STEM." %}
  {% include gallery-card.html image="/assets/images/gallery/3.jpg" title="Digital Wikis in ESL" desc="Collaborative writing studies with second-language learners." sub="Digital wikis in ESL." %}
</div>
{:/nomarkdown}

### Identity & Public Scholarship
{: .section-header}

{::nomarkdown}
<div class="category-gallery content-grid">
  {% include gallery-card.html image="/assets/images/gallery/2.jpg" title="Identity Construction" desc="Bilingual identity and voice in digital storytelling work." sub="Identity construction." %}
  {% include gallery-card.html image="/assets/images/gallery/4.jpg" title="Research Communication" desc="Sharing findings with educators, students, and the wider community." sub="Sharing research insights." %}
</div>
{:/nomarkdown}

<script defer src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/lightgallery.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/plugins/thumbnail/lg-thumbnail.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2/plugins/zoom/lg-zoom.min.js"></script>

<script>
  document.addEventListener('DOMContentLoaded', function () {
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
