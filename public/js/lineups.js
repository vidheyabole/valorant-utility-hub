const API_URL = '/api/lineups';

let allLineups = [];
let currentFilters = { map: '', agent: '', ability: '' };
let editingLineupId = null;
let searchQuery = '';
let selectedImages = [];
let currentUser = null;

// Auth helper - check if already defined
if (!window.auth) {
  window.auth = {
    isLoggedIn: () => localStorage.getItem('user') !== null,
    getCurrentUser: () => {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    },
    saveUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
    clearUser: () => localStorage.removeItem('user')
  };
}

currentUser = window.auth.getCurrentUser();

// Check for user filter in URL
const urlParams = new URLSearchParams(window.location.search);
const userFilterId = urlParams.get('user');
const mapFilterFromUrl = urlParams.get('map');

// If map filter in URL, apply it
if (mapFilterFromUrl) {
  currentFilters.map = mapFilterFromUrl;
  // Set the dropdown value after page loads
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mapFilter').value = mapFilterFromUrl;
  });
}

const modal = document.getElementById('lineupModal');
const form = document.getElementById('lineupForm');
const addBtn = document.getElementById('addLineupBtn');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');
const imageInput = document.getElementById('lineupImages');
const imagePreview = document.getElementById('imagePreview');

// Disable add button if not logged in
if (!currentUser) {
  addBtn.disabled = true;
  addBtn.title = 'Please login to add lineups';
  addBtn.style.opacity = '0.5';
  addBtn.style.cursor = 'not-allowed';
}

// Compress image function
function compressImage(base64Str, maxWidth = 800, maxHeight = 800, quality = 0.7) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    img.src = base64Str;
  });
}

// Image upload handler - MULTIPLE IMAGES
imageInput.addEventListener('change', async (e) => {
  const files = Array.from(e.target.files);
  
  if (files.length > 5) {
    alert('You can only upload up to 5 images');
    e.target.value = '';
    return;
  }

  if (files.length === 0) return;

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > 50 * 1024 * 1024) {
    alert('Total image size must be less than 50MB');
    e.target.value = '';
    return;
  }

  try {
    selectedImages = [];
    imagePreview.innerHTML = '<p style="color: var(--text-secondary);">Processing images...</p>';

    for (const file of files) {
      const reader = new FileReader();
      const base64 = await new Promise((resolve) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      });

      const compressed = await compressImage(base64);
      selectedImages.push(compressed);
    }

    renderImagePreviews();
  } catch (error) {
    console.error('Error processing images:', error);
    alert('Failed to process images. Please try again.');
  }
});

function renderImagePreviews() {
  if (selectedImages.length === 0) {
    imagePreview.innerHTML = '';
    return;
  }

  imagePreview.innerHTML = `
    <div class="image-preview-container">
      ${selectedImages
        .map(
          (img, index) => `
        <div class="image-preview-item">
          <img src="${img}" alt="Preview ${index + 1}" />
          <button type="button" class="remove-image-btn" onclick="removeImage(${index})">×</button>
          <span class="image-number">${index + 1}</span>
        </div>
      `
        )
        .join('')}
    </div>
    <button type="button" class="btn btn-secondary" style="margin-top: 10px;" onclick="clearAllImages()">Remove All Images</button>
  `;
}

window.removeImage = function (index) {
  selectedImages.splice(index, 1);
  renderImagePreviews();
};

window.clearAllImages = function () {
  selectedImages = [];
  imageInput.value = '';
  imagePreview.innerHTML = '';
};

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.toLowerCase();
  applyFiltersAndSearch();
});

function applyFiltersAndSearch() {
  let filtered = allLineups;

  if (currentFilters.map) {
    filtered = filtered.filter((l) => l.map === currentFilters.map);
  }
  if (currentFilters.agent) {
    filtered = filtered.filter((l) => l.agent === currentFilters.agent);
  }
  if (currentFilters.ability) {
    filtered = filtered.filter((l) => l.ability === currentFilters.ability);
  }

  if (searchQuery) {
    filtered = filtered.filter((lineup) => {
      return (
        lineup.map.toLowerCase().includes(searchQuery) ||
        lineup.agent.toLowerCase().includes(searchQuery) ||
        lineup.ability.toLowerCase().includes(searchQuery) ||
        lineup.site.toLowerCase().includes(searchQuery) ||
        lineup.position.toLowerCase().includes(searchQuery) ||
        (lineup.description &&
          lineup.description.toLowerCase().includes(searchQuery)) ||
        (lineup.landmark && lineup.landmark.toLowerCase().includes(searchQuery)) ||
        (lineup.author && lineup.author.toLowerCase().includes(searchQuery))
      );
    });
  }

  renderLineups(filtered);
}

async function fetchLineups(filters = {}) {
  try {
    const params = new URLSearchParams();
    if (filters.map) params.append('map', filters.map);
    if (filters.agent) params.append('agent', filters.agent);
    if (filters.ability) params.append('ability', filters.ability);
    
    if (userFilterId) {
      params.append('userId', userFilterId);
    }

    // FIXED: Send current user ID in headers so backend can show their private items
    const headers = {};
    if (currentUser) {
      headers['x-user-id'] = currentUser._id;
    }

    const response = await fetch(`${API_URL}?${params}`, { headers });
    const lineups = await response.json();
    allLineups = lineups;
    applyFiltersAndSearch();
  } catch (error) {
    console.error('Error fetching lineups:', error);
    showError('Failed to load lineups');
  }
}

function renderLineups(lineups) {
  const container = document.getElementById('lineupsContainer');
  const countEl = document.getElementById('lineupCount');

  if (userFilterId && currentUser && userFilterId === currentUser._id) {
    countEl.textContent = `Showing ${lineups.length} of your lineup${lineups.length !== 1 ? 's' : ''}`;
  } else {
    countEl.textContent = `Showing ${lineups.length} lineup${lineups.length !== 1 ? 's' : ''}`;
  }

  if (lineups.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No lineups found</h3>
        <p>Try adjusting your filters or search, or add a new lineup!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = lineups
    .map(
      (lineup) => {
        const canEdit = currentUser && lineup.userId && lineup.userId.toString() === currentUser._id;
        
        return `
    <div class="lineup-card" data-id="${lineup._id}">
      ${
        lineup.images && lineup.images.length > 0
          ? `<div class="lineup-images-carousel">
          ${lineup.images
            .map(
              (img, index) => `
            <div class="carousel-image ${index === 0 ? 'active' : ''}" data-index="${index}">
              <img src="${img}" alt="${lineup.map} lineup - Image ${index + 1}" />
            </div>
          `
            )
            .join('')}
          ${
            lineup.images.length > 1
              ? `
            <div class="carousel-dots">
              ${lineup.images.map((_, index) => `<span class="dot ${index === 0 ? 'active' : ''}" onclick="showCarouselImage('${lineup._id}', ${index})"></span>`).join('')}
            </div>
            <button class="carousel-btn prev" onclick="changeCarouselImage('${lineup._id}', -1)">‹</button>
            <button class="carousel-btn next" onclick="changeCarouselImage('${lineup._id}', 1)">›</button>
          `
              : ''
          }
        </div>`
          : ''
      }
      
      <div class="lineup-header">
        <div class="lineup-map">${lineup.map}</div>
        <div class="lineup-actions">
          ${canEdit ? `
            <button class="icon-btn edit" onclick="editLineup('${lineup._id}')" title="Edit">✏️</button>
            <button class="icon-btn delete" onclick="deleteLineup('${lineup._id}')" title="Delete">🗑️</button>
          ` : ''}
        </div>
      </div>
      
      <div class="lineup-meta">
        <span class="tag agent">${lineup.agent}</span>
        <span class="tag ability">${lineup.ability}</span>
        <span class="tag">${lineup.site}</span>
        ${lineup.images && lineup.images.length > 0 ? `<span class="tag">📷 ${lineup.images.length} image${lineup.images.length > 1 ? 's' : ''}</span>` : ''}
        ${lineup.isPrivate ? `<span class="tag private">🔒 Private</span>` : ''}
      </div>
      
      <div class="lineup-description">
        ${lineup.description || 'No description provided'}
      </div>
      
      <div class="lineup-details">
        <div class="detail-item">
          <span class="detail-label">Position:</span>
          <span>${lineup.position}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Throw Type:</span>
          <span>${lineup.throwType}</span>
        </div>
        ${
          lineup.landmark
            ? `
          <div class="detail-item">
            <span class="detail-label">Landmark:</span>
            <span>${lineup.landmark}</span>
          </div>
        `
            : ''
        }
      </div>
      
      <div class="lineup-footer">
        <span>by ${lineup.author || 'Anonymous'}</span>
        ${
          lineup.videoUrl
            ? `<a href="${lineup.videoUrl}" target="_blank" class="video-link">Watch Video</a>`
            : ''
        }
      </div>
    </div>
  `;
      }
    )
    .join('');
}

window.showCarouselImage = function (cardId, index) {
  const card = document.querySelector(`[data-id="${cardId}"]`);
  const images = card.querySelectorAll('.carousel-image');
  const dots = card.querySelectorAll('.dot');

  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
};

window.changeCarouselImage = function (cardId, direction) {
  const card = document.querySelector(`[data-id="${cardId}"]`);
  const images = card.querySelectorAll('.carousel-image');
  let currentIndex = Array.from(images).findIndex((img) =>
    img.classList.contains('active')
  );

  currentIndex += direction;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;

  showCarouselImage(cardId, currentIndex);
};

async function deleteLineup(id) {
  if (!currentUser) {
    alert('Please login to delete lineups');
    return;
  }

  if (!confirm('Are you sure you want to delete this lineup?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      await fetchLineups(currentFilters);
      showSuccess('Lineup deleted successfully');
    } else {
      const data = await response.json();
      showError(data.error || 'Failed to delete lineup');
    }
  } catch (error) {
    console.error('Error deleting lineup:', error);
    showError('Failed to delete lineup');
  }
}

async function editLineup(id) {
  if (!currentUser) {
    alert('Please login to edit lineups');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`);
    const lineup = await response.json();

    editingLineupId = id;
    document.getElementById('modalTitle').textContent = 'Edit Lineup';
    document.getElementById('lineupId').value = id;
    document.getElementById('lineupMap').value = lineup.map;
    document.getElementById('lineupAgent').value = lineup.agent;
    document.getElementById('lineupAbility').value = lineup.ability;
    document.getElementById('lineupSite').value = lineup.site;
    document.getElementById('lineupPosition').value = lineup.position;
    document.getElementById('lineupThrowType').value = lineup.throwType;
    document.getElementById('lineupLandmark').value = lineup.landmark || '';
    document.getElementById('lineupDescription').value =
      lineup.description || '';
    document.getElementById('lineupVideoUrl').value = lineup.videoUrl || '';
    document.getElementById('lineupAuthor').value = lineup.author || currentUser.username;
    document.getElementById('lineupPrivate').checked = lineup.isPrivate || false;

    if (lineup.images && lineup.images.length > 0) {
      selectedImages = [...lineup.images];
      renderImagePreviews();
    }

    modal.style.display = 'block';
  } catch (error) {
    console.error('Error fetching lineup:', error);
    showError('Failed to load lineup');
  }
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!currentUser) {
    alert('Please login to save lineups');
    return;
  }

  const lineupData = {
    map: document.getElementById('lineupMap').value,
    agent: document.getElementById('lineupAgent').value,
    ability: document.getElementById('lineupAbility').value,
    site: document.getElementById('lineupSite').value,
    position: document.getElementById('lineupPosition').value,
    throwType: document.getElementById('lineupThrowType').value,
    landmark: document.getElementById('lineupLandmark').value,
    description: document.getElementById('lineupDescription').value,
    videoUrl: document.getElementById('lineupVideoUrl').value,
    author: document.getElementById('lineupAuthor').value || currentUser.username,
    images: selectedImages,
    userId: currentUser._id,
    isPrivate: document.getElementById('lineupPrivate').checked,
  };

  try {
    const url = editingLineupId ? `${API_URL}/${editingLineupId}` : API_URL;
    const method = editingLineupId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lineupData),
    });

    if (response.ok) {
      // FIXED: Refetch with current filters to show the newly created lineup
      if (userFilterId && userFilterId === currentUser._id) {
        // Viewing "My Lineups" - refetch with userId filter
        currentFilters.userId = currentUser._id;
      }
      await fetchLineups(currentFilters);
      closeModal();
      showSuccess(
        editingLineupId
          ? 'Lineup updated successfully'
          : 'Lineup created successfully'
      );
    } else {
      const errorData = await response.json();
      showError(errorData.error || 'Failed to save lineup');
    }
  } catch (error) {
    console.error('Error saving lineup:', error);
    showError('Failed to save lineup. Images might be too large.');
  }
});

function closeModal() {
  modal.style.display = 'none';
  form.reset();
  editingLineupId = null;
  selectedImages = [];
  imagePreview.innerHTML = '';
  document.getElementById('modalTitle').textContent = 'Add New Lineup';
}

addBtn.addEventListener('click', () => {
  if (!currentUser) {
    alert('Please login to add lineups');
    window.location.href = '/login.html';
    return;
  }
  closeModal();
  document.getElementById('lineupAuthor').value = currentUser.username;
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.getElementById('mapFilter').addEventListener('change', (e) => {
  currentFilters.map = e.target.value;
  applyFiltersAndSearch();
});

document.getElementById('agentFilter').addEventListener('change', (e) => {
  currentFilters.agent = e.target.value;
  applyFiltersAndSearch();
});

document.getElementById('abilityFilter').addEventListener('change', (e) => {
  currentFilters.ability = e.target.value;
  applyFiltersAndSearch();
});

document.getElementById('resetFilters').addEventListener('click', () => {
  currentFilters = { map: '', agent: '', ability: '' };
  searchQuery = '';
  document.getElementById('mapFilter').value = '';
  document.getElementById('agentFilter').value = '';
  document.getElementById('abilityFilter').value = '';
  searchInput.value = '';
  
  if (userFilterId) {
    window.location.href = '/lineups.html';
  } else {
    fetchLineups();
  }
});

function showSuccess(message) {
  alert(message);
}

function showError(message) {
  alert(message);
}

window.deleteLineup = deleteLineup;
window.editLineup = editLineup;

// FIXED: Apply filters on initial load
if (userFilterId) {
  currentFilters.userId = userFilterId;
}
fetchLineups(currentFilters);